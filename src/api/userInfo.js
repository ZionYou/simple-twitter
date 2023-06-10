import axios from 'axios'

const baseURL = 'https://twitter-azx79115.herokuapp.com/api'

export const getUserInfo = async(id) => {
  try{
    const res = await axios.get(`${baseURL}/user/${id}`)
    return res.data
  } catch (error) {
    console.error('[Get User Info failed]', error)
  }
};
export const createUserInfo = () => {};
export const patchUserInfo = () => {};
export const deleteUserInfo = () => {};