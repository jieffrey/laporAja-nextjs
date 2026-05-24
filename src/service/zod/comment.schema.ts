import { z } from "zod"

// --------------------------------------------------------
// CREATE COMMENT SCHEMA
// Dipanggil di: form komentar di halaman detail laporan
//
// Contoh penggunaan:
//   import { createCommentSchema, type CreateCommentInput } from "@/service/zod/comment.schema"
//   const form = useForm<CreateCommentInput>({ resolver: zodResolver(createCommentSchema) })
// --------------------------------------------------------
export const createCommentSchema = z.object({
    report_id: z.number().positive("Report ID tidak valid"),
    comment:   z.string()
        .min(1,   "Komentar tidak boleh kosong")
        .max(500, "Komentar maksimal 500 karakter"),
})

export type CreateCommentInput = z.infer<typeof createCommentSchema>