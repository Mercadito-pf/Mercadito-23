const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { chargue } = require("./src/init/preChargueFile.js");
const { Place } = require("./src/db");
/**
 * @author Nicolas Alejandro Suarez
 */
conn.sync({ force: true }).then(async () => {
  let places = await Place.findAll();
  if (!places) {
    await chargue();
  }
  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
