import { useState } from "react";
import { useJobs } from "../hooks/useJobs";
import JobList from "../components/jobs/JobList";

function Home() {
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const { jobs, loading, error, loadJobs } = useJobs();

  async function handleJobDeleted() {
    await loadJobs();
    setDeleteSuccess("Job listing deleted successfully!");
  }

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
      {deleteSuccess && <p role="status">{deleteSuccess}</p>}
      <JobList jobs={jobs} onJobDeleted={handleJobDeleted} />
    </main>
  );
}

export default Home;
