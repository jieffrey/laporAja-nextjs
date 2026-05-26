"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createReportSchema,
  type CreateReportInput,
} from "@/service/zod/report.schema";
import { REPORT_CATEGORIES } from "@/lib/constant";
import { createReport } from "@/lib/report.api";
import Button from "@/components/common-ui/Button";

const LocationPicker = dynamic(() => import("./LocationPicker"), {
  ssr: false,
  loading: () => (
    <div className="flex h-56 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[13px] text-slate-500">
      Memuat peta...
    </div>
  ),
});

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

const labelClass = "mb-1.5 block text-[13px] font-semibold text-slate-700";

export default function ReportForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateReportInput>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      priority: "Medium",
      latitude: "",
      longitude: "",
    },
  });

  const latitude = watch("latitude");
  const longitude = watch("longitude");

  const onSubmit = async (data: CreateReportInput) => {
    setSubmitError("");
    try {
      await createReport({
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        latitude: data.latitude || undefined,
        longitude: data.longitude || undefined,
        image_before: data.image_before ?? null,
      });
      router.push("/user/laporan");
      router.refresh();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Gagal mengirim laporan",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="title" className={labelClass}>
          Judul laporan
        </label>
        <input
          id="title"
          type="text"
          className={inputClass}
          placeholder="Contoh: Jalan berlubang di depan RT 05"
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-[12px] text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Deskripsi
        </label>
        <textarea
          id="description"
          rows={4}
          className={inputClass}
          placeholder="Jelaskan masalah secara detail..."
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-[12px] text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClass}>
            Kategori
          </label>
          <select
            id="category"
            className={inputClass}
            defaultValue=""
            {...register("category")}
          >
            <option value="" disabled>
              Pilih kategori
            </option>
            {REPORT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-[12px] text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="priority" className={labelClass}>
            Prioritas
          </label>
          <select id="priority" className={inputClass} {...register("priority")}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="image_before" className={labelClass}>
          Foto kondisi (opsional)
        </label>
        <input
          id="image_before"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="block w-full text-[13px] text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-blue-700"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setValue("image_before", file ?? null, { shouldValidate: true });
          }}
        />
        {errors.image_before && (
          <p className="mt-1 text-[12px] text-red-500">
            {errors.image_before.message}
          </p>
        )}
      </div>

      <LocationPicker
        latitude={latitude}
        longitude={longitude}
        onChange={(lat, lng) => {
          setValue("latitude", lat, { shouldValidate: true });
          setValue("longitude", lng, { shouldValidate: true });
        }}
      />

      {submitError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
          {submitError}
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="md"
          className={isSubmitting ? "pointer-events-none opacity-70" : ""}
        >
          {isSubmitting ? "Mengirim..." : "Kirim Laporan"}
        </Button>
        <button
          type="button"
          onClick={() => router.push("/user/laporan")}
          className="rounded-full border border-slate-200 px-6 py-2.5 text-[15px] font-bold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
