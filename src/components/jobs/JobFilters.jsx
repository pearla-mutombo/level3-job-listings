function JobFilters({ filters, onFilterChange }) {
  return (
    <section className="job-filters" aria-label="Filter job listings">
      <h2>Filter Jobs</h2>

      <div className="job-filters__group">
        <label htmlFor="role-filter">Role</label>
        <select
          id="role-filter"
          name="role"
          value={filters.role}
          onChange={onFilterChange}>
          <option value="">All roles</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Fullstack">Fullstack</option>
        </select>
      </div>

      <div className="job-filters__group">
        <label htmlFor="level-filter">Level</label>
        <select
          id="level-filter"
          name="level"
          value={filters.level}
          onChange={onFilterChange}>
          <option value="">All levels</option>
          <option value="Junior">Junior</option>
          <option value="Midweight">Midweight</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div className="job-filters__group">
        <label htmlFor="language-filter">Language</label>
        <select
          id="language-filter"
          name="language"
          value={filters.language}
          onChange={onFilterChange}>
          <option value="">All languages</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Ruby">Ruby</option>
        </select>
      </div>

      <div className="job-filters__group">
        <label htmlFor="tool-filter">Tool</label>
        <select
          id="tool-filter"
          name="tool"
          value={filters.tool}
          onChange={onFilterChange}>
          <option value="">All tools</option>
          <option value="React">React</option>
          <option value="Sass">Sass</option>
          <option value="Vue">Vue</option>
          <option value="Django">Django</option>
          <option value="RoR">RoR</option>
        </select>
      </div>
    </section>
  );
}

export default JobFilters;
