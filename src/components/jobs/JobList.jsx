import JobCard from "./JobCard";

function JobList({ jobs, onJobDeleted }) {
  return (
    <section className="job-list" aria-label="Job listings">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onJobDeleted={onJobDeleted} />
      ))}
    </section>
  );
}

export default JobList;
