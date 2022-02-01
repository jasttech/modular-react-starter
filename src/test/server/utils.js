import { JWT_SECRET } from '@/config';
import jwt from 'jsonwebtoken';
import omit from 'lodash/omit';
import { createResponseComposition, context } from 'msw';
import PropTypes from 'prop-types';

import { db } from './db';

const isTesting = process.env.NODE_ENV === 'test' || window.Cypress;

export const delayedResponse = createResponseComposition(undefined, [
  context.delay(isTesting ? 0 : 1000),
]);

export const hash = (str) => {
  let hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
};

hash.propTypes = {
  str: PropTypes.string.isRequired,
};

export const sanitizeUser = (user) => omit(user, ['password', 'iat']);

sanitizeUser.propTypes = {
  user: PropTypes.any,
};

export function authenticate({ email, password }) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (user?.password === hash(password)) {
    const sanitizedUser = sanitizeUser(user);
    const encodedToken = jwt.sign(sanitizedUser, JWT_SECRET);
    return { user: sanitizedUser, jwt: encodedToken };
  }

  const error = new Error('Invalid username or password');
  throw error;
}

authenticate.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export function requireAuth(request) {
  try {
    const encodedToken = request.headers.get('authorization');
    if (!encodedToken) {
      throw new Error('No authorization token provided!');
    }
    const decodedToken = jwt.verify(encodedToken, JWT_SECRET);

    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken.id,
        },
      },
    });

    if (!user) {
      throw Error('Unauthorized');
    }

    return sanitizeUser(user);
  } catch (err) {
    throw new Error(err);
  }
}

export function requireAdmin(user) {
  if (user.role !== 'ADMIN') {
    throw Error('Unauthorized');
  }
}

requireAdmin.propTypes = {
  user: PropTypes.any,
};
