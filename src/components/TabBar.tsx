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
