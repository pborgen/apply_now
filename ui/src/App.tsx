import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

export type Job = {
  id: string;
  source: "linkedin" | "workday";
  title: string;
  company: string;
  location?: string;
  url: string;
  applied?: boolean;
  notes?: string;
};

const API = "http://localhost:5179";

async function fetchJobs(): Promise<Job[]> {
  const res = await fetch(`${API}/api/jobs`);
  return res.json();
}

async function fetchQueue(): Promise<string[]> {
  const res = await fetch(`${API}/api/queue`);
  return res.json();
}

async function saveQueue(ids: string[]) {
  await fetch(`${API}/api/queue`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ids })
  });
}

export default function App() {
  const jobsQuery = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });
  const queueQuery = useQuery({ queryKey: ["queue"], queryFn: fetchQueue });
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (queueQuery.data) {
      const next: Record<string, boolean> = {};
      queueQuery.data.forEach((id) => (next[id] = true));
      setSelected(next);
    }
  }, [queueQuery.data]);

  const columns = useMemo<ColumnDef<Job>[]>(
    () => [
      {
        id: "select",
        header: "",
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={!!selected[row.original.id]}
            onChange={(e) =>
              setSelected((s) => ({ ...s, [row.original.id]: e.target.checked }))
            }
          />
        )
      },
      { accessorKey: "title", header: "Title" },
      { accessorKey: "company", header: "Company" },
      { accessorKey: "location", header: "Location" },
      { accessorKey: "source", header: "Source" },
      {
        id: "open",
        header: "Open",
        cell: ({ row }) => (
          <a href={row.original.url} target="_blank" rel="noreferrer">
            Open
          </a>
        )
      }
    ],
    [selected]
  );

  const table = useReactTable({
    data: jobsQuery.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const queueCount = Object.values(selected).filter(Boolean).length;

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>ApplyNow</h1>
      <p style={{ color: "#666" }}>
        Select jobs to apply for, then queue them.
      </p>

      {jobsQuery.isLoading ? (
        <div>Loading jobs…</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ padding: "8px 4px" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 16 }}>
        <button
          onClick={async () => {
            const ids = Object.entries(selected)
              .filter(([, v]) => v)
              .map(([k]) => k);
            await saveQueue(ids);
            alert(`Queued ${ids.length} jobs`);
          }}
        >
          Queue for Apply ({queueCount})
        </button>
      </div>
    </div>
  );
}
