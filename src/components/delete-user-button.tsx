'use client';

import { useState } from 'react';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { deleteUserAction } from '@/actions/delete-user-action';

type DeleteUserButtonProps = {
  userId: string;
};

export const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);

    const { error } = await deleteUserAction({ userId });

    if (error) {
      toast.error(error);
    } else {
      toast.success('User deleted successfully');
    }

    setIsPending(false);
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isPending}
      size='icon'
      variant='destructive'
      className='size-7 rounded-sm'
    >
      <span className='sr-only'>Delete user</span>
      <TrashIcon className='w-4 h-4' />
    </Button>
  );
};

export const PlaceholderDeleteUserButton = () => {
  return (
    <Button
      disabled
      size='icon'
      variant='destructive'
      className='size-7 rounded-sm'
    >
      <span className='sr-only'>Delete user</span>
      <TrashIcon className='w-4 h-4' />
    </Button>
  );
};
