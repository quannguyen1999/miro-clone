"use client";

import { useSelectionBounds } from "@/hook/use-selection-bounds";
import { Camera, Color } from "@/types/canvas";
import { useSelf } from "@liveblocks/react";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import {
    useCanRedo,
    useCanUndo,
    useHistory,
    useMutation,
    useOthersMapped,
    useStorage,
  } from "@liveblocks/react";
import { useDeleteLayers } from "@/hook/use-delete-layers";
import { Hint } from "@/components/ui/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const moveToBack = useMutation((
      {storage}
    ) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];
      const arr = liveLayerIds.toImmutable();

      for(let i = 0;i < arr.length; i++){
        if(selection?.includes(arr[i])){
          indices.push(i);
        }
      }

      for(let i = 0;i<indices.length; i++){
        liveLayerIds.move(indices[i], i);
      }
    }, [selection]);

    const moveToFont = useMutation((
      {storage}
    ) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];
      const arr = liveLayerIds.toImmutable();

      for(let i = 0;i < arr.length; i++){
        if(selection?.includes(arr[i])){
          indices.push(i);
        }
      }

      for(let i = indices.length - 1; i >= 0; i--){
        liveLayerIds.move(indices[i], arr.length - 1 - (indices.length - 1- i));
      }
    }, [selection]);
   
    const setFill = useMutation((
        { storage }: any,
        fill: Color
    ) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);
        selection?.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
    },
      [selection, setLastUsedColor]
    );

    const deleteLayers = useDeleteLayers();

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(
                    calc(${x}px - 50%),
                    calc(${y - 16}px - 100%)
                )`,
        }}
      >
        <ColorPicker onChange={setFill} />
        <div className="flex flex-col gap-y-0.5">
          <Hint label="Bring to front" sideOffset={16}>
            <Button onClick={moveToFont} variant="board" size="icon">
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="Send to back" side="bottom" sideOffset={16}>
            <Button onClick={moveToBack} variant="board" size="icon">
              <SendToBack />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center border-neutral-200 pl-2 ml-2 border-l">
            <Hint sideOffset={16} label="Delete">
                <Button variant="board" size="icon" onClick={deleteLayers}>
                    <Trash2 />
                </Button>
            </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
