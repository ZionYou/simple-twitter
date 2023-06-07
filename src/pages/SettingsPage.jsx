
import { MainList, PopularFollow } from "components/MainComponents/HomeFixed";
import SettingsArea from "components/MainComponents/SettingsArea";
import {useState} from 'react';




const SettingsPage = () => {
  const [isPopup, setIsPopup] = useState(false)

  

  return (
    <section className="main">
      <section className="main-container">
        <MainList/>
        <SettingsArea/>
        {/* <PopularFollow/> */}
      </section>
    </section>
  )
};

export default SettingsPage;