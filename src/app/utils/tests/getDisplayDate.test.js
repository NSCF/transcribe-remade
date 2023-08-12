import {describe, it, expect} from 'vitest'
import getDisplayDate from '../getDisplayDate'

//TODO update all of these tests with fixed dates for explicit testing!
const testDate = new Date();
const weekDays = [];
for(let i = 0; i < 7; i++) {       
  weekDays.push(testDate.toLocaleDateString('en-US', { weekday: 'long' }));
  testDate.setDate(testDate.getDate() - 1);       
}

describe('getDisplayDate with no parameters', _ => {
  it('should throw', _ => {
    expect(_ => getDisplayDate()).toThrow()
  })
})

describe('getDisplayDate with startDate only', _ => {

  it('should return today if date is today', _ => {
    expect(getDisplayDate(Date.now())).toBe('Today')
  })


  it('should return a day string if within the last week', _ => {
    
    testDate.setDate(testDate.getDate() + 5) //because we decremented it in the loop above
    expect(weekDays).toContain(getDisplayDate(testDate.getTime()))
  })

  it('should return a month and day if in this year', _ => {
    
    testDate.setDate(testDate.getDate() - 20) //because we decremented it in the loop above
    const thisYear = new Date().getFullYear()
    testDate.setFullYear(thisYear)

    expect(getDisplayDate(testDate.getTime()).split(' ')).toHaveLength(2) //this is indirect, risky

  })

  it('should return day month and year if a different year',  _ => {
    const thisYear = new Date().getFullYear()
    testDate.setFullYear(thisYear - 1)

    expect(getDisplayDate(testDate.getTime()).split(' ')).toHaveLength(3) //this is indirect, risky

  })
})

describe('getDisplaydDate with startDate and endDate', _ => {

  it('should throw if endDate is less that startDate',  _=> {
    
    const now = Date.now()
    const earlier = now - 1000
    expect(_ => getDisplayDate(now, earlier)).toThrow()
    
  })
  
  it('should return today if date is today', _ => {
    expect(getDisplayDate(Date.now(), Date.now())).toBe('Today')
  })

  it('should return one day string if in the last week and the same date', _ => {
    expect(getDisplayDate(1691652070584, 1691704330584)).toBe('Thursday')
  })

  it('should return two day strings if startdate in the last week', _=> {
    testDate.setTime(Date.now())
    testDate.setDate(testDate.getDate() - 4)
    let startDate = testDate.getTime()
    testDate.setDate(testDate.getDate() + 2)
    let endDate = testDate.getTime()
    let displayDateParts = getDisplayDate(startDate, endDate).split('-').map(x => x.trim())
    expect(displayDateParts).toHaveLength(2)
    expect(weekDays).toContain(displayDateParts[0])
    expect(weekDays).toContain(displayDateParts[1])
    
  })

  it('should display a range if two different dates this year', _ => {
    
    const thisYear = new Date().getFullYear()
    const startDateString = thisYear + '-04-12'
    const endDateString = thisYear + '-04-18'
    const startDate = new Date(startDateString).getTime()
    const endDate = new Date(endDateString).getTime()

    expect(getDisplayDate(startDate, endDate)).toBe('Apr 12 - 18')
  })

  it('should display a modified ISO date range if not this year',  _=> {
    const startDateString = '2022-04-12'
    const endDateString = '2022-05-01'
    const startDate = new Date(startDateString).getTime()
    const endDate = new Date(endDateString).getTime()
    expect(getDisplayDate(startDate, endDate)).toBe('2022/04/12-05/01')

  })

})