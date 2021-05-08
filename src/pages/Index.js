import React from 'react'
import { 
  Switch,
  Route,
  Redirect, } from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Layout from '../components/Layout';
import useTrainee from '../hooks/useTrainee';
import Home from './Home';
import MyTournament from './MyTournament';
import MyTournaments from './MyTournaments';
import Profile from './Profile';
import Tournament from './Tournament';
import Tournaments from './Tournaments';
import Users from './Users';

const OnlyAdminroute = ({ children, ...rest }) => {
  const { info:{ admin } } = useTrainee();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}


const Index = () => {

  let location = useLocation();

  return (
    <Layout>   
      <Switch location={location} >
        <Route exact path="/">
          <Redirect to={{ pathname:'/home'}} />          
        </Route>
        <Route path="/home">          
          <Home />          
        </Route>
        <Route path="/perfil">
          <Profile />
        </Route> 
        <Route path="/torneos">
          <Tournaments />
        </Route> 
        <Route exact path="/mistorneos">
          <MyTournaments />
        </Route> 
        <Route path="/mistorneos/:id">
          <MyTournament />
        </Route> 
        <OnlyAdminroute path="/usuarios">
          <Users />
        </OnlyAdminroute> 
        <OnlyAdminroute path="/torneo">
          <Tournament />
        </OnlyAdminroute>              
      </Switch>
    </Layout>
  )
}

export default Index
