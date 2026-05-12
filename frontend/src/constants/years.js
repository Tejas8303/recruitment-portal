export const years = Array.from(
  { length: 80 },
  (_, i) => new Date().getFullYear() - i
);