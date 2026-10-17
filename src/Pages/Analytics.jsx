
import React, { useMemo, useState } from "react";
import {
  BarChart3,
  Users,
  UserCheck,
  MousePointerClick,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Download,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Target,
  Search,
  X,
  Check,
  RotateCcw,
} from "lucide-react";

const DAY = 86400000;

const pad = (n) => String(n).padStart(2, "0");

const toISO = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const parseDate = (value) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date, amount) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

const formatDate = (date) =>
  date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatMonth = (date) =>
  date.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

const formatMoney = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN").format(value);

const today = startOfDay(new Date());

const initialRange = {
  start: toISO(addDays(today, -6)),
  end: toISO(today),
};

const channels = [
  {
    name: "Organic Search",
    visitors: 4820,
    leads: 530,
    customers: 58,
    spend: 0,
    color: "bg-blue-600",
  },
  {
    name: "Paid Advertising",
    visitors: 3650,
    leads: 365,
    customers: 37,
    spend: 42000,
    color: "bg-violet-500",
  },
  {
    name: "Social Media",
    visitors: 2380,
    leads: 214,
    customers: 19,
    spend: 14500,
    color: "bg-sky-500",
  },
  {
    name: "Email Marketing",
    visitors: 1550,
    leads: 131,
    customers: 10,
    spend: 7500,
    color: "bg-emerald-500",
  },
];

const monthNames = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

function MetricCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  iconColor,
  iconBg,
  subtitle,
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-3 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {value}
          </h3>
        </div>

        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon size={21} className={iconColor} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
          positive
            ? "bg-emerald-50 text-emerald-700"
            : "bg-rose-50 text-rose-700"
        }`}>
          {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {change}
        </span>
        <span className="text-xs text-slate-400">{subtitle}</span>
      </div>
    </div>
  );
}

function CalendarPicker({
  value,
  onApply,
  onClose,
}) {
  const [month, setMonth] = useState(() => {
    const initial = parseDate(value.start);
    return new Date(initial.getFullYear(), initial.getMonth(), 1);
  });

  const [start, setStart] = useState(value.start);
  const [end, setEnd] = useState(value.end);
  const [choosingEnd, setChoosingEnd] = useState(false);

  const firstDay = new Date(
    month.getFullYear(),
    month.getMonth(),
    1
  ).getDay();

  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate();

  const calendarCells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const monthStart = toISO(
    new Date(month.getFullYear(), month.getMonth(), 1)
  );

  const monthEnd = toISO(
    new Date(month.getFullYear(), month.getMonth(), daysInMonth)
  );

  const previousMonth = () =>
    setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));

  const nextMonth = () =>
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));

  const chooseDate = (dateString) => {
    if (!choosingEnd) {
      setStart(dateString);
      setEnd("");
      setChoosingEnd(true);
      return;
    }

    if (dateString < start) {
      setStart(dateString);
      setEnd("");
      setChoosingEnd(true);
      return;
    }

    setEnd(dateString);
    setChoosingEnd(false);
  };

  const selectPreset = (preset) => {
    const endDate = today;
    let startDate;

    if (preset === "today") {
      startDate = today;
    } else if (preset === "yesterday") {
      startDate = addDays(today, -1);
    } else if (preset === "week") {
      startDate = addDays(today, -6);
    } else if (preset === "month") {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (preset === "lastmonth") {
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
      setStart(toISO(startDate));
      setEnd(toISO(lastDay));
      setMonth(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
      setChoosingEnd(false);
      return;
    } else {
      startDate = addDays(today, -29);
    }

    setStart(toISO(startDate));
    setEnd(toISO(endDate));
    setMonth(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
    setChoosingEnd(false);
  };

  const isInRange = (dateString) =>
    Boolean(start && end && dateString >= start && dateString <= end);

  const canApply = Boolean(start && end && start <= end);

  return (
    <div className="absolute right-0 top-full z-50 mt-3 w-[min(94vw,680px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr]">
        {/* Presets */}
        <aside className="border-b border-slate-100 bg-slate-50/80 p-4 sm:border-b-0 sm:border-r">
          <p className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            Quick select
          </p>

          {[
            ["today", "Today"],
            ["yesterday", "Yesterday"],
            ["week", "Last 7 days"],
            ["30days", "Last 30 days"],
            ["month", "This month"],
            ["lastmonth", "Last month"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => selectPreset(key)}
              className="mb-1 w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              {label}
            </button>
          ))}
        </aside>

        {/* Full month calendar */}
        <div className="min-w-0 p-4 sm:p-5">
          <div className="mb-5 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={previousMonth}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900">
                {formatMonth(month)}
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">
                Select start and end dates
              </p>
            </div>

            <button
              type="button"
              onClick={nextMonth}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-semibold text-slate-400"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {calendarCells.map((day, index) => {
              if (!day) {
                return <div key={`blank-${index}`} />;
              }

              const date = new Date(
                month.getFullYear(),
                month.getMonth(),
                day
              );

              const iso = toISO(date);
              const disabled = iso > toISO(today);
              const isStart = iso === start;
              const isEnd = iso === end;
              const inRange = isInRange(iso);
              const isToday = iso === toISO(today);

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => chooseDate(iso)}
                  className={[
                    "relative mx-auto flex h-9 w-9 items-center justify-center rounded-lg text-sm transition sm:h-10 sm:w-10",
                    isStart || isEnd
                      ? "bg-blue-600 font-semibold text-white shadow-sm"
                      : inRange
                        ? "rounded-none bg-blue-50 font-medium text-blue-700"
                        : "text-slate-700 hover:bg-slate-100",
                    isToday && !isStart && !isEnd
                      ? "ring-1 ring-inset ring-blue-500"
                      : "",
                    disabled
                      ? "cursor-not-allowed text-slate-300 hover:bg-transparent"
                      : "",
                  ].join(" ")}
                  aria-label={formatDate(date)}
                  aria-pressed={isStart || isEnd}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Start date
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                  {start ? formatDate(parseDate(start)) : "Select date"}
                </p>
              </div>

              <div className="min-w-0 border-l border-slate-200 pl-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  End date
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                  {end ? formatDate(parseDate(end)) : "Select date"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!canApply}
              onClick={() => {
                onApply({ start, end });
                onClose();
              }}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Check size={16} />
              Apply range
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversionChart({ labels, values }) {
  const max = Math.max(...values, 1);

  return (
    <div className="mt-7">
      <div className="relative h-60 sm:h-64">
        <div className="absolute inset-0 flex flex-col justify-between">
          {[100, 75, 50, 25, 0].map((tick) => (
            <div key={tick} className="flex items-center gap-3">
              <span className="w-7 text-right text-[11px] text-slate-400">
                {tick}
              </span>
              <div className="h-px flex-1 border-t border-dashed border-slate-200" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 ml-10 flex items-end justify-around gap-2 pb-1">
          {values.map((value, index) => (
            <div
              key={`${labels[index]}-${index}`}
              className="group relative flex h-full flex-1 flex-col items-center justify-end"
            >
              <div className="pointer-events-none absolute bottom-0 z-10 mb-2 hidden -translate-y-2 rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
                {value} conversions
              </div>

              <div
                title={`${labels[index]}: ${value} conversions`}
                className="w-full max-w-10 rounded-t-md bg-blue-500 transition-colors hover:bg-blue-700"
                style={{
                  height: `${Math.max((value / max) * 82, 4)}%`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="ml-10 mt-3 flex justify-around gap-2">
        {labels.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="min-w-0 flex-1 truncate text-center text-[10px] text-slate-500 sm:text-[11px]"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function FunnelRow({ label, value, total, color, isFirst }) {
  const percentage = total ? (value / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-slate-600">{label}</span>
        <div className="text-right">
          <span className="font-semibold text-slate-900">
            {formatNumber(value)}
          </span>
          {!isFirst && (
            <span className="ml-2 text-xs text-slate-400">
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${Math.max(percentage, 2)}%` }}
        />
      </div>
    </div>
  );
}

