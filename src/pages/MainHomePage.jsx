import { MainHome, NewTwiPopUp, MainList, PopularFollow, ReplyTwiPopUp } from "components";
import {useState} from 'react';



const MainHomePage = () => {
  const [isPopup, setIsPopup] = useState(false)
  return (
    <section className="main">
      <section className="main-container">
        <MainList/>
        <MainHome onClick={() => setIsPopup(true)}/>
        <PopularFollow/>
      </section>
      {/* {isPopup && <NewTwiPopUp onClick={() => setIsPopup(false)}/>}
      <ReplyTwiPopUp/> */}
    </section>
  )
};

export default MainHomePage;