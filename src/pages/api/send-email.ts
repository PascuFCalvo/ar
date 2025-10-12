import type { APIRoute } from "astro";
import nodemailer from "nodemailer"
export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { name, email, message } = data;

  // Configura tu transporte SMTP (puedes usar Gmail, Outlook, etc.)
  const transporter = nodemailer.createTransport({
    service: "gmail", // Cambia si usas otro proveedor
    auth: {
      user: "TU_CORREO@gmail.com", // Cambia por tu correo
      pass: "TU_CONTRASEÑA_O_APP_PASSWORD", // Cambia por tu contraseña o app password
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "ana.ruiz.jornet@gmail.com", // Cambia por tu correo de destino
      subject: `Nuevo mensaje de ${name}`,
      text: message,
      replyTo: email,
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500 }
    );
  }
};
