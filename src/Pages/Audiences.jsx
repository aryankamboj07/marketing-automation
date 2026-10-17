
import React, { useMemo, useState } from "react";
import {
  Users,
  Search,
  Plus,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Bookmark,
  X,
  Check,
  Mail,
  Building2,
  CalendarDays,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  RefreshCw,
  UserPlus,
  Filter,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";

const INITIAL_AUDIENCES = [
  {
    id: 1,
    name: "Enterprise Software",
    description: "Enterprise software decision makers",
    type: "Customer segment",
    rules: "Company size: 500+",
    contacts: 2480,
    owner: "Anjum",
    status: "Active",
    updated: "Today",
    email: "enterprise@example.com",
  },
  {
    id: 2,
    name: "Fintech Professionals",
    description: "Finance and fintech professionals",
    type: "Customer segment",
    rules: "Industry: Fintech",
    contacts: 1860,
    owner: "Sonam",
    status: "Active",
    updated: "Today",
    email: "fintech@example.com",
  },
  {
    id: 3,
    name: "Education Network",
    description: "Education institutions and educators",
    type: "Customer segment",
    rules: "Industry: Education",
    contacts: 1240,
    owner: "Pawan",
    status: "Draft",
    updated: "Yesterday",
    email: "education@example.com",
  },
  {
    id: 4,
    name: "Legal Professionals",
    description: "Legal firms and independent professionals",
    type: "Suppression list",
    rules: "Industry: Legal",
    contacts: 860,
    owner: "Shanu",
    status: "Active",
    updated: "Yesterday",
    email: "legal@example.com",
  },
  {
    id: 5,
    name: "Consulting Partners",
    description: "Consulting firms and business advisors",
    type: "Customer segment",
    rules: "Industry: Consulting",
    contacts: 720,
    owner: "Anjum",
    status: "Paused",
    updated: "Oct 14",
    email: "consulting@example.com",
  },
  {
    id: 6,
    name: "High Intent Leads",
    description: "Contacts with strong purchase intent",
    type: "Dynamic segment",
    rules: "Lead score: 80+",
    contacts: 645,
    owner: "Sonam",
    status: "Active",
    updated: "Oct 13",
    email: "leads@example.com",
  },
  {
    id: 7,
    name: "Newsletter Subscribers",
    description: "Contacts opted in to newsletters",
    type: "Customer segment",
    rules: "Consent: Email subscribed",
    contacts: 4320,
    owner: "Pawan",
    status: "Active",
    updated: "Oct 12",
    email: "newsletter@example.com",
  },
  {
    id: 8,
    name: "Inactive Contacts",
    description: "Contacts with no recent engagement",
    type: "Dynamic segment",
    rules: "Last activity: 90+ days",
    contacts: 380,
    owner: "Shanu",
    status: "Draft",
    updated: "Oct 11",
    email: "inactive@example.com",
  },
  {
    id: 9,
    name: "VIP Customers",
    description: "High-value returning customers",
    type: "Customer segment",
    rules: "Lifetime value: High",
    contacts: 215,
    owner: "Anjum",
    status: "Active",
    updated: "Oct 10",
    email: "vip@example.com",
  },
  {
    id: 10,
    name: "Unsubscribed Contacts",
    description: "Contacts excluded from email marketing",
    type: "Suppression list",
    rules: "Consent: Unsubscribed",
    contacts: 154,
    owner: "Shanu",
    status: "Active",
    updated: "Oct 09",
    email: "suppression@example.com",
  },
  {
    id: 11,
    name: "Retail Customers",
    description: "Retail buyers and store customers",
    type: "Customer segment",
    rules: "Industry: Retail",
    contacts: 960,
    owner: "Pawan",
    status: "Active",
    updated: "Oct 08",
    email: "retail@example.com",
  },
  {
    id: 12,
    name: "Trial Users",
    description: "Contacts currently in a product trial",
    type: "Dynamic segment",
    rules: "Plan: Free trial",
    contacts: 530,
    owner: "Sonam",
    status: "Paused",
    updated: "Oct 07",
    email: "trial@example.com",
  },
];

const STATUS_OPTIONS = ["All statuses", "Active", "Draft", "Paused"];
const OWNER_OPTIONS = ["All owners", "Anjum", "Sonam", "Pawan", "Shanu"];
const TYPE_OPTIONS = [
  "All types",
  "Customer segment",
  "Dynamic segment",
  "Suppression list",
];

const STATUS_STYLES = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Draft: "bg-amber-50 text-amber-700 ring-amber-600/15",
  Paused: "bg-slate-100 text-slate-600 ring-slate-500/15",
};

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const avatarColors = [
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
];

