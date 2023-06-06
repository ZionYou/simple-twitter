
import {ReactComponent as Comment} from "assets/icons/comment.svg";
import {ReactComponent as Like} from "assets/icons/like.svg";


const TweetListData = [
  {
    id: 1,
    name: "name",
    account: "account",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
  },
  {
    id: 2,
    name: "name",
    account: "account",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
  },
  {
    id: 3,
    name: "name",
    account: "account",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
  },
  {
    id: 4,
    name: "name",
    account: "account",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
  },
  {
    id: 5,
    name: "name",
    account: "account",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
  },
  {
    id: 6,
    name: "name",
    account: "account",
    edit_time: "3 小時",
    commentNum: 10,
    likeNum: 20,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
  },
]


const TweetListItem = ({tweet}) => {
  return(
    <div className="tweet-item">
      <img src={`https://picsum.photos/300/300?text=${tweet.id}`} alt="" />
      <div className="tweet-info">
        <div className="name-group">
          <span className="name">{tweet.name}</span>
          <span className="account">@{tweet.account}</span>
          <span className="time"> &#183; {tweet.edit_time}</span>
        </div>
        <p className="content">
          {tweet.content}
        </p>
        <div className="icon-group">
          <div className="comment"><i><Comment/></i>{tweet.commentNum}</div>
          <div className="like"><i><Like/></i>{tweet.likeNum}</div>
        </div>
      </div>
    </div>
  )
}

export const TweetListItemGroup = () => {
  return(
    <div className="tweet-list">
      {
        TweetListData.map((tweet) => {
          return <TweetListItem tweet={tweet} key={tweet.id}/>
        })
      }
    </div>
  )
}

const MainHome = ({onClick}) => {
  return(
    <section className="home" data-page="main-home">
      <div className="title-section">
        <h5 className="sub-title">首頁</h5>
        <div className="input-group">
          <input type="checkbox" className="title-input" id="new-tweet" onClick={onClick}/>
          <label htmlFor="new-tweet" className="title-label">
            <img src="https://picsum.photos/300/300?text=100" alt="" />
            <p className="label-word">有什麼新鮮事?</p>
          </label>
          <button className="orange-btn radius-50 cursor-pointer">推文</button>
        </div>
      </div>
      <hr/>
      <TweetListItemGroup/>
    </section>
  )
}

export const NewTweetPopUp = ({onClick}) => {
  return(
    <>
      <div className="popup">
        <div className="popup-bg">
          <div className="popup-container">
            <div className="close-group">
              <a href="#" className="close" onClick={onClick}>&#10005;</a>
            </div>
            <div className="type-area">
              <img src="https://picsum.photos/300/300?text=400" alt="" />
              <textarea name="new-tweet-type" id="tweet-textarea" maxLength={140}>有什麼新鮮事?</textarea>
            </div>
            <div className="btn-group">
              <button className="orange-btn radius-50 cursor-pointer">推文</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainHome;