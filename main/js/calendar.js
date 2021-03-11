$(document).ready(function () {
    $("#calendar").calendar();
});

(function ($) {
    let selectedDate = new Date();

    $.fn.calendar = function (opts) {
        let options = $.extend({
            color: '#308B22',
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            onSelect: function (event) {
            }
        }, $.fn.calendar.defaults, opts);

        return this.each(function () {
            let currentYear, currentMonth, currentDay, currentCalendar;

            initCalendar($(this), options);
        });
    };

    function initCalendar(wrapper, options) {
        let color = options.color;

        wrapper.addClass('calendar').empty();

        let header = $('<header>').appendTo(wrapper);
        header.addClass('calendar-header');

        let buttonLeft = $('<span>').appendTo(header);
        buttonLeft.addClass('button').addClass('left');
        buttonLeft.html(' &lang; ');
        buttonLeft.bind('click', function () {
            currentCalendar = $(this).parents('.calendar');
            selectMonth(false, options);
            let curMonth = options.months.indexOf($($(".header-label")[0]).text().split(" ")[0]);
            let curYear = parseInt($($(".header-label")[0]).text().split(" ")[1]);
            if (curMonth === selectedDate.getMonth() && curYear === selectedDate.getFullYear()) {
                let dayNumber = selectedDate.getDay();
                if (dayNumber === 0) {
                    $($(".calendar table th")[6]).addClass("selected");
                } else {
                    $($(".calendar table th")[dayNumber - 1]).addClass("selected");
                }
            } else {
                $(".calendar table th").removeClass("selected");
            }
        });

        let headerLabel = $('<span>').appendTo(header);
        headerLabel.addClass('header-label')
        headerLabel.html(' Month Year ');
        headerLabel.bind('click', function () {
            currentCalendar = $(this).parents('.calendar');
            selectMonth(null, options, new Date().getMonth(), new Date().getFullYear());

            currentDay = new Date().getDate();
            triggerSelectEvent(options.onSelect);
        });

        let buttonRight = $('<span>').appendTo(header);
        buttonRight.addClass('button').addClass('right');
        buttonRight.html(' &rang; ');
        buttonRight.bind('click', function () {
            currentCalendar = $(this).parents('.calendar');
            selectMonth(true, options);
            let curMonth = options.months.indexOf($($(".header-label")[0]).text().split(" ")[0]);
            let curYear = parseInt($($(".header-label")[0]).text().split(" ")[1]);
            if (curMonth === selectedDate.getMonth() && curYear === selectedDate.getFullYear()) {
                let dayNumber = selectedDate.getDay();
                if (dayNumber === 0) {
                    $($(".calendar table th")[6]).addClass("selected");
                } else {
                    $($(".calendar table th")[dayNumber - 1]).addClass("selected");
                }
            } else {
                $(".calendar table th").removeClass("selected");
            }
        });

        let dayNames = $('<table>').appendTo(wrapper);
        dayNames.append('<thead><th>' + options.days.join('</th><th>') + '</th></thead>');
        let dayNumber = new Date().getDay();
        if (dayNumber === 0) {
            $($(".calendar table th")[6]).addClass("selected");
        } else {
            $($(".calendar table th")[dayNumber - 1]).addClass("selected");
        }

        let calendarFrame = $('<div>').appendTo(wrapper);
        calendarFrame.addClass('calendar-frame');

        headerLabel.click();
    }

    function selectMonth(next, options, month, year) {
        let tmp = currentCalendar.find('.header-label').text().trim().split(' '), tmpYear = parseInt(tmp[1], 10);

        if (month === 0) {
            currentMonth = month;
        } else {
            currentMonth = month || ((next) ? ((tmp[0] === options.months[options.months.length - 1]) ? 0 : options.months.indexOf(tmp[0]) + 1) : ((tmp[0] === options.months[0]) ? 11 : options.months.indexOf(tmp[0]) - 1));
        }

        currentYear = year || ((next && currentMonth === 0) ? tmpYear + 1 : (!next && currentMonth === 11) ? tmpYear - 1 : tmpYear);

        let calendar = createCalendar(currentMonth, currentYear, options), frame = calendar.frame();

        currentCalendar.find('.calendar-frame').empty().append(frame);
        currentCalendar.find('.header-label').html(calendar.label);

        frame.on('click', 'td', function () {
            if (!$(this).hasClass("disabled")) {
                $('td').removeClass('selected');
                $(this).addClass('selected');
                $('thead th').removeClass("selected");
                let curMonth = options.months.indexOf($($(".header-label")[0]).text().split(" ")[0]);
                let curYear = parseInt($($(".header-label")[0]).text().split(" ")[1]);
                let curDate = new Date();
                curDate.setFullYear(curYear);
                curDate.setMonth(curMonth);
                curDate.setDate(parseInt($(this).text()));
                if (curDate.getDay() === 0) {
                    $($(".calendar table th")[6]).addClass("selected");
                } else {
                    $($(".calendar table th")[curDate.getDay() - 1]).addClass("selected");
                }
                selectedDate = curDate;

                currentDay = $(this).text();
                triggerSelectEvent(options.onSelect);
            }
        });
    }

    function createCalendar(month, year, options) {
        let currentDay = 1, daysLeft = true,
            startDay = new Date(year, month, currentDay).getDay() - 1,
            lastDays = [31, (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            calendar = [];

        let i = 0;
        while (daysLeft) {
            calendar[i] = [];

            for (let d = 0; d < 7; d++) {
                if (i == 0) {
                    if (d == startDay) {
                        calendar[i][d] = currentDay++;
                        startDay++;
                    } else if (startDay === -1) {
                        calendar[i][6] = currentDay++;
                        startDay++;
                    }
                } else if (currentDay <= lastDays[month]) {
                    calendar[i][d] = currentDay++;
                } else {
                    calendar[i][d] = '';
                    daysLeft = false;
                }

                if (currentDay > lastDays[month]) {
                    daysLeft = false;
                }
            }

            i++;
        }

        let frame = $('<table>').addClass('current');
        let frameBody = $('<tbody>').appendTo(frame);

        for (let j = 0; j < calendar.length; j++) {
            let frameRow = $('<tr>').appendTo(frameBody);

            $.each(calendar[j], function (index, item) {
                let frameItem = $('<td>').appendTo(frameRow);
                if (typeof item !== "undefined") {
                    frameItem.html("<span class='date'>" + item + "</span>");
                }
            });
        }

        $('td:empty', frame).addClass('disabled');
        if (currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear()) {
            $('td', frame).filter(function () {
                return $(this).text() === selectedDate.getDate().toString();
            }).addClass('selected');
        }

        return {
            frame: function () {
                return frame.clone()
            }, label: options.months[month] + ' <span class="current-year">' + year + '</span>'
        };
    }

    function triggerSelectEvent(event) {
        let date = new Date(currentYear, currentMonth, currentDay);

        let label = [];
        label[0] = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
        label[1] = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        label[2] = (date.getFullYear());

        if (event != undefined) {
            event({date: date, label: label.join('.')});
        }
    }

    function createContrast(color) {
        if (color.length < 5) {
            color += color.slice(1);
        }

        return (color.replace('#', '0x')) > (0xffffff) ? '#222' : '#fff';
    }

    function createAccent(color, percent) {
        let num = parseInt(color.slice(1), 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

}(jQuery));