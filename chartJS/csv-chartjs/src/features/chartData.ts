 
 
 const createChartData = (someData:any,backgroundcolor:any,Label:any,dataSetData:any) => {
  
    const data = {
        labels: someData.map((data:any) => `${data[Label]}`),
        datasets: [
          {
            label: "Global Temperature Time Series,Annual , 1800 - present",
            data: someData.map((data: any) => `${data[dataSetData]}`),
            backgroundColor: backgroundcolor,
          },
        ],
      }
      return data
}
export default createChartData