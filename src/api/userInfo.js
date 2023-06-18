import axios from 'axios'

const baseURL = 'https://twitter-azx79115.herokuapp.com/api';
// const baseURL = 'http://localhost:3500/api'

const token = localStorage.getItem('authToken')

const axiosInstance = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    'Authorization': 'Bearer ' + token
  }
})

// ************************ User **************************
// 取得指定使用者資料 //get
export const getUser = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${baseURL}/users/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    // if (data.success === false) return { ...data };
    return { success: true, data }
  } catch (error) {
    // console.error('[Get user info failed]:', error)
    return {
      success: false,
      message: `[Get User failed]: ${error}`,
    };
  }
};

// 取得指定使用者發出的所有推文 //get
export const getUserTwi = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${baseURL}/users/${id}/tweets`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    return { success: true, data }
  } catch (error) {
    return {
      //success: false,
      message: `[Get user all tweets failed]:${error}`
    }
  }
}

// 取得指定使用者有回復的所有推文 //get
export const getUserTwiReply = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${baseURL}/users/${id}/replied_tweets`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      message: `[Get user all reply tweets failed]: ${error}`
    }
  }
}

// 取得指定使用者喜歡的所有推文 //get
export const getUserTwiLike = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${baseURL}/users/${id}/likes`)

    return { sucess: true, data }
  } catch (error) {
    return {
      success: false,
      message: `[Get user like failed]: ${error}`
    }
  }
}

// 取得指定使用者正在追蹤的使用者 //get
export const getUserFollowings = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${baseURL}/users/${id}/followings`)
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      message: `[Get user followings failed]: ${error}`
    }
  }
}

// 取得指定使用者的追蹤者 //get
export const getUserFollowers = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${baseURL}/users/${id}/followers`)
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      message: `[Get user followers failed]: ${error}`
    }
  }
}


// 取得top10推薦跟隨名單

export const getTopTenFollowList = async () => {
  try {
    const { data } = await axiosInstance.get(`${baseURL}/users/top10`)
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      message: `[Get Top10 Follow failed]: ${error}`
    }
  }
}

// 修改指定使用者資料 //patch
export const putUserInfo = async (payload, id) => {
  const { name, avatar, cover, introduction } = payload;
  // console.log(payload)
  try {
    const res = await axiosInstance.put(`${baseURL}/users/${id}`, {
      name, avatar, cover, introduction,
    },
    );

    // console.log(payload)
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: `[Patch User Info failed]: ${error}`
    }
  }
};

// 編輯個人帳戶設定
export const putUserSettings = async (payload, id) => {
  const { name, account, email, password, checkPassword } = payload
  try {
    const res = await axiosInstance.put(`${baseURL}/users/${id}/setting`, {
      name, account, email, password, checkPassword
    });
    return res.data;
  } catch (error) {
    console.error(error)

  }
}

// ************************ User **************************

// ************************ Tweet **************************
// 取得指定貼文的所有留言 //get
export const getTwiReply = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/tweets/${id}/replies`)
    return res.data
  } catch (error) {
    console.error('[Get twi reply failed]:', error)
  }
}

export const creatNewTwi = async (description) => {
  // const {description} = payload
  try {
    const res = await axiosInstance.post(`${baseURL}/tweets`, {
      description
    })
    return res.data
  } catch (error) {
    console.error('[Create new twi failed]:', error)
  }
}

// 回復指定貼文
export const replyTwi = async (tweet_id, comment) => {

  try {
    const res = await axiosInstance.post(`${baseURL}/tweets/${tweet_id}/replies`, {
      comment
    });
    return res.data;
  } catch (error) {
    console.error('[Reply twi failed]: ', error);
  }
};

// 喜歡指定貼文
export const likeTweet = async (tweetId, isLiked) => {
  try {
    const res = await axiosInstance.post(`${baseURL}/tweets/${tweetId}/like`)
    return res.data
  } catch (error) {
    console.error('[Like tweet failed]:', error)
  }
}

// 取消喜歡指定貼文
export const unlikeTweet = async (tweetId, isLiked) => {
  try {
    const res = await axiosInstance.post(`${baseURL}/tweets/${tweetId}/unlike`)
    return res
  } catch (error) {
    console.error('[Unlike tweet failed]:', error)
  }
}

// 取得指定貼文資料
export const getSingleTwi = async (tweetId) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/tweets/${tweetId}`)
    return res.data
  } catch (error) {
    console.log('[Get single twi failed]:', error)
  }
}

// 取得指定貼文回復資料
export const getSingleTwiReply = async (tweetId) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/tweets/${tweetId}/replies`)
    return res.data
  } catch (error) {
    console.error('[Get single twi reply failed]:', error)
  }
}

// ************************ Tweet **************************

// *********************** Followship **********************
export const followOther = async (userId) => {
  try {
    const res = await axiosInstance.post(`${baseURL}/followships`, {
      id: userId
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const unfollowOther = async (userId) => {
  try {
    const res = await axiosInstance.delete(`${baseURL}/followships/${userId}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}


// *********************** Followship **********************