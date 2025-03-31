import { useState } from "react";
import { auth, googleProvider } from "../Firebase/Firebase"; 
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("✅ Login successful!");
            navigate("/dashboard"); // Redirect after login
        } catch (error) {
            console.error("❌ Login Error:", error.message);
            alert("❌ Login failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            alert("✅ Google login successful!");
            navigate("/dashboard");
        } catch (error) {
            console.error("❌ Google Login Error:", error.message);
            alert("❌ Google login failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGuestLogin = () => {
        alert("⚠️ You're using Guest Mode. Some features may be limited.");
        navigate("/dashboard"); // Proceed without authentication
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full px-4 py-2 border rounded-md"
                        required 
                    />

                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-4 py-2 border rounded-md"
                        required 
                    />

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="text-center my-4 text-gray-500">or</div>

                <button 
                    onClick={handleGoogleLogin} 
                    className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign in with Google"}
                </button>

                <button 
                    onClick={handleGuestLogin} 
                    className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 mt-4"
                    disabled={loading}
                >
                    Continue as Guest
                </button>
            </div>
        </div>
    );
};

export default Login;
