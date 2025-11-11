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
      subject: "🔥 Your Zvek Tap Hero Test Access Awaits",
      html: `
        <div style="
          font-family: 'Poppins', sans-serif;
          padding: 25px;
          background: #1c1c1c;
          border-radius: 12px;
          color: #fff;
          border: 1px solid #ff8c20;
        ">
          <h2 style="color: #ff8c20; margin-bottom: 10px;">
            Welcome to the Zvekisha Tester Program! 🔥
          </h2>

          <p>Hello tester,</p>

          <p>
            Thank you for joining the <b>Zvek Tap Hero</b> early-access testing program.
            Below you will find the required links. Make sure to join the Google Group first
            so your tester access activates correctly on Google Play.
          </p>

          <div style="margin-top: 20px;">
            <a href="https://groups.google.com/g/zvektaphero-testers"
              style="
                display: inline-block;
                padding: 12px 16px;
                background: #ff8800;
                color: #000;
                text-decoration: none;
                font-weight: bold;
                border-radius: 8px;
                margin-bottom: 12px;
              ">
              ✅ Join Google Tester Group
            </a>
          </div>

          <div>
            <a href="https://play.google.com/apps/testing/com.zvekisha.zvektaphero"
              style="
                display: inline-block;
                padding: 12px 16px;
                background: #ff4800;
                color: #fff;
                text-decoration: none;
                font-weight: bold;
                border-radius: 8px;
              ">
              🎮 Access Zvek Tap Hero on Google Play
            </a>
          </div>

          <p style="margin-top: 25px; opacity: 0.8;">
            If you run into issues, reply to this email anytime.  
            Welcome aboard — the Zvekisha universe is proud to have you! 🔥
          </p>
        </div>
      `
    });

    return res.status(200).json({ message: "Invite sent successfully!" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to send email." });
  }
}
