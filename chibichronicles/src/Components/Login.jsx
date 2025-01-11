import { use, useState } from 'react';
import styles from '../Styles/Components/Login.module.css';
import { isEmailValid , isPasswordValid } from '../Utils/validators';
import {toast} from 'react-toastify';
import { useRef  , useEffect} from 'react';
import { getUserDetails } from '../Query/userDetails';
import {useSelector , useDispatch} from 'react-redux';
import { userAuthentication } from '../Redux-Store/userAuthenticationSlice';



export const Login = () => {
    const dispach = useDispatch();

    const isUserLoggedIn = useSelector(state => state.auth.isUserLoggedIn);
    const userEmail = useSelector(state => state.auth.userEmail);
    const userName = useSelector(state => state.auth.username);


    const setUserLoggedIn = (isUserLoggedIn) => dispach(userAuthentication.setIsUserLoggedIn(isUserLoggedIn));
    const setUserEmail = (userEmail) => dispach(userAuthentication.setUserEmail(userEmail));
    const setUsername = (username) => dispach(userAuthentication.setUsername(username));


    useEffect(() => {
        console.warn('The value of isUserLoggedIn is : ' , isUserLoggedIn);
        console.warn('The value of userEmail is : ' , userEmail);
        console.warn('The value of username is : ' , userName);
    } , [isUserLoggedIn , userEmail , userName])

    const [email , setEmail] = useState('');
    const [emailHasError , setEmailHasError] = useState({
        isValid: true,
        error: null
    });
    const [password , setPassword] = useState('');
    const [passwordHasError , setPasswordHasError] = useState({
        isValid: true,
        error: null
    });

    const formRef = useRef();


    const resetAllStates = () => {
        const defaultErrorObject = {
            isValid: true,
            error: null
        };
        setEmail('');
        setEmailHasError(defaultErrorObject);
        setPassword('');
        setPasswordHasError(defaultErrorObject);

    }
    

    const emailInputOnChangeHandler = (event) => {
        const val = event.target.value;
        const validateEmail = isEmailValid(val);

        if(validateEmail.isValid){
            setEmail(val);
        }
        setEmailHasError(validateEmail);
    }

    const passwordInputOnChangeHandler = (event) => {
        const val = event.target.value;
        const validatePassword = isPasswordValid(val);

        if(validatePassword.isValid){
            setPassword(val);
        }
        setPasswordHasError(validatePassword);
    }

    const setupLocalStorage = (data) => {
        localStorage.setItem('ACCESS_TOKEN' , data.access_token);
        localStorage.setItem('IS_LOGGED_IN' , true);
        localStorage.setItem('USER' , data.user.username);
    };


    const saveUserDataInSlice = (data) => {
        setUserLoggedIn(true);
        setUserEmail(data.user.email);
        setUsername(data.user.username);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        toast.dismiss();

        const loadingToastId = toast.loading("Loggin In, please wait...", { autoClose: false , position: "top-center" });

        try{
            const user = {
                "email" : email,
                "password" : password
            }

            
            const response = await getUserDetails(user);

            if (response && response.status === 200) {

                toast.update(loadingToastId, { 
                    render: "Welcome : " + response.data.user.username, 
                    type: "success", 
                    autoClose: 8000, 
                    position: "top-center" ,
                    isLoading: false
                });

                setupLocalStorage(response.data);

                saveUserDataInSlice(response.data);

                formRef.current.reset();
                resetAllStates();

                

            } else {
                // Show error toast in case of failure
                toast.update(loadingToastId, { 
                    render: "Incorrect username or password", 
                    type: "error", 
                    autoClose: 8000, 
                    position: "top-center" ,
                    isLoading: false
                });
            }
        }
        catch(error){
            console.warn(error);
            if(error.status === 401){
                toast.update(loadingToastId, { 
                    render: "Incorrect username or password", 
                    type: "error", 
                    autoClose: 8000, 
                    position: "top-center" ,
                    isLoading: false
                });
            }
            else{
                toast.update(loadingToastId, { 
                    render: "Something went wrong", 
                    type: "error", 
                    autoClose: 8000, 
                    position: "top-center" ,
                    isLoading: false
                });
            }
        }
    }


    return (
        <div className={styles.LoginFormContainer}>
            <div className={styles.loginLabelContainer}>Log In</div>
            <form ref={formRef} onSubmit={submitHandler}>
                <div class="form-group" className={styles.inputContainer}>
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" aria-invalid={!emailHasError.isValid}  required onChange={emailInputOnChangeHandler}/>
                    {!emailHasError.isValid && <p className={styles.errorParagraphTag}>{emailHasError.error}</p>}
                </div>
                <div class="form-group" className={styles.inputContainer}>
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required onChange={passwordInputOnChangeHandler}/>
                    {!passwordHasError.isValid && <p className={styles.errorParagraphTag} >{passwordHasError.error}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <button type="submit" class="btn btn-primary" disabled={!emailHasError.isValid || !passwordHasError.isValid}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Login;