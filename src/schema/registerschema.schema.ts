import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("this filed can't be empty")
      .min(2, "min length is 2")
      .max(50, "max length is 50"),
    email: z.email().nonempty("this filed can't be empty"),
    password: z
      .string()
      .nonempty("this filed can't be empty")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    rePassword: z.string().nonempty("this filed can't be empty"),
    phone: z.string().regex(/^01[1250][0-9]{8}$/, "Please enter a valid Egyptian phone number"),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "password and rePassword not match !",
  });

  export type RegisterSchemaType = z.infer<typeof registerSchema>