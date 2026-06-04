    import api from "./api"

    export interface Comment {
        id: number
        report_id: number
        user_id: number
        name: string
        comment: string
        created_at: string
    }

    export async function getCommentsByReport(reportId: number): Promise<Comment[]> {
        const res = await api.get(`/comments/report/${reportId}`)
        return res.data.data
    }

    export async function createComment(payload: { report_id: number; comment: string }): Promise<Comment> {
        const res = await api.post("/comments", payload)
        return res.data.data
    }

    export async function deleteComment(reportId: number): Promise<void> {
        await api.delete(`/comments/report/${reportId}`)
    }