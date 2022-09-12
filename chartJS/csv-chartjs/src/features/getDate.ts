 const getDate = (unix_timestamp:number) => {

    
    let date = new Date(unix_timestamp * 1000);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    
    const dateFound = {year,month,day,hours,minutes,seconds}
    
    return dateFound;
    
}
export default getDate