(function () {
  const currentScript = document.currentScript;
  const API_BASE_URL = currentScript.getAttribute("data-api-url") || "http://127.0.0.1:8001";
  // Path to Sarah's avatar PNG (transparent background). Host sarah-avatar.png in your
  // public/ folder and override with data-avatar-url="/some/other/path.png" if needed.
  const AVATAR_URL = currentScript.getAttribute("data-avatar-url") || "/sarah-avatar.webp";

  if (!document.querySelector('link[href*="Space+Grotesk"]')) {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(fontLink);
  }

  const styles = `
    #alco-launcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: clamp(52px, 9vw, 84px);
      height: clamp(68px, 12vw, 110px);
      border: none;
      background: none;
      cursor: pointer;
      z-index: 999999;
      padding: 0;
    }
    #alco-avatar-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      animation: alco-idle-float 3.6s ease-in-out infinite;
      filter: drop-shadow(0 8px 16px rgba(15, 23, 48, 0.28));
    }
    #alco-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: bottom center;
      display: block;
      pointer-events: none;
    }
    @keyframes alco-idle-float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-5px) rotate(-1deg); }
    }
    #alco-avatar-wrap.greet {
      animation: alco-greet-nod 0.9s ease-in-out 1;
    }
    @keyframes alco-greet-nod {
      0%   { transform: translateY(0) rotate(0deg) scale(1); }
      20%  { transform: translateY(-8px) rotate(-4deg) scale(1.03); }
      45%  { transform: translateY(-1px) rotate(3deg) scale(1.02); }
      70%  { transform: translateY(-4px) rotate(-2deg) scale(1.02); }
      100% { transform: translateY(0) rotate(0deg) scale(1); }
    }

    #alco-status-dot {
      position: absolute;
      bottom: 4%;
      right: 8%;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #3fc270;
      border: 2px solid #fff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }

    @media (max-width: 480px) {
      #alco-launcher {
        bottom: 16px;
        right: 16px;
        width: clamp(46px, 14vw, 64px);
        height: clamp(60px, 18vw, 84px);
      }
    }

    .alco-badge { position: relative; border-radius: 50%; display: inline-block; }
    .alco-node {
      transform-origin: center;
      transform-box: fill-box;
      animation: alco-node-fire 3.2s ease-in-out infinite;
    }
    .alco-node.n1 { animation-delay: 0s; }
    .alco-node.n2 { animation-delay: 0.35s; }
    .alco-node.n3 { animation-delay: 0.7s; }
    .alco-node.n4 { animation-delay: 1.05s; }
    .alco-node.n5 { animation-delay: 1.4s; }
    .alco-node.n6 { animation-delay: 1.75s; }
    .alco-node.hub { animation-delay: 0s; }
    @keyframes alco-node-fire {
      0%, 100% { opacity: 0.55; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.3); }
    }
    .alco-badge.fast .alco-node { animation-duration: 0.9s; }
    .alco-badge.fast::before { animation-duration: 2s; }

    #alco-panel {
      position: fixed;
      bottom: 60px;
      right: 116px;
      width: 380px;
      height: 580px;
      background: rgba(22, 34, 58, 0.94);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: 'Inter', sans-serif;
      color: #F5F3EE;
      z-index: 999999;
    }
    #alco-panel.open { display: flex; }

    @media (max-width: 900px), (max-height: 700px) {
  #alco-panel {
    width: 340px;
    height: 480px;
    bottom: 50px;
    right: 100px;
  }
}

    /* Header: now just the logo lockup (icon + AL&CO + slogan baked in) + close button.
       No more separate name/status text elements — the logo image carries that content now. */
    #alco-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 18px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    #alco-header-logo {
      height: 32px;
      width: auto;
      display: block;
    }
    #alco-close { background: none; border: none; color: #93A0B8; font-size: 18px; cursor: pointer; padding: 4px; flex-shrink: 0; }

    #alco-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    #alco-messages::-webkit-scrollbar { width: 6px; }
    #alco-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

    .alco-msg { max-width: 78%; padding: 10px 14px; border-radius: 16px; font-size: 14px; line-height: 1.5; }
    .alco-msg.visitor {
      align-self: flex-end;
      background: linear-gradient(135deg, #F5A623, #C97F12);
      color: #14213D;
      font-weight: 500;
      border-bottom-right-radius: 4px;
    }
    .alco-msg.bot {
      align-self: flex-start;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      color: #F5F3EE;
      border-bottom-left-radius: 4px;
    }
    .alco-whatsapp-link {
      align-self: flex-start;
      font-size: 12px;
      color: #F5A623;
      text-decoration: none;
      border: 1px solid rgba(245, 166, 35, 0.3);
      padding: 6px 12px;
      border-radius: 20px;
      margin-top: -2px;
    }
    .alco-whatsapp-link:hover { background: rgba(245, 166, 35, 0.1); }

    .alco-typing-row { display: flex; align-items: center; gap: 10px; align-self: flex-start; }
    .alco-typing-row svg { width: 26px; height: 26px; }
    .alco-typing-row span { font-size: 12px; color: #93A0B8; }

    #alco-input-row { display: flex; align-items: center; gap: 8px; padding: 14px; border-top: 1px solid rgba(255,255,255,0.08); }
    #alco-input-pill {
      flex: 1;
      display: flex;
      align-items: center;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 24px;
      padding: 4px 8px 4px 16px; 
      min-width: 0;
    }
    #alco-input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      color: #F5F3EE;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      padding: 10px 0;
      min-width: 0;
    }
    #alco-input::placeholder { color: #93A0B8; }
    #alco-send {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background: linear-gradient(135deg, #F5A623, #C97F12);
      color: #14213D;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    #alco-send:disabled { opacity: 0.4; cursor: not-allowed; }
    #alco-input:disabled { opacity: 0.6; }

    @media (max-width: 640px) {
      #alco-panel {
        top: 0; left: 0; right: 0; bottom: 0;
        width: 100%; height: 100%;
        border-radius: 0; border: none;
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
      }
      #alco-launcher { bottom: 20px; right: 20px; }
    }
  `;

  const styleTag = document.createElement("style");
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);

  function networkBadgeSVG() {
    return `
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="19" fill="#0F1B2E" stroke="rgba(245,166,35,0.35)" stroke-width="1"/>
        <g stroke="#F5A623" stroke-width="1" opacity="0.35">
          <line x1="20" y1="20" x2="20" y2="8"/>
          <line x1="20" y1="20" x2="32" y2="16"/>
          <line x1="20" y1="20" x2="32" y2="28"/>
          <line x1="20" y1="20" x2="20" y2="34"/>
          <line x1="20" y1="20" x2="8" y2="28"/>
          <line x1="20" y1="20" x2="8" y2="16"/>
        </g>
        <circle class="alco-node hub" cx="20" cy="20" r="3" fill="#F5A623"/>
        <circle class="alco-node n1" cx="20" cy="8" r="2.2" fill="#F5A623"/>
        <circle class="alco-node n2" cx="32" cy="16" r="2.2" fill="#F5A623"/>
        <circle class="alco-node n3" cx="32" cy="28" r="2.2" fill="#7C6FFF"/>
        <circle class="alco-node n4" cx="20" cy="34" r="2.2" fill="#F5A623"/>
        <circle class="alco-node n5" cx="8" cy="28" r="2.2" fill="#F5A623"/>
        <circle class="alco-node n6" cx="8" cy="16" r="2.2" fill="#F5A623"/>
      </svg>
    `;
  }

  const launcher = document.createElement("button");
  launcher.id = "alco-launcher";
  launcher.setAttribute("aria-label", "Open chat with Sarah");
  launcher.innerHTML = `
    <div id="alco-avatar-wrap">
      <img id="alco-avatar-img" src="${AVATAR_URL}" alt="Sarah" />
      <span id="alco-status-dot"></span>
    </div>
  `;
  document.body.appendChild(launcher);

  const avatarWrap = launcher.querySelector("#alco-avatar-wrap");

  const panel = document.createElement("div");
  panel.id = "alco-panel";
  panel.innerHTML = `
    <div id="alco-header">
      <img src="/alco_logo_white.png" alt="AL&CO" id="alco-header-logo" />
      <button id="alco-close" aria-label="Close chat">✕</button>
    </div>
    <div id="alco-messages"></div>
    <div id="alco-input-row">
      <div id="alco-input-pill">
        <input id="alco-input" type="text" placeholder="Ask about a program, pricing, anything..." />
      </div>
      <button id="alco-send" aria-label="Send">↑</button>
    </div>
  `;
  document.body.appendChild(panel);

  // Greet sequence: nod, then the speech bubble.
  // Greet bubble — reusable so it can fire on load AND on hover.
  let activeBubble = null;
  let bubbleAutoHide = null;

  function showGreetBubble() {
    if (activeBubble) return; // already showing, don't stack another
    const bubble = document.createElement("div");
    bubble.textContent = "Hi, I'm Sarah! Looking for a program? Ask me anything.";
    bubble.style.cssText = "position:fixed;bottom:64px;right:104px;background:#1B2E4D;color:#F5F3EE;padding:10px 16px;border-radius:16px 16px 2px 16px;font-family:Inter,sans-serif;font-size:13px;line-height:1.4;max-width:min(220px, calc(100vw - 160px));box-sizing:border-box;box-shadow:0 8px 24px rgba(0,0,0,0.4);cursor:pointer;z-index:1000000;";
    bubble.onclick = () => { panel.classList.add("open"); hideGreetBubble(); };
    document.body.appendChild(bubble);
    activeBubble = bubble;
    bubbleAutoHide = setTimeout(hideGreetBubble, 8000);
  }

  function hideGreetBubble() {
    if (bubbleAutoHide) { clearTimeout(bubbleAutoHide); bubbleAutoHide = null; }
    if (activeBubble) { activeBubble.remove(); activeBubble = null; }
  }

  // Greet sequence on page load.
  setTimeout(() => {
    avatarWrap.classList.add("greet");
  }, 2600);
  setTimeout(showGreetBubble, 3000);

  // Show the same bubble on hover, as long as the chat panel isn't already open.
  launcher.addEventListener("mouseenter", () => {
    if (!panel.classList.contains("open")) showGreetBubble();
  });
  launcher.addEventListener("mouseleave", () => {
    hideGreetBubble();
  });

  const messagesEl = panel.querySelector("#alco-messages");
  const inputEl = panel.querySelector("#alco-input");
  const sendBtn = panel.querySelector("#alco-send");
  const closeBtn = panel.querySelector("#alco-close");

  launcher.addEventListener("click", () => {
    panel.classList.add("open");
    hideGreetBubble();
  });
  closeBtn.addEventListener("click", () => panel.classList.remove("open"));

  function addMessage(text, sender) {
    const el = document.createElement("div");
    el.className = `alco-msg ${sender}`;
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function addWhatsappLink(url) {
    const el = document.createElement("a");
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener";
    el.className = "alco-whatsapp-link";
    el.textContent = "Prefer WhatsApp? Chat with a team member →";
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addTypingIndicator() {
    const row = document.createElement("div");
    row.className = "alco-typing-row";
    row.innerHTML = `<div class="alco-badge fast">${networkBadgeSVG()}</div><span>Thinking...</span>`;
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return row;
  }

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;

    addMessage(text, "visitor");
    inputEl.value = "";
    inputEl.disabled = true;
    sendBtn.disabled = true;

    const typingEl = addTypingIndicator();

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      typingEl.remove();

      if (data.error) {
        addMessage("Something went wrong on my end. Please try again.", "bot");
        return;
      }

      addMessage(data.reply, "bot");
      if (data.whatsapp_link) {
        addWhatsappLink(data.whatsapp_link);
      }
    } catch (err) {
      typingEl.remove();
      addMessage("I couldn't connect. Please check your connection and try again.", "bot");
    } finally {
      inputEl.disabled = false;
      sendBtn.disabled = false;
      inputEl.focus();
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  addMessage("Hi, I'm Sarah, your AL&CO guide. Ask me about our programs, pricing, or anything else.", "bot");
})();
