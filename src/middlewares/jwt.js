import jwt from "jsonwebtoken";



// Completar la funcion para generar un token JWT en base al usuario que ha iniciado sesion
export const generateJWT = (user) => {
   const { id, firstName, lastName, email } = user;
   const userObj = {
      id,
      firstName,
      lastName,
      email
   }

   //* Se crea el token
   const token = jwt.sign(userObj, process.env.SECRET_KEY, {algorithm: "HS384", expiresIn: 60 * 5});
   return token;
}



// Validar el token JWT para acceder a recursos previa autorización
export const validateJWT = (token) => {
   try{

      //* Se verifica el token, si es válido regresa el objeto json que representa el token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return decoded;

   //* Si el token no es válido, regresa un error
   }catch(error){
      return null;
   }
}
