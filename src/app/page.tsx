import { redirect } from 'next/navigation';

// The middleware has already sent visitors without a session to /login.
export default function Home() {
  redirect('/tasks');
}
