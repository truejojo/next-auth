import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import SignOutButton from '@/components/sign-out-button';
import ReturnButton from '@/components/return-button';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ProfilePage = async () => {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) redirect('/auth/login');

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    headers: headerList,
    body: {
      userId: session.user.id,
      permission: {
        posts: ['update', 'delete'],
      },
    },
  });

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

      <h2 className='text-2xl font-bold'>Permissions</h2>

      <div className='space-x-4'>
        <Button size='sm'>MANAGE OWN POSTS</Button>
        <Button size='sm' disabled={!FULL_POST_ACCESS.success}>
          MANAGE ALL POSTS
        </Button>
      </div>

      <pre className='text-sm '>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
