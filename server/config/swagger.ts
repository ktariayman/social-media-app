import swaggerJsDoc from 'swagger-jsdoc';

export const swaggerJsDocOptions: swaggerJsDoc.Options = {
 definition: {
  openapi: '3.0.0',
  info: {
   title: 'social-media-app',
   version: '1.0.0',
   description: '***',
   contact: {
    name: "ayman ktari",
    email: "aymanktari31@gmail.com",
    linkedin: "https://www.linkedin.com/in/ktariayman/"
   }
  },
  servers: [
   {
    url: 'http://localhost:8000'
   }
  ]
 },
 apis: ['./controllers/*/*.ts']
};