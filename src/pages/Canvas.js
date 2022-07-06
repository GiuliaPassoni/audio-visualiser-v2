import React, {useRef, useEffect, useState, useCallback} from 'react'
// import {soundFile as sf1} from "./default.mp3"; //how to import this "as sf1"
import {Container, Button} from "@mui/material";
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const Canvas = (props) => {

    const canvasRef = useRef(null) //ref for the canvas
    const { mode, draw, soundfile, ...rest } = props //unpacking: ...rest refers to all other props that we don't care too much about
    const [song, setSong] = useState(); //to set the song to the mp3 file
    const [audioCtx, setAudioCtx] = useState(); //to set the song to the mp3 file
    const [isPlaying, setIsPlaying] = useState(false); //to toggle play and pause
    const analyserRef = useRef(); //another ref for analyser: to access latest data
    const modeRef = useRef(); //to toggle mode
    modeRef.current = mode;

    //on loading, connect state isPlaying to play() and pause() methods.
    //Update whenever song or state is changed
    useEffect(() => {
        if (song === undefined) {
             return;
        }
        if (isPlaying) {
            song.play()
        } else {
          song.pause()
        }
        return () => {
            song.pause()
        }

    }, [isPlaying, song])

    //callback??
    // sets the audio html element, the context, connects to the speakers, and creates the analyser.
    //with the callback, we only load this function ONCE after the component is rendered
    const initAudio = useCallback(() => {
        const msong = new Audio();
        const audioContext = new AudioContext();
        setAudioCtx(audioContext);
        //creates source for audio elem
        const source = audioContext.createMediaElementSource(msong);
        const analyser = audioContext.createAnalyser();
        msong.src = soundfile;
        setSong(msong)
        //fft size of analyser set to 256
        analyser.fftSize = 256
        source.connect(audioContext.destination);
        source.connect(analyser);
        analyserRef.current = analyser // for render f() to access analyser
    }, [soundfile]);

    //on mounting, call the f() above that sets the audio and links the mp3 file
    useEffect(() => {
        initAudio()
    }, [initAudio]) //since whenever it updates, the function is redefined, using a Callback prevents an infinte loop in useEffect

    //on mounting, load the canvas
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0 //keeps track of steps in song
        let animationFrameId

        //Our draw came here
        const render = () => {
            frameCount++
            //we need the below for the drawing coordinates to depend on the music frequencies
            const bufferLength = analyserRef.current.frequencyBinCount;
            const amplitudeArray = new Uint8Array(bufferLength)
            analyserRef.current.getByteFrequencyData(amplitudeArray)
            draw(context, frameCount, amplitudeArray, modeRef) //draw is a prop
            animationFrameId = window.requestAnimationFrame(render)
        }

        render()

        return () => { //cleanup function: gets rid of animation when component unmounts
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw]) //this dependency + the internal call within render() creates the infinite loop that allows infinite rendering of the animation

    //for the button
    const playMusic = () => {
        audioCtx.resume() //to allow music to play on first load
        setIsPlaying(!isPlaying)
    }

    return(
        <Container style={{width: "90%", height: "90%", textAlign:'center'}}>
        <canvas style={{width: "100%", height: "100%", borderRadius:"5px"}} ref={canvasRef} {...props}/>
            {/*<p>{soundFile}</p>*/}
        <Button variant='contained' onClick={playMusic} size='large' sx={{m:'1rem'}}>{isPlaying ? <PauseCircleOutlineIcon/> : <PlayCircleOutlineIcon/>} </Button>
    </Container>
    )
}

export default Canvas