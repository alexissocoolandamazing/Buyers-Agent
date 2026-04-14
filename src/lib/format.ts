export function formatMoneyShort(value: number) {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(value >= 1_500_000 ? 1 : 2).replace(/\.0$/, "")}m`;
  }

  return `$${Math.round(value / 1_000)}k`;
}

export function formatRent(value: number) {
  return `$${value.toLocaleString()}/wk`;
}

export function formatScore(value: number) {
  return value.toFixed(1);
}

export function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}
