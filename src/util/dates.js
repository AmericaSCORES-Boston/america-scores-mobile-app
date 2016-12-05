import numbers from './numbers';

const Dates = {

    // Get a new date object for today.
    getDateToday() {
        return new Date();
    },

    // Retrieves the first ten characters of a sql date string. (YYYY-MM-DD)
    getDateStringFromSql(sqlDateString) {
        return sqlDateString.substring(0, 10);
    },

    // Get a date string for today formatted as YYYY-MM-DD, the format the database expects.
    getTodayDateString() {
        const today = this.getDateToday();
        return this.formatDateString(this.getMonth(today), this.getDay(today), this.getFullYear(today), '-');
    },

    // Get the month of the given date. Add 1 because JS 0 indexes months. (0 - 11)
    getMonth(date) {
        return this.formatDayMonth(date.getUTCMonth() + 1);
    },

    // Get the day of the given date. (1 - 31)
    getDay(date) {
        return this.formatDayMonth(date.getUTCDate());
    },

    // Get the full year of the given date.  Full years are four digits long instead of two.
    getFullYear(date) {
        return date.getUTCFullYear();
    },

    // If the given value is less than 10, prepend a 0.
    // Format for MM or DD.
    formatDayMonth(val) {
        return (numbers.isInt(val) && numbers.toInt(val) < 10) ? '0' + val : val;
    },

    // Format a date string as YYYY MM DD with a given joining string.
    formatDateString(month, day, year, joiner) {
        return [year, month, day].join(joiner);
    }
};

export default Dates;