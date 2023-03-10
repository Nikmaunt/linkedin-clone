import React from 'react';
import {Avatar} from "@mui/material";
import './Sidebar.css'
import bgImage from '../../../assets/bg-image.jpg'
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../../redux/userSlice";

const Sidebar = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch();

    const recentItem = (topic:string) => (
       <div className='sidebar_recentItem'>
           <span className='sidebar_hash'>#</span>
            <p>{topic}</p>
       </div>
    )

    return (
        <div className='sidebar'>
           <div className="sidebar_top">
               <img src={bgImage} alt=""/>
                <Avatar src={user?.photoUrl}  className="sidebar_avatar">
                    {user.email[0]} </Avatar>
               <h2>{user.displayName}</h2>
               <h4>{user.email}</h4>
           </div>
            <div className="sidebar_stats">
                <div className="sidebar_stat">
                    <p>Who viewed you</p>
                    <p className='sidebar_statNumber'>2,534</p>
                </div>
                <div className="sidebar_stat">
                    <p>Views on post</p>
                    <p className='sidebar_statNumber'>2,443</p>
                </div>
            </div>
            <div className="sidebar_bottom">
                <p>Recent</p>
                {recentItem('react')}
                {recentItem('programming')}
                {recentItem('softwareengineering')}
                {recentItem('typescript')}
                {recentItem('developer')}
            </div>
        </div>
    );
};

export default Sidebar;