const {createPlace, findNameOrCreate, findName } = require('../routes/place/placeDao.js');
const {createSize} = require('../routes/size/sizeDao.js');
const {createUser} = require('../routes/user/userDao.js');
const {findNameOrCreateCategory} = require("../routes/category/categoryDao.js");
const { createProduct } = require('../routes/product/productDao.js');

const axios = require('axios');
//https://www.datos.gov.co/resource/xdk5-pm3f.json
//https://apis.datos.gob.ar/georef/api/provincias
//https://apis.datos.gob.ar/georef/api/municipios?provincia=14&campos=nombre&max=428

/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */

/**
 * this method reads apis and preloads the information is 
 * temporary while the database is just filled and the "force" becomes false.
 */

let users = [
    {
        name: 'nicolas',
        lastname: 'suarez',
        password: '2jmk3218',
        dni: '1049653787',
        profile_picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_675923-MCO45458200511_042021-F.webp',
        email: '2jmk3218@gmail.com',
        phone: '3177833860',
        typeUser: 'N',
        address: 'cra 2a este #4a-13',
        place: 'tunja'
    },
    {
        name: 'alejandro',
        lastname: 'suarez',
        password: '2jmk3218',
        dni: '1049653787',
        profile_picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_675923-MCO45458200511_042021-F.webp',
        email: '2jmk3218@gmail.com',
        phone: '3177833860',
        typeUser: 'N',
        address: 'cra 2a este #4a-13',
        place: 'tunja'
    },
    {
        name: 'isaac',  
        lastname: 'suarez',
        password: '2jmk3218',
        dni: '1049653787',
        profile_picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_675923-MCO45458200511_042021-F.webp',
        email: '2jmk3218@gmail.com',
        phone: '3177833860',
        typeUser: 'N',
        address: 'cra 2a este #4a-13',
        place: 'tunja'
    },
    {
        name: 'andres',
        lastname: 'suarez',
        password: '2jmk3218',
        dni: '1049653787',
        profile_picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_675923-MCO45458200511_042021-F.webp',
        email: '2jmk3218@gmail.com',
        phone: '3177833860',
        typeUser: 'N',
        address: 'cra 2a este #4a-13',
        place: 'tunja'
    },
    {
        name: 'zacarias',  
        lastname: 'suarez',
        password: '2jmk3218',
        dni: '1049653787',
        profile_picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_675923-MCO45458200511_042021-F.webp',
        email: '2jmk3218@gmail.com',
        phone: '3177833860',
        typeUser: 'N',
        address: 'cra 2a este #4a-13',
        place: 'tunja'
    },
    {
        name: 'david', 
        lastname: 'suarez',
        password: '2jmk3218',
        dni: '1049653787',
        profile_picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_675923-MCO45458200511_042021-F.webp',
        email: '2jmk3218@gmail.com',
        phone: '3177833860',
        typeUser: 'N',
        address: 'cra 2a este #4a-13',
        place: 'tunja'
    },
    {
        name: 'santiago', 
        lastname: 'suarez',
        password: '2jmk3218',
        dni: '1049653787',
        profile_picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_675923-MCO45458200511_042021-F.webp',
        email: '2jmk3218@gmail.com',
        phone: '3177833860',
        typeUser: 'N',
        address: 'cra 2a este #4a-13',
        place: 'tunja'
    },
    {
        name: 'daniel', 
        lastname: 'suarez',
        password: '2jmk3218',
        dni: '1049653787',
        profile_picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_675923-MCO45458200511_042021-F.webp',
        email: '2jmk3218@gmail.com',
        phone: '3177833860',
        typeUser: 'N',
        address: 'cra 2a este #4a-13',
        place: 'tunja'
    },
    {
        name: 'cristina', 
        lastname: 'suarez',
        password: '2jmk3218',
        dni: '1049653787',
        profile_picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_675923-MCO45458200511_042021-F.webp',
        email: '2jmk3218@gmail.com',
        phone: '3177833860',
        typeUser: 'N',
        address: 'cra 2a este #4a-13',
        place: 'tunja'
    }
]

  const categories = [
    {
      name: "Deporte",
      subcategories: ["futbol", "box", "basquetbol"],
    },
    {
      name: "Tecnologia",
      subcategories: ["computacion", "videojuegos", "dispositivos"],
    },
    {
      name: "Hogar",
      subcategories: ["calefaccion", "cocina", "muebles", "familiar"],
    },
    {
      name: "Moda",
      subcategories: ["hombre", "mujer", "niño", "unisex"], 
    },
  ];
