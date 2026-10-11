
'use client'

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Loader, LogIn } from 'lucide-react'
import { toast } from 'react-toastify'
import { loginSchema, loginSchemaType } from '@/app/schema/login.schema'
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { getCart } = useCart();
  const { getWishlist } = useWishlist();

  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(loginSchema),
    mode: "all"
  })

  const handleLogin = async (values: loginSchemaType) => {
    setIsLoading(true)

    try {
      const response = await fetch(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
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
        localStorage.setItem("userToken", data.token);

        getCart();
        getWishlist();

        toast.success("Login Successfully", {
          position: "top-right",
          autoClose: 1500
        })

        router.push("/")
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
    name: "email" | "password",
    type: string,
    placeholder: string,
    autoComplete: string,
  }

  const FormFields: FormField[] = [
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
      autoComplete: "current-password"
    },
  ]

  return (
    <>
      <div className="w-[90%] lg:w-[60%] mx-auto my-5 rounded-2xl shadow-2xl p-5">

        <h2 className="text-xl text-center">
          Welcome to Fresh Cart, login here:
        </h2>

        <form onSubmit={form.handleSubmit(handleLogin)}>
          {FormFields.map((myInput) => (
            <Controller
              key={myInput.name}
              name={myInput.name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel htmlFor={field.name}>
                    {myInput.name.charAt(0).toUpperCase() + myInput.name.slice(1)}
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
            New to FreshCart ?
            <Link
              href="/register"
              className="text-green-600 hover:text-green-500 hover:underline"
            >
              signup now!
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
                Login
                <LogIn />
              </>
            )}
          </Button>

        </form>
      </div>
    </>
  )
}
