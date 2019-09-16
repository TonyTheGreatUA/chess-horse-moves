const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let count = 8;
let mouse = {};
let offsetX = 2;
let offsetY = 1;
let rules = [
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1]
];


function update(time) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    let tileWidth = canvas.width / count;
    let tileHeight = canvas.height / count;
    let mouseTileX = Math.floor(mouse.x / tileWidth);
    let mouseTileY = Math.floor(mouse.y / tileHeight);
    
    for (let x = 0; x < count; x++) {
        for (let y = 0; y < count; y++) {
            context.fillStyle = (y % 2 === 0) ? (x % 2 === 0 ? '#eee' : '#111') : (x % 2 === 0 ? '#111' : '#eee');
            if (mouseTileX === x && mouseTileY === y) {
                context.fillStyle = '#228b22';
            }
            context.fillRect(
                x * tileWidth,
                y * tileHeight,
                tileWidth,
                tileHeight
            );            
        }
    }

    for (let index = 0; index < 4; index++) {
        let positions = [offsetX, offsetY];
        for (let number = 0; number < 2; number++) {
            let x = mouseTileX + positions[0] * rules[index][0];
            let y = mouseTileY + positions[1] * rules[index][1];
            
            context.fillStyle = '#ffbe00';
            context.fillRect(
                x * tileWidth,
                y * tileWidth,
                tileWidth,
                tileWidth
            );
            
            positions.reverse();
        }
    }
    
    requestAnimationFrame(update);
}

function init() {
    canvas.addEventListener('click', event => {
        mouse = {
            x: event.layerX,
            y: event.layerY
        };
    });
    
    [canvas.width, canvas.height] = [640, 640];
    
    requestAnimationFrame(update);
}

window.addEventListener('load', init);