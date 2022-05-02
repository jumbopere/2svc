import db from "../models";
import jwt from "jsonwebtoken";
import UserHelper from "../utils";

const secretKey = process.env.JWT_SECRET_KEY;

export default {
  create: (req, res) => {
    res.send("this is a create api");
  },
  signup: (req, res) => {
    const { email } = req.body;
    db.User.findOne({ where: { email: req.body.email } })
      .then((returnedUsers) => {
        if (returnedUsers) {
          return res.status(409).json({
            status: 409,
            message: `user with "${email}" already exists`,
          });
        }
        return db.User.create(req.body)
          .then((user) => {
            const jwtData = {
              email: user.email,
              userId: user.id,
            };
            const token = jwt.sign(jwtData, secretKey, { expiresIn: 86400 });
            user = UserHelper.transformUser(user);
            return res.status(201).json({
              status: 201,
              expiresIn: 86400,
              token,
              user,
            });
          })
          .catch((error) =>
            res.status(400).json({
              status: 400,
              message: "Bad request sent to the server",
              errors: handleError(error),
            })
          );
      })
      .catch((error) => res.status(500).json(error));
  },

  register: async (req, res) => {
    const { email } = req.body;
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
          const user = await db.User.create(req.body);
          if (!user) {
            res.status(400).json({
              status: 400,
              message: "Bad request sent to the server",
              errors: handleError(error),
            });
          }
          const jwtData = {
            email: user.email,
            userId: user.id,
          };
          const token = jwt.sign(jwtData, secretKey, { expiresIn: 86400 });
          userObj = UserHelper.transformUser(user);
          return res.status(201).json({
            status: 201,
            expiresIn: 86400,
            token,
            userObj,
          });
    } catch (error) {
      res.status(500).json(error)
    }
    // .then((returnedUsers) => {
    //   if (returnedUsers) {
    //     return res.status(409).json({
    //       status: 409,
    //       message: `user with "${email}" already exists`
    //     });
    //   }
    //       return db.User.create(req.body).then((user) => {
    //         const jwtData = {
    //           email: user.email,
    //           userId: user.id,
    //         };
    //         const token = jwt.sign(jwtData, secretKey, { expiresIn: 86400 });
    //         user = UserHelper.transformUser(user);
    //         return res.status(201).json({
    //           status: 201,
    //           expiresIn: 86400,
    //           token,
    //           user
    //         });
    //       })
    //         .catch(error => res.status(400).json({
    //           status: 400,
    //           message: 'Bad request sent to the server',
    //           errors: handleError(error)
    //         }));
    //     })
    //       .catch((error) => res.status(500).json(error));
    //   },
  },
};
