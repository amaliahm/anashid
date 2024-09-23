const validateRequest = (schema, source = "body")  => 
  (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
        abortEarly: false, //collect all validation errors
        stripUnknown: true, //remove any properties not defined in the schema
      });
      console.log(value)
      if (error) {
        const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
        console.log(errorMessage)
        return res.status(400).json({ error: errorMessage });
      }
      req[source] = value;
      next();
  };

export default validateRequest