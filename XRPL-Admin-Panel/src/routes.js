import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import { useSelector } from 'react-redux';
import SplashScareen from './components/SplashScareen';
import AddBlog from './pages/AddBlog';
import Payment from './pages/Payment';

// ----------------------------------------------------------------------

export default function Router() {
  const user = useSelector((e) => e.User.signedInUser);

  return useRoutes([
    {
      path: '/dashboard',
      element: user ? <DashboardLayout /> : <SplashScareen />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'payment', element: <Payment /> },
        { path: 'AddBlog', element: <AddBlog /> },
      ],
    },
    {
      path: '/',
      element: user === null ? <LogoOnlyLayout /> : <SplashScareen />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        // { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
