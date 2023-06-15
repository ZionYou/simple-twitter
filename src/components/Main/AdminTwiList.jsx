import { CloseIcon } from "assets/icons";
import { useState, useEffect } from "react";

import { getAllTweetsData, deleteTwi } from "api/admin";



const AdminTwiListGroup = ({tweets, onDelete}) => {
  const twiList = tweets.map((tweet) => {
    return(
      <div className="admin-twi-item" key={tweet.id}>
        <img src={tweet.User.avatar} alt="" />
        <div className="admin-twi-info">
          <div className="title-group">
            <div className="name-group">
              <span className="name">{tweet.User.name}</span>
              <span className="account">@ {tweet.User.account}</span>
              <span className="time"> &#183; {tweet.updatedAt}</span>
            </div>
            <div className="close-group">
              <button href="#" className="btn-reset close" onClick={() => onDelete?. (tweet.id)}><CloseIcon/></button>
            </div>
          </div>
          <p className="content">
            {tweet.shortDescription}
          </p>
        </div>
      </div>
    )
  })
  return(
    <div className="admin-twi-list">
      {twiList}
    </div>
  )
}

// 後台推文列表元件
const AdminTwiList = () => {
  const [tweet, setTweets] = useState([])

  const handleDelete = async (id) => {
    // alert(`delete ${id}`)

    try{
      await deleteTwi(id)
      setTweets((prevTweets) => prevTweets.filter((tweet) => tweet.id !== id))
    } catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    const getAllTweetsDataAsync = async () => {
      const {success, data, message} = await getAllTweetsData();
      if(success){
        console.log(data)
        setTweets(data.map((data) => ({...data})))
        
      } else {
        console.error(message)
      }
    }
    getAllTweetsDataAsync()
  }, [])

  return(
    <section className="admin-twi middle-container-border">
        <h5 className="sub-title">推文清單</h5>
        <AdminTwiListGroup tweets={tweet} onDelete={handleDelete}/>
    </section>
  )
}

export default AdminTwiList;


// const TwiListData = [
//   {
//     id: 1,
//     name: "name",
//     account: "account",
//     edit_time: "3 小時",
//     commentNum: 10,
//     likeNum: 20,
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
//   },
//   {
//     id: 2,
//     name: "name",
//     account: "account",
//     edit_time: "3 小時",
//     commentNum: 10,
//     likeNum: 20,
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
//   },
//   {
//     id: 3,
//     name: "name",
//     account: "account",
//     edit_time: "3 小時",
//     commentNum: 10,
//     likeNum: 20,
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
//   },
//   {
//     id: 4,
//     name: "name",
//     account: "account",
//     edit_time: "3 小時",
//     commentNum: 10,
//     likeNum: 20,
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
//   },
//   {
//     id: 5,
//     name: "name",
//     account: "account",
//     edit_time: "3 小時",
//     commentNum: 10,
//     likeNum: 20,
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
//   },
//   {
//     id: 6,
//     name: "name",
//     account: "account",
//     edit_time: "3 小時",
//     commentNum: 10,
//     likeNum: 20,
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel tortor in ipsum viverra posuere ultrices id felis. Vestibulum pulvinar imperdiet nunc vitae tristique. Mauris eleifend efficitur leo, a viverra sem. Nunc blandit semper justo aliquam placerat. Nam fermentum lacus a leo pretium, id laoreet orci molestie. Nullam tempus congue mi, eget varius est placerat vitae. Proin dignissim vehicula nulla convallis porta. Duis tortor dui, vulputate eu convallis a, pharetra ac neque."
//   },
// ]


// const AdminTwiListItem = ({tweet, onClick}) => {
//   return(
//     <div className="admin-twi-item">
//       <img src={`https://picsum.photos/300/300?text=${tweet.id}`} alt="" />
//       <div className="admin-twi-info">
//         <div className="title-group">
//           <div className="name-group">
//             <span className="name">{tweet.name}</span>
//             <span className="account">@{tweet.account}</span>
//             <span className="time"> &#183; {tweet.edit_time}</span>
//           </div>
//           <div className="close-group">
//             <a href="#" className="close"><CloseIcon/></a>
//           </div>
//         </div>
//         <p className="content">
//           {tweet.content}
//         </p>
//       </div>
//     </div>
//   )
// }