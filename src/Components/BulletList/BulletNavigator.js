import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


// mdiCircle = Event
// mdiSquareOutline = Task
// mdiTriangle = Habit

const styles = theme => ({
  root: {
    position: 'fixed',
    top: '100px',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '15vw',
    height: '90vh',

    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      top: 'auto',
      height: 'auto',
    },
  },
  nav_list: {
    paddingTop: '0px',
  },
});

class BulletNavigator extends React.Component {
  constructor(props)
  {
    super(props);

    this.createList = this.createList.bind(this);
  }

  createList(i)
  {
    return (
    <ListItem key={i}>
      <ListItemText onClick={(e) => this.props.changeSelectedMonth(i)}>
        <Typography variant="body1">
          {i}
        </Typography>
      </ListItemText>
    </ListItem>
  )
  }

  render() {
    return(
      <div className={this.props.classes.root}>
        <List className={this.props.classes.nav_list}>
            {this.props.navigatorMonths.map(this.createList)}
        </List>
      </div>
    );
  }
}

BulletNavigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletNavigator);
