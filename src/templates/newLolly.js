import React from 'react'
import { graphql } from 'gatsby'
import Section from '../components/Section/Section'

export const query = graphql`
query getLolly($id: String!) {
  lolly {
    getLolly(id: $id) {
      lollyPath
      recipientName
      message
      senderName
      flavourTop
      flavourMiddle
      flavourBottom
    }
  }
}
`

const NewLolly = ({ data: { lolly: { getLolly } } }) => {
  const { lollyPath, recipientName, message, senderName, flavourTop, flavourMiddle, flavourBottom }  = getLolly
    return (
        <div>
          <Section lollyPath={lollyPath} recipientName={recipientName} message={message} senderName={senderName} flavourTop={flavourTop} flavourMiddle={flavourMiddle} flavourBottom={flavourBottom} />
        </div>
    )
}

export default NewLolly
