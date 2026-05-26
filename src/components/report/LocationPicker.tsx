"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_CENTER: [number, number] = [-6.2, 106.816666];

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type LocationPickerProps = {
  latitude?: string;
  longitude?: string;
  onChange: (lat: string, lng: string) => void;
};

function MapClickHandler({
  onChange,
}: {
  onChange: (lat: string, lng: string) => void;
}) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat.toFixed(6), e.latlng.lng.toFixed(6));
    },
  });
  return null;
}

export default function LocationPicker({
  latitude,
  longitude,
  onChange,
}: LocationPickerProps) {
  const lat = latitude ? parseFloat(latitude) : NaN;
  const lng = longitude ? parseFloat(longitude) : NaN;
  const hasCoords = !Number.isNaN(lat) && !Number.isNaN(lng);
  const center: [number, number] = hasCoords ? [lat, lng] : DEFAULT_CENTER;

  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
      ._getIconUrl;
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-[13px] font-semibold text-slate-700">
        Lokasi laporan
      </p>
      <p className="text-[12px] text-slate-500">
        Klik pada peta untuk menandai lokasi masalah.
      </p>
      <div className="h-56 overflow-hidden rounded-2xl border border-slate-200">
        <MapContainer
          center={center}
          zoom={hasCoords ? 15 : 11}
          className="h-full w-full"
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onChange={onChange} />
          {hasCoords && (
            <Marker position={[lat, lng]} icon={markerIcon} />
          )}
        </MapContainer>
      </div>
      {hasCoords && (
        <p className="text-[12px] text-slate-500">
          Koordinat: {lat.toFixed(5)}, {lng.toFixed(5)}
        </p>
      )}
    </div>
  );
}
