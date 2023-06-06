# 二维码海报组件

<p>

[![npm](https://img.shields.io/npm/dy/@montagejs/qr-poster)](https://www.npmjs.com/package/@montagejs/qr-poster)
[![GitHub](https://img.shields.io/github/license/bigbigDreamer/qr-poster)](https://github.com/bigbigDreamer/qr-poster/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/bigbigDreamer/qr-poster)](https://github.com/bigbigDreamer/qr-poster)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)

</p>

[English](./README.EN.md) | 简体中文

基于 `React` 的，具备 `Headless Component` 特性的海报二维码组件。

## 安装

```bash
# npm
$ npm i @montagejs/qr-poster --S
# pnpm
$ pnpm add @montagejs/qr-poster --S
```

## API

| params | type                                                                                     | desc                | version |
|--------|------------------------------------------------------------------------------------------|---------------------|---------|
| `children` | `(props: {generatePoster: () => Promise<string>}) => ReactNode ｜ JSX.Element;`           | render props 模式的回调函数 | 1.0.0   |
| `render` | `() => ReactNode                                                   ｜       JSX.Element;` | 即将渲染二维码海报的 `DOM`    | 1.0.0   |
| `h2cOptions` | [`Options`](https://html2canvas.hertzen.com/configuration)                                                                                     | html2Canvas 方法的配置项  | 1.1.1   |

## 背景

在常见的活动推广中，经常需要做宣传海报分享或者前台立牌做销售，我们希望可以进一步提升业务开发的效率；

传统的 `UI` 组件难以满足灵活多变且布局繁杂的二维码海报，需要一种解法“以不变应万变”；

## 目标

- 封装核心的海报生成能力、保存能力；
- 兼容性优良，满足 `webview` 内核低端设备；
- `Headless` 特性，不封装任何 `CSS`;

## 组件设计

在线导图：[Git Mind 导图传送门](https://gitmind.cn/app/docs/mqn5rh6w)

![](https://cdn.jsdelivr.net/gh/bigbigDreamer/pic-bed@main/uPic/75TdbH.png)

## 使用案例

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

## 致敬

如果没有社区中各种项目的启发和支持，QRPoster今天将无法出货。我们想向这些前辈表示敬意：

- [html2canvas](https://html2canvas.hertzen.com/) 提供了将 `DOM` 转换为图像的功能；
- [await-to-js](https://github.com/scopsy/await-to-js/blob/master/src/await-to-js.ts) 提供了处理 await 错误的方式；
- [rollup](https://cn.rollupjs.org/) 提供构建支持；

## 协议

[MIT](./LICENSE). Copyright By 不换.
