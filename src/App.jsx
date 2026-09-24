import { useJobs } from "./hooks/useJobs";
import JobList from "./components/jobs/JobList";

function App() {
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return (
      <main>
        <p>Loading jobs...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p role="alert">Unable to load jobs: {error}</p>
      </main>
    );
  }
  if (jobs.length === 0) {
    return (
      <main>
        <h1>Job Listings</h1>
        <p>No job listings are available yet.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Job Listings</h1>
      <p>{jobs.length} job listings found.</p>
      <JobList jobs={jobs} />
    </main>
  );
}

export default App;
