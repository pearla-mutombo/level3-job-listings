import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import JobCard from "../components/jobs/JobCard";

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    user: { id: "user-2" },
    loading: false,
  }),
}));

describe("JobCard", () => {
  test("hides edit and delete actions from a user who does not own the job", () => {
    const job = {
      id: "job-1",
      user_id: "user-1",
      company: "ViaNova",
      logo_url: "",
      position: "Frontend Developer",
      role: "Frontend",
      level: "Junior",
      contract: "Full Time",
      location: "Remote",
      languages: ["JavaScript"],
      tools: ["React"],
      is_new: false,
      is_featured: false,
    };

    render(
      <MemoryRouter>
        <JobCard job={job} onJobDeleted={vi.fn()} />
      </MemoryRouter>,
    );

    expect(
      screen.queryByRole("link", { name: "Edit" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Delete" }),
    ).not.toBeInTheDocument();
  });
});
