import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

const styles = theme => ({
  root: {
    // display: 'flex',
  },
});

class MenuListComposition extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <i className="fas fa-ellipsis-v" />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.anchorEl}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem style={{ fontSize: '13px' }} onClick={this.handleClose}>Edit</MenuItem>
            <MenuItem style={{ fontSize: '13px' }} onClick={this.handleClose}>Remove</MenuItem>
          </Menu>
        </div>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListComposition);