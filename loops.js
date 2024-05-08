// scripts.js

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below

const createArray = (length) => {
  const result = []
  for (let i = 0; i < length; i++) {
    result.push(i)
  }
  return result
}

const createData = () => {
  const current = new Date()
  current.setDate(1) // Fixed bug: Set the date to the first day of the month
  const startDay = current.getDay() // Get the day of the week for the first day of the month
  const daysInMonth = getDaysInMonth(current)
  const weeks = createArray(5) // Create an array of 5 weeks
  const days = createArray(7) // Create an array of 7 days of the week

  const result = []

  for (const weekIndex of weeks) {
    result.push({
      week: weekIndex + 1,
      days: []
    })
    for (const dayIndex of days) {
      const day = dayIndex - startDay + (weekIndex * 7) + 1
      const isValid = day > 0 && day <= daysInMonth
      result[weekIndex].days.push({
        dayOfWeek: dayIndex + 1,
        value: isValid ? day : '',
      })
    }
  }

  return result
}

const addCell = (existing, classString, value) => {
  const result = /* html */ `
    ${existing}
    <td class="${classString}">
      &nbsp;${value}&nbsp;
    </td>
  `
  return result;
}

const createHtml = (data) => {
  let result = ''
  for (const { week, days } of data) {
    let inner = ""
    inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`)
    for (const { dayOfWeek, value } of days) {
      const isToday = new Date().getDate() === value; // Fixed bug: Compare with value, not the current date
      const isWeekend = dayOfWeek === 1 || dayOfWeek === 7; // Fixed bug: Corrected the day of the week indices
      const isAlternate = week % 2 === 0;
      let classString = 'table__cell'
      if (isToday) classString = `${classString} table__cell_today`;
      if (isWeekend) classString = `${classString} table__cell_weekend`;
      if (isAlternate) classString = `${classString} table__cell_alternate`;
      inner = addCell(inner, classString, value);
    }
    result = `
      ${result}
      <tr>${inner}</tr>
    `
  }
  return result;
}

// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`
const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)
