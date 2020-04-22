
const EDGE = 20
const STAR_FQ = 5
const METEOR_FQ = 0.5

// star background
module.exports =  {

    Z: 0,

    speed: 4,

    stars: [],

    newStar: function(falling) {
        let star = {
            a: true,
            falling: falling,
            c: this._.lib.math.rndi(3),
            //x: this._.env.width,
            //y: this._.lib.math.rndi(this._.env.height),
            //x: this._.lib.math.rndi(this._.env.width),
            //y: (this.speed < 0)? -EDGE : rx(1) + EDGE,
            x: (this.speed < 0)? -EDGE : rx(1) + EDGE,
            y: RND(ry(1)),
            s: 4 + this._.lib.math.rndi(8), // relative speed
            m: 5 + this._.lib.math.rndi(10),
        }
        if (falling) {
            star = {
                a: true,
                falling: falling,
                c: this._.lib.math.rndi(3),
                x: this._.lib.math.rndi(this._.env.width*2),
                y: -20,
                dx: -150 - lib.math.rndi(150),
                dy: 300 + lib.math.rndi(300),
                m: 4 + this._.lib.math.rndi(5),
            }
        }

        // place the star
        for (let i = 0; i < this.stars.length; i++) {
            if (!this.stars[i].a) {
                this.stars[i] = star
                return
            }
        }
        this.stars.push(star)
    },

    init: function() {
        for(let i = 0; i < 180*60; i++) {
            this.evo(0.015)
        }
    },

    evo: function(dt) {
        if (this._.lib.math.rndf() < STAR_FQ * dt) this.newStar(false)
        if (this._.lib.math.rndf() < METEOR_FQ * dt) this.newStar(true)

        // move stars
        const speed = this.speed
        this.stars.forEach( star => {
            if (star.falling) {
                star.x += star.dx * dt
                star.y += star.dy * dt
                if (star.y > env.height) star.a = false
            } else {
                star.x -= speed * star.s * dt
                //if (star.y < -env.height|| star.y > env.height*2) star.a = false
                if (star.x < - 2*EDGE || star.x > rx(1) + 2*EDGE || star.y > env.height*2) star.a = false
            }
        })

        /*
        // TODO what is happening with names when hero added?
        if (lab.cam && lab.cam.shell) {
            env.statusInfo = {
                shell: lab.cam.shell.name,
            }
        }
        */
    },

    draw: function() {
        // clear the screen
        background(env.style.background)

        // draw stars
        this.stars.forEach( star => {
            let img = res.stars.blue
            switch(star.c) {
            case 1: img = res.stars.red; break;
            case 2: img = res.stars.yellow; break;
            }
            ctx.drawImage(img, star.x, star.y, star.m, star.m)
        })
    },
};

