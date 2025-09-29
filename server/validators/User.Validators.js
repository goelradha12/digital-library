import {body} from "express-validator";

export const visitorRegistrationValidator = () => {
    return [
        body("name").not().trim().notEmpty().withMessage("name is required"),
        body("email").not().trim().notEmpty().withMessage("email is required").isEmail().withMessage("email is invalid"),
        body("password").not().trim().notEmpty().withMessage("password is required"),
        body("country").optional().trim().isIn(["India", "United States", "Italy", "France"]).withMessage("country is invalid"),
    ]
}