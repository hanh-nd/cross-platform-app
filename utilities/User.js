export const getUserName = (author) => {
    if (author?.firstName && author?.lastName)
        return `${author?.firstName} ${author?.lastName}`;
    if (author?.username) return author.username;
    return author?.firstName ?? author?.lastName;
};
