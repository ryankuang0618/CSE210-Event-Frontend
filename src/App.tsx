import HomePage from "./components/HomePage"
import TopPage from "./components/TopPage"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";

import AllEventPage from "./components/AllEventPage";

import EventDetailsPage from "./components/EventDetailsPage"

import { UserProvider } from "./UserInfo";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
          <div className="d-flex flex-column min-vh-100">
            <TopPage></TopPage>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/all-events" element={<AllEventPage />} />
              <Route path="/event/:id" element={<EventDetailsPage />} />
            </Routes>
          </div>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App