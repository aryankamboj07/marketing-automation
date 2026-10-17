
import React, { useState } from 'react'
import {
  GitBranch,
  Plus,
  Play,
  Pause,
  Users,
  Workflow,
  Clock,
} from 'lucide-react'

const initialJourneys = [
  {
    name: 'Welcome Journey',
    trigger: 'New subscriber',
    enrolled: 1248,
    status: 'Active',
  },
  {
    name: 'Abandoned Cart',
    trigger: 'Cart abandoned',
    enrolled: 856,
    status: 'Active',
  },
  {
    name: 'Customer Re-engagement',
    trigger: 'Inactive customer',
    enrolled: 324,
    status: 'Paused',
  },
]

export default function Journeys() {
  const [journeys, setJourneys] = useState(initialJourneys)

  const createJourney = () => {
    const name = window.prompt('Enter journey name:')
    if (!name?.trim()) return

    setJourneys((current) => [
      ...current,
      {
        name: name.trim(),
        trigger: 'Not configured',
        enrolled: 0,
        status: 'Draft',
      },
    ])
  }

  const toggleStatus = (index) => {
    setJourneys((current) =>
      current.map((journey, i) => {
        if (i !== index) return journey

        return {
          ...journey,
          status: journey.status === 'Active' ? 'Paused' : 'Active',
        }
      })
    )
  }

  const activeCount = journeys.filter(
    (journey) => journey.status === 'Active'
  ).length

  const totalEnrolled = journeys.reduce(
    (total, journey) => total + journey.enrolled,
    0
  )

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <GitBranch size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Customer Journeys
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Automate customer interactions from start to finish.
            </p>
          </div>
        </div>

        <button
          onClick={createJourney}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Journey
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Journeys</p>
            <Workflow size={20} className="text-blue-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-gray-900">
            {journeys.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Active Journeys</p>
            <Play size={20} className="text-green-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-gray-900">
            {activeCount}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Customers Enrolled</p>
            <Users size={20} className="text-purple-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-gray-900">
            {totalEnrolled.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b p-5">
          <h2 className="font-semibold text-gray-900">All Journeys</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor your automated workflows.
          </p>
        </div>

        <div className="divide-y">
          {journeys.map((journey, index) => (
            <div
              key={`${journey.name}-${index}`}
              className="flex flex-wrap items-center justify-between gap-4 p-5"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gray-50 p-3 text-gray-600">
                  <GitBranch size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {journey.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Trigger: {journey.trigger}
                  </p>

                  <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <Users size={14} />
                    {journey.enrolled.toLocaleString()} customers enrolled
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    journey.status === 'Active'
                      ? 'bg-green-50 text-green-700'
                      : journey.status === 'Paused'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {journey.status}
                </span>

                {journey.status !== 'Draft' && (
                  <button
                    onClick={() => toggleStatus(index)}
                    title={journey.status === 'Active' ? 'Pause journey' : 'Activate journey'}
                    className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                  >
                    {journey.status === 'Active' ? (
                      <Pause size={17} />
                    ) : (
                      <Play size={17} />
                    )}
                  </button>
                )}

                <Clock size={18} className="text-gray-400" />
              </div>
            </div>
          ))}

          {journeys.length === 0 && (
            <p className="p-8 text-center text-sm text-gray-500">
              No journeys yet. Create your first journey to get started.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
