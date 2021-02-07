import { Users } from "../models/";
import bcryptjs from 'bcryptjs';
import { generateJWT } from '../middlewares/jwt';



//{1. Completar la logica para manejar el inicio de sesión
// - responder con un codigo de estado 401 cuando las credenciales sean incorrectas
// - responder con un mensaje (message) y codigo de estado 200 cuando las credenciales sean correctas
// - responder con el token jwt (token)

export const login = async (req, res) => {
   const { email, password } = req.body;

   //* Se valida si el correo electrónico del ususario está registrado
   const results = await Users.findOne({ where: { email } });

   //* Si el usuario existe se valida su contraseña
   if(results) {
      const valid = bcryptjs.compareSync(password, results.password);

      //*Si la contraseña es válida el usuario inicia sesión
      if(valid){
         const token = generateJWT(results);
         return res.status(200).json({
            message: "Has iniciado sesión exitosamente",
            token
         })
      }

      //* La contraseña del usuario no es correcta
      return res.status(401).json({ message: "El usuario y/o la contraseña son incorrectas" })
   }

   //* El correo del usuario no está registrado
   return res.status(401).json({ message: "El usuario y/o la contraseña son incorrectas" })
}



//{2. Completar el registro de usuario
// - responder con un codigo de estado fallido 400 > cuando hagan falta campos o cuando el usuario ya exista en la base de datos
// - responder con el objeto del usuario que ha sido creado y un codigo 201 cuando el registro sea satisfactorio

export const signIn = async (req, res) => {
   try{
      const { firstName, lastName, email, password } = req.body;

      //* Se valida que no hagan falta campos
      if(!firstName || !lastName || !email || !password){

         //* Por lo menos un campo está vacío
         return res.status(400).json({message: "Registro fallido al hacer falta uno o más campos"})

      //* Se encripta la contraseña
      } else{
         const encryptedPassword = bcryptjs.hashSync(password, 10);
         req.body.password = encryptedPassword;

         //* Se regresa el objeto user, y si no existía, se regresa created con valor true
         let [ user, created ] = await Users.findOrCreate({
            where: { email },
            defaults: req.body
         });

         //* Se valida si el usuario ya existía y por lo tanto no fue creado
         if(!created){

            //* El correo del usuario ya estaba registrado
            return res.status(400).json({ message: "Registro fallido al agregar un usuario con correo ya existente" })

         //* El usuario ha sido registrado exitosamente
         } else{
            const { id, firstName, lastName, email } = user;
            user= {
               id,
               firstName,
               lastName,
               email
            }
            return res.status(201).json(user);
         }
      }
   }catch(error){
      console.log(error);
   }
}
