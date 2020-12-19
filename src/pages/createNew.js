import React, { useState, useRef } from "react";
import Header from "../components/header";
import { navigate } from "gatsby";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import shortid from "shortid";
import Lolly from '../components/Lolly';

const createLollyMutation = gql`
    mutation createLolly(
      $to: String! 
      $message: String!
      $from: String!
      $flavourTop: String!
      $flavourMiddle: String!
      $flavourBottom: String!
    ) {
      createLolly(
        to: $to
        message: $message 
        from: $from
        flavourTop: $flavourTop
        flavourMiddle: $flavourMiddle
        flavourBottom: $flavourBottom
      ) {
          lollyPath
          message
        }
    }
`

export default function CreateNew() {
    const initialValues ={ 
        to: "",
        from: "",
        message: ""
    };
    const validationSchema = Yup.object({
        to: Yup.string().required("Required").max(15, "Must be 15 characters or less"),
        from: Yup.string().required("Required").max(15, "Must be 15 characters or less"),
        message: Yup.string().required("Required"),
    });
    const onSubmit =  (values) => {
        const id = shortid.generate();
        const submitLollyForm = async () => {
            const result = await createLolly({
                variables: {
                    to: values.to,
                    from: values.from,
                    message: values.message,
                    flavorTop: colorTop,
                    flavorMiddle: colorMid,
                    flavorBottom: colorBot,
                    lollyPath: id,
                },
            })
        }
        submitLollyForm();
        navigate(`/lollies/${id}`);
    };
    const [colorTop, setcolorTop] = useState("#d52368")
    const [colorBot, setcolorBot] = useState("#deaa10")
    const [colorMid, setcolorMid] = useState("#e95946")
    const formik = useFormik({
        initialValues={initialValues},
        validationSchema={validationSchema},
        onSubmit={onSubmit}
    });
    const [createLolly] = useMutation(createLollyMutation)
    return (
        <div>
            <Header/>
            <div className="editorRoot">
                <div className="LollyCreaterColorContainer">
                    <Lolly
                        style="lollipopEditor"
                        lollyTop={colorTop}
                        lollyBot={colorBot}
                        lollyMid={colorMid}
                    />
                    <div className="colorSelectorContainer">
                        <label htmlFor="topFlavor" className="colorPickerLabel">
                            <input
                                className="colorPicker"
                                value={colorTop}
                                type="color"
                                name="topFlavor"
                                id="topFlavor"
                                onChange={e => {setcolorTop(e.target.value)}}
                            />
                        </label>
                        <label htmlFor="midFlavor" className="colorPickerLabel">
                            <input
                                className="colorPicker"
                                value={colorMid}
                                type="color"
                                name="midFlavor"
                                id="midFlavor"
                                onChange={e => {setcolorMid(e.target.value)}}
                            />
                        </label>
                        <label htmlFor="botFlavor" className="colorPickerLabel">
                            <input
                                className="colorPicker"
                                value={colorBot}
                                type="color"
                                name="botFlavor"
                                id="botFlavor"
                                onChange={e => {setcolorBot(e.target.value)}}
                            />
                        </label>
                    </div>
                </div>
                <form className="formContainer" onSubmit={formik.handleSubmit}>
                    <label className="formLabel" htmlFor="sendName">
                        To:
                    </label>
                    <div className="formErrors">
                        {formik.errors.to && formik.touched.to ? formik.errors.to : null}
                    </div>
                    <input
                        className="inputText"
                        type="text"
                        name="recName"
                        id="recName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label className="formLabel" htmlFor="msg">
                        Message:{" "}
                    </label>
                    <div className="formErrors">
                        {formik.errors.message && formik.touched.message ? formik.errors.message : null}
                    </div>
                    <textarea
                        id="message"
                        name="message"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="inputTextBox"
                        cols={30}
                        rows={15}
                    />

                    <label className="formLabel" htmlFor="Recname">
                        From:{" "}
                    </label>
                    <div className="formErrors">
                        {formik.errors.from && formik.touched.from ? formik.errors.from : null}
                    </div>
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="inputText"
                        type="text"
                        name="sendersName"
                        id="sendersName"
                    />
                    <button className="submitButton" type="submit">
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
};