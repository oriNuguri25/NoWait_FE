/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "color-thief-react" {
  export type ArrayRGB = [number, number, number];
  export type ColorFormats = "hex" | "hsl" | "rgb" | "rgbArray";

  export interface UseColorOptions {
    crossOrigin?: string;
    quality?: number;
  }

  export interface UseColorResult {
    data: string | ArrayRGB | undefined;
    loading: boolean;
    error: Error | null;
  }

  export function useColor(
    src: string,
    format: ColorFormats,
    options?: UseColorOptions
  ): UseColorResult;
}
