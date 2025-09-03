const apiKey = "PASTE-YOUR-OPENAI-API-KEY-HERE"; 

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value;

  if (!userMessage) return;

  // Show user message
  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.innerText = userMessage;
  chatBox.appendChild(userDiv);

  input.value = "";

  // Show "thinking..." while waiting
  const responseDiv = document.createElement("div");
  responseDiv.className = "message bot";
  responseDiv.innerText = "Thinking...";
  chatBox.appendChild(responseDiv);

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-5",
        input: userMessage
      })
    });

    const data = await response.json();
    responseDiv.innerText = data.output[0].content[0].text || "No response";
  } catch (error) {
    responseDiv.innerText = "Error: " + error.message;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
