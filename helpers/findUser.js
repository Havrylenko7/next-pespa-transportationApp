export default function findUser(currentUser, users) {
  const user = users.find(user => user.token === currentUser);

  return user
}
