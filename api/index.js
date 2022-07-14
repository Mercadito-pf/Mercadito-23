const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const connectionEmail = require("./src/helpers/conexionCorreos.js");
const { chargue } = require("./src/init/preChargueFile.js");
/**
 * @author Nicolas Alejandro Suarez
 */

connectionEmail()

conn.sync({ force: false }).then(async () => {  
  //await chargue();
  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
