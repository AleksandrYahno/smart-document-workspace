export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}
