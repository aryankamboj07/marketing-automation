
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Send,
  Users,
  MousePointerClick,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'

const stats = [
  {
    title: 'Total Campaigns',
    value: '128',
    change: '+12.8%',
    icon: Send,
  },
  {
    title: 'Total Contacts',
    value: '12,480',
    change: '+8.2%',
    icon: Users,
  },
  {
    title: 'Click Rate',
    value: '6.84%',
    change: '+2.4%',
    icon: MousePointerClick,
  },
  {
    title: 'Conversions',
    value: '1,284',
    change: '+14.6%',
    icon: TrendingUp,
  },
]

const campaigns = [
  {
    name: 'October Newsletter',
    channel: 'Email',
    status: 'Sent',
    sent: '4,820',
  },
  {
    name: 'Welcome Series',
    channel: 'Email',
    status: 'Active',
    sent: '1,240',
  },
  {
    name: 'Festival Promotion',
    channel: 'WhatsApp',
    status: 'Draft',
    sent: '—',
  },
  {
    name: 'Product Launch',
    channel: 'Email',
    status: 'Scheduled',
    sent: '2,500',
  },
]

export default function CampaignDashboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Campaign Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor your marketing performance and campaign activity.
          </p>
        </div>

        <Link
          to="/campaigns/new"
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Create Campaign
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, change, icon: Icon }) => (
          <div
            key={title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{title}</p>
              <Icon size={22} className="text-blue-600" />
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-900">
              {value}
            </p>

            <p className="mt-2 text-sm text-emerald-600">
              {change} <span className="text-gray-400">vs last month</span>
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="font-semibold text-gray-900">
              Recent Campaigns
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Review your latest campaign activity.
            </p>
          </div>

          <Link
            to="/campaigns"
            className="flex items-center gap-1 text-sm font-medium text-blue-600"
          >
            View All <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Campaign</th>
                <th className="px-5 py-3 font-medium">Channel</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Messages Sent</th>
              </tr>
            </thead>

            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.name} className="border-t">
                  <td className="px-5 py-4 font-medium text-gray-800">
                    {campaign.name}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {campaign.channel}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {campaign.sent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
