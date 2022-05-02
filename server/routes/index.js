import { Users } from '../controllers'

module.exports = (app) => {
    app.post('/api/v1/user/create', Users.create);
    

}