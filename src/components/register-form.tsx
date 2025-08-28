'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { signUp } from '@/lib/auth-client';

const RegisterForm = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // evtl. target instead of currentTarget
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const name = formData.get('name') as string;
    if (!name) return toast.error('Please enter your name');

    const email = formData.get('email') as string;
    if (!email) return toast.error('Please enter your email');

    const password = formData.get('password') as string;
    if (!password) return toast.error('Please enter your password');

    await signUp.email(
      {
        name,
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
        <Label htmlFor='name'>Name</Label>
        <Input id='name' name='name' type='text' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' name='email' type='email' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' name='password' type='password' />
      </div>

      <Button type='submit' className='w-full'>
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
