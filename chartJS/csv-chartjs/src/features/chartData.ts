 
 const createChartData = (CSVdata:any,backgroundcolor:any,Label:any,dataSetData:any) => {
    const data = {
        labels: CSVdata.map((data:any) => `${data[Label]}`),
        datasets: [
          {
            label: "Global Temperature Time Series,Annual , 1800 - present",
            data: CSVdata.map((data: any) => `${data[dataSetData]}`),
            backgroundColor: backgroundcolor,
          },
        ],
      }
      return data
}
export default createChartData