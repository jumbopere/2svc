import db from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserHelper, handleError } from '../utils';
import { registerValidator } from '../utils/validate';
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

export default {
  register: async (req, res) => {
    const { errors, isValid } = registerValidator(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { firstName, lastName, email, password } = req.body;
    try {
      const returnedUser = await db.User.findOne({
        where: { email: req.body.email },
      });
      if (returnedUser) {
        return res.status(409).json({
          status: 409,
          message: `user with "${email}" already exists`,
        });
      }
      try {
        const user = await db.User.create({firstName, lastName, email: email.toLowerCase(), password});
        const jwtData = {
          email: user.email,
          userId: user.id,
        };
        const token = jwt.sign(jwtData, secretKey, { expiresIn: 86400 });
        const userObj = UserHelper.transformUser(user);
        return res.status(201).json({
          status: 201,
          expiresIn: 86400,
          token,
          userObj,
        });
      } catch (error) {
        console.log(error, 'er');
        return res.status(400).json({
          status: 400,
          message: 'Bad request sent to the server',
          errors: handleError(error),
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
