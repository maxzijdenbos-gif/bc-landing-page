export function formatDateString(date: string, locale?: string): string {
  const dateObj = new Date(date);

  const options = <Intl.DateTimeFormatOptions>{
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  return dateObj.toLocaleDateString(locale, options)?.replace(',', '');
}
