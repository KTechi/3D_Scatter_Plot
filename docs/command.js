// ================================================== [50]
//     Key Listener

'use strict'

const input = document.createElement('input')
const log = []
let latest = 'stop'
input.addEventListener('focus', (e) => {
    input.style.opacity = 1
    input.style.backdropFilter = 'blur(10px)'
})
input.addEventListener('blur', (e) => {
    input.style.opacity = .5
    input.style.backdropFilter = 'blur(0px)'
})
input.addEventListener('change', (e) => {})

window.addEventListener('load', init_command)
function init_command() {
    const log_container = document.getElementById('log-container')
    for (let i = 0; i < 10; i++) {
        const div = document.createElement('div')
        div.classList.add('log')
        log_container.append(div)
        log.push(div)
    }
    const form = document.querySelector('form')
    form.addEventListener('submit', submit)
    form.append(input)
    input.style.opacity = .5
}
function submit(event) {
    event.preventDefault()
    if (input.value === '') return

    const len = log.length
    for (let i = 1; i < len; i++)
        log[i-1].innerText = log[i].innerText
    log[len-1].innerText = input.value

    // ========================= //
    latest = input.value
    const token = input.value.split(' ')
    switch (token[0]) {
        case 'clear':
            for (const l of log) l.innerText = ''
            break
        case 'hide':
            if (token[1] === 'log')
                document.getElementById('log-container').style.visibility = 'hidden'
            break
        case 'show':
            if (token[1] === 'log')
                document.getElementById('log-container').style.visibility = 'visible'
            break
        case 'c':
        case 'color':
            if (token[1] === 'bg') {
                if (token[4] === undefined) color.bg = token[2]
                else color.bg = [token[2], token[3], token[4]]
            }
            if (token[1] === 'v') {
                if (token[4] === undefined) color.v = token[2]
                else color.v = [token[2], token[3], token[4]]
            }
            paint()
            break
        case 'black':
            color.bg = '#000'
            color.v  = '#FFF'
            paint()
            break
        case 'dark':
            color.bg = '#222'
            color.v  = '#DDD'
            paint()
            break
        case 'rmode':
            rmode = (rmode + 1) % 2
            paint()
            break
        case 'g':
        case 'grid':
            grid ^= true
            paint()
            break
        case 'reset':
            for (const l of log) l.innerText = ''
            document.getElementById('log-container').style.visibility = 'visible'
            color.bg = '#222'
            color.v  = '#DDD'
            grid = true
            rmode = 1
            pitch = roll = yaw = 0
            vScale = eScale = gScale = 1
            q = new Quaternion(0, new Vector(1, 0, 0))
            stop()
            paint()
            break
        case 's':
        case 'scale':
            if (isNaN(token[1])) {
                if (isNaN(token[2])) break
                if (token[1] === 'v') vScale = Number(token[2])
                if (token[1] === 'e') eScale = Number(token[2])
            } else
                gScale = Number(token[1])
            paint()
            break
        case 'start':
            stop()
            animation = setInterval(repeat, 50)
            break
        case 'stop':
            stop()
            break
        case 'save':
            let str = ''
            for (const v of vertices)
                str += v.x + ' ' + v.y + ' ' + v.z + '\n'
            const file = new File([str], token[1] === undefined ? 'download' : token[1], { type: 'text/plain' })
            download(file)
            break
        default:
            console.log(token)
    }
    // ========================= //

    input.value = ''
}

document.addEventListener('keydown', keydown, false)
function keydown(event) {
    if (event.key === 'Enter') {
        if (document.activeElement !== input) input.focus()
        else if (input.value === '')          input.blur()
        return
    } else if (event.key === 'ArrowDown') {
        if (latest === '') return
        input.value = latest
        input.setSelectionRange(1e10, 1e10)
    }
}

// ================================================== [50]
//     END
// ================================================== [50]