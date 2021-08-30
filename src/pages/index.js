import React, { lazy, Suspense } from 'react'
import { 
  Switch,
  Route,
  Redirect, } from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../components/Loading';
import useTrainee from '../hooks/useTrainee';

const Home = lazy( () => import('./Home') );
const MyTournament = lazy( () => import('./MyTournament') );
const MyTournaments = lazy( () => import('./MyTournaments') );
const Profile = lazy( () => import('./Profile') );
const Topics = lazy( () => import('./Topics') );
const Tournament = lazy( () => import('./Tournament') );
const Tournaments = lazy( () => import('./Tournaments') );
const Users = lazy( () => import('./Users') );
const Rules = lazy( () => import('./Rules') );
const Layout = lazy( () => import('../Layout') );

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
    <Suspense fallback={<Loading />}>
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
          <Route path="/reglas">
            <Rules />
          </Route> 
          <OnlyAdminroute path="/usuarios">
            <Users />
          </OnlyAdminroute> 
          <OnlyAdminroute path="/torneo">
            <Tournament />
          </OnlyAdminroute> 
          <OnlyAdminroute path="/tematicas">
            <Topics />
          </OnlyAdminroute>              
        </Switch>
      </Layout>
    </Suspense>
  )
}

export default Index
