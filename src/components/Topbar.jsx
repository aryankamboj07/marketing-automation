
import { useState } from 'react';
import {
  Search,
  Bell,
  CircleHelp,
  ChevronDown,
  Menu,
  Settings,
} from 'lucide-react';

export default function Topbar() {
  const [search, setSearch] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="topbar-icon mobile-menu-button"
          aria-label="Open menu"
          onClick={() =>
            document.querySelector('.sidebar')?.classList.toggle('sidebar-open')
          }
        >
          <Menu size={21} />
        </button>

        <div className="topbar-search">
          <Search size={19} />
          <input
            type="search"
            placeholder="Search anything..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <span className="search-shortcut">Ctrl K</span>
        </div>
      </div>

      <div className="topbar-actions">
        <button
          className="topbar-icon"
          title="Help"
          onClick={() => alert('Help center coming soon.')}
        >
          <CircleHelp size={20} />
        </button>

        <div className="topbar-dropdown-wrapper">
          <button
            className="topbar-icon notification-button"
            title="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            <span className="notification-dot" />
          </button>

          {showNotifications && (
            <div className="topbar-dropdown notification-dropdown">
              <h3>Notifications</h3>
              <p className="notification-item">
                <strong>Welcome to MarketFlow</strong>
                <span>Your marketing workspace is ready.</span>
              </p>
              <p className="notification-item">
                <strong>Campaign overview</strong>
                <span>Review your latest campaign activity.</span>
              </p>
              <button
                className="dropdown-close"
                onClick={() => setShowNotifications(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>

        <div className="topbar-dropdown-wrapper">
          <button
            className="topbar-profile"
            onClick={() => setShowProfile(!showProfile)}
          >
            <span className="topbar-avatar">A</span>
            <span className="topbar-user-details">
              <strong>Admin User</strong>
              <small>Administrator</small>
            </span>
            <ChevronDown size={16} />
          </button>

          {showProfile && (
            <div className="topbar-dropdown profile-dropdown">
              <button
                onClick={() => alert('Profile settings coming soon.')}
              >
                <Settings size={16} /> Profile Settings
              </button>
              <button
                onClick={() => alert('Account settings coming soon.')}
              >
                <Settings size={16} /> Account Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
