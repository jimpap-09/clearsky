// in this file we create function to build paths
// according to id and role of the user

export const buildPath = (userData, subPath = '') => {
  const role = userData?.role?.toLowerCase();
  const id = userData?.id;
  if (!userData || !role || !id) return `${subPath}`;
  return `/${role}/${id}${subPath}`;
};
