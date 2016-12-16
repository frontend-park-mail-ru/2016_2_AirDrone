export default function gameCanvas() {
    window.mode = 0;
    let particles = [];
    
    // canvas and 2D context initialization
    const canvas = document.querySelector(".game__canvas");
    const context2D = canvas.getContext("2d");
    
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
    // starting the game loop at 60 frames per second
    const frameRate = 60.0;
    const frameDelay = 1000.0/frameRate;
    
    let status = parseFloat(1.0);
    
    let startTime = 0;
    
    setInterval(function()
                {
                    update(frameDelay);
                }, frameDelay);
    
    function randomFloat (min, max)
    {
        return min + Math.random()*(max-min);
    }
    
    /*
     * A single explosion particle
     */
    function Particle ()
    {
        this.scale = 1.2;
        this.x = 0;
        this.y = 0;
        this.radius = 20;
        this.color = "#000";
        this.velocityX = 0;
        this.velocityY = 0;
        this.scaleSpeed = 0.5;
        this.update = function(ms)
        {
            // shrinking
            this.scale -= this.scaleSpeed * ms / 1000.0;
            
            if (this.scale <= 0)
            {
                this.scale = 0;
            }
            
            // moving away from explosion center
            this.x += this.velocityX * ms/1000.0;
            this.y += this.velocityY * ms/1000.0;
        };
        
        this.draw = function(context2D)
        {
            // translating the 2D context to the particle coordinates
            context2D.save();
            context2D.translate(this.x, this.y);
            context2D.scale(this.scale, this.scale);
            
            // drawing a filled circle in the particle's local space
            context2D.beginPath();
            context2D.arc(0, 0, this.radius, 0, Math.PI*2, true);
            context2D.closePath();
            
            context2D.fillStyle = this.color;
            context2D.fill();
            
            context2D.restore();
        };
    }
    
    /*
     * Advanced Explosion effect
     * Each particle has a different size, move speed and scale speed.
     *
     * Parameters:
     * 	x, y - explosion center
     * 	color - particles' color
     */
    function createExplosion(x, y, color)
    {
        const minSize = 8;
        const maxSize = 30;
        const count = 15;
        const minSpeed = 80.0;
        const maxSpeed = 220.0;
        const minScaleSpeed = 1.0;
        const maxScaleSpeed = 2.0;
        
        
        for (let angle=0; angle<360; angle += Math.round(360/count))
        {
            let particle = new Particle();
            
            particle.x = x;
            particle.y = y;
            
            particle.radius = randomFloat(minSize, maxSize);
            
            particle.color = color;
            
            particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);
            
            let speed = randomFloat(minSpeed, maxSpeed);
            
            particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
            particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);
            
            particles.push(particle);
        }
    }
    
    //Const size variables
    const rectSize = window.innerWidth / 3;
    const marginY = (window.innerHeight - rectSize) * 0.5;
    const statusMargin = ((window.innerHeight - rectSize) * 0.5) + rectSize + 5;
    const alertSize = 0.7 * rectSize;
    const alertMargin = 0.15 * rectSize;
    
    function update (frameDelay)
    {
        context2D.clearRect(0, 0, window.innerWidth, window.innerHeight);
        // update and draw particles
        for (let i=0; i<particles.length; i++)
        {
            let particle = particles[i];
            
            particle.update(frameDelay);
            particle.draw(context2D);
            if (particle.scale == 0)
            {
                particles.splice(i, 1);
            }
        }
        // draw aiming window
        drawStatus(0.5 * rectSize, 0.1 * rectSize, marginY - rectSize * 0.1 - 5, "#4d4d4d", "Зона захвата", 1, 10);
        roundRect(context2D, rectSize, marginY, rectSize, rectSize, 20, "red", false);
        switch (window.mode)
        {
            case 1:
                drawStatus(rectSize, 0.2 * 0.7 * rectSize, statusMargin, "green", "Захват цели...", status, 20);
                status = parseFloat(status) + parseFloat(0.007);
                if (status > 1)
                {
                    let x = canvas.width  * 0.5;
                    let y = canvas.height * 0.5;
                    createExplosion(x, y, "#525252");
                    createExplosion(x, y, "#FFA318");
                    createExplosion(x, y, "#525252");
                    createExplosion(x, y, "#FFA318");
                    window.mode = 0;
                }
                break;
            case 2:
                if (status < 1)
                {
                    drawStatus(rectSize, 0.2 * 0.7 * rectSize, statusMargin, "#cc0000", "Вы под ударом!", status, 20);
                    status = parseFloat(status) + parseFloat(0.007);
                }
                else
                {
                    if(startTime != 0)
                    {
                        context2D.globalAlpha = 0.75;
                        roundRect(context2D, rectSize + alertMargin, marginY + alertMargin, alertSize, alertSize, 20, "#4d4d4d", true, false);
                        context2D.globalAlpha = 1;
                        context2D.font='25px Helvetica';
                        context2D.fillStyle = 'white';
                        context2D.textAlign="center";
                        context2D.fillText("Вы подбиты!", rectSize + rectSize * 0.5, marginY + alertMargin + 0.3 * alertSize, alertSize);
                        context2D.font='20px Helvetica';
                        context2D.fillText("Ограничение действует:", rectSize + rectSize * 0.5, marginY + alertMargin + 0.5 * alertSize, alertSize);
                        let seconds = 10 - ((new Date()).getTime() - startTime) / 1000;
                        seconds = parseInt(seconds);
                        context2D.fillText(seconds + " секунд", rectSize + rectSize * 0.5, marginY + alertMargin + 0.6 * alertSize, alertSize);
                        if(seconds <= 0)
                        {
                            window.mode = 0;
                            startTime = 0;
                        }
                    }
                    else
                    {
                        startTime = (new Date()).getTime();
                    }
                }
                break;
        }
    }
    
    function drawStatus(size, height, offsetY, color, label, realSize, radius)
    {
        context2D.globalAlpha = 0.5;
        const xMargin = (window.innerWidth - size) * 0.5;
        roundRect(context2D, xMargin, offsetY, size * realSize, height, radius, color, true, false);
        roundRect(context2D, xMargin, offsetY, size, height, radius, color, true, false);
        context2D.globalAlpha = 1;
        context2D.font='20px Helvetica';
        context2D.fillStyle = 'white';
        context2D.textAlign="center";
        context2D.fillText(label,xMargin + size * 0.5,offsetY + height * 0.6, size);
    }
    
    function roundRect(context2D, x, y, width, height, radius, color, fill, stroke)
    {
        if (typeof color == 'undefined') {
            color = "black";
        }
        if (typeof stroke == 'undefined') {
            stroke = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
            let defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
            for (let side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        context2D.lineWidth=10;
        context2D.strokeStyle = color;
        context2D.fillStyle = color;
        context2D.beginPath();
        context2D.moveTo(x + radius.tl, y);
        context2D.lineTo(x + width - radius.tr, y);
        context2D.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        context2D.lineTo(x + width, y + height - radius.br);
        context2D.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        context2D.lineTo(x + radius.bl, y + height);
        context2D.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        context2D.lineTo(x, y + radius.tl);
        context2D.quadraticCurveTo(x, y, x + radius.tl, y);
        context2D.closePath();
        if (fill) {
            context2D.fill();
        }
        if (stroke) {
            context2D.stroke();
        }
    }
    
    //Чтобы сбросить выполнения анимации (бывает в этом надобность)
    //достаточно приравнять mode нулю!
    
    //Чтобы запустить анимации нужно просто выставить нужный mode
    //и обнулить переменную прогресс бара
    //

    window.mode1 = function () {
        window.mode = 1;
        status = parseFloat(0.0);
    }
    window.mode2 = function () {
        window.mode = 2;
        status= parseFloat(0.0);
    }

    window.onkeydown = function(evt)
    {
        evt = evt || window.event;
        //Квадракоптер под ударом
        if (evt.keyCode == 90)
        {
//            window.mode = 1;
//            status = parseFloat(0.0);
            window.mode1();
        }
        //Захват противника
        else if (evt.keyCode == 88)
        {
//            window.mode = 2;
//            status = parseFloat(0.0);
            window.mode2();
        }
    };
}
