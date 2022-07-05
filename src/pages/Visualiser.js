import React, {useState, useRef, useEffect} from "react";
// import tune from './../default.mp3';
import {Container, Grid, Paper, Button} from "@mui/material";
import Canvas from "./Canvas.js"
import {draw} from "./drawFunc.js"

export default function Visualiser({mode}){
    // const [songIsPlaying, setSongIsPlaying] = useState(false);
    //
    // let song = new Audio(tune);
    //
    // function togglePlayPause(){
    //     if (songIsPlaying === false){
    //         song.play();
    //         setSongIsPlaying(true);
    //     }else{
    //         song.pause()
    //         setSongIsPlaying(false);
    //     }
    // }

    return(
        <Container style={{width:"80%", margin:'100px auto', textAlign: 'center'}}>
                <h1>
                    Visualiser
                </h1>
                {/*<Grid container style={{width:"90%", margin:"2rem auto", }}>*/}
                {/*    <Grid item xs={4}>*/}
                {/*        <Button variant="outlined">Audio 1</Button>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={4}>*/}
                {/*        <Button variant="outlined">Audio 2</Button>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={4}>*/}
                {/*        <Button variant="outlined">Audio 3</Button>*/}
                {/*    </Grid>*/}

                {/*</Grid>*/}
                {/*<canvas style={{border:'1px solid red', display:'block'}}*/}
                {/*/>*/}
                {/*<Button variant='contained' onClick={togglePlayPause()}>{songIsPlaying ? 'Pause' : 'Play'}</Button>*/}
                <Canvas mode={mode} draw={draw}/>

        </Container>
    )
}