export function getParsedDate(stringDate: string) {
  const date = new Date(stringDate);
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
