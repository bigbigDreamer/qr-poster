# QR code poster component

<p>

[![npm](https://img.shields.io/npm/dy/@montagejs/qr-poster)](https://www.npmjs.com/package/@montagejs/qr-poster)
[![GitHub](https://img.shields.io/github/license/bigbigDreamer/qr-poster)](https://github.com/bigbigDreamer/qr-poster/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/bigbigDreamer/qr-poster)](https://github.com/bigbigDreamer/qr-poster)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)

</p>

English | [简体中文](./README.ZH.md)

Based on `React`, a poster QR code component with `Headless Component` feature.

## Install

```bash
# npm
$ npm i @montagejs/qr-poster --S
# pnpm
$ pnpm add @montagejs/qr-poster --S
```

## API

| params | type                                                                                     | desc                         | version |
|--------|------------------------------------------------------------------------------------------|------------------------------|---------|
| `children` | `(props: {generatePoster: () => Promise<string>}) => ReactNode ｜ JSX.Element;`           | render props function        | 1.0.0   |
| `render` | `() => ReactNode                                                   ｜       JSX.Element;` | will generate qrPoster‘s dom | 1.0.0   |
| `h2cOptions` | [`Options`](https://html2canvas.hertzen.com/configuration)                                                                                     | will generate qrPoster‘s dom | 1.1.1   |

## Background

In common event promotion, it is often necessary to share promotional posters or set up sales signs at the front desk. We hope to further improve the efficiency of business development.

The traditional 'UI' components are difficult to meet the flexible and complex layout of QR code posters, requiring a solution that can adapt to changes.

## Target

- Encapsulate core poster generation and storage capabilities;
- Excellent compatibility, meeting the needs of low-end devices with `webview` kernel;
- `Headless` feature;

## Component design

Online map：[Git Mind](https://gitmind.cn/app/docs/mqn5rh6w)

![](https://cdn.jsdelivr.net/gh/bigbigDreamer/pic-bed@main/uPic/75TdbH.png)

## Usage

```tsx
import type {FC} from 'react';
import {useEffect, useState} from 'react';
import {QRCodeCanvas} from 'qrcode.react';
import {QrPoster} from '@montagejs/qr-poster';
import './QRCode.demo.less';

function getQRCodePositionByKnownPosition(knownPosition, posterWidth, posterHeight) {
	const qrCodeWidth = 248;
	const qrCodeHeight = 242;
	const qrCodeX = (knownPosition.x / 704) * posterWidth;
	const qrCodeY = posterHeight - qrCodeHeight - ((996 - knownPosition.y) / 996) * posterHeight - 242;
	return {
		x: qrCodeX,
		y: qrCodeY,
		width: qrCodeWidth,
		height: qrCodeHeight,
	};
}

const qr = getQRCodePositionByKnownPosition({x: 227, y: 902}, 1406, 1992);

const QRCodeDemo: FC = () => {
	const [isReset, setStatus] = useState(false);

	return (
		<QrPoster render={() => (
			<div className='QRCodeWrapper'>
				<img src='https://cdn.jsdelivr.net/gh/bigbigDreamer/pic-bed@main/uPic/Poster%201.png' crossOrigin='anonymous' />
				<QRCodeCanvas
					className='qrcode'
					value='www.baidu.com'
					size={248 * 2}
					imageSettings={{
						width: qr.width,
						height: qr.height,
					}}
					style={{
						top: qr.y,
						left: qr.x,
					}}
				/>
			</div>
		)}>
			{
				({generatePoster}) => {
					const [url, setUrl] = useState('');

					useEffect(() => {
						generatePoster()
							.then(url => {
								setUrl(url);
							});
						setStatus(false);
					}, []);

					return (
						(
							<>
								<div className='demo-wrapper'>
                                    <img src={url} />
								</div>
							</>
						)
					);
				}
			}
		</QrPoster>
	);
};

```


## Acknowledgement

QRPoster can not be shipped today without the inspiration and support of various projects in the community. We would like to show our respect to these predecessors:

- [html2canvas](https://html2canvas.hertzen.com/) provided the ability to convert `DOM` into images;
- [await-to-js](https://github.com/scopsy/await-to-js/blob/master/src/await-to-js.ts) provided handle await error way;
- [rollup](https://cn.rollupjs.org/) provide construction support;

## LICENSE

[MIT](./LICENSE). Copyright By 不换.
