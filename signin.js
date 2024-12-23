
document.addEventListener("DOMContentLoaded", () => {
    // Initialize intl-tel-input with GeoIP
    const phoneInputField = document.querySelector("#phone");
    const phoneError = document.querySelector("#phone-error");
    const phoneInput = intlTelInput(phoneInputField, {
        initialCountry: "auto",
        geoIpLookup: function (callback) {
            fetch(
                `https://api.ipgeolocation.io/ipgeo?apiKey=a55a31ec1f584ac5a4ccbb3c542a8958`, { headers: { "Accept": "application/json" } }
            )
                .then((resp) => resp.json())
                .then((data) => callback(data.country_code2))
                .catch(() => callback("us")); // Default to US if GeoIP fails
        },
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
    });

    // Validate phone number on blur
    phoneInputField.addEventListener("blur", () => {
        if (phoneInputField.value.trim()) {
            if (phoneInput.isValidNumber()) {
                phoneError.classList.add("hidden"); // Hide error
                phoneInputField.classList.remove("border-red-500"); // Remove error style
                console.log("Valid phone number:", phoneInput.getNumber()); // Log valid number
            } else {
                phoneError.classList.remove("hidden"); // Show error
                phoneInputField.classList.add("border-red-500"); // Add error style
                console.log("Invalid phone number");
            }
        }
    });
});
