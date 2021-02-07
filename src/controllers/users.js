import { Users } from "../models/";
import { validateJWT } from '../middlewares/jwt';



export const getUsers = async (req, res) => {
   const token = req.headers.authorization.split(" ")[1]
   const authorization = await validateJWT(token);
   if(authorization){
      const results = await Users.findAll({ attributes: [ 'id', 'firstName', 'lastName', 'email' ] });
      res.status(200).json(results);
   }else{
      res.status(403).json({ message: "No tienes autorización para acceder a estos recursos" })
   }
}



export const getUserById = async (req, res) => {
   const token = req.headers.authorization.split(" ")[1]
   const authorization = await validateJWT(token);
   if(authorization){
      const results = await Users.findOne({ where: { id: req.params.id }, attributes:[ 'id', 'firstName', 'lastName', 'email' ] });
      res.status(200).json(results);
   }else{
      res.status(403).json({ message: "No tienes autorización para acceder a estos recursos" })
   }
}
