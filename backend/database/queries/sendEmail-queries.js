export const _getEmails = `
    select email from user where id <> ?;
`;

export const _getUserEmail = `
    SELECT email FROM user WHERE id = ?;
`