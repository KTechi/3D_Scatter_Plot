// ================================================== [50]
//     Definition

'use strict'

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
const aln = 200 // Axis Length
const axisX = new Edge(new Vertex(-aln, 0, 0), new Vertex(aln, 0, 0))
const axisY = new Edge(new Vertex(0, -aln, 0), new Vertex(0, aln, 0))
const axisZ = new Edge(new Vertex(0, 0, -aln), new Vertex(0, 0, aln))
const zero = new Vector(0, 0, 0)
const vertices = []
const edges = []
let scale = 1.0
let VW = window.innerWidth
let VH = window.innerHeight
let imageData = context.getImageData(0, 0, VW, VH)
let data = imageData.data
let pitch = 0
let roll  = 0
let yaw   = 0
let q = new Quaternion(0, new Vector(1, 0, 0))
let rmode = 1
let color = new Color()
let gScale = 1
let vScale = 1
let eScale = 1
let grid = true

// ================================================== [50]
//     END
// ================================================== [50]