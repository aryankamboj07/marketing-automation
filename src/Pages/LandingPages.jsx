
import { useState } from 'react';
import { Plus, Search, ExternalLink, Eye, Edit, Trash2 } from 'lucide-react';

export default function LandingPages() {
  const [pages, setPages] = useState([
    {
      id: 1,
      name: 'Summer Sale Landing Page',
      status: 'Published',
      views: 1240,
      conversions: 186,
    },
    {
      id: 2,
      name: 'Newsletter Signup',
      status: 'Draft',
      views: 0,
      conversions: 0,
    },
    {
      id: 3,
      name: 'Product Launch',
      status: 'Published',
      views: 860,
      conversions: 94,
    },
  ]);

  const [search, setSearch] = useState('');

  const addPage = () => {
    const name = prompt('Enter landing page name:');
    if (!name?.trim()) return;

    setPages((current) => [
      ...current,
      {
        id: Date.now(),
        name: name.trim(),
        status: 'Draft',
        views: 0,
        conversions: 0,
      },
    ]);
  };

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Landing Pages
            </h1>
            <p className="mt-2 text-slate-500">
              Create and manage your marketing landing pages.
            </p>
          </div>

          <button
            onClick={addPage}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
          >
            <Plus size={18} />
            Create Landing Page
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Total Pages', value: pages.length },
            {
              label: 'Published',
              value: pages.filter((page) => page.status === 'Published').length,
            },
            {
              label: 'Total Views',
              value: pages.reduce((sum, page) => sum + page.views, 0).toLocaleString(),
            },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">{item.label}</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b p-5">
            <h2 className="text-lg font-semibold text-slate-800">
              All Landing Pages
            </h2>

            <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
              <Search size={18} className="text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search pages..."
                className="w-48 outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="p-4">Page Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Views</th>
                  <th className="p-4">Conversions</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-800">
                      {page.name}
                    </td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        page.status === 'Published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{page.views.toLocaleString()}</td>
                    <td className="p-4 text-slate-600">{page.conversions}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button
                          title="Preview"
                          onClick={() => alert(`Preview: ${page.name}`)}
                          className="text-slate-500 hover:text-indigo-600"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          title="Edit"
                          onClick={() => {
                            const name = prompt('Edit page name:', page.name);
                            if (name?.trim()) {
                              setPages((current) =>
                                current.map((item) =>
                                  item.id === page.id
                                    ? { ...item, name: name.trim() }
                                    : item
                                )
                              );
                            }
                          }}
                          className="text-slate-500 hover:text-indigo-600"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => {
                            if (confirm(`Delete "${page.name}"?`)) {
                              setPages((current) =>
                                current.filter((item) => item.id !== page.id)
                              );
                            }
                          }}
                          className="text-slate-500 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          title="Open page"
                          onClick={() => alert(`Page: ${page.name}`)}
                          className="text-slate-500 hover:text-indigo-600"
                        >
                          <ExternalLink size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredPages.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      No landing pages found.
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
