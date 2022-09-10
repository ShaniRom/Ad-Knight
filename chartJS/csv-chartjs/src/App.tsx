import React, { useState ,useEffect} from "react";
import "./App.css";
import event_mapping from './features/event_mapping.json'
import { Doughnut } from "react-chartjs-2";
import BarChart from "./components/BarChart";
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
  const [keysWIFI , setKeysWIFI] = useState<any>([])
  const [keysBLE , setKeysBLE ] = useState<any>([])

  
//   grossaryList = {
//     'bread': 1,
//     'apple': 6,
//     'milk': 1,
//     'orange': 3,
//     'broccoli': 2
//    }
// return Object.entries(grossaryList).sort((a,b) => b[1]-a[1])
// //=> 
// [['apple', 6],['orange', 3],['broccoli', 2],['bread',1],['milk', 1]]


  function handleFilter(){
    const tempWifi:any = []
    const tempBLE:any = []
    const wifi = event_mapping["WIFI"]["0.8.5"]
    const ble = event_mapping.BLE["0.8.5"]
    const sortedWIFI = Object.entries(wifi).sort((a,b) => a[1]-b[1])
    const sortedBLE = Object.entries(ble).sort((a,b) => a[1]-b[1])

    sortedWIFI.map((obj) => {
      tempWifi.push(obj[0]);
    });
    sortedBLE.map((obj) => {
      tempBLE.push(obj[0]);
    });

    setKeysWIFI(tempWifi)
    setKeysBLE(tempBLE)
  }

  
 
  async function getCsvFile(ev: any) {

    const newFile = ev.target.files[0];
    console.log();
    
        
    Papa.parse(newFile, {
      header: false,
      skipEmptyLines: true,
      complete: async function (results) {
        const list: any = results.data;
        
        let newData = [];

        for (let i = 0; i < list.length; i++) {
          if (i === 0) {
            Object.keys(list[i]).map((obj) => {
              keysOfObj.push(obj);
              setKeysOfObj(keysOfObj);
            });
          }
          
          
          newData.push(list[i]);
        }
        
        
         
        await handleFilter()  
        setDataSaved(newData);
        
        setFileAdded(true);
      },
    });
  }

  return (
    <div className="App">
      {fileAdded ? (
        <BarChart dataSaved={dataSaved} keysWIFI={keysWIFI} keysBLE={keysBLE} keysOfObj={keysOfObj} />
      ) : null}

      {fileAdded ? null : (
        <input type="file" name="csvFile" accept=".csv" onChange={getCsvFile} />
      )}
      {/* <input type="file" name="csvFile" accept=".csv" onChange={getCsvFile} /> */}
    </div>
  );
}

export default App;
