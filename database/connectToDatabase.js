import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('LoginRegister', 'postgres', 'PostgreeIrving', {
  host: 'localhost',
  dialect: 'postgres' 
});