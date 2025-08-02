class DinoGame{
    constructor(){
        this.gameContainer = document.getElementById('.game-container');
        this.dino = document.getElementById('dino');
        this.scoreElemnt = document.getElementById('score');
        this.gameOverElement = document.getElementById('gameOver');
        this.finalScoreElement = document.getElementById('fianlScore');
        this.isGameRunning= false;
        this.isJumping= false;
        this.score=0;
        this.obstacles = [];
        this.obstacleTimer = 0;
        this.gameloop= null;
        this.difficulty = 1;
        this.init();
    }

    init(){
        this.updateScore();
        this.setupEventListeners();
        this.dino.classList.add('running')
    }

    setupEventListeners(){
        document.addEventListener('keydown', (e)=>{
            if(e.code === 'Space' || e.code === 'ArrowUp'){
                e.preventDefault();
                if(!this.isGameRunning){
                    this.startGame();
                }else {
                    this.jump();
                }
            }
            if(e.code === 'KeyR' && !this.isGameRunning){
                this.resetHighScore();
            }
        })
        this.gameContainer.addEventListener('touchstart', (e)=>{
            e.preventDefault();
            if(!this.isGameRunning){
                this.startGame();
            }else{
                this.jump();
            }
        })

        document.addEventListener('touchend', (e)=>{
            e.preventDefault();

        }, {passive: false});

        window.addEventListener('blur', ()=>{
            if(this.isGameRunning){
                this.pauseGame();
            }
        })

        window.addEventListener('focus', ()=>{
            if(this.isGameRunning){
                this.pauseGame();
            }
        })
    }

    startGame(){
        this.isGameRunning = true;
        this.score = 0;
        this.gameSpeed = 4;
        this.difficultyLevel = 1;
        this.obstacles = [];
        this.obstacleTimer = 0;
        this.gameOverElement.style.display = 'none';
        this.dino.classList.add('running');
        this.dino.classList.remove('jumping');

        document.querySelectorAll('.cactus').forEach(cactus=> cactus.remove());

        document.querySelectorAll('.paused').forEach(el =>{
         el.classList.remove('paused');
        });

        this.gameloop= setInterval(()=>this.update(), 20);
        if(navigator.vibrate){
            navigator.vibrate(50);
        }
    }
    jump(){
        if(!this.isJumping && this.isGameRunning){
            this.isJumping = true;
            this.dino.classList.add('jumping');
            if(navigator.vibrate){
                navigator.vibrate(50);
            }
        }
    }
}