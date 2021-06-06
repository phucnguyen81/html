var model = {
  months: [
    "January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October",
    "November", "December"
  ],
  days: [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ],
  today: {},
  date: {}
};

function getEleById(eleId) {
  return document.getElementById(eleId);
}

function setNodeText(node, text) {
  node.firstChild.nodeValue = text;
}

function asDate(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay(),  // day-of-week: 0=Sun, 1=Mon, 2=Tue,...
    date: date.getDate(),  // day-of-month: 1,2,3,4,...
    dateString: date.toDateString()
  };
}

function isEqualDate(date1, date2) {
  return (
    date1.year == date2.year
    && date1.month == date2.month
    && date1.date == date2.date
  );
}

function getMonthLabel(date) {
  return model.months[date.month];
}

function getDayLabel(date) {
  return model.days[date.day];
}

function addDate(date, n) {
  var result = new Date(date.year, date.month, date.date + n);
  return asDate(result);
}

function lastMonday(year, month) {
  var date = asDate(new Date(year, month, 1));
  while (date.day != 1) {
    date = addDate(date, -1);
  }
  return date;
}

function renderCalendar() {
  var days = model.days;
  var months = model.months;
  var today = model.today;
  var date = model.date

  var dayLabel = getDayLabel(date);
  var monthLabel = getMonthLabel(date);
  var firstDay = lastMonday(date.year, date.month)

  setNodeText(getEleById("cal-year"), date.year);
  setNodeText(getEleById("cal-day-label"), dayLabel);
  setNodeText(getEleById("cal-month-label"), monthLabel + " " + date.date);
  months.forEach((_, idx) => {
    var monthEle = getEleById("cal-month-" + idx);
    if (idx == date.month) {
      monthEle.classList.add("selected");
    }
    else {
      monthEle.classList.remove("selected");
    }
  });

  // Show a 35-days span that covers the current month
  var daysEle = getEleById("cal-days");
  for (var idx = 0, day = firstDay; idx < 35; idx++) {
    var dayEle = getEleById("cal-day-" + idx);
    dayEle.firstChild.nodeValue = day.date;
    dayEle.setAttribute("title", days[day.day]);
    dayEle.setAttribute("data-value", day.dateString);

    if (isEqualDate(day, today)) {
      dayEle.classList.add("today");
    }
    else {
      dayEle.classList.remove("today");
    }

    if (isEqualDate(day, date)) {
      dayEle.classList.add("selected");
    }
    else {
      dayEle.classList.remove("selected");
    }

    day = addDate(day, 1);
  }
}

function selectDay(day) {
  var dayEle = getEleById("cal-day-" + day);
  var dateString = dayEle.getAttribute("data-value");
  var date = new Date(dateString);
  model.date = asDate(date);
  renderCalendar();
}

function selectMonth(month) {
  var year = model.date.year;
  var date = new Date(year, month);
  model.date = asDate(date);
  renderCalendar();
}

function initCalendar() {
  var today = new Date();
  model.today = asDate(today);
  model.date = asDate(today);
  renderCalendar();
}
