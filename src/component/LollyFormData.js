import React, { useRef } from "react"
import Lolly from "./Lolly"

const LollyFromData = ({ lolly, location }) => {
    const shareRef = useRef(null)
    return (
        <div className="freezer-container">
            <Lolly
                fillLollyTop={lolly.fillLollyTop}
                fillLollyMiddle={lolly.fillLollyMiddle}
                fillLollyBottom={lolly.fillLollyBottom}
            />
            <div>
                <h1>
                    {lolly.recipientName} Made this lolly for {lolly.senderName}
                </h1>
                <textarea
                    className="message-from-freezer"
                    disabled
                    name="message"
                    id=""
                    cols={30}
                    rows={10}
                    value={lolly.message}
                ></textarea>
                <h2>Share it with:</h2>
                <input type="text" value={location.href} ref={shareRef} />{" "}
                <button
                    onClick={() => {
                        const thing = shareRef.current
                        thing.select()
                        document.execCommand("copy")
                    }}
                >
                    Copy
                </button>
            </div>
        </div>
    )
}

export default LollyFromData