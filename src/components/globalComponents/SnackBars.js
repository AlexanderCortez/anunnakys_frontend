import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};
const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});
const MySnackbarContent = (props) => {
  const {
    classes, className, message, onClose, variant, onUndo, type, ...other
  } = props;
  const Icon = variantIcon[variant];
  const actions = [];
  if (type === 'undo') {
    actions.push((
      <Button key="undo" color="primary" style={{ color: 'white' }} size="small" onClick={onUndo}>
        UNDO
      </Button>
    ));
  }
  actions.push((
    <IconButton
      key="close"
      aria-label="Close"
      color="inherit"
      className={classes.close}
      onClick={onClose}
    >
      <CloseIcon className={classes.icon} />
    </IconButton>
  ));
  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" style={{ fontSize: '13px' }} className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      )}
      action={actions}
      {...other}
    />
  );
};


const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);


class CustomizedSnackbars extends React.Component {
  state = {
    open: this.props.open,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
    });
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (e, reason) => {
    const { onClose } = this.props;
    if (onClose) {
      onClose(e, reason);
    }
    if (reason !== 'clickaway') {
      this.setState({ open: false });
    }
  };

  getSnackbarType = (type) => {
    if ((type === 'undo')) {
      return 'warning';
    } if (type === 'simple') {
      return 'info';
    }
    return type;
  }

  render() {
    const {
      classes, message, onUndo, vertical, horizontal,
    } = this.props;
    const { open } = this.state;
    const type = this.props.type || 'success';
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: vertical || 'bottom',
            horizontal: horizontal || 'right',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            classes={classes}
            message={message}
            variant={this.getSnackbarType(type)}
            type={type}
            onUndo={onUndo}
          />
        </Snackbar>
      </div>
    );
  }
}

export default CustomizedSnackbars;