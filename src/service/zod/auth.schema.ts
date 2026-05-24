import { z } from "zod"

// --------------------------------------------------------
// LOGIN SCHEMA
// Dipanggil di: LoginForm — validasi input sebelum signIn()
//
// Contoh penggunaan:
//   import { loginSchema, type LoginInput } from "@/service/zod/auth.schema"
//   const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })
// --------------------------------------------------------
export const loginSchema = z.object({
    email:    z.string().email("Format email tidak valid"),
    password: z.string().min(1, "Password wajib diisi"),
})

// --------------------------------------------------------
// REGISTER SCHEMA
// Dipanggil di: RegisterForm — validasi input sebelum register()
//
// Contoh penggunaan:
//   import { registerSchema, type RegisterInput } from "@/service/zod/auth.schema"
//   const form = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) })
// --------------------------------------------------------
export const registerSchema = z.object({
    name:     z.string().min(2,  "Nama minimal 2 karakter"),
    email:    z.string().email("Format email tidak valid"),
    password: z.string().min(8,  "Password minimal 8 karakter"),
    confirm:  z.string(),
}).refine((d) => d.password === d.confirm, {
    message: "Password tidak cocok",
    path: ["confirm"],
})

export type LoginInput    = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>