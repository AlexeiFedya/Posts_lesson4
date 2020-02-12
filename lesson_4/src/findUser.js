export function findUser(
    users,
    userID
  ) {
    const userIndex = users.findIndex(user => user.id === userID);
    const author = users[userIndex].name;
    return author;
  }