const chargue = async() =>{
    try {
        let sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
        //Crear lugares
        let col = await createPlace('colombia', null);
        let arg = await createPlace('argentina', null);
        //let per = await createPlace('peru', null); //solo si carla copera
        let chargeCOL = await axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json'); //deparamentos y ciudades
        chargeCOL = chargeCOL.data;
        for(let i = 0; i<chargeCOL.length; i++){
            await findNameOrCreate(chargeCOL[i].departamento, col.dataValues.id) //departamentos
        }
        for(let i = 0; i<chargeCOL.length; i++){
            let e = await findName(chargeCOL[i].departamento);
            await findNameOrCreate(chargeCOL[i].municipio, e.dataValues.id); //ciudad
        } 
        let chargeArg = await axios.get('https://apis.datos.gob.ar/georef/api/provincias'); //provicias
        chargeArg = chargeArg.data.provincias;
        let chargeArgM = "";
        let ele = "" //municipios
        let arrMu = []
        for(let i = 0; i<chargeArg.length; i++){
            ele =  await findNameOrCreate(chargeArg[i].nombre, arg.dataValues.id); //crea provicia
            chargeArgM = await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${chargeArg[i].id}&campos=nombre&max=428`); //crea ciudades de provicias
            chargeArgM = chargeArgM.data.municipios
            for(let j = 0; j<chargeArgM.length; j++){
               await  findNameOrCreate(chargeArgM[j].nombre, ele[0].dataValues.id);
            }
        }
        //crear tallas
        for(let i = 0; i < sizes.length; i++){
            await createSize(sizes[i]);
        }
        //crear Usuarios
        for(let i = 0; i < users.length; i++){
            let {name, lastname,password, dni, profile_picture, email, phone, typeUser, address, place} = users[i];
            await createUser(name, lastname, password, dni, profile_picture, email, phone, typeUser, address, place);
        }
         // Categories
        for (let i = 0; i < categories.length; i++) {
            // Category created from the model
            let [category] = await findNameOrCreateCategory(categories[i].name); 
            for (let j = 0; j < categories[i].subcategories.length; j++) {
            // Create subcategories with the largest category
            await findNameOrCreateCategory(categories[i].subcategories[j],category.dataValues.id);
            }
        }
        /**
         * Cargar Products
         */
        let cat = await axios.get(`https://globalmarkets13.herokuapp.com/products`);
        cat = cat.data;

        let myArray = ['nicolas','alejandro','isaac', 'andres','zacarias', 'david', 'santiago', 'daniel', 'cristina']
       
        for (let i = 0; i < cat.length; i++) {
          const {title, description, price, inStock, images,gender,sizes} = cat[i];
          let rand = Math.floor(Math.random()*myArray.length);
          let rValue = myArray[rand];
          let category = gender;
          category = category?.trim(); 
          category = category === 'men'?'hombre':category === 'women'?'mujer':category === 'men, women, niños'?'familiar':category === "men, women"?'familiar':category === "kid"?'niño':category === ""?'unisex':category;
          let arry = [];
          arry.push(category);
          await createProduct(title,description,price,"NEW",inStock,rValue,images,arry,sizes);
        }
        console.log('sucessfully');
    } catch (error) { 
        console.log(error)
    }
}

module.exports = {
    chargue
}