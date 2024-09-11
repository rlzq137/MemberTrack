import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import MemberList from './components/MemberList';
import MemberProfile from './components/MemberProfile';
import SearchMember from './components/SearchMember';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import AdminDashboard from './components/AdminDashboard';
import MemberDashboard from './components/MemberDashboard';

const AppRoutes = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/members" component={MemberList} />
        <Route path="/profile" component={MemberProfile} />
        <Route path="/search" component={SearchMember} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/settings" component={Settings} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/members" component={MemberDashboard} />
    </Switch>
);

export default AppRoutes;
