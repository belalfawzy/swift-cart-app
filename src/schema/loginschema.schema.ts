import * as z from "zod";

export const loginSchema = z
  .object({

    email: z.email().nonempty("this filed can't be empty"),
    password: z
      .string()
      .nonempty("this filed can't be empty")
      .min(6, "min length is 6"),
  })


  export type LoginSchemaType = z.infer<typeof loginSchema>