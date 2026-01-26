import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-container">
      {/* Floating Elements Background */}
      <div className="floating-elements">
        <div className="element element-1">404</div>
        <div className="element element-2">?</div>
        <div className="element element-3">!</div>
      </div>

      {/* Main Content */}
      <div className="not-found-content">
        {/* Error Animation */}
        <div className="error-animation">
          <h1 className="error-code">404</h1>
          <div className="error-decoration">
            <span className="bracket-left">&lt;</span>
            <span className="text-error">/&gt;</span>
            <span className="bracket-right">&gt;</span>
          </div>
        </div>

        {/* Error Text */}
        <div className="error-text">
          <h2 className="error-title">Oups ! Page non trouvée</h2>
          <p className="error-description">
            Vous avez pris un raccourci vers le néant... 🕳️
          </p>
          <p className="error-message">
            Soit vous cherchez quelque chose qui n&apos;existe pas, soit mon
            site fait des blagues pas drôles. Probablement les deux.
          </p>
        </div>

        {/* Code Block */}
        <div className="code-block">
          <div className="code-header">
            <span className="code-dot red"></span>
            <span className="code-dot yellow"></span>
            <span className="code-dot green"></span>
          </div>
          <div className="code-content">
            <p>
              <span className="const">const</span>{" "}
              <span className="page">page</span>{" "}
              <span className="equals">=</span>{" "}
              <span className="string">&quot;404&quot;</span>
            </p>
            <p>
              <span className="comment">{`// Cette page n'existe pas`}</span>
            </p>
            <p>
              <span className="const">if</span>
              <span className="bracket">(</span>
              <span className="page">page</span>
              <span className="bracket">)</span>
              <span className="bracket"> {`{`}</span>
            </p>
            <p className="indent">
              <span className="const">return</span>{" "}
              <span className="string">&quot;Désolé!&quot;</span>
            </p>
            <p>
              <span className="bracket">{`}`}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Link href="/" className="btn btn-primary">
            ← Retour à l&apos;accueil
          </Link>
          <Link href="/projects" className="btn btn-secondary">
            Voir mes projets →
          </Link>
        </div>

        {/* Easter Egg */}
        <div className="easter-egg">
          <p>
            <span className="emoji">🐛</span>
            Vous avez trouvé un bug ? Vous êtes observateur !
            <span className="emoji">🎯</span>
          </p>
        </div>
      </div>

      {/* Cursor Follow Animation */}
      <div className="cursor-glow"></div>
    </div>
  );
}
