
import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Download,
  Eye,
  Filter,
  Mail,
  Megaphone,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  Target,
  Trash2,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";

const INITIAL_CAMPAIGNS = [
  {
    id: 1,
    name: "October Newsletter",
    channel: "Email",
    date: "2026-10-15",
    status: "Sent",
    contacts: 4820,
    owner: "Anjum",
    budget: 12000,
    reach: 18200,
    leads: 342,
    description: "Monthly newsletter featuring product updates and offers.",
  },
  {
    id: 2,
    name: "Welcome Series",
    channel: "Email",
    date: "2026-10-14",
    status: "Active",
    contacts: 1240,
    owner: "Sonam",
    budget: 8500,
    reach: 8400,
    leads: 186,
    description: "Welcome journey for new subscribers.",
  },
  {
    id: 3,
    name: "Festival Promotion",
    channel: "WhatsApp",
    date: "2026-10-12",
    status: "Draft",
    contacts: 0,
    owner: "Pawan",
    budget: 15000,
    reach: 0,
    leads: 0,
    description: "Festival offers and customer engagement campaign.",
  },
  {
    id: 4,
    name: "Product Launch",
    channel: "Email",
    date: "2026-10-20",
    status: "Scheduled",
    contacts: 2500,
    owner: "Shanu",
    budget: 20000,
    reach: 0,
    leads: 0,
    description: "Launch campaign for the latest product collection.",
  },
  {
    id: 5,
    name: "Customer Re-engagement",
    channel: "WhatsApp",
    date: "2026-10-09",
    status: "Active",
    contacts: 960,
    owner: "Anjum",
    budget: 6000,
    reach: 5200,
    leads: 94,
    description: "Re-engage customers who have not purchased recently.",
  },
  {
    id: 6,
    name: "Diwali Early Access",
    channel: "Email",
    date: "2026-10-08",
    status: "Sent",
    contacts: 3200,
    owner: "Sonam",
    budget: 11000,
    reach: 15600,
    leads: 286,
    description: "Early access offers for loyal customers.",
  },
  {
    id: 7,
    name: "Lead Generation",
    channel: "Email",
    date: "2026-10-07",
    status: "Paused",
    contacts: 1800,
    owner: "Pawan",
    budget: 9000,
    reach: 4100,
    leads: 76,
    description: "Lead acquisition and qualification campaign.",
  },
  {
    id: 8,
    name: "Weekend Special",
    channel: "WhatsApp",
    date: "2026-10-05",
    status: "Sent",
    contacts: 2100,
    owner: "Shanu",
    budget: 7500,
    reach: 9200,
    leads: 158,
    description: "Weekend promotional messaging.",
  },
];

const TASKS = [
  { id: 1, title: "Follow up: Apex Systems", owner: "Anjum", priority: "High" },
  { id: 2, title: "Review proposal — Green Tech", owner: "Sonam", priority: "Medium" },
  { id: 3, title: "Prepare client meeting", owner: "Pawan", priority: "Medium" },
  { id: 4, title: "Approve campaign draft", owner: "Shanu", priority: "High" },
];

const INITIAL_ACTIVITY = [
  { id: 1, initials: "AN", color: "bg-blue-100 text-blue-700", title: "Anjum created a new lead", time: "2 min ago" },
  { id: 2, initials: "SO", color: "bg-violet-100 text-violet-700", title: "Sonam sent a proposal", time: "18 min ago" },
  { id: 3, initials: "PA", color: "bg-emerald-100 text-emerald-700", title: "Pawan closed a task", time: "1 hr ago" },
];

const STATUS_STYLES = {
  Sent: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Active: "bg-blue-50 text-blue-700 ring-blue-600/15",
  Draft: "bg-slate-100 text-slate-600 ring-slate-500/15",
  Scheduled: "bg-amber-50 text-amber-700 ring-amber-600/15",
  Paused: "bg-rose-50 text-rose-700 ring-rose-600/15",
};

const AVATAR_STYLES = [
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
];

