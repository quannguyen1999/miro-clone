'use client'

import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySEarch } from "./empty-search";

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    }
}

export const BoardList = ({
    orgId,
    query
}: BoardListProps) => {
    const data = [];
    if(!data?.length && query.search){
        return (
            <EmptySEarch />
        )
    }
    if(!data?.length && query.favorites){
        return (
            <EmptyFavorites />
        )
    }

    if(!data?.length){
        return (
            <EmptyBoards />
        )
    }
    return (
        <div>
            {JSON.stringify(query)}
        </div>
    )
}