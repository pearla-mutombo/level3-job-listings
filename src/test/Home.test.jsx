import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Home from "../pages/Home";

vi.mock("../hooks/useJobs", () => ({
  useJobs: () => ({
    jobs: [
      {
        id: "1",
        user_id: "user-1",
        company: "Northstar Labs",
        logo_url: null,
        position: "Senior Frontend Engineer",
        role: "Frontend",
        level: "Senior",
        contract: "Full Time",
        location: "Remote",
        languages: ["HTML", "CSS", "JavaScript"],
        tools: ["React", "Sass"],
        is_new: true,
        is_featured: true,
      },
      {
        id: "2",
        user_id: "user-2",
        company: "Backend Works",
        logo_url: null,
        position: "Senior Backend Developer",
        role: "Backend",
        level: "Senior",
        contract: "Full Time",
        location: "Remote",
        languages: ["JavaScript"],
        tools: ["React"],
        is_new: false,
        is_featured: false,
      },
      {
        id: "3",
        user_id: "user-3",
        company: "Frontend Studio",
        logo_url: null,
        position: "Junior Frontend Developer",
        role: "Frontend",
        level: "Junior",
        contract: "Full Time",
        location: "Remote",
        languages: ["JavaScript"],
        tools: ["React"],
        is_new: false,
        is_featured: false,
      },
    ],
    loading: false,
    error: null,
    loadJobs: vi.fn(),
  }),
}));

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    user: null,
    loading: false,
  }),
}));

describe("Home filtering", () => {
  test("shows only jobs that match all selected filters", async () => {
    const user = userEvent.setup();

    render(<Home />);

    await user.selectOptions(screen.getByLabelText("Role"), "Frontend");
    await user.selectOptions(screen.getByLabelText("Level"), "Senior");
    await user.selectOptions(screen.getByLabelText("Language"), "JavaScript");
    await user.selectOptions(screen.getByLabelText("Tool"), "React");

    expect(screen.getByText("Senior Frontend Engineer")).toBeInTheDocument();

    expect(
      screen.queryByText("Senior Backend Developer"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Junior Frontend Developer"),
    ).not.toBeInTheDocument();

    expect(screen.getByText("1 job listing found.")).toBeInTheDocument();
  });
});
