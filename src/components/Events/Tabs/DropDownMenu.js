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

  customClose = (event, fun) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false }, fun);
  }

  onEdit = (e) => {
    this.customClose(e, () => {
      const { onEdit } = this.props;
      if (onEdit) {
        onEdit();
      }
    });
  }

  onRemove = (e) => {
    this.customClose(e, () => {
      const { onRemove } = this.props;
      if (onRemove) {
        onRemove();
      }
    });
  }

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
            <MenuItem style={{ fontSize: '13px' }} onClick={this.onEdit}>Edit</MenuItem>
            <MenuItem style={{ fontSize: '13px' }} onClick={this.onRemove}>Remove</MenuItem>
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