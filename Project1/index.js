const {format, addDays, subDays} = require("date-fns")

const now = new Date();
console.log("Today date is: ", format(now, "yyyy-MM-dd"));

const nextWeek = addDays(now,7);
console.log("Next week date is: ", format(nextWeek, "yyyy-MM-dd"));

const previousWeek = subDays(now,7);
console.log("Previous week date was: ", format(previousWeek, "yyyy-MM-dd"));
