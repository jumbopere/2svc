import { Users } from '../controllers';

module.exports = (express) => {
  const router = express.Router();
  router.post('/user/register', Users.register);

  return router;
};
