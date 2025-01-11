from datetime import timedelta , datetime
from time import struct_time

from fastapi import APIRouter , HTTPException , status
from config.connection import ExecuteStoredProcedure
from models.user_model import User , UserLogin , LoginResponse
from utils.formatters import hash_password , verify_password
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt
from fastapi.responses import JSONResponse


router = APIRouter(prefix = "/auth" , tags=["authentication"])

db  = ExecuteStoredProcedure()


SECRET_KEY = "d6d99561718e1aa500ffb754996c6c8c4fd724f4a1eac2c42a08bafebf2ce5a5"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def get_user_authenticated(email: str , password: str) :
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )

    try:
        stored_proc = {
            "name": 'GET_USER_DETAILS',
            "params": [
                email
            ]
        }

        result = db.execute(stored_proc)

        if result is None:
            return None

        hashed_password = result[0]['PASSWORD']
        if verify_password(password , hashed_password ):
            return result[0]
        return None
    except Exception as e:
        raise credentials_exception




def generate_JWT_token(email: str) -> str :
    access_token_expires = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token_payload = {
        'sub' : email,
        'exp' : access_token_expires
    }

    encoded_jwt = jwt.encode(token_payload , SECRET_KEY , algorithm = ALGORITHM)
    return encoded_jwt

@router.post('/login')
def is_user_auth(userLogin: UserLogin , response_model = LoginResponse):
    # Check if the user is authenticated
    user = get_user_authenticated(userLogin.email , userLogin.password)
    if user :
        token = generate_JWT_token(userLogin.email)

        if token is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Unable to generate token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return {
                "access_token": token,
                "token_type": "bearer",
                "user" : {
                    "username": user['USERNAME'],
                    "email" : user['EMAIL']
                }
            }

    # Invalid credentials
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )


@router.post('/signup')
def create_user(user: User):
    try:
        stored_proc = {
            "name": 'CREATE_USER_PROFILE',
            "params": [
                user.username,
                user.first_name,
                user.last_name,
                user.email,
                hash_password(user.password),
                user.gender.value,
            ]
        }

        # Call the execute method with the stored procedure
        results = db.insertUpdateOrDeleteQuery(stored_proc)

        if results:
            status = results["@status"]
            message = results["@message"]

            if status == 1:
                # If user created successfully, return 201 status with message
                return JSONResponse(
                    status_code=201,
                    content={"message": message}
                )
            else:
                # If status is not 1, return 200 with message (handle specific cases here)
                return JSONResponse(
                    status_code=200,
                    content={"message": message}
                )

        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while creating user profile: {str(e)}"
        )

    except Exception as e:
        # Handle exceptions by returning a 500 response
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while creating user profile: {str(e)}"
        )


# @router.post('/getUserDetails')
# def get_user_details()