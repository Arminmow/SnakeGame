$(function (){
    var canvas = $('#canvas')[0]
    var ctx = canvas.getContext('2d');


    var snake = [
        { x:50 , y: 100 , oldX: 0 , oldY: 0},
        { x:50 , y: 90, oldX: 0 , oldY: 0},
        { x:50 , y: 80, oldX: 0 , oldY: 0},
    ];


    var food = {x: 200 , y: 200 , eaten: false}



    var snakeWidth = 10;
    var snakeHeight = 10;
    var score =0;

    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const STOP = 32;

    var keyPressed = DOWN;
    var game;

    game = setInterval(gameLoop , 100);

    function gameLoop (){
        //console.log("looping");
        clearCanvas();
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "darkgrey";
        ctx.textAlign = "center";
        ctx.fillText("Arminmow@gmail.com", canvas.width/2, canvas.height/2);
        drawFood();
        moveSnake();
        drawSnake();
    }


    function drawSnake (){
        $.each(snake , function ( index, value){
            ctx.fillStyle = 'white';
            ctx.fillRect(value.x , value.y , snakeWidth , snakeHeight);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(value.x , value.y , snakeWidth , snakeHeight)
            if (index == 0){
                if (hitSomewhere(value.x , value.y)){

                }
                if (food.x == value.x && food.y == value.y){
                    console.log("yay food!")
                    score ++;
                    food.eaten = true;
                    $('#score').text(score);
                    makeSnakeBigger();
                }
            }
        })
    }

    function drawFood (){
        ctx.fillStyle = 'yellow';

        if (food.eaten == true){
            newFoodPos();
            console.log(food.eaten)
            ctx.fillRect(food.x , food.y , snakeWidth , snakeHeight);

        }
        ctx.fillRect(food.x , food.y , snakeWidth , snakeHeight);
    }

    function newFoodPos (){
        var newX , newY;
        newX = Math.floor(Math.random() * (canvas.width  - 10)) + 10;
        newY = Math.floor(Math.random() * (canvas.height  - 10)) + 10;
        if ( newX % 10 == 0 && newY% 10 == 0 ){
            $.each(snake , function (index , value){
                if (value.x == newX && value.y == newY){
                    newFoodPos()
                }
                else {
                    food.x = newX;
                    food.y = newY;
                    food.eaten = false
                }
            })
            ;
        }
        else {
            newFoodPos();
        }
    }

    function newFoodAllowed (x , y){

    }

    function makeSnakeBigger (){
        snake.push({
            x : snake[snake.length - 1].oldX,
            y: snake[snake.length - 1].oldY,
        })
    }

    function hitSomewhere (x, y){
        $.each(snake , function (index , value){
            if (index != 0 && value.x == x && value.y == y || x < 0 || x > canvas.width || y < 0 || y > canvas.height - 10){
                gameOver();
                return false;
            }

        })
    }

    function gameOver (){
        console.log("game over")
        clearInterval(game);
        alert("Game Over")
    }


    function moveSnake (){
        $.each(snake , function ( index, value){
            snake[index].oldX = value.x;
            snake[index].oldY = value.y;
           if(index == 0){
                if (keyPressed == DOWN){
                    snake[index].y = value.y + 10;
                }
               if (keyPressed == UP){
                   snake[index].y = value.y - 10;
               }
               if (keyPressed == RIGHT){
                   snake[index].x = value.x + 10;
               }
               if (keyPressed == LEFT){
                   snake[index].x = value.x - 10;
               }

           }
           else {
               snake[index].x = snake[index-1].oldX;
               snake[index].y = snake[index-1].oldY;
           }
        })

    }

    function clearCanvas (){
        ctx.clearRect(0, 0, canvas.width , canvas.height);
    }

    $(document).keydown(function (e){
        if ( e.which == LEFT || e.which == UP || e.which == RIGHT || e.which == DOWN /*|| e.which == STOP */){
            keyPressed = checkKeyIsAllowed(e.which);
        }

    })

    function checkKeyIsAllowed (tempKey){
        let key;
        if (tempKey == DOWN){
            if (keyPressed != UP){
                key = tempKey;
            }
            else {
                key = keyPressed;
            }
        }
        else if (tempKey == UP){
            if (keyPressed != DOWN){
                key = tempKey;
            }
            else {
                key = keyPressed;
            }
        }
        else if (tempKey == RIGHT){
            if (keyPressed != LEFT){
                key = tempKey;
            }
            else {
                key = keyPressed;
            }
        }
        else if (tempKey == LEFT){
            if (keyPressed != RIGHT){
                key = tempKey;
            }
            else {
                key = keyPressed;
            }
        }

        return key;


    }



})