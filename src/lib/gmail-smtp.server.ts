import nodemailer from "nodemailer";

export async function sendGmailContactEmail({
  account,
  appPassword,
  to,
  replyTo,
  name,
  message,
}: {
  account: string;
  appPassword: string;
  to: string;
  replyTo: string;
  name: string;
  message: string;
}): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: account,
      pass: appPassword.replace(/\s/g, ""),
    },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });

  await transporter.sendMail({
    from: `Milena Modesto <${account}>`,
    to,
    replyTo,
    subject: "Nova mensagem pelo formulário do site",
    text: `Nome: ${name}\nE-mail: ${replyTo}\n\nMensagem:\n${message}`,
  });
}
