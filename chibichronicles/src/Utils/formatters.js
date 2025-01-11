export const formatDate = (dateString) => {

    if(!dateString) return "_"

    const date = new Date(dateString); // Convert the string to a Date object
    
    const day = date.getDate(); // Get the day of the month
    const month = date.toLocaleString('default', { month: 'long' }); // Get the full month name
    const year = date.getFullYear(); // Get the year
    
    // Function to add the correct suffix to the day
    function getDaySuffix(day) {
        if (day > 3 && day < 21) {
            return 'th'; // Special case for 11th to 13th
        }
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    }
    
    const dayWithSuffix = day + getDaySuffix(day); // Get the day with suffix
    
    return `${dayWithSuffix} ${month}, ${year}`; // Return the formatted string
}


export const formatAnimeDescription = (description , wordsLimit) => {
    if(description.length > wordsLimit){
        return description.slice(0, wordsLimit) + '...';
    }
    return description;
}
