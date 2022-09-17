import React, { useEffect } from 'react';
import createChartData from '../features/chartData'

interface ChangeLabelsProps{
  dataBLE:any;
  dataWifi:any;
    wifiBLE:boolean;
    setwifidata:Function;
    setbledata:Function;
    bledata:any;
    wifidata:any;
}

function ChangeLabels(props:ChangeLabelsProps) {

    const {dataBLE,wifiBLE,dataWifi,setwifidata,setbledata,bledata,wifidata} = props;

    useEffect(() => {
    },[bledata,wifidata])
    
    console.log(dataWifi);
    console.log(dataBLE);
    
  dataBLE.length = 10;
  dataWifi.length = 10;

    async function changeDatasets(ev:any){

    const label = ev.target.value;
    
    if(wifiBLE){
      const data =  await createChartData(dataWifi,label);
      console.log(data);
      
      setbledata(data);
      
    }else if(!wifiBLE){
      const data =  await createChartData(dataBLE,label);
      console.log(data);
      
      setwifidata(data)
    }
    
    }

  return (
    <>
    <label htmlFor="changeLabels">select label:</label>
    <select className='selectChangeLabels' name="changeLabels" onChange={changeDatasets}>
        <option value="rssi_0">rssi 0</option>
        <option value="rssi_1">rssi 1</option>
        <option value="rssi_2">rssi 2</option>
    </select>
    </>
  )
}

export default ChangeLabels