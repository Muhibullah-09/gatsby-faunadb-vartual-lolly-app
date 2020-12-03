import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

interface LollyFormTypes {
  recipientName: string
  senderName: string
  message: string
}

const Schema = Yup.object().shape({
  recipientName: Yup.string().required("Recipient Required"),
  senderName: Yup.string().required("Sender Required"),
  message: Yup.string().required("Message Required"),
})

const LollyFormik = props => {
  const initialValues: LollyFormTypes = {
    recipientName: "",
    message: "",
    senderName: "",
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        props.onSubmit(values)
      }}
      validationSchema={Schema}
    >
      <Form className="lolly-info-form">
        <label>
          To: <Field name="to" type="text" />{" "}
        </label>
        <ErrorMessage component="div" name="to" className="error" />
        <label htmlFor="message">Message:</label>
        <ErrorMessage component="div" name="message" className="error" />
        <Field as="textarea" name="message" id="message" rows={15} />
        <label>
          From: <Field name="from" type="text" />{" "}
        </label>
        <ErrorMessage component="div" name="from" className="error" />
        <Field type="submit" value="Create" />
      </Form>
    </Formik>
  )
}

export default LollyFormik