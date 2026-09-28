import * as React from "react";
import { Transfer } from "../../lib/data";
import { AppHeader, AppShell } from "../TabBar";
import { Title1, TransferRow } from "../ui";

const filters: { key: string; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "out", label: "Gönderilen" },
  { key: "in", label: "Alınan" },
  { key: "failed", label: "Başarısız" },
];

export function TransfersScreen({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [filter, setFilter] = React.useState<string>("all");

  const filtered = recentTransfers.filter((t: Transfer) => {
    if (filter === "all") return true;
    if (filter === "failed") return t.status === "failed";
    return t.direction === filter;
  });

  return (
    <AppShell active="transfers" onChange={onNavigate}>
      <AppHeader title="Aktarımlar" />

      {/* Filter chips: active gets the brand tint, inactive stay ghost-quiet. */}
      <flexboxLayout flexDirection="row" className="px-4 mb-3">
        {filters.map((f) => {
          const isActive = filter === f.key;
          return (
            <stackLayout
              key={f.key}
              className={
                "rounded-full px-4 py-2.5 mr-2 border " +
                (isActive ? "bg-brand-50 border-brand-200" : "bg-transparent border-transparent")
              }
              onTap={() => setFilter(f.key)}
            >
              <label fontSize={12} className={isActive ? "text-brand-800 font-bold" : "text-ink-500"}>
                {f.label}
              </label>
            </stackLayout>
          );
        })}
      </flexboxLayout>

      <stackLayout className="px-4 pb-8">
        <Title1>Bu hafta</Title1>
        <stackLayout className="card rounded-2xl border px-4">
          {filtered.map((t, i) => (
            <stackLayout key={t.id}>
              <TransferRow item={t} />
              {i < filtered.length - 1 ? <stackLayout className="h-px bg-ink-100" /> : null}
            </stackLayout>
          ))}
        </stackLayout>
      </stackLayout>
    </AppShell>
  );
}
