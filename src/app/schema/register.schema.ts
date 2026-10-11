import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "name must be at least 3 characters")
    .max(10, "name must be at most 10 characters")
    .min(1, "name is required"),

  email: z
    .string()
    .min(1, "email is required")
    .pipe(z.email("invalid email")),

  password: z
    .string()
    .min(1, "password is required")
    .min(6, "password must be at least 6 characters"),

  rePassword: z
    .string()
    .min(1, "rePassword is required"),

  phone: z
    .string()
    .min(1, "phone is required")
    .regex(/^01[0125][0-9]{8}$/, "phone must be an Egyptian number"),
}).refine(
  (object) => object.password === object.rePassword,
  {
    path: ["rePassword"],
    error: "password and rePassword must be the same",
  }
);



export type registerSchemaType =z.infer<typeof registerSchema>