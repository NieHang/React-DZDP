import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorToast from '../../components/ErrorToast';
import { getError } from '../../redux/modules/app';
import { actions as appActions } from '../../redux/modules/app';
import { bindActionCreators } from 'redux';
import AsyncComponent from '../../utils/AsyncComponent'

const Home = AsyncComponent(() => import('../Home'));
const ProductDetail = AsyncComponent(() => import('../ProductDetail'));
const Search = AsyncComponent(() => import('../Search'));
const SearchResult = AsyncComponent(() => import('../SearchResult'));
const Login = AsyncComponent(() => import('../Login'));
const PrivateRouter = AsyncComponent(() => import('../PrivateRouter'));
const User = AsyncComponent(() => import('../User'));
const Purchase = AsyncComponent(() => import('../Purchase'));

class App extends Component {
	render() {
		const {
			error,
			appActions: { clearError }
		} = this.props;
		return (
			<div className="App">
				<Router basename='/react_dzdp'>
					<Switch>
						<Route path="/login" component={Login} />
						<PrivateRouter path="/user" component={User} />
						<Route path="/detail/:id" component={ProductDetail} />
						<Route path="/search" component={Search} />
						<Route path="/search_result" component={SearchResult} />
						<PrivateRouter path="/purchase/:id" component={Purchase} />
						<Route path="/" component={Home} />
					</Switch>
				</Router>
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
