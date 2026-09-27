import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import ProtectedRoute from "../components/auth/ProtectedRoute";

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    user: null,
    loading: false,
  }),
}));

describe("ProtectedRoute", () => {
  test("redirects a signed-out user to the login page", () => {
    render(
      <MemoryRouter initialEntries={["/jobs/new"]}>
        <Routes>
          <Route
            path="/jobs/new"
            element={
              <ProtectedRoute>
                <h1>Create Job</h1>
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<h1>Sign in</h1>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Sign in" }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: "Create Job" }),
    ).not.toBeInTheDocument();
  });
});
