import type {FC} from "react";
import { useState } from "react";
import { QRCodeCanvas } from 'qrcode.react'
import  { QRPoster } from "../../../src";

import './QRCode.demo.less'

const QRCodeDemo: FC = () => {

    const [isReset, setStatus] = useState(false)

    return (
        <QRPoster posterUrl="https://cdn.jsdelivr.net/gh/bigbigDreamer/pic-bed@main/uPic/jVjFha.png" render={({ url }) => (
            <div className="QRCodeWrapper">
                <img src={url} />
                <QRCodeCanvas
                    className="qrcode"
                    value="www.baidu.com"
                    size={95}
                    style={{
                        bottom: 56,
                        left: 270
                    }}
                />
            </div>
        )}>
            {
                ({ qrPosterUrl, generatePoster }) => (
                    <>
                        <div className="button-area">
                            <button className="demo-button" onClick={() => {
                                generatePoster();
                                setStatus(false);
                            }}>生成海报</button>
                            <button className="demo-button" onClick={() => {
                                setStatus(true)
                            }}>重置</button>
                        </div>
                        <div className="demo-wrapper">
                            {
                                !isReset && <img src={qrPosterUrl} />
                            }
                        </div>
                    </>
                )
            }
        </QRPoster>
    )
}

export  default  QRCodeDemo
