import {z} from "zod";

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const SignUpSchema = SignInSchema.extend({
    username: z.string().max(8),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
})

export type FormFields = z.infer<typeof SignInSchema> | z.infer<typeof SignUpSchema>;