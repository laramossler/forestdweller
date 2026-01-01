const fs = require('fs');
const path = require('path');

// Function to read a JSON file - WITH ERROR HANDLING
function readJsonFile(filePath) {
  // Validate input
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('Invalid file path: path must be a non-empty string');
  }

  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Check if it's actually a file (not a directory)
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      throw new Error(`Path is not a file: ${filePath}`);
    }

    // Read file
    const data = fs.readFileSync(filePath, 'utf8');

    // Parse JSON with error handling
    try {
      return JSON.parse(data);
    } catch (parseError) {
      throw new Error(`Invalid JSON in file ${filePath}: ${parseError.message}`);
    }
  } catch (error) {
    if (error.code === 'EACCES') {
      throw new Error(`Permission denied: cannot read file ${filePath}`);
    } else if (error.code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    } else if (error.message.includes('Invalid JSON') || error.message.includes('File not found') || error.message.includes('Path is not a file')) {
      throw error;
    }
    throw new Error(`Failed to read JSON file ${filePath}: ${error.message}`);
  }
}

// Function to write data to a file - WITH ERROR HANDLING
function writeToFile(filePath, content) {
  // Validate inputs
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('Invalid file path: path must be a non-empty string');
  }

  if (content === undefined || content === null) {
    throw new Error('Invalid content: content cannot be null or undefined');
  }

  try {
    // Ensure parent directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      throw new Error(`Parent directory does not exist: ${dir}`);
    }

    // Write file
    fs.writeFileSync(filePath, content);
    return true;
  } catch (error) {
    if (error.code === 'EACCES') {
      throw new Error(`Permission denied: cannot write to file ${filePath}`);
    } else if (error.code === 'ENOSPC') {
      throw new Error(`No space left on device: cannot write to ${filePath}`);
    } else if (error.code === 'EROFS') {
      throw new Error(`Read-only file system: cannot write to ${filePath}`);
    } else if (error.message.includes('Parent directory does not exist')) {
      throw error;
    }
    throw new Error(`Failed to write to file ${filePath}: ${error.message}`);
  }
}

// Function to copy a file - WITH ERROR HANDLING
function copyFile(source, destination) {
  // Validate inputs
  if (!source || typeof source !== 'string') {
    throw new Error('Invalid source path: path must be a non-empty string');
  }
  if (!destination || typeof destination !== 'string') {
    throw new Error('Invalid destination path: path must be a non-empty string');
  }

  try {
    // Check if source exists
    if (!fs.existsSync(source)) {
      throw new Error(`Source file not found: ${source}`);
    }

    // Check if source is a file
    const stats = fs.statSync(source);
    if (!stats.isFile()) {
      throw new Error(`Source is not a file: ${source}`);
    }

    // Check if destination directory exists
    const destDir = path.dirname(destination);
    if (!fs.existsSync(destDir)) {
      throw new Error(`Destination directory does not exist: ${destDir}`);
    }

    // Check if destination already exists
    if (fs.existsSync(destination)) {
      throw new Error(`Destination file already exists: ${destination}`);
    }

    // Perform copy
    const data = fs.readFileSync(source);
    fs.writeFileSync(destination, data);
    return destination;
  } catch (error) {
    if (error.code === 'EACCES') {
      throw new Error(`Permission denied: cannot copy from ${source} to ${destination}`);
    } else if (error.code === 'ENOSPC') {
      throw new Error(`No space left on device: cannot copy to ${destination}`);
    } else if (error.message.includes('not found') || error.message.includes('not a file') || error.message.includes('already exists') || error.message.includes('does not exist')) {
      throw error;
    }
    throw new Error(`Failed to copy file from ${source} to ${destination}: ${error.message}`);
  }
}

// Function to delete a file - WITH ERROR HANDLING
function deleteFile(filePath) {
  // Validate input
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('Invalid file path: path must be a non-empty string');
  }

  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Check if it's a file
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      throw new Error(`Path is not a file: ${filePath}`);
    }

    // Delete file
    fs.unlinkSync(filePath);
    return true;
  } catch (error) {
    if (error.code === 'EACCES') {
      throw new Error(`Permission denied: cannot delete file ${filePath}`);
    } else if (error.code === 'EBUSY') {
      throw new Error(`File is busy and cannot be deleted: ${filePath}`);
    } else if (error.message.includes('File not found') || error.message.includes('not a file')) {
      throw error;
    }
    throw new Error(`Failed to delete file ${filePath}: ${error.message}`);
  }
}

// Function to create directory - WITH ERROR HANDLING
function createDirectory(dirPath) {
  // Validate input
  if (!dirPath || typeof dirPath !== 'string') {
    throw new Error('Invalid directory path: path must be a non-empty string');
  }

  // Check for invalid characters or patterns
  if (dirPath.includes('\0')) {
    throw new Error(`Invalid directory path: contains null character`);
  }

  try {
    // Check if path already exists as a file
    if (fs.existsSync(dirPath)) {
      const stats = fs.statSync(dirPath);
      if (stats.isFile()) {
        throw new Error(`Cannot create directory: a file already exists at ${dirPath}`);
      }
      // Directory already exists, return it
      return dirPath;
    }

    // Create directory
    fs.mkdirSync(dirPath, { recursive: true });
    return dirPath;
  } catch (error) {
    if (error.code === 'EACCES') {
      throw new Error(`Permission denied: cannot create directory ${dirPath}`);
    } else if (error.code === 'EEXIST') {
      throw new Error(`Path already exists: ${dirPath}`);
    } else if (error.code === 'ENOSPC') {
      throw new Error(`No space left on device: cannot create directory ${dirPath}`);
    } else if (error.message.includes('file already exists')) {
      throw error;
    }
    throw new Error(`Failed to create directory ${dirPath}: ${error.message}`);
  }
}

// Function to list files in directory - WITH ERROR HANDLING
function listFiles(dirPath) {
  // Validate input
  if (!dirPath || typeof dirPath !== 'string') {
    throw new Error('Invalid directory path: path must be a non-empty string');
  }

  try {
    // Check if directory exists
    if (!fs.existsSync(dirPath)) {
      throw new Error(`Directory not found: ${dirPath}`);
    }

    // Check if it's a directory
    const stats = fs.statSync(dirPath);
    if (!stats.isDirectory()) {
      throw new Error(`Path is not a directory: ${dirPath}`);
    }

    // Read directory
    const files = fs.readdirSync(dirPath);
    return files.map(file => path.join(dirPath, file));
  } catch (error) {
    if (error.code === 'EACCES') {
      throw new Error(`Permission denied: cannot read directory ${dirPath}`);
    } else if (error.code === 'ENOTDIR') {
      throw new Error(`Path is not a directory: ${dirPath}`);
    } else if (error.message.includes('not found') || error.message.includes('not a directory')) {
      throw error;
    }
    throw new Error(`Failed to list files in directory ${dirPath}: ${error.message}`);
  }
}

module.exports = {
  readJsonFile,
  writeToFile,
  copyFile,
  deleteFile,
  createDirectory,
  listFiles
};
