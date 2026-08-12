import Link from "next/link";

export default function ValheimPage() {
  return (
    <main className="page-shell valheim-page">
      <div className="mist mist-one" />
      <div className="mist mist-two" />
      <article className="instruction-card">
        <Link className="back-link" href="/">← Back to the Pipe</Link>
        <div className="rune-mark small" aria-hidden="true">ᛉ</div>
        <p className="eyebrow">Private Game Server</p>
        <h1>Enter Valheim</h1>
        <p className="lede compact">
          The server is private. Follow these steps when it is ready and we’ll
          meet you beyond the stones.
        </p>

        <ol className="steps">
          <li>
            <span className="step-number">01</span>
            <div><h2>Open Valheim</h2><p>Launch the game through Steam and select <strong>Start Game</strong>.</p></div>
          </li>
          <li>
            <span className="step-number">02</span>
            <div><h2>Join by IP</h2><p>Choose <strong>Join Game</strong>, then <strong>Add Server</strong>. The server address will be posted here later.</p></div>
          </li>
          <li>
            <span className="step-number">03</span>
            <div><h2>Enter the password</h2><p>Use the private server password provided by the host. Don’t share it publicly.</p></div>
          </li>
        </ol>

        <div className="server-status"><span className="status-dot" /> Server details coming soon</div>
      </article>
      <footer>The Pipe · Valheim server</footer>
    </main>
  );
}
