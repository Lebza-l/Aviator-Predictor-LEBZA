// Initialize an array to hold the last 5 multipliers (for historical trend analysis)
let multipliers = [];

// Function to add the multiplier and predict
function addMultiplierAndPredict() {
  const multiplierInput = document.getElementById('lastMultiplier').value;
  const riskLevel = document.getElementById('riskLevel').value;

  // Validate input: Check if the multiplier is a number and not empty
  if (!multiplierInput || isNaN(multiplierInput)) {
    alert("Please enter a valid multiplier.");
    return;
  }

  // Add the latest multiplier to the array (limit it to the last 5 values)
  multipliers.push(parseFloat(multiplierInput));
  if (multipliers.length > 5) {
    multipliers.shift(); // Remove the oldest value if more than 5 entries
  }

  // Predict based on the latest multiplier and risk level
  const prediction = predictMultiplier(riskLevel);

  // Display the result in the "result" div
  const resultElement = document.getElementById('result');
  resultElement.textContent = Prediction: ${prediction.toFixed(2)};
}

// Function to predict multiplier based on risk level and recent multipliers
function predictMultiplier(riskLevel) {
  let predictedMultiplier = 0;

  if (multipliers.length === 0) {
    return 1.0; // Default prediction if there are no multipliers
  }

  // Calculate average of the last 5 multipliers
  const average = multipliers.reduce((sum, val) => sum + val, 0) / multipliers.length;

  // Adjust prediction based on risk level
  switch (riskLevel) {
    case 'low':
      predictedMultiplier = average * 1.1; // Low risk: Slight increase from average
      break;
    case 'medium':
      predictedMultiplier = average * 1.25; // Medium risk: Moderate increase
      break;
    case 'high':
      predictedMultiplier = average * 1.5; // High risk: Aggressive increase
      break;
    default:
      predictedMultiplier = average;
      break;
  }

  return predictedMultiplier;
}
