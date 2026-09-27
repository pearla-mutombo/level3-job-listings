import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import JobForm from "../components/jobs/JobForm";

describe("JobForm", () => {
  test("submits the completed job form with languages and tools as arrays", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<JobForm onSubmit={handleSubmit} submitting={false} />);

    await user.type(screen.getByLabelText("Company"), "ViaNova");
    await user.type(screen.getByLabelText("Position"), "Frontend Developer");
    await user.type(screen.getByLabelText("Location"), "Remote");
    await user.type(
      screen.getByLabelText("Languages"),
      "HTML, CSS, JavaScript",
    );
    await user.type(screen.getByLabelText("Tools"), "React, Sass");

    await user.click(screen.getByRole("button", { name: "Publish Job" }));

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        company: "ViaNova",
        position: "Frontend Developer",
        location: "Remote",
        languages: ["HTML", "CSS", "JavaScript"],
        tools: ["React", "Sass"],
      }),
    );
  });
});
