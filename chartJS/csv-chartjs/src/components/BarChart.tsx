import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
// import CSVDownloader from "./CSVDownloader";
import createChartData from "../features/chartData";
import { Line , getElementAtEvent, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../style/style.scss";
import { setDatasets } from "react-chartjs-2/dist/utils";
import {filterData} from '../features/filter'
import Table from "./Table";
import {getColors} from '../features/colors'
import ChangeLabels from "./ChangeLabels";
Chart.register(...registerables);


interface BarChartProps {
  dataSaved: any;
  chartdata:any;
  dataWifi:Array<any>;
  dataBLE:Array<any>;
  
}



const BarChart = (props: BarChartProps) => {

  const { dataSaved,chartdata,dataWifi,dataBLE} = props;

  let [CSVdata, setCSVdata] = useState(dataSaved);  
  let [Label, setChosenLabel] = useState();
  let [backgroundcolor, setBackGroundColor] = useState<any>([]);
  let [chartClicked, setChartClicked] = useState(false);
  let [years, setYears] = useState<any>({});
  let [choseYears, setChoseYears] = useState(false);
  const [wifiBLE,setWifiBLE] = useState(false)
  let [chartData, setChartData] = useState<any>();
  let [filteredData, setfilteredData] =useState<any>([]);
  const chartRef: any = useRef(null);

  const [wifidata, setwifidata] = useState<any>(chartdata.wifiData);
  const [bledata, setbledata] = useState<any>(chartdata.bleData);
  
  // set colors by values
  useEffect(() => {
    (async () => {
      getColors(dataSaved).then((result) => {
        const colors = result;
        
        colors.map((color:any) => {
         backgroundcolor.push(color) 
        })
         
         setBackGroundColor(colors)
       })
       
        
      
       
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
  }

  function handleDownload(CSVdata: any) {
    console.log(wifidata.datasets[0].data);
    console.log(wifidata.labels);
   

    const dataTemp = wifidata.labels.map((year: any, i: number) => {
      return { mam: wifidata.datasets[0].data[i], Year: year };
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

  async function changeBLE(){
    setWifiBLE(!wifiBLE)

  }
 
  return (
    <>
      <div className="chart" id="chartImg">
        <Line 
          style={{ width: 500, height: 500 , opacity:0.8}}
          ref={chartRef}
          onClick={getChart}
          data={wifiBLE?wifidata:bledata}
          options={{
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
              legend: {
                position: 'right' as const,
              },
              title: {
                display: true,
                text: 'Chart.js Line Chart',
              },
            },
          }}
        />
      
      </div>
      {/* change between ble and wifi button */}
      <button name="changeBLE" onClick={changeBLE}>{wifiBLE?"BLE":"WIFI"}</button>
      
      {/* <Table
        chartClicked={chartClicked}
        chartData={chartData}
        keysOfObj={keysOfObj}
      /> */}

      <ChangeLabels dataWifi={dataWifi} dataBLE={dataBLE} wifiBLE={wifiBLE} setwifidata={setwifidata} 
      setbledata={setbledata} wifidata={wifidata} bledata={bledata}/>

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
