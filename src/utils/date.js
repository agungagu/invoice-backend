const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays, subWeeks, subMonths } = require("date-fns");

const getTodayRange = () => ({
  start: startOfDay(new Date()),
  end: endOfDay(new Date()),
});

const getWeekRange = () => ({
  start: startOfWeek(new Date(), { weekStartsOn: 1 }), // Monday
  end: endOfWeek(new Date(), { weekStartsOn: 1 }),
});

const getMonthRange = () => ({
  start: startOfMonth(new Date()),
  end: endOfMonth(new Date()),
});

const getPreviousDayRange = () => {
  const yesterday = subDays(new Date(), 1);
  return {
    start: startOfDay(yesterday),
    end: endOfDay(yesterday),
  };
};

const getPreviousWeekRange = () => {
  const lastWeek = subWeeks(new Date(), 1);
  return {
    start: startOfWeek(lastWeek, { weekStartsOn: 1 }),
    end: endOfWeek(lastWeek, { weekStartsOn: 1 }),
  };
};

const getPreviousMonthRange = () => {
  const lastMonth = subMonths(new Date(), 1);
  return {
    start: startOfMonth(lastMonth),
    end: endOfMonth(lastMonth),
  };
};

module.exports = {
  getTodayRange,
  getWeekRange,
  getMonthRange,
  getPreviousDayRange,
  getPreviousWeekRange,
  getPreviousMonthRange,
};
