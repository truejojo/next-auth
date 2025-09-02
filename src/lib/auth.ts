import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { admin } from 'better-auth/plugins';
// import { createAuthMiddleware, APIError } from 'better-auth/api';

import { prisma } from '@/lib/prisma';
import { UserRole } from '@/generated/prisma';
import { ac, roles } from '@/lib/permissions';
// oder, wenn du keinen eigenen Output-Pfad hast:
// import { UserRole } from '@prisma/client';

// import { normalizeName, VALID_DOMAINS } from '@/lib/utils';
// import { hashPassword, verifyPassword } from '@/lib/argon2';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
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
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(';') ?? [];
          if (ADMIN_EMAILS.includes(user.email)) {
            return { data: { ...user, role: UserRole.ADMIN } };
          }
          return { data: user };
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: [UserRole.USER, UserRole.ADMIN],
        input: false,
      },
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
  },
  account: {
    enabled: false,
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: UserRole.USER,
      adminRoles: [UserRole.ADMIN],
      ac,
      roles,
    }),
  ],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | 'unknown';
