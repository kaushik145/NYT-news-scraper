import React, {Component} from 'react'

class SiteHelpers {

  debounce(func, wait, immediate) {
    var timeout;

    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  formatDate(date) {
    const formatedDate = new Date(date)
    const updatedTimeDate = new Date(formatedDate.getTime() + ( formatedDate.getTimezoneOffset() * 60000 ))

    const monthNumber = formatedDate.getMonth() - 1
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const month = monthArray[monthNumber]
    const day = formatedDate.getDate()
    const year = formatedDate.getFullYear()
    let hour = updatedTimeDate.getHours()
    let minute = updatedTimeDate.getMinutes()
    minute = (minute < 10 ? "0" : "") + minute
    let hourSuffix = 'AM'

    if (hour > 12) {
      hourSuffix = 'PM'
      hour = hour-12
    }
    else if (hour === 0) {
      hour = 12
    }

    const dateString = `${month} ${day}, ${year} at ${hour}:${minute} ${hourSuffix}`

    return dateString
  }

}




module.exports = new SiteHelpers()
