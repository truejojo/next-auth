'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInEmailAction } from '@/actions/sign-in-email-action';

const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // evtl. target instead of currentTarget

    setIsPending(true);

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const { error } = await signInEmailAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success('Login successful. Good to have you back.');
      router.push('/profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-sm w-full space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' name='email' type='email' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' name='password' type='password' />
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
