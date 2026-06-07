"use client"

import { useEffect, useState } from "react"

const DEFAULT_CENTER: [number, number] = [-6.2, 106.816666]

type Props = {
    latitude?: number | string | null
    longitude?: number | string | null
}

export default function ReportLocationMap({ latitude, longitude }: Props) {
    // State to hold Leaflet components once loaded on the client side
    const [MapComponents, setMapComponents] = useState<any>(null)

    // Safe parsing for incoming latitude/longitude strings or numbers
    const lat = latitude ? parseFloat(String(latitude)) : NaN
    const lng = longitude ? parseFloat(String(longitude)) : NaN
    const hasCoords = !Number.isNaN(lat) && !Number.isNaN(lng)
    const center: [number, number] = hasCoords ? [lat, lng] : DEFAULT_CENTER

    useEffect(() => {
        const loadLeaflet = async () => {
            // Dynamically import Leaflet modules only in the browser
            const Leaflet = await import("leaflet")
            const ReactLeaflet = await import("react-leaflet")
            import("leaflet/dist/leaflet.css")

            // Clean up default fallback icon paths that break in Next.js builds
            delete (Leaflet.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
                ._getIconUrl

            // Define a reliable custom marker icon
            const markerIcon = Leaflet.icon({
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
            })

            // Store the modules in state to trigger a client-side rerender
            setMapComponents({
                MapContainer: ReactLeaflet.MapContainer,
                TileLayer: ReactLeaflet.TileLayer,
                Marker: ReactLeaflet.Marker,
                markerIcon
            })
        }

        loadLeaflet()
    }, [])

    // Server-side fallback shell (Pre-render placeholder)
    if (!MapComponents) {
        return (
            <div 
                className="h-56 w-full bg-[#E8E4D9]/10 animate-pulse rounded-2xl flex items-center justify-center text-sm text-neutral-400"
                style={{ border: "1px solid #E8E4D9" }}
            >
                Memuat peta...
            </div>
        )
    }

    const { MapContainer, TileLayer, Marker, markerIcon } = MapComponents

    return (
        <div
            className="h-56 overflow-hidden rounded-2xl"
            style={{ border: "1px solid #E8E4D9" }}
        >
            <MapContainer
                center={center}
                zoom={hasCoords ? 15 : 11}
                className="h-full w-full"
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {hasCoords && <Marker position={[lat, lng]} icon={markerIcon} />}
            </MapContainer>
        </div>
    )
}