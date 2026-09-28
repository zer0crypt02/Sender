import * as React from "react";
import { Transfer, TransferStatus } from "../lib/data";

/**
 * Shared UI primitives. Design rules (from .opencode/skills/impeccable):
 * - Fixed 4-step type scale with high contrast: 24 / 19 / 15 / 11
 * - One bold element per screen; everything else stays quiet
 * - Lists with hairline separators, not endless same-size cards
 * - Not every action is a filled button; text links and ghosts exist
 */

export function Title1({ children, action }: { children: string; action?: string }) {
  return (
    <flexboxLayout flexDirection="row" justifyContent="space-between" alignItems="flex-end" className="mb-3 px-1">
      <label fontSize={19} className="text-ink-900 font-bold">{children}</label>
      {action ? <label fontSize={13} className="text-brand-700 font-semibold">{action}</label> : null}
    </flexboxLayout>
  );
}

export function Card({ children, className = "" }: { children: any; className?: string }) {
  return (
    <stackLayout className={"card rounded-2xl border " + className}>{children}</stackLayout>
  );
}

/** Hairline separator for in-card lists. */
export function Divider() {
  return <stackLayout className="h-px bg-ink-100" />;
}

/** Empty state that teaches, not just apologizes. */
export function EmptyState({ emoji, title, body }: { emoji: string; title: string; body: string }) {
  return (
    <stackLayout className="items-center py-10 px-6">
      <label fontSize={34} className="mb-3" text={emoji} />
      <label fontSize={15} className="text-ink-900 font-bold mb-1">{title}</label>
      <label fontSize={12} className="text-ink-500 text-center" textWrap={true}>{body}</label>
    </stackLayout>
  );
}

const statusLabel: Record<TransferStatus, string> = {
  done: "Tamamlandı",
  sending: "Gönderiliyor",
  receiving: "Alınıyor",
  failed: "Başarısız",
};

/**
 * Transfer row as a flat list item (divider-separated), not a card grid.
 * Small monochrome initial tile instead of an over-eager colored badge.
 */
export function TransferRow({ item }: { item: Transfer }) {
  const arrow = item.direction === "out" ? "↑" : "↓";
  const active = item.status === "sending" || item.status === "receiving";
  return (
    <stackLayout>
      <flexboxLayout flexDirection="row" alignItems="center" className="py-3.5">
        <stackLayout className="w-9 h-9 rounded-lg bg-ink-100 justify-center items-center mr-3">
          <label fontSize={13} className="text-ink-700 font-bold" text={arrow} />
        </stackLayout>

        <stackLayout className="flex-1">
          <label fontSize={15} className="text-ink-900 font-semibold" textWrap={true} text={item.fileName} />
          <flexboxLayout flexDirection="row" alignItems="center" className="mt-1">
            <label fontSize={12} className="text-ink-500 mr-2">{item.peerName} · {item.size}</label>
            {active ? (
              <label fontSize={12} className="text-brand-700 font-semibold">{statusLabel[item.status]}</label>
            ) : item.status === "failed" ? (
              <label fontSize={12} className="text-ink-500">{statusLabel[item.status]}</label>
            ) : null}
          </flexboxLayout>
          {item.progress !== undefined ? (
            <stackLayout className="mt-2 h-1 rounded-full bg-ink-100 w-full">
              <stackLayout className="h-1 rounded-full bg-brand-600" width={`${item.progress}%`} />
            </stackLayout>
          ) : null}
        </stackLayout>

        <label fontSize={12} className="text-ink-400 ml-2">{item.time}</label>
      </flexboxLayout>
    </stackLayout>
  );
}

/** Round avatar with a device-type emoji. Quiet by default; bolder only for the hero. */
export function DeviceAvatar({ emoji, size = 46 }: { emoji: string; size?: number }) {
  return (
    <stackLayout className="rounded-full bg-ink-100 justify-center items-center" width={size} height={size}>
      <label fontSize={size * 0.45} text={emoji} />
    </stackLayout>
  );
}
