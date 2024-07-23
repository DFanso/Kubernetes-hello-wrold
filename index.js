const express = require('express');
const mysql = require('mysql');
const redis = require('redis');
const app = express();
const port = 3000;

// MySQL configuration
const mysqlHost = process.env.MYSQL_HOST || 'localhost';
const mysqlUser = 'root';
const mysqlPassword = process.env.MYSQL_PASSWORD || 'root';
const mysqlDatabase = 'test';

// Redis configuration
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

// Create MySQL connection
const mysqlConnection = mysql.createConnection({
  host: mysqlHost,
  user: mysqlUser,
  password: mysqlPassword,
  database: mysqlDatabase
});

// Connect to MySQL
mysqlConnection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + mysqlConnection.threadId);
});

// Create Redis client
const redisClient = redis.createClient({
  host: redisHost,
  port: redisPort
});

// Connect to Redis
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World! Im in a Kube');
});

app.get('/mysql', (req, res) => {
  mysqlConnection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    res.send('MySQL says the solution is: ' + results[0].solution);
  });
});

app.get('/redis', (req, res) => {
  redisClient.set('key', 'value', redis.print);
  redisClient.get('key', (err, reply) => {
    if (err) throw err;
    res.send('Redis value for "key" is: ' + reply);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
