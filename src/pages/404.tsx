import React from "react"
import Lolly from "../components/lolly"
import Header from "../components/header"
import { useQuery, gql } from "@apollo/client"

const GET_LOLLY_BY_PATH = gql`
  query getLollies($lollyPath: String!) {
    getLollyByPath(lollyPath: $lollyPath) {
      flavorBot
      flavorMid
      flavorTop
      lollyPath
      message
      recipientName
      sendersName
    }
  }
`

export default function NotFound({ location }) {
  var queryLollies = location.pathname.slice(0, 9)
  var queryPath = location.pathname.slice(9)

  const { loading, error, data } = useQuery(GET_LOLLY_BY_PATH, {
    variables: { lollyPath: queryPath },
  })

  return (
    <div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : !!data && queryLollies === "/lollies/" ? (
        <div>
          <Header
            mainHeadingText="Kuch Meetha Hojaye?"
            secondaryHeadingText="You recieved a lolly, dont eat it alone !"
          />
          <h5 className="sharableLinkContainer">Your sharable link: </h5>{" "}
          <span className="sharableLink">
            {" "}
            {`https://sharelolly.netlify.app/lollies/${data.getLollyByPath.lollyPath}`}
          </span>
          <div className="recievedContentContainer">
            <Lolly
              style="lollyRecieved"
              lollyTop={data.getLollyByPath.flavorTop}
              lollyMid={data.getLollyByPath.flavorMid}
              lollyBot={data.getLollyByPath.flavorBot}
            />

            <div className="recievedTextContainer">
              <h3>HI {data.getLollyByPath.recipientName.toUpperCase()}</h3>
              <p>{data.getLollyByPath.message}</p>
              <h4>From: {data.getLollyByPath.sendersName}</h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="pageNotFound">404. Page not found.</div>
      )}
    </div>
  )
}
