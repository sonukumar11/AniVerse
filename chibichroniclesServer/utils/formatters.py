import bcrypt

def hash_password(plain_password: str) -> str:
    encoded_plain_password = plain_password.encode('utf-8')

    random_salt = bcrypt.gensalt()

    hashed_password = bcrypt.hashpw(encoded_plain_password , random_salt)
    decoded_hashed_password = hashed_password.decode('utf-8')

    return decoded_hashed_password

def verify_password(plain_password : str, hashed_password: str) -> bool:
    plain_password_bytes = plain_password.encode('utf-8')
    hashed_password_bytes = hashed_password.encode('utf-8')

    return bcrypt.checkpw(plain_password_bytes , hashed_password_bytes)