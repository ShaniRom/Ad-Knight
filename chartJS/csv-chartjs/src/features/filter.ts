

export async function filterData(dataSaved:any,keysBLE:any,keysWIFI:any){


    const filteredBLE = dataSaved.filter((objBLE:any) => {
        
        if (objBLE["BLE"] === "BLE"){
          // console.log(objBLE);
        }
      return objBLE["BLE"] === "BLE";
      
    })
    
    const filteredWIFI = dataSaved.filter((objWIFI:any) => {

      if(objWIFI["BLE"] === "WIFI"){
        // console.log(objWIFI);
      }
      return objWIFI["BLE"] === "WIFI"
    })

    console.log(filteredWIFI);
    
    // const data = await filterWithKeys(filteredBLE,filteredWIFI,keysBLE,keysWIFI)
    // const BLEdata = data.BLEData
    // const wifidata = data.wifiData
    // console.log(BLEdata,wifidata);
    
  
    }

  function filterWithKeys(filteredBLE:any,filteredWIFI:any,keysBLE:any,keysWIFI:any){
        
        // keysBLE ,keysWIFI
        let wifiData:any = [];
        let BLEData:any = [];
        
        console.log(filteredBLE);
        
        console.log(keysBLE);
        console.log(keysWIFI);
        
// get the BLE of BLE with all BLE fields values -------------------------

        filteredBLE.map((obj:any,i:number) => {

            console.log(Object.keys(obj));
            
              Object.keys(obj).map((key,i) =>  {

                console.log(obj);
                
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
            

        }
         
        
    
    
    