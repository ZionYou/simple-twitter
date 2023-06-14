import axios from 'axios'

const baseURL = 'https://twitter-azx79115.herokuapp.com/api'

// const axiosInstance = axios.create({
//   baseURL: `${baseURL}`
// })

<<<<<<< HEAD
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
const token = localStorage.getItem('authToken')

export const getUser = async (id) => {
  try {
    const { data } = await axios.get(`${baseURL}/users/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    // if (data.success === false) return { ...data };
    return { success: true, data }
    // return data
  } catch (error) {
    // console.error('[Get user info failed]:', error)
=======
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token
    }
    return config;
  },
  function (error) {
    console.error(error)
  }
)

// ************************ User **************************
// 取得指定使用者資料 //get
export const getUser = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${baseURL}/user/:${id}`);
    if (data.success === false) return { ...data };
    return { success: true, data }
  } catch (error) {
    console.error('[Get user info failed]:', error)
>>>>>>> c690e8de94f022d62fad334026f59f1b74d002cb
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
<<<<<<< HEAD
    const { data } = await axios.get(`${baseURL}/users/${id}/tweets`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    // if(data.success === false) return {...data}
    return {success: true, data}
=======
    const res = await axios.get(`${baseURL}/user/:${id}/tweets`)
    return res.data
>>>>>>> c690e8de94f022d62fad334026f59f1b74d002cb
  } catch (error) {
    return{
      success: false,
      message: `[Get user all tweets failed]:${error}`
    }
  }
}

// 取得指定使用者有回復的所有推文 //get
export const getUserTwiReply = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/user/:${id}/replied_tweets`)
    return res.data
  } catch (error) {
    console.error('[Get user all reply tweets failed]:', error)
  }
}

// 取得指定使用者喜歡的所有推文 //get
export const getUserLike = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/user/:${id}/likes`)
    return res.data
  } catch (error) {
    console.error('[Get user like failed]:', error)
  }
}

// 取得指定使用者正在追蹤的使用者 //get
export const getUserFollowings = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/user/:${id}/followings`)
    return res.data
  } catch (error) {
    console.error('[Get user followings failed]:', error)
  }
}

// 取得指定使用者的追蹤者 //get
export const getUserFollowers = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/user/:${id}/followers`)
    return res.data
  } catch (error) {
    console.error('[Get user followers failed]:', error)
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

