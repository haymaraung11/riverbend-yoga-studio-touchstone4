
"use strict";

alert("JavaScript is working!");

// Available classes and workshops
const classOptions = [
    "gentle-yoga",
    "vinyasa-yoga",
    "restorative-yoga",
    "first-steps-workshop",
    "breathing-workshop",
    "rest-and-restore",
    "private-session"
];

// Available experience levels
const experienceLevels = [
    "beginner",
    "some-experience",
    "experienced"
];

// Validation messages
const validationMessages = {
    name: "Please enter your full name.",
    email: "Please enter a valid email address.",
    interest: "Please select a class or event.",
    experience: "Please select your experience level.",
    contact: "Please select your preferred contact method."
};

// Get form elements using the IDs from events.html
const form = document.getElementById("interestForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const interestSelect = document.getElementById("interest");
const contactSelect = document.getElementById("contact-method");
const message = document.getElementById("formMessage");

const STORAGE_KEY = "riverbendPreferredInterest";

// Display an error message
function showError(errorId, errorText) {
    document.getElementById(errorId).textContent = errorText;
}

// Save the selected class or workshop
function savePreference() {
    const selectedInterest = interestSelect.value;

    if (classOptions.includes(selectedInterest)) {
        localStorage.setItem(STORAGE_KEY, selectedInterest);
    } else {
        localStorage.removeItem(STORAGE_KEY);
    }
}

// Restore the saved class or workshop
function loadPreference() {
    const savedInterest = localStorage.getItem(STORAGE_KEY);

    if (classOptions.includes(savedInterest)) {
        interestSelect.value = savedInterest;
    }
}

// Validate the form
function validateForm() {
    let isValid = true;

    // Clear previous errors
    showError("nameError", "");
    showError("emailError", "");
    showError("interestError", "");
    showError("experienceError", "");
    showError("contactError", "");
    message.textContent = "";

    // Validate name
    if (nameInput.value.trim() === "") {
        showError("nameError", validationMessages.name);
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value.trim())) {
        showError("emailError", validationMessages.email);
        isValid = false;
    }

    // Validate class or workshop
    if (!classOptions.includes(interestSelect.value)) {
        showError("interestError", validationMessages.interest);
        isValid = false;
    }

    // Validate experience radio buttons
    const selectedExperience =
        document.querySelector('input[name="experience"]:checked');

    if (
        !selectedExperience ||
        !experienceLevels.includes(selectedExperience.value)
    ) {
        showError("experienceError", validationMessages.experience);
        isValid = false;
    }

    // Validate contact method
    if (!["email", "phone"].includes(contactSelect.value)) {
        showError("contactError", validationMessages.contact);
        isValid = false;
    }

    return isValid;
}

// Save preference when the selection changes
interestSelect.addEventListener("change", savePreference);

// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
        const visitorName = nameInput.value.trim();

        savePreference();

        message.textContent =
            "Thank you, " + visitorName +
            "! Your interest request has been checked successfully. " +
            "The studio will confirm event details when responding.";

        form.reset();

        // Restore the saved selection after resetting
        loadPreference();
    } else {
        message.textContent =
            "Please correct the errors above and try again.";
    }
});

// Load the saved preference when the page opens
loadPreference();
