import type { APIRoute } from "astro";
import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { name, email, message } = data;

  // Configuración SMTP para hola@anaruizjornet.com (Arsys)
  const transporter = nodemailer.createTransport({
    host: "smtp.serviciodecorreo.es",
    port: 465,
    secure: true, // SSL/TLS
    auth: {
      user: "hola@anaruizjornet.com", // tu dirección de envío
      pass: process.env.EMAIL_PASSWORD, // Lee la contraseña desde la variable de entorno
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Web Ana Ruiz Jornet" <hola@anaruizjornet.com>`, // remitente
      to: ["hola@anaruizjornet.com", "ana.ruiz.jornet@gmail.com"], // destinatarios
      subject: `Nuevo mensaje del formulario de ${name}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Mensaje: ${message}
      `,
      html: `
        <h3>Nuevo mensaje desde el formulario de contacto</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email, // para poder responder directamente al remitente
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error al enviar el correo:", errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500 }
    );
  }
};
