import { Router } from 'express';
import { createUser } from './user.service';
import { CreateUserDTO } from './user.interface';
const router = Router();

router.post('', async (req, res, next) => {
  try {
    const { name, email, password } = req.body as CreateUserDTO;
    const user = await createUser({ name, email, password });
    res.json(user);
  } catch (err) {
    next(err)
  }

});

export default router;