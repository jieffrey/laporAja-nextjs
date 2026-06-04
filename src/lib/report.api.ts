import api from "./api"

export type ReportStatus   = "Pending" | "In Progress" | "Resolved" | "Rejected"
export type ReportPriority = "Low" | "Medium" | "High"

export interface Report {
    id: number
    user_id: number
    name: string
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

export async function getReports(): Promise<Report[]> {
    const res = await api.get("/reports")
    return res.data.data
}

export async function getReportById(id: number): Promise<Report> {
    const res = await api.get(`/reports/${id}`)
    return res.data.data
}

export async function createReport(payload: CreateReportPayload): Promise<Report> {
    const form = new FormData()
    form.append("title",       payload.title)
    form.append("description", payload.description)
    form.append("category",    payload.category)
    if (payload.priority)     form.append("priority",     payload.priority)
    if (payload.latitude)     form.append("latitude",     payload.latitude)
    if (payload.longitude)    form.append("longitude",    payload.longitude)
    if (payload.image_before) form.append("image_before", payload.image_before)
    const res = await api.post("/reports", form, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    return res.data.data
}

export async function updateReport(id: number, payload: UpdateReportPayload): Promise<Report> {
    if (payload.image_after) {
        const form = new FormData()
        Object.entries(payload).forEach(([k, v]) => { if (v != null) form.append(k, v as string | Blob) })
        const res = await api.patch(`/reports/${id}`, form, { headers: { "Content-Type": "multipart/form-data" } })
        return res.data.data
    }
    const { image_after: _, ...body } = payload
    const res = await api.patch(`/reports/${id}`, body)
    return res.data.data
}

export async function deleteReport(id: number): Promise<void> {
    await api.delete(`/reports/${id}`)
}

export async function updateReportStatus(
  id: number,
  payload: { status?: ReportStatus; priority?: ReportPriority }
): Promise<Report> {
  const res = await api.patch(`/reports/${id}/status`, payload)
  return res.data.data
}