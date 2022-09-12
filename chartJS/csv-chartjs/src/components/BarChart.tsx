import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
// import CSVDownloader from "./CSVDownloader";
import createChartData from "../features/chartData";
import { Bar, getElementAtEvent, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../style/style.scss";
import { setDatasets } from "react-chartjs-2/dist/utils";
import {filterData} from '../features/filter'
import Table from "./Table";
import Form from "./Form";
import {getColors} from '../features/colors'
Chart.register(...registerables);


interface BarChartProps {
  dataSaved: any;
  keysBLE:Array<any>
  keysOfObj: Array<any>;
  keysWIFI: Array<any>;
  chartdata:Object;
}



const BarChart = (props: BarChartProps) => {

  let { dataSaved, keysOfObj,keysBLE ,keysWIFI,chartdata} = props;

  
  // console.log(keysOfObj);
  
dataSaved.length = 50;


// console.log(dataSaved);

  let [CSVdata, setCSVdata] = useState(dataSaved);
  let [dataSetData,setdataSetsData] = useState("rssi_0")
  let [Label, setChosenLabel] = useState();
  let [dataWifi, setDataWifi] = useState<any>([]);
  let [dataBLE , setDataBLE] = useState<any>([]); 
  let [backgroundcolor, setBackGroundColor] = useState<any>([]);
  let [chartClicked, setChartClicked] = useState(false);
  let [years, setYears] = useState<any>({});
  let [choseYears, setChoseYears] = useState(false);
  let [chartData, setChartData] = useState<any>();
  let [filteredData, setfilteredData] =useState<any>([]);
  const chartRef: any = useRef(null);

  
  
  
  const [userData, setUserData] = useState<any>(chartdata);
  

  // set colors by values
  useEffect(() => {
    (async () => {
      getColors(dataSaved).then((result) => {
        const colors = result.backGroundColor;
        colors.map((color:any) => {
         backgroundcolor.push(color) 
        })
         
         setBackGroundColor(colors)
       })
       
        
      //  setUserData
      //  console.log(result);
      //  const rssi = result.BLEData.rssi_0 * -1;
      //  const sec:any = "seconds"
      //  const newData = await createChartData(result.BLEData,sec,rssi)
      //  setUserData(newData);
       
    })();
  
    
  }, []);


       

  // get chart data for table

  const getChart = async (ev: any) => {
    // console.log(ev);
    const chosenChart = getElementAtEvent(chartRef.current, ev);
    const index = chosenChart[0].index;
    console.log(chosenChart);
    await getChartData(index);
    setChartClicked(true);
  };

  

  async function getChartData(index: any) {
    
    let chartData;
    if(choseYears){
     chartData=filteredData[index]
    }else{
       chartData = CSVdata[index];
    }
    setChartData(chartData);
    // console.log(chartData);
  }



  function handleDownload(CSVdata: any) {
    console.log(userData.datasets[0].data);
    console.log(userData.labels);
   

    const dataTemp = userData.labels.map((year: any, i: number) => {
      return { mam: userData.datasets[0].data[i], Year: year };
    });

    console.log(dataTemp);

    const templist = dataTemp.map((obj: any, i: number) => {
      return {
        Year: obj.Year,
        MAM: obj.mam,
      };
    });

    let csv = Papa.unparse(templist);

    const blob = new Blob([csv]);

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);

    a.download = "CSVExportFile.csv";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handleDownloadToImg() {
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = chartRef.current.toBase64Image("image/png", 1);
    link.click();
    console.log(link);
  }

  return (
    <>
      <div className="chart" id="chartImg">
        <Bar
          style={{ width: 500, height: 350 }}
          ref={chartRef}
          onClick={getChart}
          data={choseYears?years:userData}
          options={{
            maintainAspectRatio: false,
            scales: { x: { beginAtZero: true }, y: { beginAtZero: true } },
          }}
        />
      
      </div>
      
      {/* <Form
        userData={userData}
        setYears={setYears}
        dataSaved={dataSaved}
        setChoseYears={setChoseYears}
        setfilteredData={setfilteredData}
      /> */}
      <Table
        chartClicked={chartClicked}
        chartData={chartData}
        keysOfObj={keysOfObj}
      />

      {/* <div className="btns">
        {keysOfObj.map((title, i) => {
          return (
            <button className="btns-btn" key={i} id={title} onClick={setLabel}>
              {title}
            </button>
          );
        })}*/}

      {/* </div>  */}
      {/* <CSVLink data={dataSaved}>Export CSV</CSVLink>; */}
      <button onClick={(CSVdata) => handleDownload(CSVdata)}>
        Download To CSV
      </button>
      <button onClick={handleDownloadToImg}>Download To Image</button>
    </>
  );
};

export default BarChart;
