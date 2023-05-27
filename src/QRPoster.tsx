import React, {FC, ReactNode, useCallback, useLayoutEffect, useRef, useState} from "react";
import  { createPortal } from "react-dom";
import html2canvas from "html2canvas";
import { Poster } from "./poster";

export type QRPosterProps = {
    render(props: { url: string;}): ReactNode | React.JSX.Element;
    posterUrl: string;
    children(props: { qrPosterUrl: string; generatePoster: () => void }): ReactNode | React.JSX.Element;
}
const QRPoster: FC<QRPosterProps> = ({ render, posterUrl, children }) => {

    const posterRef = useRef(new Poster({ url: posterUrl }));
    const [url, setPosterUrl] = useState<string>('');
    const [qrPosterUrl, setQRPosterUrl] = useState<string>('');
    const finalDom = useRef<HTMLDivElement>();

    useLayoutEffect(() => {
        posterRef.current.init()
            .then(({ base64Url }) => {
                setPosterUrl(base64Url);
            })
    }, []);

    const generatePoster = () => {
        html2canvas(finalDom.current as HTMLElement, { useCORS: true, x: 0, y: 0, backgroundColor: '#ffffff', scale: 1 })
            .then(canvas => {
                const baseUrl = canvas.toDataURL('image/png');
                setQRPosterUrl(baseUrl);
            })
    }

    const domRefBind = useCallback((node: HTMLDivElement) => {
        if(node) {
            finalDom.current = node;
        }
    }, [])

    return (
        <>
            {
                createPortal(<div style={{ position: 'absolute', left: '-9999px', zIndex: 99, overflow: "hidden" }} ref={domRefBind}>{render({ url })}</div>, document.body)
            }
            {
                typeof children === 'function' ? children({ qrPosterUrl, generatePoster }) : children
            }
        </>
    )
}

export { QRPoster }
