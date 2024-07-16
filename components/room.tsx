"use client";

import { ReactNode } from "react";

import { RoomProvider } from "@liveblocks/react";

import { ClientSideSuspense ,LiveblocksProvider } from "@liveblocks/react";
interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}
export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <LiveblocksProvider authEndpoint='/api/liveblocks-auth'>
    <RoomProvider id={roomId} initialPresence={{cursor: null}}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
   </LiveblocksProvider>
  );
};
