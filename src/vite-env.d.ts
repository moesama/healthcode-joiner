/// <reference types="vite/client" />

declare module "canvas-to-image" {
    function canvasToImage(el: HTMLCanvasElement | string, options: any): void;
    export = canvasToImage;
}