import {Request, Response} from "express";
import {validationResult} from "express-validator";

export function validateRequest(request: Request, response: Response): boolean {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		response.status(422).json({errors: errors.array()});
		return false;
	}
	return true;
}
