import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup()
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route exact path='/' component={BurgerBuilder}/>
        <Redirect to='/' />
      </Switch>
    )

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route exact path='/' component={BurgerBuilder}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/checkout' component={Checkout}/>
          <Redirect to='/' />
        </Switch>
      )
    }
    return (
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
    );
  }
};

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
