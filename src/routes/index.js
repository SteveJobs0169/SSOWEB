import {lazy, Suspense} from 'react';
import {Navigate} from "react-router-dom";

const Login = lazy(() => import('../page/Login'));
const Home = lazy(() => import('../page/Home'));
const Admin = lazy(() => import('../page/Home/Admin'));
const Role = lazy(() => import('../page/Home/Role'));
const Web = lazy(() => import('../page/Home/Web'));
// const Button = lazy(() => import('../page/Button'));
// const Administrator = lazy( () => import('../page/Home/Administrator'));
// const Role = lazy(() => import('../page/Home/Role'));
// const RoleManage = lazy(() => import('../page/Home/RoleManage'));
// const Page = lazy(() => import('../page/Home/Page'));
const Fallback = () => <div>Loading...</div>;


const routes = [
    {
        path: "/",
        name: "Login",
        auth: false,
        element: <Suspense fallback={<Fallback/>}><Login/></Suspense>,
    },
    {
        path: "/login",
        name: "Login",
        auth: false,
        element: <Suspense fallback={<Fallback/>}><Login/></Suspense>,
    },
    {
        path: "/home",
        name: "Home",
        auth: false,
        element: <Suspense fallback={<Fallback/>}><Home/></Suspense>,
        children: [
            {
                path: "/home/admin",
                name: "Admin",
                auth: false,
                element: <Suspense fallback={<Fallback/>}><Admin/></Suspense>,
            },
            {
                path: "/home/role",
                name: "Role",
                auth: false,
                element: <Suspense fallback={<Fallback/>}><Role/></Suspense>,
            },
            {
                path: "/home/web",
                name: "Web",
                auth: false,
                element: <Suspense fallback={<Fallback/>}><Web/></Suspense>,
            },
        ]
    },
    {
        path: "/401",
        element: <div>无权限...</div>
    },
    {
        path: "/404",
        element: <div>404...</div>
    },
    {
        path: "*",
        element: <Suspense fallback={<Fallback/>}><Login/></Suspense>
    },
    {
        path: "*",
        element: <Navigate to="/404"></Navigate>
    },
]
export default routes;