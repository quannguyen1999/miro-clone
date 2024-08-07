import { Loader2 } from "lucide-react";

import { Participants, ParticipantsSkeleton } from "./participants";
import Info, { InfoSkeleton } from "./info";
import Toolbar, { ToolbarSkeleton } from "./toolbar";

export const Loading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader2 className="h-4 w-6 text-muted-foreground animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
};
