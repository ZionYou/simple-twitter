import axios from 'axios'
import Swal from 'sweetalert2';

const adminURL = 'https://twitter-azx79115.herokuapp.com/api';
const token = localStorage.getItem('authToken')

// 後台登入 //post
export const adminLogin = async ({account, password}) => {
  try{
    const {data} = await axios.post(`${adminURL}/admin/login`, {
      account, 
      password,
    });
    
    const {token} = data;
    if(token) {
      console.log(data.message)
      return { success: true, ...data}
    }

    // console.log(data.message)
    return data;

  } catch (error) {
    // const {data, status} = error.response
    // if(status === 401){
    //   return {
    //     status: 'error',
    //     message: data.message
    //   }
    // }
    console.error('[Admin Login Failed]:', error)
  }
}

// 取得指定使用者資料 //get
export const getAllUserData = async() => {
  try{
    const {data} = await axios.get(`${adminURL}/admin/users`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
     return {success: true, data}
  } catch (error) {
    // console.error('[Get user info failed]:', error)
    return{
      success: false,
      message: `[Get user info failed]:${error}`
    }
  }
};

// 刪除指定貼文 //delete
export const deleteTwi = async (id) => {
  try {
    const res = await axios.delete(`${adminURL}/admin/tweets/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Delete twi failed]:', error);
  }
};