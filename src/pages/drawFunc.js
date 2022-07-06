function resizeCanvas(canvas) {
    const {width, height} = canvas.getBoundingClientRect() //resizes window depending on viewport dimensions

    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        return true
    }
    return false
}

const blinking_circle = (ctx, frameCount, x, y, width, height, color, amplitude = 20, min_amplitude) => {
    ctx.fillStyle = color
    ctx.shadowBlur = 5;
    ctx.shadowColor = "gray";

    ctx.lineWidth = 1;
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#333";
    ctx.stroke();

    ctx.beginPath() //start drawing
    ctx.arc(x, y, amplitude + min_amplitude, 0, 2 * Math.PI) //canvas has no way to do a circle...so you do a full-circle with the arc
    ctx.fill()
}

class Particle {
    constructor(width, height, speed = 0.2, max_amplitude = 50, min_amplitude = 10) {
        this.width = width
        this.height = height
        this.color = `rgb(120, 205, ${Math.random() * 255})`
        this.base_speed = speed
        this.max_amplitude = max_amplitude
        this.min_amplitude = min_amplitude
        this.amplitude = this.min_amplitude
        this.decay = 0.007 //??
        this.threshold = 3
        this.reset()
    }

    draw(ctx, frameCount) {
        blinking_circle(ctx, frameCount, this.x, this.y, this.width, this.height, this.color, this.amplitude, this.min_amplitude)
    }

    reset() {
        this.x = Math.random() * this.width
        this.y = Math.random() * this.height
        this.angle = Math.random() * 2 * Math.PI
        this.target_x =  Math.sin(this.angle) //to mitigate the speed
        this.target_y = Math.cos(this.angle)
    }

    update(amplitude = 255) {
        const new_amp = (amplitude / 255) * this.max_amplitude; //to normalise amplitude
        if (new_amp > this.amplitude) {
            this.amplitude = new_amp
        } else if (Math.abs(new_amp - this.amplitude) > this.threshold) {
            this.amplitude = (1 - this.decay) * this.amplitude
            if (this.amplitude < 0) {
                this.amplitude = 0
            }
        }

        const speed = this.base_speed + ((this.amplitude - this.min_amplitude) / (this.max_amplitude + this.min_amplitude))
        this.x += this.target_x * speed
        this.y += this.target_y * speed

        if (this.x > this.width || this.y > this.height || this.x <= 0 || this.y <= 0) {
            this.reset()
        }
    }

}

const particles = []

export const draw = (ctx, frameCount, data, modeRef) => {
    //define background colours
    let color1, color2;
    if(modeRef.current==='light'){
        color1 = 'rgb(75,70,70)';
        color2 = 'rgb(0,0,0)';
    }else{
        color2 = 'rgb(58,57,57)';
        color1 = 'rgb(91,171,255)';
    }

    // pre render
    ctx.save()
    resizeCanvas(ctx.canvas)
    const {width, height} = ctx.canvas
    ctx.clearRect(0, 0, width, height)
    var grd = ctx.createRadialGradient(0,0,0, 0, 0,(width + height));
    grd.addColorStop(0,color1);
    grd.addColorStop(1,color2);
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,width,height);


    // init
    if (particles.length === 0) {
        for (let i = 0; i < 32; i++) {
            const p = new Particle(width, height);
            particles.push(p)
        }
    }

    // render
    particles.forEach((p, idx) => {
        p.update(data[idx]) //?????
        p.draw(ctx, frameCount)
    })

    // post render
    ctx.restore()//goes together with ctx.save above
}