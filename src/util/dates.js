import numbers from './numbers';
const currentYear = parseInt(new Date().getUTCFullYear(), 10);

const Dates = {
    CURRENT_YEAR: currentYear,
    YEAR_MIN: currentYear - 30,
    DAY_MIN: 1,
    DAY_MAX: 31,
    MONTH_MIN: 1,
    MONTH_MAX: 12,

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
        return (numbers.isInt(val) && (numbers.toInt(val) < 10)) ? '0' + val : val.toString();
    },

    // Format a date string as YYYY MM DD with a given joining string.
    formatDateString(month, day, year, joiner) {
        return [year, month, day].join(joiner);
    },
    
    isDateValid(day, month, year) {
        return this.isDayValid(day) && this.isMonthValid(month) && this.isYearValid(year);
    },

    // Is the month entered valid?
    isMonthValid(month) {
        // const month = this.state.month.trim();
        const monthVal = numbers.toInt(month.trim()),
            monthString = this.formatDayMonth(month);
        
        return (month.length > 0) &&
            numbers.isInt(monthVal) &&
            (month >= this.MONTH_MIN) &&
            (month <= this.MONTH_MAX);
    },

    // Is the day entered valid?  Checks that the day is an integer between 1 and 31.
    isDayValid(day) {
        const dayVal = numbers.toInt(day.trim()),
            dayString = this.formatDayMonth(dayVal);

        return (dayString.length > 0) &&
            (numbers.isInt(dayVal)) &&
            (dayVal >= this.DAY_MIN) &&
            (dayVal <= this.DAY_MAX);
    },

    // Is the year entered valid?  Checks that the year is an integer between the current year (2016) and 30 years
    // before (1986).
    isYearValid(year) {
        const yearVal = numbers.toInt(year.trim());

        return (yearVal.toString().length === 4) &&
            (numbers.isInt(yearVal)) &&
            (yearVal >= this.YEAR_MIN) &&
            (yearVal < this.CURRENT_YEAR);
    }
};

export default Dates;