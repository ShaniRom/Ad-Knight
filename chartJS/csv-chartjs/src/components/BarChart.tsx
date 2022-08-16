import {Bar} from 'react-chartjs-2';
import {Chart,registerables} from 'chart.js';
import {useState} from 'react'
import '../style/style.scss';

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
      labels: dataSaved.map((data:any) => `${data[' "Year"']}`),
      datasets: [{
        label: "Users Gained",
        data: dataSaved.map((data:any) => `${data[' "List Price ($)"']}`),
        backgroundColor: ["red" , "black" ,"green" , "pink", "yellow"]
      } 
    ]
    })

    function setLabel(ev:any){
      const label = ev.target.id;
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
      </div>

  
    </>
  )

}

export default BarChart