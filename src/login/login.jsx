import React, { Component } from "react";
import "./login.css";
//import AppBar from 'material-ui/AppBar';
//import {  Grid, } from 'material-ui';
//import {  RegularCard, Button, CustomInput, ItemGrid} from '../../components';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import { bindActionCreators } from "redux";
//import { alert } from '../../reducers/alertReducer';
import {
    Dropdown,
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
    Icon,
} from "semantic-ui-react";
import logo from "../../image/logosignin.png";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            resetmail: "",
            username: "",
            reset: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        } else {
            if (!password)
                dispatch({
                    type: "USERS_LOGIN_FAILURE",
                    error: { message: "Oops! void Password  " },
                });
            if (!username)
                dispatch({
                    type: "USERS_LOGIN_FAILURE",
                    error: { message: "Oops! void Email  " },
                });
        }
    }
    handleReset() {
        const { resetmail } = this.state;
        const { dispatch } = this.props;
        if (resetmail) {
            dispatch(userActions.reset(resetmail));
        } else {
            dispatch({ type: "USERS_RESET_FAILURE", message: "Oops! void Email " });
        }
    }
    render() {
        let user = JSON.parse(localStorage.getItem("user"));
        const initialState = user ? { loggedIn: true } : {};
        const { loggingIn } = this.props;
        const { username, password, submitted, resetmail } = this.state;
        var stateOptions = [
            {
                key: "admin@iobird.com",
                value: "admin@iobird.com",
                text: "Admin Test",
            },
            {
                key: "admin@iobird.com",
                value: "admin@iobird.com",
                text: "Admin Prod",
            },
        ];
        if (initialState.loggedIn)
            return (
                <Redirect
                    to={{
                        pathname: "/home",
                        state: { from: this.props.location },
                    }}
                />
            );

        //console.log(loggingIn)
        if (loggingIn) {
        }

        return (
            <div>
                {/* <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 ">
              <form onSubmit={this.handleSubmit} >
              
              <img className="m-b-10 m-t-40"   style={{marginTop:40,marginBottom:10}} src="images/menutium.png"  />
              <h3 >Administration Control Panel</h3>
                <div
                  className="wrap-input100 validate-input m-t-65 m-b-20"
                  style={{marginTop:65,marginBottom:20}}
                  data-validate="Enter username"
                >
                  <input placeholder="Email"  value={this.state.username} className="input100" type="text" name="username" onChange={this.handleChange} />
                  
                </div>
                <div
                  className="wrap-input100 validate-input m-b-35"
                  style={{marginBottom:35}}
                  data-validate="Enter password"
                >

                  <input placeholder="Password" value={password}
              onChange={this.handleChange} className="input100" type="password" name="password" />

                  
                </div>
                <div  className="container-login100-form-btn">
                  <button type='submit' className="login100-form-btn">Login</button>
                </div>
               
              </form>
              <br/>
              <div style={{marginTop:10}} >  ©2019 <a href="https://menutium.iobird.com/" target="iobird">Menutium</a> by <a href="https://www.iobird.com/" target="iobird2">Iobird</a></div>
          
            </div>
          </div>
    </div>*/}
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-t-85 p-b-20">
                            <form
                                className="login100-form validate-form"
                                onSubmit={this.handleSubmit}
                            >
                                <span className="login100-form-title p-b-70">
                                    Welcome to <br />
                                    <span style={{ color: "rgb(239, 139, 6)" }}>
                                        menutium <br />{" "}
                                    </span>{" "}
                  Super admin
                </span>
                                <span className="login100-form-avatar">
                                    <img src="/images/logo/menutium-logo.png" />
                                </span>
                                <div
                                    className="wrap-input100 validate-input m-t-85 m-b-35"
                                    data-validate="Enter username"
                                >
                                    <input
                                        className="input100"
                                        type="text"
                                        name="username"
                                        placeholder="Email"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div
                                    className="wrap-input100 validate-input m-b-50"
                                    data-validate="Enter password"
                                >
                                    <input
                                        className="input100"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="container-login100-form-btn">
                                    <button type="submit" className="login100-form-btn" style={{ cursor: "pointer" }}>
                                        Login
                  </button>
                                </div>
                                <ul className="login-more p-t-190">
                                    <li className="m-b-8">
                                        <span className="txt1">
                                            Copyrights © 2017-2020 made By{" "}
                                        </span>
                                        <a
                                            href="https://www.iobird.com/"
                                            target="_blank"
                                            className="txt2"
                                        >
                                            Iobird
                    </a>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, error, loggedIn } = state.authentication;
    return {
        error,
        loggedIn,
    };
}

export default connect(mapStateToProps)(Login);
