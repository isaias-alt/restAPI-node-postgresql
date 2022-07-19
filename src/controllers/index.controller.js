const { Pool } =  require('pg');
require('dotenv').config();

const pool = new Pool ({
  host: 'localhost',
  user: 'postgres',
  password: '07102000',
  database: 'firstapi',
  port: '5432'  
})
const getUsers = async (req, res) =>{
  const response = await pool.query('SELECT * FROM users');
  res.status(200).json(response.rows);
}

module.exports = {
  getUsers
}