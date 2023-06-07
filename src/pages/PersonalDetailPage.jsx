import { MainList, PopularFollow } from "components/Main/HomeFixed";
import PersonalDetail from "components/Main/PersonalDetail";


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