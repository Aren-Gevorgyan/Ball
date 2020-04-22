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
            $(document.body).append(ball);
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
        createColor(){
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

    function createCloneBall() {
        new Ball().createBall();
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
        $("body").children().click(() => {
            ball.createBall();
            $(this).animate({left: "50px", top: "50px"});
        })
    }
});

