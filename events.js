
"use strict";

// Available classes and experience levels
const classOptions = [
    "Beginner Yoga",
    "Gentle Yoga",
    "Vinyasa Yoga",
    "Yoga Workshop"
];

const experienceLevels = [
    "Beginner",
    "Intermediate",
    "Experienced"
];

// Messages used for form validation
const validationMessages = {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    classInterest: "Please select a class or workshop.",
    experience: "Please select your experience level.",
    contact: "Please select a contact method."
};

// Find the form and its fields
const form = document.getElementById("interestForm");
const nameInput = document.getElementById("visitorName");
const emailInput = document.getElementById("visitorEmail");
const classSelect = document.getElementById("classInterest");
const experienceSelect = document.getElementById("experience");
const contactSelect = document.getElementById("contactMethod");
const message = document.getElementById("formMessage");

const STORAGE_KEY = "riverbendPreferredClass";

// Display an error beside a field
function showError(errorId, errorText) {
    document.getElementById(errorId).textContent = errorText;
}

// Save the selected class in browser storage
function savePreference() {
    const selectedClass = classSelect.value;

    if (classOptions.includes(selectedClass)) {
        localStorage.setItem(STORAGE_KEY, selectedClass);
    } else {
        localStorage.removeItem(STORAGE_KEY);
    }
}

// Restore the previously selected class
function loadPreference() {
    const savedClass = localStorage.getItem(STORAGE_KEY);

    if (classOptions.includes(savedClass)) {
        classSelect.value = savedClass;
    }
}

// Validate all required fields
function validateForm() {
    let isValid = true;

    // Clear old error messages
    showError("nameError", "");
    showError("emailError", "");
    showError("classError", "");
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

    // Validate class selection
    if (!classOptions.includes(classSelect.value)) {
        showError("classError", validationMessages.classInterest);
        isValid = false;
    }

    // Validate experience level
    if (!experienceLevels.includes(experienceSelect.value)) {
        showError("experienceError", validationMessages.experience);
        isValid = false;
    }

    // Validate contact method
    if (!["Email", "Phone"].includes(contactSelect.value)) {
        showError("contactError", validationMessages.contact);
        isValid = false;
    }

    return isValid;
}

// Save preference when the visitor changes the class
classSelect.addEventListener("change", savePreference);

// Process the form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
        const visitorName = nameInput.value.trim();

        savePreference();

        message.textContent =
            "Thank you, " + visitorName +
            "! Your interest form has been checked successfully.";

        form.reset();

        // Keep the saved class selected after resetting the form
        loadPreference();
    } else {
        message.textContent =
            "Please correct the errors above and try again.";
    }
});

// Restore the saved class when the page loads
loadPreference();
