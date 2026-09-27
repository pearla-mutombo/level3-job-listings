import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { deleteJob } from "../../services/jobs";

function JobCard({ job, onJobDeleted }) {
  const { user } = useAuth();
  const [deleteError, setDeleteError] = useState("");
  const isOwner = user?.id === job.user_id;

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${job.position} at ${job.company}?`,
    );

    if (!confirmed) {
      return;
    }

    setDeleteError("");

    try {
      await deleteJob(job.id);
      await onJobDeleted();
    } catch (err) {
      setDeleteError(err.message);
    }
  }

  return (
    <article className="job-card">
      {job.logo_url ? (
        <img
          className="job-card__logo"
          src={job.logo_url}
          alt={`${job.company} logo`}
        />
      ) : (
        <div className="job-card__logo-placeholder" aria-hidden="true">
          {job.company.charAt(0)}
        </div>
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

      {deleteError && <p role="alert">{deleteError}</p>}

      {isOwner && (
        <div className="job-card__actions">
          <Link to={`/jobs/${job.id}/edit`}>Edit</Link>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </article>
  );
}

export default JobCard;
