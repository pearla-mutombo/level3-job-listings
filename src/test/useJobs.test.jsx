import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useJobs } from "../hooks/useJobs";
import { getJobs } from "../services/jobs";

vi.mock("../services/jobs", () => ({
  getJobs: vi.fn(),
}));

describe("useJobs", () => {
  test("stores an error when loading jobs fails", async () => {
    getJobs.mockRejectedValueOnce(new Error("Unable to load jobs"));

    const { result } = renderHook(() => useJobs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.jobs).toEqual([]);
    expect(result.current.error).toBe("Unable to load jobs");
  });
});
