import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import linkedin from '../../assets/linkedin.png'
import avatar from '../../assets/avatar.png'
import './Header.css'
import HeaderOption from "./HeaderOption";
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../../redux/userSlice";
import firebase from "firebase/compat";
import {auth} from "../../firebase";
import {AppDispatch} from "../../redux/store";


const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    const logoutOfApp = () => {
        dispatch(logout())
         auth.signOut()
    }

    return (
        <div className='header'>
            <div className="header_left">
                <img src={linkedin} alt="linkedin_icon"/>
                <div className="header_search">
                 <SearchIcon/>
                    <input placeholder='Search' type="text"/>
                </div>
            </div>

            <div className="header_right">
               <HeaderOption Icon={HomeIcon}  title={'Home'}/>
               <HeaderOption Icon={SupervisorAccountIcon}  title={'My Network'}/>
               <HeaderOption Icon={BusinessCenterIcon}  title={'Jobs'}/>
               <HeaderOption Icon={ChatIcon}  title={'Messaging'}/>
               <HeaderOption Icon={NotificationsIcon }  title={'Notifications'}/>
               <HeaderOption Icon={LogoutIcon} onClick={logoutOfApp} title={'Logout'}/>
            </div>
        </div>
    );
};

export default Header;