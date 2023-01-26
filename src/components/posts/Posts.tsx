import React, {forwardRef, LegacyRef} from 'react';
import './Posts.css'
import {Avatar, SvgIconTypeMap} from "@mui/material";
import InputOption from "../feed/InputOption";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatOutlinedIcon from '@mui/icons-material/Chat';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';


type  PostsPropsType = {
    name: string
    description?: string
    message?: string
    photoUrl?: string
}


const Posts =  forwardRef (({name, description, message, photoUrl}: PostsPropsType,ref:LegacyRef<HTMLDivElement> | undefined) => {
    return (
        <div ref={ref} className='post'>
            <div className="post_header">
                <Avatar src={photoUrl}>{name[0]}</Avatar>
                <div className="post_info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>
            <div className="post_body">
                <p>{message}</p>
            </div>

            <div className="post_buttons">
                <InputOption Icon={ThumbUpIcon} title={'Like'} color={'gray'}/>
                <InputOption Icon={ChatOutlinedIcon } title={'Comment'} color={'gray'}/>
                <InputOption Icon={ShareIcon} title={'Share'} color={'gray'}/>
                <InputOption Icon={SendIcon} title={'Send'} color={'gray'}/>
            </div>
        </div>
    );
})

export default Posts;