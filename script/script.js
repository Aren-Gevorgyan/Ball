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

        createBall() {
            let ball = `<div class = ball${classCount}></div>`;
            $(".contentBall").append(ball);
            console.log(classCount);
            let styleBall = $(`.ball${classCount}`);
            this.createStyleBall(styleBall);
            classCount++;
        }

        createStyleBall(styleBall) {
            styleBall.css({
                "width": this.randomNumber,
                "height": this.randomNumber,
                "left": this.getRandomNumber(this.getWidthWindow),
                "top": this.getRandomNumber(this.getHeightWindow),
                "border-radius": "50%",
                "position": "absolute",
                "z-index": -10,
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

    function start() {
        let startButton = $(".start");
        startButton.click(createCloneBall);
    }

    function stop() {
        let stopButton = $(".stop");
        stopButton.click(() => {
            stopClick = true;
        });
    }

    function clear() {
        let clearButton = $(".clear");
        clearButton.click(() => {
            $(".contentBall").empty();
        });
    }

    function createCloneBall() {
        setClickFirstBall();
        stopClick = false;
        let countObj = setInterval(() => {
            if (stopClick === true) {
                clearInterval(countObj);
            } else {
                ifClickBallCreateClone();
            }
        }, 2500);
    }

    function ifClickBallCreateClone() {
        let ball = new Ball();
        ball.createBall();
        createClone(ball);
    }

    function createClone(ball) {
        $(".contentBall").children().click(function () {
            if (isIfNotClickButton()) {
                ball.createBall();
                createAnimate(this, ball);
            }
        });
    }

    function createAnimate(id, ball) {
        $(id).animate({
            "left": `${ball.getRandomNumber(window.innerWidth - ball.size)}px`,
            "top": `${ball.getRandomNumber(window.innerHeight - ball.size)}px`,
        });
    }

    function setClickFirstBall() {
        let ball = new Ball();
        ball.createBall();
        $(".contentBall").children().eq(0).click(function () {
            ball.createBall();
            createAnimate($(this), ball);
        })
    }

    function isIfNotClickButton(id) {
        let button = $(id).attr("class");
        return button !== "contentButton";
    }
});

