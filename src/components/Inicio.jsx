export default function Inicio({ posts = [], onImageClick }) {
  return (
    <section id="inicio-feed" className="section">
      <h2 className="section-title">Últimos momentos</h2>
      <p className="section-subtitle">Lo que he compartido recientemente</p>
      <div className="feed-grid">
        {posts.map((post) => (
          <article
            key={post.id}
            className="feed-card"
            onClick={() => onImageClick(post.image, posts, post)}
          >
            <img
              className="feed-card-image"
              src={post.image}
              alt={post.description}
              loading="lazy"
            />
            <div className="feed-card-body">
              <div className="feed-card-meta">
                <span>{post.date}</span>
                {post.location && (
                  <span className="feed-card-location">{post.location}</span>
                )}
              </div>
              <p className="feed-card-description">{post.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
