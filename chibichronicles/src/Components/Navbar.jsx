import LoginIcon from '../Static/Images/profile.png';
import styles from '../Styles/Components/Navbar.module.css';
import {Link} from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { userAuthSlice } from '../Redux-Store/userAuthenticationSlice';


export const Navbar = ({setModalOpen}) => {

    const isUserLoggedIn = useSelector(state => state.auth.isUserLoggedIn);
    const userName = useSelector(state => state.auth.username);
    const userEmail = useSelector(state => state.auth.userEmail);

    const loginButtonClickHandler = () => {

    }

    return (
        // <div className={styles.navbarContainer}>
            <nav class="navbar navbar-expand-lg sticky-top  navbar-dark bg-dark">
                <a class="navbar-brand" href="#" className={styles.websiteTitleAnchor} style={{marginLeft: '1rem' , fontWeight: 'bold'}}>AniVerse</a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent" className={styles.WholeLinksAndButtonsConatiner}>
                    <ul class="navbar-nav mr-auto" className={styles.unorderedListContainer}>
                        <li class="nav-item active" style={{alignContent: 'center'}}>
                            <Link to={"/"} style={{ textDecoration: 'none' , color: 'gray' }}>Home</Link>
                            {/* <a class="nav-link" href="/">Home </a> */}
                        </li>
                        <li class="nav-item active" style={{alignContent: 'center'}}>
                            <Link to={"/anime"} style={{ textDecoration: 'none' , color: 'gray' }}>Anime</Link>
                            {/* <a class="nav-link" href="/anime">Anime</a> */}
                        </li>
                        <li class="nav-item active" style={{alignContent: 'center'}}>
                            <Link to={"/manga"} style={{ textDecoration: 'none'  , color: 'gray'}}>Manga</Link>
                            {/* <a class="nav-link" href="/manga">Manga</a> */}
                        </li>
                        <li class="nav-item active" style={{alignContent: 'center'}}>
                            <Link to={"news"} style={{ textDecoration: 'none'  , color: 'gray'}}>News</Link>
                            {/* <a class="nav-link" href="/news">News</a> */}
                        </li>
                        <li class="nav-item active" style={{alignContent: 'center'}}>
                            <Link to={"/blog"} style={{ textDecoration: 'none' , color: 'gray' }}>Blog</Link>
                            {/* <a class="nav-link" href="/blog">Blog</a> */}
                        </li>
                        <li class="nav-item active" style={{alignContent: 'center'}}>
                            <Link to={"/contribute"} style={{ textDecoration: 'none' , color: 'gray' }}>Contribute</Link>
                            {/* <a class="nav-link" href="/blog">Contribute</a> */}
                        </li>
                    </ul>
                    <div className={styles.rightSideLoginAndSearchConatiner}>
                        <form class="form-inline my-2 my-lg-0" className={styles.searchFormContainer}>
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <div className={styles.loginLogoutContainer}>
                            <img src={LoginIcon} alt="Log in icon" />
                            {!isUserLoggedIn && <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={loginButtonClickHandler}>Log in</button>}
                            {isUserLoggedIn && <div className={styles.userNameContainer}>{userName}</div>}
                        </div>
                    </div>
                </div>
            </nav>
        // </div>
    );
}