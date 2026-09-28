# Freebuff → StackBlitz Aktarım Paketi

Bu dosyadaki içerikleri StackBlitz editörüne sırayla uygula.
Her bloğun başındaki yol, içeriği yapıştıracığın dosyadır.

## 0) Önce sil

StackBlitz dosya ağacında sağ tık → Delete:

- `src/components/ScreenOne.tsx`
- `src/components/ScreenTwo.tsx`
- `src/NavigationParamList.ts`

## 1) Yeni klasör ve dosyalar

Dosya ağacında ilgili klasöre sağ tık → **New File** → yolunu yaz
(yeni klasörleri yol yazarken otomatik oluşturur: `lib/data.ts` gibi).

---

### 📄 `tailwind.config.js` (MEVCUT DOSYANIN TAMAMINI DEĞİŞTİR)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{css,xml,html,vue,svelte,ts,tsx}'
  ],
  // use the .ns-dark class to control dark mode (applied by NativeScript) - since 'media' (default) is not supported.
  darkMode: ['class', '.ns-dark'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effaf7',
          100: '#d7f0ea',
          200: '#aee0d5',
          300: '#78c9ba',
          400: '#45ae9d',
          500: '#21927f',
          600: '#0d9488',
          700: '#0c756c',
          800: '#0f5d57',
          900: '#124d48'
        },
        // Neutrals tinted toward the brand hue (teal), not gray/slate.
        // Pure white/black never used; every surface carries a hint of brand.
        ink: {
          50: '#f4f9f8',
          100: '#e7f0ee',
          200: '#d3e3e0',
          400: '#789c96',
          500: '#5d7d77',
          700: '#334f4a',
          900: '#122622'
        }
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false // disables browser-specific resets
  }
}
```

---

### 📄 `src/app.css` (TAMAMINI DEĞİŞTİR)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ---- Global app styling (white premium theme, teal-tinted neutrals) ---- */

ActionBar {
  background-color: #f7fbfa;
  color: #122622;
}

/* Page surface: slightly tinted so white cards read as real surfaces */
.page {
  background-color: #f7fbfa;
}

.tabbar {
  background-color: #ffffff;
  border-top-color: #d3e3e0;
}

.tab-item {
  color: #63837d;
}

.tab-item-active {
  color: #0c756c;
}

.card {
  background-color: #ffffff;
  border-color: #e0ebe8;
}
```

---

### 📄 `src/lib/data.ts` (YENİ DOSYA)

```ts
/**
 * Central data model for the app.
 *
 * For now this is populated with mock data so the UI can be built and
 * polished end-to-end. When the LocalSend protocol layer lands
 * (UDP discovery + HTTPS on port 53317), only this module needs to change —
 * every screen reads from here.
 */

export type DeviceKind = "phone" | "tablet" | "laptop" | "desktop";

export type DeviceStatus = "online" | "pending" | "offline";

export interface Device {
  id: string;
  name: string;
  os: string;
  kind: DeviceKind;
  status: DeviceStatus;
  /** Local IP on the network, shown in the device sheet. */
  ip: string;
}

export type TransferDirection = "in" | "out";

export type TransferStatus = "done" | "sending" | "receiving" | "failed";

export interface Transfer {
  id: string;
  fileName: string;
  /** Human readable size, e.g. "2,4 MB". */
  size: string;
  direction: TransferDirection;
  status: TransferStatus;
  peerName: string;
  time: string;
  /** 0..100, only meaningful while sending/receiving. */
  progress?: number;
}

export interface MyProfile {
  name: string;
  model: string;
  /** Short fingerprint shown under the name, e.g. last 4 bytes of the device id. */
  fingerprint: string;
  ip: string;
  port: number;
  discoverable: boolean;
  autoAccept: boolean;
  saveToGallery: boolean;
}

export const myProfile: MyProfile = {
  name: "Melih'in Android'i",
  model: "Pixel 8",
  fingerprint: "f4:2a:9c",
  ip: "192.168.1.24",
  port: 53317,
  discoverable: true,
  autoAccept: false,
  saveToGallery: true,
};

export const nearbyDevices: Device[] = [
  { id: "d1", name: "MacBook Pro", os: "macOS", kind: "laptop", status: "online", ip: "192.168.1.10" },
  { id: "d2", name: "Pixel 8", os: "Android", kind: "phone", status: "online", ip: "192.168.1.24" },
  { id: "d3", name: "Oyun PC'si", os: "Windows", kind: "desktop", status: "pending", ip: "192.168.1.31" },
  { id: "d4", name: "Galaxy Tab", os: "Android", kind: "tablet", status: "offline", ip: "192.168.1.42" },
];

export const recentTransfers: Transfer[] = [
  {
    id: "t1",
    fileName: "site-mockup-v3.fig",
    size: "18,2 MB",
    direction: "out",
    status: "sending",
    peerName: "MacBook Pro",
    time: "şimdi",
    progress: 72,
  },
  {
    id: "t2",
    fileName: "IMG_20260920_182234.jpg",
    size: "4,8 MB",
    direction: "in",
    status: "done",
    peerName: "Pixel 8",
    time: "12:04",
  },
  {
    id: "t3",
    fileName: "sunum-final.pdf",
    size: "9,1 MB",
    direction: "in",
    status: "receiving",
    peerName: "Oyun PC'si",
    time: "11:47",
    progress: 35,
  },
  {
    id: "t4",
    fileName: "viruslu_degil.exe",
    size: "642 MB",
    direction: "in",
    status: "failed",
    peerName: "Oyun PC'si",
    time: "Dün",
  },
  {
    id: "t5",
    fileName: "muzik-karaoke.mp3",
    size: "7,3 MB",
    direction: "out",
    status: "done",
    peerName: "Galaxy Tab",
    time: "Dün",
  },
  {
    id: "t6",
    fileName: "kayit.m4a",
    size: "1,1 GB",
    direction: "in",
    status: "done",
    peerName: "MacBook Pro",
    time: "Pzt",
  },
];
```

