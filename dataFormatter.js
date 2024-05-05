import * as d3 from "d3";

export async function formatData(dataPath) {
  const data = await d3.text(dataPath);
  console.log(data)
  const lines = data.trim().split('\n');
  const headers = lines[0].split(',');
  console.log(lines)

//   const indexChangePct = headers.findIndex(header => header.trim() === '%CHNG');
// const indexCurrent = headers.findIndex(header => header.trim() === 'CURRENT');
// const index1YAgo = headers.findIndex(header => header.trim() === '1Y AGO  02-May-2023');
// // const indexDate = headers.findIndex(header => header.trim() === '');

// console.log('Index of %CHNG:', indexChangePct);
// console.log('Index of CURRENT:', indexCurrent);
// console.log('Index of 1Y AGO:', index1YAgo);
// // console.log('Index of 02-May-2023:', indexDate);

//   // const indexCol = headers.indexOf('INDEX');
//   // const percentChangeCol = headers.indexOf('%CHNG');
//   // const currentCol = headers.indexOf('CURRENT');
//   // const oneYearAgoCol = headers.indexOf('1Y AGO  02-May-2023');

//   // console.log(indexCol)

//   const result = [];

//   for (let i = 1; i < lines.length; i++) {
//     const line = lines[i].split(',');

//     const index = line[indexCol];
//     const percentChange = parseFloat(line[percentChangeCol]);
//     const current = parseFloat(line[currentCol]);
//     const oneYearAgo = parseFloat(line[oneYearAgoCol]);

//     if (!isNaN(percentChange) && !isNaN(current) && !isNaN(oneYearAgo)) {
//       const indexData = {
//         Index: index,
//         Values: [
//           {
//             PercentChange: percentChange,
//             Current: current,
//             OneYearAgo: oneYearAgo,
//           },
//         ],
//       };
//       result.push(indexData);
//     }
//   }
//   console.log(result)

const indexChangePct = headers.findIndex(header => header.trim() === '%CHNG');
const indexChangeIndex = headers.findIndex(header => header.trim() === 'INDEX');
const indexCurrent = headers.findIndex(header => header.trim() === 'CURRENT');
const index1YAgo = headers.findIndex(header => header.trim() === '1Y AGO  02-May-2023');

const x = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].split(',');
  const index = line[0];
  const changePct = line[indexChangePct];
  const current = line[indexCurrent];
  const oneYearAgo = line[index1YAgo];
  const index_Names = line[indexChangeIndex];

  x.push({ index,index_Names, changePct, current, oneYearAgo });
}

console.log(x);

  return x;
}

