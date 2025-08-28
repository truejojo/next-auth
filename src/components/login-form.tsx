'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { signIn } from '@/lib/auth-client';

const LoginForm = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // evtl. target instead of currentTarget
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const email = formData.get('email') as string;
    if (!email) return toast.error('Please enter your email');

    const password = formData.get('password') as string;
    if (!password) return toast.error('Please enter your password');

    await signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {},
        onResponse: () => {},
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {},
      },
    );
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

      <Button type='submit' className='w-full'>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
