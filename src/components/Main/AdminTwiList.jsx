import { CloseIcon } from "assets/icons";
import { useState, useEffect } from "react";
import { getAllTweetsData, deleteTwi } from "api/admin";
import { TransferTime } from "components/utilities/TransferTime";

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
              <span className="time"> &#183; {TransferTime(tweet.updatedAt)}</span>
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


