// Get DOM elements
const inputFile = document.getElementById("input-file");
const encryptButton = document.getElementById("encrypt-button");
const decryptButton = document.getElementById("decrypt-button");
const outputText = document.getElementById("output-text");
const encryptionAlgorithmSelect = document.getElementById("encryption-algorithm");

// Add event listeners
encryptButton.addEventListener("click", encryptFile);
decryptButton.addEventListener("click", decryptFile);

// Encryption algorithm selection
let selectedAlgorithm = "caesar"; // Default to Caesar Cipher

encryptionAlgorithmSelect.addEventListener("change", (event) => {
  selectedAlgorithm = event.target.value;
});

// Encrypt file
function encryptFile() {
  const file = inputFile.files[0];
  
  if (file) {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const contents = event.target.result;
      let encryptedContents = "";
      
      if (selectedAlgorithm === "caesar") {
        encryptedContents = encryptCaesar(contents);
      } else if (selectedAlgorithm === "xor") {
        encryptedContents = encryptXOR(contents);
      }
      
      outputText.value = encryptedContents;
    };
    
    reader.readAsText(file);
  } else {
    outputText.value = "Please select a file.";
  }
}

// Decrypt file
function decryptFile() {
  const file = inputFile.files[0];
  
  if (file) {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const contents = event.target.result;
      let decryptedContents = "";
      
      if (selectedAlgorithm === "caesar") {
        decryptedContents = decryptCaesar(contents);
      } else if (selectedAlgorithm === "xor") {
        decryptedContents = decryptXOR(contents);
      }
      
      outputText.value = decryptedContents;
    };
    
    reader.readAsText(file);
  } else {
    outputText.value = "Please select a file.";
  }
}

// Caesar Cipher encryption
function encryptCaesar(text) {
  const shift = 3; // Example shift value, modify as needed
  let encryptedText = "";
  
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    
    if (charCode >= 65 && charCode <= 90) {
      // Uppercase letters
      const encryptedCharCode = ((charCode - 65 + shift) % 26) + 65;
      encryptedText += String.fromCharCode(encryptedCharCode);
    } else if (charCode >= 97 && charCode <= 122) {
      // Lowercase letters
      const encryptedCharCode = ((charCode - 97 + shift) % 26) + 97;
      encryptedText += String.fromCharCode(encryptedCharCode);
    } else {
      // Non-alphabetic characters
      encryptedText += text.charAt(i);
    }
  }
  
  return encryptedText;
}

// Caesar Cipher decryption
function decryptCaesar(text) {
  const shift = 3; // Example shift value, modify as needed
  let decryptedText = "";
  
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    
    if (charCode >= 65 && charCode <= 90) {
      // Uppercase letters
      const decryptedCharCode = ((charCode - 65 - shift + 26) % 26) + 65;
      decryptedText += String.fromCharCode(decryptedCharCode);
    } else if (charCode >= 97 && charCode <= 122) {
      // Lowercase letters
      const decryptedCharCode = ((charCode - 97 - shift + 26) % 26) + 97;
      decryptedText += String.fromCharCode(decryptedCharCode);
    } else {
      // Non-alphabetic characters
      decryptedText += text.charAt(i);
    }
  }
  
  return decryptedText;
}

// XOR encryption
function encryptXOR(text) {
  const key = "secret"; // Example key, modify as needed
  let encryptedText = "";
  
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    const encryptedCharCode = charCode ^ keyCharCode;
    
    encryptedText += String.fromCharCode(encryptedCharCode);
  }
  
  return encryptedText;
}

// XOR decryption
function decryptXOR(text) {
  const key = "secret"; // Example key, modify as needed
  let decryptedText = "";
  
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    const decryptedCharCode = charCode ^ keyCharCode;
    
    decryptedText += String.fromCharCode(decryptedCharCode);
  }
  
  return decryptedText;
}
