declare module "consts:nebulaSafeDark.const" {
  const value: import("./rendering/constants").Color;
  export default value;
}

declare module "consts:prerender.const" {
  const value: boolean;
  export default value;
}

interface GA {
  (...args: any[]): void;
  q: any[];
}
declare var ga: GA;
interface Window {
  ga: GA;
}

declare var prerenderDone: () => void;

interface HTMLElement {
  webkitRequestFullscreen?: () => void;
}

// tslint:disable-next-line:no-namespace
declare namespace JSX {
  interface HTMLAttributes {
    inputmode?: string;
  }
}
