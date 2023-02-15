function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function findCommonElements(arr1, arr2) {
  return arr1.every(item => arr2.includes(item))
}


function capitalizeFirstLetter(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}

export {
    tConvert,
    isEmpty,
    findCommonElements,
    capitalizeFirstLetter
}