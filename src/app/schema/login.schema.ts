import z from "zod";

export const loginSchema = z.object({
 
  email: z
    .string()
    .min(1, "email is required")
    .pipe(z.email("invalid email")),

  password: z
    .string()
    .min(1, "password is required")
    .min(6, "password must be at least 6 characters"),
});



export type loginSchemaType =z.infer<typeof loginSchema>