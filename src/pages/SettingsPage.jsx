import { MainList , SettingsArea} from "components";
import {useState} from 'react';




const SettingsPage = () => {
  const [isPopup, setIsPopup] = useState(false)

  
  return (
    <section className="main">
      <section className="main-container">
        <MainList/>
        <SettingsArea/>
      </section>
    </section>
  )
};

export default SettingsPage;