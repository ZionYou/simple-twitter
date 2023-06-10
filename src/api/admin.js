import axios from 'axios'
import Swal from 'sweetalert2';

const adminURL = 'https://twitter-azx79115.herokuapp.com/api';


// 後台登入 //post
export const adminLogin = async ({account, password}) => {
  try{
    const {data} = await axios.post(`${adminURL}/admin/login`, {
      account, 
      password,
    });
    const {token} = data;
    if(token) {
      return { success: true, ...data}
    }
    return data;
  } catch (error) {
    console.error('[Admin Login Failed]:', error)
  }
}

// 取得指定使用者資料 //get
export const getUserInfo = async() => {
  try{
    const res = await axios.get(`${adminURL}/admin/users`)
    return res.data
  } catch (error) {
    console.error('[Get user info failed]:', error)
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