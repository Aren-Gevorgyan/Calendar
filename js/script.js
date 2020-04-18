$(document).ready(function () {
    let getYearItem = $(".year");
    let getMonthItem = $(".month");
    let getDayItem = $(".day");
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let presentMonth = month + 1;

    funCalendar(presentMonth, year);

    function funCalendar(month, year) {
        let setMonth = new Map();
        addMonthInMap(setMonth);
        getYearItem.text(year);
        getMonthItem.text(setMonth.get(month));
        createDay(year, month);
    }

    function createDay(year, month) {
        let date = new Date();
        let previousMonth = new Date(year, month - 1, 0).getDate();
        let startWeekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        let countDay = new Date(year, month, 0).getDate();
        startWeekDay = ifSun(startWeekDay);
        let countPreviousMonthDay = startWeekDay - 1;
        let previousDay = previousMonth - countPreviousMonthDay;
        addDay(countPreviousMonthDay, previousDay, countDay, startWeekDay);
        funMarkPenultimateRed();
        markDay(countPreviousMonthDay);
    }

    function addDay(countPreviousMonthDay, previousDay, countDay, startWeekDay) {
        for (let i = 1; i <= 42; i++) {
            if (countPreviousMonthDay >= i) {
                previousDay++;
                funStartWeekDay(previousDay);
            } else if ((countDay + startWeekDay) > i) {
                funPresentMonthDay(i, countPreviousMonthDay);
            } else {
                funNextMontDay(i, countDay, countPreviousMonthDay);
            }
        }
    }

    function ifSun(startWeekDay) {
        if (startWeekDay === 0) {
            return startWeekDay = 7;
        } else {
            return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        }
    }

    function funStartWeekDay(previousDay) {
        getDayItem.append(`<p class="previousMontDay">${previousDay}</p>`);
        $(".previousMontDay").css({
            "font-size": "12px",
            "opacity": "0.5"
        });
    }

    function funPresentMonthDay(i, countPreviousMonthDay) {
        getDayItem.append(`<p id = ${i}>${i - countPreviousMonthDay}</p>`);
        $(`#${i}`).css("font-size", "12px");
        sun(i);
    }

    function funNextMontDay(i, countDay, countPreviousMonthDay) {
        getDayItem.append(`<p class="nextMontDay">${i - (countDay + countPreviousMonthDay)}</p>`);
        $(".nextMontDay").css({"opacity": "0.5", "font-size": "12px"});
    }

    function sun(i) {
        let sunDay = i % 7;
        if (sunDay === 0) {
            $(`#${i}`).addClass("sun");
        }
    }

    function markDay(countPreviousMonthDay) {
        let getPresentDay = date.getDate();
        let setPresentDay = $(".day > p").filter(`#${getPresentDay + countPreviousMonthDay}`);
        setPresentDay.css({"background-color": "#ACD1EA", "border": "1px solid #0066ff"});
    }

    function funMarkPenultimateRed() {
        let markRed = $(".day > p");
        let getPenultimateSun = markRed.length - 8;
        markRed.last().addClass("sun");
        for (let i = markRed.length; i > 0; i--) {
            if (i === getPenultimateSun) {
                markRed.eq(i).addClass("sun");
            }
        }
    }

    function addMonthInMap(setMonth) {
        setMonth.set(1, "January");
        setMonth.set(2, "February");
        setMonth.set(3, "March");
        setMonth.set(4, "April");
        setMonth.set(5, "May");
        setMonth.set(6, "June");
        setMonth.set(7, "July");
        setMonth.set(8, "August");
        setMonth.set(9, "September");
        setMonth.set(10, "October");
        setMonth.set(11, "November");
        setMonth.set(12, "December");
    }

});