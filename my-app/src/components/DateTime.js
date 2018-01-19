import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import MediaQuery from 'react-responsive';

const DateTime = (props) => {
  return <div>
    <MediaQuery minWidth={850}>
    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    }}>
      <DatePicker
        name="date"
        hintText="Schedule Date"
        value={props.date}
        onChange={props.handleDateChange}
        fullWidth={true}
      /><span> </span>
      <TimePicker
        name="time"
        format="24hr"
        hintText="Schedule Time"
        autoOk={true}
        value={props.time}
        onChange={props.handleTimeChange}
        fullWidth={true}
      />
    </div>
  </MediaQuery>
  <MediaQuery maxWidth={850}>
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <DatePicker
        name="date"
        hintText="Schedule Date"
        value={props.date}
        onChange={props.handleDateChange}
        fullWidth={true}
      /><span> </span>
      <TimePicker
        name="time"
        format="24hr"
        hintText="Schedule Time"
        autoOk={true}
        value={props.time}
        onChange={props.handleTimeChange}
        fullWidth={true}
      />
    </div>
  </MediaQuery>
  </div>
}

export default DateTime
