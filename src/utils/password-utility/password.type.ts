export type HashUtility = {
    generateHash: (password: string) => string,
    validateHash: (password: string, hash: string) => boolean,
}

export type GenerateSalt = () => string;