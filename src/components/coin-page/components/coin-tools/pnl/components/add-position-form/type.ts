import { Position } from '../../../types';
import { Dispatch, SetStateAction } from 'react';

interface AddPositionFormProps{
    newPosition: Position
    setNewPosition: Dispatch<SetStateAction<Position>>;
    toggle: () => void;
}

export type { AddPositionFormProps }