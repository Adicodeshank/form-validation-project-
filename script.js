// Helper functions
function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "Error");
    error.textContent = message;
    error.classList.add("show");
    input.classList.add("error");
    input.classList.remove("success");
}

function clearError(fieldId) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "Error");
    error.classList.remove("show");
    input.classList.remove("error");
    input.classList.add("success");
}

// Validation functions
function validateName() {
    const name = document.getElementById("fullName").value.trim();
    if (name === "") return showError("fullName", "Name cannot be empty"), false;
    if (name.length < 5) return showError("fullName", "Name must be at least 5 characters"), false;
    clearError("fullName");
    return true;
}

function validateEmail() {
    const email = document.getElementById("email").value.trim();
    if (email === "") return showError("email", "Email cannot be empty"), false;
    if (!email.includes("@")) return showError("email", "Enter a valid email ID"), false;
    clearError("email");
    return true;
}

function validatePhone() {
    const phone = document.getElementById("phone").value.trim();
    if (phone === "") return showError("phone", "Phone number cannot be empty"), false;
    if (isNaN(phone)) return showError("phone", "Phone number must contain only digits"), false;
    if (phone.length !== 10) return showError("phone", "Phone number must be 10 digits"), false;
    if (phone === "1234567890") return showError("phone", "Phone number cannot be 1234567890"), false;
    clearError("phone");
    return true;
}

function validatePassword() {
    const password = document.getElementById("password").value;
    const name = document.getElementById("fullName").value.trim().toLowerCase();
    if (password === "") return showError("password", "Password cannot be empty"), false;
    if (password.length < 8) return showError("password", "Password is not strong"), false;
    if (password.toLowerCase() === "password" || password.toLowerCase() === name)
        return showError("password", "Password is not strong"), false;
    clearError("password");
    return true;
}

function validateConfirmPassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (confirmPassword === "") return showError("confirmPassword", "Please confirm your password"), false;
    if (password !== confirmPassword) return showError("confirmPassword", "Passwords do not match"), false;
    clearError("confirmPassword");
    return true;
}

// Attach onChange listeners
document.getElementById("fullName").addEventListener("change", validateName);
document.getElementById("email").addEventListener("change", validateEmail);
document.getElementById("phone").addEventListener("change", validatePhone);
document.getElementById("password").addEventListener("change", validatePassword);
document.getElementById("confirmPassword").addEventListener("change", validateConfirmPassword);

// Form submit handler
document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const valid =
        validateName() &
        validateEmail() &
        validatePhone() &
        validatePassword() &
        validateConfirmPassword();

    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    if (valid) {
        successMessage.style.display = "block";
        errorMessage.style.display = "none";

        this.reset();
        const inputs = document.querySelectorAll(".form-control");
        inputs.forEach((input) => input.classList.remove("success", "error"));
        const errors = document.querySelectorAll(".error-message");
        errors.forEach((msg) => msg.classList.remove("show"));

        setTimeout(() => (successMessage.style.display = "none"), 3000);
    } else {
        errorMessage.style.display = "block";
        successMessage.style.display = "none";
        setTimeout(() => (errorMessage.style.display = "none"), 3000);
    }
});
