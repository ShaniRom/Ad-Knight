import React, { useEffect } from "react";
import createChartData from "../features/chartData";

interface ChangeLabelsProps {
  dataBLE: any;
  dataWifi: any;
  setChartData: Function;
  setchosevalue:Function;
  chosevalue:boolean;
}

function ChangeLabels(props: ChangeLabelsProps) {
  
  
  const {dataBLE,setChartData,dataWifi ,setchosevalue,chosevalue} = props;

 
  async function changeDatasets(ev: any) {
    ev.preventDefault()
   
    const label = ev.target.value;

    // console.log(dataBLE[0][`${label}`])

    const wifiData = await createChartData(dataWifi,label)


    const bleData = await createChartData(dataBLE,label)


     setChartData({wifiData,bleData})

  }

  return (
    <>
    
    <label htmlFor="changeLabels">select label:</label>
      <select className="selectChangeLabels" name="changeLabels" onChange={changeDatasets}>
        <option  value="rssi_0">rssi 0</option>
        <option value="rssi_1">rssi 1</option>
        <option value="rssi_2">rssi 2</option>
      </select>
      
      
    </>
  );
}

export default ChangeLabels;
