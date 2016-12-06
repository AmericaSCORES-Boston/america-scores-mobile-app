const Numbers = {

    // Is a given string an integer?
    isInt(val) {
        return !isNaN(parseInt(val, 10));
    },

    // Convert a string into an integer if possible.  Otherwise, return the value entered.
    toInt(val) {
        const num = parseInt(val, 10);
        return (isNaN(num)) ? val : num;
    }
};

export default Numbers;