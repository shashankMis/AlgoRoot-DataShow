import { useDispatch, useSelector } from 'react-redux';
import { logout, deleteAccount } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo">MyApp</div>

      <div className="user-menu">
        <span onClick={() => setDropdownOpen(!dropdownOpen)} className="username">
          {user?.name || 'User'} 
        </span>

        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="user-details">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </div>
            <hr />
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
