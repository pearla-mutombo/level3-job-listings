import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import JobFilters from "../components/jobs/JobFilters";

describe("JobFilters", () => {
  const filters = {
    role: "",
    level: "",
    language: "",
    tool: "",
  };

  test("renders all four job filters", () => {
    render(<JobFilters filters={filters} onFilterChange={() => {}} />);

    expect(screen.getByLabelText("Role")).toBeInTheDocument();
    expect(screen.getByLabelText("Level")).toBeInTheDocument();
    expect(screen.getByLabelText("Language")).toBeInTheDocument();
    expect(screen.getByLabelText("Tool")).toBeInTheDocument();
  });

  test("calls the filter change function when a role is selected", async () => {
    const user = userEvent.setup();
    const handleFilterChange = vi.fn();

    render(
      <JobFilters filters={filters} onFilterChange={handleFilterChange} />,
    );

    await user.selectOptions(screen.getByLabelText("Role"), "Frontend");

    expect(handleFilterChange).toHaveBeenCalled();
  });
});
