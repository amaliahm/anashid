import joi from "joi";

export default {

  /**
   * validate the login credentials provided by a user.
   * @param {string} email - the email address of the user.
   * @param {string} password - password of the user.
   * @returns {object} - Joi validation object.
  */

  login: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),

  /**
   * validates the signup credentials provided by a user.
   * @param {string} username - username of the user.
   * @param {string} email - email address of the user.
   * @param {string} password - password of the user.
   * @returns {object} - Joi validation object.
  */

  signup: joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),

  /**
   * validates the email provided by a user to verify it.
   * @param {string} email - email address of the user.
   * @returns {object} - Joi validation object.
  */

  verifyEmail: joi.object({
    email: joi.string().email().required(),
  }),

  /**
   * validates the email provided by a user for reset password request.
   * @param {string} email - email address of the user.
   * @returns {object} - Joi validation object.
  */

  forgetPassword: joi.object({
    email: joi.string().email().required()
  }),

  /**
   * validates the new password provided by a user after reset the old password.
   * @param {string} newPassword - new password of the user.
   * @returns {object} - Joi validation object.
  */

  resetPassword: joi.object({
    newPassword: joi.string().min(8).required()
  }),

  /**
   * validates user id provided by a user for logout.
   * @param {string} id - user id.
   * @returns {object} - Joi validation object.
  */

  logout: joi.object({
    id: joi.number().integer().required(),
  }),
};