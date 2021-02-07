import app from "./index";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send("Bienvenido a la creación de APIs")
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando sobre el puerto ${PORT}`);
});
