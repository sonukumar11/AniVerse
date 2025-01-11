from fastapi import FastAPI
from routes.user import router as user_router
from routes.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

@app.get('/root')
def get_root():
    return {"message" : "Welcome to Aniverse"}


app.include_router(user_router)
app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. Replace "*" with specific domains for production.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)