import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Component404 from '../components/404';
import Section from '../components/Section';

const getLollyById  = gql`
query getLolly($id: String!) {
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
`

const Page404 =  ({ location }) => {
    const pathId =  location.pathname.slice(8)
    const { loading, error, data } = useQuery(getLollyById, {
        variables: {
            id: pathId
        }
    })

    if(loading) {
        return <div><h1>Loading...</h1></div>
    }

    if(error) {
        return <Component404 />
    }

    return (
        <div>
          <Section lollyPath={data?.getLolly?.lollyPath} recipientName={data?.getLolly?.recipientName} message={data?.getLolly?.message} senderName={data?.getLolly?.senderName} flavourTop={data?.getLolly?.flavourTop} flavourMiddle={data?.getLolly?.flavourMiddle} flavourBottom={data?.getLolly?.flavourBottom} />
        </div>
    )
}

export default Page404;