import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";

function Header() {
  const { user, loading } = useAuth();

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <header className="header">
      <nav className="header__nav" aria-label="Main navigation">
        <Link className="header__brand" to="/">
          Job Board
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
