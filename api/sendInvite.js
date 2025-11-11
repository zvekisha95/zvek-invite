import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    await sendgrid.send({
      to: email,
      from: "Zvekisha <no-reply@zvekisha.mk>",
      subject: "Your Zvek Tap Hero Test Invite",
      html: `
        <h2>Welcome Tester!</h2>
        <p>Click here to join:</p>
        <a href="https://play.google.com/apps/testing/com.zvekisha.zvektaphero">
          Join the test
        </a>
      `,
    });

    return res.status(200).json({ message: "Invite sent!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
