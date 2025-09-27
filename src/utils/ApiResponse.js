class ApiResponse {
    // Constructor runs whenever you create a new ApiResponse object
    constructor(statusCode, data, message = "Success") {

        // Store the HTTP status code (e.g., 200, 201, 400, 500) in the object
        this.statusCode = statusCode;

        // Store the actual payload / result data of the response
        this.data = data;

        // Store a message for the response; default is "Success" if not provided
        this.message = message;

        // A helper boolean: if statusCode < 400 → true (success), else false (error)
        this.success = statusCode < 400;
    }
}
