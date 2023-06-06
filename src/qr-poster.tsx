import {useCallback, useRef} from 'react';
import {createPortal} from 'react-dom';
import html2canvas from 'html2canvas';
import type {FC, ReactNode} from 'react';
import type {Options} from 'html2canvas';
import {to} from './util';

export type QRPosterProps = {
	h2cOptions?: Options;
	render(): ReactNode | JSX.Element;
	children(props: {generatePoster: () => Promise<string>}): ReactNode | JSX.Element;
};
const QrPoster: FC<QRPosterProps> = ({render, children, h2cOptions}) => {
	const finalDom = useRef<HTMLDivElement>();

	const generatePoster = async () => {
		const [error, canvas] = await to(html2canvas(finalDom.current as HTMLElement, {useCORS: true, x: 0, y: 0, backgroundColor: null, scale: 1, ...h2cOptions}));
		if (error) {
			throw new Error(error?.message);
		}

		return canvas.toDataURL('image/png');
	};

	const domRefBind = useCallback((node: HTMLDivElement) => {
		if (node) {
			finalDom.current = node;
		}
	}, []);

	return (
		<>
			{
				createPortal(<div style={{position: 'absolute', left: '-9999px'}} ref={domRefBind}>{render()}</div>, document.body)
			}
			{
				typeof children === 'function' ? children({generatePoster}) : children
			}
		</>
	);
};

export {QrPoster};
