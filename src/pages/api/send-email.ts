
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const data = await request.json();
  const { name, email, message } = data;

  const smtpUser = process.env.EMAIL_USER || "";
  const smtpPass = process.env.EMAIL_PASSWORD || "";

  // Log seguro para depuración (NO mostrar la contraseña)
  console.log("EMAIL_USER:", smtpUser ? "[definido]" : "[NO DEFINIDO]");
  console.log("EMAIL_PASSWORD:", smtpPass ? "[definido]" : "[NO DEFINIDO]");

  if (!smtpUser || !smtpPass) {
    return new Response(
      JSON.stringify({ success: false, error: "Faltan credenciales SMTP (EMAIL_USER o EMAIL_PASSWORD)" }),
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.serviciodecorreo.es",
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: { rejectUnauthorized: false },
  });

  try {

    await transporter.sendMail({
      from: `"Web Ana Ruiz Jornet" <${smtpUser}>`,
      to: smtpUser, // destinatario principal
      subject: `Nuevo mensaje del formulario de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
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