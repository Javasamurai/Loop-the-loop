/*taking a string as an input for 5*6 matrix
 for example
 Taking 5 possible values,ie.
 up=u,down=d,left=l,right=r,nothing=n
 SQUARE[0]=[r,d]
 [n,d]
 */


// var current_pos = [0, 0];
// var weights=[[n,n,n,2,0],[0,2,3,0]]........;
// var expected_total_weight = 11
// var found_first = false;
// var first_pos;
// var total_weight = 0;

var last_value = 'n';
var row_current = col_current = 0;
var first_row;
var first_col;
var square_sum;
var current_weight = [];
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
        total_weight = total_weight + weights[i][j];
    }
    return total_weight;
}
function check_square(character, weigths) {
    var weight = weigths[row_current][col_current];
    var valid = true;
    //Increase the weights
    current_weight = current_weight++;
    //Check if the current weight is less than assigned weight and weight is not nothing
    if (current_weight <= weight && weight != 'n') {
        valid = true;
    }
    else {
        valid = false;
    }
}
return valid;
}
function choose_movement(characterm, weigths) {
    if (cell_value == 'l') {
        column_current--;
        check_valid_new(squares, weights);
    }
    else if (cell_value == 'r') {
        column_current++;
        check_valid_new(squares, weights);

    } else if (cell_value == 'u') {
        row_current--;
        check_valid_new(squares, weights);

    } else if (cell_value == 'd') {
        row_current++;
        check_valid_new(squares, weights);
    }
    //Check if the movement is valid according to the weight
    return (check_square(character, weigths));
}

function check_valid_new(squares, weights) {
    // var valid = false;
    var cell_value = squares[row_current, column_current]
    if (row_current == first_row && column_current == first_col) {
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
            if (cell_value == 'n') {
                if (row_current < 6) {
                    row_current++;
                    check_valid_new(squares, weights);
                }
                else if (column_current < 6) {
                    column_current++;
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
                    first_pos = current_pos[row_current][column_current];
                    first_row = row_current;
                    first_col = column_current;
                }
                /////////////////////////////
                if (!choose_movement(cell_value)) {
                    return false;
                }
            }
            else {
                if (cell_value.split("")[0] == last_value) {
                    if (!choose_movement(cell_value.split("")[1])) {
                        return false;
                    }
                }
                else if (cell_value.split("")[1] == last_value) {
                    if (!choose_movement(cell_value.split("")[0])) {
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
