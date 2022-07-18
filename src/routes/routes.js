// import React from 'react';
import HomePage from '../pages/HomePage/HomePage';
import JobsPage from '../pages/JobsPage/JobsPage';
import TypeJobsPage from '../pages/TypeJobsPage/TypeJobsPage';
import SubJobsPage from '../pages/SubJobsPage/SubJobsPage';
import DetailJobsPage from '../pages/DetailJobsPage/DetailJobsPage';

const router = [
    {
        name: 'home',
        path: '/',
        exact: true,
        component: HomePage,
    },
    {
        name: 'job lists',
        path: '/joblist',
        exact: true,
        component: JobsPage,
    },
    {
        name: 'type jobs',
        path: '/:mainTypeJobName',
        exact: true,
        component: TypeJobsPage,
    },
    {
        name: 'sub jobs',
        path: '/:mainTypeJobName/:id',
        exact: true,
        component: SubJobsPage,
    },
    {
        name: 'detail jobs',
        path: '/detail/subjob/:iddetail',
        exact: true,
        component: DetailJobsPage,
    }
];

export default router;