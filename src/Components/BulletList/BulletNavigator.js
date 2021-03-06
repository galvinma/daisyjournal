import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    top: '100px',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '15vw',
    maxHeight: '70vh',
    overflowY: 'srcoll',

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
            {this.props.nav_months.nav_months.map(this.createList)}
        </List>
      </div>
    );
  }
}

BulletNavigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    nav_months: state.nav_months,
  }
}

export default withStyles(styles)(BulletNavigator);
