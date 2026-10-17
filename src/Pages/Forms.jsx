
import React, { useState } from 'react'
import { ClipboardList, Plus, Search, Users, Eye } from 'lucide-react'

const initialForms = [
  {
    name: 'Newsletter Signup',
    type: 'Embedded Form',
    submissions: 1248,
    status: 'Published',
  },
  {
    name: 'Contact Us',
    type: 'Contact Form',
    submissions: 856,
    status: 'Published',
  },
  {
    name: 'Product Updates',
    type: 'Popup Form',
    submissions: 324,
    status: 'Draft',
  },
]

export default function Forms() {
  const [forms, setForms] = useState(initialForms)
  const [search, setSearch] = useState('')

  const createForm = () => {
    const name = window.prompt('Enter the new form name:')
    if (!name?.trim()) return

    setForms((current) => [
      ...current,
      {
        name: name.trim(),
        type: 'Embedded Form',
        submissions: 0,
        status: 'Draft',
      },
    ])
  }

  const filteredForms = forms.filter((form) =>
    form.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <ClipboardList size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Forms</h1>
            <p className="mt-1 text-sm text-gray-500">
              Create forms and collect information from your audience.
            </p>
          </div>
        </div>

        <button
          onClick={createForm}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Form
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Total Forms</p>
          <p className="mt-2 text-2xl font-bold">{forms.length}</p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Total Submissions</p>
          <p className="mt-2 text-2xl font-bold">
            {forms.reduce((total, form) => total + form.submissions, 0).toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Published Forms</p>
          <p className="mt-2 text-2xl font-bold">
            {forms.filter((form) => form.status === 'Published').length}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
          <h2 className="font-semibold text-gray-900">All Forms</h2>

          <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
            <Search size={17} className="text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search forms..."
              className="w-full text-sm outline-none sm:w-48"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Form Name</th>
                <th className="px-5 py-4 font-medium">Type</th>
                <th className="px-5 py-4 font-medium">Submissions</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredForms.map((form, index) => (
                <tr key={`${form.name}-${index}`} className="border-t">
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {form.name}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{form.type}</td>
                  <td className="px-5 py-4 text-gray-600">
                    {form.submissions.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        form.status === 'Published'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {form.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => window.alert(`Form: ${form.name}`)}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredForms.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-gray-500">
                    No forms found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
