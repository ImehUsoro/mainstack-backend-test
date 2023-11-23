// src/routes/protectedRoutes.ts
import { Router } from 'express';
import authenticateToken from '../middleware/authenticateToken';

const router = Router();

router.get('/protected-resource', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted to protected resource!' });
});

export default router;
