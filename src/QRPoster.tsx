import {FC, ReactNode, useCallback, useRef} from "react";
import  { createPortal } from "react-dom";
import html2canvas from "html2canvas";
import {to} from "./util";

export type QRPosterProps = {
    render(): ReactNode | JSX.Element;
    children(props: { generatePoster: () => Promise<string> }): ReactNode | JSX.Element;
}
const QRPoster: FC<QRPosterProps> = ({ render, children }) => {

    const finalDom = useRef<HTMLDivElement>();

    const generatePoster = async () => {
        const [err, canvas] = await to(html2canvas(finalDom.current as HTMLElement, { useCORS: true, x: 0, y: 0, backgroundColor: '#ffffff', scale: 1 }))
        if(err) {
            throw new Error(err?.message);
        }
        return canvas.toDataURL('image/png');
    }

    const domRefBind = useCallback((node: HTMLDivElement) => {
        if(node) {
            finalDom.current = node;
        }
    }, [])

    return (
        <>
            {
                createPortal(<div style={{ position: 'absolute', left: '-9999px', zIndex: 99, overflow: "hidden" }} ref={domRefBind}>{render()}</div>, document.body)
            }
            {
                typeof children === 'function' ? children({ generatePoster }) : children
            }
        </>
    )
}

export { QRPoster }
