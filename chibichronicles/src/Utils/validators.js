export const isNameValid = (name) => {
    if(!name || typeof name !== "string") {
        return {
            isValid: false , 
            error: "Name is Required"
        }
    }

    //Check for minimum length and maximum length
    if(name.length < 1){
        return {
            isValid: false,
            error: "Name must be at least 1 character long."
        }
    }

    if(name.length > 50){
        return {
            isValid: false,
            error: "Name must not exceed 50 characters."
        }
    }

    const alphabetRegex = /^[A-Za-z]+$/;
    if (!alphabetRegex.test(name)) {
        return {
            isValid: false,
            error: "Name must contain only alphabets."
        };
    }

    // If all checks pass
    return {
        isValid: true,
        error: null
    };
}

export const isEmailValid = (email) => {
    if (!email || typeof email !== "string") {
        return {
            isValid: false,
            error: "Email is required."
        };
    }

    // Check for minimum and maximum length
    if (email.length < 1) {
        return {
            isValid: false,
            error: "Email must be at least 1 character long."
        };
    }

    if (email.length > 40) {
        return {
            isValid: false,
            error: "Email must not exceed 40 characters."
        };
    }

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            error: "Invalid email format. Please provide a valid email."
        };
    }

    // If all checks pass
    return {
        isValid: true,
        error: null
    };
}

export const isPasswordValid = (password) => {
    // Check if the input is provided and is a string
    if (!password || typeof password !== "string") {
        return {
            isValid: false,
            error: "Password is required."
        };
    }

    // Check for minimum and maximum length
    if (password.length < 7) {
        return {
            isValid: false,
            error: "Password must be at least 7 characters long."
        };
    }

    if (password.length > 20) {
        return {
            isValid: false,
            error: "Password must not exceed 20 characters."
        };
    }

    // Check for at least one uppercase letter
    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) {
        return {
            isValid: false,
            error: "Password must contain at least one uppercase letter."
        };
    }

    // Check for at least one special character
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!hasSpecialChar) {
        return {
            isValid: false,
            error: "Password must contain at least one special character."
        };
    }

    // If all checks pass
    return {
        isValid: true,
        error: null
    };

}

export const isUserNameValid = (username) => {
    if (!username || typeof username !== "string") {
        return {
            isValid: false,
            error: "Username is required and must be a valid string."
        };
    }

    // Check for minimum length
    if (username.length < 1) {
        return {
            isValid: false,
            error: "Username must be at least 1 character long."
        };
    }

    // Check for maximum length
    if (username.length > 20) {
        return {
            isValid: false,
            error: "Username must not exceed 20 characters."
        };
    }

    // If all checks pass
    return {
        isValid: true,
        error: null
    };
}

export const isGenderValid = (gender) => {
    // Define the valid gender options
    const validGenders = ["Male", "Female", "Other", "Prefer Not to Say"];
    
    // Check if the input is provided and is a string
    if (!gender || typeof gender !== "string") {
        return {
            isValid: false,
            error: "Gender is required and must be a valid string."
        };
    }

    // Check if the input is one of the valid options
    if (!validGenders.includes(gender)) {
        return {
            isValid: false,
            error: `Invalid gender. Valid options are: ${validGenders.join(", ")}.`
        };
    }

    // If all checks pass
    return {
        isValid: true,
        error: null
    };
}