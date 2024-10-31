

const transporter = nodemailer.createTransport({
  service: 'Outlook365', // Serviço SMTP da Outlook
  auth: {
    user: 'vinipelogia@outlook.com',
    pass: 'Vini@21082006'
  }
});

const sendEmail = async (email, token) => {
  const mailOptions = {
    from: 'vinipelogia@outlook.com',
    to: email,
    subject: 'Confirmação de Email',
    text: `Clique no link abaixo para confirmar seu email: ${token}`,
    html: `<p>Clique no link abaixo para confirmar seu email: <a href="${token}">${token}</a></p>`
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
