import React, {useState} from "react";
// import {sf2, sf3} from "../audio";
import sf0 from "./default.mp3";
import sf1 from './../audio/track1.mp3';
import sf2 from './../audio/track2.mp3';
import sf3 from './../audio/track3.mp3';
// import {soundFile as sf2} from './../audio/track2.mp3';
import {Container, Grid, Button, Typography} from "@mui/material";
import Canvas from "./Canvas.js";
import {draw} from "./drawFunc.js";
import style from './visualiser.module.scss';

const songArray=[sf0, sf1, sf2, sf3];

export default function Visualiser({mode}){
    const [tune, setTune] = useState(songArray[0]);

    const changeSong = (e) =>{
        let ix = e.target.value;
        setTune(songArray[ix]);
        // console.log(tune)
    }

    return(
        <Container className={style.visCont}>
            <Typography
                variant='h2'
                sx={{flexGrow:1}}
                aria-label='About'>
                Visualiser
            </Typography>
                <Grid container spacing={2}
                      // style={{width:"90%", margin:"2rem auto"                }}
                      style={{width:"90%" , margin:'auto', marginBottom:'1rem'}}
                >
                    <Grid item xs={6} md={3}>
                        <Button variant="outlined" value={0} onClick={changeSong}>Audio 1</Button>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Button variant="outlined" value={1} onClick={changeSong}>Audio 2</Button>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Button variant="outlined" value={2} onClick={changeSong}>Audio 3</Button>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Button variant="outlined" value={3} onClick={changeSong}>Audio 4</Button>
                    </Grid>
                </Grid>
                {/*<canvas style={{border:'1px solid red', display:'block'}}*/}
                {/*/>*/}
                {/*<Button variant='contained' onClick={togglePlayPause()}>{songIsPlaying ? 'Pause' : 'Play'}</Button>*/}
                <Canvas mode={mode} draw={draw} soundfile={tune}/>

        </Container>
    )
}