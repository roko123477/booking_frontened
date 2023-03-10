import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import UserContextProvider from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';
import Isauthor from "./Isauthor";
import CancelPayment from "./CancelPayment";
import PasswordChange from "./PasswordChange";
import ChangePasswordPage from "./ChangePasswordPage";



axios.defaults.baseURL =import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
//TODO:npm run dev for vite
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/password" element={<ChangePasswordPage />} />
          <Route path="/account/password" element={<PasswordChange />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/isauthor" element={<Isauthor />} />
          <Route path="/cancel/:id" element={<CancelPayment />} />
         
         
         
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
