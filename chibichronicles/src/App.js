import AnimeDashboard from './Components/AnimeDashboard.jsx';
import  MangaDashboard  from './Components/MangaDashboard.jsx';
import HomePage from './Components/HomePage.jsx';
import styles from './Styles/App.module.css';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import { Navbar } from './Components/Navbar.jsx';
import LoginAndSignUpPage from './Components/LoginAndSignupPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import BlogHomePage from './Components/BlogHomePage.jsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Layout from '../src/Components/Layout.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Use Layout as the parent route
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/anime', element: <AnimeDashboard /> },
      { path: '/manga', element: <MangaDashboard /> },
      { path: '/blog', element: <BlogHomePage /> },
    ],
  },
]);

function App() {
  const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const isUserAuthenticated = useSelector((state) => state.auth.isUserLoggedIn);

  return (
    <div className={styles.main}>
      <RouterProvider router={router} />
      <ToastContainer />
      {LoginModalIsOpen && !isUserAuthenticated && <LoginAndSignUpPage />}
    </div>
  );
}

export default App;
