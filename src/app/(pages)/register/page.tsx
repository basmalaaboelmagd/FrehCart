
'use client'

import { registerSchema, registerSchemaType } from '@/app/schema/register.schema'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Loader, MailBadge } from 'lucide-react'
import { toast } from 'react-toastify'

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "all"
  })

  const handleRegister = async (values: registerSchemaType) => {
    setIsLoading(true)

    try {
      const response = await fetch(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      const data = await response.json()

      if (response.ok && data.message === "success") {
        toast.success("Register Successfully", {
          position: "top-right",
          autoClose: 1500
        })

        router.push("/login")
      } else {
        toast.error(data.message || "Something went wrong", {
          position: "top-right",
          autoClose: 2000
        })
      }

    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 2000
      })
    } finally {
      setIsLoading(false)
    }
  }

  interface FormField {
    name: "name" | "email" | "password" | "rePassword" | "phone",
    type: string,
    placeholder: string,
    autoComplete: string,
  }

  const FormFields: FormField[] = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter Your Name",
      autoComplete: "name"
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter Your Email",
      autoComplete: "email"
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter Your Password",
      autoComplete: "new-password"
    },
    {
      name: "rePassword",
      type: "password",
      placeholder: "Enter Your RePassword",
      autoComplete: "new-password"
    },
    {
      name: "phone",
      type: "tel",
      placeholder: "Enter Your Phone",
      autoComplete: "tel"
    },
  ]

  return (
    <>
      <div className="w-[90%] lg:w-[60%] mx-auto my-5 rounded-2xl shadow-2xl p-5">

        <h2 className="text-xl text-center">
          Welcome to Fresh, signup here:
        </h2>

        <form onSubmit={form.handleSubmit(handleRegister)}>

          {FormFields.map((myInput) => (
            <Controller
              key={myInput.name}
              name={myInput.name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel htmlFor={field.name}>
                    {myInput.name === "rePassword"
                      ? "Confirm Password"
                      : myInput.name.charAt(0).toUpperCase() + myInput.name.slice(1)}
                  </FieldLabel>

                  <Input
                    className="my-4 p-5"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={myInput.placeholder}
                    autoComplete={myInput.autoComplete}
                    type={myInput.type}
                  />

                  <FieldDescription />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                </Field>
              )}
            />
          ))}

          <p className="mb-3">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-600 hover:text-green-500 hover:underline"
            >
              Login here!
            </Link>
          </p>

          <Button
            disabled={isLoading}
            type="submit"
            className="bg-green-600 hover:bg-green-500 w-full transition-all duration-300 cursor-pointer p-5"
          >
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                SignUp <MailBadge />
              </>
            )}
          </Button>

        </form>
      </div>
    </>
  )
}

