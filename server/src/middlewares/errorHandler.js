export default function errorHandler(err, req, res, next) {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
	console.log('err', err)
  
	const errorResponse = {
	  message: err.message || "Something went wrong",
	  stack: process.env.NODE_ENV === "production" ? "" : err.stack,
	};
  
	if (err.issues) {
	  errorResponse.issues = err.issues;
	}
  
	res.status(statusCode).json(errorResponse);
  }
  