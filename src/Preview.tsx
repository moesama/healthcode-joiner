import { Spin, UploadFile } from "antd";
import { createRef, Ref, useEffect, useImperativeHandle, useState } from "react";
import canvasToImage from "canvas-to-image";

const safePredicts: Record<"health" | "travel", (color: [number, number, number]) => boolean> = {
    "health": color => !(color[0] < 100 && color[2] > 200),
    "travel": color => !(color[0] < 100 && color[1] > 140 && color[1] > color[2]),
};

function loadImage(pic: UploadFile, predictSafe: (color: [number, number, number]) => boolean): Promise<[HTMLImageElement, number]> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(pic.originFileObj!);
        fileReader.onload = () => {
            const img = new Image();
            img.src = fileReader.result as any;
            img.onerror = reject;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const context = canvas.getContext("2d")!;
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
                const data = context.getImageData(0, 0, canvas.width, canvas.width / 2);
                for (let i = 0; i < data.height; i++) {
                    const offset = i * data.width * 4;
                    if (!predictSafe([data.data[offset], data.data[offset + 1], data.data[offset + 2]])) {
                        resolve([img, i]);
                        return;
                    }
                }
                resolve([img, 0]);
            };
        };
        fileReader.onerror = reject;
    });
}

export function Preview({
                            pics = [],
                            type,
                            loading,
                            onLoad,
                            onRef
                        }: { pics: UploadFile[], type: "health" | "travel", loading: boolean, onLoad: Function, onRef: Ref<{ save: Function }> }) {
    const [images, setImages] = useState<[HTMLImageElement, number][]>([]);

    const canvas = createRef<HTMLCanvasElement>();

    function save() {
        canvasToImage(canvas.current!, {
            name: `${type}_${new Date().getTime()}`,
            type: "png",
            quality: 1,
        });
    }

    useImperativeHandle(onRef, () => ({
        save
    }));

    useEffect(() => {
        Promise.all(pics.map(pic => loadImage(pic, safePredicts[type]).catch(e => {
            alert(e);
            return undefined;
        }))).then(imgs => imgs.filter(i => !!i)).then(setImages as any).finally(() => onLoad());
    }, [pics]);

    useEffect(() => {
        images.forEach(([img, safeArea], index) => {
            const width = img.naturalWidth;
            const height = width * 16 / 9;
            canvas.current?.getContext("2d")?.drawImage(img, 0, safeArea, width, height, 720 * index, 0, 720, 1280);
        });
    }, [images]);

    return <Spin spinning={loading}>
        <div style={{ overflow: "auto" }}>
            <canvas ref={canvas} width={720 * images.length} height={1280} style={{ height: 360 }}/>
        </div>
    </Spin>;
}