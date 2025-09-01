import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
// import { createAuthMiddleware, APIError } from 'better-auth/api';

import { prisma } from '@/lib/prisma';
// import { normalizeName, VALID_DOMAINS } from '@/lib/utils';
// import { hashPassword, verifyPassword } from '@/lib/argon2';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false, // nach dem einloggen nicht automatisch angemeldet
    // password hashing and verification
    // password: {
    //   hash: hashPassword,
    //   verify: verifyPassword,
    // },
  },
  hooks: {
    // before: createAuthMiddleware(async (ctx) => {
    //   if (ctx.path === '/sign-up/email') {
    //     const email = String(ctx.body.email);
    //     const domain = email.split('@')[1];
    //     if (!VALID_DOMAINS().includes(domain)) {
    //       throw new APIError('BAD_REQUEST', {
    //         message: 'Invalid domain. Please use a valid email.',
    //       });
    //     }
    //     const name = normalizeName(ctx.body.name);
    //     return {
    //       context: {
    //         ...ctx,
    //         body: {
    //           ...ctx.body,
    //           name,
    //         },
    //       },
    //     };
    //   }
    // }),
  },
  user: {
    additionalFields: {
      role: {
        type: ['USER', 'ADMIN'],
        input: false,
        // values: Object.values(UserRole),
      },
    },
  },
  session: {
    // expiresIn: 15, // seconds
    expiresIn: 30 * 24 * 60 * 60, // 30 days
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [nextCookies()],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | 'unknown';
