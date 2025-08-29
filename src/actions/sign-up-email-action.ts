'use server';

import { auth, ErrorCode } from '@/lib/auth';
import { APIError } from 'better-auth/api';

export const signUpEmailAction = async (formData: FormData) => {
  const name = formData.get('name') as string;
  if (!name) return { error: 'Please enter your name' };

  const email = formData.get('email') as string;
  if (!email) return { error: 'Please enter your email' };

  const password = formData.get('password') as string;
  if (!password) return { error: 'Please enter your password' };

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : 'UNKNOWN';

      switch (errCode) {
        case 'USER_ALREADY_EXISTS':
          return { error: 'Oops! Something went wrong. Please try again.' };
        default:
          return { error: err.message };
      }
    }

    return { error: 'Internal Server Error' };
  }
};
