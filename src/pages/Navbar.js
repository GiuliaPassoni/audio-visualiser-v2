import React from "react";
import {Link} from "react-router-dom"

import {IconButton, Button, Typography, Toolbar, AppBar, Stack} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';

export default function Navbar({mode, setMode}, loginRef){
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
                <BubbleChartIcon fontSize='large'/>
                <Typography
                    variant='h5'
                    component='div'
                    sx={{flexGrow:1}}
                    aria-label='Music visualiser'
                >
                    <Link to='/visualiser' style={{textDecoration:'none', color:'inherit'}}>Music Visualiser</Link>
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant='text'>
                        <Link to='/' style={{textDecoration:'none', color:'white'}}>
                            {/*{loginRef ? "Log Out" : "Log In"}*/}
                            My Account
                        </Link>
                    </Button>
                    <Button variant='text'><Link to='/visualiser' style={{textDecoration:'none', color:'white'}}>Visualiser</Link></Button>
                    <Button variant='text'><Link to='/about' style={{textDecoration:'none', color:'white'}}>About</Link></Button>
                    <IconButton sx={{ ml: 1 }} onClick={handleModeChange} color="default">
                        {mode === 'dark' ? <Brightness3Icon/>:<LightModeIcon/>}
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}