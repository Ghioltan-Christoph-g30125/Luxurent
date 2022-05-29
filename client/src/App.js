import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import UserBookings from './pages/UserBookings';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import { PropertySafetyFilled } from '@ant-design/icons';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to='/login' />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ProtectedRoute path='/home' element={<Home />} />
        <ProtectedRoute path='booking/:carid' element={<BookingCar />} />
        <ProtectedRoute path='/userbookings' element={<UserBookings />} />
        <ProtectedRoute path='/addcar' element={<AddCar />} />
        <ProtectedRoute path='/admin' element={<AdminHome />} />
        <ProtectedRoute path='/editcar/:carid' element={<EditCar />} exact />
      </BrowserRouter>
    </div>
  );

}

export default App;

export function ProtectedRoute(props) {
  if (localStorage.getItem('user')) {
      return <Routes><Route {...props} /></Routes>;
  }
  else {
    return <Link to='/login' />
  }
}


