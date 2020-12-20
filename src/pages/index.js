import React from "react";
import { navigate } from 'gatsby';
import Lolly from "../components/Lolly";
import Header from '../components/Header';
export default function Home() {
  return(
    <div>
      <Header/>
        <div>
          <div className='allLollies'>
            <Lolly fillLollyTop='#e97393' fillLollyMiddle='#d23a62' fillLollyBottom='#bb1161' />
            <Lolly fillLollyTop='#97e665' fillLollyMiddle='#8ccb4c' fillLollyBottom='#a8d838' />
            <Lolly fillLollyTop='#feefd6' fillLollyMiddle='#b65ae4' fillLollyBottom='#c116c1' />
            <Lolly fillLollyTop='#cd2753' fillLollyMiddle='#d5cfd1' fillLollyBottom='#5ba3da' />
            <Lolly fillLollyTop='#ed265b' fillLollyMiddle='#f77249' fillLollyBottom='#f5c64d' />
          </div>
          <div className='button-div' >
            <button className='btn' onClick={() => navigate('/createNew')}>
              Create a new lolly to send a friend
            </button>
          </div>
        </div>
    </div>
  )
};