type Breakpoints = Record<string, number>;

const breakpoints: Breakpoints = {
  desktop: 1920,
  laptop: 1440,
  mobile: 375,
  smallLaptop: 1025,
  tablet: 768,
};

function getPixelWidth(breakpoint: keyof typeof breakpoints, columns: number) {
  return Math.round((breakpoints[breakpoint] / 12) * columns);
}

export function generateImageSizes(
  mobile: number,
  tablet: number,
  smallLaptop: number,
  laptop: number,
  desktop: number,
) {
  return {
    maxFillWidth: getPixelWidth('desktop', desktop),
    sizes: [
      `(min-width: ${breakpoints.desktop}px) ${getPixelWidth(
        'desktop',
        desktop,
      )}px`,
      `(min-width: ${breakpoints.laptop}px) ${getPixelWidth(
        'laptop',
        laptop,
      )}px`,
      `(min-width: ${breakpoints.smallLaptop}px) ${getPixelWidth(
        'smallLaptop',
        smallLaptop,
      )}px`,
      `(min-width: ${breakpoints.tablet}px) ${getPixelWidth(
        'tablet',
        tablet,
      )}px`,
      `(min-width: ${breakpoints.mobile}px) ${getPixelWidth(
        'mobile',
        mobile,
      )}px`,
      `${breakpoints.mobile}px`, // fallback for screens smaller than the first breakpoint
    ].join(', '),
  };
}
