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

   const token = jwt.sign(userObj, process.env.SECRET_KEY, {algorithm: "HS384", expiresIn: 60 * 5});
   return token;
}

// Validar el token JWT para acceder a recursos previa autorización
export const validateJWT = (token) => {
   try{
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return decoded;
   }catch(error){
      return null;
   }
}
