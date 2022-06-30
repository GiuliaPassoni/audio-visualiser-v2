import React from "react";
import {Link} from "react-router-dom"

import {IconButton, Button, Typography, Toolbar, AppBar, Stack} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';

export default function Navbar({mode, setMode}){
    const handleModeChange = () => {
        if(mode==='light'){
            setMode('dark')
        }else{
            setMode('light')
        }
    };
    return(
        <AppBar>
            <Toolbar>
                <Typography
                    variant='h5'
                    component='div'
                    sx={{flexGrow:1}}
                    aria-label='Music visualiser'
                >
                    <Link to='/visualiser' underline="none">Music Visualiser</Link>
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant='text'><Link to='/' underline="none" underline="none">Log In</Link></Button>
                    <Button variant='text'><Link to='/visualiser' underline="none">Visualiser</Link></Button>
                    <Button variant='text'><Link to='/about' underline="none">About</Link></Button>
                    <IconButton sx={{ ml: 1 }} onClick={handleModeChange} color="default">
                        {mode === 'dark' ? <Brightness3Icon/>:<LightModeIcon/>}
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}