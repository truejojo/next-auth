'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';
import { Button } from './ui/button';
import { toast } from 'sonner';

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push('/auth/login');
        },
      },
    });
  };

  return (
    <Button onClick={handleSignOut} size='sm' variant='destructive'>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
