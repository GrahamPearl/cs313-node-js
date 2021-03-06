/*
closest(arr, closestTo) {
        var closest = Math.max.apply(null, arr); //Get the highest number in arr in case it match nothing.

        for (var i = 0; i < arr.length; i++) { //Loop the array
            if (arr[i] >= closestTo && arr[i] < closest) closest = arr[i]; //Check if it's higher than your number, but lower than your closest value
        }

        return closest; // return the value
    };
*/

class Logic {
    
    calculateRate(mail_type, weight, zone) {
        return 100;
    }
}

module.exports = Logic;