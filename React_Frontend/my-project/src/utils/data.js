export const userQuery = (userId) => {
  const querry = `*[_type == "user" && _id == '${userId}']`;

  return querry;
};
