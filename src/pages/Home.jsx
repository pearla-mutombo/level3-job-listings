import { useState } from "react";
import JobFilters from "../components/jobs/JobFilters";
import { useJobs } from "../hooks/useJobs";
import JobList from "../components/jobs/JobList";

function Home() {
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [filters, setFilters] = useState({
    role: "",
    level: "",
    language: "",
    tool: "",
  });

  const { jobs, loading, error, loadJobs } = useJobs();

  function handleFilterChange(event) {
    const { name, value } = event.target;

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  }

  function clearFilters() {
    setFilters({
      role: "",
      level: "",
      language: "",
      tool: "",
    });
  }

  function removeFilter(name) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: "",
    }));
  }

  const activeFilters = Object.entries(filters).filter(
    ([, value]) => value !== "",
  );

  // Filtering logic
  const filteredJobs = jobs.filter((job) => {
    const matchesRole = filters.role === "" || job.role === filters.role;
    const matchesLevel = filters.level === "" || job.level === filters.level;
    const matchesLanguage =
      filters.language === "" || job.languages.includes(filters.language);
    const matchesTool = filters.tool === "" || job.tools.includes(filters.tool);

    return matchesRole && matchesLevel && matchesLanguage && matchesTool;
  });

  async function handleJobDeleted() {
    await loadJobs();
    setDeleteSuccess("Job listing deleted successfully!");
  }

  if (loading) {
    return (
      <main className="status-page">
        <p>Loading jobs...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="status-page">
        <p role="alert">Unable to load jobs: {error}</p>

        <button type="button" onClick={loadJobs}>
          Try Again
        </button>
      </main>
    );
  }

  if (jobs.length === 0) {
    return (
      <main className="status-page">
        <h1>Job Listings</h1>
        <p>No job listings are available yet.</p>
      </main>
    );
  }
  // Active filters, remove one, and clear all
  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">WELCOME TO VIANOVA</p>

          <h1 className="hero__title">
            Your next opportunity is waiting beyond the ordinary.
          </h1>

          <p className="hero__text">
            Explore new paths. Discover where your skills can take you.
          </p>
        </div>
      </section>

      <section className="jobs-section">
        <h2>Explore Opportunities</h2>
        <p>
          {filteredJobs.length} job{" "}
          {filteredJobs.length === 1 ? "listing" : "listings"} found.
        </p>
      </section>

      <JobFilters filters={filters} onFilterChange={handleFilterChange} />

      {activeFilters.length > 0 && (
        <div className="active-filters">
          <p>Active filters:</p>

          {activeFilters.map(([name, value]) => (
            <button
              className="active-filters__item"
              key={name}
              type="button"
              onClick={() => removeFilter(name)}>
              {value} ×
            </button>
          ))}

          <button type="button" onClick={clearFilters}>
            Clear All
          </button>
        </div>
      )}

      {filteredJobs.length === 0 ? (
        <div className="no-results">
          <p>No jobs match your selected filters.</p>

          <button type="button" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      ) : (
        <JobList jobs={filteredJobs} onJobDeleted={handleJobDeleted} />
      )}

      {deleteSuccess && <p role="status">{deleteSuccess}</p>}
    </main>
  );
}

export default Home;
