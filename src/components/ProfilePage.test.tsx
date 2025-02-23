import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { jest } from '@jest/globals';
import ProfilePage from "../components/ProfilePage";
import '@testing-library/jest-dom';
import { useInfo } from "../UserInfo";
import { getFriends, getFriendsRequest } from "../api/FriendApi";
import { getUsers } from "../api/UserApi";
import { BrowserRouter } from "react-router-dom";

// Mock the useInfo hook
jest.mock("../UserInfo", () => ({
    useInfo: jest.fn(),
}));

// Mock API calls
jest.mock("../api/FriendApi", () => ({
    getFriends: jest.fn(),
    getFriendsRequest: jest.fn(),
    getUsers: jest.fn(),
}));

describe("ProfilePage Component", () => {
    beforeEach(() => {
        // Mock user state
        (useInfo as jest.Mock).mockReturnValue({
            state: { user: { token: "mockToken" } },
        });

        // Mock API responses
        (getFriends as jest.Mock).mockResolvedValue({
            friends: [
                {fullname: "User 1", email: "user1@example.com" },
                {fullname: "User 2", email: "user2@example.com" },
            ],
        } as { friends: { fullname: string; email: string }[] });
        
        (getFriendsRequest as jest.Mock).mockResolvedValue({
            friendRequests: [
                {fullname: "User 3", email: "user3@example.com" },
            ],
        } as { friendRequests: { fullname: string; email: string }[] });
    });

    it("renders profile page with user details", async () => {
        render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
        );

        // Check for title
        expect(screen.getByText("My Profile")).toBeInTheDocument();

        // Wait for API calls and check for rendered friends
        await waitFor(() => {
            expect(screen.getByText("User 1(user1@example.com)")).toBeInTheDocument();
            expect(screen.getByText("User 2(user2@example.com)")).toBeInTheDocument();
        });

        // Check for pending friend requests
        await waitFor(() => {
            expect(screen.getByText("User 3(user3@example.com)")).toBeInTheDocument();
        });
    });

});
