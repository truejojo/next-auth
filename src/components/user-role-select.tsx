'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { UserRole } from '@/generated/prisma';
import { admin } from '@/lib/auth-client';

type UserRoleSelectProps = {
  userId: string;
  role: UserRole;
};

export const UserRoleSelect = ({ userId, role }: UserRoleSelectProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = event.target.value as UserRole;

    const canChangeRole = await admin.hasPermission({
      permissions: {
        user: ['set-role'],
      },
    });

    if (canChangeRole.error) {
      return toast.error('Forbidden');
    }

    await admin.setRole({
      userId,
      role: newRole,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error?.message || 'Something went wrong');
        },
        onSuccess: () => {
          toast.success('Role updated successfully');
          router.refresh();
        },
      },
    });
  };

  return (
    <select
      value={role}
      onChange={handleChange}
      disabled={role === UserRole.ADMIN || isPending}
      className='px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50'
      title='roles'
    >
      <option value={UserRole.ADMIN}>Admin</option>
      <option value={UserRole.USER}>User</option>
    </select>
  );
};
