import { MainList, PopularFollow } from "components/MainComponents/HomeFixed";
import PersonalDetail from "components/MainComponents/PersonalDetail";


const PersonalDetailPage = () => {

  return (
    <section className="main">
      <section className="main-container">
        <MainList/>
        <PersonalDetail/>
        <PopularFollow/>
      </section>
    </section>
  )
};

export default PersonalDetailPage;