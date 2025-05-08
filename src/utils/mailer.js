import { Resend } from 'resend';

// initialize with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ from, to, subject, html }) {
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  if (error) {
    console.error('Resend email error:', error);
    throw error;
  }

  return data;
}

export default sendEmail;
