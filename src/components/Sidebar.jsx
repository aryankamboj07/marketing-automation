
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Megaphone,
  Mail,
  BarChart3,
  Users,
  ClipboardList,
  GitBranch,
  PanelsTopLeft,
  LayoutTemplate,
  MessageCircle,
  ChevronDown,
  Workflow,
} from 'lucide-react';

const menuGroups = [
  {
    title: 'OVERVIEW',
    items: [
      {
        label: 'Dashboard',
        path: '/campaigns/dashboard',
        icon: LayoutDashboard,
      },
      {
        label: 'Analytics',
        path: '/analytics',
        icon: BarChart3,
      },
    ],
  },
  {
    title: 'MARKETING',
    items: [
      {
        label: 'Campaigns',
        path: '/campaigns',
        icon: Megaphone,
      },
      {
        label: 'Campaign Builder',
        path: '/campaigns/new',
        icon: Workflow,
      },
      {
        label: 'Email Campaigns',
        path: '/email',
        icon: Mail,
      },
      {
        label: 'Email Editor',
        path: '/email/editor',
        icon: ClipboardList,
      },
      {
        label: 'WhatsApp',
        path: '/whatsapp',
        icon: MessageCircle,
      },
    ],
  },
  {
    title: 'AUDIENCE & AUTOMATION',
    items: [
      {
        label: 'Audiences',
        path: '/audiences',
        icon: Users,
      },
      {
        label: 'Customer Journeys',
        path: '/journeys',
        icon: GitBranch,
      },
      {
        label: 'Forms',
        path: '/forms',
        icon: PanelsTopLeft,
      },
      {
        label: 'Landing Pages',
        path: '/landing-pages',
        icon: PanelsTopLeft,
      },
      {
        label: 'Templates',
        path: '/templates',
        icon: LayoutTemplate,
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <Megaphone size={23} />
        </div>

        <div className="brand-copy">
          <h2>MarketFlow</h2>
          <p>Marketing Automation</p>
        </div>
      </div>

      <div className="workspace-switcher">
        <div className="workspace-avatar">M</div>

        <div className="workspace-copy">
          <strong>My Workspace</strong>
          <span>Marketing Team</span>
        </div>

        <ChevronDown size={16} />
      </div>

      <nav className="sidebar-navigation">
        {menuGroups.map((group) => (
          <div className="menu-group"  key ={group.title}>
            <p className="menu-heading">{group.title}</p>

            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/campaigns'}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                >
                  <Icon size={19} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="profile-avatar">A</div>

        <div className="profile-copy">
          <strong>Admin User</strong>
          <span>Administrator</span>
        </div>
      </div>
    </aside>
  );
}
