export const AVG_SACHET_WEIGHT_GRAMS = 10.2;
export const WEEKS_PER_YEAR = 52;
export const CONTEXT_AVG_INDONESIAN_SACHET_KG_PER_YEAR = 4;

export function calcKemasanPerTahun(kemasanPerMinggu) {
  return kemasanPerMinggu * WEEKS_PER_YEAR;
}

export function calcKgLimbahPerTahun(kemasanPerMinggu) {
  const kemasanPerTahun = calcKemasanPerTahun(kemasanPerMinggu);
  return (kemasanPerTahun * AVG_SACHET_WEIGHT_GRAMS) / 1000;
}