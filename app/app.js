const fs = require('fs')

const months = [{
  name: 'April',
  file: 'month-1-April'
},{
  name: 'May',
  file: 'month-2-May'
},{
  name: 'June',
  file: 'month-3-June'
},{
  name: 'July',
  file: 'month-4-July'
},{
  name: 'August',
  file: 'month-5-August'
},{
  name: 'September',
  file: 'month-6-September'
},{
  name: 'October',
  file: 'month-7-October'
},{
  name: 'November',
  file: 'month-8-November'
}]


const writeItems = (file, data) => {
  fs.writeFile('data/months/' + file + '.json', JSON.stringify(data), 'utf8', function(err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.")
        return console.log(err);
    }
 
    console.log("JSON file has been saved.")
  })
}

const loadMonthData = (monthName, monthRaw) => {
  const days = []

  while(monthRaw.length >  0) {
    const partial1 = monthRaw.shift()
    const partial2 = monthRaw.shift()
    const partial3 = monthRaw.shift()

    days.push({
      month: monthName,
      date: partial1.Date,
      day: partial1.Time,
      [partial2.Time]: {
        weather: partial1.Weather,
        socials: partial1["Social Stats Opportunities"],
        confidants: `${partial1["Confidants Available"]}\n${partial1["Confidants Available 2"]}`,
        sales: partial1["Stores & Sales"],
        metaverse: partial1["Metaverse"],
        extra: partial1["Extra"],
        recommended: partial1["Recommended Actions"],
      },
      [partial3.Time]: {
        weather: partial3.Weather,
        socials: partial3["Social Stats Opportunities"],
        confidants: `${partial3["Confidants Available"]}\n${partial3["Confidants Available 2"]}`,
        sales: partial3["Stores & Sales"],
        metaverse: partial3["Metaverse"],
        extra: partial3["Extra"],
        recommended: partial3["Recommended Actions"],
      }
    })
  }
  console.log(days)
  return days
}

months.forEach(({name, file}) => {
  fs.readFile('data/json/' + file + '.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const data = JSON.parse(jsonString)
        const monthData = loadMonthData(name, data)
        writeItems(name, monthData)
        // console.log("JSON data is:", data)
    } catch(err) {
        console.log('Error parsing JSON string:', err)
    }
  })
})
