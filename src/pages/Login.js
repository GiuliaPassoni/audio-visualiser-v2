import React, {useState, useRef} from "react";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from './../firebase-config';

import {Container, Typography, Card, Avatar, TextField, Button} from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';

export default function Login(){
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    const [isFirstLog, setIsFirstLog] = useState(false);
    const loginRef = useRef();
    loginRef.current=userLoggedIn;

    const googleSignIn = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // // The signed-in user info.
                console.log(result);
                setUserLoggedIn(true);
                const userName = result.user.displayName;
                setProfilePic(result.user.photoURL);
                localStorage.setItem("userName", userName);
                const creationLog = result.user.metadata.creationTime;
                const lastLog = result.user.metadata.lastSignInTime;
                if(creationLog === lastLog){
                    setIsFirstLog(true)
                }
                // localStorage.setItem("profilePic", profilePic);
            }).catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(error);
        });
    }

    const handleImgError = e => {
        e.target.src = profilePic;
    }

    const googleLogOut = () => {
        signOut(auth).then(() => {
            setUserLoggedIn(false);
            return(
                <p>Sign out successful :) </p>
            );
        }).catch((error) => {
            console.log(error);
        });
    }
    return(
        <Container color='primary' style={{margin:'100px auto', textAlign: 'center'}}>
            <Typography
                variant='h2'
                sx={{flexGrow:1}}
                aria-label='About'>
                Login
            </Typography>
            <Card sx={{maxWidth:250, minWidth:250, width:.4, m:'auto', mt:5, p:2, justifyContent:'center'}}>
                { userLoggedIn ===false &&
                    <>
                        <Avatar
                            sx={{m:'10px auto'}}
                            alt='Google profile picture'
                            // sx={{ bgcolor: primary }}
                        >
                            <FaceIcon fontSize='large' sx={{width:'2rem'}}/>
                        </Avatar>
                        {/*<TextField*/}
                        {/*    required*/}
                        {/*    type='email'*/}
                        {/*    label="Your GMail address"*/}
                        {/*    placeholder="hello@123.com"*/}
                        {/*    variant="filled"*/}
                        {/*    // helperText="Your GMail address"*/}
                        {/*/>*/}
                        <Button
                            sx={{mt: '1rem'}}
                            variant='contained'
                            onClick={googleSignIn}
                        >Sign In with Google</Button>
                    </>
                }
                {userLoggedIn === true &&
                    <>
                        {/*<img src={profilePic} className={style.profilepic} alt='User profile picture' loading='lazy' onError={handleImgError}/>*/}
                        <Avatar
                            src={profilePic}
                            sx={{m:'10px auto', width: 80, height: 80}}
                            alt='User profile picture'
                            onError={handleImgError}
                            // sx={{ bgcolor: primary }}
                        >
                            {/*<img src={profilePic} alt='User profile picture' loading='lazy' onError={handleImgError} style={{borderRadius:'50%'}}/>*/}
                        </Avatar>
                        <Typography
                            variant='h6'
                            aria-label='Welcome message'
                        >{ isFirstLog === true ? 'Welcome' : 'Welcome back'} {localStorage.getItem("userName")} :)</Typography>
                    </>}
                {userLoggedIn === true &&
                    <Button
                        sx={{mt: '1rem'}}
                        variant="contained"
                        onClick={googleLogOut}
                    >Log Out
                    </Button> }

            </Card>
        </Container>
    )
}