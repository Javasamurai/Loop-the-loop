/*taking a string as an input for 5*6 matrix
 for example
 Taking 5 possible values,ie.
 up=u,down=d,left=l,right=r,nothing=n
 SQUARE[0]=[r,d]
 [n,d]
 Input is a 2d array with a 1d array consisting direction in each cell
 */


var current_pos = [0, 0];
var cell_value;
var last_value = 'n';
var row_current = col_current = 0;
var first_row;
var first_col;
var square_sum;
var found_first = false;
var current_weight = [];
var square_row = 0
var square_col = 0

//A sample input weight and solution weights
//Similiar to puzzal taken from below link
//http://apps.hashcube.com/f8loop/static/images/solved.png
var input = [[['r', 'd', 'ud', 'n'], ['d', 'd', 'u', 'r'], ['dr', 'dl', 'lu', 'ur'], ['ld', 'r', 'd', 'l'], ['dr', 'dl', 'ul', 'u']],
    [['d', 'u', 'ur', 'ur'], ['ur', 'ul', 'lr', 'd'], ['lu', 'ru', 'ld', 'rd'], ['l', 'ulS', 'u', 'n'], ['r', 'd', 'u', 'n']],
    [['ur', 'r', 'r', 'ld'], ['d', 'd', 'r', 'u'], ['r', 'd', 'u', 'n'], ['r', 'd', 'u', 'n'], ['r', 'd', 'u', 'n']],
    [['dr', 'dl', 'u', 'n'], ['d', 'd', 'r', 'u'], ['r', 'd', 'u', 'n'], ['r', 'd', 'u', 'n'], ['r', 'd', 'u', 'n']],
    [['r', 'd', 'u', 'n'], ['d', 'd', 'r', 'u'], ['r', 'd', 'u', 'n'], ['r', 'd', 'u', 'n'], ['r', 'd', 'u', 'n']]];
var given_weights = [[3, 'n', 3, 3, 'n'], ['n', 'n', 0, 2, 2], ['n', 'n', 'n', 'n', '2'], ['n', 'n', 1, 'n', '2'], [2, 2, 2, 3, 3],]
// console.log(given_weights);
// var valid = false;
console.log("*********************Starting the validation" +
    "" +
    "******************************")

console.log("Output is:" + check_valid_new(input, given_weights));
// console.log("Input is:" + valid);

// var current_square = 0;

// function move_to_pos(move_pos) {
//     current_pos = move_pos;
//     //if there is a loop
//     if (current_pos == first_pos) {
//         if (total_weight == expected_total_weight) {
//             return true;
//         }
//         else {
//             return false;
//         }
//     }
// }

// function check_square(square, weight_of_square) {
//     var expected_weight = 0;
//     var movement;
//     for (var i = 0; i <= 2; i++) {
//         last_value = square[i];
//         switch (square[i]) {
//             case 'l':
//                 // move_to_pos(current_pos[row_loop + 1][column_loop]);
//                 if (!found_first) {
//                     first_pos = current_pos[row_loop + 1][column_loop];
//                 }
//                 found_first = true;
//                 break;
//             case 'r':
//                 // move_to_pos(current_pos[row_loop][column_loop + 1]);
//                 if (!found_first) {
//                     first_pos = current_pos[row_loop][column_loop + 1];
//                 }
//                 found_first = true;
//                 break;
//             case 'u':
//                 // move_to_pos(current_pos[row_loop - 1][column_loop]);
//                 if (!found_first) {
//                     first_pos = current_pos[row_loop - 1][column_loop + 1];
//                 }
//                 found_first = true;
//                 break;
//             case 'd':
//                 // move_to_pos(current_pos[row_loop][column_loop + 1]);
//                 if (!found_first) {
//                     first_pos = current_pos[row_loop][column_loop + 1];
//                 }
//                 found_first = true;
//                 break;
//             case 'n':
//                 break;
//         }
//     }
// }
function calculate_total_weights(weights) {
    var total_weight = 0;
    for (var i = 0; i < weights.length; i++) {
        total_weight = total_weight + weights[i];
    }
    return total_weight;
}
function check_square(character, weigths) {
    var weight = weigths[row_current][col_current];
    console.log(weight);
    var valid = true;
    //Increase the weights
    current_weight = current_weight++;
    //Check if the current weight is less than assigned weight and weight is not nothing
    if (current_weight <= weight && weight != 'n') {
        valid = true;
        //continue looking for loops
        check_valid_new(input, weigths);
    }
    else {
        valid = false;
    }
    return valid;
}

function choose_movement(character, weigths) {
    //Moving to the right direction
    console.log("Choosing the movement");
    if (cell_value == 'l' && last_value != 'r') {
        col_current--;
        // check_valid_new(squares, weights);
    }
    else if (cell_value == 'r' && last_value != 'l') {
        col_current++;
        // check_valid_new(squares, weights);

    } else if (cell_value == 'u' && last_value != 'd') {
        row_current--;
        // check_valid_new(squares, weights);

    } else if (cell_value == 'd' && last_value != 'u') {
        row_current++;
        // check_valid_new(squares, weights);
    }
    //Check if the movement is valid according to the weight
    return (check_square(character, weigths));
}

function check_valid_new(squares, weights) {

    var cell_value = squares[row_current, col_current][square_row][square_col];
    console.log(cell_value);
    if (row_current == first_row && col_current == first_col) {
        console.log("It is a loop");
        /*The fortunate loop condition
         ///////////////////////////////
         ///////////////////////////////
         ///////////////////////////////
         */
        if (current_weight == calculate_total_weights(weights)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        //If there are less 3 interseting points
        if (cell_value.length <= 2) {
            console.log("Cell length is ok!");
            if (cell_value == 'n') {
                if (row_current < 6) {
                    row_current++;
                    check_valid_new(squares, weights);
                }
                else if (col_current < 6) {
                    col_current++;
                    check_valid_new(squares, weights);
                }
                else {
                    /*Dead end
                     ////////////////
                     ////////////////
                     */
                    return false;
                }
            }
            else if (cell_value == 'l' || cell_value == 'r' || cell_value == 'u' || cell_value == 'd') {
                /////////////////////////////
                if (!found_first) {
                    first_pos = current_pos[row_current][col_current];
                    first_row = row_current;
                    first_col = col_current;
                }
                /////////////////////////////
                if (!choose_movement(cell_value, weights)) {
                    return false;
                }
            }
            else {
                if (cell_value.split("")[0] == last_value) {
                    if (!choose_movement(cell_value.split("")[1], weights)) {
                        return false;
                    }
                }
                else if (cell_value.split("")[1] == last_value) {
                    if (!choose_movement(cell_value.split("")[0]), weights) {
                        return false;
                    }
                }
            }
        }
        else {
            //There are more than 2 intersecting points
            return false;
        }
    }
}
