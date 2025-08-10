import { useMemo } from 'react';
import { data } from '@/data/nav-links';

type Role = 'admin' | 'system-admin' | 'manager' | 'employee';

interface NavItem {
  title: string;
  url: string;
  icon?: any;
  isActive?: boolean;
  items?: Array<{ title: string; url: string }>;
}

interface NavData {
  navMain: NavItem[];
  navClouds: NavItem[];
  navSecondary: NavItem[];
  documents: Array<{ name: string; url: string; icon: any }>;
}

const roleBasedNavigation: Record<Role, Partial<NavData>> = {
  'system-admin': {
    navMain: data.navMain,
    navClouds: data.navClouds,
    navSecondary: data.navSecondary,
    documents: data.documents
  },
  'admin': {
    navMain: data.navMain.filter(item => item.title !== 'Analytics'),
    navClouds: data.navClouds,
    navSecondary: data.navSecondary.filter(item => item.title !== 'Settings'),
    documents: data.documents
  },
  'manager': {
    navMain: data.navMain.filter(item => 
      ['Dashboard', 'Projects', 'Team'].includes(item.title)
    ),
    navClouds: data.navClouds.filter(cloud => 
      ['Capture', 'Proposal'].includes(cloud.title)
    ),
    navSecondary: data.navSecondary.filter(item => 
      item.title !== 'Settings'
    ),
    documents: data.documents.filter(doc => doc.name !== 'Data Library')
  },
  'employee': {
    navMain: data.navMain.filter(item => 
      ['Dashboard', 'Projects'].includes(item.title)
    ),
    navClouds: [
      {
        ...data.navClouds.find(cloud => cloud.title === 'Capture')!,
        items: data.navClouds
          .find(cloud => cloud.title === 'Capture')!
          .items?.filter(item => item.title === 'Active Proposals')
      }
    ],
    navSecondary: data.navSecondary.filter(item => 
      item.title === 'Get Help' || item.title === 'Search'
    ),
    documents: []
  }
};

export function useNavItems(role: Role) {
  return useMemo(() => {
    // Get the base navigation for the role
    const roleNav = roleBasedNavigation[role] || roleBasedNavigation.employee;
    
    // Merge with default data to ensure all properties exist
    return {
      navMain: roleNav.navMain || [],
      navClouds: roleNav.navClouds || [],
      navSecondary: roleNav.navSecondary || [],
      documents: roleNav.documents || [],
      user: data.user
    };
  }, [role]);
}

export type { Role };