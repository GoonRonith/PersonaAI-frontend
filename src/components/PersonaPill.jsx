function PersonaPill({ persona, active, onSelect }) {
  return (
    <button
      type="button"
      className={`persona-pill ${active ? 'active' : ''}`}
      onClick={() => onSelect(persona.key)}
    >
      <img
        src={persona.image}
        alt={persona.name}
        className="persona-pill__avatar"
      />
      <span className="persona-pill__details">
        <strong>{persona.name}</strong>
        <small>{persona.role}</small>
      </span>
    </button>
  )
}

export default PersonaPill
