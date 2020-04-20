$(document).ready(function () {

    class Ball {
        constructor() {
            this.randomNumber = this.createSizeBall();
        }

        createBall() {
            let ball = "<div class = 'ball'></div>";
            $(document.body).append(ball);
            let styleBall = $(".ball");
            this.createStyleBall(styleBall);
        }

        createStyleBall(styleBall) {
            styleBall.css({
                "width": this.randomNumber,
                "height": this.randomNumber,
                "left": this.createPositionBallForWidth(),
                "top": this.createPositionBallForHeight(),
                "background-color": `rgb(
                 ${this.createSizeBall()},
                 ${this.createSizeBall()}, 
                 ${this.createSizeBall()})`,
            });
            styleBall.add("class", ".ball");
        }

        createSizeBall() {
            return Math.floor(Math.random() * 255);
        }

        createPositionBallForWidth() {
            let getWidthWindow = window.innerWidth - 255;
            return Math.floor(Math.random() * getWidthWindow);
        }

        createPositionBallForHeight() {
            let getHeightWindow = window.innerHeight - 255;
            return Math.floor(Math.random() * getHeightWindow);
        }

    }

    let ball = new Ball();
    ball.createBall();
    console.log(window.innerHeight);
});

