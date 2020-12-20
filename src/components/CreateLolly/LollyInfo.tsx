import { Link } from "gatsby";
import React, { FC } from "react";

type Props = {
  recipient: string;
  message: string;
  sender: string;
  lollyPath: string;
  setSubmission: React.Dispatch<React.SetStateAction<boolean>>;
};

const LollyInfo: FC<Props> = ({
  recipient,
  message,
  sender,
  lollyPath,
  setSubmission,
}) => {
  return (
    <div className="info">
      <p className="share">Your lolly is freezing. Share it with this link: </p>
      <pre>{`${location.origin}/${lollyPath}`}</pre>
      <p></p>
      <div className="details">
        <p id="recipient" className="recipient">
          {recipient}
        </p>
        <div id="message" className="message">
          {message}
        </div>
        <p id="from" className="from">
          — {sender}
        </p>
      </div>
      <p className="bytheway">
        {sender} made this virtual lollipop for you. You can{" "}
        <Link to="/createLolly" onClick={() => setSubmission(false)}>
          make your own
        </Link>{" "}
        to send to a friend who deserve some sugary treat which won't rot their
        teeth...
      </p>
    </div>
  );
};

export default LollyInfo;
