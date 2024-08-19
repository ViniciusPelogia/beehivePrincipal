import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import Sequelize from 'sequelize';
import process from 'process';
import configFile from '../config/config.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const db = {};

console.log(env);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const loadModels = async () => {
  const files = fs.readdirSync(__dirname).filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' 
    );
  });


  for (const file of files) {

    const modelPath = pathToFileURL(path.join(__dirname, file)).href;
    const model = await import(modelPath);
    const modelName = model.default(sequelize, Sequelize.DataTypes).name;
    db[modelName] = model.default(sequelize, Sequelize.DataTypes);
  }

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

await loadModels();

export default db;
