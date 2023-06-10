import axios from 'axios'
const authURL = 'https://twitter-azx79115.herokuapp.com/api';

export const login = async ({account, password}) => {
  try{
    const {data} = await axios.post(`${authURL}/users/login`, {
      account, 
      password,
    });
    const {token} = data;
    if(token) {
      return { success: true, ...data}
    }
    return data;
  } catch (error) {
    console.error('[Login Failed]:', error)
  }
}

export const register = async ({account, name, email, password, confirmPassword}) => {
  try{
    const {data} = await axios.post(`${authURL}/users`, {
      account, name, email, password, confirmPassword,
    });
    const {authToken} = data;
    if(authToken) {
      return { success: true, ...data}
    }
    return data;
  } catch (error) {
    console.error('[Register Failed]:', error)
  }
}


export const adminLogin = async ({account, password}) => {
  try{
    const {data} = await axios.post(`${authURL}/admin/login`, {
      account, 
      password,
    });
    const {authToken} = data;
    if(authToken) {
      return { success: true, ...data}
    }
    return data;
  } catch (error) {
    console.error('[Admin Login Failed]:', error)
  }
}