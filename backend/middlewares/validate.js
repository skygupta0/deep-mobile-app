export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      const details = error.details.map((d) => d.message);
      return res.status(400).json({ message: "Validation failed", errors: details });
    }

    next();
  };
};
