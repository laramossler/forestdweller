const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to make HTTP GET request - WITH ERROR HANDLING
function fetchData(url, timeout = 30000) {
  return new Promise((resolve, reject) => {
    // Validate URL
    if (!url || typeof url !== 'string') {
      return reject(new Error('Invalid URL: URL must be a non-empty string'));
    }

    let urlObj;
    try {
      urlObj = new URL(url);
    } catch (error) {
      return reject(new Error(`Invalid URL format: ${url}`));
    }

    // Choose http or https based on protocol
    const client = urlObj.protocol === 'https:' ? https : http;

    const req = client.get(url, (res) => {
      // Check for HTTP error status codes
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`HTTP ${res.statusCode}: Failed to fetch data from ${url}`));
      }

      let data = '';
      let dataSize = 0;
      const maxSize = 10 * 1024 * 1024; // 10MB limit

      res.on('data', (chunk) => {
        dataSize += chunk.length;
        if (dataSize > maxSize) {
          req.destroy();
          return reject(new Error(`Response too large: exceeds 10MB limit for ${url}`));
        }
        data += chunk;
      });

      res.on('end', () => {
        // Handle empty response
        if (!data) {
          return reject(new Error(`Empty response received from ${url}`));
        }

        // Parse JSON with error handling
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (parseError) {
          reject(new Error(`Invalid JSON response from ${url}: ${parseError.message}`));
        }
      });

      res.on('error', (error) => {
        reject(new Error(`Response error for ${url}: ${error.message}`));
      });
    });

    // Set timeout
    req.setTimeout(timeout, () => {
      req.destroy();
      reject(new Error(`Request timeout: ${url} took longer than ${timeout}ms`));
    });

    // Handle request errors
    req.on('error', (error) => {
      if (error.code === 'ENOTFOUND') {
        reject(new Error(`DNS lookup failed: could not resolve ${urlObj.hostname}`));
      } else if (error.code === 'ECONNREFUSED') {
        reject(new Error(`Connection refused: could not connect to ${urlObj.hostname}`));
      } else if (error.code === 'ETIMEDOUT') {
        reject(new Error(`Connection timeout: could not connect to ${url}`));
      } else if (error.code === 'ECONNRESET') {
        reject(new Error(`Connection reset: connection to ${url} was reset`));
      } else {
        reject(new Error(`Network error fetching ${url}: ${error.message}`));
      }
    });
  });
}

// Function to make POST request - WITH ERROR HANDLING
function postData(url, payload, timeout = 30000) {
  return new Promise((resolve, reject) => {
    // Validate inputs
    if (!url || typeof url !== 'string') {
      return reject(new Error('Invalid URL: URL must be a non-empty string'));
    }

    if (payload === undefined || payload === null) {
      return reject(new Error('Invalid payload: payload cannot be null or undefined'));
    }

    let urlObj;
    try {
      urlObj = new URL(url);
    } catch (error) {
      return reject(new Error(`Invalid URL format: ${url}`));
    }

    // Stringify payload with error handling
    let data;
    try {
      data = JSON.stringify(payload);
    } catch (stringifyError) {
      return reject(new Error(`Failed to serialize payload: ${stringifyError.message}`));
    }

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    // Choose http or https based on protocol
    const client = urlObj.protocol === 'https:' ? https : http;

    const req = client.request(options, (res) => {
      // Check for HTTP error status codes
      if (res.statusCode < 200 || res.statusCode >= 300) {
        let errorBody = '';
        res.on('data', (chunk) => { errorBody += chunk; });
        res.on('end', () => {
          reject(new Error(`HTTP ${res.statusCode}: ${errorBody || 'Failed to post data to ' + url}`));
        });
        return;
      }

      let responseData = '';
      let dataSize = 0;
      const maxSize = 10 * 1024 * 1024; // 10MB limit

      res.on('data', (chunk) => {
        dataSize += chunk.length;
        if (dataSize > maxSize) {
          req.destroy();
          return reject(new Error(`Response too large: exceeds 10MB limit for ${url}`));
        }
        responseData += chunk;
      });

      res.on('end', () => {
        // Handle empty response
        if (!responseData) {
          return resolve({});
        }

        // Parse JSON with error handling
        try {
          const parsed = JSON.parse(responseData);
          resolve(parsed);
        } catch (parseError) {
          reject(new Error(`Invalid JSON response from ${url}: ${parseError.message}`));
        }
      });

      res.on('error', (error) => {
        reject(new Error(`Response error for ${url}: ${error.message}`));
      });
    });

    // Set timeout
    req.setTimeout(timeout, () => {
      req.destroy();
      reject(new Error(`Request timeout: ${url} took longer than ${timeout}ms`));
    });

    // Handle request errors
    req.on('error', (error) => {
      if (error.code === 'ENOTFOUND') {
        reject(new Error(`DNS lookup failed: could not resolve ${urlObj.hostname}`));
      } else if (error.code === 'ECONNREFUSED') {
        reject(new Error(`Connection refused: could not connect to ${urlObj.hostname}`));
      } else if (error.code === 'ETIMEDOUT') {
        reject(new Error(`Connection timeout: could not connect to ${url}`));
      } else if (error.code === 'ECONNRESET') {
        reject(new Error(`Connection reset: connection to ${url} was reset`));
      } else {
        reject(new Error(`Network error posting to ${url}: ${error.message}`));
      }
    });

    // Write data and end request
    try {
      req.write(data);
      req.end();
    } catch (writeError) {
      reject(new Error(`Failed to send request data: ${writeError.message}`));
    }
  });
}

