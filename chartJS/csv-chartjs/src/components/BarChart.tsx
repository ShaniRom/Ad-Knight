import {Bar} from 'react-chartjs-2';
import {Chart,registerables} from 'chart.js';
import {useState} from 'react'
import '../style/style.scss';
import { setDatasets } from 'react-chartjs-2/dist/utils';
import { CSVLink } from 'react-csv';
Chart.register(...registerables)


interface BarChartProps{
  dataSaved:any;
  labels:any;
  keysOfObj:Array<any>;
}

const BarChart = (props:BarChartProps) => {

  const {dataSaved,labels,keysOfObj} = props;

  const [chosenlabel , setChosenLabel] = useState("")

  console.log(dataSaved);
  
  console.log(keysOfObj);
  
  const [userData ,setUserData] = useState({
      labels: dataSaved.map((data:any) => `${data[`${keysOfObj[0]}`]}`),
      datasets: [{
        label: "Users Gained",
        data: dataSaved.map((data:any) => `${data[`${keysOfObj[3]}`]}`),
        backgroundColor: ["red" , "black" ,"green" , "pink", "yellow"]
      } 
    ]
    })

    async function setLabel(ev:any){
      const label = ev.target.id;
      await setChosenLabel(label)
      console.log(label)
      const tempData=userData
      tempData.labels=dataSaved.map((data:any) => `${data[`${chosenlabel }`]}`)
      
      setUserData(tempData)
      
   
    }
    

  return (
      <>
      
      <div className='chart'>
      <Bar style={{width:500,height:500}} data={userData}
     options={{
        maintainAspectRatio:false,
        scales:{x:{beginAtZero:true},y:{beginAtZero:true}}

}} />
</div>

<div className='btns'>
      {keysOfObj.map((title,i) => {
        return (
          <button className='btns-btn' key={i} id={title} onClick={setLabel}>{title}</button>
          
        )
      })}
      <CSVLink data={dataSaved}>Export CSV</CSVLink>;
      </div>

  
    </>
  )

}

export default BarChart