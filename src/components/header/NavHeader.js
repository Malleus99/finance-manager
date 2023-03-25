import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from 'store/auth-slice';
import classes from './NavHeader.module.css';

const activeLinkStyle = ({ isActive }) => ({
  background: isActive ? '#fff' : '',
});

const NavHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      {auth.currentUser && (
        <>
          <NavLink
            to='/profile'
            style={activeLinkStyle}
            className={classes.link}
          >
            PROFILE
          </NavLink>
          <NavLink to='/goals' style={activeLinkStyle} className={classes.link}>
            MY GOALS
          </NavLink>
          <div onClick={logoutHandler} className={classes.link}>
            LOG-OUT
          </div>
        </>
      )}
    </div>
  );
};

export default NavHeader;
