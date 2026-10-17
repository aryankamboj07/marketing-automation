
import React from 'react'
import { Mail, Users, Settings, Workflow } from 'lucide-react'

export default function CampaignBuilder() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Workflow size={28} className="text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Campaign Builder
          </h1>
          <p className="text-sm text-gray-500">
            Create and manage your marketing campaigns.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5">
          <Mail size={24} className="mb-3 text-blue-600" />
          <h2 className="font-semibold">Campaign Content</h2>
          <p className="mt-2 text-sm text-gray-500">
            Create and customize campaign messages.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <Users size={24} className="mb-3 text-blue-600" />
          <h2 className="font-semibold">Audience</h2>
          <p className="mt-2 text-sm text-gray-500">
            Select your target audience.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <Settings size={24} className="mb-3 text-blue-600" />
          <h2 className="font-semibold">Settings</h2>
          <p className="mt-2 text-sm text-gray-500">
            Configure your campaign settings.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <label className="mb-2 block text-sm font-medium">
          Campaign Name
        </label>
        <input
          type="text"
          placeholder="Enter campaign name"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
        />

        <label className="mb-2 mt-5 block text-sm font-medium">
          Campaign Description
        </label>
        <textarea
          rows={4}
          placeholder="Enter campaign description"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
        />

        <button className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
          Save Campaign
        </button>
      </div>
    </div>
  )
}
