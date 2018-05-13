const fs = require('fs');

module.exports.processSchedule = function(sheet) {
  const data = structureData(sheet);
  const json = JSON.stringify(data, null, '  ');
  console.info(json);
  fs.writeFileSync('./schedule.json', json);
  // Write with .txt filename, because wintersmith doesn't support serving
  // files with the "magic" .json extension.
  fs.writeFileSync('./contents/schedule-json.txt', json);
}

const columns = [
  'backtrack:startTime', 'backtrack:duration', 'backtrack:number',
  '-', 'backtrack:who', 'backtrack:what', '-',
  'sidetrack:startTime', 'sidetrack:duration', 'sidetrack:number',
  '-', 'sidetrack:who', 'sidetrack:what', '-'
];

function structureData(lessCrappyData) {
  let day = 0;
  const mergedRecords = {};

  for (let row = 2, nRows = lessCrappyData.length; row < nRows; row++) {
    if (row === 29) {
      day++;
    }

    if (!lessCrappyData[row]) { continue; }

    const tracks = {};
    for (let col = 0, nCols = lessCrappyData[row].length; col < nCols; col++) {
      if (!columns[col] || columns[col] === '-') { continue; }
      const [track, field] = columns[col].split(':');


      if (!tracks[track]) {
        tracks[track] = {
          day: day + 1,
          date: day == 0 ? '2018-06-02' : '2018-06-03',
        };
      }
      tracks[track][field] = lessCrappyData[row][col];
    }

    Object.keys(tracks).forEach(track => {
      if (!tracks[track].startTime || !tracks[track].who) {
        return;
      }
      if (!mergedRecords[track]) {
        mergedRecords[track] = [];
      }
      if (!mergedRecords[track][day]) {
        mergedRecords[track][day] = [];
      }
      mergedRecords[track][day].push(tracks[track]);
    });
  }

  return mergedRecords;
}
