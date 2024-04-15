import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, username, password, confirm, gender }) => {
    const success = handleInputError({
      fullName,
      username,
      password,
      confirm,
      gender,
    });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirm, gender }),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      localStorage.setItem("chat-user", JSON.stringify(data));

      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

function handleInputError({ fullName, username, password, confirm, gender }) {
  if (!fullName || !username || !password || !confirm || !gender) {
    toast.error("Please fill in all required fields");
    return false;
  }

  if (password !== confirm) {
    toast.error("Password does not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}

export default useSignup;
