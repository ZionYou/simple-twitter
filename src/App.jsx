import './App.scss';
import { HomePage, LoginPage, RegistPage, AdminLoginPage} from "pages"
import UserProfilePage from 'pages/UserProfilePage';
import PersonalDetailPage from 'pages/PersonalDetailPage';
import SettingsPage from 'pages/SettingsPage';
import TwiItemPage from 'pages/TwiItemPage';

function App() {
  return (
    <div className="App">
      <HomePage />
      {/* TwiItemPage link from HomePage, catch by :id */}
      {/* <TwiItemPage/> */}
      {/* <UserProfilePage/> */}
      {/* <PersonalDetailPage/> */}
      {/* <SettingsPage/> */}
      {/* <LoginPage />
      <RegistPage />
      <AdminLoginPage /> */}
    </div>
  );
}

export default App;
