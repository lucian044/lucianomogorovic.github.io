import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Resume from './components/Resume';

import './custom.min.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/resume' component={Resume} />
        <Route path='/accomplishments' component={FetchData} />
    </Layout>
);
