import React,{useEffect} from 'react'
import '../style/style.scss'

interface FormProps{
  setUserData:Function;
    dataSaved:Array<any>
    userData:any
}


function Form(props:FormProps) {

const {setUserData,dataSaved,userData} = props;


    async function setyears(ev:any){
        ev.preventDefault()
        const min = ev.target.elements.min.value
        const max = ev.target.elements.max.value
        const tempData = dataSaved.filter((obj:any) => obj.Year >= min && obj.Year <= max)

        console.log(tempData);
        
        const tempChartData = userData;
        console.log(tempChartData);
        
        tempChartData.labels = tempData.map((data:any) => data.year )
        tempChartData.datasets.data = tempData.map((data:any) => data.MAM)
        tempChartData.datasets.backgroundColor = tempChartData.datasets[0].backgroundColor  
        console.log(tempChartData)
        

        await setUserData(tempChartData)
    }
    
    
  return (
    <form className='formYears' onSubmit={setyears}>
        <label htmlFor="min">from year</label>
        <input min={1800} max={2022} name='min' type="number" required/> <br />
        <label htmlFor="max">til year</label>
        <input min={1800} max={2022} name='max' type="number" required/><br />
        <input name='submit' type="submit" value="submit"/>
    </form>
  )
  // 0.07	0.15	0.11	0.19	0.11	0.12	0.01	0.05	0.04	0.08	-0.03	0.05
}

export default Form