declare module '*.png' {
  import type { StaticImageData } from 'next/image';

  const value: StaticImageData;
  export default value;
}

declare module '*.jpg' {
  import type { StaticImageData } from 'next/image';

  const value: StaticImageData;
  export default value;
}

declare module '*.gif' {
  import type { StaticImageData } from 'next/image';

  const value: StaticImageData;
  export default value;
}

declare module '*.svg' {
  import React from 'react';

  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };

  export default ReactComponent;
}
