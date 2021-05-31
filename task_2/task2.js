const map = [
    ['#','#','#','#','#','#','#','#','#'],
    ['#','+','+','+','#','+','+','+','#'],
    ['#','+','#','+','#','+','#','+','#'],
    ['+','+','#','+','0','+','#','+','#'],
    ['#','#','#','+','#','#','#','#','#'],
    ['#','#','+','+','#','#','#','#','#'],
    ['#','#','+','#','#','#','#','#','#'],
    ['#','#','#','#','#','#','#','#','#'],
];

let rowEndIndex = null;
let columnEndIndex = null;
map.forEach((row, index) => {
    row.forEach((col, colIndex) => {
        if ((index === 0 || index === map.length - 1 || colIndex === 0 || colIndex === row.length - 1) && col === '+') {
            if (!columnEndIndex) {
                rowEndIndex = index;
                columnEndIndex = colIndex;
            }
        }
    });
});

const rowStartIndex = map.findIndex((row) => {
    const columnIndex = row.findIndex((col) => col === '0');
    return columnIndex !== -1;
});

const columnStartIndex = map[rowStartIndex].findIndex((col) => col === '0');

map[rowEndIndex][columnEndIndex] = 9;

const result = [];
function findpath(x,y){

    if (x < 0 || x > (map[0].length -1) || y < 0 || y > (map.length - 1)) return false;
    if (map[y][x] === '#') return false;

    if (x === columnEndIndex && y === rowEndIndex){
        return true;
    }

    if(map[y][x] == 9 || map[y][x] == 8)
        return false;

    map[y][x] = 9;
    result.push({ x, y });
    if(findpath(x + 1, y)) 
        return true;    
    if(findpath(x, y + 1)) 
        return true;    
    if(findpath(x, y - 1))
        return true;
    if(findpath(x - 1, y)) 
        return true;                    

    map[y][x] = 8;
    result.splice(result.findIndex((i) => i.x === x && i.y === y), 1);
    return false;
};

findpath(columnStartIndex, rowStartIndex);
result.push({ x: columnEndIndex, y: rowEndIndex });

const res = result.reduce((acc, i, index) => {
    if (result[index - 1]) {
        if (result[index - 1].y === i.y && result[index - 1].x - i.x === 1) {
            acc.push('left');
        }
        if (result[index - 1].x === i.x && result[index - 1].y - i.y === 1) {
            acc.push('top');
        }
        if (result[index - 1].y === i.y && i.x - result[index - 1].x === 1) {
            acc.push('right');
        }
        if (result[index - 1].x === i.x && i.y - result[index - 1].y === 1) {
            acc.push('bottom');
        }
    }
    return acc;
}, []);
console.log(res, 'res');
