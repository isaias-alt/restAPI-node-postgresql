const e = require('express');
const { Pool } =  require('pg');
require('dotenv').config({path: '.env'});

const DB_PASS = process.env.DB_PASS

const pool = new Pool ({
  host: 'localhost',
  user: 'postgres',
  password: DB_PASS,
  database: 'firstapi',
  port: '5432'  
})

const getUsers = async (req, res) => {
  const response = await pool.query('SELECT * FROM users');
  res.status(200).json(response.rows);
}

const getUsersById = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  console.log("🚀 ~ file: index.controller.js ~ line 22 ~ getUsersById ~ response", response);
  res.json(response.rows);
}

const createUser = async (req, res) => {
  const { full_name, email } = req.body;
  const response = await pool.query('INSERT INTO users (full_name, email) VALUES ( $1, $2 )', [full_name, email]);
  console.log("🚀 ~ file: index.controller.js ~ line 27 ~ createUser ~ response", response)
  res.json({
    message: 'User added succesfully!',
    body: {
      user: {full_name, email}
    }
  })
}

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { full_name, email } = req.body;
  console.log(id, full_name, email);
  const response = await pool.query('UPDATE users SET full_name = $1, email = $2 WHERE id = $3', [full_name, email, id])
  console.log("🚀 ~ file: index.controller.js ~ line 44 ~ updateUser ~ response", response)
  res.json(`User ${ id } updated succesfully`)
}

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  console.log("🚀 ~ file: index.controller.js ~ line 41 ~ deleteUser ~ response", response);
  res.json(`User ${ id } deleted succesfully`);
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser
}