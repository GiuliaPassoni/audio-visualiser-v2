import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"

import {IconButton, Container, Button, Typography, Toolbar, AppBar, Stack, Hidden, SwipeableDrawer, Divider} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {blue} from "@mui/material/colors";

import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase-config";


export default function Navbar({mode, setMode}){
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser)=>{
            // console.log('current user',auth.currentUser)
            setUser(currentUser)
        });
    })


    const handleModeChange = () => {
        if(mode==='light'){
            setMode('dark')
        }else{
            setMode('light')
        }
    };
    return(
        <AppBar>
            <Container maxWidth='md'>
                <Toolbar>
                    <BubbleChartIcon fontSize='large'/>
                    <Typography
                        variant='h5'
                        component='div'
                        sx={{flexGrow:1}}
                        aria-label='Music visualiser'
                    >
                        <Link to='/' style={{textDecoration:'none', color:'inherit'}}>Music Visualiser</Link>
                    </Typography>
                    <Hidden smDown>
                        <Stack direction="row" spacing={2}>
                            <Button variant='text'>
                                <Link to='/login' style={{textDecoration:'none', color:'white'}}>
                                    {user === null ? "My Account" : `Hello, ${user.displayName.split(' ')[0]}`}
                                </Link>
                            </Button>
                            <Button variant='text'><Link to='/' style={{textDecoration:'none', color:'white'}}>Visualiser</Link></Button>
                            <Button variant='text'><Link to='/about' style={{textDecoration:'none', color:'white'}}>About</Link></Button>
                            <IconButton sx={{ ml: 1 }} onClick={handleModeChange} color="default">
                                {mode === 'dark' ? <Brightness3Icon/>:<LightModeIcon/>}
                            </IconButton>
                        </Stack>
                    </Hidden>
                    <Hidden smUp>
                        <IconButton
                            onClick={()=> setOpen(true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </Container>

            <SwipeableDrawer
                anchor="top"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                <Container
                    onClick={() => setOpen(false)}
                    role="button"
                    style={{
                        width:'100%',
                        minWidth:300,
                        textAlign:'center',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                    >
                    <BubbleChartIcon fontSize='large' style={{display: 'inline'}}/>
                    <Typography
                        variant='h6'
                        component='span'
                        sx={{flexGrow:1}}
                        aria-label='Music visualiser'
                    >
                        Music Visualiser
                    </Typography>
                    <IconButton>
                        <ExpandMoreIcon/>
                    </IconButton>
                </Container>
                <Divider/>
                <Button variant='text' onClick={() => setOpen(false)}>
                    <Link to='/login' style={{textDecoration:'none', color:'white'}}>
                        {user === null ? "My Account" : `Hello, ${user.displayName.split(' ')[0]}`}
                    </Link>
                </Button>
                <Button variant='text' onClick={() => setOpen(false)}>
                    <Link to='/' style={{textDecoration:'none', color:'gray'}}>
                        Visualiser
                    </Link>
                </Button>
                <Button variant='text' onClick={() => setOpen(false)}>
                    <Link to='/about' style={{textDecoration:'none', color:'gray'}}>
                        About
                    </Link>
                </Button>
                <IconButton sx={{ ml: 1 }} onClick={handleModeChange} color="default">
                    {mode === 'dark' ? <Brightness3Icon/>:<LightModeIcon/>}
                </IconButton>
            </SwipeableDrawer>
        </AppBar>
    );
}