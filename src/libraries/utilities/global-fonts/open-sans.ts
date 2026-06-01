import { Open_Sans } from 'next/font/google';

export const fontOpenSans = Open_Sans({
  display: 'fallback',
  subsets: ['latin'],
  variable: '--fontFamily-body', // align with the general variable file
  weight: ['300', '400', '600', '700', '800'],
});
