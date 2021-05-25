const connect_four = Object.create(null);

connect_four.new_board = function (){
    const board = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];
    return board;
};

connect_four.red_move = function(col) {
    return function (board) {
        board = place_mark(checkWhichRow(col,board.length),col,"R");
        return board;
    }

};
connect_four.yellow_move = function(col) {
    return function (board) {
        board = place_mark(checkWhichRow(col,board.length),col,"Y");
        return board;
    }

};

const place_mark = function(row,col,sym){
    let temp_board = board.slice();
    temp_board[row][col] = sym;
    return temp_board;
}

const checkWhichRow = function(col,size){
    let i = size;
    while (i > 0){
        if(board[i-1][col] === 0){
            return i-1;
        }else{
            i -= 1;
        }
    }
}

const check_for_red = function (board){
    let arrayRed = [];
    let new_board = [];
    return new_board
}
const letter_stripper = function (row,leto){
    const strip_row = row.filter(word => word !== leto);
    return strip_row;
};

const checkwho = function (board){
    let count_red = 0;
    let i = 0;
    let j = 0;
    let count_yellow = 0;
    while (i < board.length){
        while(j<board[0].length){
            if(board[i][j] === "R"){
                count_red += 1;
                j += 1;
            }if (board[i][j] ==="Y") {
                count_yellow += 1;
                j += 1;
            }
        }
        i += 1;
    }
    if (count_red === count_yellow){
        return "Red";
    }else{
        return "Yellow";
    }


}


const status = function (board){
    let nex_player = checkwho(board);


}


debugger;