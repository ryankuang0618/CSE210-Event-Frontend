import { GoogleLogin, googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { UserData } from "../types/User";
import { useInfo } from "../UserInfo";
import { addUsers } from "../api/UserApi"

function Login() {
    const CLIENT_ID = "790798869250-lbundcmheeg71b2cs1c03aa31fb9174h.apps.googleusercontent.com";
    const [user, setUser] = useState<UserData | null>(null);
    const { dispatch } = useInfo();

    const handleLogin = async (userData: UserData, token: string) => {
        setUser(userData);
        dispatch({ type: "LOGIN", payload: userData });
        addUsers(token).then((response) => {
            if (response) {
                console.log(token)
                console.log("User logged in:", userData);
                setUser(userData);
                dispatch({ type: "LOGIN", payload: userData });
            } else {
                console.error("Failed to login user", response);
             }
        })
        .catch((error) => {
            console.error("Error logging in:", error);
        });
    };

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        console.log("User logged out");
    };

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <div className="d-flex justify-content-center align-items-center flex-column">
                {user ? (
                    <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 me-3">Welcome, {user.name}</p>
                    <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                </div>
                ) : (
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            const token = credentialResponse.credential ?? "";
                            const decoded: Partial<UserData> = jwtDecode(token!) as Partial<UserData>;

                            if (decoded.email && decoded.email.endsWith("@ucsd.edu")) {
                                const userData: UserData = {
                                    given_name: decoded.given_name ?? "",
                                    family_name: decoded.family_name ?? "",
                                    name: decoded.name ?? "",
                                    email: decoded.email ?? "",
                                    token: token ?? "",
                                };
                                handleLogin(userData, token);
                            } else {
                                console.log("Login Failed: Restricted to @ucsd.edu accounts.");
                                googleLogout();
                                alert("Only @ucsd.edu accounts are allowed.");
                            }
                        }}
                        onError={() => console.log("Login failed")}
                        useOneTap
                    />
                )}
            </div>
        </GoogleOAuthProvider>
    );
}

export default Login;
