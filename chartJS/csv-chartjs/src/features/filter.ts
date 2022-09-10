

export async function filterData(dataSaved:any,keysBLE:any,keysWIFI:any){

    const filteredBLE = dataSaved.filter((obj:any) => {
        console.log(obj);
        
      return obj["BLE"] === "BLE";
    })
    const filteredWIFI = dataSaved.filter((obj:any) => {
      return obj["BLE"] === "WIFI"
    })

    await filterWithKeys(filteredBLE,filteredWIFI,keysBLE,keysWIFI)
    
    }

    function filterWithKeys(filteredBLE:any,filteredWIFI:any,keysBLE:any,keysWIFI:any){
        
        // keysBLE ,keysWIFI
        let wifiData:any = [];
        let BLEData:any = [];

// get the BLE of BLE with all BLE fields values -------------------------

        filteredBLE.map((obj:any,i:number) => {

              Object.keys(obj).map((key,i) =>  {
                 obj[`${keysBLE[i]}`] = obj[`${key}`]
                 delete obj[`${key}`]
              });
                BLEData = [...BLEData,obj]
            })
     // get the keys of wifi with all wifi fields values -------------------------

            filteredWIFI.map((obj:any,i:number) => {

                Object.keys(obj).map((key,i) =>  {
                   obj[`${keysBLE[i]}`] = obj[`${key}`]
                   delete obj[`${key}`]
                });
                wifiData = [...wifiData,obj]              
              })
              return {BLEData , wifiData}
            console.log(wifiData);
            console.log(BLEData);

        }
         
        
    
    
    