export default function Analytics() {
  const [dateRange, setDateRange] = useState(initialRange);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [channelFilter, setChannelFilter] = useState("All channels");
  const [exportMessage, setExportMessage] = useState("");

  const rangeDays = Math.max(
    1,
    Math.round(
      (parseDate(dateRange.end) - parseDate(dateRange.start)) / DAY
    ) + 1
  );

  const displayRange = `${formatDate(parseDate(dateRange.start))} – ${formatDate(parseDate(dateRange.end))}`;

  // Demo figures are scaled for the selected number of days.
  // Replace this calculation with API response data when your backend is ready.
  const factor = rangeDays / 30;

  const data = useMemo(() => {
    const visitors = Math.round(12400 * factor);
    const leads = Math.round(1240 * factor);
    const qualified = Math.round(496 * factor);
    const customers = Math.round(124 * factor);
    const revenue = Math.round(248000 * factor);
    const spend = Math.round(64000 * factor);

    const points = Math.min(10, rangeDays);
    const labels = [];
    const values = [];

    for (let i = 0; i < points; i++) {
      const offset = points === 1
        ? 0
        : Math.round((i * (rangeDays - 1)) / (points - 1));

      const date = addDays(parseDate(dateRange.start), offset);
      labels.push(
        rangeDays <= 7
          ? date.toLocaleDateString("en-IN", { weekday: "short" })
          : date.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })
      );

      values.push(
        Math.max(
          1,
          Math.round(
            [45, 62, 55, 78, 69, 94, 85, 112, 91, 121][i] *
              Math.max(factor, 0.15)
          )
        )
      );
    }

    return {
      visitors,
      leads,
      qualified,
      customers,
      revenue,
      spend,
      labels,
      trend: values,
    };
  }, [factor, dateRange.start, dateRange.end, rangeDays]);

  const conversionRate = data.visitors
    ? ((data.customers / data.visitors) * 100).toFixed(1)
    : "0.0";

  const leadRate = data.visitors
    ? ((data.leads / data.visitors) * 100).toFixed(1)
    : "0.0";

  const roi = data.spend
    ? (((data.revenue - data.spend) / data.spend) * 100).toFixed(0)
    : "0";

  const filteredChannels = useMemo(() => {
    return channels
      .map((channel) => ({
        ...channel,
        visitors: Math.round(channel.visitors * factor),
        leads: Math.round(channel.leads * factor),
        customers: Math.round(channel.customers * factor),
        spend: Math.round(channel.spend * factor),
      }))
      .filter((channel) => {
        const matchesSearch = channel.name
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesFilter =
          channelFilter === "All channels" ||
          channel.name === channelFilter;

        return matchesSearch && matchesFilter;
      });
  }, [search, channelFilter, factor]);

  const exportCSV = () => {
    const rows = [
      ["Marketing Analytics Report"],
      ["Start date", dateRange.start],
      ["End date", dateRange.end],
      ["Selected days", rangeDays],
      [],
      ["Metric", "Value"],
      ["Visitors", data.visitors],
      ["Leads", data.leads],
      ["Qualified leads", data.qualified],
      ["Customers", data.customers],
      ["Revenue (INR)", data.revenue],
      ["Marketing spend (INR)", data.spend],
      ["Lead conversion rate", `${leadRate}%`],
      ["Customer conversion rate", `${conversionRate}%`],
      [],
      ["Channel", "Visitors", "Leads", "Customers", "Spend (INR)"],
      ...filteredChannels.map((channel) => [
        channel.name,
        channel.visitors,
        channel.leads,
        channel.customers,
        channel.spend,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `marketing-analytics-${dateRange.start}-to-${dateRange.end}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setExportMessage("CSV report downloaded successfully.");
  };

  const resetRange = () => {
    setDateRange(initialRange);
    setCalendarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-900">
      <main className="mx-auto max-w-[1600px] space-y-7 px-4 py-7 sm:px-6 lg:px-8">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <BarChart3 size={26} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Marketing Analytics
                </h1>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Overview
                </span>
              </div>

              <p className="mt-1.5 text-sm text-slate-500 sm:text-base">
                Track campaign performance, conversions and marketing ROI.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Calendar trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCalendarOpen((open) => !open)}
                aria-expanded={calendarOpen}
                className={`inline-flex min-h-11 max-w-full items-center gap-2 rounded-xl border bg-white px-3 py-2.5 text-left text-sm font-medium shadow-sm transition sm:px-4 ${
                  calendarOpen
                    ? "border-blue-400 ring-4 ring-blue-100"
                    : "border-slate-200 hover:border-blue-300"
                }`}
              >
                <CalendarDays size={17} className="shrink-0 text-blue-600" />

                <span className="max-w-48 truncate text-slate-700">
                  {displayRange}
                </span>

                <ChevronDown
                  size={16}
                  className={`shrink-0 text-slate-500 transition-transform ${
                    calendarOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {calendarOpen && (
                <CalendarPicker
                  value={dateRange}
                  onApply={setDateRange}
                  onClose={() => setCalendarOpen(false)}
                />
              )}
            </div>

            <button
              type="button"
              onClick={resetRange}
              title="Reset to last 7 days"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <RotateCcw size={15} />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <Download size={17} />
              Export
            </button>
          </div>
        </section>

        {exportMessage && (
          <div
            role="status"
            className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            {exportMessage}
            <button
              type="button"
              onClick={() => setExportMessage("")}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* KPI cards */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-bold text-slate-800">
              Performance overview
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
              {rangeDays} {rangeDays === 1 ? "day" : "days"} selected
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total visitors"
              value={formatNumber(data.visitors)}
              change="+12.8%"
              positive
              icon={Users}
              iconColor="text-blue-600"
              iconBg="bg-blue-50"
              subtitle="vs. previous period"
            />

            <MetricCard
              title="Total leads"
              value={formatNumber(data.leads)}
              change="+8.4%"
              positive
              icon={MousePointerClick}
              iconColor="text-violet-600"
              iconBg="bg-violet-50"
              subtitle={`${leadRate}% visitor-to-lead`}
            />

            <MetricCard
              title="New customers"
              value={formatNumber(data.customers)}
              change="+6.2%"
              positive
              icon={UserCheck}
              iconColor="text-emerald-600"
              iconBg="bg-emerald-50"
              subtitle={`${conversionRate}% conversion rate`}
            />

            <MetricCard
              title="Marketing revenue"
              value={formatMoney(data.revenue)}
              change="+14.6%"
              positive
              icon={IndianRupee}
              iconColor="text-amber-600"
              iconBg="bg-amber-50"
              subtitle={`ROI: ${roi}%`}
            />
          </div>
        </section>

        {/* Chart and conversion funnel */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Conversion trend
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {displayRange}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
                Conversions
              </div>
            </div>

            <ConversionChart
              labels={data.labels}
              values={data.trend}
            />

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span>
                <span className="font-semibold text-slate-800">
                  {formatNumber(data.customers)}
                </span>{" "}
                customers acquired
              </span>
              <span>
                <span className="font-semibold text-slate-800">
                  {conversionRate}%
                </span>{" "}
                visitor-to-customer rate
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Conversion funnel
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  From first visit to customer
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Target size={20} />
              </div>
            </div>

            <div className="mt-7 space-y-6">
              <FunnelRow
                label="Visitors"
                value={data.visitors}
                total={data.visitors}
                color="bg-blue-600"
                isFirst
              />

              <FunnelRow
                label="Leads"
                value={data.leads}
                total={data.visitors}
                color="bg-blue-500"
              />

              <FunnelRow
                label="Qualified leads"
                value={data.qualified}
                total={data.visitors}
                color="bg-indigo-500"
              />

              <FunnelRow
                label="Customers"
                value={data.customers}
                total={data.visitors}
                color="bg-emerald-500"
              />
            </div>

            <div className="mt-7 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-600">
                Overall conversion rate
              </p>

              <div className="mt-2 flex items-end justify-between gap-2">
                <p className="text-2xl font-bold text-slate-900">
                  {conversionRate}%
                </p>
                <span className="text-xs text-slate-500">
                  Visitors to customers
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${conversionRate}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Channel performance */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Channel performance
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Compare visitors, leads and customer acquisition by source.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search channels..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 sm:w-48"
                />
              </div>

              <select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-400"
                aria-label="Filter marketing channels"
              >
                <option>All channels</option>
                {channels.map((channel) => (
                  <option key={channel.name}>{channel.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Channel</th>
                  <th className="px-6 py-4 font-semibold">Visitors</th>
                  <th className="px-6 py-4 font-semibold">Leads</th>
                  <th className="px-6 py-4 font-semibold">Customers</th>
                  <th className="px-6 py-4 font-semibold">Lead rate</th>
                  <th className="px-6 py-4 text-right font-semibold">Spend</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredChannels.map((channel) => (
                  <tr
                    key={channel.name}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${channel.color}`} />
                        <span className="font-semibold text-slate-800">
                          {channel.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {formatNumber(channel.visitors)}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {formatNumber(channel.leads)}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {formatNumber(channel.customers)}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        {channel.visitors
                          ? ((channel.leads / channel.visitors) * 100).toFixed(1)
                          : "0.0"}%
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-slate-700">
                      {formatMoney(channel.spend)}
                    </td>
                  </tr>
                ))}

                {filteredChannels.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      No marketing channels match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-6 py-4 text-xs text-slate-400 sm:flex-row">
            <span>
              Showing {filteredChannels.length} marketing channels
            </span>
            <span>
              {displayRange} · Sample data for UI demonstration
            </span>
          </div>
        </section>

        <footer className="pb-2 text-center text-xs text-slate-400">
          Marketing Analytics · Performance and attribution overview
        </footer>
      </main>
    </div>
  );
}
