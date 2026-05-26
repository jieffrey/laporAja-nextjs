import ReportForm from "@/components/report/ReportForm";

export default function BuatLaporanPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[20px] font-extrabold tracking-tight text-slate-900">
          Buat Laporan Baru
        </h1>
        <p className="mt-1 text-[13px] text-slate-500">
          Isi detail masalah lingkungan, unggah foto, dan tandai lokasi di peta.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
        <ReportForm />
      </section>
    </div>
  );
}
