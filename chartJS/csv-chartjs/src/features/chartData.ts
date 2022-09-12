 
//  backgroundcolor:any
 const createChartData = (someData:any) => {

  
  
    const data = {
        labels: someData.map((data:any) => data["date"]["seconds"]),
        datasets: [
          {
            label: "negative rssi",
            data: someData.map((data: any) => data["rssi_0"] * -1),
            backgroundColor: (['red' , 'blue' , 'yellow']),
          },
        ],
      }
      return data
}
export default createChartData