exports.options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mercadito API",
      version: "1.0.0",
      descrition: "Documentación del proyecto final soy Henry grupo #13",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./src/documentation/*.yaml"],
};
