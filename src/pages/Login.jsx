import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <main className="login-page">
      <section className="login-page__card">
        <h1>Sign in</h1>
        <p>Sign in to create and manage your job listings.</p>

        <LoginForm />
      </section>
    </main>
  );
}

export default Login;
