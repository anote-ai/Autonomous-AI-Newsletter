const nodemailer = require("nodemailer");
const html = `
<div style="background-color: #171515; width: 100%; height: 100%; display: flex; position: relative; text-align: center; flex-direction: column;">
<div>
  <h1 style="font-size: 6rem; font-weight: bold; margin-top: 20px; margin-bottom: 4px; color: white;">
    Newsletter Creator
  </h1>

  <h3 style="font-size: 32px; color: white; font-weight: bold;">
    Your Stories, Your Voice, Your Newsletter.
  </h3>
</div>
<div style="display: flex; flex-direction: column; align-self: center; margin-top: 10px;">
  <form nonvalidate="true" autoComplete="off" style="padding-right: 5px;">
    <input
      nonvalidate="true"
      style="width: 400px; padding-right: 2px; border-color: white; color: white;"
      type="text"
      value="{{searchTerm}}"
      onChange="handleChange(event)"
    />
    <button
      nonvalidate="true"
      style="color: black; background: #11cb5f; height: 40px; color: white; border-color: #11cb5f;"
      class="bg-zinc-950"
      onClick="handleSearch(event)"
    >
      Create
    </button>
  </form>
  <div style="display: flex; margin-top: 8px; padding-left: 8px; gap: 10px; justify-content: center;">
    <button
      nonvalidate="true"
      style="color: black; background: #fe00fe; height: 40px; color: white; border-color: #fe00fe;"
      onClick="handleTrendingClick(event)"
    >
      Trending
    </button>
    <button
      nonvalidate="true"
      style="color: black; background: #28B2FB; height: 40px; color: white; border-color: #28B2FB;"
      class="bg-zinc-950"
      onClick="handleHealthTechClick(event)"
    >
      Health Tech
    </button>
    <button
      nonvalidate="true"
      style="color: black; background: #ECCA42; height: 40px; color: white; border-color: #ECCA42;"
      class="bg-zinc-950"
      onClick="handleGlobalEconomicsClick(event)"
    >
      Global Economics
    </button>
  </div>
  <div style="height: 50vh; width: 45vw; margin-top: 10px; align-items: center; overflow-y: scroll; border-radius: 10px;">
    <div>
      {{#if loading}}
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
          <div style="border-radius: 50%; height: 10px; width: 10px; border: 2px solid #yellow-500; border-top-color: transparent; border-bottom-color: transparent; animation: spin 1s linear infinite;"></div>
        </div>
      {{else}}
        {{#if data.data.length}}
          <div style="display: flex; flex-direction: column; justify-content: center; width: 50%; height: 100%;">
            {{#each data.data}}
              <div style="flex: 1; justify-content: center; width: 100%; padding: 5px; border-radius: 10px; background-color: orange-200; margin: auto; margin-top: 4px; text-align: left; font-size: 18px;">
                <h1 style="color: neutral-900; font-size: 18px; font-weight: bold;">{{this.title}}</h1>
                <h1 style="color: neutral-900; font-size: 10px;">{{this.date}}</h1>
                <h2 style="color: neutral-900; text-align: left; padding-top: 2px;">{{this.summary}}</h2>
                <a href="{{this.url}}" target="_blank" rel="noopener noreferrer">
                  <p style="color: neutral-900; font-size: 15px; background-color: orange-300; border-radius: 10px;">{{this.url}}</p>
                </a>
              </div>
            {{/each}}
          </div>
        {{else}}
          <div style="height: 50vh; width: 40vw; margin: auto; margin-top: 10px; border-radius: 10px;"></div>
        {{/if}}
      {{/if}}
    </div>
  </div>
</div>
</div>
`;

async function main() {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"HEY HEY HEY" cebacaro@gmail.com"',
    to: "cebacaro@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: html,
  });

  console.log("Message sent: " + info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
