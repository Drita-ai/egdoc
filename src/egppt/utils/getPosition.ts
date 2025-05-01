import { SetImageX, SetImageY } from '../types/set-image-enum';

type Position = { X: number; Y: number };

// Function to generate a position
export function getPosition(x: SetImageX, y: SetImageY): Position {
    return { X: x, Y: y };
}