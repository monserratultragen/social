export default function Amigos({ friends = [] }) {
  return (
    <section id="amigos" className="section">
      <h2 className="section-title">Amigas</h2>
      <p className="section-subtitle">Las personas que hacen mi mundo más bonito</p>
      <div className="amigos-grid">
        {friends.map((friend) => (
          <div key={friend.id} className="amigo-card">
            <img className="amigo-avatar" src={friend.avatar} alt={friend.name} loading="lazy" />
            <div className="amigo-name">{friend.name}</div>
            <div className="amigo-shared">{friend.shared} fotos compartidas</div>
          </div>
        ))}
      </div>
    </section>
  );
}
