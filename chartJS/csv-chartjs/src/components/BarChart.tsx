import { useState, useEffect, useRef } from "react";
import { useCSVDownloader } from "react-papaparse";
import Papa from "papaparse";
// import CSVDownloader from "./CSVDownloader";
import {Bar,getElementAtEvent ,Doughnut} from 'react-chartjs-2';
import {Chart,registerables} from 'chart.js';
import '../style/style.scss';
import { setDatasets } from 'react-chartjs-2/dist/utils';
import { CSVLink } from 'react-csv';
import Table from "./Table";
import Form from "./Form";
// import {colors} from "../features/colors"
Chart.register(...registerables);

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

  // console.log(dataSaved);
  
 
  let [CSVdata, setCSVdata] = useState(dataSaved);
  let [backgroundcolor , setBackGroundColor] = useState<any>([])
  let [chartClicked, setChartClicked] = useState(false);
  let [years , setYears] = useState([1800,2022])
  let [choseYears , setChoseYears] = useState(false)  
  let [chartData, setChartData] = useState<any>();
  let [chosenlabel, setChosenLabel] = useState("");
  const chartRef: any = useRef(null);
  
  const [userData ,setUserData] = useState({
      labels: CSVdata.map((data:any) => `${data["Year"]}`),
      datasets: [{
        label: "Global Temperature Time Series,Annual , 1800 - present",
        data: CSVdata.map((data:any) => `${data.MAM}`),
        backgroundColor: backgroundcolor
      } 
    ]
    })

// set colors by values

    useEffect(() => {
      dataSaved.map((obj:any) => {
        let tempColor;
        let int = parseFloat(obj.MAM)
        if(int < 0 && int > -0.5){
           tempColor = "rgba(186, 14, 39)"    
        }else if(int < -0.5){
           tempColor = "black"
        }else if(int > 0 && int < 0.5){
          tempColor = "rgb(222, 135, 21)"
        }else if(int > 0.5){
          tempColor = "rgba(138, 213, 72, 0.25)"
        }
        backgroundcolor.push(tempColor)
      })
    
      // setBackGroundColor(colors(dataSaved))
      

        } ,[])

    async function setLabel(ev:any){
      const label = ev.target.id;
      await setChosenLabel(label)
      const tempData = userData;
      tempData.labels= dataSaved.map((data:any) => `${data[chosenlabel]}`)
      setUserData(tempData)
    }

    // get chart data for table 

    const getChart = async (ev:any) => {
        const chosenChart = getElementAtEvent(chartRef.current, ev)
        const index = chosenChart[0].index
        // console.log(index);
        
         await getChartData(index)
         setChartClicked(true) 
    }

    async function getChartData(index:any){
      const chartData = CSVdata[index]
      setChartData(chartData)
      console.log(chartData)
    }

    // ==============================================================  
    
  // useEffect(() => {}, [setLabel]);
  // function settLabel(ev: any) {
  //   const label = ev.target.id;
  //   setChosenLabel(label);
  //   console.log(label);
  //   const tempData = userData;

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
  //   tempData.labels = dataSaved.map((data: any) => `${data[`${label}`]}`);

  //   setUserData(tempData);
  // }

  function handleDownload(CSVdata:any){
  
    console.log(userData.datasets[0].data);
    console.log(userData.labels);
    // console.log(dataSaved);

    const dataTemp = userData.labels.map((year:any,i:number) => {
      return (
        {mam:userData.datasets[0].data[i],Year:year}
      )
    })
    
    console.log(dataTemp);
    
  
   
    let csv = Papa.unparse([
      dataTemp.map((obj:any,i:number) => {
        return (
        {
          "Year": obj.Year,
          "MAM" : obj.mam
        }
        )
      })
    ]);
      
      

  //   const data = userData.labels.map(obj => [
  //     obj
  //     obj.title,
  //     obj.description
  // ])

    
  

  const blob = new Blob([csv]);

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);

  a.download = 'CSVExportFile.csv';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  }

  function handleDownloadToImg() {
    // const imageLink=document.createElement('a');
    // const canvas = document.getElementById('chart') as HTMLCanvasElement
    // imageLink.href= canvas.toDataURL('image/png',1);
    // document.write('<img src="'+imageLink+'"/>')
    // console.log(imageLink.href)
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = chartRef.current.toBase64Image("image/png", 1);
    link.click();
    console.log(link)
    // const ctx:any = document.getElementById('chartImg')
    // ctx.getContext('2d');
    // ctx.fillStyle = 'rgb(255, 221, 0)';
    // ctx.fillRect(255, 221, 0);
  }

  return (
    <>
      <div className="chart" id='chartImg'>
        <Bar
          style={{ width: 500, height: 350 }}
          ref={chartRef}
          onClick={getChart}
          data={userData}
          options={{
            maintainAspectRatio: false,
            scales: { x: { beginAtZero: true }, y: { beginAtZero: true } },
          }}
        />
        </div>
      
          <Form userData={userData} setUserData={setUserData} dataSaved={dataSaved}/>
          <Table chartClicked={chartClicked} chartData={chartData} keysOfObj={keysOfObj}/>
          
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
         <button onClick={(CSVdata)=>handleDownload(CSVdata)}>Download To CSV</button>
      <button onClick={handleDownloadToImg}>Download To Image</button>
    </>
    
  );
}

export default BarChart
