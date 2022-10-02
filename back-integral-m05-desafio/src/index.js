const app = require('./servidor');


const port = 8000;
app.listen(process.env.PORT || port, () => console.log(`Servidor rodando no link http://localhost:${port}`));