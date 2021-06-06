document.addEventListener('DOMContentLoaded', function(event) {
    // Map digits to their class names
    var digit_names = {
        '0': 'zero', '1': 'one', '2': 'two', '3': 'three',
        '4': 'four', '5': 'five', '6': 'six', '7': 'seven',
        '8': 'eight', '9': 'nine'
    };

    var clock = document.querySelector('#clock');
    var digitsEle = clock.querySelector('.digits');
    var ampm = clock.querySelector('.ampm');
    var weekdays = clock.querySelectorAll('.weekdays span');
    var button = document.querySelector('a.button');

    // Map hours, minutes, and seconds to elements
    var digits = [
        digitsEle.querySelector('.h1'),
        digitsEle.querySelector('.h2'),
        digitsEle.querySelector('.m1'),
        digitsEle.querySelector('.m2'),
        digitsEle.querySelector('.s1'),
        digitsEle.querySelector('.s2')
    ];

    // Output the current time as a string `hhmmss`
    function format_time(date, ampm) {
        return [
            ampm ? date.getHours() % 12 : date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        ].map(nn => ('' + nn).padStart(2, '0')).join('');
    }

    function isAM(date) {
        return date.getHours() < 12;
    }

    function update_time() {
        var now = new Date();
        var nowstr = format_time(now, true);

        // Set the am/pm text:
        ampm.textContent = isAM(now) ? 'AM' : 'PM';

        // Apply corresponding class for each digit
        // (0 => apply class 'zero', 1 => apply class 'one',...)
        digits.forEach((digit, idx) => {
            Object.values(digit_names).forEach(name => {
                digit.classList.remove(name);
            });
            digit.classList.add(digit_names[nowstr[idx]])
        });

        // Mark the active day of the week.
        // Since by default the week starts with Sunday,
        // need to shift the day to make the week starts with Monday.
        var dow = (now.getDay() + 6) % 7;
        weekdays.forEach((weekday, idx) => {
            if (idx == dow) {
                weekday.classList.add('active');
            }
            else {
                weekday.classList.remove('active');
            }
        });
    }

    function switch_theme() {
        clock.classList.toggle('light');
        clock.classList.toggle('dark');
    }

    function main() {
        // Switch the theme
        button.addEventListener('click', switch_theme);

        // Update the clock periodically
        update_time();
        setInterval(update_time, 1000);
    }

    main();
});
