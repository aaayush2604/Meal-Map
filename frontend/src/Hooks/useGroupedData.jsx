export const useGroupedData=(json)=>{
    function convertRatingToNumber(ratingObject) {
        return parseFloat(ratingObject["$numberDecimal"]);
    }
      
    const groupedData = json.reduce((acc, item) => {
        const name = item.Name;
        const city = item.City;
        const rating = convertRatingToNumber(item.Rating); // Convert rating to a number
      
        const existingGroup = acc.find(group => group._id.name === name && group._id.city === city);
      
        if (existingGroup) {
          existingGroup.count++;
          existingGroup.totalRating += rating;
        } else {
          acc.push({
            id:acc.length,
            _id: {
              name,
              city
            },
            count: 1,
            totalRating: rating,
            averageRating: 0
          });
        }
      
        return acc;
      }, []);
      
      // Calculate average rating for each group
      groupedData.forEach(group => {
        group.averageRating = group.totalRating / group.count;
    });

    return {groupedData};
}