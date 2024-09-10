function ValidateName(name) {
  const trimmedName = name.trim();

  // Check if the name is empty
  if (!trimmedName) {
    return `Name is required`;
  }

  // Check the length
  if (trimmedName.length < 2 || trimmedName.length > 50) {
    return `Name must be between 2 and 50 characters`;
  }

  // Check for valid characters and no consecutive special characters
  const validNameRegex = /^[a-zA-Z\s'-]+$/;
  const consecutiveSpecialCharsRegex = /[-'\\s]{2,}/;

  if (!validNameRegex.test(trimmedName)) {
    return `Name can only contain letters, spaces, hyphens, and apostrophes`;
  }

  if (consecutiveSpecialCharsRegex.test(trimmedName)) {
    return `Name cannot contain consecutive special characters`;
  }
  return null
}
export default ValidateName;
