"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { getUserById } from "@/lib/user.api"

export function useRealtimePoints(): number {
    const { data: session, status } = useSession()
    const [points, setPoints] = useState(session?.user?.points ?? 0)
    const userId = session?.user?.id

    useEffect(() => {
        if (status !== "authenticated" || !userId) return

        const fetchPoints = async () => {
            try {
                const user = await getUserById(Number(userId))
                if (user && user.points !== undefined) {
                    setPoints(user.points)
                }
            } catch {
                // silent — keep last known points
            }
        }

        void fetchPoints()
        const interval = setInterval(fetchPoints, 15_000)
        return () => clearInterval(interval)
    }, [status, userId])

    return points
}
