// ============================================================================
// Basic Bento Interfaces
// ============================================================================
export interface Dimension {
  width: number;
  height: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

// ============================================================================
// Bento Ingredients Interfaces
// ============================================================================
export interface Ingredient {
  width: number;
  height: number;
  variant: IngredientVariant;
}

export interface DroppedIngredientType extends Ingredient {
  coordinate: Coordinates;
  variant: IngredientVariant.DROPPED;
}

export interface PreviewIngredientType extends Ingredient {
  coordinate: Coordinates;
  variant: IngredientVariant.PREVIEW;
}

export type BentoIngredientType = DroppedIngredientType | PreviewIngredientType;

export type BentoIngredient2D = (BentoIngredientType | null)[][];

// ============================================================================
// Resize Interfaces
// ============================================================================
export interface ResizableProps {
  children: React.ReactNode;
  childWidth?: number;
  childHeight?: number;
  coordinate?: Coordinates;
  childStyleToApply?: React.CSSProperties;
  squareWidth?: number;
  squareHeight?: number;
  borderWidth?: number;
  borderColor?: string;
  startTop?: number;
  startLeft?: number;
  onResizeStartCallback?: (...arg: ResizeStartCallbackProps[]) => void;
  onResizeEndCallback?: (...arg: ResizeEndCallbackProps[]) => void;
  shouldResizeCallback?: (...arg: ShouldResizeCallbackProps[]) => boolean;
}

// ============================================================================
// Enums
// ============================================================================
export enum IngredientVariant {
  DROPPED = "dropped",
  PREVIEW = "preview",
}

export enum ResizeType {
  EXPAND = "EXPAND",
  SHRINK = "SHRINK",
}

export enum ResizeDirection {
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export enum DirectionMultiplier {
  LEFT = -1,
  TOP = -1,
  RIGHT = 1,
  BOTTOM = 1,
}

// ============================================================================
// Props Interfaces
// ============================================================================

// Ingredient.tsx
export interface IngredientProps {
  dimension: Dimension;
  ingredient: BentoIngredientType;
  variant: IngredientVariant;
}

export interface ResizeStartCallbackProps {
  coordinateOfObject: { x: number; y: number };
  directionOfResize: ResizeDirection;
}

export interface ResizeEndCallbackProps {
  squaresMoved: number;
}

export interface ShouldResizeCallbackProps extends ResizeEndCallbackProps {}
