export const _getEmails = `
    select email from user where id <> ?;
`;