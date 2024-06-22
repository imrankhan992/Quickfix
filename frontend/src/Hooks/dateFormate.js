import React from 'react'

const dateFormate = () => {
    const formateDate = (date) => {
        //  I WANT TO GET live counter that how many time remaining in order expire
        const newDate = new Date(date);
        return newDate.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
      };
        
      return {formateDate}
}

export default dateFormate