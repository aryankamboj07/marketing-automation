
import { useState } from 'react';
import {
  Plus,
  Search,
  Eye,
  Copy,
  Trash2,
  Mail,
  LayoutTemplate,
} from 'lucide-react';

export default function Template() {
  const [search, setSearch] = useState('');

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Welcome Email',
      category: 'Welcome',
      updated: 'Today',
    },
    {
      id: 2,
      name: 'Monthly Newsletter',
      category: 'Newsletter',
      updated: 'Yesterday',
    },
    {
      id: 3,
      name: 'Promotional Offer',
      category: 'Promotion',
      updated: '12 Oct 2026',
    },
    {
      id: 4,
      name: 'Order Confirmation',
      category: 'Transactional',
      updated: '10 Oct 2026',
    },
  ]);

  const addTemplate = () => {
    const name = prompt('Enter template name:');

    if (!name?.trim()) return;

    setTemplates((current) => [
      ...current,
      {
        id: Date.now(),
        name: name.trim(),
        category: 'Custom',
        updated: 'Today',
      },
    ]);
  };

  const filteredTemplates = templates.filter((template) =>
    `${template.name} ${template.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Email Templates
            </h1>
            <p className="mt-2 text-slate-500">
              Create, organize, and reuse your email templates.
            </p>
          </div>

          <button
            onClick={addTemplate}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
          >
            <Plus size={18} />
            Create Template
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <LayoutTemplate className="mb-3 text-indigo-600" size={24} />
            <p className="text-sm text-slate-500">Total Templates</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-800">
              {templates.length}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <Mail className="mb-3 text-emerald-600" size={24} />
            <p className="text-sm text-slate-500">Categories</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-800">
              {new Set(templates.map((item) => item.category)).size}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <Copy className="mb-3 text-amber-600" size={24} />
            <p className="text-sm text-slate-500">Reusable Designs</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-800">
              Ready to use
            </h2>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b p-5">
            <h2 className="text-lg font-semibold text-slate-800">
              All Templates
            </h2>

            <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
              <Search size={18} className="text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search templates..."
                className="w-48 outline-none"
              />
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="overflow-hidden rounded-xl border border-slate-200 transition hover:shadow-md"
              >
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-indigo-100 to-violet-100">
                  <Mail size={48} className="text-indigo-500" />
                </div>

                <div className="p-4">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {template.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {template.category}
                      </p>
                    </div>

                    <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs text-indigo-600">
                      Template
                    </span>
                  </div>

                  <p className="mb-4 text-xs text-slate-400">
                    Updated: {template.updated}
                  </p>

                  <div className="flex gap-2 border-t pt-3">
                    <button
                      onClick={() => alert(`Preview: ${template.name}`)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      <Eye size={16} /> Preview
                    </button>

                    <button
                      onClick={() => {
                        const name = prompt(
                          'Enter name for the duplicate:',
                          `${template.name} Copy`
                        );

                        if (name?.trim()) {
                          setTemplates((current) => [
                            ...current,
                            {
                              ...template,
                              id: Date.now(),
                              name: name.trim(),
                              updated: 'Today',
                            },
                          ]);
                        }
                      }}
                      title="Duplicate template"
                      className="rounded-lg border p-2 text-slate-600 hover:bg-slate-50"
                    >
                      <Copy size={16} />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete "${template.name}"?`)) {
                          setTemplates((current) =>
                            current.filter((item) => item.id !== template.id)
                          );
                        }
                      }}
                      title="Delete template"
                      className="rounded-lg border p-2 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredTemplates.length === 0 && (
              <p className="col-span-full py-10 text-center text-slate-500">
                No templates found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
