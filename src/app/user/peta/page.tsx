"use client"

import dynamic from "next/dynamic"

const PetaPage = dynamic(() => import("@/components/peta/PetaPage"), {
    ssr: false,
    loading: () => (
        <div
            className="flex items-center justify-center"
            style={{
                height: "calc(100vh - 56px)",
                background: "#F8F6F0",
            }}
        >
            <div
                className="h-8 w-8 animate-spin rounded-full"
                style={{
                    border: "3px solid #CCFBF1",
                    borderTopColor: "#0F766E",
                }}
            />
        </div>
    ),
})

export default function UserPetaPage() {
    return <PetaPage />
}