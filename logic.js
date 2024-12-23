document.addEventListener("DOMContentLoaded", function () {
    // Initialize phone input field using intlTelInput
    const phoneInputField = document.querySelector("#phone");
  
    const phoneInput = window.intlTelInput(phoneInputField, {
      initialCountry: "auto",
      geoIpLookup: function (callback) {
        fetch("https://ipinfo.io?token=d18ad79111a1d7") // IP-based country detection
          .then((resp) => resp.json())
          .then((resp) => {
            const countryCode = resp && resp.country ? resp.country : "us";
            callback(countryCode);
          })
          .catch(() => callback("us"));
      },
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
  
    // Email validation function
    function isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
  
    // Password strength validation function
    function isStrongPassword(password) {
      // Password should contain at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordPattern.test(password);
    }
  
    // Phone number validation in E.164 format
    function isValidPhoneNumber() {
      const phoneNumber = phoneInput.getNumber(); // E.164 format
      const validFormat = /^\+?[1-9]\d{1,14}$/; // E.164 regex pattern
      return validFormat.test(phoneNumber) && phoneInput.isValidNumber(); // Validate number with intl-tel-input
    }
  
    // Sign-up form validation logic
    document.getElementById("signupForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
  
      // Ensure all fields are filled
      if (!email || !password || !confirmPassword || !phoneInput.getNumber()) {
        alert("All fields are required.");
        return;
      }
  
      // Validate email
      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      // Validate password strength
      if (!isStrongPassword(password)) {
        alert(
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
        );
        return;
      }
  
      // Check if passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
  
      // Validate phone number
      if (!isValidPhoneNumber()) {
        alert("Please enter a valid phone number.");
        return;
      }
  
      // Form submission success
      alert("Sign-up successful!");
      document.getElementById("signupForm").reset(); // Reset form after submission
    });
  
    // Close Modal on 'X' button click or outside modal click
    const closeSignup = document.getElementById("close-signup");
    closeSignup.addEventListener("click", function () {
      document.getElementById("signup-modal").style.display = "none";
    });
  
    window.onclick = function (event) {
      if (event.target == document.getElementById("signup-modal")) {
        document.getElementById("signup-modal").style.display = "none";
      }
    };
  });
  