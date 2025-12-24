import { IngredientType } from '../types/types';

const FALLBACK_MINUTES_PER_INGREDIENT = 1;
const BASE_ASSEMBLY_MINUTES = 2;
const MIN_ORDER_MINUTES = 5;
const MOCK_MINUTE_IN_MS = 1000;

const PREPARATION_TIME_BY_TYPE: Record<IngredientType['type'], number> = {
  bun: 2,
  main: 4,
  sauce: 1,
};

const createIngredientCache = (ingredients: IngredientType[]) =>
  ingredients.reduce<Record<string, IngredientType>>((acc, ingredient) => {
    acc[ingredient._id] = ingredient;
    return acc;
  }, {});

export const estimateCookingTimeMinutes = (
  ingredientIds: string[],
  ingredients: IngredientType[]
): number => {
  if (!ingredientIds.length) return MIN_ORDER_MINUTES;

  const ingredientCache = createIngredientCache(ingredients);

  const total = ingredientIds.reduce((acc, id) => {
    const ingredient = ingredientCache[id];
    const byType = ingredient
      ? PREPARATION_TIME_BY_TYPE[ingredient.type]
      : FALLBACK_MINUTES_PER_INGREDIENT;

    const preparationTime =
      ingredient?.preparationTimeMinutes ?? byType ?? FALLBACK_MINUTES_PER_INGREDIENT;

    return acc + preparationTime;
  }, BASE_ASSEMBLY_MINUTES);

  return Math.max(Math.round(total), MIN_ORDER_MINUTES);
};

export const buildOrderTiming = (
  ingredientIds: string[],
  ingredients: IngredientType[],
  minuteToMs: number = MOCK_MINUTE_IN_MS
) => {
  const estimatedCookingTimeMinutes = estimateCookingTimeMinutes(ingredientIds, ingredients);
  const autoCompleteDelayMs = Math.max(
    estimatedCookingTimeMinutes * minuteToMs,
    minuteToMs
  );
  const estimatedReadyAt = new Date(Date.now() + autoCompleteDelayMs).toISOString();

  return { estimatedCookingTimeMinutes, autoCompleteDelayMs, estimatedReadyAt };
};

export const mockMinuteInMs = MOCK_MINUTE_IN_MS;

export const convertEstimatedMinutesToSeconds = (
  minutes: number,
  minuteInMs: number = MOCK_MINUTE_IN_MS
) => Math.max(1, Math.round((minutes * minuteInMs) / 1000));
