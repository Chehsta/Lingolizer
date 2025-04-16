document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const registerMessage = document.getElementById("register-message");
  
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value,
        native_language: document.getElementById("native_language").value,
        learning_language: document.getElementById("learning_language").value,
      };
  
      try {
        const response = await fetch("/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          registerMessage.textContent = "Registration successful!";
          registerMessage.style.color = "green";
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        } else {
          registerMessage.textContent = data.message || "Registration failed.";
          registerMessage.style.color = "red";
        }
      } catch (error) {
        registerMessage.textContent = "Error during registration.";
        registerMessage.style.color = "red";
      }
    });
  });
  