document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                loginMessage.textContent = "Login successful!";
                loginMessage.style.color = "green";

                // Optional: redirect after login
                setTimeout(() => {
                    window.location.href = "/users/list"; // or wherever you want
                }, 1000);
            } else {
                loginMessage.textContent = data.message || "Login failed.";
                loginMessage.style.color = "red";
            }
        } catch (error) {
            loginMessage.textContent = "Error logging in.";
            loginMessage.style.color = "red";
        }
    });
});
