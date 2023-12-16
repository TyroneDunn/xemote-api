import {HashingAlgorithm, LocalStrategy} from "@hals/core";
import {
    HASHING_ALGORITHM,
    HASHING_ITERATIONS,
    MONGODB_URL,
    PASSWORD_LENGTH,
    PASSWORD_SALT,
    SESSION_SECRET
} from "../environments/environments";

const authStrategy: LocalStrategy = {
    usersDbName: 'users',
    usersDbUrl: MONGODB_URL,
    usersDbOption: "MongoDB",
    sessionSecret: SESSION_SECRET,
    hashingAlgorithm: HASHING_ALGORITHM as HashingAlgorithm,
    hashingIterations: HASHING_ITERATIONS,
    passwordSalt: PASSWORD_SALT,
    passwordLength: PASSWORD_LENGTH,
};

export default authStrategy;
