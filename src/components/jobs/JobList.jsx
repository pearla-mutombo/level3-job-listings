import JobCard from "./JobCard";

function JobList({ jobs }) {
  return (
    <section className="job-list" aria-label="Job listings">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </section>
  );
}

export default JobList;
