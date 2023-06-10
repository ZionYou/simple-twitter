import { FeatherIcon, LikeIcon } from "assets/icons";

const AdminUserData = [
  {
    id: 1,
    name: "UserName",
    account: "UserAccount",
    bg_img: "https://picsum.photos/300/300?text=500",
    img: "https://picsum.photos/300/300?text=600",
    like: 100,
    comment: 120,
    following: 10,
    follower: 30
  },
  {
    id: 2,
    name: "UserName2",
    account: "UserAccount",
    bg_img: "https://picsum.photos/300/300?text=502",
    img: "https://picsum.photos/300/300?text=602",
    like: 100,
    comment: 120,
    following: 10,
    follower: 30
  },
  {
    id: 3,
    name: "UserName3",
    account: "UserAccount",
    bg_img: "https://picsum.photos/300/300?text=503",
    img: "https://picsum.photos/300/300?text=603",
    like: 100,
    comment: 120,
    following: 10,
    follower: 30
  },
  {
    id: 4,
    name: "UserName4",
    account: "UserAccount",
    bg_img: "https://picsum.photos/300/300?text=504",
    img: "https://picsum.photos/300/300?text=604",
    like: 100,
    comment: 120,
    following: 10,
    follower: 30
  },
  {
    id: 5,
    name: "UserName5",
    account: "UserAccount",
    bg_img: "https://picsum.photos/300/300?text=505",
    img: "https://picsum.photos/300/300?text=605",
    like: 100,
    comment: 120,
    following: 10,
    follower: 30
  },
  {
    id: 6,
    name: "UserName6",
    account: "UserAccount",
    bg_img: "https://picsum.photos/300/300?text=506",
    img: "https://picsum.photos/300/300?text=606",
    like: 100,
    comment: 120,
    following: 10,
    follower: 30
  },
]

const AdminUserCard = ({user}) => {
  return(
    <div className="admin-user-card">
      <div className="admin-user-bg" style={{backgroundImage: `url(${user.bg_img})`}}>
        <img src={user.img} alt="" className="admin-user-img" />
      </div>
      <div className="admin-user-name-group">
        <div className="name">{user.name}</div>
        <div className="account">@{user.account}</div>
      </div>
      <div className="admin-user-data-group">
        <div className="comment-and-like">
          <span className="comment"><span className="icon"><FeatherIcon/></span>{user.comment}</span>
          <span className="like"><span className="icon"><LikeIcon/></span>{user.like}</span>
        </div>
        <div className="follow-group">
          <span className="following"><span className="num">{user.following}個</span>跟隨中</span>
          <span className="follower"><span className="num">{user.follower}位</span>跟隨者</span>
        </div>
      </div>
    </div>
  )
}

const AdminUserCardGroup = () => {
  return(
    <div className="admin-user-card-group">
      {
        AdminUserData.map((user) => {
          return(
            <AdminUserCard user={user}/>
          )
        })
      }
    </div>
  )
}

// 後台使用者列表元件
const AdminUserList = () => {
  return(
    <section className="admin-user middle-container-border">
        <h5 className="sub-title">使用者列表</h5>
        <AdminUserCardGroup/>
    </section>
  )
}

export default AdminUserList;