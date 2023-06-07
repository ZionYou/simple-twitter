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
  TwiItemPage } from "pages"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="regist" element={<RegistPage />} />
          <Route path="adminLogin" element={<AdminLoginPage />} />
          <Route path="main" element={<MainHomePage />} />
          <Route path="user" element={<UserProfilePage />} />
          <Route path="personalDetail" element={<PersonalDetailPage />} />
          <Route path="setting" element={<SettingsPage />} />
          <Route path="twiItem" element={<TwiItemPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
