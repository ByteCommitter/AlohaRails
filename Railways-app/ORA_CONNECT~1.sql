CREATE USER c##hr IDENTIFIED BY "hr" DEFAULT TABLESPACE users QUOTA UNLIMITED ON users;
GRANT resource, connect, create table, create session TO c##hr;