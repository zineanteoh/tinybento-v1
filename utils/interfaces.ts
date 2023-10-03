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
// Enums
// ============================================================================
export enum IngredientVariant {
  DROPPED = "dropped",
  PREVIEW = "preview",
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
