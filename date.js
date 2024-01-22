module.exports.getDate=getDate; //Exports Both Date and Day

function getDate(){

    const today  = new Date();
    
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    
    const day= today.toLocaleDateString("en-US",options); //javascript method to get date and format

    return day;

}

module.exports.getDay=getDay; //Exports only Day
function getDay(){

    const today  = new Date();
    
    const options = { weekday: 'long' };
    
    const day= today.toLocaleDateString("en-US",options); //javascript method to get date and format

    return day;

}
    
    