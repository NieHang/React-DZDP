import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorToast from '../../components/ErrorToast';
import './style.css';
import { getError } from '../../redux/modules/app';
import { actions as appActions } from '../../redux/modules/app';
import { bindActionCreators } from 'redux';

import Home from '../Home';

class App extends Component {
  render() {
    const {
      error,
      appActions: { clearError }
    } = this.props;
    return (
      <div className='App'>
        <Home />
        {error ? <ErrorToast msg={error} clearError={clearError} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  error: getError(state)
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