const formatNumber = (value) =>
  Number(value || 0).toLocaleString("en-IN");

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function Button({
  children,
  onClick,
  primary = false,
  className = "",
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
        primary
          ? "border-blue-600 bg-blue-600 text-white shadow-sm hover:border-blue-700 hover:bg-blue-700"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      } ${className}`}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        STATUS_STYLES[status] || STATUS_STYLES.Draft
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Sent"
            ? "bg-emerald-500"
            : status === "Active"
              ? "bg-blue-500"
              : status === "Scheduled"
                ? "bg-amber-500"
                : status === "Paused"
                  ? "bg-rose-500"
                  : "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  iconStyle,
  change,
  positive = true,
  subtitle,
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {value}
          </p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}>
          <Icon size={21} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {change && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold ${
              positive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {positive ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}
            {change}
          </span>
        )}
        <span className="text-xs text-slate-400">{subtitle}</span>
      </div>
    </article>
  );
}

function PerformanceChart({ range }) {
  const valuesByRange = {
    "7 days": [42, 58, 36, 71, 51, 84, 62, 76],
    "30 days": [48, 63, 54, 77, 68, 93, 74, 88],
    "90 days": [35, 52, 44, 68, 58, 79, 65, 91],
  };

  const values = valuesByRange[range] || valuesByRange["30 days"];
  const labels = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

  return (
    <div className="mt-7">
      <div className="relative flex h-48 items-end gap-3 border-b border-slate-100 px-2 sm:gap-5 sm:px-4">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-0">
          {[1, 2, 3, 4].map((line) => (
            <div key={line} className="border-t border-dashed border-slate-100" />
          ))}
        </div>

        {values.map((value, index) => (
          <div
            key={labels[index]}
            className="relative z-10 flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
          >
            <div className="group relative flex h-full w-full items-end justify-center">
              <div
                title={`${value}% activity index`}
                style={{ height: `${value}%` }}
                className="w-full max-w-9 rounded-t-md bg-blue-500/85 transition-all duration-300 hover:bg-blue-700 sm:max-w-11"
              />
              <div className="pointer-events-none absolute bottom-full mb-2 hidden whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs text-white group-hover:block">
                {value}% activity
              </div>
            </div>
            <span className="mb-2 text-[11px] font-medium text-slate-400">
              {labels[index]}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          Campaign engagement activity · {range}
        </p>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
          Engagement index
        </div>
      </div>
    </div>
  );
}

function CampaignModal({ campaign, onClose, onSave }) {
  const [form, setForm] = useState(
    campaign || {
      name: "",
      channel: "Email",
      date: new Date().toISOString().slice(0, 10),
      status: "Draft",
      contacts: 0,
      owner: "Anjum",
      budget: 0,
      reach: 0,
      leads: 0,
      description: "",
    }
  );

  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();

    onSave({
      ...form,
      id: campaign?.id ?? Date.now(),
      name: form.name.trim(),
      contacts: Number(form.contacts) || 0,
      budget: Number(form.budget) || 0,
      reach: Number(form.reach) || 0,
      leads: Number(form.leads) || 0,
    });
  };

  const inputClass =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50";

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
        aria-labelledby="campaign-modal-title"
        className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Megaphone size={20} />
            </div>
            <div>
              <h2 id="campaign-modal-title" className="text-lg font-bold text-slate-900">
                {campaign ? "Edit campaign" : "Create campaign"}
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Manage your campaign details and delivery settings.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4 p-5 sm:p-6">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Campaign name <span className="text-rose-500">*</span>
            </label>
            <input
              required
              autoFocus
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. October Newsletter"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="What is this campaign about?"
              className="w-full resize-y rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Channel
              </label>
              <select
                value={form.channel}
                onChange={(e) => update("channel", e.target.value)}
                className={inputClass}
              >
                <option>Email</option>
                <option>WhatsApp</option>
                <option>SMS</option>
                <option>Social</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className={inputClass}
              >
                {["Draft", "Active", "Scheduled", "Sent", "Paused"].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Campaign date
              </label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Campaign owner
              </label>
              <select
                value={form.owner}
                onChange={(e) => update("owner", e.target.value)}
                className={inputClass}
              >
                {["Anjum", "Sonam", "Pawan", "Shanu"].map((owner) => (
                  <option key={owner}>{owner}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Target contacts
              </label>
              <input
                type="number"
                min="0"
                value={form.contacts}
                onChange={(e) => update("contacts", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Budget (₹)
              </label>
              <input
                type="number"
                min="0"
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" primary>
              <Check size={16} />
              {campaign ? "Save changes" : "Create campaign"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CampaignDetails({ campaign, onClose, onEdit }) {
  if (!campaign) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Megaphone size={21} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{campaign.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{campaign.channel} campaign</p>
              <div className="mt-2">
                <StatusBadge status={campaign.status} />
              </div>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close details" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <p className="text-sm leading-6 text-slate-600">
            {campaign.description || "No campaign description has been provided."}
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              ["Target contacts", formatNumber(campaign.contacts)],
              ["Reach", formatNumber(campaign.reach)],
              ["Qualified leads", formatNumber(campaign.leads)],
              ["Budget", formatCurrency(campaign.budget)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-1.5 text-lg font-bold text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              <p className="text-xs text-slate-400">Campaign owner</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">{campaign.owner}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Campaign date</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">{formatDate(campaign.date)}</p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button onClick={onClose}>Close</Button>
            <Button primary onClick={() => onEdit(campaign)}>
              <Pencil size={15} /> Edit campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [tasks, setTasks] = useState(TASKS);
  const [activity, setActivity] = useState(INITIAL_ACTIVITY);
  const [range, setRange] = useState("30 days");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [channelFilter, setChannelFilter] = useState("All channels");
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState("date-desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [detailCampaign, setDetailCampaign] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [toast, setToast] = useState("");

  const notify = (message) => setToast(message);

  const filtered = useMemo(() => {
    let result = [...campaigns];

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter((campaign) =>
        [
          campaign.name,
          campaign.channel,
          campaign.status,
          campaign.owner,
          campaign.description,
        ].some((value) => String(value || "").toLowerCase().includes(query))
      );
    }

    if (statusFilter !== "All statuses") {
      result = result.filter((campaign) => campaign.status === statusFilter);
    }

    if (channelFilter !== "All channels") {
      result = result.filter((campaign) => campaign.channel === channelFilter);
    }

    result.sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "contacts-desc") return b.contacts - a.contacts;
      if (sort === "date-asc") return a.date.localeCompare(b.date);
      return b.date.localeCompare(a.date);
    });

    return result;
  }, [campaigns, search, statusFilter, channelFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleCampaigns = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.status === "Active"
  ).length;

  const totalReach = campaigns.reduce(
    (sum, campaign) => sum + Number(campaign.reach || 0),
    0
  );

  const qualifiedLeads = campaigns.reduce(
    (sum, campaign) => sum + Number(campaign.leads || 0),
    0
  );

  const totalSpend = campaigns.reduce(
    (sum, campaign) => sum + Number(campaign.budget || 0),
    0
  );

  const costPerLead = qualifiedLeads
    ? Math.round(totalSpend / qualifiedLeads)
    : 0;

  const resetPage = () => setPage(1);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All statuses");
    setChannelFilter("All channels");
    setSort("date-desc");
    resetPage();
  };

  const saveCampaign = (campaign) => {
    const isEditing = campaigns.some((item) => item.id === campaign.id);

    setCampaigns((current) =>
      isEditing
        ? current.map((item) => (item.id === campaign.id ? campaign : item))
        : [campaign, ...current]
    );

    setActivity((current) => [
      {
        id: Date.now(),
        initials: "AD",
        color: "bg-blue-100 text-blue-700",
        title: isEditing
          ? `Updated campaign: ${campaign.name}`
          : `Created campaign: ${campaign.name}`,
        time: "Just now",
      },
      ...current,
    ]);

    setModalOpen(false);
    setEditingCampaign(null);
    setDetailCampaign(null);
    resetPage();
    notify(isEditing ? "Campaign updated successfully." : "Campaign created successfully.");
  };

  const editCampaign = (campaign) => {
    setDetailCampaign(null);
    setEditingCampaign(campaign);
    setModalOpen(true);
    setMenuId(null);
  };

  const deleteCampaign = (campaign) => {
    if (!window.confirm(`Delete "${campaign.name}"? This action cannot be undone.`)) {
      return;
    }

    setCampaigns((current) =>
      current.filter((item) => item.id !== campaign.id)
    );
    setMenuId(null);
    setDetailCampaign(null);
    notify("Campaign deleted.");
    resetPage();
  };

  const exportCSV = () => {
    const headers = [
      "Campaign",
      "Channel",
      "Date",
      "Status",
      "Contacts",
      "Owner",
      "Budget",
      "Reach",
      "Qualified Leads",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [
      headers.map(escapeCSV).join(","),
      ...filtered.map((campaign) =>
        [
          campaign.name,
          campaign.channel,
          campaign.date,
          campaign.status,
          campaign.contacts,
          campaign.owner,
          campaign.budget,
          campaign.reach,
          campaign.leads,
        ].map(escapeCSV).join(",")
      ),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "campaigns-export.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    notify("Campaign report exported successfully.");
  };

  const completedTasks = TASKS.length - tasks.length;

  return (
    <div
      className="min-h-full bg-[#f4f6fb] text-slate-900"
      onClick={() => {
        if (menuId !== null) setMenuId(null);
      }}
    >
      <main className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 ring-1 ring-blue-200/70">
              <Megaphone size={24} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Campaign dashboard
                </h1>
                <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  Marketing
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-6 text-slate-500 sm:text-base">
                Monitor campaign performance, reach, and lead contribution.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button onClick={exportCSV}>
              <Download size={16} />
              Export report
            </Button>
            <Button
              primary
              onClick={() => {
                setEditingCampaign(null);
                setModalOpen(true);
              }}
            >
              <Plus size={18} />
              New campaign
            </Button>
          </div>
        </section>

        {toast && (
          <div
            role="status"
            className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} />
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

        {/* KPI cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Active campaigns"
            value={formatNumber(activeCampaigns)}
            icon={Megaphone}
            iconStyle="bg-blue-50 text-blue-600"
            change="+3 this month"
            subtitle="vs. previous month"
          />
          <MetricCard
            title="Total reach"
            value={totalReach >= 1000 ? `${(totalReach / 1000).toFixed(1)}K` : formatNumber(totalReach)}
            icon={Users}
            iconStyle="bg-violet-50 text-violet-600"
            change="+14.1%"
            subtitle="audience reached"
          />
          <MetricCard
            title="Qualified leads"
            value={formatNumber(qualifiedLeads)}
            icon={Target}
            iconStyle="bg-emerald-50 text-emerald-600"
            change="+9.7%"
            subtitle="lead contribution"
          />
          <MetricCard
            title="Cost per lead"
            value={formatCurrency(costPerLead)}
            icon={Wallet}
            iconStyle="bg-amber-50 text-amber-600"
            change="Budget overview"
            positive
            subtitle="based on sample data"
          />
        </section>

        {/* Performance and task queue */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.65fr_1fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <BarChart3 size={19} />
                  </div>
                  <h2 className="text-base font-bold text-slate-900">
                    Performance trend
                  </h2>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Engagement activity across your campaigns.
                </p>
              </div>

              <label className="relative inline-flex self-start sm:self-auto">
                <span className="sr-only">Performance date range</span>
                <select
                  value={range}
                  onChange={(event) => setRange(event.target.value)}
                  className="h-10 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-slate-600 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                >
                  <option value="7 days">Last 7 days</option>
                  <option value="30 days">Last 30 days</option>
                  <option value="90 days">Last 90 days</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </label>
            </div>

            <PerformanceChart range={range} />
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <CheckCircle2 size={19} />
                  </div>
                  <h2 className="text-base font-bold text-slate-900">
                    My work queue
                  </h2>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Tasks that need your attention.
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                {tasks.length} left
              </span>
            </div>

            <div className="mt-5 space-y-1">
              {TASKS.map((task) => {
                const isComplete = !tasks.some((item) => item.id === task.id);

                return (
                  <label
                    key={task.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl p-3 transition hover:bg-slate-50 ${
                      isComplete ? "opacity-60" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isComplete}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setTasks((current) =>
                            current.filter((item) => item.id !== task.id)
                          );
                          notify(`Completed: ${task.title}`);
                        } else {
                          setTasks((current) => [...current, task]);
                        }
                      }}
                      className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 accent-blue-600"
                    />

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-sm font-medium ${
                          isComplete
                            ? "text-slate-400 line-through"
                            : "text-slate-700"
                        }`}
                      >
                        {task.title}
                      </span>
                      <span className="mt-1.5 block text-xs text-slate-400">
                        Assigned to {task.owner}
                      </span>
                    </span>

                    <span
                      className={`mt-0.5 shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold ${
                        task.priority === "High"
                          ? "bg-rose-50 text-rose-600"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs text-slate-500">
                {completedTasks + (TASKS.length - tasks.length - completedTasks)} tasks completed this session
              </span>
              <span className="text-xs font-semibold text-blue-600">
                {tasks.length === 0 ? "All caught up!" : "Keep it moving"}
              </span>
            </div>
          </article>
        </section>

        {/* Recent activity */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Activity size={19} />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  Recent activity
                </h2>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                The latest updates from your marketing team.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <Clock3 size={14} />
              Latest updates
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {activity.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-xl border border-slate-100 p-4 transition hover:border-slate-200 hover:bg-slate-50/70"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${item.color}`}
                >
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-5 text-slate-700">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-xs text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Campaign list */}
        <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                All campaigns
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Search and manage your campaign records.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={exportCSV}>
                <Download size={15} />
                Export CSV
              </Button>
              <Button
                primary
                onClick={() => {
                  setEditingCampaign(null);
                  setModalOpen(true);
                }}
              >
                <Plus size={16} />
                New campaign
              </Button>
            </div>
          </div>

          <div className="space-y-4 border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    resetPage();
                  }}
                  placeholder="Search by campaign name, channel, owner..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="relative inline-flex">
                  <span className="sr-only">Filter by status</span>
                  <select
                    value={statusFilter}
                    onChange={(event) => {
                      setStatusFilter(event.target.value);
                      resetPage();
                    }}
                    className="h-11 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-slate-600 outline-none focus:border-blue-400"
                  >
                    {["All statuses", "Active", "Draft", "Scheduled", "Sent", "Paused"].map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </label>

                <label className="relative inline-flex">
                  <span className="sr-only">Filter by channel</span>
                  <select
                    value={channelFilter}
                    onChange={(event) => {
                      setChannelFilter(event.target.value);
                      resetPage();
                    }}
                    className="h-11 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-slate-600 outline-none focus:border-blue-400"
                  >
                    {["All channels", "Email", "WhatsApp", "SMS", "Social"].map((channel) => (
                      <option key={channel}>{channel}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </label>

                <label className="relative inline-flex">
                  <span className="sr-only">Sort campaigns</span>
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="h-11 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-slate-600 outline-none focus:border-blue-400"
                  >
                    <option value="date-desc">Newest first</option>
                    <option value="date-asc">Oldest first</option>
                    <option value="name-asc">Name A–Z</option>
                    <option value="contacts-desc">Most contacts</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </label>

                {(search || statusFilter !== "All statuses" || channelFilter !== "All channels") && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    <X size={14} />
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Campaign
                  </th>
                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Channel
                  </th>
                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Date
                  </th>
                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Contacts
                  </th>
                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Owner
                  </th>
                  <th className="px-5 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {visibleCampaigns.map((campaign, index) => (
                  <tr
                    key={campaign.id}
                    className="group transition hover:bg-blue-50/30"
                  >
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => setDetailCampaign(campaign)}
                        className="flex items-center gap-3 text-left"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            AVATAR_STYLES[index % AVATAR_STYLES.length]
                          }`}
                        >
                          {campaign.channel === "Email" ? (
                            <Mail size={18} />
                          ) : (
                            <Send size={18} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">
                            {campaign.name}
                          </p>
                          <p className="mt-1 max-w-64 truncate text-xs text-slate-400">
                            {campaign.description}
                          </p>
                        </div>
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 text-sm text-slate-600">
                        {campaign.channel === "Email" ? (
                          <Mail size={15} className="text-slate-400" />
                        ) : (
                          <Send size={15} className="text-slate-400" />
                        )}
                        {campaign.channel}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                      {formatDate(campaign.date)}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={campaign.status} />
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                      {campaign.contacts ? formatNumber(campaign.contacts) : "—"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${
                            AVATAR_STYLES[
                              ["Anjum", "Sonam", "Pawan", "Shanu"].indexOf(
                                campaign.owner
                              ) % AVATAR_STYLES.length
                            ]
                          }`}
                        >
                          {campaign.owner.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm text-slate-600">{campaign.owner}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div
                        className="relative inline-flex"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          type="button"
                          aria-label={`Actions for ${campaign.name}`}
                          aria-expanded={menuId === campaign.id}
                          onClick={() =>
                            setMenuId((current) =>
                              current === campaign.id ? null : campaign.id
                            )
                          }
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-800 hover:shadow-sm"
                        >
                          <MoreHorizontal size={19} />
                        </button>

                        {menuId === campaign.id && (
                          <div className="absolute right-0 top-full z-30 mt-1 w-44 rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl">
                            <button
                              type="button"
                              onClick={() => {
                                setDetailCampaign(campaign);
                                setMenuId(null);
                              }}
                              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                            >
                              <Eye size={15} /> View details
                            </button>
                            <button
                              type="button"
                              onClick={() => editCampaign(campaign)}
                              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                            >
                              <Pencil size={15} /> Edit campaign
                            </button>
                            <div className="my-1 border-t border-slate-100" />
                            <button
                              type="button"
                              onClick={() => deleteCampaign(campaign)}
                              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50"
                            >
                              <Trash2 size={15} /> Delete campaign
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {visibleCampaigns.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Search size={22} />
                      </div>
                      <h3 className="mt-4 text-sm font-bold text-slate-800">
                        No campaigns found
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Try another search term or clear your filters.
                      </p>
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Clear filters
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
                  {filtered.length ? (currentPage - 1) * pageSize + 1 : 0}–
                  {Math.min(currentPage * pageSize, filtered.length)}
                </strong>{" "}
                of{" "}
                <strong className="font-semibold text-slate-700">
                  {filtered.length}
                </strong>{" "}
                campaigns
              </span>

              <label className="flex items-center gap-2">
                Rows
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
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter(
                  (number) =>
                    number === 1 ||
                    number === totalPages ||
                    Math.abs(number - currentPage) <= 1
                )
                .reduce((result, number, index, items) => {
                  if (index > 0 && number - items[index - 1] > 1) {
                    result.push(`ellipsis-${number}`);
                  }
                  result.push(number);
                  return result;
                }, [])
                .map((item) =>
                  typeof item === "string" ? (
                    <span key={item} className="px-1 text-sm text-slate-400">
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
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-2 pb-3 text-xs text-slate-400 sm:flex-row sm:items-center">
          <span>Marketing workspace / Campaign dashboard</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Campaign workspace ready
          </span>
        </footer>
      </main>

      {modalOpen && (
        <CampaignModal
          key={editingCampaign?.id ?? "new-campaign"}
          campaign={editingCampaign}
          onClose={() => {
            setModalOpen(false);
            setEditingCampaign(null);
          }}
          onSave={saveCampaign}
        />
      )}

      {detailCampaign && (
        <CampaignDetails
          campaign={detailCampaign}
          onClose={() => setDetailCampaign(null)}
          onEdit={editCampaign}
        />
      )}
    </div>
  );
}
