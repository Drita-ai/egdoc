import { getPosition } from '../utils/getPosition';

// Enums for Y positions (static value for all positions)
export enum SetImageY {
    Top = 0.25,
    Center = 1.75,
    Bottom = 3.5
}

// Enums for X positions (static value for all positions)
export enum SetImageX {
    Left = 0.25,
    Right = 6.75,
    Center = 3.25,
}

// Top positions using X and Y enums
export const SetImageTopLeft = getPosition(SetImageX.Left, SetImageY.Top);
export const SetImageTopRight = getPosition(SetImageX.Right, SetImageY.Top);
export const SetImageTopCenter = getPosition(SetImageX.Center, SetImageY.Top);

// Center positions using X and Y enums
export const SetImageCenterLeft = getPosition(SetImageX.Left, SetImageY.Center);
export const SetImageCenterRight = getPosition(SetImageX.Right, SetImageY.Center);
export const SetImageCenterCenter = getPosition(SetImageX.Center, SetImageY.Center);

// Bottom positions using X and Y enums
export const SetImageBottomLeft = getPosition(SetImageX.Left, SetImageY.Bottom);
export const SetImageBottomRight = getPosition(SetImageX.Right, SetImageY.Bottom);
export const SetImageBottomCenter = getPosition(SetImageX.Center, SetImageY.Bottom);
