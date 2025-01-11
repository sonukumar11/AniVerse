import Login from "./Login";
import SignUp from './SignUp';
import styles from '../Styles/Components/LoginAndSignupPage.module.css';
import { useState } from "react";


export const LoginAndSignUpPage = ({}) => {

    const [isUserAuthenticated , setIsUserAuthenticated] = useState(false);


    return (
        <div className={styles.overlay}>
            <div className={styles.loginAndSignUpOverlayContainer}>
                <div className={styles.pageHeader}>
                    <p>Join the Anime Legion – Your Adventure Starts Here!</p>
                </div>
                <div className={styles.LoginAndSignUpPageContainer}>
                    <Login />
                    <SignUp />
                </div>
                <div className={styles.pageFooter}>
                    <p>Dive back into the world of your favorite anime , manga and much more! 🚀</p>
                </div>
            </div>
        </div>
    );
};

export default LoginAndSignUpPage;