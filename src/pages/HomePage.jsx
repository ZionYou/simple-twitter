import MainHome from "../components/MainComponents/MainHome";
import { NewTwiPopUp } from "../components/MainComponents/Popup";
import { MainList, PopularFollow } from "components/MainComponents/HomeFixed";

import {useState} from 'react';

import { ReplyTwiPopUp } from "../components/MainComponents/Popup";




const HomePage = () => {
  const [isPopup, setIsPopup] = useState(false)
  return (
    <section className="main">
      <section className="main-container">
        <MainList/>
        <MainHome onClick={() => setIsPopup(true)}/>
        <PopularFollow/>
      </section>
      {isPopup && <NewTwiPopUp onClick={() => setIsPopup(false)}/>}
      {/* <ReplyTwiPopUp/> */}
    </section>
  )
};

export default HomePage;