import {
    Hill
} from './hill.js';

import {
    SheepController
} from './sheep-controller.js';

import {
    Sun
} from './sun.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.setupBackgroundMusic();

        this.sun = new Sun();

        this.hills = [
            new Hill('#fd6bea', 0.2, 12),
            new Hill('#ff59c2', 0.5, 8),
            new Hill('#ff4674', 1.4, 6)
        ];

        this.SheepController = new SheepController();

        console.log('Hills created:', this.hills); // 추가

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    setupBackgroundMusic() {
        const audio = document.getElementById('backgroundMusic');
        audio.volume = 0.3;

        let firstClick = true;

        document.addEventListener('click', () => {
            if (firstClick) {
                audio.muted = false;
                firstClick = false;
            }
            
            if (audio.paused) {
                audio.play().catch(e => {
                    console.log("음악 재생 실패:", e);
                });
            } else {
                audio.pause();
            }
        });

        audio.play().catch(e => {
            console.log("자동 재생이 차단되었습니다");
        })

        window.addEventListener('beforeunload', () => {
            audio.pause();
        });
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.sun.resize(this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.hills.length; i++) {
            this.hills[i].resize(this.stageWidth, this.stageHeight)
        }

        this.SheepController.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));
    
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
   
        this.sun.draw(this.ctx, t);

        let dots;
        for (let i = 0; i < this.hills.length; i++) {
            console.log('Drawling hill', i);
            dots = this.hills[i].draw(this.ctx);
        }

        this.SheepController.draw(this.ctx, t, dots);
    }
}

window.onload = () => {
    new App();
};
