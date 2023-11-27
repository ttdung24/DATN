const createDateRange = (startDate, endDate) => {
  const dateRange = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange;
};

const fillMissingDates = (dateRange, salesStatistics) => {
  const finalStatistics = [];
  let currentIndex = 0;

  for (let currentDate of dateRange) {
    let existingData = salesStatistics[currentIndex];
    if (
      existingData &&
      currentDate.getDate() === existingData._id.getDate() &&
      currentDate.getMonth() === existingData._id.getMonth() &&
      currentDate.getFullYear() === existingData._id.getFullYear()
    ) {
      finalStatistics.push(existingData);
      currentIndex++;
    } else {
      finalStatistics.push({
        _id: currentDate,
        totalQuantity: 0,
        totalSales: 0,
      });
    }
  }

  return finalStatistics;
};

module.exports = { createDateRange, fillMissingDates };
