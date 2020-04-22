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
            //add classCount do not change the style of all classes
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
        startButton.click(createBall());
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

    function createBall() {
        stopClick = false;
        let countObj = setInterval(() => {
            if (stopClick === true) {
                clearInterval(countObj);
            } else {
                ifClickBallCreateClone();
            }
        }, 2000);
    }

    function ifClickBallCreateClone() {
        let ball = new Ball();
        ball.createBall();
        getElement(ball);
    }

    function getElement(ball) {
        $(".contentBall").children().click(function () {
            if (isIfNotClickButton()) {
                createClone(this);
                createAnimate(this, ball);
            }
        });
    }

    function createClone(id) {
        let cloneBall = id.cloneNode(true);
        $(".contentBall").append(cloneBall);
    }

    function createAnimate(id, ball) {
        $(id).animate({
            "left": `${ball.getRandomNumber(window.innerWidth - ball.size)}px`,
            "top": `${ball.getRandomNumber(window.innerHeight - ball.size)}px`,
        });
    }

    function isIfNotClickButton(id) {
        let button = $(id).attr("class");
        return button !== "contentButton";
    }
});

