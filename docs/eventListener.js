// ================================================== [50]
//     Definition

'use strict'

// ================================================== [50]
//     Animation

// let animate = false
let animation = setInterval(repeat, 50)
// setTimeout(stop, 1 * 1000)
function repeat() {
    yaw += 0.002
    paint()
}
function stop() {
    clearInterval(animation)
    console.log('Animation STOP')
}
function inertia() {

}

// ================================================== [50]
//     Scroll Listener

document.addEventListener('mousewheel', mousewheel, { passive: false })
function mousewheel(event) {
    // Disable scroll event
    event.preventDefault()

    rotate(.4*event.deltaX, .4*event.deltaY)
}

// ================================================== [50]
//     Mouse Event

canvas.addEventListener('dblclick' , dblclick , false)
canvas.addEventListener('mousemove', mousemove, false)
function dblclick(event) {
    if (document.pointerLockElement === null)
        canvas.requestPointerLock()
    else
        document.exitPointerLock()
}
function mousemove(event) {
    if (document.pointerLockElement === canvas) {
        rotate(-event.movementX, -event.movementY)
    }
    
    if (event.buttons === 1) {
        rotate(-event.movementX, -event.movementY)
    }
}

// ================================================== [50]
//     Drop Listener

document.addEventListener('DOMContentLoaded', addDropListener, { passive: false })
function addDropListener(event) {
    const dropArea = document.body

    dropArea.addEventListener('dragover', function (e) {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
    })

    dropArea.addEventListener('drop', function (e) {
        e.preventDefault()
        for (const file of e.dataTransfer.files) {
            if (!file || file.type.indexOf('text/') < 0) continue
            const fr = new FileReader()
            fr.readAsText(file)
            fr.onload = () => { importData(fr.result) }
        }
    })
}

// System -> User
function download(file) {
    const file_extension = file.name.split('.').slice(-1)[0]
    const file_name = file.name + (file_extension === 'txt' ? '' : '.txt' )
    const a = document.createElement('a')
    a.href = URL.createObjectURL(file)
    a.download = file_name
    a.click()
}

// String -> System
function importData(str) {
    if (vertices.length !== 0) {
        if (confirm('Overwrite?'))
            vertices.length = 0
        else
            return
    }

    for (const row of str.split('\n')) {
        const rows = row.split(' ')
        const array = []
        if (rows[0] === '!c') {
            switch (rows[1]) {
                case 'gScale':
                    if (isNaN(rows[2])) break
                    gScale = rows[2]
                    break
                case 'vScale':
                    if (isNaN(rows[2])) break
                    vScale = rows[2]
                    break
                case 'grid':
                    if (rows[2] === 't') grid = true
                    if (rows[2] === 'f') grid = false
                    break
                case 'black':
                    color.bg = '#000'
                    color.v  = '#FFF'
                    break
                case 'dark':
                    color.bg = '#222'
                    color.v  = '#DDD'
                    break
                default:
                    console.log(row)
            }
            continue
        }
        for (const token of rows) {
            if (token === '') continue
            array.push(parseFloat(token) || 0)
        }
        if (array.length < 3) continue
        vertices.push(new Vertex(array[0], array[1], array[2]))
    }
    paint()
}

// ================================================== [50]
//     END
// ================================================== [50]