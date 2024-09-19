import Joi from "joi";

// source = ["body", "param", "query", "headers"]
export default (shema, source = "body") =>
  (req, res, next) => {
    try {
      const { error } = schema.validate(req[source]);
      if (!error) next();

      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");

      throw new Error(message);
    } catch (error) {
      next(error);
    }
  };
