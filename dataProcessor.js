// Function to process array of numbers - WITH ERROR HANDLING
function calculateAverage(numbers) {
  // Validate input is an array
  if (!Array.isArray(numbers)) {
    throw new Error('Invalid input: numbers must be an array');
  }

  // Check for empty array
  if (numbers.length === 0) {
    throw new Error('Cannot calculate average: array is empty');
  }

  // Validate all elements are numbers
  for (let i = 0; i < numbers.length; i++) {
    if (typeof numbers[i] !== 'number' || isNaN(numbers[i])) {
      throw new Error(`Invalid value at index ${i}: expected number, got ${typeof numbers[i]}`);
    }
    if (!isFinite(numbers[i])) {
      throw new Error(`Invalid value at index ${i}: number must be finite`);
    }
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

// Function to parse and validate user input - WITH ERROR HANDLING
function parseUserInput(input) {
  // Validate input
  if (input === undefined || input === null) {
    throw new Error('Invalid input: input cannot be null or undefined');
  }

  if (typeof input !== 'string') {
    throw new Error(`Invalid input type: expected string, got ${typeof input}`);
  }

  // Parse JSON with error handling
  let parsed;
  try {
    parsed = JSON.parse(input);
  } catch (parseError) {
    throw new Error(`Invalid JSON input: ${parseError.message}`);
  }

  // Validate required fields exist
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid input: parsed data must be an object');
  }

  if (!parsed.hasOwnProperty('name')) {
    throw new Error('Missing required field: name');
  }

  if (!parsed.hasOwnProperty('age')) {
    throw new Error('Missing required field: age');
  }

  if (!parsed.hasOwnProperty('email')) {
    throw new Error('Missing required field: email');
  }

  // Validate name
  if (typeof parsed.name !== 'string') {
    throw new Error(`Invalid name type: expected string, got ${typeof parsed.name}`);
  }

  const trimmedName = parsed.name.trim();
  if (trimmedName.length === 0) {
    throw new Error('Invalid name: name cannot be empty');
  }

  // Validate and parse age
  const age = parseInt(parsed.age);
  if (isNaN(age)) {
    throw new Error(`Invalid age: cannot parse "${parsed.age}" as a number`);
  }

  if (age < 0 || age > 150) {
    throw new Error(`Invalid age: ${age} is out of valid range (0-150)`);
  }

  // Validate email
  if (typeof parsed.email !== 'string') {
    throw new Error(`Invalid email type: expected string, got ${typeof parsed.email}`);
  }

  const email = parsed.email.toLowerCase().trim();
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error(`Invalid email format: ${parsed.email}`);
  }

  return {
    name: trimmedName,
    age: age,
    email: email
  };
}

// Function to divide numbers - WITH ERROR HANDLING
function divide(a, b) {
  // Validate inputs are numbers
  if (typeof a !== 'number' || isNaN(a)) {
    throw new Error(`Invalid dividend: expected number, got ${typeof a}`);
  }

  if (typeof b !== 'number' || isNaN(b)) {
    throw new Error(`Invalid divisor: expected number, got ${typeof b}`);
  }

  // Check for division by zero
  if (b === 0) {
    throw new Error('Division by zero: divisor cannot be zero');
  }

  // Check for finite numbers
  if (!isFinite(a) || !isFinite(b)) {
    throw new Error('Invalid input: numbers must be finite');
  }

  const result = a / b;

  // Check result validity
  if (!isFinite(result)) {
    throw new Error(`Division resulted in invalid number: ${a} / ${b} = ${result}`);
  }

  return result;
}

