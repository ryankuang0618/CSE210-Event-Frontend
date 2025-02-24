import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventDetailsPage from "../components/EventDetailsPage";
import "@testing-library/jest-dom";
import { mockEvents } from "../api/MockEventData";

jest.mock("../api/MockEventData", () => ({
  mockEvents: [
    {
      id: 1,
      name: "Sample Event",
      host: "Host",
      description: "This is a sample event.",
      date: "2025-03-01",
      time: "12:00 PM",
      location: ["XYZ"],
      friends: [
        { name: "Friend 1" },
        { name: "Friend 2" }
      ]
    }
  ]
}));

describe("EventDetailsPage Component", () => {
  it("renders event details for a valid event ID", async () => {
    render(
      <BrowserRouter>
        
          <EventDetailsPage/>
        
      </BrowserRouter>,
      { route: "/event/1" }
    );

    await waitFor(() => {
      expect(screen.getByText("Sample Event")).toBeInTheDocument();
      expect(screen.getByText("Posted by Host")).toBeInTheDocument();
      expect(screen.getByText("This is a sample event.")).toBeInTheDocument();
      expect(screen.getByText("XYZ")).toBeInTheDocument();
      expect(screen.getByText("Friend 1")).toBeInTheDocument();
      expect(screen.getByText("Friend 2")).toBeInTheDocument();
    });
  });
});
