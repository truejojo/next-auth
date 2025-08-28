'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const signInEmailAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  if (!email) return { error: 'Please enter your email' };

  const password = formData.get('password') as string;
  if (!password) return { error: 'Please enter your password' };

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof Error) {
      return {
        error: `Ooops! Something went wrong with login: ${err.message}`,
      };
    }

    return { error: 'Internal server error' };
  }
};
