DROP DATABASE IF EXISTS appdb;
DROP DATABASE IF EXISTS appdb_test;
CREATE DATABASE appdb CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin;
CREATE DATABASE appdb_test CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin;
GRANT ALL ON appdb.* TO app@'%' IDENTIFIED BY 'password';
GRANT ALL ON appdb_test.* TO app@'%';
