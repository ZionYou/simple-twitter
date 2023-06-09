import {createContext} from 'react'

const currentUserData = {
  userName: "",
  userAccount: "",
  userEmail: "",
  userPassword: "",
  userIntro: "",
  userImg_url: "",
  userBgImg_url: "",
}

export const currentUserContext = createContext(currentUserData);

