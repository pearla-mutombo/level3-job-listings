import JobCard from "./JobCard";

function JobList({ jobs, onJobDeleted, ariaLabel = "Job listings" }) {
  return (
    <section className="job-list" aria-label={ariaLabel}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onJobDeleted={onJobDeleted} />
      ))}
    </section>
  );
}

export default JobList;
