export type UsersFilter = {
    username?: string,
    usernameRegex?: string,
    firstName?: string,
    firstNameRegex?: string,
    lastName?: string,
    lastNameRegex?: string,
    permissions?: string[];
    permissionsRegex?: string[];
};