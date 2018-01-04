import React from 'react';
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'

const DateTime = (props) => {
  return <div>
    <DatePicker
      name="date"
      hintText="Schedule Date"
      value={props.date}
      onChange={props.handleDateChange}
    />
    <TimePicker
      name="time"
      format="24hr"
      hintText="Schedule Time"
      autoOk={true}
      value={props.time}
      onChange={props.handleTimeChange}
    />
  </div>
}

export default DateTime
