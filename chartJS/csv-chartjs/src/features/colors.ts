  export const getColors =  async (data:any) => {
    
    let backGroundColor:any = []
    await data.map((obj:any) => {
        let tempColor;
        let int = parseFloat(obj.MAM)
        if(int <= 0 && int >= -0.5){
           tempColor = "rgba(186, 14, 39)"    
        }else if(int < -0.5){
           tempColor = "black"
        }else if(int >= 0 && int <= 0.5){
          tempColor = "rgb(222, 135, 21)"
        }else if(int > 0.5){
          tempColor = "rgba(138, 213, 72, 0.25)"
        }
        backGroundColor.push(tempColor)
      })
      return {backGroundColor, colorsOk:true}
}

