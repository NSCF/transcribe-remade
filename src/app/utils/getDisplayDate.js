import timestampToISODate from "./timestampToISODate"

export default function(startTimestamp, endTimeStamp) {

  if (!startTimestamp || isNaN(startTimestamp)) {
    throw new Error('invalid startTimestamp value')
  }

  // otherwise show the dates
  if (startTimestamp){

    const startDate = new Date(startTimestamp)
    const startDateParts = startDate.toString().split(' ').slice(0, 4)

    const now = new Date()
    const nowDateParts = now.toString().split(' ').slice(0, 4)
    const thisYear = now.getFullYear()

    if (endTimeStamp) {

      if(isNaN(endTimeStamp)) {
        throw new Error('invalid endTimestamp value')
      }

      if(endTimeStamp < startTimestamp) {
        throw new Error('endTimestamp cannot be less that startTimestamp')
      }

      let startDayString
      if (timestampToISODate(startTimestamp) == timestampToISODate(Date.now())) {
        return 'Today'
      }

      const endDate = new Date(endTimeStamp)
      const endDateParts = endDate.toString().split(' ').slice(0, 4)

      let endDayString
      if (timestampToISODate(startTimestamp) == timestampToISODate(Date.now())) {
        endDayString = 'Today'
      }
      else {
        endDayString = endDate.toLocaleDateString('en-US', { weekday: 'long' })
      }

      //if they are this week
      const startDaysAgo = Math.round((now.getTime() - startDate.getTime()) / (1000*60*60*24))
      if (startDaysAgo < 7) {
        startDayString = startDate.toLocaleDateString('en-US', { weekday: 'long' })
        if (startDayString == endDayString) {
          return startDayString
        }
        else {
          return startDayString + ' - ' + endDayString
        }
      }

      //if both this year
      if (startDate.getFullYear() == new Date().getFullYear() && endDate.getFullYear() == new Date().getFullYear()) {

        let i = 0

        //if both the same day just get the month and day
        if (timestampToISODate(startDate) == timestampToISODate(endDate)){
          return startDateParts.slice(1,3).join(' ')
        }

        //we now know they are the same year, this year, but not the same day

        //if they are the same month, just give the month and the date range
        if(startDate.getMonth() == endDate.getMonth()) {
          return startDateParts[1] + ' ' + startDateParts[2] + ' - ' + endDateParts [2]
        }
        else { //give both months and dates
          return startDateParts[1] + ' ' + startDateParts[2] + ' - ' + endDateParts[1] + ' ' + endDateParts [2]
        }
      }

      //they are not this year, or different years

      //if the same day
      if (timestampToISODate(startDate) == timestampToISODate(endDate)){
        return timestampToISODate(startDate)
      }

      //make a modified ISO date (slashes instead of dashes)
      let startISODateParts = timestampToISODate(startDate).split('-')
      let endISODateParts = timestampToISODate(endDate).split('-')

      const dateParts = []
      let i = 0
      for (i; i < 3; i++) {
        if (startISODateParts[i] == endISODateParts[i]){
          dateParts.push(startISODateParts[i])
        }
        else {
          break
        }
      }

      //we have to have a range because we catered for equal dates above
      const sharedPart = dateParts.join('/')
      const firstPart = startISODateParts.slice(i).join('/')
      const endPart = endISODateParts.slice(i).join('/')

      return sharedPart + '/' + firstPart + '-' + endPart

    }
    //else startTimetamp only

    //if today return today
    if (timestampToISODate(startTimestamp) == timestampToISODate(Date.now())) {
      return 'Today'
    }
    
    //if in the last week just show the day name
    const startDaysAgo = Math.round((now.getTime() - startDate.getTime()) / (1000*60*60*24))
    if (startDaysAgo < 7) {
      return startDate.toLocaleDateString('en-US', { weekday: 'long' })
    }

    // in the same year just show the day and month
    if(startDateParts[3] == thisYear) {
      return startDateParts.slice(1,3).join(' ')
    }
    else {
      return startDateParts.slice(1).join(' ')
    }
    
    // if (dateParts[dateParts.length - 1] == thisYear) {
    //   return dateParts.slice(0,3).join(' ')
    // }
    // else {
    //   return dateParts.join(' ')
    // }
  }
  else {
    return null
  }
}