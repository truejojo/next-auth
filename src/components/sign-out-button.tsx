'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

const SignOutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success('You have been signed out. See you soon!');
          router.push('/auth/login');
        },
      },
    });
  };

  return (
    <Button
      onClick={handleSignOut}
      size='sm'
      variant='destructive'
      disabled={isPending}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
