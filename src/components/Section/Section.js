import React from 'react'
import { Layout } from '../Layout/Layout'
import Lolly from '../Lolly/Lolly'
// import env from 'dotenv'
// env.config()


const Section = ({ lollyPath, recipientName, message, senderName, flavourTop, flavourMiddle, flavourBottom }) => {

  const url = "https://virtual-lolly-harg.netlify.app/"
    return (
        <div>
            <Layout>
              <div className='lolly'>
                <div className='giftLolly'>
                  <Lolly fillLollyTop={flavourTop} fillLollyMiddle={flavourMiddle} fillLollyBottom={flavourBottom } />
                </div>
                </div>
                <div className='info'>
                  <div className='details'>
                  <p className='recipient' style={{color:'#feefd6'}}> share this link: {`${url}create/${lollyPath}`} </p>
                    <p id="recipient" className='recipient'> {recipientName} </p>
                    <div id='message' className='message'> {message} </div>
                    <p id='from' className='from'> — {senderName} </p> 
                  </div>
                </div>
            </Layout>
        </div>
    )
}

export default Section
