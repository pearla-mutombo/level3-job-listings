import { useEffect, useState } from "react";
import { getJobs } from "../services/jobs";

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadJobs() {
    try {
      setLoading(true);
      setError(null);

      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchInitialJobs() {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    loadJobs,
  };
}
