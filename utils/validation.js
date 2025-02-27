export const userIdRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateUserId = (userId) => {
  return userIdRegex.test(userId);
};

export const validateEmail = (email) => {
    return emailRegex.test(email);
};
    
  