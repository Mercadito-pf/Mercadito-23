const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { chargue } = require("./src/init/preChargueFile.js");
const { Product } = require("./src/db");
/**
 * @author Nicolas Alejandro Suarez
 */
conn.sync({ force: false }).then(async () => {
  let products = await Product.findAll();
  if (!products) {
    await chargue();
  }
  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
