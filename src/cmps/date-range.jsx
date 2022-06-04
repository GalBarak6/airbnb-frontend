import React, { useState } from 'react'
import { DateRange } from 'react-date-range'

export function DatePicker({onHandleDates}) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + (120 * 60 * 60 * 1000)), //tomorrow
      key: 'selection',
    },
  ])
  const [toggleCalender, setToggleCalender] = useState(false)

  const onHandleChange = (item) => {
    console.log(item);
    setDateRange([item.selection])
    // onHandleDates(dateRange.startDate,dateRange.endDate)
  }

  const convert = (str) => {
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2)
    return [date.getFullYear(), month, day].join("-")
  }

  return (
    <>
      <div className="flex" onClick={() => setToggleCalender((prevToggle) => !prevToggle)}>
        <label className='flex flex-column'>
          <span>CHECK-IN</span><input type="date" name='startDate' value={convert(dateRange[0].startDate)} onChange={onHandleChange} className="check-date checkin" />
        </label>
        <label className='flex flex-column'>
        <span>CHECKOUT</span><input type="date" name='endDate' value={convert(dateRange[0].endDate)} onChange={onHandleChange} className="check-date checkout" />
      </label>
    </div>
      {
    toggleCalender && <DateRange
      editableDateInputs={true}
      onChange={onHandleChange}
      moveRangeOnFirstSelection={false}
      ranges={dateRange}
    />
  }
    </>
  )
}