import React, {useState, useEffect} from "react";

import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase-config';

import {Container, Typography, Card, Avatar, Button} from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';

export default function Login(){
    // const [userLoggedIn, setUserLoggedIn] = useState(false);
    // const [profilePic, setProfilePic] = useState('');
    // const [isFirstLog, setIsFirstLog] = useState(false);

    const [user, setUser]=useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser)=>{
            // console.log('current user',auth.currentUser)
            setUser(currentUser)
        });
    })

    // const loginRef = useRef();
    // const userWelcomeRef = useRef();
    // loginRef.current=userLoggedIn;

    const googleSignIn = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // console.log(result);
            }).catch((error) => {
            console.log(error);
        });
    }

    const handleImgError = e => {
        e.target.src = profilePic;
    }

    const googleLogOut = () => {
        signOut(auth).then(() => {
            // setUserLoggedIn(false);
            return(
                <p>Sign out successful :) </p>
            );
        }).catch((error) => {
            console.log(error);
        });
    }

    let userName, profilePic;
    if (user !== undefined && user !== null) {
        userName = user.displayName.split(' ')[0];
        profilePic = user.photoURL;
    }else{
        userName = '';
    }


    return(
        <Container style={{margin:'100px auto', textAlign: 'center'}}>
            <Typography
                variant='h2'
                sx={{flexGrow:1}}
                aria-label='About'>
                Login
            </Typography>
            <Card sx={{maxWidth:250, minWidth:250, width:.4, m:'auto', mt:5, p:2, justifyContent:'center'}}>
                { user === null &&
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
                {user !== null &&
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
                        >{ `Welcome ${userName}`} </Typography>
                    </>}
                {user !==null &&
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