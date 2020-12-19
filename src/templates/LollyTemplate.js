import React from "react"
import Lolly from "../components/Lolly";
import { graphql } from "gatsby"
import Header from "../components/Header";

export const query = graphql`
  query MyQuery($lollyPath: String!) {
    LOLLIES {
      getLollyByPath(lollyPath: $lollyPath) {
        flavorBottom
        flavorMiddle
        flavorTop
        lollyPath
        message
        to
        from
      }
    }
  }
`

export default function DynamicLollyPage({ data }) {

  return (
    <div>
      <Header/>
      <h5 className="sharableLinkContainer">Your sharable link: </h5>{" "}
      <span className="sharableLink">
        {" "}
        {`https://muhiblollygift.netlify.app/lollies/${data.LOLLIES.getLollyByPath.lollyPath}`}
      </span>
      <div className="recievedContentContainer">
        <Lolly
          // style="lollyRecieved"
          fillLollyTop={data.LOLLIES.getLollyByPath.flavorTop}
          fillLollyMiddle={data.LOLLIES.getLollyByPath.flavorMid}
          fillLollyBottom={data.LOLLIES.getLollyByPath.flavorBot}
        />

        <div className="recievedTextContainer">
          <h3>HI {data.LOLLIES.getLollyByPath.to.toUpperCase()}</h3>
          <p>{data.LOLLIES.getLollyByPath.message}</p>
          <h4>From: {data.LOLLIES.getLollyByPath.from}</h4>
        </div>
      </div>
    </div>
  )
}