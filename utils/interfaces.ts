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

export interface CSSPosition {
  top: number;
  left: number;
}

// ============================================================================
// Bento Ingredients Interfaces
// ============================================================================
// TODO: improve all the interfaces below
export interface Ingredient {
  id?: string;
  width: number;
  height: number;
  variant: IngredientVariant;
}

export interface DraggableIngredient extends Ingredient {
  type: DraggableType;
  coordinate?: Coordinates;
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

export type BentoIngredientsGrid = (BentoIngredientType | null)[][];

// ============================================================================
// Resize Interfaces
// ============================================================================
export interface ResizableProps {
  children: React.ReactNode;
  childWidth: number;
  childHeight: number;
  coordinate: Coordinates;
  squareWidth: number;
  squareHeight: number;
  padding?: number;
  borderWidth?: number;
  borderColor?: string;
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

export enum DraggableType {
  IN_ADD_INGREDIENT = "IN_ADD_INGREDIENT",
  IN_BENTO = "IN_BENTO",
}

// ============================================================================
// Props Interfaces
// ============================================================================

// Ingredient.tsx
export interface IngredientProps {
  bentoDimension: Dimension;
  ingredient: BentoIngredientType;
  variant: IngredientVariant;
  bentoWidth: number;
  bentoHeight: number;
  padding?: number;
}

export interface ResizeStartCallbackProps {
  coordinateOfObject: { x: number; y: number };
  directionOfResize: ResizeDirection;
}

export interface ResizeEndCallbackProps {
  squaresMoved: number;
}

export interface ShouldResizeCallbackProps extends ResizeEndCallbackProps {}
