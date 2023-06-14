import axios from 'axios'

const baseURL = 'https://twitter-azx79115.herokuapp.com/api'

const token = localStorage.getItem('authToken')

const axiosInstance = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    'Authorization': 'Bearer ' + token
  }
})

// axiosInstance.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem('authToken')
//     if (token) {
//       config.headers["Authorization"] = 'Bearer ' + token
//     }
//     return config;
//   },
//   function (error) {
//     console.error(error)
//   }
// )

// ************************ User **************************
// 取得指定使用者資料 //get
// <<<<<<< HEAD
// export const getUserInfo = async(id) => {
//   try{
//     // const res = await axios.get(`${baseURL}/user/:${id}`)
//     // return res.data
//     const {data} = await axiosInstance.get(`${baseURL}/user/${id}`)
//     return{success: true, data}
// =======



// ************************ User **************************
// 取得指定使用者資料 //get
export const getUser = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${baseURL}/users/${id}`,{
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


// 修改指定使用者資料 //patch
export const patchTodo = async (payload) => {
  const { id, email, name, account, avatar, introduction, password } = payload;
  try {
    const res = await axios.patch(`${baseURL}/todos/${id}`, {
      email, name, account, avatar, introduction, password
    });
    return res.data;
  } catch (error) {
    console.error('[Patch Todo failed]:', error);
  }
};

// 取得指定使用者發出的所有推文 //get
export const getUserTwi = async (id) => {
  try {
    const {data} = await axiosInstance.get(`${baseURL}/users/${id}/tweets`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    return {sucess: true, data}
  } catch (error) {
    return{
      //success: false,
      message: `[Get user all tweets failed]:${error}`
    }
  }
}

// 取得指定使用者有回復的所有推文 //get
export const getUserTwiReply = async (id) => {
  try {
    const {data} = await axiosInstance.get(`${baseURL}/users/${id}/replied_tweets`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    return {sucess: true, data}
  } catch (error) {
    return{
      success: false,
      message: `[Get user all reply tweets failed]: ${error}`
    }
  }
}

// 取得指定使用者喜歡的所有推文 //get
export const getUserTwiLike = async (id) => {
  try {
    const {data} = await axios.get(`${baseURL}/user/${id}/likes`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    return {sucess: true, data}
  } catch (error) {
    return{
      success: false,
      message: `[Get user like failed]: ${error}`
    }
  }
}

// 取得指定使用者正在追蹤的使用者 //get
export const getUserFollowings = async (id) => {
  try {
    const {data} = await axios.get(`${baseURL}/user/:${id}/followings`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    return {sucess: true, data}
  } catch (error) {
    return{
      success: false,
      message: `[Get user followings failed]: ${error}`
    }
  }
}

// 取得指定使用者的追蹤者 //get
export const getUserFollowers = async (id) => {
  try {
    const {data} = await axios.get(`${baseURL}/user/:${id}/followers`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    return {sucess: true, data}
  } catch (error) {
    return{
      success: false,
      message: `[Get user followers failed]: ${error}`
    }
  }
}


// 取得top10推薦跟隨名單

export const getTopTenFollowList = async() => {
  try{
    const {data} = await axios.get(`${baseURL}/users/top10`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
     return {success: true, data}
  } catch (error) {
    return {
      success: false,
      message: `[Get Top10 Follow failed]: ${error}`
    }
  }
}

// ************************ User **************************

// ************************ Tweet **************************
// 取得指定貼文的所有留言 //get
export const getTwiReply = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/tweets/:tweet_${id}/replies`)
    return res.data
  } catch (error) {
    console.error('[Get twi replay failed]:', error)
  }
}

// 回復指定貼文
export const createReplyTwi = async (payload) => {
  const { id, message, isDone } = payload;
  try {
    const res = await axios.post(`${baseURL}/tweets/:tweet_${id}/replies`, {
      message, isDone
    });
    return res.data;
  } catch (error) {
    console.error('[Reply specific twi failed]: ', error);
  }
};

//

// ************************ Tweet **************************

