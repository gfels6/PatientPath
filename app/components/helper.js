export const convertTime = (dateString) => {
    let day,month,year,hour,minute;
    year = dateString.slice(0,4);
    month = dateString.slice(5,7);
    day = dateString.slice(8,10);
    hour = dateString.slice(11,13);
    minute = dateString.slice(14,16);
    
    return day + "." + month + "." + year + " " + hour + ":" + minute;
}