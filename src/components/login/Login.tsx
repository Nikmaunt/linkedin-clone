import React, {MouseEvent, MouseEventHandler, useState} from 'react';
import './Login.css'
import linkedinLogo from '../../assets/linkedin-logo.png'
import {auth} from "../../firebase";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {login} from "../../redux/userSlice";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
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
            setPassword(values.password)
            setEmail(values.email)
        },
    });
    const onRegisterHandler = () => {
        console.log(formik.values.email, formik.values.password  )
        if (!formik.values.name) return
        auth.createUserWithEmailAndPassword( formik.values.email.toString(), formik.values.password.toString())
            .then((userAuth) => {
                console.log(userAuth)
                userAuth.user?.updateProfile({
                    displayName: name,
                    photoURL: profilePicture,
                }).then(() => {
                    dispatch(login({
                        email: userAuth.user?.email,
                        uid: userAuth.user?.uid,
                        displayName: name,
                        photoUrl: profilePicture,
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

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [name, setName] = useState("");
//     const [profilePicture, setProfilePicture] = useState("");
//     const [error, setError] = useState("");
//     const dispatch = useDispatch()
//     const formik = useFormik({
//         validate: (values) => {
//             if (!values.email) {
//                 return {
//                     email: 'Email is required'
//                 }
//             } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//                 return {
//                     email: 'Invalid email address'
//                 }
//             }
//             if (!values.password) {
//                 return {
//                     password: 'Password is required'
//                 }
//             }
//             if (!values.name) {
//                 return {
//                     name: 'Full name is required'
//                 }
//             }
//             else if (values.name.length > 20) {
//                 return {
//                     name: '\'Must be 20 characters or less\''
//                 }
//             }
//         },
//         initialValues: {
//             name: '',
//             email: '',
//             password: '',
//             profilePicUrl: '',
//         },
//         onSubmit: values => {
//             let singIn =  auth.signInWithEmailAndPassword(email,password)
//                 .then(userAuth => {
//                     dispatch(login({
//                         email:userAuth.user?.email,
//                         uid: userAuth.user?.uid,
//                         displayName:userAuth.user?.displayName,
//                         photoURL:userAuth.user?.photoURL,
//                     }))
//                 })
//                 .catch(error=> setError(error))
//             console.log(values.email,values.password)
//             return singIn
//         },
//     });
//
//     const onRegisterHandler = (e: MouseEvent<HTMLSpanElement>) => {
//         auth.createUserWithEmailAndPassword(email,password)
//             .then((userAuth)=>{
//                 userAuth.user?.updateProfile({
//                     displayName:name,
//                     photoURL:profilePicture,
//                 })
//                     .then(()=> {
//                         dispatch(login({
//                             email:userAuth.user?.email,
//                             uid:userAuth.user?.uid,
//                             displayName:name,
//                             photoUrl:profilePicture
//                         }))
//                     }).catch(error=> setError(error))
//             })
//     }
//     const loginToAppHandler = (e:MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault()
//     }
//     return (
//         <div className='login'>
//             <img src={linkedinLogo} alt="linkedinLogo"/>
//             <form onSubmit={formik.handleSubmit}>
//                 <input placeholder='Full name (required if registering)'
//                        type="text"   {...formik.getFieldProps('name')}/>
//                 {formik.errors.name ? <div>{formik.errors.name}</div> : null}
//                 <input placeholder='Profile pic URL (optional)' type="text" {...formik.getFieldProps('profilePicUrl')}/>
//                 <input placeholder='Email ' type="email"   {...formik.getFieldProps('email')}/>
//                 {formik.errors.email ? <div>{formik.errors.email}</div> : null}
//                 <input placeholder='Password ' type="password"   {...formik.getFieldProps('password')}/>
//                 {formik.errors.password ? <div>{formik.errors.password}</div> : null}
//                 <button type='submit'>Sign In</button>
//             </form>
//             <p>Not a member?
//                 <span className='login_register' onClick={onRegisterHandler}>Register Now</span>
//             </p>
//         </div>
//
//     );
// };

