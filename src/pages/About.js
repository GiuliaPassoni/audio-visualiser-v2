import {Container, Typography} from "@mui/material";

export default function About(){
    return(
        <Container style={{width:"80%", margin:'1rem auto', marginTop:'100px', textAlign: 'center'}}>
            <Typography
                variant='h2'
                sx={{flexGrow:1}}
                aria-label='About'>
                About
            </Typography>
            <Typography
            variant='h6'
            sx={{width:.7, m:'2rem auto', lineHeight:'2rem', fontSize:'120%', textAlign:'justify', fontWeight:'light'}}
                >
                This music visualiser website is an important milestone in my perilious journey on the long and winding road to learn Front End development.
                Credits for the immense help and patience go to my programming master, Mihai (did you read <em>Miyagi</em> instead? That may be no coincidence...).
            </Typography>
            {/*<Card>*/}
            {/*    <CardMedia*/}
            {/*    component='iframe'*/}
            {/*    src="https://giphy.com/embed/osjgQPWRx3cac"*/}
            {/*    width="480" height="480"*/}
            {/*    />*/}
            {/*</Card>*/}
            <iframe title='pusheen' src="https://giphy.com/embed/osjgQPWRx3cac" width="240" height="240" style={{border:'.5px solid black', borderRadius:5}}
                    className="giphy-embed" allowFullScreen></iframe>
            {/*<p><a href="https://giphy.com/gifs/sticker-osjgQPWRx3cac">via GIPHY</a></p>*/}
        </Container>
    )
}