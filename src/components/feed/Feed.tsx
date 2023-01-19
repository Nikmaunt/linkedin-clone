import React, {ChangeEvent, MouseEvent, useCallback, useEffect, useState} from 'react';
import CreateIcon from '@mui/icons-material/Create';
import './Feed.css'
import InputOption from "./InputOption";
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Posts from "../posts/Posts";
import {db} from "../../firebase";
import {DocumentData} from "@firebase/firestore-types";
import firebase from "firebase/compat/app";

export type DataType = {
    id: string;
    name: string;
    description: string;
    message: string;
    photoUrl: string;
    timestamp: string;
};

type PostsType = {
    id:string
    doc?:DataType |DocumentData
}


const Feed = () => {

    const [posts, setPosts] = useState<PostsType[]>([])
    const [input, setInput] = useState<string>('')
    useEffect(()=> {
        db.collection("posts").orderBy('timestamp','desc').onSnapshot(snapshot =>(
            setPosts(snapshot.docs.map(doc=> (
                {
                    id: doc.id,
                    doc: doc.data()
                }
            )))
        ) )
    },[])
    const sendPostHandler = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        db.collection('posts').add({
            name: 'Nick',
            description: 'this is the test',
            message: input,
            photoUrl: '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('')
    }

    const onChangeInputHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    },[input])
    return (
        <div className='feed'>
            <div className='feed_inputContainer'>
                <div className="feed_input">
                    <CreateIcon/>
                    <form action="">
                        <input value={input} onChange={onChangeInputHandler} type="text"/>
                        <button onClick={sendPostHandler} type={"submit"}>Send</button>
                    </form>
                </div>
                <div className="feed_inputOptions">
                    <InputOption Icon={ImageIcon} title={'Photo'} color={'#70B5F9'}/>
                    <InputOption Icon={SubscriptionsIcon} title={'Video'} color={'#E7A33E'}/>
                    <InputOption Icon={EventNoteIcon} title={'Event'} color={'#C0CBCD'}/>
                    <InputOption Icon={CalendarViewDayIcon} title={'Write article'} color={'#7FC15E'}/>
                </div>
            </div>
            {posts?.map(({id,doc}) => (
                <Posts
                    key={id}
                    name={doc?.name}
                    description={doc?.description}
                    message={doc?.message}
                    photoUrl={doc?.photoUrl}
                />
            ))}

               <Posts  name={'Nick'} description={'Test message'} message={'WOW this worked'} />

        </div>

    );
};

export default Feed;