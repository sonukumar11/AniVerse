import styles from '../Styles/Components/SignUp.module.css';
import { useEffect, useState } from 'react';
import { isPasswordValid , isEmailValid  , isNameValid  , isUserNameValid , isGenderValid} from '../Utils/validators';
import {createUser} from '../Query/userDetails';
import {toast} from 'react-toastify';
import { useRef } from 'react';

export const SignUp = ({}) => {
    const [firstName , setFirstName] = useState('');
    const [firstNameHasError , setFirstNameHasError] = useState({
        isValid: true,
        error: null
    });
    const [lastName , setLastName] = useState('');
    const [lastNameHasError , setLastNameHasError] = useState({
        isValid: true,
        error: null
    });
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
    const [username , setUsername] = useState('');
    const [usernameHasError , setUsernameHasError] = useState({
        isValid: true,
        error: null
    });
    const [gender , setGender] = useState('');
    const [genderHasError , setGenderHasError] = useState({
        isValid: true,
        error: null
    });

    const [buttonDisabled , setButtonDisabled] = useState(false);

    const formRef = useRef();

    useEffect(() => {
        setButtonDisabled(!firstNameHasError.isValid || !lastNameHasError.isValid || !emailHasError.isValid || !passwordHasError.isValid || !usernameHasError.isValid || !genderHasError.isValid);
    } , [firstNameHasError , lastNameHasError , emailHasError ,  passwordHasError , usernameHasError , genderHasError])

    const fisrtNameChangeHandler = (event) => {
        const val = event.target.value;
        const validateName = isNameValid(val);
        if(validateName.isValid){
            setFirstName(val);
        }
        setFirstNameHasError(validateName);
    }

    const lastNameChangeHandler = (event) => {
        const val = event.target.value;
        const validateName = isNameValid(val);
        if(validateName.isValid){
            setLastName(val);
        }
        setLastNameHasError(validateName);
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

    const usernameChangeHandler = (event) => {
        const val = event.target.value;
        const validateUserName = isUserNameValid(val);

        if(validateUserName.isValid){
            setUsername(val);
        }

        setUsernameHasError(validateUserName);
    }

    const genderChangeHandler = (event) => {
        const val = event.target.value;
        const validateGender = isGenderValid(val);
        if(validateGender.isValid){
            setGender(val);
        }
        setGenderHasError(validateGender);
    }

    const resetAllStates = () => {
        const defaultErrorObject = {
            isValid: true,
            error: null
        };
        setFirstName('');
        setFirstNameHasError(defaultErrorObject);
        setLastName('');
        setLastNameHasError(defaultErrorObject);
        setUsername('');
        setUsernameHasError(defaultErrorObject);
        setEmail('');
        setEmailHasError(defaultErrorObject);
        setPassword('');
        setPasswordHasError(defaultErrorObject);
        setButtonDisabled(false);
        setGender('');
        setGenderHasError(defaultErrorObject);
    }


    const createAccountButtonClickHandler = async (e) => {

        e.preventDefault();

        const validateFirstName = isNameValid(firstName.trim());
        setFirstNameHasError(validateFirstName);
        const validateLastName = isNameValid(lastName.trim());
        setLastNameHasError(validateLastName);
        const validateEmail = isEmailValid(email.trim());
        setEmailHasError(validateEmail);
        const validatePassword = isPasswordValid(password.trim());
        setPasswordHasError(validatePassword);
        const validateUsername = isUserNameValid(username.trim());
        setUsernameHasError(validateUsername);
        const validateGender = isGenderValid(gender.trim());
        setGenderHasError(validateGender);

        if(!validateFirstName.isValid || !validateLastName.isValid  || !validateEmail.isValid || !validatePassword.isValid || !validateUsername.isValid || !validateGender.isValid){
            return;
        }
        else{
            const userDetails = {
                "username" : username,
                "first_name" : firstName,
                "last_name" : lastName,
                "gender" : gender,
                "email" : email,
                "password" : password
            }

            toast.dismiss();

            const loadingToastId = toast.loading("Creating User Profile, please wait...", { autoClose: false , position: "top-center" });
            
            try{
                const response = await createUser(userDetails);
            
                if (response && response.status === 201) {

                    toast.update(loadingToastId, { 
                        render: "Your profile has been created! You can now log in.", 
                        type: "success", 
                        autoClose: 8000, 
                        position: "top-center" ,
                        isLoading: false
                    });

                    formRef.current.reset();
                    resetAllStates();

                } else {
                    // Show error toast in case of failure
                    toast.update(loadingToastId, { 
                        render: response.data.message, 
                        type: "error", 
                        autoClose: 8000, 
                        position: "top-center" ,
                        isLoading: false
                    });
                }
            }
            catch(error){
                toast.update(loadingToastId, { 
                    render: "Something went wrong !", 
                    type: "error", 
                    autoClose: 8000, 
                    position: "top-center" ,
                    isLoading: false
                });
            }
            
        }
    }

    return (
        <div className={styles.signupFormContainer}>
            <div className={styles.createAccountDiv}>Create Account</div>
            <form ref={formRef} onSubmit={createAccountButtonClickHandler}>
                <div class="form-row" className={styles.InputContainer}>
                    <div class="form-group col-md-6">
                        <label for="firstName">First Name</label>
                        <input type="text" class="form-control" id="firstName" placeholder="First Name" required onChange={fisrtNameChangeHandler}/>
                        {!firstNameHasError.isValid && <span className={styles.errorParagraphTag} >{firstNameHasError.error}</span>}
                    </div>
                    <div class="form-group col-md-6">
                        <label for="lastName">Last Name</label>
                        <input type="text" class="form-control" id="lastName" placeholder="Last Name" required onChange={lastNameChangeHandler}/>
                        {!lastNameHasError.isValid && <span className={styles.errorParagraphTag} >{lastNameHasError.error}</span>}
                    </div>
                </div>
                <div class="form-row" className={styles.InputContainer}>
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Email</label>
                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email" required  onChange={emailInputOnChangeHandler}/>
                        {!emailHasError.isValid && <span className={styles.errorParagraphTag} >{emailHasError.error}</span>}
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputPassword4">Password</label>
                        <input type="password" class="form-control" id="inputPassword4" placeholder="Password" required onChange={passwordInputOnChangeHandler}/>
                        {!passwordHasError.isValid && <span className={styles.errorParagraphTag} >{passwordHasError.error}</span>}
                    </div>
                </div>
                <div class="form-row" className={styles.InputContainer}>
                    <div class="form-group col-md-6">
                        <label for="username">Username</label>
                        <input type="text" class="form-control" id="username" placeholder='Username' required onChange={usernameChangeHandler}/>
                        {!usernameHasError.isValid && <span className={styles.errorParagraphTag} >{usernameHasError.error}</span>}
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputState">Gender</label>
                        <select id="inputState" class="form-control" required onChange={genderChangeHandler}>
                            <option selected>Choose...</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                            <option>Prefer Not to Say</option>
                        </select>
                        {!genderHasError.isValid && <span className={styles.errorParagraphTag} >{genderHasError.error}</span>}
                    </div>
                </div>
                <div class="form-group" className={styles.InputContainer}>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck" required/>
                        <label class="form-check-label" for="gridCheck">
                            I agree to the terms and conditions.
                        </label>
                    </div>
                </div>
                <div className={styles.InputContainer}>
                    <button type="submit" class="btn btn-primary" disabled={buttonDisabled} >Create Account</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;