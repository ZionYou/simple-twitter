import { EditProfile, MainList, PopularFollow, Personal  } from "components";
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