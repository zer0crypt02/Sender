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
