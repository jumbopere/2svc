import { Users } from '../controllers'

module.exports = (app) => {
    app.get('/api/v1/user/create', Users.create);
}