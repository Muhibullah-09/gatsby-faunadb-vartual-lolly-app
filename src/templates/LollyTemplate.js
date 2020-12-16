import React from 'react';
import { graphql } from 'gatsby';
import Section from '../components/Section';

export const query = graphql`
  query getLolly($id: String!) {
    lolly {
      getLolly(id: $id) {
      recipientName
      message
      senderName
      flavourTop
      flavourMiddle
      flavourBottom
      lollyPath
    }
  }
}
`

const LollyTemplate = ({ data: { lolly: { getLolly } } }) => {
  const { lollyPath, recipientName, message, senderName, flavourTop, flavourMiddle, flavourBottom }  = getLolly
    return (
        <div>
          <Section lollyPath={lollyPath} recipientName={recipientName} message={message} senderName={senderName} flavourTop={flavourTop} flavourMiddle={flavourMiddle} flavourBottom={flavourBottom} />
        </div>
    )
}

export default LollyTemplate
