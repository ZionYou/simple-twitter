import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { 
  HomePage, 
  LoginPage, 
  RegistPage, 
  AdminLoginPage, 
  MainHomePage, 
  UserProfilePage, 
  PersonalDetailPage, 
  SettingsPage, 
  TwiItemPage,
  AdminTwiListPage,
  AdminUserListPage,
  OtherUserPage
} from "pages"
import { AuthProvider } from 'contexts/AuthContext';


function App() {
  return (
    <div className="App">
      <BrowserRouter  >
        <AuthProvider>
          <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="regist" element={<RegistPage />} />
            <Route path="adminLogin" element={<AdminLoginPage />} />
            <Route path="main" element={<MainHomePage />} />
            <Route path="user" element={<UserProfilePage />} />
            <Route path="otherUser/:id" element={<OtherUserPage />} />
            <Route path="personalDetail/:id" element={<PersonalDetailPage />} />
            <Route path="setting" element={<SettingsPage />} />
            {/* <Route path="twiItem" element={<TwiItemPage/>} /> */}
            <Route path="adminTwi" element={<AdminTwiListPage/>} />
            <Route path="adminUser" element={<AdminUserListPage/>} />
            <Route path="twiItem/:id" element={<TwiItemPage/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
