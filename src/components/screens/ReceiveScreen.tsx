import * as React from "react";
import { myProfile, recentTransfers } from "../../lib/data";
import { AppHeader, AppShell } from "../TabBar";
import { Title1, TransferRow } from "../ui";

export function ReceiveScreen({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const incoming = recentTransfers.filter((t) => t.direction === "in").slice(0, 3);

  return (
    <AppShell active="receive" onChange={onNavigate}>
      <AppHeader title="Al" />

      {/* Calm discovery card — no second hero. The QR motif is the memorable
          element of this screen and it doubles as a "scan me" affordance. */}
      <stackLayout className="mx-5 mb-6 rounded-3xl bg-brand-50 p-6 items-center">
        <stackLayout className="w-24 h-24 rounded-2xl bg-white border border-brand-100 justify-center items-center">
          <label fontSize={34} text="⌗" className="text-brand-700" />
        </stackLayout>
        <label fontSize={15} className="text-ink-900 font-bold mt-4">Bu cihaz keşfedilebilir</label>
        <label fontSize={12} className="text-ink-500 mt-1 text-center" textWrap={true}>
          {myProfile.ip}:{myProfile.port} · aynı Wi-Fi'daki cihazlar seni görüyor
        </label>
      </stackLayout>

      <stackLayout className="px-4 pb-8">
        <Title1>Son alınanlar</Title1>
        <stackLayout className="card rounded-2xl border px-4">
          {incoming.map((t, i) => (
            <stackLayout key={t.id}>
              <TransferRow item={t} />
              {i < incoming.length - 1 ? <stackLayout className="h-px bg-ink-100" /> : null}
            </stackLayout>
          ))}
        </stackLayout>
      </stackLayout>
    </AppShell>
  );
}
