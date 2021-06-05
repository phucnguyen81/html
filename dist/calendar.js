function defaultContext() {
  return {
    months: [
      "January", "February", "March", "April", "May", 
      "June", "July", "August", "September", "October", 
      "November", "December"
    ],
    days: [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ]
  };
}

function renderCalendar(context, view) {
  var days = context.days;
  var months = context.months;

  var today = view.today;
  var date = view.date

  var dayLabel = view.dayLabel;
  var dayth = view.dayth;
  var firstDay = view.firstDay;
  var monthLabel = view.monthLabel;

  document.getElementById("cal-year").firstChild.nodeValue = date.year;
  document.getElementById("cal-day-label").firstChild.nodeValue = dayLabel;
  document.getElementById("cal-month-label").firstChild.nodeValue = monthLabel + " " + dayth;
  months.forEach((_, idx) => {
    var monthEle = document.getElementById("cal-month-" + idx);
    if (idx == date.month) {
      monthEle.classList.add("selected");
    }
    else {
      monthEle.classList.remove("selected");
    }
  });

  // Show a 35-days span that covers the current month
  var daysEle = document.getElementById("cal-days");
  for (var idx = 0, day = firstDay; idx < 35; idx++) {
    var dayEle = document.getElementById("cal-day-" + idx);
    dayEle.firstChild.nodeValue = day.getDate();
    dayEle.setAttribute("title", days[day.getDay()]);
    dayEle.setAttribute("data-value", day.toDateString());

    if (
      day.getFullYear() == today.year &&
      day.getMonth() == today.month &&
      day.getDate() == today.date
    ) {
      // set today style
      dayEle.classList.add("today");
    }
    else {
      // clear style if the day is not today
      dayEle.classList.remove("today");
    }

    if (
      day.getFullYear() == date.year &&
      day.getMonth() == date.month &&
      day.getDate() == date.date
    ) {
      // set selected style
      dayEle.classList.add("selected");
    }
    else {
      // clear selected style
      dayEle.classList.remove("selected");
    }

    day.setDate(day.getDate() + 1);  // next day
  }
}

function asDate(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay(),  // day-of-week: 0=Sun, 1=Mon, 2=Tue,...
    date: date.getDate()  // day-of-month: 1,2,3,4,...
  };
}

function resetCalendar(context, today, date) {
  date = date || today;
  var months = context.months;
  var days = context.days;

  // first day of the month
  var firstDay = new Date(date.year, date.month, 1);
  // find the last Monday before the first day of the month
  // TODO don't hard-code Monday here
  while (days[firstDay.getDay()] != "Monday") {
    /// go back one day
    firstDay.setDate(firstDay.getDate() - 1);
  }

  var monthLabel = months[date.month];
  var dayLabel = days[date.day];
  var dayth = (
    (date.date % 10) == 1 ? "1st" : (
      (date.date % 10) == 2 ? "2nd" : (
        (date.date % 10) == 3 ? "3rd" : (
          "" + date.date + "th"
        )
      )
    )
  );

  renderCalendar(context, {
    today: today,
    date: date,
    dayLabel: dayLabel,
    dayth: dayth,
    firstDay: firstDay,
    monthLabel: monthLabel,
  });
}

function selectDay(day) {
  var dayEle = document.getElementById("cal-day-" + day);
  var dateString = dayEle.getAttribute("data-value");
  var date = new Date(dateString);
  resetCalendar(defaultContext(), asDate(new Date()), asDate(date));
}

function selectMonth(month) {
  var today = new Date();
  var date = new Date(today.getFullYear(), month);
  resetCalendar(defaultContext(), asDate(today), asDate(date));
}

function initCalendar() {
  resetCalendar(defaultContext(), asDate(new Date()));
}

