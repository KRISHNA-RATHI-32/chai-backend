// Importing the asyncHandler function from the utils folder
// asyncHandler is usually a higher-order function that helps handle errors
// in async route handlers without needing to use try-catch everywhere.
import { asyncHandler } from "../utils/asyncHandler.js";

// Defining an asynchronous route handler function called `registerUser`
// We wrap this function using `asynchandler()` so that if any error occurs inside it,
// the asyncHandler will catch the error and pass it to the Express error-handling middleware.
const registerUser = asyncHandler(async (req, res) => {

    // Inside this async function, we can write our registration logic.
    // For now, it just sends a JSON response with HTTP status 200 and message "ok".
    res.status(200).json({
        message: "ok"
    });
});

// Exporting registerUser (not shown here, but usually you’d do something like: export { registerUser })
// so it can be used in your routes file.

export {registerUser};