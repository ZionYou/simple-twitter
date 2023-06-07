import { TwiItemArea, MainList, PopularFollow } from "components";

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