'use client';

import React from 'react';
import { Grid, User } from 'lucide-react';
import { Button } from "@heroui/button";
import { usePathname, useRouter } from 'next/navigation';

export const ViewModeToggle = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split('/')[1]; // Assuming locale is the first segment

  // Determine the current view mode from the URL path for styling
  const currentViewMode = pathname.includes('/gallery/group') ? 'group' : 'user';

  const handleNavigation = (mode: 'group' | 'user') => {
    localStorage.setItem('viewMode', mode);
    router.push(`/${locale}/gallery/${mode}`);
  };

  return (
    <div className="flex space-x-2 bg-default-100 p-1 rounded-xl">
      <Button
        onPress={() => handleNavigation('group')}
        className={`px-4 py-2 rounded-lg transition-all ${currentViewMode === 'group'
            ? 'bg-primary text-primary-foreground shadow-lg'
            : 'text-default-600 hover:text-foreground'
          }`}
        variant="light"
      >
        <Grid className="w-4 h-4 inline mr-2" />
        Group
      </Button>
      
      <Button
        onPress={() => handleNavigation('user')}
        className={`px-4 py-2 rounded-lg transition-all ${currentViewMode === 'user'
            ? 'bg-primary text-primary-foreground shadow-lg'
            : 'text-default-600 hover:text-foreground'
          }`}
        variant="light"
      >
        <User className="w-4 h-4 inline mr-2" />
        User
      </Button>
    </div>
  );
};
