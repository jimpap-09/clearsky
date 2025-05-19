// in this file we create function to build paths
// according to id and role of the user

export const buildPath = (userData, courseId = '', subPath = '') => {
  const role = userData?.role?.toLowerCase();
  const id = userData?.id;
  if (!role || !id) return '/';
  return `/${role}/${id}/${courseId}${subPath}`;
};
