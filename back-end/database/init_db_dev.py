import mysql.connector

from subprocess import Popen, PIPE
process = Popen(['mysql', 'newsletter', '-u', 'root'],
                stdout=PIPE, stdin=PIPE)
output = process.communicate(b'source ' + b'schema.sql')[0]

connection = mysql.connector.connect(
    user='root',
    unix_socket='/tmp/mysql.sock',
    database='newsletter',
)

# Create a cursor
cur = connection.cursor()

# Close the connection
connection.close()