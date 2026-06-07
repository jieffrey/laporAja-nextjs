import api from "./api"

export type UserRole = "user" | "admin" | "superadmin"

export interface User {
    id: number
    name: string
    email: string
    role: UserRole
    points: number
    created_at: string
    updated_at: string
    avatar_url?: string
}

export async function getUsers(): Promise<User[]> {
    const res = await api.get("/user")
    return res.data.data
}

export async function getUserById(id: number): Promise<User> {
    const res = await api.get(`/user/${id}`)
    return res.data.data
}

export async function updateUserRole(id: number, role: UserRole): Promise<User> {
    const res = await api.patch(`/user/${id}`, { role })
    return res.data.data
}

export async function deleteUser(id: number): Promise<void> {
    await api.delete(`/user/${id}`)
}

export async function getLeaderboard(): Promise<User[]> {
    const res = await api.get("/user/leaderboard")
    return res.data.data
}

export async function updateUserProfile(
    id: number,
    data: {
        name?: string
        email?: string
        password?: string
        avatar?: File
    }
): Promise<User> {
    const formData = new FormData()
    if (data.name) formData.append("name", data.name)
    if (data.email) formData.append("email", data.email)
    if (data.password) formData.append("password", data.password)
    if (data.avatar) formData.append("avatar", data.avatar)

    const res = await api.patch(`/user/profile/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    return res.data.data
}

export async function forgotPassword(email: string): Promise<{ message: string; token?: string }> {
    const res = await api.post("/auth/forgot-password", { email })
    return res.data
}

export async function resetPassword(token: string, password: string): Promise<void> {
    await api.post("/auth/reset-password", { token, password })
}
