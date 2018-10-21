import React from 'react'
import axios from 'axios';
import moment from 'moment'
import { Redirect } from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {  mdiSquare,
          mdiSquareOutline,
          mdiCircle,
          mdiCircleOutline,
          mdiTriangle,
          mdiTriangleOutline,
          mdiClose,
        } from '@mdi/js'

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import BulletList from '../.././Components/BulletList/BulletList'
import BulletSelector from '../.././Components/BulletList/BulletSelector'
import Key from '../.././Components/BulletList/Key'

// functions
import { checkAuth } from '../.././Utils/checkauth'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

const styles = theme => ({
  bullet_container: {
    marginLeft: '15vw',
    marginRight: '15vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: '20px',
  },
});

class Journal extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    bullets: {}, // date --> bullet list
    description: '',
    type: 'task',
    selected: 'mdiSquareOutline',
  };

  checkAuth()
  this.getBullets()

  this.addBullet = this.addBullet.bind(this)
  this.selectorChange = this.selectorChange.bind(this)
  this.descriptionChange = this.descriptionChange.bind(this)
  this.removeBullet = this.removeBullet.bind(this)
  this.toggleIcon = this.toggleIcon.bind(this)
  this.updateBulletDescription = this.updateBulletDescription.bind(this)
  this.checkSubmit = this.checkSubmit.bind(this)
  }

  addBullet()
  {
    axios.post('http://127.0.0.1:5002/api/save_bullet', {
      params: {
        user: sessionStorage.getItem('user'),
        type: this.state.type,
        description: this.state.description,
      }
    })
    .then((response) => {
      this.setState({
        description: ""
      });

    })
    .catch((error)=>{
      console.log(error);
    });

    this.getBullets()
  }

  getBullets()
  {
    axios.post('http://127.0.0.1:5002/api/return_bullets', {
      params: {
        user: sessionStorage.getItem('user'),
      }
    })
    .then((response) => {
      var res = response.data.bullets
      var new_bullets = {}
      res.forEach(bullet => {
          let timestamp = moment.unix(bullet.date).format('dddd, MMMM Do, YYYY')

          if (!(new_bullets[timestamp]))
          {
            new_bullets[timestamp] = [bullet]
          }
          else
          {
            new_bullets[timestamp].push(bullet)
          }
      })
      this.setState({
        bullets: new_bullets
      })

    })
    .catch((error)=>{
      console.log(error);
    });
  }

  selectorChange(event)
  {

    this.setState({
      selected: event.target.value }
    );

    // mdiCircleOutline = Event
    // mdiSquareOutline = Task
    // mdiTriangleOutline = Habit
    if (event.target.value === 'mdiCircleOutline')
    {
      this.setState({
        type: 'event' });
    }
    if (event.target.value === 'mdiSquareOutline')
    {
      this.setState({
        type: 'task' });
    }

    if (event.target.value === 'mdiTriangleOutline')
    {
      this.setState({
        type: 'habit' });
    }

  };

  checkSubmit(event)
  {
    if (event.keyCode === 13) {
        this.addBullet()
    }
  }

  descriptionChange(event)
  {
    this.setState({
      description: event.target.value
    });
  };

  removeBullet(id)
  {
    axios.post('http://127.0.0.1:5002/api/remove_bullet', {
      params: {
        bullet_id: id
      }
    })
    .then((response) => {
      console.log(response)

    })
    .catch((error)=>{
      console.log(error);
    });

    this.getBullets()
  }

  toggleIcon(id, type, status)
  {

    axios.post('http://127.0.0.1:5002/api/update_bullet_status', {
      params: {
        bullet_id: id,
        type: type,
        status: status,
      }
    })
    .then((response) => {
      console.log(response)

    })
    .catch((error)=>{
      console.log(error);
    });

    this.getBullets()
  }

  updateBulletDescription(bullet_id)
  {
    var val = document.getElementById(bullet_id).value;
    console.log(bullet_id)
    console.log(val)
    axios.post('http://127.0.0.1:5002/api/update_bullet_description', {
      params: {
        bullet_id: bullet_id,
        description: val,
      }
    })
    .then((response) => {
      console.log(response)

    })
    .catch((error)=>{
      console.log(error);
    });

    this.getBullets()
  }

  render() {
    if (store.getState().auth_status.auth_status === false) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <InternalNavBar />
          <div className={this.props.classes.bullet_container}>
            <Key />
            <BulletSelector
              checkSubmit = {this.checkSubmit}
              selectorChange = {this.selectorChange}
              descriptionChange = {this.descriptionChange}
              addBullet = {this.addBullet}
              selected={this.state.selected}
              description={this.state.description}
              type={this.state.type}
              bullets={this.state.bullets} />
            <BulletList
              bullets={this.state.bullets}
              removeBullet={this.removeBullet}
              toggleIcon={this.toggleIcon}
              updateBulletDescription={this.updateBulletDescription}
              className={this.props.classes.bulletlist} />
            </div>
      </div>
    );
  }
}

Journal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Journal));
