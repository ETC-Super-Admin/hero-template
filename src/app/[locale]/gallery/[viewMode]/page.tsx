'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllGroups } from '@/services/lineGroupServices';
import { LineGroup } from '@/types/lineGroupTypes';
import { fetchAllUsers } from '@/services/lineUserServices';
import { LineUser } from '@/types/lineUserTypes';

export default function Page({ params }: { params: any }) {
  // unwrap params (may be a Promise in this runtime)
  const resolved = React.use(params) as { locale?: string; viewMode?: string } | undefined;

  const locale = resolved?.locale ?? 'en';
  const mode = resolved?.viewMode ?? 'unknown';

  const { data: groups, isLoading: isLoadingGroups, isError: isErrorGroups, error: errorGroups } = useQuery<LineGroup[], Error>({
    queryKey: ['groups'],
    queryFn: fetchAllGroups,
    enabled: mode === 'group', // Only fetch if mode is 'group'
  });

  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers, error: errorUsers } = useQuery<LineUser[], Error>({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
    enabled: mode === 'user', // Only fetch if mode is 'user'
  });

  return (
    <div>
      <h2>Gallery — {mode}</h2>
      <p>Locale: {locale}</p>

      {mode === 'group' && (
        <div>
          <h3>Groups</h3>
          {isLoadingGroups && <p>Loading groups...</p>}
          {isErrorGroups && <p>Error fetching groups: {errorGroups.message}</p>}
          {groups && (
            <ul>
              {groups.map((group) => (
                <li key={group.id}>{group.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {mode === 'user' && (
        <div>
          <h3>Users</h3>
          {isLoadingUsers && <p>Loading users...</p>}
          {isErrorUsers && <p>Error fetching users: {errorUsers.message}</p>}
          {users && (
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.displayName}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
