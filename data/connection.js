import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({path: '.env'});

// export const connection = new Sequelize({
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   dialect: "mysql",
// });
export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: "mysql",
});

(async()=>{
  await sequelize.authenticate()
  .then(()=>{
    console.log('Succesful Connection');
  })
  .catch(()=>{
    console.log('Connection Error');
  }) 
})();

// export default sequelize ;