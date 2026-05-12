export function calculateExperience(fromDate, toDate) {
  if (!fromDate || !toDate) return "";

  const start = new Date(fromDate);
  const end = new Date(toDate);

  const diff = end - start;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365)) /
      (1000 * 60 * 60 * 24 * 30)
  );
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 30)) /
      (1000 * 60 * 60 * 24)
  );

  return `${years} Years, ${months} Months, ${days} Days`;
}