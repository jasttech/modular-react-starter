import { API_URL } from '@/config';
import { rest } from 'msw';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, delayedResponse } from '../utils';

export const usersHandlers = [
  rest.get(`${API_URL}/users`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const result = db.user.findMany({
        where: {
          teamId: {
            equals: user.teamId,
          },
        },
      });

      return delayedResponse(ctx.json(result));
    } catch (error) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.patch(`${API_URL}/users/profile`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      const result = db.user.update({
        where: {
          id: {
            equals: user.id,
          },
        },
        data,
      });
      persistDb('user');
      return delayedResponse(ctx.json(result));
    } catch (error) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.delete(`${API_URL}/users/:userId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { userId } = req.params;
      requireAdmin(user);
      const result = db.user.delete({
        where: {
          id: {
            equals: userId,
          },
          teamId: {
            equals: user.teamId,
          },
        },
      });
      persistDb('user');
      return delayedResponse(ctx.json(result));
    } catch (error) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
