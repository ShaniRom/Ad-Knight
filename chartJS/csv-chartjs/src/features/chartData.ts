import { filterByMac1 } from "./filter";
import { getColors } from "./colors";
import {findTimeFrame} from './timeRange'
//  backgroundcolor:any


const createChartData = async (someData : any,rssi:string) => {

  const dataSetList = await filterByMac1(someData);
  const labelsList= await findTimeFrame(someData);

  const label = rssi;
  console.log(label);
  
  const backGroundColor = await getColors(dataSetList);
  const data = {
    labels: labelsList.map((date:any) =>  ` ${date.day}/${date.month}/${date.year}` + " " +
    `${date.hours}:${date.minutes}:${date.seconds}`),
    datasets: dataSetList.map((mac1: any) => {
      console.log(mac1.objArray);
      
      return {
        label: mac1.mac1Value + " " + label,
        data:  mac1.objArray.map((data: any) => data[`${label}`]),
        borderColor: backGroundColor.map((color: any) =>  color),
        borderDash: [5 , 2],
        backgroundColor: backGroundColor.map((color: any) => color),
      };
    }),
  }
  console.log(data);
  
  return data;

};


export default createChartData;
