import MainHome from "../components/MainComponents/MainHome";
import { NewTweetPopUp } from "../components/MainComponents/MainHome";
import { MainList, PopularFollow } from "components/MainComponents/HomeFixed";
import Personal from "../components/MainComponents/Personal"
import PersonalDetail from "components/MainComponents/PersonalDetail";

import {useState} from 'react';




const HomePage = () => {
  const [isPopup, setIsPopup] = useState(false)

  const handleClick = (event) => {
    if(event.target.checked){
      setIsPopup(true)
    }
  }

  return (
    <section className="main">
      <section className="main-container">
        <MainList/>
        {/* <MainHome onClick={handleClick}/> */}
        <Personal/>
        {/* <PersonalDetail/> */}
        <PopularFollow/>
      </section>
      {isPopup && <NewTweetPopUp onClick={() => setIsPopup(false)}/>}
    </section>
  )
};

export default HomePage;