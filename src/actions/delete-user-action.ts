'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { APIError } from 'better-auth/api';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function deleteUserAction({ userId }: { userId: string }) {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) throw new Error('Unauthorized');

  // to delete only USER role and not themself
  //  || session.user.id === userId
  if (session.user.role !== 'ADMIN') {
    throw new Error('Forbidden');
  }

  try {
    await prisma.user.delete({
      where: {
        id: userId,
        role: 'USER', // only allow deletion of USER role
      },
    });

    if (session.user.id === userId) {
      await auth.api.signOut({ headers: headersList });
      redirect('/auth/sign-in');
    }

    revalidatePath('/dashboard/admin');
    return { success: true, error: null };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    if (err instanceof APIError) {
      return { success: false, error: err.message };
    }
    return { success: false, error: 'Internal Server Error' };
  }
}
