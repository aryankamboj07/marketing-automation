
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Layout from './components/Layout.jsx';

import CampaignDashboard from './Pages/Campaigns/CampaignDashboard.jsx';
import CampaignList from './Pages/Campaigns/CampaignList.jsx';
import CampaignBuilder from './Pages/Campaigns/CampaignBuilder.jsx';

import EmailCampaigns from './Pages/Emails/EmailCampaigns.jsx';
import EmailEditor from './Pages/Emails/EmailEditor.jsx';

import Analytics from './Pages/Analytics.jsx';
import Audiences from './Pages/Audiences.jsx';
import Forms from './Pages/Forms.jsx';
import Journeys from './Pages/Journeys.jsx';
import LandingPages from './Pages/LandingPages.jsx';
import Template from './Pages/Template.jsx';
import WhatsApp from './Pages/WhatsApp.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Navigate
              to="/campaigns/dashboard"
              replace
            />
          }
        />

        <Route
          path="/campaigns/dashboard"
          element={<CampaignDashboard />}
        />

        <Route
          path="/campaigns"
          element={<CampaignList />}
        />

        <Route
          path="/campaigns/new"
          element={<CampaignBuilder />}
        />

        <Route
          path="/email"
          element={<EmailCampaigns />}
        />

        <Route
          path="/email/editor"
          element={<EmailEditor />}
        />

        <Route path="/analytics" element={<Analytics />} />
        <Route path="/audiences" element={<Audiences />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/journeys" element={<Journeys />} />

        <Route
          path="/landing-pages"
          element={<LandingPages />}
        />

        <Route path="/templates" element={<Template />} />
        <Route path="/whatsapp" element={<WhatsApp />} />

        <Route
          path="*"
          element={
            <Navigate
              to="/campaigns/dashboard"
              replace
            />
          }
        />
      </Route>
    </Routes>
  );
}
