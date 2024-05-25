import z from "zod";

/**
 * Validates incoming request body, query parameters, and route parameters against a provided Zod schema.
 *
 * @param {z.AnyZodObject} schema - The Zod schema to use for validation.
 * @returns {function()} - The Express middleware function.
 */
const validateResource = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = new Error('Validation failed');
      validationError.issues = error.issues;
      res.status(400)
      next(validationError)
    }
    next(error);
  }
};

export default validateResource;
