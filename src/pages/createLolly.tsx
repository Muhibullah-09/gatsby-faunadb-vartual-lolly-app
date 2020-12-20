import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import ColorPicker from "../components/CreateLolly/ColorPicker";
import Details from "../components/CreateLolly/Details";
import LollyInfo from "../components/CreateLolly/LollyInfo";
import Lolly from "../components/Lolly";
import "../styles/main.css";

const ADD_LOLLY = gql`
  mutation addLolly(
    $colorTop: String!
    $colorMiddle: String!
    $colorBottom: String!
    $recipient: String!
    $message: String!
    $sender: String!
    $lollyPath: String!
  ) {
    addLolly(
      colorTop: $colorTop
      colorMiddle: $colorMiddle
      colorBottom: $colorBottom
      recipient: $recipient
      message: $message
      sender: $sender
      lollyPath: $lollyPath
    ) {
      id
      colorTop
      colorMiddle
      colorBottom
      recipient
      message
      sender
      lollyPath
    }
  }
`;

const createLolly = () => {
  const [colorTop, setColorTop] = useState("#fa4234");
  const [colorMiddle, setColorMiddle] = useState("#651bde");
  const [colorBottom, setColorBottom] = useState("#e6194c");

  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [submission, setSubmission] = useState<boolean>(false);
  const [link, setLink] = useState("");

  const [addLolly] = useMutation(ADD_LOLLY);

  useEffect(() => {
    if (submission === true) {
      addLolly({
        variables: {
          colorTop: colorTop,
          colorMiddle: colorMiddle,
          colorBottom: colorBottom,
          recipient: recipient,
          message: message,
          sender: sender,
          lollyPath: link,
        },
      });
    }
  }, [submission === true]);

  return (
    <div className="createLolly">
      <Lolly
        lollyTop={colorTop}
        lollyMiddle={colorMiddle}
        lollyBottom={colorBottom}
      />

      {submission === true ? (
        <LollyInfo
          recipient={recipient}
          message={message}
          sender={sender}
          lollyPath={link}
          setSubmission={setSubmission}
        />
      ) : (
        <>
          <ColorPicker
            colorTop={colorTop}
            setColorTop={setColorTop}
            colorMiddle={colorMiddle}
            setColorMiddle={setColorMiddle}
            colorBottom={colorBottom}
            setColorBottom={setColorBottom}
          />

          <Details
            setRecipient={setRecipient}
            setMessage={setMessage}
            setSender={setSender}
            setSubmission={setSubmission}
            setLink={setLink}
          />
        </>
      )}
    </div>
  );
};

export default createLolly;