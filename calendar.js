let calendar = document.querySelector('#calendar');
let body = calendar.querySelector('.body');
let prev = calendar.querySelector('.prev');
let next = calendar.querySelector('.next');
let yearInput = calendar.querySelector('.year-input');
let monthName = calendar.querySelector('.month-name');

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

draw(body, year, month);
updateMonthName(month);
highlightCurrentDay();

function draw(body, year, month) {
    let arr = range(getLastDay(year, month));

    let firstWeekDay = getFirstWeekDay(year, month);
    let lastWeekDay = getLastWeekDay(year, month);

    let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
    createTable(body, nums);
}

function createTable(parent, arr) {
  parent.textContent = '';
  let cells = [];

  for (let sub of arr) {
      let tr = document.createElement('tr');

      for (let num of sub) {
          let td = document.createElement('td');
          td.textContent = num;
          tr.appendChild(td);

          cells.push(td);
      }

      parent.appendChild(tr);
  }

  return cells;
}

function normalize(arr, left, right) {
    for (let i = 0; i < left; i++) {
        arr.unshift('');
    }
    for (var i = 0; i < right; i++) {
        arr.push('');
    }

    return arr;
}

function getFirstWeekDay(year, month) {
    let date = new Date(year, month, 1);
    let num = date.getDay();

    if (num == 0) {
        return 6;
    } else {
        return num - 1;
    }
}

function getLastWeekDay(year, month) {
    let date = new Date(year, month + 1, 0);
    let num = date.getDay();

    if (num == 0) {
        return 6;
    } else {
        return num - 1;
    }
}

function getLastDay(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
}

function range(count) {
    let arr = [];

    for (let i = 1; i <= count; i++) {
        arr.push(i);
    }

    return arr;
}

function chunk(arr, n) {
    let result = [];
    let count = Math.ceil(arr.length / n);

    for (let i = 0; i < count; i++) {
        let elems = arr.splice(0, n);
        result.push(elems);
    }

    return result;
}

function getNextYear(year, month) {
    if (month === 11) {
        return year + 1;
    } else {
        return year;
    }
}

function getNextMonth(month) {
    if (month === 11) {
        return 0;
    } else {
        return month + 1;
    }
}

function getPrevYear(year, month) {
    if (month === 0) {
        return year - 1;
    } else {
        return year;
    }
}

function getPrevMonth(month) {
    if (month === 0) {
        return 11;
    } else {
        return month - 1;
    }
}

function highlightCurrentDay() {
  let today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();
  let currentDay = today.getDate();

  if (year === currentYear && month === currentMonth) {
      let cells = body.querySelectorAll('td');
      for (let cell of cells) {
          if (cell.textContent === String(currentDay)) {
              cell.classList.add('current-day');
              break;
          }
      }
  }
}

next.addEventListener('click', function () {
    month = getNextMonth(month);
    year = getNextYear(year, month);
    draw(body, year, month);
    updateMonthName(month);
});

prev.addEventListener('click', function () {
    month = getPrevMonth(month);
    year = getPrevYear(year, month);
    draw(body, year, month);
    updateMonthName(month);
});

yearInput.addEventListener('input', function () {
    year = parseInt(yearInput.value);
    draw(body, year, month);
});

function updateMonthName(month) {
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    monthName.textContent = monthNames[month];
}

   function createPopup(text, duration) {
    var popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = text;
    document.body.appendChild(popup);
    
    setTimeout(function() {
        document.body.removeChild(popup);
    }, duration);
}

window.onload = function() {
    createPopup("Планируйте свой месяц", 5000); 
    createPopup("Александр Юрьевич ТОП", 3000); 
};