import axios from 'axios';

const authURL = 'https://twitter-azx79115.herokuapp.com/api';

// 使用者登入驗證
export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/users/login`, {
      account,
      password,
    });
    const { token } = data;
    if (token) {
      return { success: true, ...data }
    }
    return data;
  } catch (error) {
    console.error('[Login Failed]:', error)
  }
}

// 註冊新使用者資料
export const register = async ({ account, name, email, password, checkPassword }) => {
  try {
    const { data } = await axios.post(`${authURL}/users`, {
      account, name, email, password, checkPassword,
    });
    const { newUser } = data;
    if (newUser) {
      return { success: true, ...data }

    }
    return data;
  } catch (error) {
    console.error('[Register Failed]:', error)
    // console.log(error)
    // Swal.fire({
    //   position: 'top',
    //   title: error.message,
    //   timer: 1000,
    //   icon: 'error',
    //   showConfirmButton: false,
    // });
  }
}
