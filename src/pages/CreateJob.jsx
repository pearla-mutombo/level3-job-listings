import { useState } from "react";
import JobForm from "../components/jobs/JobForm";
import { createJob } from "../services/jobs";

function CreateJob() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setsubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  async function handleCreateJob(jobData) {
    try {
      setError("");
      setSuccess("");
      setsubmitting(true);
      await createJob(jobData);
      setSuccess("Job listing created successfully!");
      setResetKey((currentKey) => currentKey + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setsubmitting(false);
    }
  }
  return (
    <main className="job-page">
      <h1>Create Job</h1>
      <p>Add a new job listing to ViaNova.</p>

      {error && <p role="alert">{error}</p>}
      {success && <p role="status">{success}</p>}

      <JobForm
        key={resetKey}
        onSubmit={handleCreateJob}
        submitting={submitting}
      />
    </main>
  );
}

export default CreateJob;
