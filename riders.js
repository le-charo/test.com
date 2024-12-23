//select ellements
const steps = document.querySelectorAll(".form-step");  //all step forms
const lines = document.querySelectorAll("[id^='line-']"); // step indicators lines
let currentStep = 0; // Track the current step

// Function to show the current step and hide others
function showStep(stepIndex) {
  steps.forEach((step, index) => {
    if (index === stepIndex) {
      step.classList.remove("hidden");
    } else {
      step.classList.add("hidden");
    }
  });

  // update the steps indicator
  lines.forEach((line, index) => {
      if (index <= stepIndex) {
        line.classList.add("border-orange-400");
        line.classList.remove("border-gray-300");
      } else {
        line.classList.add("border-gray-300");
        line.classList.remove("border-orange-400");
      }
    });

}




// Attach event listeners to Next and Back buttons
steps.forEach((step, index) => {
  const nextBtn = step.querySelector(".next-btn");
  const backBtn = step.querySelector(".back-btn");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (index < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (index > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  }
});


// Submit button logic (if needed)
const submitBtn = document.querySelector("#submit-btn");
if (submitBtn) {
    submitBtn.addEventListener("click", () => {
        e.preventDefault();
        alert("Form submitted successfully!");
        // Add form submission logic here
    });
}

// Initialize the first step
showStep(currentStep);




//  drivers legal information ----------------------------------------------------------------------------------////////////////////////////

// 1) riders pictures-------------------validation and craiteria matching --------------------------------------------------------------------

function validatePhoto(input) {
  const file = input.files[0];
  const previewContainer = document.getElementById('photo-preview');
  const removeButton = document.getElementById('remove-photo')
  previewContainer.innerHTML = ''; // Clear existing preview

  if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      // Check file type
      if (!validTypes.includes(file.type)) {
          alert('Invalid file type. Please upload a JPG or PNG image.');
          input.value = ''; // Reset input
          return;
      }

      // Check file size
      if (file.size > maxSize) {
          alert('File size exceeds 2MB. Please upload a smaller photo.');
          input.value = ''; // Reset input
          return;
      }

      // Additional requirements prompt
      const userConfirmed = confirm(
          "Please ensure your photo meets the following requirements:\n" +
          "- Front-facing headshot\n" +
          "- No sunglasses, hats, or filters\n" +
          "- Neutral or light background"
      );

      if (!userConfirmed) {
          input.value = ''; // Reset input if user doesn't confirm
          return;
      }

      // Create a preview
      const reader = new FileReader();
      reader.onload = function (e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.alt = 'Uploaded photo preview';
          img.classList.add('w-32', 'h-32', 'rounded-full', 'border', 'object-cover');
          previewContainer.appendChild(img);

          removeButton.classList.remove('hidden')
      };
      reader.readAsDataURL(file);
  }
}




function removePhoto() {
  const fileInput = document.getElementById('driver-photo');
  const previewContainer = document.getElementById('photo-preview');
  const removeButton = document.getElementById('remove-photo');

  // Clear the file input and preview
  fileInput.value = '';
  previewContainer.innerHTML = '';
  
  // Hide the remove button
  removeButton.classList.add('hidden');

}


// ---------------------------------------------for riders license and Id card----------------------------------------


// Function to validate and preview the uploaded file
function validateDocument(input, previewContainerId, removeButtonId) {
  const file = input.files[0];
  const previewContainer = document.getElementById(previewContainerId);
  const removeButton = document.getElementById(removeButtonId);
  previewContainer.innerHTML = ''; // Clear existing preview

  if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      // Validate file type
      if (!validTypes.includes(file.type)) {
          alert('Invalid file type. Please upload a JPG, PNG, or PDF.');
          input.value = ''; // Reset input
          return;
      }

      // Validate file size
      if (file.size > maxSize) {
          alert('File size exceeds 2MB. Please upload a smaller file.');
          input.value = ''; // Reset input
          return;
      }

      // Display preview or file name
      if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function (e) {
              const img = document.createElement('img');
              img.src = e.target.result;
              img.alt = 'Uploaded file preview';
              img.classList.add('w-32', 'h-32', 'rounded-lg', 'border', 'object-cover');
              previewContainer.appendChild(img);
          };
          reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
          const pdfMessage = document.createElement('p');
          pdfMessage.textContent = `PDF file uploaded: ${file.name}`;
          pdfMessage.classList.add('text-sm', 'text-gray-600', 'mt-2');
          previewContainer.appendChild(pdfMessage);
      }

      // Show remove button
      removeButton.classList.remove('hidden');
  }
}

