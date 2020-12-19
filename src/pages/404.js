import React from "react"
import Lolly from "../components/Lolly";
import Header from "../components/Header";
import { useQuery, gql } from "@apollo/client";

const GET_LOLLY_BY_PATH = gql`
  query getLollies($lollyPath: String!) {
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
`

export const NotFound = ({ location }) => {
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
                    <Header/>
                    <h5 className="sharableLinkContainer">Your sharable link: </h5>{" "}
                    <span className="sharableLink">
                        {" "}
                        {`https://muhiblollygift.netlify.app/lollies/${data.getLollyByPath.lollyPath}`}
                    </span>
                    <div className="recievedContentContainer">
                        <Lolly
                            fillLollyTop={data.getLollyByPath.flavorTop}
                            fillLollyMiddle={data.getLollyByPath.flavorMiddle}
                            fillLollyBottom={data.getLollyByPath.flavorBottom}
                        />
                        <div className="recievedTextContainer">
                            <h3>HI {data.getLollyByPath.to.toUpperCase()}</h3>
                            <p>{data.getLollyByPath.message}</p>
                            <h4>From: {data.getLollyByPath.from}</h4>
                        </div>
                    </div>
                </div>
            ) : (
                        <div className="pageNotFound">404. Page not found.</div>
                    )}
        </div>
    )
}