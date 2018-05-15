/**
 * Faster version of Function.prototype.bind
 * @param {Function} fn - Function to wrap.
 * @param {Object} ctx - What to bind as context.
 * @param {...*} args - Arguments to pass through.
 */
module.exports = function bind (fn, ctx, ...args) {
  return fn.bind(ctx, ...args);
};
