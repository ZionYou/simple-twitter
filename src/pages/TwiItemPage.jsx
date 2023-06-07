import TwiItemArea from "components/MainComponents/TwiItemArea"
import { MainList, PopularFollow } from "components/MainComponents/HomeFixed";

const TwiItemPage = () => {
  return(
    <section className="main">
      <section className="main-container">
        <MainList/>
        <TwiItemArea/>
        <PopularFollow/>
      </section>
    </section>
  )
}

export default TwiItemPage