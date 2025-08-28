'use server';

import { auth } from '@/lib/auth';

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
    if (err instanceof Error) {
      return {
        error: `Ooops! Something went wrong with registration: ${err.message}`,
      };
    }

    return { error: 'Internal server error' };
  }
};
