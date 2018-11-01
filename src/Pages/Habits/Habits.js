import React from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

// functions
import { checkAuth } from '../.././Utils/checkauth'

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import HabitsTable from '../.././Components/Habits/HabitsTable.js'
import NewHabit from '../.././Components/Modal/NewHabit'

const methods = {

};

const styles = theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
});

class Habits extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      firstDayOfWeekDate: moment().startOf('week').format('YYYY-MM-DD'),
      modalState: false,
    };

    checkAuth()

    this.getHabits = this.getHabits.bind(this)
    this.createHabit = this.createHabit.bind(this)
    this.handleModalOpen = this.handleModalOpen.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
  }


  handleModalOpen()
  {
    this.setState({
      modalState: true,
    });
  }

  handleModalClose()
  {
    this.setState({
      modalState: false,
    });
  }

  getHabits()
  {
    axios.post('http://127.0.0.1:5002/api/return_habits', {
      params: {
        user: sessionStorage.getItem('user'),
      }
    })
    .then((response) => {
      var res = response.data.habits
      res.forEach(bullet => {
        let timestamp = moment.unix(bullet.date).format('dddd, MMMM Do, YYYY')

        // if (document.getElementById(String(timestamp)))
        // {
        //   let temp = document.getElementById(timestamp)
        //   let node = document.createElement("LI");
        //   let textnode = document.createTextNode(bullet.description)
        //   node.appendChild(textnode)
        //   temp.appendChild(node);
        // }
      })
    })
  }

  createHabit()
  {
    axios.post('http://127.0.0.1:5002/api/create_habit', {
      params: {
        user: sessionStorage.getItem('user'),
      }
    })
    .then((response) => {


    })
  }



  render() {
    if (store.getState().auth_status.auth_status === false) {
      return <Redirect to='/' />
    }
    return(
      <div>
        <InternalNavBar />
        <NewHabit
            modalState={this.state.modalState}
            handleModalClose={this.handleModalClose} />
        <HabitsTable
            firstDayOfWeekDate={this.state.firstDayOfWeekDate}
            getHabits={this.getHabits}
            handleModalOpen={this.handleModalOpen} />
      </div>
    );
  }
}

Habits.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Habits));