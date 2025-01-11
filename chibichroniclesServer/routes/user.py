from fastapi import APIRouter,HTTPException
from config.connection import ExecuteStoredProcedure

execute_stored_proc = ExecuteStoredProcedure()

router = APIRouter(prefix = "/auth" , tags=["users"])

@router.get('/user')
def get_user():
    return {"Message" : "This is the user John doe"}


@router.get("/users")
async def get_all_users():
    try:
        # Define the stored procedure call
        stored_proc = {
            "name": "GET_ALL_PROFILES",  # Stored Procedure Name
            "params": []  # No parameters needed for this example
        }

        # Execute stored procedure

        # print('The stored procedure is : ' , stored_proc)

        results = execute_stored_proc.execute(stored_proc)

        print('The results is : ' , results)

        # If no results, return 404
        if not results:
            raise HTTPException(status_code=404, detail="No user profiles found")

        return {"users": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")



