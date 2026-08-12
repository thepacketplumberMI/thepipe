import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell home-page">
      <div className="mist mist-one" />
      <div className="mist mist-two" />
      <section className="hero" aria-labelledby="welcome-heading">
        <div className="rune-mark" aria-hidden="true">ᛏ</div>
        <p className="eyebrow">Private Network Portal</p>
        <h1 id="welcome-heading">Welcome to the Pipe</h1>
        <p className="lede">
          Your gateway to private worlds, shared adventures, and whatever we
          decide to build next.
        </p>
        <Link className="game-button" href="/valheim">
          <span className="button-icon" aria-hidden="true">ᛉ</span>
          <span>Valheim</span>
          <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </section>
      <footer>The Pipe · Private access only</footer>
    </main>
  );
}