function Button({
  children,
  onClick,
  variant = "secondary",
  className = "",
  type = "button",
  disabled = false,
}) {
  const styles = {
    primary:
      "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 shadow-sm",
    secondary:
      "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    ghost:
      "border border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function SelectFilter({ label, value, options, onChange }) {
  return (
    <label className="relative inline-flex">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 min-w-0 max-w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-slate-600 outline-none transition hover:border-slate-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </label>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        STATUS_STYLES[status] || STATUS_STYLES.Draft
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Active"
            ? "bg-emerald-500"
            : status === "Paused"
              ? "bg-slate-400"
              : "bg-amber-500"
        }`}
      />
      {status}
    </span>
  );
}

function StatCard({ title, value, icon: Icon, color, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={20} />
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-400">{subtitle}</p>
    </div>
  );
}

function AudienceModal({ audience, onClose, onSave }) {
  const [form, setForm] = useState(
    audience || {
      name: "",
      description: "",
      type: "Customer segment",
      rules: "",
      contacts: 0,
      owner: "Anjum",
      status: "Draft",
      email: "",
    }
  );

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) return;

    onSave({
      ...form,
      id: audience?.id ?? Date.now(),
      name: form.name.trim(),
      description: form.description.trim(),
      rules: form.rules.trim() || "No rules configured",
      contacts: Number(form.contacts) || 0,
      updated: "Just now",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="audience-modal-title"
        className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={20} />
            </div>
            <div>
              <h2
                id="audience-modal-title"
                className="text-lg font-bold text-slate-900"
              >
                {audience ? "Edit audience" : "Create audience"}
              </h2>
              <p className="text-xs text-slate-500">
                Configure your audience details and segmentation.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-5 p-5 sm:p-6">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Audience name <span className="text-rose-500">*</span>
            </label>
            <input
              required
              autoFocus
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. High Intent Leads"
              className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe who belongs in this audience..."
              rows={3}
              className="w-full resize-y rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Audience type
              </label>
              <select
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400"
              >
                {TYPE_OPTIONS.slice(1).map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Owner
              </label>
              <select
                value={form.owner}
                onChange={(e) => update("owner", e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400"
              >
                {OWNER_OPTIONS.slice(1).map((owner) => (
                  <option key={owner}>{owner}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Segmentation rules
            </label>
            <input
              value={form.rules}
              onChange={(e) => update("rules", e.target.value)}
              placeholder="e.g. Industry: Technology"
              className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
            <p className="mt-1.5 text-xs text-slate-400">
              Add a description of the criteria for this audience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Contact count
              </label>
              <input
                type="number"
                min="0"
                value={form.contacts}
                onChange={(e) => update("contacts", e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400"
              >
                {STATUS_OPTIONS.slice(1).map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">
              <Check size={16} />
              {audience ? "Save changes" : "Create audience"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AudienceDetailModal({ audience, onClose, onEdit }) {
  if (!audience) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={23} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {audience.name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {audience.type}
              </p>
              <div className="mt-2">
                <StatusBadge status={audience.status} />
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            aria-label="Close details"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Description
            </p>
            <p className="mt-1.5 text-sm text-slate-700">
              {audience.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Contacts</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {Number(audience.contacts).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Owner</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {audience.owner}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Segmentation rules
            </p>
            <p className="mt-1.5 text-sm text-slate-700">
              {audience.rules}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Last updated
            </p>
            <p className="mt-1.5 text-sm text-slate-700">
              {audience.updated}
            </p>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <Button onClick={onClose}>Close</Button>
            <Button
              variant="primary"
              onClick={() => onEdit(audience)}
            >
              <Pencil size={15} />
              Edit audience
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Audiences() {
  const [audiences, setAudiences] = useState(INITIAL_AUDIENCES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [ownerFilter, setOwnerFilter] = useState("All owners");
  const [typeFilter, setTypeFilter] = useState("All types");
  const [dateFilter, setDateFilter] = useState("Any time");
  const [savedView, setSavedView] = useState("All audiences");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAudience, setEditingAudience] = useState(null);
  const [detailAudience, setDetailAudience] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [toast, setToast] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState("name-asc");

  const activeCount = audiences.filter((item) => item.status === "Active").length;
  const dynamicCount = audiences.filter((item) => item.type === "Dynamic segment").length;
  const totalContacts = audiences.reduce(
    (sum, item) => sum + Number(item.contacts || 0),
    0
  );

  const filtered = useMemo(() => {
    let result = [...audiences];

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter((item) =>
        [
          item.name,
          item.description,
          item.rules,
          item.owner,
          item.type,
          item.email,
        ].some((field) => String(field || "").toLowerCase().includes(query))
      );
    }

    if (statusFilter !== "All statuses") {
      result = result.filter((item) => item.status === statusFilter);
    }

    if (ownerFilter !== "All owners") {
      result = result.filter((item) => item.owner === ownerFilter);
    }

    if (typeFilter !== "All types") {
      result = result.filter((item) => item.type === typeFilter);
    }

    if (dateFilter === "Today") {
      result = result.filter((item) => item.updated === "Today" || item.updated === "Just now");
    } else if (dateFilter === "Last 7 days") {
      result = result.filter((item) =>
        ["Today", "Just now", "Yesterday"].includes(item.updated)
      );
    } else if (dateFilter === "Last 30 days") {
      result = result.filter((item) => item.updated !== "Older");
    }

    if (savedView === "Active audiences") {
      result = result.filter((item) => item.status === "Active");
    } else if (savedView === "Drafts") {
      result = result.filter((item) => item.status === "Draft");
    } else if (savedView === "Suppression lists") {
      result = result.filter((item) => item.type === "Suppression list");
    }

    result.sort((a, b) => {
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "contacts-desc") return b.contacts - a.contacts;
      if (sort === "contacts-asc") return a.contacts - b.contacts;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [
    audiences,
    search,
    statusFilter,
    ownerFilter,
    typeFilter,
    dateFilter,
    savedView,
    sort,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const resetPage = () => setPage(1);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All statuses");
    setOwnerFilter("All owners");
    setTypeFilter("All types");
    setDateFilter("Any time");
    setSavedView("All audiences");
    setSort("name-asc");
    resetPage();
  };

  const notify = (message) => {
    setToast(message);
  };

  const saveAudience = (audience) => {
    setAudiences((current) => {
      const exists = current.some((item) => item.id === audience.id);

      if (exists) {
        return current.map((item) =>
          item.id === audience.id ? audience : item
        );
      }

      return [audience, ...current];
    });

    setModalOpen(false);
    setEditingAudience(null);
    setDetailAudience(null);
    resetPage();
    notify(editingAudience ? "Audience updated successfully." : "Audience created successfully.");
  };

  const editAudience = (audience) => {
    setDetailAudience(null);
    setEditingAudience(audience);
    setModalOpen(true);
    setMenuId(null);
  };

  const deleteAudience = (audience) => {
    const confirmed = window.confirm(
      `Delete "${audience.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setAudiences((current) =>
      current.filter((item) => item.id !== audience.id)
    );
    setMenuId(null);
    setDetailAudience(null);
    resetPage();
    notify("Audience deleted.");
  };

  const exportCSV = () => {
    const headers = [
      "Name",
      "Description",
      "Type",
      "Rules",
      "Contacts",
      "Owner",
      "Status",
      "Updated",
      "Email",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [
      headers.map(escapeCSV).join(","),
      ...filtered.map((item) =>
        [
          item.name,
          item.description,
          item.type,
          item.rules,
          item.contacts,
          item.owner,
          item.status,
          item.updated,
          item.email,
        ]
          .map(escapeCSV)
          .join(",")
      ),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "audiences-export.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    notify("Audience CSV exported successfully.");
  };

  const activeFilters = [
    statusFilter !== "All statuses",
    ownerFilter !== "All owners",
    typeFilter !== "All types",
    dateFilter !== "Any time",
  ].filter(Boolean).length;

  return (
    <div
      className="min-h-full bg-[#f5f7fb] text-slate-900"
      onClick={() => {
        if (menuId !== null) setMenuId(null);
      }}
    >
      <main className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 ring-1 ring-blue-200/70">
              <Users size={25} strokeWidth={2} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Audiences
                </h1>
                <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  Marketing
                </span>
              </div>
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Manage your contacts, build targeted segments, and organize
                your marketing audiences in one place.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button onClick={exportCSV}>
              <Download size={16} />
              Export CSV
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setEditingAudience(null);
                setModalOpen(true);
              }}
            >
              <Plus size={18} />
              New audience
            </Button>
          </div>
        </section>

        {/* Toast */}
        {toast && (
          <div
            role="status"
            className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
          >
            <span className="flex items-center gap-2">
              <Check size={17} />
              {toast}
            </span>
            <button
              type="button"
              onClick={() => setToast("")}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Overview cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total audiences"
            value={audiences.length.toLocaleString("en-IN")}
            icon={Users}
            color="bg-blue-50 text-blue-600"
            subtitle="All managed segments and lists"
          />
          <StatCard
            title="Active audiences"
            value={activeCount.toLocaleString("en-IN")}
            icon={Check}
            color="bg-emerald-50 text-emerald-600"
            subtitle="Currently enabled"
          />
          <StatCard
            title="Dynamic segments"
            value={dynamicCount.toLocaleString("en-IN")}
            icon={Sparkles}
            color="bg-violet-50 text-violet-600"
            subtitle="Rule-based audience groups"
          />
          <StatCard
            title="Total contacts"
            value={totalContacts.toLocaleString("en-IN")}
            icon={UserPlus}
            color="bg-amber-50 text-amber-600"
            subtitle="Across all audience records"
          />
        </section>

        {/* Audience management panel */}
        <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Audience management
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                View, organize, and maintain your audience records.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                  notify("Audience list refreshed.");
                }}
                className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              >
                <RefreshCw size={15} />
                Refresh
              </button>

              <Button onClick={() => setShowFilters((value) => !value)}>
                <SlidersHorizontal size={15} />
                Filters
                {activeFilters > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-100 px-1 text-[11px] text-blue-700">
                    {activeFilters}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Search and filters */}
          <div className="space-y-4 border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    resetPage();
                  }}
                  placeholder="Search audiences by name, owner, rules..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      resetPage();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 xl:flex">
                <SelectFilter
                  label="Filter by status"
                  value={statusFilter}
                  options={STATUS_OPTIONS}
                  onChange={(value) => {
                    setStatusFilter(value);
                    resetPage();
                  }}
                />
                <SelectFilter
                  label="Filter by owner"
                  value={ownerFilter}
                  options={OWNER_OPTIONS}
                  onChange={(value) => {
                    setOwnerFilter(value);
                    resetPage();
                  }}
                />
                <SelectFilter
                  label="Filter by date"
                  value={dateFilter}
                  options={["Any time", "Today", "Last 7 days", "Last 30 days"]}
                  onChange={(value) => {
                    setDateFilter(value);
                    resetPage();
                  }}
                />
              </div>
            </div>

            {showFilters && (
              <div className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50/40 p-4 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Audience type
                  </label>
                  <SelectFilter
                    label="Audience type"
                    value={typeFilter}
                    options={TYPE_OPTIONS}
                    onChange={(value) => {
                      setTypeFilter(value);
                      resetPage();
                    }}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    onClick={() => {
                      resetFilters();
                      setShowFilters(false);
                    }}
                  >
                    <RefreshCw size={14} />
                    Clear filters
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setShowFilters(false)}
                  >
                    <Check size={15} />
                    Done
                  </Button>
                </div>
              </div>
            )}

            {/* Saved views */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                  <Bookmark size={14} />
                  SAVED VIEWS
                </span>

                {[
                  "All audiences",
                  "Active audiences",
                  "Drafts",
                  "Suppression lists",
                ].map((view) => (
                  <button
                    type="button"
                    key={view}
                    onClick={() => {
                      setSavedView(view);
                      resetPage();
                    }}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      savedView === view
                        ? "bg-blue-600 text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 self-start text-xs text-slate-400 sm:self-auto">
                <Filter size={14} />
                {filtered.length} matching records
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <button
                      type="button"
                      onClick={() =>
                        setSort((value) =>
                          value === "name-asc" ? "name-desc" : "name-asc"
                        )
                      }
                      className="inline-flex items-center gap-1.5 hover:text-slate-900"
                    >
                      Audience
                      <ArrowUpDown size={13} />
                    </button>
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Type & rules
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Contacts
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Owner
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Last updated
                  </th>

                  <th className="px-5 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {pageItems.map((audience, index) => (
                  <tr
                    key={audience.id}
                    className="group transition hover:bg-blue-50/30"
                  >
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => setDetailAudience(audience)}
                        className="flex min-w-0 items-center gap-3 text-left"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                            avatarColors[index % avatarColors.length]
                          }`}
                        >
                          {initials(audience.name)}
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-64 truncate text-sm font-semibold text-slate-800 transition group-hover:text-blue-700">
                            {audience.name}
                          </p>
                          <p className="mt-1 max-w-64 truncate text-xs text-slate-400">
                            {audience.description}
                          </p>
                        </div>
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {audience.type}
                      </p>
                      <p className="mt-1 max-w-52 truncate text-xs text-slate-400">
                        {audience.rules}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Users size={15} className="text-slate-400" />
                        {Number(audience.contacts).toLocaleString("en-IN")}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${
                            avatarColors[
                              OWNER_OPTIONS.indexOf(audience.owner) %
                                avatarColors.length
                            ]
                          }`}
                        >
                          {initials(audience.owner)}
                        </div>
                        <span className="text-sm text-slate-600">
                          {audience.owner}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={audience.status} />
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                      {audience.updated}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div
                        className="relative inline-flex"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setMenuId((id) =>
                              id === audience.id ? null : audience.id
                            )
                          }
                          aria-label={`Actions for ${audience.name}`}
                          aria-expanded={menuId === audience.id}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-800 hover:shadow-sm"
                        >
                          <MoreHorizontal size={19} />
                        </button>

                        {menuId === audience.id && (
                          <div className="absolute right-0 top-full z-30 mt-1 w-44 rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl">
                            <button
                              type="button"
                              onClick={() => {
                                setDetailAudience(audience);
                                setMenuId(null);
                              }}
                              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                            >
                              <Eye size={15} />
                              View details
                            </button>

                            <button
                              type="button"
                              onClick={() => editAudience(audience)}
                              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                            >
                              <Pencil size={15} />
                              Edit audience
                            </button>

                            <div className="my-1 border-t border-slate-100" />

                            <button
                              type="button"
                              onClick={() => deleteAudience(audience)}
                              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50"
                            >
                              <Trash2 size={15} />
                              Delete audience
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {pageItems.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Search size={22} />
                      </div>
                      <h3 className="mt-4 text-sm font-bold text-slate-800">
                        No audiences found
                      </h3>
                      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                        Try changing your search or filters to find the audience
                        you are looking for.
                      </p>
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Clear all filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col justify-between gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span>
                Showing{" "}
                <strong className="font-semibold text-slate-700">
                  {filtered.length === 0
                    ? 0
                    : (currentPage - 1) * pageSize + 1}
                  –{Math.min(currentPage * pageSize, filtered.length)}
                </strong>{" "}
                of{" "}
                <strong className="font-semibold text-slate-700">
                  {filtered.length}
                </strong>{" "}
                records
              </span>

              <label className="flex items-center gap-2">
                <span>Rows</span>
                <select
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(Number(event.target.value));
                    resetPage();
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-blue-400"
                  aria-label="Rows per page"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </label>
            </div>

            <div className="flex items-center gap-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter((number) => {
                  return (
                    number === 1 ||
                    number === totalPages ||
                    Math.abs(number - currentPage) <= 1
                  );
                })
                .reduce((result, number, index, items) => {
                  if (index > 0 && number - items[index - 1] > 1) {
                    result.push("ellipsis-" + number);
                  }
                  result.push(number);
                  return result;
                }, [])
                .map((item) =>
                  typeof item === "string" ? (
                    <span
                      key={item}
                      className="px-1 text-sm text-slate-400"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setPage(item)}
                      aria-current={currentPage === item ? "page" : undefined}
                      className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold transition ${
                        currentPage === item
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col justify-between gap-2 pb-3 text-xs text-slate-400 sm:flex-row sm:items-center">
          <span>Audience Management · Marketing Workspace</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Audience workspace ready
          </span>
        </footer>
      </main>

      {modalOpen && (
        <AudienceModal
          key={editingAudience?.id ?? "new-audience"}
          audience={editingAudience}
          onClose={() => {
            setModalOpen(false);
            setEditingAudience(null);
          }}
          onSave={saveAudience}
        />
      )}

      {detailAudience && (
        <AudienceDetailModal
          audience={detailAudience}
          onClose={() => setDetailAudience(null)}
          onEdit={editAudience}
        />
      )}
    </div>
  );
}
