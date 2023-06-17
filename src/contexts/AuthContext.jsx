import { login, register } from 'api/auth';
import { adminLogin } from 'api/admin';
import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import * as jwt from 'jsonwebtoken';

const defaultAuthContext = {
  // 使用者是否登入的判斷依據，預設為 false，若取得後端的有效憑證，則切換為 true
  isAuthenticated: false,
  // 當前使用者相關資料，預設為 null，成功登入後就會有使用者資料
  currentMember: null,
  // currentUser: null,
  register: null,    // 註冊方法
  login: null,       // 登入方法
  adminLogin: null,  // 後台登入方法
  logout: null,      // 登出方法
}

const AuthContext = createContext(defaultAuthContext)
const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        console.log('failed')
        return;
      }
      // 代替checkPermission
      if (authToken) {
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };
    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.id,
          name: payload.name,
        },
        // register: async (data) => {
        //   const { message, token,  } = await register({
        // currentUser: payload && {
        //   id: payload.id,
        //   email: payload.email,
        //   name: payload.name,
        //   account: payload.account,
        //   avatar: payload.avatar,
        //   cover: payload.cover,
        //   introduction: payload.introduction,
        //   role: payload.role,
        //   createdAt:  payload.createdAt,
        //   updatedAt:  payload.updatedAt,
        //   Tweets: payload.Tweets,
        //   Followers: payload.Followers,
        //   Followings: payload.Followings,
        //   isFollowed: payload.isFollowed,
        // },
        register: async (data) => {
          const { message, token  } = await register({
            account: data.account,
            name: data.name,
            email: data.email,
            password: data.password,
            checkPassword: data.checkPassword,
          });
          const tempPayload = jwt.decode(token);
          // 印出註冊者資料
          // console.log(tempPayload)
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', token);
            localStorage.setItem('User', payload.id);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return message;
        },
        login: async (data) => {
          const { success, token } = await login({
            account: data.account,
            password: data.password,
          });
          const tempPayload = jwt.decode(token);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', token);
            // 印出登入者資料
            console.log(tempPayload)
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        adminLogin: async (data) => {
          const { success, token } = await adminLogin({
            account: data.account,
            password: data.password,
          });
          const tempPayload = jwt.decode(token);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', token);
            // 印出後台登入者資料
            console.log(tempPayload)
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };