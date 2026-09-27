import { useState } from "react";

function JobForm({ onSubmit, submitting, initialData = null }) {
  const [formData, setFormData] = useState({
    company: initialData?.company ?? "",
    logo_url: initialData?.logo_url ?? "",
    position: initialData?.position ?? "",
    role: initialData?.role ?? "Frontend",
    level: initialData?.level ?? "Junior",
    contract: initialData?.contract ?? "Full Time",
    location: initialData?.location ?? "",
    languages: initialData?.languages?.join(", ") ?? "",
    tools: initialData?.tools?.join(", ") ?? "",
    is_new: initialData?.is_new ?? false,
    is_featured: initialData?.is_featured ?? false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const jobData = {
      ...formData,
      company: formData.company.trim(),
      position: formData.position.trim(),
      location: formData.location.trim(),
      logo_url: formData.logo_url.trim() || null,
      languages: formData.languages
        .split(",")
        .map((language) => language.trim())
        .filter(Boolean),
      tools: formData.tools
        .split(",")
        .map((tool) => tool.trim())
        .filter(Boolean),
    };

    await onSubmit(jobData);
  }

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2>Job Details</h2>
      <div className="job-form__field">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          minLength={2}
          required
        />
      </div>

      <div className="job-form__field">
        <label htmlFor="position">Position</label>
        <input
          id="position"
          name="position"
          type="text"
          value={formData.position}
          onChange={handleChange}
          minLength={2}
          required
        />
      </div>

      <div className="job-form__field">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Fullstack">Fullstack</option>
        </select>
      </div>

      <div className="job-form__field">
        <label htmlFor="level">Level</label>
        <select
          id="level"
          name="level"
          value={formData.level}
          onChange={handleChange}
          required>
          <option value="Junior">Junior</option>
          <option value="Midweight">Midweight</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div className="job-form__field">
        <label htmlFor="contract">Contract</label>
        <select
          id="contract"
          name="contract"
          value={formData.contract}
          onChange={handleChange}
          required>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div className="job-form__field">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          minLength={2}
          required
        />
      </div>

      <div className="job-form__field">
        <label htmlFor="languages">Languages</label>
        <input
          id="languages"
          name="languages"
          type="text"
          value={formData.languages}
          onChange={handleChange}
          placeholder="HTML, CSS, JavaScript"
        />
      </div>

      <div className="job-form__field">
        <label htmlFor="tools">Tools</label>
        <input
          id="tools"
          name="tools"
          type="text"
          value={formData.tools}
          onChange={handleChange}
          placeholder="React, Sass"
        />
      </div>

      <div className="job-form__field">
        <label htmlFor="logo_url">Logo URL</label>
        <input
          id="logo_url"
          name="logo_url"
          type="url"
          value={formData.logo_url}
          onChange={handleChange}
          placeholder="https://example.com/logo.png"
        />
      </div>

      <div className="job-form__field">
        <label htmlFor="is_new">
          <input
            id="is_new"
            name="is_new"
            type="checkbox"
            checked={formData.is_new}
            onChange={handleChange}
          />
          Mark as NEW
        </label>
      </div>

      <div className="job-form__field">
        <label htmlFor="is_featured">
          <input
            id="is_featured"
            name="is_featured"
            type="checkbox"
            checked={formData.is_featured}
            onChange={handleChange}
          />
          Mark as FEATURED
        </label>
      </div>

      <button type="submit" className="job-form__submit" disabled={submitting}>
        {submitting
          ? initialData
            ? "Saving..."
            : "Publishing..."
          : initialData
            ? "Save Changes"
            : "Publish Job"}
      </button>
    </form>
  );
}

export default JobForm;
