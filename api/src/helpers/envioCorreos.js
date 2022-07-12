/**
 * Archivo con la configuración para enviar correos
 *
 * @author Andres
 */

const nodemailer = require("nodemailer");

// Configuración para el envio de correos
const transport = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.CORREO, // generated ethereal user
      pass: process.env.CONTRASENIA, // generated ethereal password
    },
  });
};

// Correo para restrablecer contraseña
const emailOlvideContrasenia = async (email, nombre, token) => {
  let transporter = transport();
  await transporter.sendMail({
    from: `Proyecto Final Mercadito <${process.env.CORREO}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "Olvido su contraseña", // Subject line
    html: `
              <h1>Proyecto Final Mercadito</h1>
              <br>
              <p> Hola ${nombre}, se realizó la solicitud de cambio de contraseña, para seguir con el proceso, por favor haga click en el siguiente enlace: 
                <a href="${process.env.FRONTEND_URL}olvide-contrasenia/${token}" target="_blank">Link</a> 
              </p>
             
              <br>
              <small>
                Mercadito 
                <br>
                Soy Henry
                <br>
              </small>
              `,
  });
};

// Bienvida a nuevo empleado
const emailRegistroEmpleado = async (email, nombre) => {
  let transporter = transport();
  await transporter.sendMail({
    from: `Proyecto Final Mercadito <${process.env.CORREO}>`, // sender address
    to: `${email}`, // list of receivers
    subject: `Bienvenido ${nombre}`,
    html: `
              <h1>Proyecto Final Mercadito</h1>
              <br>
              <p> Hola ${nombre},tu registro fue existo gracias por unirte a la mayor red de marketplace de Latinoamérica, esperamos que tu estancia sea excelente.</p>
              <br>
              <small>
              Mercadito 
                 <br>
                    Soy Henry
                  <br>
             </small>
              `,
  });
};

// Bienvida a nuevo empleado
const emailInfoActualizada = async (email, nombre) => {
    let transporter = transport();
    await transporter.sendMail({
      from: `Proyecto Final Mercadito <${process.env.CORREO}>`, // sender address
      to: `${email}`, // list of receivers
      subject: "Actualización de datos",
      html: `
                <h1>Proyecto Final Mercadito</h1>
                <br>
                <p> Hola ${nombre},tu actulización de datos fue modificada correctamente.</p>
                <br>
                <small>
                Mercadito 
                   <br>
                      Soy Henry
                    <br>
               </small>
                `,
    });
  };

module.exports = {
  emailOlvideContrasenia,
  emailRegistroEmpleado,
  emailInfoActualizada
};
