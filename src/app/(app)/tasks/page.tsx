import { getTranslations } from 'next-intl/server';
import { requireUser } from '@/lib/auth/require-user';
import { listTasks } from '@/lib/tasks/tasks';
import { LogoutButton } from './logout-button';
import { TaskList } from './task-list';

export default async function TasksPage() {
  const user = await requireUser();
  const t = await getTranslations('tasks');
  const tasks = await listTasks(user.id);

  return (
    <main style={{ maxWidth: '40rem', margin: '0 auto', padding: '1rem', lineHeight: 1.5 }}>
      <h1>{t('title')}</h1>
      <TaskList tasks={tasks} />
      <LogoutButton />
    </main>
  );
}
