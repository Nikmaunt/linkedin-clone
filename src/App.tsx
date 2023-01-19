import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/header/Header";
import Sidebar from "./components/header/sidebar/Sidebar";
import Feed from "./components/feed/Feed";
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectUser} from "./redux/userSlice";
import Login from "./components/login/Login";
import firebase from "firebase/compat";
import {auth} from "./firebase";


function App() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            if (userAuth) {
                dispatch(login({
                    email: userAuth.email,
                    uid: userAuth.uid,
                    displayName: userAuth.displayName,
                    photoUrl: userAuth.photoURL,
                }))
            } else {
                // @ts-ignore
                dispatch(logout())
            }
        })
    }, [])
    return (
        <div className="App">
            {/*header*/}
            <Header/>
            {!user ? (<Login/>) : (
                <div className="app_body">
                    <Sidebar/>
                    <Feed/>
                    {/*widgets*/}
                </div>
            )}
        </div>
    );
}

export default App;
