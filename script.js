//your JS code here. If required.

// Function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expiration time in milliseconds
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Function to get a cookie
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null; // Return null if the cookie is not found
}

// Function to apply saved preferences
function applyPreferences() {
  const fontSize = getCookie("fontsize");
  const fontColor = getCookie("fontcolor");

  if (fontSize) {
    // Apply the saved font size
    document.documentElement.style.setProperty("--fontsize", `${fontSize}px`);
    document.getElementById("fontsize").value = fontSize;
  }

  if (fontColor) {
    // Apply the saved font color
    document.documentElement.style.setProperty("--fontcolor", fontColor);
    document.getElementById("fontcolor").value = fontColor;
  }
}

// Event listener for the form submission
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Get the user's selected font size and color
  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // Save preferences in cookies (valid for 30 days)
  setCookie("fontsize", fontSize, 30);
  setCookie("fontcolor", fontColor, 30);

  // Apply the preferences immediately
  applyPreferences();

  // Notify the user that preferences are saved
  alert("Preferences saved!");
});

// Apply preferences on page load
document.addEventListener("DOMContentLoaded", applyPreferences);

