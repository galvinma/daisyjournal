import React from 'react'
import moment from 'moment'

class CalendarHeader extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {

    };
  }

  render() {
    return(
      <div>
        <p>{this.props.getMonth}</p>
      </div>
    );
  }
}


export default CalendarHeader;
