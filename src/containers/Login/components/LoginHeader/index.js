import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default class LoginHeader extends Component {
	render() {
		return (
			<div className="loginHeader">
				<Link to="/" className="loginHeader__back" />
				<div className="loginHeader__title">账号秘密登录</div>
			</div>
		);
	}
}
