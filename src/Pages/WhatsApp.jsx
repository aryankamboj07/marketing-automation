
import { useState } from 'react';
import {
  MessageCircle,
  Plus,
  Search,
  Send,
  Users,
  CheckCircle,
  Clock,
  Trash2,
} from 'lucide-react';

export default function WhatsApp() {
  const [search, setSearch] = useState('');

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Diwali Special Offer',
      audience: 'All Customers',
      status: 'Sent',
      messages: 1250,
    },
    {
      id: 2,
      name: 'New Product Announcement',
      audience: 'Active Customers',
      status: 'Scheduled',
      messages: 850,
    },
    {
      id: 3,
      name: 'Welcome Message',
      audience: 'New Customers',
      status: 'Draft',
      messages: 0,
    },
  ]);

  const createCampaign = () => {
    const name = prompt('Enter WhatsApp campaign name:');
    if (!name?.trim()) return;

    setCampaigns((current) => [
      ...current,
      {
        id: Date.now(),
        name: name.trim(),
        audience: 'All Customers',
        status: 'Draft',
        messages: 0,
      },
    ]);
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    `${campaign.name} ${campaign.audience} ${campaign.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sentCount = campaigns.filter(
    (campaign) => campaign.status === 'Sent'
  ).length;

  const totalMessages = campaigns.reduce(
    (sum, campaign) => sum + campaign.messages,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3">
                <MessageCircle size={28} className="text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800">
                WhatsApp Marketing
              </h1>
            </div>
            <p className="text-slate-500">
              Create and manage WhatsApp marketing campaigns.
            </p>
          </div>

          <button
            onClick={createCampaign}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
          >
            <Plus size={18} />
            Create Campaign
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Total Campaigns',
              value: campaigns.length,
              icon: MessageCircle,
              color: 'text-green-600',
            },
            {
              label: 'Sent Campaigns',
              value: sentCount,
              icon: CheckCircle,
              color: 'text-emerald-600',
            },
            {
              label: 'Total Messages',
              value: totalMessages.toLocaleString(),
              icon: Send,
              color: 'text-indigo-600',
            },
            {
              label: 'Scheduled',
              value: campaigns.filter((c) => c.status === 'Scheduled').length,
              icon: Clock,
              color: 'text-amber-600',
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <Icon size={24} className={item.color} />
                <p className="mt-4 text-sm text-slate-500">{item.label}</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-800">
                  {item.value}
                </h2>
              </div>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b p-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                WhatsApp Campaigns
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Track your campaign activity and status.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
              <Search size={18} className="text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search campaigns..."
                className="w-48 outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="p-4">Campaign Name</th>
                  <th className="p-4">Audience</th>
                  <th className="p-4">Messages</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-800">
                      {campaign.name}
                    </td>
                    <td className="p-4 text-slate-600">
                      <span className="flex items-center gap-2">
                        <Users size={16} />
                        {campaign.audience}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      {campaign.messages.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          campaign.status === 'Sent'
                            ? 'bg-green-100 text-green-700'
                            : campaign.status === 'Scheduled'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        title="Delete campaign"
                        onClick={() => {
                          if (confirm(`Delete "${campaign.name}"?`)) {
                            setCampaigns((current) =>
                              current.filter((item) => item.id !== campaign.id)
                            );
                          }
                        }}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredCampaigns.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      No campaigns found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
