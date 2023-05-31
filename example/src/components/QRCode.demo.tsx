import type {FC} from "react";
import {useEffect, useState} from "react";
import { QRCodeCanvas } from 'qrcode.react'
import  { QRPoster } from "../../../src";

import './QRCode.demo.less'

function getQRCodePositionByKnownPosition(knownPosition, posterWidth, posterHeight) {
    const qrCodeWidth = 248;
    const qrCodeHeight = 242;
    const qrCodeX = (knownPosition.x / 704) * posterWidth;
    const qrCodeY = posterHeight - qrCodeHeight - ((996 - knownPosition.y) / 996) * posterHeight - 242;
    return {
        x: qrCodeX,
        y: qrCodeY,
        width: qrCodeWidth,
        height: qrCodeHeight
    };
}

const qr = getQRCodePositionByKnownPosition({ x: 227, y: 902 }, 1406 , 1992)


const QRCodeDemo: FC = () => {

    const [isReset, setStatus] = useState(false)

    return (
        <QRPoster render={() => (
            <div className="QRCodeWrapper">
                <img src="https://cdn.jsdelivr.net/gh/bigbigDreamer/pic-bed@main/uPic/Poster%201.png" crossOrigin="anonymous" />
                <QRCodeCanvas
                    className="qrcode"
                    value="www.baidu.com"
                    size={248*2}
                    imageSettings={{
                        width:qr.width,
                        height: qr.height
                    }}
                    style={{
                        top: qr.y,
                        left: qr.x
                    }}
                />
            </div>
        )}>
            {
                ({ generatePoster }) => {
                    const [url, setUrl] = useState("");

                    useEffect(() => {
                        generatePoster()
                            .then(url => setUrl(url))
                        setStatus(false);
                    }, [])

                    return (
                        (
                            <>
                                <div className="button-area">
                                    <button className="demo-button" onClick={() => {
                                        generatePoster()
                                            .then(url => setUrl(url))
                                        setStatus(false);
                                    }}>生成海报</button>
                                    <button className="demo-button" onClick={() => {
                                        setStatus(true)
                                    }}>重置</button>
                                </div>
                                <div className="demo-wrapper">
                                    {
                                        !isReset && <img src={url} />
                                    }
                                </div>
                            </>
                        )
                    )
                }
            }
        </QRPoster>
    )
}

export  default  QRCodeDemo
