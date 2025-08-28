import RegisterForm from '@/components/register-form';
import ReturnButton from '@/components/return-button';
import Link from 'next/link';
import React from 'react';

const RegisterPage = () => {
  return (
    <div className='px-8 py-16 container mx-auto max-w-screen-lg space-y-8'>
      <div className='space-y-8'>
        <ReturnButton href='/' label='Home' />
        <h1 className='text-3xl font-bold'>Register</h1>
        <RegisterForm />

        <p className='text-muted-foreground text-sm'>
          You have an account?
          <Link href='/auth/login' className='hover:text-foreground'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
