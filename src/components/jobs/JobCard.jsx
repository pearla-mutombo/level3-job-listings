function JobCard({ job }) {
  return (
    <article className="job-card">
      {job.logo_url && (
        <img
          className="job-card__logo"
          src={job.logo_url}
          alt={`${job.company} logo`}
        />
      )}

      <h2 className="job-card__position">{job.position}</h2>
      <p className="job-card__company">{job.company}</p>
      {job.is_new && <span className="job-card__badge">NEW!</span>}
      {job.is_featured && (
        <span className="job-card__badge job-card__badge--featured">
          FEATURED
        </span>
      )}
      <p className="job-card__details">
        {job.contract} · {job.location}
      </p>
      <div className="job-card__tags">
        <span className="job-card__tag">{job.role}</span>
        <span className="job-card__tag">{job.level}</span>

        {job.languages.map((language) => (
          <span className="job-card__tag" key={language}>
            {language}
          </span>
        ))}

        {job.tools.map((tool) => (
          <span className="job-card__tag" key={tool}>
            {tool}
          </span>
        ))}
      </div>
    </article>
  );
}

export default JobCard;
