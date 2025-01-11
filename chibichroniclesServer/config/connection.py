from typing import List, Dict
import mysql.connector

class ExecuteStoredProcedure:

    def __init__(self):
        self.pool = mysql.connector.pooling.MySQLConnectionPool(
                pool_name='mypool',
                pool_size=5,
                host='localhost',
                user='root',
                password='Secure@123',
                database='AniVerse',
            )

    def execute(self, stored_proc: Dict) -> List[Dict]:
        # Establish the raw connection
        try:
            con = self.pool.get_connection()
            cxn = con.cursor(dictionary=True)  # Use dictionary=True to get results as dictionaries
            stored_proc_name = stored_proc["name"]
            params = stored_proc.get("params", [])
            query = f"CALL {stored_proc_name}({','.join(['%s' for _ in range(len(params))])})"
            cxn.execute(query, params)
            results = []
            rows = cxn.fetchall()
            print('The Rows are : ' , rows)
            for row in rows:
                uppercase_row = {key.upper(): value for key, value in row.items()}
                results.append(uppercase_row)

            return results

        except mysql.connector.Error as e:
            print(f"An error occurred: {e}")
            return []

    def insertUpdateOrDeleteQuery(self, stored_proc: Dict) -> List[Dict]:
        # Establish the raw connection
        try:

            print('The stored proc is : ' , stored_proc)

            con = self.pool.get_connection()
            cxn = con.cursor(dictionary=True)  # Use dictionary=True to get results as dictionaries

            stored_proc_name = stored_proc["name"]
            params = stored_proc.get("params", [])

            # Prepare the query to call the stored procedure
            query = f"CALL {stored_proc_name}({','.join(['%s' for _ in range(len(params))])}, @status, @message)"

            # Execute the stored procedure
            cxn.execute(query, params)

            # Now fetch the OUT parameters using a separate query
            cxn.execute("SELECT @status, @message")
            results = cxn.fetchone()

            con.commit()

            # Return the status and message as a list of dictionaries
            return results

        except mysql.connector.Error as e:
            con.rollback()
            print(f"An error occurred: {e}")
            return []











