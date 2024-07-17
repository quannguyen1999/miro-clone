"use client";

import { ReactNode } from "react";

import { RoomProvider } from "@liveblocks/react";

import { ClientSideSuspense ,LiveblocksProvider } from "@liveblocks/react";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer, NoteLayer } from "@/types/canvas";
interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}
export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <LiveblocksProvider authEndpoint='/api/liveblocks-auth' throttle={16}>
    <RoomProvider initialStorage={{
      layers: new LiveMap<string, LiveObject<NoteLayer>>(),
      layerIds: new LiveList([]),
    }} id={roomId} initialPresence={{cursor: null, selection: []}}> 
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
   </LiveblocksProvider>
  );
};
