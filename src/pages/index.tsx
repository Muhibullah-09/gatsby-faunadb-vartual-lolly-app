import { Link } from "gatsby";
import React from "react";
import Lolly from "../components/Lolly";
import "../styles/main.css";

const Home = () => {
  return (
    <div>
      <div className="lolliesList">
        <Lolly lollyTop="#fa4234" lollyBottom="#e6194c" lollyMiddle="#00a3a6" />
        <Lolly lollyTop="#651bde" lollyBottom="#21ed87" lollyMiddle="#00a3a6" />
        <Lolly lollyTop="#fa4234" lollyBottom="#e6194c" lollyMiddle="#651bde" />
        <Lolly lollyTop="#4db800" lollyBottom="#f2075d" lollyMiddle="#00a3a6" />
        <Lolly lollyTop="#21ed87" lollyBottom="#4067a3" lollyMiddle="#f22307" />
      </div>

      <Link to="/createLolly" className="btn">
        Make a new lolly to send to a friend
      </Link>
    </div>
  );
};

export default Home;