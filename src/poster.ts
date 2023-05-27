import  { to } from './util';
export class Poster {
    private url: string;
    private virtualCanvas: HTMLCanvasElement;
    constructor(props: { url: string }) {
        this.url = props.url;
        this.virtualCanvas = document.createElement('canvas')
    }

    async init(): Promise<{
        width: number; height: number; image: CanvasImageSource; base64Url: string
    }> {
        const [err, data] = await  to<{ width: number; height: number; image: CanvasImageSource }>(this.getRealPx());

        if(err) {
            throw new Error('GetRealPx Error')
        }
        const [transErr, base64Url] = await to<string>(this.transformUrlToBase64({ ...data }));

        if(transErr) {
            throw new Error('TransformImgToBase64 Error')
        }

        return {
            ...data,
            base64Url
        }
    }

    async getRealPx(): Promise<{ width: number; height: number; image: CanvasImageSource }> {
        return new Promise((res, rej) => {
            const virtualImg = new Image();
            virtualImg.src = this.url;
            virtualImg.crossOrigin = 'anonymous';
            virtualImg.onload = function () {
                res({
                    width: virtualImg.width,
                    height: virtualImg.height,
                    image: virtualImg
                })
            };

            virtualImg.onerror = err => rej(err);
        })
    }

    async transformUrlToBase64(imgInfo: { width: number; height: number; image: CanvasImageSource }): Promise<string> {

        return new Promise((res, rej) => {
            this.virtualCanvas.width = imgInfo.width;
            this.virtualCanvas.height = imgInfo.height;

            const ctx = this.virtualCanvas.getContext('2d');
            if(ctx) {
                ctx && ctx.drawImage(imgInfo.image, 0, 0);
                const base64data = this.virtualCanvas.toDataURL();
                res(base64data);
            } else {
                rej(new Error('Canvas ctx is not found!'))
            }
        })

    }
}
