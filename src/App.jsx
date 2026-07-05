import { useMemo } from "react";
import "./App.css";
import PersonaPill from "./components/PersonaPill";
import ChatPanel from "./components/ChatPanel";
import { sendUserPrompt } from "./api/chat.api.js";
import { useChatStore } from "./store/useChatStore";
import hiteshImage from "./assets/hitesh.png";
import piyushImage from "./assets/piyush-garg.png";

const personas = [
  {
    key: "hitesh",
    name: "Hitesh Choudhary",
    role: "Retired from corporate and full time Content Creator",
    mood: "",
    bio: "I make coding videos and run a few tech products that serve millions of users.",
    accent: "Haan ji to kaise ho ",
    punchline: "No fluff. Just useful depth.",
    image: hiteshImage,
  },
  {
    key: "piyush",
    name: "Piyush Garg",
    role: "Software Engineer, Content Creator, Educator",
    mood: "",
    bio: "I build software and teach people how to build software. Founder of Teachyst, a white-labeled LMS that helps educators monetize their content globally.",
    accent: "Suru se suru karte hain",
    punchline: "From idea to execution, with momentum.",
    image: piyushImage,
  },
];

function App() {
  const activePersona = useChatStore((state) => state.activePersona);
  const setActivePersona = useChatStore((state) => state.setActivePersona);
  const draft = useChatStore((state) => state.drafts[state.activePersona]);
  const setDraft = useChatStore((state) => state.setDraft);
  const messages = useChatStore((state) => state.conversations[state.activePersona]);
  const typing = useChatStore((state) => state.typing);
  const setTyping = useChatStore((state) => state.setTyping);
  const appendMessage = useChatStore((state) => state.appendMessage);

  const persona = useMemo(
    () => personas.find((item) => item.key === activePersona),
    [activePersona],
  );

  const handlePersonaChange = (key) => {
    setActivePersona(key);
    setTyping(false);
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    if (!draft.trim()) return;
    const userPrompt = draft.trim();
    const nextMessage = { id: Date.now(), role: "user", text: userPrompt };
    appendMessage(activePersona, nextMessage);
    setDraft(activePersona, "");
    setTyping(true);

    const response = await sendUserPrompt({ persona: activePersona, userPrompt });

    appendMessage(activePersona, {
      id: Date.now() + 1,
      role: "assistant",
      text: response.data.content,
    });
    setTyping(false);
  };

  return (
    <div className="app-shell">
      <header className="hero-section">
        <div className="hero-section__copy">
          <p className="eyebrow">AI Persona Studio</p>
          <h1>Talk to a digital version of your favorite tech mentor.</h1>
          <p className="hero-section__text">
            Explore a polished, design-led experience for simulating
            conversations with Hitesh Choudhary or Piyush Garg.
          </p>
          <div className="hero-section__actions">
            <a href="#chat" className="button button--primary">
              Try the demo
            </a>
          </div>
        </div>
        <div className="hero-section__panel">
          <h2>Persona switcher</h2>
          <p>
            Choose a communication style and instantly shift the tone of the
            experience.
          </p>
          <div className="persona-list">
            {personas.map((item) => (
              <PersonaPill
                key={item.key}
                persona={item}
                active={activePersona === item.key}
                onSelect={handlePersonaChange}
              />
            ))}
          </div>
        </div>
      </header>

      <main>
        <section id="chat" className="chat-section">
          <div className="chat-section__intro">
            <p className="eyebrow">Mock conversation</p>
            <h2>{persona.name}</h2>
            <p>{persona.bio}</p>
            <blockquote>{persona.accent}</blockquote>
          </div>

          <ChatPanel
            persona={persona}
            messages={messages}
            draft={draft}
            setDraft={setDraft}
            onSend={handleSubmit}
            typing={typing}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
