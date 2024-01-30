const fs = require('fs');
const csv = require('csv-parser');

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

const writeItems = ({file, data}) => {
  fs.writeFile('data/json/' + file + '.json', JSON.stringify(data), 'utf8', function(err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.")
        return console.log(err);
    }
 
    console.log("JSON file has been saved.")
  })
}

const saveItems = async ({name, file}) => {
  const month = []
  await fs.createReadStream('data/csv/' + file + '.csv')
  .pipe(csv())
  .on('data', (row) => {
    month.push(row)
  })
  .on('end', () => {
    console.log(month)
    writeItems({file, data: month})
    return month
  });
  return month
}


months.forEach(async ({name, file}) => {
  await saveItems({name, file})
})
