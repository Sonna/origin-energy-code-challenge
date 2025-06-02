export function getTotalColour(amount: number): "danger" | "success" | "muted" {
  if (amount > 0) return "danger";
  if (amount < 0) return "success";
  return "muted";
}
