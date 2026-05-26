import api from "./api"

// == TYPES ==

export type ReportStatus   = "Pending" | "In Progress" | "Resolved" | "Rejected"
export type ReportPriority = "Low" | "Medium" | "High"

export interface Report {
    id: number
    user_id: number
    name: string         // dari JOIN users
    title: string
    description: string
    category: string
    status: ReportStatus
    priority: ReportPriority
    latitude: number | null
    longitude: number | null
    image_before: string | null
    image_after: string | null
    created_at: string
    updated_at: string
}

export interface CreateReportPayload {
    title: string
    description: string
    category: string
    priority?: ReportPriority
    latitude?: string
    longitude?: string
    image_before?: File | null
}

export interface UpdateReportPayload {
    title?: string
    description?: string
    category?: string
    status?: ReportStatus
    priority?: ReportPriority
    image_after?: File | null
}

// == FETCHING FUNCTIONS ==

// --------------------------------------------------------
// GET ALL REPORTS
// Dipanggil di: halaman list laporan (/user/laporan, /admin/laporan)
// Tidak butuh token (public)
//
// Contoh penggunaan:
//   import { getReports } from "@/lib/report.api"
//
//   const reports = await getReports()
// --------------------------------------------------------
export async function getReports(): Promise<Report[]> {
    const response = await api.get("/reports")
    return response.data.data
}

// --------------------------------------------------------
// GET REPORT BY ID
// Dipanggil di: halaman detail laporan (/user/laporan/[id], /admin/laporan/[id])
// Tidak butuh token (public)
//
// Contoh penggunaan:
//   import { getReportById } from "@/lib/report.api"
//
//   const report = await getReportById(1)
// --------------------------------------------------------
export async function getReportById(id: number): Promise<Report> {
    const response = await api.get(`/reports/${id}`)
    return response.data.data
}

// --------------------------------------------------------
// CREATE REPORT
// Dipanggil di: form buat laporan (/user/laporan/buat)
// Butuh: token (auto dari interceptor)
// Note: pakai FormData karena ada upload image_before
//
// Contoh penggunaan:
//   import { createReport } from "@/lib/report.api"
//
//   await createReport({
//     title: "Jalan berlubang",
//     description: "Lubang cukup dalam di depan RT 05",
//     category: "Infrastruktur",
//     priority: "High",
//     latitude: "-6.3728",
//     longitude: "106.8272",
//     image_before: fileInput.files[0] // opsional
//   })
// --------------------------------------------------------
export async function createReport(payload: CreateReportPayload): Promise<Report> {
    const form = new FormData()
    form.append("title",       payload.title)
    form.append("description", payload.description)
    form.append("category",    payload.category)
    if (payload.priority)     form.append("priority",     payload.priority)
    if (payload.latitude)     form.append("latitude",     payload.latitude)
    if (payload.longitude)    form.append("longitude",    payload.longitude)
    if (payload.image_before) form.append("image_before", payload.image_before)

    const response = await api.post("/reports", form, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data.data
}

// --------------------------------------------------------
// UPDATE REPORT
// Dipanggil di: form edit laporan (owner only)
//              form update status (/admin/laporan/[id])
// Butuh: token (auto dari interceptor)
// Note: pakai FormData jika ada image_after, JSON biasa jika tidak
//
// Contoh penggunaan:
//   import { updateReport } from "@/lib/report.api"
//
//   // update teks saja
//   await updateReport(1, { title: "Judul baru", status: "In Progress" })
//
//   // update + upload foto after
//   await updateReport(1, { status: "Resolved", image_after: fileInput.files[0] })
// --------------------------------------------------------
export async function updateReport(id: number, payload: UpdateReportPayload): Promise<Report> {
    if (payload.image_after) {
        const form = new FormData()
        Object.entries(payload).forEach(([key, val]) => {
            if (val != null) form.append(key, val as string | Blob)
        })
        const response = await api.patch(`/reports/${id}`, form, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return response.data.data
    }

    const { image_after: _, ...body } = payload
    const response = await api.patch(`/reports/${id}`, body)
    return response.data.data
}

// --------------------------------------------------------
// DELETE REPORT
// Dipanggil di: tombol hapus laporan (owner only)
// Butuh: token (auto dari interceptor)
//
// Contoh penggunaan:
//   import { deleteReport } from "@/lib/report.api"
//
//   await deleteReport(1)
// --------------------------------------------------------
export async function deleteReport(id: number): Promise<void> {
    await api.delete(`/reports/${id}`)
}