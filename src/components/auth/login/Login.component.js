import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from 'components/forms/auth/Login.form';
import AuthBase from '../base/AuthBase.component';

class Login extends Component {
  onSubmit = (values) => {
    this.props.login(values);
  }

  render() {
    return (
      <div>
        <AuthBase
          brandLogoBackgroundColor="#4580E6"
          formTitle="Good evening!"
          formSubtitle="It's good to see you back!"
          redirectQuestion="Don't you have a kunnect account?"
          redirectText="Sign up!"
          redirectURL="/register"
        >
          <LoginForm onSubmit={this.onSubmit} />
        </AuthBase>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

Login.defaultProps = {
};

export default Login;