// Function to access nested object properties - WITH ERROR HANDLING
function getNestedValue(obj, path) {
  // Validate inputs
  if (obj === null || obj === undefined) {
    throw new Error('Invalid object: object cannot be null or undefined');
  }

  if (typeof obj !== 'object') {
    throw new Error(`Invalid object type: expected object, got ${typeof obj}`);
  }

  if (!path || typeof path !== 'string') {
    throw new Error('Invalid path: path must be a non-empty string');
  }

  const keys = path.split('.');
  if (keys.length === 0 || keys.some(k => k.trim() === '')) {
    throw new Error(`Invalid path format: "${path}" contains empty keys`);
  }

  let result = obj;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    // Check if current result is an object
    if (result === null || result === undefined) {
      const currentPath = keys.slice(0, i).join('.');
      throw new Error(
        `Cannot access property "${key}": value at path "${currentPath}" is ${result === null ? 'null' : 'undefined'}`
      );
    }

    if (typeof result !== 'object') {
      const currentPath = keys.slice(0, i).join('.');
      throw new Error(
        `Cannot access property "${key}": value at path "${currentPath}" is not an object (type: ${typeof result})`
      );
    }

    // Check if property exists
    if (!result.hasOwnProperty(key)) {
      const currentPath = keys.slice(0, i + 1).join('.');
      throw new Error(`Property not found: "${currentPath}" does not exist`);
    }

    result = result[key];
  }

  return result;
}

// Function to process database query - WITH ERROR HANDLING
function processQuery(query, params) {
  // Validate inputs
  if (!query || typeof query !== 'string') {
    throw new Error('Invalid query: query must be a non-empty string');
  }

  if (!Array.isArray(params)) {
    throw new Error('Invalid params: params must be an array');
  }

  // Track which parameter indices are used
  const usedIndices = new Set();
  const maxIndex = params.length;

  const sanitized = query.replace(/\$\d+/g, (match) => {
    const paramNumber = parseInt(match.substring(1));

    if (isNaN(paramNumber)) {
      throw new Error(`Invalid parameter placeholder: ${match}`);
    }

    const index = paramNumber - 1;
    usedIndices.add(index);

    // Check if parameter index is out of bounds
    if (index < 0 || index >= maxIndex) {
      throw new Error(
        `Parameter ${match} is out of bounds: expected 1-${maxIndex}, got ${paramNumber}`
      );
    }

    const param = params[index];

    // Validate parameter is not null or undefined
    if (param === null || param === undefined) {
      throw new Error(`Parameter ${match} is ${param === null ? 'null' : 'undefined'}`);
    }

    return param;
  });

  return sanitized;
}

// Function to convert string to number - WITH ERROR HANDLING
function parseNumber(str) {
  // Validate input
  if (str === null || str === undefined) {
    throw new Error('Invalid input: input cannot be null or undefined');
  }

  if (typeof str !== 'string') {
    throw new Error(`Invalid input type: expected string, got ${typeof str}`);
  }

  // Check for empty string
  if (str.trim().length === 0) {
    throw new Error('Invalid input: string cannot be empty');
  }

  // Convert to number
  const num = Number(str);

  // Check if conversion was successful
  if (isNaN(num)) {
    throw new Error(`Cannot parse "${str}" as a number`);
  }

  // Check if number is finite
  if (!isFinite(num)) {
    throw new Error(`Parsed number is not finite: "${str}" resulted in ${num}`);
  }

  return num;
}

// Function to batch process items - WITH ERROR HANDLING
function batchProcess(items, batchSize) {
  // Validate items is an array
  if (!Array.isArray(items)) {
    throw new Error('Invalid items: items must be an array');
  }

  // Validate batch size
  if (typeof batchSize !== 'number' || isNaN(batchSize)) {
    throw new Error(`Invalid batch size: expected number, got ${typeof batchSize}`);
  }

  if (!Number.isInteger(batchSize)) {
    throw new Error(`Invalid batch size: ${batchSize} must be an integer`);
  }

  if (batchSize <= 0) {
    throw new Error(`Invalid batch size: ${batchSize} must be greater than zero`);
  }

  // Handle empty array
  if (items.length === 0) {
    return [];
  }

  const batches = [];
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }

  return batches;
}

module.exports = {
  calculateAverage,
  parseUserInput,
  divide,
  getNestedValue,
  processQuery,
  parseNumber,
  batchProcess
};
