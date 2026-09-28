import vianovaLogo from "../../assets/vianova-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";

function Header({ title }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <header className="header">
      <nav className="header__nav" aria-label="Main navigation">
        <Link className="header__brand" to="/">
          <img
            className="header__logo"
            src={vianovaLogo}
            alt=""
            aria-hidden="true"
          />

          <span className="header__brand-text">
            <span className="header__brand-name">{title}</span>
            <span className="header__brand-tagline">
              Find the path to what comes next.
            </span>
          </span>
        </Link>

        <div className="header__links">
          <Link to="/">Jobs</Link>

          {!loading && !user && <Link to="/login">Sign in</Link>}

          {!loading && user && (
            <>
              <Link to="/jobs/new">Create job</Link>

              <button type="button" onClick={handleSignOut}>
                Sign out
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
