export default (callback) => (req, res, next) => {
  Promise.resolve(callback(req, res, next)).catch(next); //handle both synchronous/asynchronous functions
};