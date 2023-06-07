import {ReactComponent as BackArrow} from "assets/icons/BackArrow.svg";

import {ReactComponent as Comment} from "assets/icons/comment.svg";
import {ReactComponent as Like} from "assets/icons/like.svg";

import { UserProfileTwiReply } from "./Personal";


const TwiItemArea = () => {
  return(
    <section className="twi-item middle-container-border">
      <div className="back-bar">
        <a href="" className="back-link">
          <span className="back-icon"><BackArrow/></span>
          <div className="title-group">
            <p className="name">推文</p>
          </div>
        </a>
      </div>
      <div className="twi-item-body">
        <div className="twi-item-user">
          <img src="https://picsum.photos/300/300?text=500" alt="" className="twi-item-img" />
          <div className="twi-item-name-group">
            <a herf="" className="twi-item-name">Apple</a>
            <p className="twi-item-account">@<span>apple</span></p>
          </div>
        </div>
        <div className="twi-item-content-group">
          <p className="twi-item-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac lectus elementum, varius turpis non, pretium enim. Nam eu diam non tortor porta viverra sed et velit. Duis et vestibulum lacus, id condimentum purus. Donec facilisis erat a tellus cursus, sit amet accumsan urna tincidunt. Vestibulum ut tortor massa. Phasellus risus nulla, vestibulum non dapibus in, dignissim in libero.
          </p>
          <p className="twi-item-time">上午 10:05 &#183; 2021年11月10日</p>
        </div>
        <div className="twi-item-interac-group">
          <span className="reply"><span>34</span>回復</span>
          <span className="like"><span>808</span>喜歡次數</span>
        </div>
        <div className="twi-item-icon-group">
          <a className="rpely"><Comment/></a>
          <a className="like"><Like/></a>
        </div>
      </div>
      <UserProfileTwiReply/>
    </section>
  )
}

export default TwiItemArea