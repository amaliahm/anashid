export const _getEmails = `
    SELECT email FROM user WHERE id <> ?;
`;

export const _getUserEmail = `
    SELECT email FROM user WHERE id = ?;
`