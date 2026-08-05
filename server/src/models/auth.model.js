const pool = require("../config/db");

/**
 * Find a user by email
 */


const findUserByEmail = async (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [email]);
  return rows[0];
};



/**
 * Find a user by phone
 */



const findUserByPhone = async (phone) => {
  const query = `
    SELECT *
    FROM users
    WHERE phone = $1
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [phone]);
  return rows[0];
};





/**
 * Create a new user
 */



const createUser = async ({
  roleType,
  email,
  phone,
  passwordHash,
}) => {
  const query = `
    INSERT INTO users (
      role_type,
      email,
      phone,
      password_hash
    )
    VALUES ($1, $2, $3, $4)
    RETURNING
      id,
      role_type,
      email,
      phone,
      created_at;
  `;

  const values = [
    roleType,
    email,
    phone,
    passwordHash,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};






module.exports = {
  findUserByEmail,
  findUserByPhone,
  createUser,
};