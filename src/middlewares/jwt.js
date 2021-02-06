import jwt from "jsonwebtoken";

//Completar la funcion para generar un token JWT en base al usuario que ha iniciado sesion
export const generateJWT = (user) => {
   const userObj = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
   }

   const token = jwt.sign(userObj, process.env.SECRET_KEY, {algorithm: "HS384", expiresIn: 60 * 5});
   return token;
}

//Validar el token 
const validateJWT = (req, res) => {

}