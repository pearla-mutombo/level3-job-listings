import { Link } from "react-router-dom";

function Page404() {
  return (
    <main className="not-found">
      <div className="not-found__content">
        <p className="not-found__code">404</p>

        <h1>This path leads somewhere unexpected.</h1>

        <p className="not-found__message">
          The opportunity you are looking for may have moved, but your next path
          is still waiting.
        </p>

        <Link className="not-found__link" to="/">
          Return to Jobs
        </Link>
      </div>
    </main>
  );
}

export default Page404;
