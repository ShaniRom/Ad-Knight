import React, { useEffect } from "react";
import createChartData from "../features/chartData";

interface ChangeLabelsProps {
  dataBLE: any;
  dataWifi: any;
  wifiBLE: boolean;
  setwifidata: Function;
  setbledata: Function;
  bledata: any;
  wifidata: any;
  changeLabel:boolean;
  setChangedLabel:Function
}

function ChangeLabels(props: ChangeLabelsProps) {
  const {
    dataBLE,
    wifiBLE,
    dataWifi,
    setwifidata,
    setbledata,
    bledata,
    wifidata,
    changeLabel,
    setChangedLabel
  } = props;

  console.log(dataWifi);
  console.log(dataBLE);

   

  async function changeDatasets(ev: any) {
    ev.preventDefault()
   
    const label = ev.target.elements.changeLabels.value;
console.log(typeof(label))
    if (wifiBLE) {
      const data = await createChartData(dataWifi, label);
      console.log(data);

      setbledata(data);
    
    } else if (!wifiBLE) {
      const data = await createChartData(dataBLE, label);
      console.log(data);

      setwifidata(data);
     
      
    }
    setChangedLabel(!label)
    
  }

  return (
    <>
    <form  onSubmit={changeDatasets}>
    <label htmlFor="changeLabels">select label:</label>
      <select
        className="selectChangeLabels"
        name="changeLabels"
       
      >
        <option  value="rssi_0">rssi 0</option>
        <option value="rssi_1">rssi 1</option>
        <option value="rssi_2">rssi 2</option>
      </select>
      <button>submit</button>
    </form>
      
    </>
  );
}

export default ChangeLabels;
