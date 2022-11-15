const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')

const board = document.querySelector('#board')
const colors = ['#FF99FF', '#CC33FF', '#CC33FF', '#FF00CC']

let time = 0
let score = 0

startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandom()
    }
})

function startGame() {
    setInterval(decTime, 1000)
    createRandom()
    setTime(time)
}

function decTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
    timeEl.parentNode.classList.add('hide')
}

function createRandom() {
    const circle = document.createElement('div')
    const size = getRandomNum(10, 60)
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNum(0, width - size)
    const y = getRandomNum(0, height - size)
    const color = getColor()

    circle.classList.add('circle')
    circle.style.backgroundColor = color
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 20px ${color}`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`

    board.append(circle)
}

function getColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
