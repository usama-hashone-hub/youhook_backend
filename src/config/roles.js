const allRoles = {
  user: [
    'verifyPhone',
    'verifyEmail',
    'getMyProfile',
    'updateProfile',
    'manageProducts',
    'manageAds',
    'managefavs',
    'getInRent',
  ],
  admin: [
    'getMyProfile',
    'updateProfile',
    'getDashboard',
    'getUsers',
    'manageUsers',
    'getProducts',
    'manageProducts',
    'getOrder',
    'getPayment',
    'getFeedback',
    'manageCategories',
    'getCategories',
    'getRatingQuestions',
    'manageRatingQuestions',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
