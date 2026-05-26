import { z } from "zod"

const MAX_SIZE      = 5 * 1024 * 1024
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

// --------------------------------------------------------
// CREATE REPORT SCHEMA
// Dipanggil di: form buat laporan (/user/laporan/buat)
//
// Contoh penggunaan:
//   import { createReportSchema, type CreateReportInput } from "@/service/zod/report.schema"
//   const form = useForm<CreateReportInput>({ resolver: zodResolver(createReportSchema) })
// --------------------------------------------------------
export const createReportSchema = z.object({
    title: z.string()
        .min(5,   "Judul minimal 5 karakter")
        .max(225, "Judul maksimal 225 karakter"),
    description: z.string()
        .min(10, "Deskripsi minimal 10 karakter"),
    category: z.string()
        .min(1, "Kategori wajib dipilih"),
    priority: z.enum(["Low", "Medium", "High"]),
    latitude:  z.string().optional(),
    longitude: z.string().optional(),
    image_before: z
        .instanceof(File)
        .refine((f) => f.size <= MAX_SIZE,           "Ukuran foto maksimal 5MB")
        .refine((f) => ALLOWED_TYPES.includes(f.type), "Format foto harus JPG, PNG, atau WebP")
        .optional()
        .nullable(),
})

// --------------------------------------------------------
// UPDATE REPORT SCHEMA
// Dipanggil di: form edit laporan (owner), update status (admin)
//
// Contoh penggunaan:
//   import { updateReportSchema, type UpdateReportInput } from "@/service/zod/report.schema"
//   const form = useForm<UpdateReportInput>({ resolver: zodResolver(updateReportSchema) })
// --------------------------------------------------------
export const updateReportSchema = z.object({
    title:       z.string().min(5).max(225).optional(),
    description: z.string().min(10).optional(),
    category:    z.string().optional(),
    status:      z.enum(["Pending", "In Progress", "Resolved", "Rejected"]).optional(),
    priority:    z.enum(["Low", "Medium", "High"]).optional(),
    image_after: z
        .instanceof(File)
        .refine((f) => f.size <= MAX_SIZE,           "Ukuran foto maksimal 5MB")
        .refine((f) => ALLOWED_TYPES.includes(f.type), "Format foto harus JPG, PNG, atau WebP")
        .optional()
        .nullable(),
})

export type CreateReportInput = z.infer<typeof createReportSchema>
export type UpdateReportInput = z.infer<typeof updateReportSchema>