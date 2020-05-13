import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import firebase from "../../firebase/Firebase-utils";
import { Link } from "react-router-dom";

class Resgister extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
  };

  isFormvalid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Please Fill in all fields" };
      this.setState({
        errors: errors.concat(error),
      });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({
        errors: errors.concat(error),
      });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password < 8 && passwordConfirmation < 8) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormvalid()) {
      this.setState({
        errors: [],
        loading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
          this.setState({
            loading: false,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(error),
          });
        });
    }
  };
  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  render() {
    const {
      username,
      email,
      passwordConfirmation,
      password,
      errors,
      loading,
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app cover">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="blue" textAlign="center">
            <Icon>
              <img src="./img/logo.png" style={{ maxWidth: "220px" }} />
            </Icon>
            <span style={{ color: "#fff" }}>Register for Iobird</span>{" "}
            DevChatTeam
          </Header>
          <Form size="large" onSubmit={this.handleSubmit} className="shadow">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                type="text"
                onChange={this.handleChange}
                value={username}
                className={this.handleInputError(errors, "username")}
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                type="email"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
              />

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                type="password"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(errors, "password")}
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="blue"
                fluid
                size="large"
              >
                Register
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message className="shadow">
            Alerady a user ? <Link to="/Login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Resgister;
