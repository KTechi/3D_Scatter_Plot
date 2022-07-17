// ================================================== [50]
//     Main

'use strict'

function paint() {
    context.clearRect(0, 0, VW, VH)
    imageData = context.getImageData(0, 0, VW, VH)
    data = imageData.data

    // Quaternion
    if (rmode === 1) {
        const q_p = new Quaternion(pitch, new Vector(1, 0, 0))
        const q_r = new Quaternion(roll , new Vector(0, 1, 0))
        const q_y = new Quaternion(yaw  , new Vector(0, 0, 1))
        q = qMultiply(qMultiply(q_r, q_p), q_y)
    }

    // Pixel
    if (color.bg !== 'none') {
        context.fillStyle = 'rgb('+color.bg.r+','+color.bg.g+','+color.bg.b+', 1)'
        context.rect(0, 0, VW, VH)
        context.fill()
    }

    // Axis
    context.lineWidth = 2 * eScale
    context.strokeStyle = 'rgb(255, 0, 0, 1)'
    context.fillStyle   = 'rgb(255, 0, 0, 1)'
    paintEdgeR(axisX, q)
    paintVertexR(axisX.v, q)
    context.strokeStyle = 'rgb(0, 255, 0, 1)'
    context.fillStyle   = 'rgb(0, 255, 0, 1)'
    paintEdgeR(axisY, q)
    paintVertexR(axisY.v, q)
    context.strokeStyle = 'rgb(0, 127, 255, 1)'
    context.fillStyle   = 'rgb(0, 127, 255, 1)'
    paintEdgeR(axisZ, q)
    paintVertexR(axisZ.v, q)

    context.fillStyle = 'rgba(' + color.v.r + ', ' + color.v.g + ', ' + color.v.b + ', 1)'
    for (const v of vertices) paintVertexR(v, q)

    // Grid (Frame)
    context.strokeStyle = 'rgb(0, 255, 255, 1)'
    if (grid)
    for (let x = -aln; x < aln+9; x += aln*2)
    for (let y = -aln; y < aln+9; y += aln*2) {
        let u = new Vertex(x, y, -aln)
        let v = new Vertex(x, y,  aln)
        paintEdgeR(new Edge(u, v), q)
        u = new Vertex(x, -aln, y)
        v = new Vertex(x,  aln, y)
        paintEdgeR(new Edge(u, v), q)
        u = new Vertex(-aln, x, y)
        v = new Vertex( aln, x, y)
        paintEdgeR(new Edge(u, v), q)
    }
}
function paintVertex(v) {
    context.beginPath()
    context.arc(VW/2 + gScale*v.x, VH/2 - gScale*v.z, vScale*3, 0, 2*Math.PI, true)
    context.fill()
}
function paintVertexR(v, q) {
    paintVertex(qRotation(v, q))
}
function paintEdge(e) {
    context.beginPath()
    context.moveTo(VW/2 + gScale*e.u.x, VH/2 - gScale*e.u.z)
    context.lineTo(VW/2 + gScale*e.v.x, VH/2 - gScale*e.v.z)
    context.stroke()
}
function paintEdgeR(e, q) {
    paintEdge(new Edge(qRotation(e.u, q),
                       qRotation(e.v, q)))
}
function rotate(dx, dy) {
    if (rmode === 1) {
        yaw   = (yaw   - 5e-3 * dx) % (2*Math.PI)
        pitch = (pitch - 5e-3 * dy)
        if (pitch < -Math.PI / 2) pitch = -Math.PI / 2
        if ( Math.PI / 2 < pitch) pitch =  Math.PI / 2
    } else {
        const q_p = new Quaternion(-5e-3 * dy, new Vector(1, 0, 0))
        const q_r = new Quaternion(-5e-3 * dx, new Vector(0, 0, 1))
        q = qMultiply(qMultiply(q_r, q_p), q)
    }
    paint()
}

// ================================================== [50]
//     Window

window.onload = load
window.onresize = resize
function load() {
    document.body.append(canvas)
    resize()
    console.log('Ready')
}
function resize() {
    VW = parseInt(scale * canvas.clientWidth)
    VH = parseInt(scale * canvas.clientHeight)
    canvas.width  = VW
    canvas.height = VH
    paint()
}
function isMobile() {
    const regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    return window.navigator.userAgent.search(regexp) !== -1
}

// ================================================== [50]
//     END
// ================================================== [50]