import * as React from "react";
import { myProfile } from "../../lib/data";
import { AppHeader, AppShell } from "../TabBar";
import { Title1 } from "../ui";

function SettingRow({
  label,
  sub,
  value,
  onToggle,
}: {
  label: string;
  sub?: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <flexboxLayout flexDirection="row" alignItems="center" justifyContent="space-between" className="py-3.5">
      <stackLayout className="flex-1 pr-3">
        <label fontSize={15} className="text-ink-900 font-semibold">{label}</label>
        {sub ? <label fontSize={12} className="text-ink-500 mt-0.5">{sub}</label> : null}
      </stackLayout>
      <switch checked={value} onCheckedChange={onToggle} />
    </flexboxLayout>
  );
}

export function SettingsScreen({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [discoverable, setDiscoverable] = React.useState(myProfile.discoverable);
  const [autoAccept, setAutoAccept] = React.useState(myProfile.autoAccept);
  const [saveToGallery, setSaveToGallery] = React.useState(myProfile.saveToGallery);

  return (
    <AppShell active="settings" onChange={onNavigate}>
      <AppHeader title="Ayarlar" />

      <stackLayout className="px-4 pb-8">
        {/* Profile: a single quiet card, avatar is the personality here */}
        <flexboxLayout flexDirection="row" alignItems="center" className="mb-6 mt-1 px-1">
          <stackLayout className="w-14 h-14 rounded-full bg-brand-700 justify-center items-center">
            <label fontSize={20} className="text-white font-bold" text={myProfile.name.charAt(0)} />
          </stackLayout>
          <stackLayout className="flex-1 ml-3.5">
            <label fontSize={19} className="text-ink-900 font-bold">{myProfile.name}</label>
            <label fontSize={12} className="text-ink-500 mt-0.5">
              {myProfile.model} · {myProfile.fingerprint}
            </label>
          </stackLayout>
          <label fontSize={13} className="text-brand-700 font-semibold">Düzenle</label>
        </flexboxLayout>

        <Title1>Ağ</Title1>
        <stackLayout className="card rounded-2xl border px-4 mb-5">
          <SettingRow
            label="Keşfedilebilir"
            sub="Aynı Wi-Fi'daki cihazlar seni listeler"
            value={discoverable}
            onToggle={() => setDiscoverable(!discoverable)}
          />
          <stackLayout className="h-px bg-ink-100" />
          <SettingRow
            label="Otomatik kabul"
            sub="Gelen dosyalar onay beklemeksizin alınır"
            value={autoAccept}
            onToggle={() => setAutoAccept(!autoAccept)}
          />
        </stackLayout>

        <Title1>Dosyalar</Title1>
        <stackLayout className="card rounded-2xl border px-4 mb-5">
          <SettingRow
            label="Galeriye kaydet"
            sub="Fotoğraf ve videolar doğrudan galeriye yazılır"
            value={saveToGallery}
            onToggle={() => setSaveToGallery(!saveToGallery)}
          />
          <stackLayout className="h-px bg-ink-100" />
          <flexboxLayout flexDirection="row" alignItems="center" justifyContent="space-between" className="py-3.5">
            <stackLayout className="flex-1 pr-3">
              <label fontSize={15} className="text-ink-900 font-semibold">Alınan klasörü</label>
              <label fontSize={12} className="text-ink-500 mt-0.5" textWrap={true}>
                /storage/emulated/0/Download/Freebuff
              </label>
            </stackLayout>
            <label fontSize={13} className="text-brand-700 font-semibold">Değiştir</label>
          </flexboxLayout>
        </stackLayout>

        <label fontSize={12} className="text-ink-400 text-center">
          Freebuff v0.1.0 · LocalSend protokolü · TLS
        </label>
      </stackLayout>
    </AppShell>
  );
}
