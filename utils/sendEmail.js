import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, message, unsubscribeLink = null) => {
  try {
    console.log("📨 sendEmail() called");
    console.log("➡️ To:", to);
    console.log("➡️ Subject:", subject);

    if (!process.env.EMAIL_FROM) throw new Error("Missing EMAIL_FROM in .env");

    // Compose HTML
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #4b3b2b;">
        <p>${message.replace(/\n/g, "<br/>")}</p>
        ${
          unsubscribeLink
            ? `<hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
               <p style="font-size: 13px; color: #777;">
                 You’re receiving this because you subscribed to <strong>Kind & Cruel</strong>.
               </p>
               <p style="font-size: 13px;">
                 <a href="${unsubscribeLink}" style="color: #c28f5e; text-decoration: none;">
                   Unsubscribe from these emails
                 </a>
               </p>`
            : ""
        }
      </div>
    `;

    const textContent = message + (unsubscribeLink ? `\n\nUnsubscribe: ${unsubscribeLink}` : "");

    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM, // MUST be set in .env
      to,
      subject,
      html: htmlContent,
      text: textContent,
    });

    console.log("✅ Email sent successfully to", to);
    console.log("📑 Resend response:", response);
  } catch (err) {
    console.error("💥 sendEmail FAILED:", err);
    throw err;
  }
};

export default sendEmail;
