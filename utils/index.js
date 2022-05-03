/**
 * Helper methods for Users
 */
export const UserHelper = {
  /**
   * @desc transform Users result from query
   * @param {Object} user response object containing response
   * @returns {Object} transformed user attributes
   */
  transformUser(user) {
    const attributes = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return attributes;
  },
};

/**
* handle error util function
* @param {Object} error
* @returns {Array} - Returns an error
*/
export const handleError = error => {
  const result = {};
  error.errors.forEach(err => {
    result[err.path] = err.message;
  });

  return result;
};
