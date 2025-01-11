from pydantic import BaseModel, EmailStr , field_validator , Field
from enum import Enum


class GenderEnum(str , Enum):
    male="Male"
    female="Female"
    other="Other"
    prefer_not_to_say="Prefer Not to Say"


class User(BaseModel):
    username: str = Field(... , min_length = 1 , max_length=20)
    first_name: str = Field(... , min_length = 1 , max_length = 50)
    last_name: str = Field(... , min_length = 1 , max_length = 50)
    gender: GenderEnum
    email: EmailStr = Field(... , min_length = 1 , max_length = 40)
    password: str = Field(... , min_length = 7 , max_length = 20)

    @field_validator('first_name' , mode='after')
    @classmethod
    def validate_first_name(cls , value: str) -> str:
        if not value.isalpha():
            raise ValueError('First Name Should be alphanumeric')
        return value

    @field_validator('last_name' , mode='after')
    @classmethod
    def validate_last_name(cls , value : str) -> str:
        if not value.isalpha():
            raise ValueError('Last Name Should be alphanumeric')
        return value


class UserLogin(BaseModel):
    email: EmailStr = Field(... , min_length = 1 , max_length = 20)
    password: str = Field(... , min_length=7 , max_length=20)

class UserLoginResponse(BaseModel):
    username: str
    email: str

class LoginResponse(BaseModel):
    access_token : str
    token_type: str
    user : UserLoginResponse







