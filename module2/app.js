document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.getElementsByTagName('h1')[0];
    const reslutTable = document.querySelector('.result-table');
    const gridDisplay = document.querySelector('.grid');
    const scoreBlock = document.getElementById('score');
    const buttonInfinity = document.querySelector('.infinity');
    const hh2 = document.querySelector('.on-off');
    const button = document.querySelector('.btn');
    const reslutTableInfinity = document.querySelector('.result-table-infinity');
    const back = document.querySelector('.back');

    let score = 0;
    let isGameInfinity = true
    let sec = 0;
    let min = 0;
    let t;
    let squares = []
    let gameIsOver = false
    let records = []
    let data = []
    let steps = []

    function tick() {
        sec++;
        if (sec >= 60) {
            sec = 0;
            min++;
            if (min >= 60) {
                min = 0;
                hrs++;
            }
        }
    }

    function add() {
        tick();
        h1.textContent = (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
        timer();
    }

    function timer() {
        t = setTimeout(add, 1000);
    }

    function stopTimer() {
        clearTimeout(t);
    }

    function resetTimer() {
        h1.textContent = "00:00";
        t = 0;
        sec = 0;
        min = 0;
        hrs = 0;
    }

    function clearBoard() {
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                squares[i][j].innerHTML = '';
            }
        }
    }

    buttonInfinity.addEventListener('click', function () {
        isGameInfinity = !isGameInfinity
        if (isGameInfinity) {
            hh2.innerHTML = 'Включено'
            clearTimeout(t);
            h1.innerHTML = ''
            clearBoard()
            generate()
            generate()
            color()
        } else {
            hh2.innerHTML = 'Отключено'
            resetTimer()
            timer()
            clearBoard()
            generate()
            generate()
            color()
        }
    });

    if (isGameInfinity == 1) {
        h1.textContent = null
    }

    function createBoard() {
        score = 0
        for (i = 0; i < 5; i++) {
            squares[i] = []
            for (j = 0; j < 5; j++) {
                let square = document.createElement('div')
                square.classList.add('cell')
                square.innerHTML = null
                gridDisplay.appendChild(square)
                squares[i].push(square)
            }
        }
        generate()
        generate()
        color()
    }
    createBoard()

    function generate() {
        for (;;) {
            let randomI = Math.floor(Math.random() * 5)
            let randomJ = Math.floor(Math.random() * 5)
            if ((squares[randomI][randomJ].innerHTML === '') || (squares[randomI][randomJ].innerHTML === undefined) || (squares[randomI][randomJ].innerHTML === 0)) {
                function getRandomInt(max) {
                    return Math.floor(Math.random() * max);
                }
                let rand = getRandomInt(100)
                if (rand > 10) {
                    squares[randomI][randomJ].innerHTML = 2
                    break
                } else {
                    squares[randomI][randomJ].innerHTML = 4
                    break
                }
            }
        }
    }

    function isGameOver() {
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                if ((squares[i][j].innerHTML == 0) || (squares[i][j].innerHTML == '') || (squares[i][j].innerHTML == undefined)) {
                    return false
                }
                if (j < 4) {
                    if (squares[i][j].innerHTML == squares[i][j + 1].innerHTML) {
                        return false;
                    }
                }
                if (i < 4) {
                    if (squares[i][j].innerHTML == squares[i + 1][j].innerHTML) {
                        return false;
                    }
                }
            }
        }
        return true
    }

    function moveRight() {
        if (isGameOver != true) {
            for (i = 0; i < 5; i++) {
                for (j = 4; j >= 0; j--) {
                    let totalOne = squares[i][0].innerHTML
                    let totalTwo = squares[i][1].innerHTML
                    let totalthree = squares[i][2].innerHTML
                    let totalFour = squares[i][3].innerHTML
                    let totalFive = squares[i][4].innerHTML
                    let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalthree), parseInt(totalFour), parseInt(totalFive)]
                    let filteredRow = row.filter(num => num)
                    let missing = 5 - filteredRow.length
                    let zeros = Array(missing).fill('')
                    let newRow = zeros.concat(filteredRow)
                    squares[i][0].innerHTML = newRow[0]
                    squares[i][1].innerHTML = newRow[1]
                    squares[i][2].innerHTML = newRow[2]
                    squares[i][3].innerHTML = newRow[3]
                    squares[i][4].innerHTML = newRow[4]

                    if (j != 0) {
                        if (squares[i][j].innerHTML === squares[i][j - 1].innerHTML) {
                            let combinedTotal = parseInt(squares[i][j].innerHTML) + parseInt(squares[i][j - 1].innerHTML)

                            squares[i][j].innerHTML = combinedTotal
                            squares[i][j - 1].innerHTML = 0
                            if (typeof combinedTotal === 'number' && !isNaN(combinedTotal)) {
                                score = score + combinedTotal
                                scoreBlock.innerHTML = score
                            }
                        }
                    }
                }
            }
        } 
    }

    function moveLeft() {
        if (isGameOver != true) {
            for (i = 0; i < 5; i++) {
                for (j = 0; j < 5; j++) {
                    let totalOne = squares[i][0].innerHTML
                    let totalTwo = squares[i][1].innerHTML
                    let totalthree = squares[i][2].innerHTML
                    let totalFour = squares[i][3].innerHTML
                    let totalFive = squares[i][4].innerHTML
                    let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalthree), parseInt(totalFour), parseInt(totalFive)]
                    let filteredRow = row.filter(num => num)
                    let missing = 5 - filteredRow.length
                    let zeros = Array(missing).fill('')
                    let newRow = filteredRow.concat(zeros)
                    squares[i][0].innerHTML = newRow[0]
                    squares[i][1].innerHTML = newRow[1]
                    squares[i][2].innerHTML = newRow[2]
                    squares[i][3].innerHTML = newRow[3]
                    squares[i][4].innerHTML = newRow[4]

                    if (j != 4) {
                        if (squares[i][j].innerHTML === squares[i][j + 1].innerHTML) {
                            let combinedTotal = parseInt(squares[i][j].innerHTML) + parseInt(squares[i][j + 1].innerHTML)
                            squares[i][j].innerHTML = combinedTotal
                            squares[i][j + 1].innerHTML = 0
                            if (typeof combinedTotal === 'number' && !isNaN(combinedTotal)) {
                                score = score + combinedTotal
                                scoreBlock.innerHTML = score
                            }
                        }
                    }

                }

            }
        } 
    }

    function moveDown() {
        if (isGameOver != true) {
            for (i = 4; i >= 0; i--) {
                for (j = 0; j < 5; j++) {
                    let totalOne = squares[0][j].innerHTML
                    let totalTwo = squares[1][j].innerHTML
                    let totalthree = squares[2][j].innerHTML
                    let totalFour = squares[3][j].innerHTML
                    let totalFive = squares[4][j].innerHTML
                    let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalthree), parseInt(totalFour), parseInt(totalFive)]
                    let filteredColumn = column.filter(num => num)
                    let missing = 5 - filteredColumn.length
                    let zeros = Array(missing).fill('')
                    let newColumn = zeros.concat(filteredColumn)
                    squares[0][j].innerHTML = newColumn[0]
                    squares[1][j].innerHTML = newColumn[1]
                    squares[2][j].innerHTML = newColumn[2]
                    squares[3][j].innerHTML = newColumn[3]
                    squares[4][j].innerHTML = newColumn[4]

                    if (i != 0) {
                        if (squares[i][j].innerHTML === squares[i - 1][j].innerHTML) {
                            let combinedTotal = parseInt(squares[i][j].innerHTML) + parseInt(squares[i - 1][j].innerHTML)
                            squares[i][j].innerHTML = combinedTotal
                            squares[i - 1][j].innerHTML = 0
                            if (typeof combinedTotal === 'number' && !isNaN(combinedTotal)) {
                                score = score + combinedTotal
                                scoreBlock.innerHTML = score
                            }

                        }
                    }
                }
            }
        } 
    }

    function moveUp() {
        if (isGameOver != true) {
            for (i = 0; i < 5; i++) {
                for (j = 0; j < 5; j++) {
                    let totalOne = squares[0][j].innerHTML
                    let totalTwo = squares[1][j].innerHTML
                    let totalthree = squares[2][j].innerHTML
                    let totalFour = squares[3][j].innerHTML
                    let totalFive = squares[4][j].innerHTML
                    let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalthree), parseInt(totalFour), parseInt(totalFive)]
                    let filteredColumn = column.filter(num => num)
                    let missing = 5 - filteredColumn.length
                    let zeros = Array(missing).fill('')
                    let newColumn = filteredColumn.concat(zeros)
                    squares[0][j].innerHTML = newColumn[0]
                    squares[1][j].innerHTML = newColumn[1]
                    squares[2][j].innerHTML = newColumn[2]
                    squares[3][j].innerHTML = newColumn[3]
                    squares[4][j].innerHTML = newColumn[4]

                    if (i != 4) {
                        if (squares[i][j].innerHTML === squares[i + 1][j].innerHTML) {
                            let combinedTotal = parseInt(squares[i][j].innerHTML) + parseInt(squares[i + 1][j].innerHTML)
                            squares[i][j].innerHTML = combinedTotal
                            squares[i + 1][j].innerHTML = 0
                            if (typeof combinedTotal === 'number' && !isNaN(combinedTotal)) {
                                score = score + combinedTotal
                                scoreBlock.innerHTML = score
                            }
                        }
                    }

                }

            }
        } 
    }

    function compareNumeric(a, b) {
        if (a > b) return 1;
        if (a == b) return 0;
        if (a < b) return -1;
    }

    function sortRecords() {
        records.sort(compareNumeric);
        records.reverse()
        reslutTableInfinity.innerHTML = ''
    }

    function endGame() {
        const grid = document.getElementById('end')
        grid.classList.add('end')
        grid.innerHTML = 'Вы проиграли!'
        if (score != 0) {
            stopTimer();
            if (isGameInfinity == true) {
                records.push(score)
                sortRecords()
                score = 0
                records.map(record => {
                    let namess = document.createElement('div')
                    namess.innerHTML = `${record}`
                    reslutTableInfinity.appendChild(namess)
                })
            }
            gameIsOver = true
        }

    }

    function winGame() {
        stopTimer();
        const grid = document.getElementById('end')
        grid.classList.add('end')
        grid.innerHTML = 'Вы выиграли!'
        if (score != 0) {
            let namess = document.createElement('div')
            namess.innerHTML = `${h1.textContent}`
            reslutTable.appendChild(namess)
            score = 0
            gameIsOver = true
        }
    }

    function color() {
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                let asd = squares[i][j]
                asd.classList = `cell`
                asd.classList.add(`n${squares[i][j].innerHTML}`)
            }
        }
    }

    function control(e) {
        if (e.keyCode == 39) {
            keyRight()
        } else if (e.keyCode == 37) {
            keyLeft()
        } else if (e.keyCode == 38) {
            keyUp()
        } else if (e.keyCode == 40) {
            keyDown()
        }
    }
    document.addEventListener('keyup', control)

    back.addEventListener('click', function () {
        let taps = steps[steps.length - 1]
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                squares[i][j].innerHTML = taps[i][j]
            }
        }
        color()
    })

    function dataRemember() {
        for (i = 0; i < 5; i++) {
            data[i] = [];
            for (j = 0; j < 5; j++) {
                data[i][j] = squares[i][j].innerHTML;
            }
        }
    }

    function checkedWin () {
        if (isGameInfinity == false) {
            for (i = 0; i < 5; i++) {
                data[i] = [];
                for (j = 0; j < 5; j++) {
                    data[i][j] = squares[i][j].innerHTML;
                    if (squares[i][j].innerHTML == 2048) {
                        winGame()
                        break
                    }
                }
            }
        }
    }

    function keyRight() {
        if (gameIsOver == false) {
            dataRemember()
            steps.push(data)
            let before = String(data)
            moveRight()
            data = []
            dataRemember()
            let after = String(data)
            let checked = isGameOver()
            if (checked === true) {
                endGame()
            }
            if (before != after) {
                generate()
            }
            color()
            checkedWin()
        } 
    }

    function keyLeft() {
        if (gameIsOver == false) {
            dataRemember()
            steps.push(data)
            let before = String(data)
            moveLeft()
            data = []
            dataRemember()
            let after = String(data)
            let checked = isGameOver()
            if (checked === true) {
                endGame()
            }
            if (before != after) {
                generate()
            }
            color()
            checkedWin()
        }
    }

    function keyDown() {
        if (gameIsOver == false) {
            dataRemember()
            steps.push(data)
            let before = String(data)
            moveDown()
            data = []
            dataRemember()
            let after = String(data)
            let checked = isGameOver()
            if (checked === true) {
                endGame()
            }
            if (before != after) {
                generate()
            }
            color()
            checkedWin()
        }
    }

    function keyUp() {
        if (gameIsOver == false) {
            dataRemember()
            steps.push(data)
            let before = String(data)
            moveUp()
            data = []
            dataRemember()
            let after = String(data)

            let checked = isGameOver()
            if (checked === true) {
                endGame()

            }
            if (before != after) {
                generate()
            }
            color()
            checkedWin()
        }
    }

    let startX, startY, endX, endY; 
    document.addEventListener("touchstart", function (event) { 
        event = event || e || arguments[0];
        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;
    })

    document.addEventListener("touchend", function (event) { 
        event = event || e || arguments[0];
        endX = event.changedTouches[0].pageX;
        endY = event.changedTouches[0].pageY;
        let x = endX - startX;
        let y = endY - startY;
        let absX = Math.abs(x) > Math.abs(y);
        let absY = Math.abs(y) > Math.abs(x);
        if (x > 0 && absX) {
            keyRight();
        } else if (x < 0 && absX) {
            keyLeft();
        } else if (y > 0 && absY) {
            keyDown();
        } else if (y < 0 && absY) {
            keyUp();
        }

    })

    button.addEventListener('click', function () {
        if (isGameInfinity == false) {
            stopTimer()
            resetTimer()
            timer()
        }
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                squares[i][j].innerHTML = '';

            }
        }
        const grid = document.getElementById('end')
        grid.classList.remove('end')
        grid.innerHTML = ''
        score = 0
        scoreBlock.innerHTML = 0
        generate()
        generate()
        color()
        gameIsOver = false
    });



})