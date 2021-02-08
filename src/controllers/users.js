import { Users } from "../models/";
import { validateJWT } from '../middlewares/jwt';



export const getUsers = async (req, res) => {
   try{
      //* Se obtiene el token de autorización del usuario
      const token = req.headers.authorization.split(" ")[1];

      //* Se valida el token de autorización
      const authorization = await validateJWT(token);

      //* Si el token es válido se responde con los recursos solicitados
      if(authorization){
         const results = await Users.findAll({ attributes: [ 'id', 'firstName', 'lastName', 'email' ] });
         res.status(200).json(results);

      //* Si el token no es válido no se pueden enviar los recursos
      }else{
         res.status(403).json({ message: "No tienes autorización para acceder a estos recursos" });
      };
   }catch(error){
      console.log(error);
   };
};



export const getUserById = async (req, res) => {
   try{
      //* Se obtiene el token de autorización del usuario
      const token = req.headers.authorization.split(" ")[1];

      //* Se valida el token de autorización
      const authorization = await validateJWT(token);

      //* Si el token es válido se responde con los recursos solicitados
      if(authorization){
         const results = await Users.findOne({ where: { id: req.params.id }, attributes:[ 'id', 'firstName', 'lastName', 'email' ] });
         res.status(200).json(results);

      //* Si el token no es válido no se pueden enviar los recursos
      }else{
         res.status(403).json({ message: "No tienes autorización para acceder a estos recursos" });
      };
   }catch(error){
      console.log(error);
   };
};
