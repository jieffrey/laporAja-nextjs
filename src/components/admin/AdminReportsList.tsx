"use client"

import { useState, useMemo } from "react"
import type { Report } from "@/lib/report.api"
import EmptyState from "@/components/common-ui/Emptystate"
import FilterBar from "@/components/admin/reports-sections/FilterBar"
import ReportsTable from "@/components/admin/reports-sections/ReportsTable"
import { Search } from "lucide-react"

type Props = {
  reports: Report[]
  isAdmin: boolean
}

const filterReports = (
  reports: Report[],
  statusFilter: string,
  priorityFilter: string,
  categoryFilter: string,
  search: string
) =>
  reports.filter((r) => {
    const q = search.toLowerCase()
    return (
      (statusFilter === "Semua" || r.status === statusFilter) &&
      (priorityFilter === "Semua" || r.priority === priorityFilter) &&
      (categoryFilter === "Semua" || r.category === categoryFilter) &&
      (r.title.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q))
    )
  })

export default function AdminReportsList({ reports, isAdmin }: Props) {
  const [statusFilter, setStatusFilter] = useState("Semua")
  const [priorityFilter, setPriorityFilter] = useState("Semua")
  const [categoryFilter, setCategoryFilter] = useState("Semua")
  const [search, setSearch] = useState("")

  const filtered = useMemo(
    () =>
      filterReports(
        reports,
        statusFilter,
        priorityFilter,
        categoryFilter,
        search
      ),
    [reports, statusFilter, priorityFilter, categoryFilter, search]
  )

  return (
    <div className="space-y-4">
      <FilterBar
        search={search}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        categoryFilter={categoryFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onCategoryChange={setCategoryFilter}
        filteredCount={filtered.length}
        totalCount={reports.length}
      />

      <div
        className="overflow-hidden rounded-2xl"
        style={{
          background: "#FCFBF8",
          border: "1px solid #E8E4D9",
          boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
        }}
      >
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Search size={28} />}
            title="Tidak ada laporan"
            description="Coba ubah filter"
            action={<button>Reset filter</button>}
          />
        ) : (
          <ReportsTable reports={filtered} isAdmin={isAdmin} />
        )}
      </div>
    </div>
  )
}