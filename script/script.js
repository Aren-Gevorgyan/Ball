$(document).ready(function () {
    let stopClick = false;
    let classCount = 1;

    class Ball {
        constructor() {
            this.size = 255;
            this.getWidthWindow = window.innerWidth - this.size;
            this.getHeightWindow = window.innerHeight - this.size;
            this.randomNumber = this.getRandomNumber(this.size);
            this.color = this.createColor();
        }

        createDiv() {
            //add classCount do not change the style of all classes
            this.ball = document.createElement("div");
            this.ball.classList.add(`ball${classCount}`);
            document.getElementsByClassName("contentBall")[0].appendChild(this.ball);
            let styleBall = $(`.ball${classCount}`);
            styleBall.addClass("ball");
            this.createStyleBall(styleBall);
            classCount++;
        }

        setClickListener(fun) {
            this.ball.addEventListener("click", fun);
        }

        createStyleBall(styleBall) {
            styleBall.css({
                "width": this.randomNumber,
                "height": this.randomNumber,
                "left": this.getRandomNumber(this.getWidthWindow),
                "top": this.getRandomNumber(this.getHeightWindow),
                "background-color": this.color,
            });
        }

        createColor() {
            return `rgb(
                 ${this.getRandomNumber(this.size)},
                 ${this.getRandomNumber(this.size)}, 
                 ${this.getRandomNumber(this.size)})`;
        }

        getRandomNumber(num) {
            return Math.floor(Math.random() * num);
        }
    }

    start();
    stop();
    clear();

    function stop() {
        let stopButton = $(".stop");
        stopButton.click(() => {
            stopClick = true;
        });
    }

    function clear() {
        let clearButton = $(".clear");
        clearButton.click(() => {
            stopClick = true;
            $(".contentBall").empty();
        });
    }

    function start() {
        let startButton = $(".start");
        startButton.click(function () {
            stopClick = false;
            let countObj = setInterval(() => {
                if (stopClick === true) {
                    clearInterval(countObj);
                } else {
                    ifClickBallCreateClone();
                }
            }, 2000);
        });
    }

    function ifClickBallCreateClone() {
        let ball = new Ball();
        ball.createDiv();
        catchClick(ball);
    }

    function catchClick(ball) {
        ball.setClickListener(function () {
            ball.createDiv();
            catchClick(ball);
            createAnimate(this, ball);
        });
    }

    function createAnimate(id, ball) {
        $(id).animate({
            "left": `${ball.getRandomNumber(window.innerWidth - ball.size)}px`,
            "top": `${ball.getRandomNumber(window.innerHeight - ball.size)}px`,
        });
    }

});

