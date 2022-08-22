import React, { useState } from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Doughnut } from "react-chartjs-2";
import BarChart from "./components/BarChart";
import { UserData } from "./app/data";
import { Chart, registerables } from "chart.js";
import Papa from "papaparse";
import { ListFormat } from "typescript";
import { FileHandle } from "fs/promises";
import { CSVLink } from "react-csv";

const allowedExtensions = ["csv"];

function App() {
  const [fileAdded, setFileAdded] = useState(false);
  const [csvData, setCsvData] = useState<any>();

  const [keysOfObj, setKeysOfObj] = useState<any>([]);
  const [dataSaved, setDataSaved] = useState<any>([]);
  const [labels, setLabels] = useState<any>();

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.profits),
        backgroundColor: ["red", "black", "green", "pink"],
      },
    ]
    // ,plugins:{
    //   id: 'custom_canvas_background_color',
    //   beforeDraw: (chart:any, args:any, options:any) => {
    //       const {ctx} = chart;
    //       ctx.save();
    //       ctx.globalCompositeOperation = 'destination-over';
    //       ctx.fillStyle = options.color;
    //       ctx.fillRect(0, 0, chart.width, chart.height);
    //       ctx.restore();
    //   },
    //   defaults: {
    //       color: 'lightGreen'
    //   }
    // }
  }
  );

  async function getCsvFile(ev: any) {
    const newFile = ev.target.files[0];

    Papa.parse(newFile, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        const list: any = results.data;
        let newData = [];

        const labelsNeeded = "First name";
        await setLabels(labelsNeeded);

        for (let i = 0; i < list.length; i++) {
          if (i === 0) {
            Object.keys(list[i]).map((obj) => {
              keysOfObj.push(obj);
              setKeysOfObj(keysOfObj);
            });
          }

          newData.push(list[i]);
        }

        setDataSaved(newData);
        setFileAdded(true);
      },
    });
  }

  return (
    <div className="App">
      {fileAdded ? (
        <BarChart dataSaved={dataSaved} labels={labels} keysOfObj={keysOfObj} />
      ) : null}

      {fileAdded ? null : (
        <input type="file" name="csvFile" accept=".csv" onChange={getCsvFile} />
      )}
      {/* <input type="file" name="csvFile" accept=".csv" onChange={getCsvFile} /> */}
    </div>
  );
}

export default App;
