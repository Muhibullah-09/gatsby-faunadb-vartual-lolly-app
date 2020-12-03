import { gql, useQuery } from "@apollo/client"
import React from "react"
import { PageProps } from "gatsby"
import LollyFromData from "../component/LollyFormData"

const GET_LOLLY = gql`
  query getLolly($lollyPath: String!) {
    getLolly(lollyPath: $lollyPath) {
        recipientName,
        message,
        senderName,
        color1,
        color2,
        color3
        lollyPath
    }
  }
`

const NotFound = ({ location }: PageProps) => {
    const lollyPath = location.pathname.slice(1)
    const { loading, data } = useQuery(GET_LOLLY, {
        variables: { lollyPath },
    })
    return (
        <>
            {data && <LollyFromData lolly={data.getLolly} location={location} />}
            {loading && (
                <h1>
                    Searching for Your lolly with id: {lollyPath} in the freezer, Please
          wait.
                </h1>
            )}
            {!loading && !data && (
                <h1>
                    Woops! Can't find your lolly, maybe you wrote the wrong id? or are you
                    just playing around with the url.
                </h1>
            )}
        </>
    )
}
export default NotFound