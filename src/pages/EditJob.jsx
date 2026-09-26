import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobForm from "../components/jobs/JobForm";
import { getJobById, updateJob } from "../services/jobs";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadJob() {
      try {
        setError("");

        const data = await getJobById(id);
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [id]);

  async function handleUpdateJob(jobData) {
    try {
      setError("");
      setSubmitting(true);

      await updateJob(id, jobData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }
  // EditJob loading state
  if (loading) {
    return (
      <main>
        <p>Loading job...</p>
      </main>
    );
  }
  // EditJob error state
  if (error) {
    return (
      <main>
        <p role="alert">Unable to load job: {error}</p>
      </main>
    );
  }
  // EditJob form
  return (
    <main>
      <h1>Edit Job</h1>
      <p>Update your job listing.</p>

      <JobForm
        initialData={job}
        onSubmit={handleUpdateJob}
        submitting={submitting}
      />
    </main>
  );
}

export default EditJob;
