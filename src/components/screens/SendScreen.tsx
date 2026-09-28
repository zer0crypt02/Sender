import * as React from "react";
import { Device, myProfile, nearbyDevices } from "../../lib/data";
import { AppHeader, AppShell } from "../TabBar";
import { DeviceAvatar, Title1 } from "../ui";

const kindEmoji: Record<Device["kind"], string> = {
  phone: "📱",
  tablet: "📲",
  laptop: "💻",
  desktop: "🖥️",
};

export function SendScreen({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const online = nearbyDevices.filter((d) => d.status !== "offline");

  return (
    <AppShell active="send" onChange={onNavigate}>
      <AppHeader title="Gönder" />

      {/* THE bold element of this screen. Everything else stays quiet. */}
      <stackLayout className="mx-5 mb-6 rounded-3xl bg-brand-700 p-6">
        <label fontSize={12} className="text-brand-100 tracking-wide">{myProfile.fingerprint}</label>
        <label fontSize={24} className="text-white font-bold mt-1">{myProfile.name}</label>
        <label fontSize={12} className="text-brand-100 mt-2">
          Aynı Wi-Fi'da {online.length} cihaz hazır
        </label>

        <stackLayout
          className="mt-5 rounded-2xl bg-white py-3.5 items-center"
          onTap={() => onNavigate("receive")}
        >
          <label fontSize={15} className="text-brand-800 font-bold">Dosya seç ve gönder</label>
        </stackLayout>
      </stackLayout>

      {/* Quiet, flat list — one card, hairline dividers. */}
      <stackLayout className="px-4 pb-8">
        <Title1>Yakındaki cihazlar</Title1>
        <stackLayout className="card rounded-2xl border px-4">
          {nearbyDevices.map((device, i) => {
            const onlineDevice = device.status !== "offline";
            return (
              <stackLayout key={device.id}>
                <flexboxLayout
                  flexDirection="row"
                  alignItems="center"
                  className="py-3.5"
                  opacity={onlineDevice ? 1 : 0.55}
                >
                  <DeviceAvatar emoji={kindEmoji[device.kind]} />
                  <stackLayout className="flex-1 ml-3">
                    <label fontSize={15} className="text-ink-900 font-semibold">{device.name}</label>
                    <label fontSize={11} className="text-ink-500 mt-0.5">
                      {device.os} · {onlineDevice ? "Hazır" : "Çevrimdışı"}
                    </label>
                  </stackLayout>
                  {device.status === "online" ? (
                    <label fontSize={13} className="text-brand-700 font-semibold py-2 px-2">Gönder</label>
                  ) : null}
                </flexboxLayout>
                {i < nearbyDevices.length - 1 ? <stackLayout className="h-px bg-ink-100" /> : null}
              </stackLayout>
            );
          })}
        </stackLayout>

        <label fontSize={12} className="text-ink-500 text-center mt-4 px-8" textWrap={true}>
          Karşı tarafın da aynı ağda ve Freebuff/LocalSend açık olması gerekir.
        </label>
      </stackLayout>
    </AppShell>
  );
}
