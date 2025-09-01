import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import SignOutButton from '@/components/sign-out-button';
import ReturnButton from '@/components/return-button';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect('/auth/login');

  return (
    <div className='px-8 py-16 container mx-auto max-w-screen-lg space-y-8'>
      <div className='space-y-8'>
        <ReturnButton href='/' label='Home' />
        <h1 className='text-3xl font-bold'>ProfilePage</h1>
      </div>

      <div className='flex items-center gap-2'>
        {session.user.role === 'ADMIN' && (
          <Button size='sm' asChild>
            <Link href='/admin/dashboard'>Admin Dashboard</Link>
          </Button>
        )}
        <SignOutButton />
      </div>

      <pre className='text-sm '>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
