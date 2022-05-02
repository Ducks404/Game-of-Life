let w = 20
let cols
let rows
let grid, temp, original
let draw_mode
let running = false

function make2DArray(x, y) {
    let arr = []
    for (let i = 0; i < x; i ++) {
        arr.push([])
        for (let j = 0; j < y; j++) {
            arr[i].push(0)
        }
    }
    return arr
}

function setup() {
    createCanvas(600,600).parent('canvas')
    cols = width/w
    rows = height/w
    grid = make2DArray(cols, rows)
    temp = make2DArray(cols, rows)
    original = make2DArray(cols, rows)
    draw_mode = "Pencil"
    // grid[0][0] = 1
    // console.log(cols, rows)
    // console.log(grid)
}

function draw() {
    background(255)
    stroke(200)
    strokeWeight(1)
    // Set all of the squares
    if (mouseIsPressed && !running) {
        let x = floor(mouseX/w)
        let y = floor(mouseY/w)
        let m
        if (draw_mode == "Pencil") {
            m = 1
        } else {
            m = 0
        }
        grid[x][y] = m
        original[x][y] = m
    }
    // Set the color
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (grid[i][j] == 1) {
                fill(0)
            } else {
                fill(255)
            }
            square(i*w, j*w, w)
        }
    }
    // Update values of the squares
    if (running) {
        document.getElementById("status").innerHTML = "Running... |" + draw_mode
        // Updates temp
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                temp[i][j] = grid[i][j] 
            }
        }
        // Goes through all squares and changes temp
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                let neighbour = checkNeighbours(i, j)
                if (grid[i][j] == 1 && neighbour != 2 && neighbour != 3) {
                    temp[i][j] = 0
                } else if (grid[i][j] == 0 && neighbour == 3) {
                    temp[i][j] = 1
                }
            }
        }
        // Updates grid
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                grid[i][j] = temp[i][j]
            }
        }

    } else {
        document.getElementById("status").innerHTML = "Paused |" + draw_mode
    }
}
// Stops and returns original
function stop() {
    running = false
    for (let i = 0; i < cols; i ++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = original[i][j]
        }
    }
}
// Resets canvas
function clr() {
    running = false
    for (let i = 0; i < cols; i ++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0
            original[i][j] = 0
        }
    }
}
// Switches draw mode
function switchDrawMode() {
    if (draw_mode == "Pencil") {
        draw_mode = "Eraser"
    } else {
        draw_mode = "Pencil"
    }
}
// Returns number of neighbours
function checkNeighbours(col, row) {
    let neighbour = 0
    // Goes through neighbours
    for (let k = -1; k < 2; k++) {
        for (let u = -1; u < 2; u++) {
            if (!(k==0 && u==0)) {
                neighbour += grid[(col+k+cols)%(cols)][(row+u+rows)%(rows)]
            }
        }
    }
    return neighbour
}

