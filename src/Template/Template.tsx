import { Link } from "gatsby";
import React from "react";
import Lolly from "../components/Lolly";
import "../styles/main.css";

const Template = ({ pageContext: { data } }) => {
  return (
    <div className="createLolly">
      <Lolly
        lollyTop={data.colorTop}
        lollyMiddle={data.colorMiddle}
        lollyBottom={data.colorBottom}
      />
      <div className="info">
        <div className="details">
          <p id="recipient" className="recipient">
            {data.recipient}
          </p>
          <div id="message" className="message">
            {data.message}
          </div>
          <p id="from" className="from">
            — {data.sender}
          </p>
        </div>
        <p className="bytheway">
          {data.sender}
          made this virtual lollipop for you. You can
          <Link to="/createLolly">make your own</Link> to send to a friend who
          deserve some sugary treat which won't rot their teeth...
        </p>
      </div>
    </div>
  );
};

export default Template;
