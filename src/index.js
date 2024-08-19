
import express from 'express'
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
import routes  from './api/routes/index.js'
import database  from '../src/api/models/index.js';

const app = express();
const port = 3000;

database.sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

routes(app)

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

export default app;