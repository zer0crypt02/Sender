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
