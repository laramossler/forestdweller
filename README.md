# ForestDweller

A sample Node.js project demonstrating error handling best practices.

## Modules

- **fileUtils.js** - File system operations with comprehensive error handling
- **apiClient.js** - HTTP/HTTPS API client functions with network error handling
- **dataProcessor.js** - Data processing and validation utilities with input validation

## Error Handling Improvements

This project now includes comprehensive error handling across all modules:

### Key Features

1. **Input Validation** - All functions validate their inputs before processing
2. **Clear Error Messages** - Descriptive error messages that identify the problem and context
3. **Error Type Detection** - Specific handling for different error scenarios (permissions, network, validation, etc.)
4. **Resource Cleanup** - Proper cleanup of resources (file handles, network connections) on errors
5. **Type Safety** - Validation of data types and value ranges

### Coverage

- **18 functions** enhanced with error handling
- **6 file operations** - handling permissions, existence checks, path validation
- **3 network operations** - handling timeouts, DNS failures, HTTP errors, response parsing
- **7 data processing operations** - handling type validation, null checks, range validation

See [ERROR_HANDLING.md](./ERROR_HANDLING.md) for detailed documentation of all improvements.
