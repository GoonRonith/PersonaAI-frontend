function ChatPanel({ persona, messages, draft, setDraft, onSend, typing }) {
  const handleDraftChange = (event) => {
    setDraft(persona.key, event.target.value);
  };

  return (
    <div className="chat-window">
      <div className="chat-window__header">
        <div>
          <p className="eyebrow">Live demo</p>
          <h3>{persona.name}</h3>
        </div>
        <span className="chat-window__status">{persona.mood}</span>
      </div>

      <div className="chat-window__messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <div className="message__bubble">
              <strong>{message.role === 'user' ? 'You' : persona.name}</strong>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {typing ? (
          <div className="message assistant">
            <div className="message__bubble typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : null}
      </div>

      <form className="chat-window__composer" onSubmit={onSend}>
        <input
          value={draft}
          onChange={handleDraftChange}
          placeholder={`Ask ${persona.name} something...`}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default ChatPanel
