import React from 'react'
import { Redirect } from 'react-router-dom';
import history from '../.././history';
import axios from 'axios';
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@mdi/react'
import Paper from '@material-ui/core/Paper';
import { mdiCheck, mdiClose } from '@mdi/js'
import { emptyObject } from '../.././Utils/empty_object'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getStoreHabits, getStoreHabitEntries } from '../.././Actions/actions'

// functions
import { checkAuth } from '../.././Utils/checkauth'
import { updateAllUIEntries } from '../.././Utils/updatealluientries'
import { getHabitEntries } from '../.././Utils/gethabitentries'
import { getHabits } from '../.././Utils/gethabits'
import { createHabit } from '../.././Utils/createhabit'
import { updateHabit } from '../.././Utils/updatehabit'
import { deleteHabit } from '../.././Utils/deletehabit'
import { logHabit } from '../.././Utils/loghabit'
import { removeEntry} from '../.././Utils/removeentry'
import { returnAllDatabaseEntries } from '../.././Utils/returnalldatabaseentries'
import { updateHabitEntries } from '../.././Utils/updatehabitentries'
import { updateStoreEntryId } from '../.././Utils/updatestoreentryid'
  // Additional Page Prep
  import { getBullets } from '../.././Utils/getbullets'
  import { getCalendarEntries } from '../.././Utils/getcalendarentries'

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import HabitsTable from '../.././Components/Habits/HabitsTable.js'
import NewHabit from '../.././Components/Modal/NewHabit'
import EditHabit from '../.././Components/Modal/EditHabit'
import Loader from '../.././Components/Loaders/Loader'

const methods = {};

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '80vw',
    minHeight: 'calc(100vh - 132px)',
    maxWidth: '100vw',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',

    [theme.breakpoints.down(768)]: {
      marginLeft: '8px',
      marginRight: '8px',
      marginTop: '8px',
    },
  },
});

class Habits extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      habit_entries: {},
      IDCount: 0,
      type: 'habit',
      firstDayOfWeekDate: moment().startOf('week').format('YYYY-MM-DD'),
      edit_id: "",
      newModalState: false,
      editModalState: false,
      editValue: "",
      newValue: "",
    };

    this.handleModalOpen = this.handleModalOpen.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.editModalValue = this.editModalValue.bind(this)
    this.newModalValue = this.newModalValue.bind(this)
    this.prevWeekHandler = this.prevWeekHandler.bind(this)
    this.nextWeekHandler = this.nextWeekHandler.bind(this)

    this.returnAllDatabaseEntries = returnAllDatabaseEntries.bind(this)
    this.createHabit = createHabit.bind(this)
    this.deleteHabit = deleteHabit.bind(this)
    this.logHabit = logHabit.bind(this)
    this.removeEntry = removeEntry.bind(this)
    this.updateHabit = updateHabit.bind(this)
    this.getHabits = getHabits.bind(this)
    this.getHabitEntries = getHabitEntries.bind(this)
    this.updateAllUIEntries = updateAllUIEntries.bind(this)
    this.updateStoreEntryId = updateStoreEntryId.bind(this)
    this.updateHabitEntries = updateHabitEntries.bind(this)

    // Other
    this.getBullets = getBullets.bind(this)
    this.getCalendarEntries = getCalendarEntries.bind(this)
  }

  componentDidMount()
  {
    if (store.getState().first_load.first_load === true)
    {
      this.updateHabitEntries()
      .then(() => {
        this.getBullets()
        this.getCalendarEntries()
      })
    }
    else
    {
      this.updateAllUIEntries()

      // Retry. Prevents users from having a black calendar if API call hasn't returned in time
      if (emptyObject(store.getState().habit_entries.habit_entries) === true)
      {
        let retry_count = 0
        var retry = (retry_count) =>
        {
          if (retry_count < 5 && emptyObject(store.getState().habit_entries.habit_entries) === true)
          {
            setTimeout(() =>
            {
                retry_count++
                if (store.getState().auth_status.auth_status === true)
                {
                  this.updateAllUIEntries()
                  retry(retry_count)
                }
              }, 1000);
          }
        }
        retry(retry_count)
      }
    }
  }

  prevWeekHandler() {
    this.setState({
      firstDayOfWeekDate: moment(this.state.firstDayOfWeekDate).subtract(1, "weeks").format('YYYY-MM-DD'),
    })

    this.getHabitEntries()
  }

  nextWeekHandler() {
    this.setState({
      firstDayOfWeekDate: moment(this.state.firstDayOfWeekDate).add(1, "weeks").format('YYYY-MM-DD'),
    })

    this.getHabitEntries()
  }

   editModalValue(event)
   {
     this.setState({
       editValue: event.target.value
     })
   }

   newModalValue(event)
   {
     this.setState({
       newValue: event.target.value
     })
   }

  handleModalOpen(modal, habit_id, title)
  {
    if (modal === 'new')
    {
      this.setState({
        newModalState: true,
      });
    }
    else if (modal === 'edit')
    {
      this.setState({
        editModalState: true,
        edit_id: habit_id,
        editValue: title,
      });
    }
  }

  handleModalClose()
  {
    this.setState({
      newModalState: false,
      editModalState: false,
    });
  }

  render() {
    if (store.getState().auth_status.auth_status === false)
    {
      checkAuth()
      .then(function(){
          if (store.getState().auth_status.auth_status === false)
          {
            history.push('/');
          }
      })
      .catch(function(error)
      {
        history.push('/');
      })
    }

    return(
      <div>
        <InternalNavBar />
        <Paper className={this.props.classes.root}>
          <NewHabit
              newModalState={this.state.newModalState}
              handleModalClose={this.handleModalClose}
              createHabit={this.createHabit}
              newModalValue={this.newModalValue} />
          <EditHabit
              editModalState={this.state.editModalState}
              editValue={this.state.editValue}
              handleModalClose={this.handleModalClose}
              deleteHabit={this.deleteHabit}
              updateHabit={this.updateHabit}
              editModalValue={this.editModalValue} />
          <HabitsTable
              firstDayOfWeekDate={this.state.firstDayOfWeekDate}
              getHabits={this.getHabits}
              getHabitEntries={this.getHabitEntries}
              handleModalOpen={this.handleModalOpen}
              logHabit={this.logHabit}
              prevWeekHandler={this.prevWeekHandler}
              nextWeekHandler={this.nextWeekHandler} />
          <Loader/>
          </Paper>
      </div>
    );
  }
}

Habits.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    habits: state.habits,
    habit_entries: state.habit_entries
  }
}


export default connect(mapStateToProps)(withStyles(styles)(Habits));
