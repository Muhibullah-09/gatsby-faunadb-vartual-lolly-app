import { gql, useMutation } from "@apollo/client";
import React, {  useState } from "react"
import Header from "../component/Header"
import Lolly from "../component/Lolly"
import LollyFormik from "../component/LollyFormik"
import { navigate } from "gatsby"

const createLollyMutation = gql`
    mutation createLolly($recipientName: String!, $message: String!, $senderName: String!, $flavourTop: String!, $flavourMiddle: String!,$flavourBottom: String!) {
        createLolly(recipientName: $recipientName, message: $message, senderName: $senderName, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle,flavourBottom: $flavourBottom) {
            message
            lollyPath
        }
    }
`

export default function CreateNew() {
    const [color1, setColor1] = useState("#d52358");
    const [color2, setColor2] = useState("#e95946");
    const [color3, setColor3] = useState("#deaa43");
    // const recipientNameRef = useRef();
    // const messageRef = useRef();
    // const senderRef = useRef();

    const [createLolly] = useMutation(createLollyMutation);
    const submitLollyForm = async ({ recipientName, message, senderName }) => {
        // console.log("sender", senderRef.current.value);
        const Data = {
            // recipientName: recipientNameRef.current.value,
            // message: messageRef.current.value,
            // senderName: senderRef.current.value,
            // flavourTop: color1,
            // flavourMiddle: color2,
            // flavourBottom: color3,
            recipientName,
            message,
            senderName,
            color1,
            color2,
            color3
        }
        const result = await createLolly({ variables: Data })
        navigate(`/${result.data.createLolly.lollyPath}`)
        // recipientNameRef.current.value = "";
        // messageRef.current.value = "";
        // senderRef.current.value = "";
    }
    // const handleSubmit = async ({ to, from, message }) => {
    //     const formData = {
    //       to,
    //       from,
    //       message,
    //       topColor,
    //       midColor,
    //       botColor,
    //     }
    //     const result = await createLolly({ variables: formData })
    //     navigate(`/${result.data.createLolly.lollyPath}`)
    //   }

    return (
        <div className="container">
            <Header />
            <div className="lollyFormDiv">
                <div>
                    <Lolly
                        fillLollyTop={color1}
                        fillLollyMiddle={color2}
                        fillLollyBottom={color3}

                    />
                </div>
                <div className="lollyFlavourDiv">
                    <label htmlFor="flavourTop" className="colorPickerLabel">
                        <input type="color" value={color1} className="colorPicker" name="flavourTop" id="flavourTop"
                            onChange={(e) => {
                                setColor1(e.target.value)
                            }}
                        />
                    </label>
                    <label htmlFor="flavourTop" className="colorPickerLabel">
                        <input type="color" value={color2} className="colorPicker" name="flavourTop" id="flavourTop"
                            onChange={(e) => {
                                setColor2(e.target.value)
                            }}
                        />
                    </label>
                    <label htmlFor="flavourTop" className="colorPickerLabel">
                        <input type="color" value={color3} className="colorPicker" name="flavourTop" id="flavourTop"
                            onChange={(e) => {
                                setColor3(e.target.value)
                            }}
                        />
                    </label>
                </div>
                {/* <div> */}
                {/* <div className="lollyFrom">
                        <label htmlFor="recipientName">
                            To
                    </label>
                        <input type="text" name="recipientName" id="recipientName" ref={recipientNameRef} />
                        <label htmlFor="recipientName">
                            Message
                    </label>
                        <textarea rows="15" columns="30" ref={messageRef} />
                        <label htmlFor="recipientName">
                            From
                    </label>
                        <input type="text" name="senderName" id="senderName" ref={senderRef} />
                    </div>
                    <input type="button" value="Create Vartual Lolly" onClick={submitLollyForm} />
                </div> */}
                <LollyFormik onSubmit={submitLollyForm} />
            </div>
        </div>
    );
}
