import { useState, useEffect } from "react";
import {Bar} from 'react-chartjs-2';
import {Chart,registerables} from 'chart.js';
import '../style/style.scss';
import { setDatasets } from 'react-chartjs-2/dist/utils';
import { CSVLink } from 'react-csv';
Chart.register(...registerables)


interface BarChartProps {
  dataSaved: any;
  labels: any;
  keysOfObj: Array<any>;
}

//----- checks if label is date and turns the timestamp into actual date and time

//   let timestamp = 1607110465663;
//   let date = new Date(timestamp);

//   console.log(
//     "Date: " +
//       date.getDate() +
//       "/" +
//       (date.getMonth() + 1) +
//       "/" +
//       date.getFullYear() +
//       " " +
//       date.getHours() +
//       ":" +
//       date.getMinutes() +
//       ":" +
//       date.getSeconds()
//   );
// console.log(date)

const BarChart = (props: BarChartProps) => {
  let { dataSaved, labels, keysOfObj } = props;

  let [chosenlabel, setChosenLabel] = useState("");

  console.log(dataSaved);

  console.log(keysOfObj);

  const [userData, setUserData] = useState({
    labels: dataSaved.map((data: any) => `${data[`${keysOfObj[0]}`]}`),

    datasets: [
      {
        label: "Users Gained",

        data: dataSaved.map((data: any) => `${data[`${keysOfObj[3]}`]}`),
        backgroundColor: ["red", "black", "green", "pink", "yellow"],
      },
    ],
  });
  useEffect(() => {}, [setLabel]);
  function setLabel(ev: any) {
    const label = ev.target.id;
    setChosenLabel(label);
    console.log(label);
    const tempData = userData;

    // if (chosenlabel ===' "Date"') {

    //   // const timeStamp = tempData.labels.chosenlabel;
    //  let date = new Date(chosenlabel);
    //   console.log(
    //     "Date: " +
    //       date.getDate() +
    //       "/" +
    //       (date.getMonth() + 1) +
    //       "/" +
    //       date.getFullYear() +
    //       " " +
    //       date.getHours() +
    //       ":" +
    //       date.getMinutes() +
    //       ":" +
    //       date.getSeconds()
    //   );
    //   tempData.labels = dataSaved.map((data: any) => `${data[`${label}`]}`);
    // }else{
    tempData.labels = dataSaved.map((data: any) => `${data[`${label}`]}`);

    setUserData(tempData);
  }

  return (
    <>
      <div className="chart">
        <Bar
          style={{ width: 500, height: 500 }}
          data={userData}
          options={{
            maintainAspectRatio: false,
            scales: { x: { beginAtZero: true }, y: { beginAtZero: true } },
          }}
        />
     
      </div>

      <div className="btns">
        {keysOfObj.map((title, i) => {
          return (
            <button className="btns-btn" key={i} id={title} onClick={setLabel}>
              {title}
            </button>
          );
        })}
         <CSVLink data={dataSaved}>Export CSV</CSVLink>;
      </div>
    </>
  );
};

export default BarChart;