// Function to remove uploaded file
function removeDocument(previewContainerId, inputId, removeButtonId) {
  const previewContainer = document.getElementById(previewContainerId);
  const fileInput = document.getElementById(inputId);
  const removeButton = document.getElementById(removeButtonId);

  // Clear input and preview
  fileInput.value = '';
  previewContainer.innerHTML = '';

  // Hide remove button
  removeButton.classList.add('hidden');
}


// ----------------------BIKES DETAILES------------------------------------------------------------------------------//

// ----------------------bike pictures--------------------------------------------------------------------------//

function validatePhoto(input) {
  const file = input.files[0];
  const previewContainer = document.getElementById(`${input.id}-preview`);
  const removeButton = document.getElementById(`${input.id}-remove`)
  previewContainer.innerHTML = ''; // Clear existing preview

  if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      // Check file type
      if (!validTypes.includes(file.type)) {
          alert('Invalid file type. Please upload a JPG or PNG image.');
          input.value = ''; // Reset input
          return;
      }

      // Check file size
      if (file.size > maxSize) {
          alert('File size exceeds 2MB. Please upload a smaller photo.');
          input.value = ''; // Reset input
          return;
      }

      // Additional requirements prompt
      const userConfirmed = confirm(
          "Please ensure your photo meets the following requirements:\n" +
          "- Neutral or light background"
      );

      if (!userConfirmed) {
          input.value = ''; // Reset input if user doesn't confirm
          return;
      }

      // Create a preview
      const reader = new FileReader();
      reader.onload = function (e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.alt = 'Uploaded photo preview';
          img.classList.add('w-32', 'h-32', 'rounded-full', 'border', 'object-cover');
          previewContainer.appendChild(img);

          removeButton.classList.remove('hidden')
      };
      reader.readAsDataURL(file);
  }
}




function removePhoto(inputId) {
  const fileInput = document.getElementById(inputId);
  const previewContainer = document.getElementById(`${inputId}-preview`);
  const removeButton = document.getElementById(`${inputId}-remove`);

  // Clear the file input and preview
  fileInput.value = '';
  previewContainer.innerHTML = '';
  
  // Hide the remove button
  removeButton.classList.add('hidden');

}


function validatePassword() {
  const password = document.getElementById('password').value;
  const retypePassword = document.getElementById('retype-password').value;
  const passwordError = document.getElementById('password-error');
  const retypeError = document.getElementById('retype-error');

  // Only validate if the password field is not empty
  if (password) {
      // Password complexity check (at least 6 characters, upper & lower case, digits, special characters)
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}|[\]\\:;<>?,./~`]).{6,}$/;

      // Check if password meets strength requirements
      if (!passwordRegex.test(password)) {
          passwordError.classList.remove('hidden');
      } else {
          passwordError.classList.add('hidden');
      }
  } else {
      passwordError.classList.add('hidden');
  }

  // Only check if retype password matches when both fields have values
  if (password && retypePassword) {
      if (password !== retypePassword) {
          retypeError.classList.remove('hidden');
      } else {
          retypeError.classList.add('hidden');
      }
  } else {
      retypeError.classList.add('hidden');
  }

  // Return true if all validations pass, else false
  return password && passwordRegex.test(password) && password === retypePassword;
}





///////------intl-phone ---------number api logic---------------------///////

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


  // // Example for form submission handling
  // document.querySelector("form").addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   const phoneNumber = iti.getNumber();
  //   if (!iti.isValidNumber()) {
  //     phoneError.classList.remove("hidden");
  //     phoneInputField.classList.add("border-red-500");
  //     alert("Please enter a valid phone number");
  //   } else {
  //     phoneError.classList.add("hidden");
  //     phoneInputField.classList.remove("border-red-500");
  //     alert(`Phone number is valid: ${phoneNumber}`);
  //     // Proceed with form submission
  //   }
  // });