---

### 📄 `src/components/ui.tsx` (YENİ DOSYA)

```tsx
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
```

---

### 📄 `src/components/TabBar.tsx` (TAMAMINI DEĞİŞTİR)

```tsx
import * as React from "react";
import { myProfile } from "../lib/data";

const tabs = [
  { key: "send", label: "Gönder", icon: "↑" },
  { key: "receive", label: "Al", icon: "↓" },
  { key: "transfers", label: "Aktarım", icon: "⇅" },
  { key: "settings", label: "Ayarlar", icon: "⚙" },
];

export function TabBar({
  active,
  onChange,
}: {
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <stackLayout className="tabbar border-t pt-2 pb-6 px-2">
      <flexboxLayout flexDirection="row">
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <stackLayout
              key={tab.key}
              className="flex-1 items-center"
              onTap={() => onChange(tab.key)}
            >
              <stackLayout
                className={
                  "w-14 h-8 rounded-full justify-center items-center " +
                  (isActive ? "bg-brand-100" : "bg-transparent")
                }
              >
                <label
                  fontSize={14}
                  text={tab.icon}
                  className={isActive ? "text-brand-800 font-bold" : "text-ink-400"}
                />
              </stackLayout>
              <label
                fontSize={10}
                className={isActive ? "text-brand-800 font-bold" : "text-ink-500"}
              >
                {tab.label}
              </label>
            </stackLayout>
          );
        })}
      </flexboxLayout>
    </stackLayout>
  );
}

/** Whole app shell: active screen in the middle, persistent bottom tab bar. */
export function AppShell({
  active,
  onChange,
  children,
}: {
  active: string;
  onChange: (key: string) => void;
  children: any;
}) {
  return (
    <gridLayout rows="*, auto" className="page">
      <scrollView row={0}>{children}</scrollView>
      <TabBar active={active} onChange={onChange} row={1} />
    </gridLayout>
  );
}

/** Consistent header: quiet page title + avatar that opens the profile. */
export function AppHeader({ title }: { title: string }) {
  return (
    <flexboxLayout
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      className="px-5 pt-5 pb-1"
    >
      <stackLayout>
        <label fontSize={12} className="text-ink-500">{myProfile.model}</label>
        <label fontSize={24} className="text-ink-900 font-bold">{title}</label>
      </stackLayout>
      <stackLayout className="w-10 h-10 rounded-full bg-brand-700 justify-center items-center">
        <label fontSize={16} className="text-white font-bold" text={myProfile.name.charAt(0)} />
      </stackLayout>
    </flexboxLayout>
  );
}
```

---

### 📄 `src/components/MainStack.tsx` (TAMAMINI DEĞİŞTİR)

```tsx
import * as React from "react";
import { SendScreen } from "./screens/SendScreen";
import { ReceiveScreen } from "./screens/ReceiveScreen";
import { TransfersScreen } from "./screens/TransfersScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

/**
 * Root component. The four tabs share one persistent bottom bar
 * (rendered inside each screen by AppShell), so navigation is plain
 * state — no stack push/pop needed for this app's shape.
 */
export function MainStack() {
  const [tab, setTab] = React.useState("send");

  switch (tab) {
    case "receive":
      return <ReceiveScreen onNavigate={setTab} />;
    case "transfers":
      return <TransfersScreen onNavigate={setTab} />;
    case "settings":
      return <SettingsScreen onNavigate={setTab} />;
    default:
      return <SendScreen onNavigate={setTab} />;
  }
}
```

---

### 📄 `src/components/screens/SendScreen.tsx` (YENİ DOSYA)

```tsx
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
```

---

### 📄 `src/components/screens/ReceiveScreen.tsx` (YENİ DOSYA)

```tsx
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
```

---

### 📄 `src/components/screens/TransfersScreen.tsx` (YENİ DOSYA)

```tsx
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
```

---

### 📄 `src/components/screens/SettingsScreen.tsx` (YENİ DOSYA)

```tsx
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
```

---

## 2) Bitti — kontrol

1. Sol üstten **Preview** sekmesine geç.
2. Uygulama "Gönder" ekranıyla açılmalı: teal hero kart, altında cihaz listesi, en altta 4 sekmeli bar.
3. Terminal hala kurulumdaysa bekle; `ns preview` komutu NativeScript Preview uygulamasına QR verecek.

## 3) (Opsiyonel) `tsconfig.json` düzeltmesi

Editördeki TypeScript uyarılarından bıktıysan `tsconfig.json` içinde
`"noEmitOnError": true,` satırının altına şunu ekle:

```json
    "skipLibCheck": true,
```
