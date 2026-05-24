import api from "./api"

// == TYPES ==

export interface Comment {
    id: number
    report_id: number
    user_id: number
    name: string       // dari JOIN users
    comment: string
    created_at: string
}

// == FETCHING FUNCTIONS ==

// --------------------------------------------------------
// GET COMMENTS BY REPORT
// Dipanggil di: section komentar di halaman detail laporan (/user/laporan/[id])
// Tidak butuh token (public)
//
// Contoh penggunaan:
//   import { getCommentsByReport } from "@/lib/comment.api"
//
//   const comments = await getCommentsByReport(1)
// --------------------------------------------------------
export async function getCommentsByReport(reportId: number): Promise<Comment[]> {
    const response = await api.get(`/comments/report/${reportId}`)
    return response.data.data
}

// --------------------------------------------------------
// CREATE COMMENT
// Dipanggil di: form komentar di halaman detail laporan (user login)
// Butuh: token (auto dari interceptor)
//
// Contoh penggunaan:
//   import { createComment } from "@/lib/comment.api"
//
//   await createComment({ report_id: 1, comment: "Segera ditindaklanjuti!" })
// --------------------------------------------------------
export async function createComment(payload: {
    report_id: number
    comment: string
}): Promise<Comment> {
    const response = await api.post("/comments", payload)
    return response.data.data
}

// --------------------------------------------------------
// DELETE COMMENT
// Dipanggil di: tombol hapus komentar (/user/laporan/[id], owner comment only)
// Butuh: token (auto dari interceptor)
// Note: endpoint hapus komentar by reportId (sesuai backend)
//
// Contoh penggunaan:
//   import { deleteComment } from "@/lib/comment.api"
//
//   await deleteComment(reportId)
// --------------------------------------------------------
export async function deleteComment(reportId: number): Promise<void> {
    await api.delete(`/comments/report/${reportId}`)
}