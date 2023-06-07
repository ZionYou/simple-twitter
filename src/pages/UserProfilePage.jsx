import { EditProfile } from "../components/MainComponents/Popup";
import { MainList, PopularFollow } from "components/MainComponents/HomeFixed";
import Personal from "../components/MainComponents/Personal"

import {useState} from 'react';




const UserProfilePage = () => {
  const [isPopup, setIsPopup] = useState(false)

  return (
    <section className="main">
      <section className="main-container">
        <MainList/>
        <Personal onClick={() => setIsPopup(true)}/>
        <PopularFollow/>
      </section>
      {isPopup && <EditProfile onClick={() => setIsPopup(false)}/>}
    </section>
  )
};

export default UserProfilePage;