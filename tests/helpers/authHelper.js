import faker from 'faker';

const fakerUser = {
    user: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password()
    },
    
    wrongUser: {
        firstName: undefined,
        lastName: faker.name.lastName(),
        email: 'factory@email.com',
        password: 'password',
    },
    wrongUser2: {
        firstName: faker.name.firstName(),
        lastName: undefined,
        email: 'factory@email.com',
        password: 'password',
    },
    wrongUser3: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: undefined,
        password: 'password',
    },
    wrongUser4: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'Factory@email.com',
        password: 'password',
    },
    wrongUser5: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'factory@email.com',
        password: undefined,
    },
}

export default fakerUser