// Function to download file - WITH ERROR HANDLING
function downloadFile(url, destPath, timeout = 60000) {
  return new Promise((resolve, reject) => {
    // Validate inputs
    if (!url || typeof url !== 'string') {
      return reject(new Error('Invalid URL: URL must be a non-empty string'));
    }

    if (!destPath || typeof destPath !== 'string') {
      return reject(new Error('Invalid destination path: path must be a non-empty string'));
    }

    let urlObj;
    try {
      urlObj = new URL(url);
    } catch (error) {
      return reject(new Error(`Invalid URL format: ${url}`));
    }

    // Validate destination directory exists
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      return reject(new Error(`Destination directory does not exist: ${destDir}`));
    }

    // Check if destination file already exists
    if (fs.existsSync(destPath)) {
      return reject(new Error(`Destination file already exists: ${destPath}`));
    }

    // Choose http or https based on protocol
    const client = urlObj.protocol === 'https:' ? https : http;

    const req = client.get(url, (response) => {
      // Check for HTTP error status codes
      if (response.statusCode < 200 || response.statusCode >= 300) {
        return reject(new Error(`HTTP ${response.statusCode}: Failed to download from ${url}`));
      }

      // Create write stream with error handling
      let file;
      try {
        file = fs.createWriteStream(destPath);
      } catch (error) {
        return reject(new Error(`Failed to create file ${destPath}: ${error.message}`));
      }

      // Handle file write errors
      file.on('error', (error) => {
        file.close();
        // Clean up partial download
        fs.unlink(destPath, () => {});
        if (error.code === 'ENOSPC') {
          reject(new Error(`No space left on device: cannot write to ${destPath}`));
        } else if (error.code === 'EACCES') {
          reject(new Error(`Permission denied: cannot write to ${destPath}`));
        } else {
          reject(new Error(`File write error for ${destPath}: ${error.message}`));
        }
      });

      // Handle response errors
      response.on('error', (error) => {
        file.close();
        fs.unlink(destPath, () => {});
        reject(new Error(`Download error for ${url}: ${error.message}`));
      });

      // Pipe response to file
      response.pipe(file);

      file.on('finish', () => {
        file.close((closeError) => {
          if (closeError) {
            fs.unlink(destPath, () => {});
            return reject(new Error(`Failed to close file ${destPath}: ${closeError.message}`));
          }
          resolve(destPath);
        });
      });
    });

    // Set timeout
    req.setTimeout(timeout, () => {
      req.destroy();
      // Clean up partial download
      if (fs.existsSync(destPath)) {
        fs.unlink(destPath, () => {});
      }
      reject(new Error(`Download timeout: ${url} took longer than ${timeout}ms`));
    });

    // Handle request errors
    req.on('error', (error) => {
      // Clean up partial download
      if (fs.existsSync(destPath)) {
        fs.unlink(destPath, () => {});
      }
      if (error.code === 'ENOTFOUND') {
        reject(new Error(`DNS lookup failed: could not resolve ${urlObj.hostname}`));
      } else if (error.code === 'ECONNREFUSED') {
        reject(new Error(`Connection refused: could not connect to ${urlObj.hostname}`));
      } else if (error.code === 'ETIMEDOUT') {
        reject(new Error(`Connection timeout: could not connect to ${url}`));
      } else if (error.code === 'ECONNRESET') {
        reject(new Error(`Connection reset: connection to ${url} was reset`));
      } else {
        reject(new Error(`Network error downloading ${url}: ${error.message}`));
      }
    });
  });
}

module.exports = {
  fetchData,
  postData,
  downloadFile
};
