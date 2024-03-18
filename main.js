const form = document.querySelector("#form");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const messages = document.querySelector(".messages");
const markdownBody = document.querySelector(".markdown-body");
const markdownToolbar = document.querySelector(".markdown-toolbar");

form.addEventListener("submit", e => {
  e.preventDefault();

  const from = document.querySelector("#from").value;
  const to = document.querySelector("#to").value;
  const subject = document.querySelector("#subject").value;
  const body = document.querySelector("#body").value;

  const message = {
    from,
    to,
    subject,
    text: body
  };

  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 587,
    secure: false, // true for 465, false for other ports
  });

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
});

chatForm.addEventListener("submit", e => {
  e.preventDefault();

  const message = chatInput.value;

  const newMessage = document.createElement("div");
  newMessage.classList.add("message");
  newMessage.innerHTML = `
    <div class="sender">You</div>
    <div class="body">${message}</div>
  `;

  messages.appendChild(newMessage);

  chatInput.value = "";
});

markdownToolbar.addEventListener("click", e => {
  e.preventDefault();

  const button = e.target;

  switch (button.id) {
    case "bold-button":
      markdownBody.innerHTML += "**bold text**";
      break;
    case "italic-button":
      markdownBody.innerHTML += "*italicized text*";
      break;
    case "link-button":
      const link = prompt("Enter the link URL:");
      markdownBody.innerHTML += `[link text](${link})`;
      break;
    case "code-button":
      const code = prompt("Enter the code:");
      markdownBody.innerHTML += `\`\`\`${code}\`\`\``;
      break;
    case "quote-button":
      markdownBody.innerHTML += "> blockquote";
      break;
    case "list-button":
      markdownBody.innerHTML += "- list item";
      break;
  }
});