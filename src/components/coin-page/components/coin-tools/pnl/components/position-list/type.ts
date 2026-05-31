import { Position } from '../../../types';

interface PositionListProps{
    pos: Position
    index: number
    onRemove: (id: string) => void
}

export type {PositionListProps}