const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "andrewjhinger@gmail.com",
    subject: "Welcome to task-app!",
    text: `Glad to have you ${name}!`
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "andrewjhinger@gmail.com",
    subject: "Sorry to see you go!",
    text: `If you can think of anything that can we can do better, let us know ${name}!`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
};
