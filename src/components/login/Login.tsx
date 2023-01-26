import React, {MouseEvent, MouseEventHandler, useState} from 'react';
import './Login.css'
import linkedinLogo from '../../assets/linkedin-logo.png'
import {auth} from "../../firebase";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {login} from "../../redux/userSlice";
import {AppDispatch} from "../../redux/store";

const Login = () => {
    const [error, setError] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            } if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return {
                    email: 'Invalid email address'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }
            if (!values.name) {
                return {
                    name: 'Full name is required'
                }
            } if (values.name.length > 20) {
                return {
                    name: '\'Must be 20 characters or less\''
                }
            }
        },
        initialValues: {
            name: '',
            email: '',
            password: '',
            profilePicUrl: '',
        },
        onSubmit: values => {

        },
    });
    const onRegisterHandler = () => {
        if (!formik.values.name) return
        auth.createUserWithEmailAndPassword( formik.values.email.toString(), formik.values.password.toString())
            .then((userAuth) => {
                userAuth.user?.updateProfile({
                    displayName: formik.values.name,
                    photoURL: formik.values.profilePicUrl,
                }).then(() => {
                    dispatch(login({
                        email: userAuth.user?.email,
                        uid: userAuth.user?.uid,
                        displayName: formik.values.name,
                        photoUrl: formik.values.profilePicUrl
                    }))
                })
            }).catch(error => setError(error));

    };
    const loginToApp = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(formik.values.email.toString(), formik.values.password.toString())
            .then(userAuth => {
                dispatch(login({
                        email: userAuth.user?.email,
                        uid: userAuth.user?.uid,
                        displayName: userAuth.user?.displayName,
                        photoUrl: userAuth.user?.photoURL,
                    })
                );
            }).catch(error => setError(error))
    };
    const onChangePassword = () => {
        setError('')
    }

     console.log( error)
    return (
        <div className='login'>
            <img src={linkedinLogo} alt="linkedinLogo"/>
            <form onSubmit={formik.handleSubmit} onChange={onChangePassword}>
                <input placeholder='Full name (required if registering)'
                 type="text"  {...formik.getFieldProps('name')}/>
                {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                <input placeholder='Profile pic URL (optional)' type="text" {...formik.getFieldProps('profilePicUrl')}/>
                <input placeholder='Email ' type="email"   {...formik.getFieldProps('email')}/>
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <input placeholder='Password'  type="password"   {...formik.getFieldProps('password')}/>
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                <button type='submit' onClick={loginToApp}>Sign In</button>
                {error && <span className='error' >{error.toString().replace(/FirebaseError: Firebase: /gi, '')}</span> }
            </form>
            <p>Not a member?
                <span className='login_register' onClick={onRegisterHandler}> Register Now</span>
            </p>
        </div>

    )
}

export default Login;
