import getDate from "./getDate";

export async function filterData(dataSaved: any, keysBLE: any, keysWIFI: any) {

  const filteredBLE = dataSaved.filter((objBLE: any) => {
    return objBLE[0] === "BLE";
  });

  const filteredWIFI = dataSaved.filter((objWIFI: any) => {
    return objWIFI[0] === "WIFI";
  });

  const result = await filterWithKeys(
    filteredBLE,
    filteredWIFI,
    keysBLE,
    keysWIFI
  );

  return result;
}

async function filterWithKeys(
  filteredBLE: any,
  filteredWIFI: any,
  keysBLE: any,
  keysWIFI: any
) {
  // keysBLE ,keysWIFI
  let wifiData: any = [];
  let BLEData: any = [];

  // getting the keys and values together in BLE ----------------------------------------

  for (let i = 0; i < filteredBLE.length; i++) {
    let tempObj: any = {};
    for (let x = 0; x < filteredBLE[i].length; x++) {
      const tempKey = keysBLE[x];
      const tempValue = filteredBLE[i][x];
      tempObj[`${tempKey}`] = tempValue;
    }
    tempObj.ts = parseFloat(tempObj.ts);
    const dateFound = getDate(tempObj.ts);
    tempObj.date = dateFound;
    BLEData = [...BLEData, tempObj];
  }

  // getting the keys and values together in WIFI ------------------------------

  for (let i = 0; i < filteredWIFI.length; i++) {
    let tempObj: any = {};
    for (let x = 0; x < filteredWIFI[i].length; x++) {
      const tempKey = keysWIFI[x];
      const tempValue = filteredWIFI[i][x];
      tempObj[`${tempKey}`] = tempValue;
    }

    tempObj.ts = parseFloat(tempObj.ts);
    const dateFound = getDate(tempObj.ts);
    tempObj.date = dateFound;
    wifiData = [...wifiData, tempObj];
  }
  return { wifiData, BLEData };
}

// -------------------------------------------------------

export const filterByMac1 = (list: any) => {
  let mac1List: any = [];
  let tempMac1 = list[0].MAC_1;

  
  list.forEach((data: any) => {
    mac1List.push(data.MAC_1);
  });

  const mac1ListArray = mac1List.filter(
    (n: any, i: any) => mac1List.indexOf(n) === i
  )
   let allMacObj:any=[];
    mac1ListArray.map((mac1: any) => {
    const tempObj = {mac1Value:mac1,objArray:list.filter((obj: any) => obj.MAC_1 === mac1)};
    allMacObj.push(tempObj)
   
  });
  
  
  return allMacObj
}