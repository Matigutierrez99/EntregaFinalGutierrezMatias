import express from "express";
import cors from "cors";

import { MercadoPagoConfig, Preference } from "mercadopago";
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken:
    "TEST-8700233297062944-022700-7e6de543b658bd90bc0b658fd7ed3b9e-216663886",
});

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Soy el server:");
});

app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "https://www.mercadopago.com.ar/",
        failure: "https://www.mercadopago.com.ar/",
        pending: "https://www.mercadopago.com.ar/",
      },
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
});

app.listen(port, () => {
  console.log(`el servidor esta corriendo en el puerto ${port}`);
});
