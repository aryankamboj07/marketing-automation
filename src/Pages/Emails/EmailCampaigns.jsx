
import React, { useState } from "react";

const EmailCampaigns = () => {
  const [form, setForm] = useState({
    name: "",
    fromName: "",
    fromEmail: "",
    subject: "",
    preheader: "",
    template: "",
    message: "",
    status: "Draft",
    priority: "Normal",
    team: "Marketing",
    visibility: "Team",
  });

  const [checks, setChecks] = useState({
    duplicate: false,
    consent: false,
  });

  const [notice, setNotice] = useState("");
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
    setNotice("");
  };

  const requiredComplete =
    form.name.trim() &&
    form.fromName.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.fromEmail) &&
    form.subject.trim();

  const completed =
    Number(Boolean(requiredComplete)) +
    Number(checks.duplicate) +
    Number(checks.consent);

  const saveCampaign = (e) => {
    e.preventDefault();

    if (!requiredComplete) {
      setNotice("Please complete all required fields with a valid sender email.");
      return;
    }

    try {
      localStorage.setItem(
        "growthos-campaign",
        JSON.stringify(form)
      );
      setSaved(true);
      setNotice("Campaign saved successfully in this browser.");
    } catch {
      setNotice("Unable to save campaign in this browser.");
    }
  };

  const saveTemplate = () => {
    if (!form.name.trim()) {
      setNotice("Please enter a campaign name first.");
      return;
    }

    try {
      localStorage.setItem(
        "growthos-email-template",
        JSON.stringify(form)
      );
      setNotice("Template saved successfully in this browser.");
    } catch {
      setNotice("Unable to save template.");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      fromName: "",
      fromEmail: "",
      subject: "",
      preheader: "",
      template: "",
      message: "",
      status: "Draft",
      priority: "Normal",
      team: "Marketing",
      visibility: "Team",
    });

    setChecks({ duplicate: false, consent: false });
    setNotice("");
    setSaved(false);
  };

  const prepareTest = () => {
    if (!form.fromEmail || !form.subject) {
      setNotice("Enter a valid sender email and subject first.");
      return;
    }

    setNotice(
      "Test email is prepared. Connect an email provider to send it."
    );
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    * { box-sizing: border-box; }

    .campaign-page {
      width: 100%;
      min-height: 100vh;
      background: #f4f6fb;
      padding: 32px;
      color: #1b2942;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 13px;
    }

    .campaign-container {
      width: 100%;
      max-width: 1450px;
      margin: 0 auto;
    }

    .campaign-breadcrumb {
      display: flex;
      gap: 9px;
      align-items: center;
      color: #8794aa;
      font-size: 12px;
      margin-bottom: 14px;
    }

    .campaign-breadcrumb span:last-child {
      color: #3868e5;
      font-weight: 600;
    }

    .campaign-heading {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 28px;
    }

    .campaign-title {
      margin: 0 0 9px;
      color: #182641;
      font-size: 29px;
      line-height: 1.25;
      letter-spacing: -1px;
      font-weight: 800;
    }

    .campaign-subtitle {
      color: #8190a8;
      margin: 0;
      line-height: 1.7;
      font-size: 13px;
    }

    .campaign-btn {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      padding: 11px 16px;
      border: 1px solid #dce4f0;
      border-radius: 8px;
      background: #fff;
      color: #45536c;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: .2s;
    }

    .campaign-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 5px 15px #1826410b;
    }

    .campaign-btn-primary {
      background: #3868e5;
      border-color: #3868e5;
      color: #fff;
    }

    .campaign-btn-primary:hover {
      background: #2857d4;
    }

    .campaign-stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
      margin-bottom: 26px;
    }

    .campaign-stat {
      background: #fff;
      border: 1px solid #e1e8f2;
      border-radius: 12px;
      padding: 21px;
      box-shadow: 0 2px 7px #253b5e05;
    }

    .campaign-stat-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #7c8aa1;
      font-size: 12px;
      margin-bottom: 14px;
    }

    .campaign-stat-icon {
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      border-radius: 9px;
      background: #eef3ff;
      color: #3868e5;
      font-size: 17px;
    }

    .campaign-stat-value {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -.7px;
      color: #192641;
    }

    .campaign-stat-caption {
      color: #8a97ad;
      font-size: 11px;
      margin-top: 8px;
    }

    .campaign-positive {
      color: #15966b;
      font-weight: 700;
    }

    .campaign-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.8fr) minmax(275px, .95fr);
      align-items: start;
      gap: 20px;
    }

    .campaign-card {
      min-width: 0;
      background: #fff;
      border: 1px solid #e0e7f2;
      border-radius: 14px;
      padding: 25px;
      box-shadow: 0 2px 8px #253b5e04;
    }

    .campaign-card-heading {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 25px;
    }

    .campaign-card-title {
      margin: 0;
      color: #1c2942;
      font-size: 15px;
      font-weight: 750;
    }

    .campaign-card-description {
      color: #8a97ac;
      font-size: 11px;
      line-height: 1.7;
      margin-top: 6px;
    }

    .campaign-card-icon {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      border-radius: 9px;
      display: grid;
      place-items: center;
      color: #3868e5;
      background: #eef3ff;
      font-size: 17px;
    }

    .campaign-fields {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 22px 20px;
    }

    .campaign-field {
      display: flex;
      flex-direction: column;
      gap: 9px;
      min-width: 0;
    }

    .campaign-field-full {
      grid-column: 1 / -1;
    }

    .campaign-label {
      color: #52617b;
      font-size: 11px;
      font-weight: 650;
    }

    .campaign-required {
      color: #e05262;
    }

    .campaign-input,
    .campaign-select,
    .campaign-textarea {
      width: 100%;
      min-width: 0;
      border: 1px solid #dce4f0;
      border-radius: 7px;
      background: #fbfcff;
      color: #253550;
      padding: 12px;
      font: inherit;
      outline: none;
      transition: .2s;
    }

    .campaign-input,
    .campaign-select {
      height: 43px;
    }

    .campaign-input::placeholder,
    .campaign-textarea::placeholder {
      color: #a0acc0;
    }

    .campaign-input:focus,
    .campaign-select:focus,
    .campaign-textarea:focus {
      border-color: #5480ed;
      box-shadow: 0 0 0 3px #3868e516;
      background: #fff;
    }

    .campaign-textarea {
      min-height: 105px;
      resize: vertical;
      line-height: 1.7;
    }

    .campaign-hint {
      color: #98a3b5;
      font-size: 10px;
      line-height: 1.6;
    }

    .campaign-form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 14px;
      border-top: 1px solid #edf0f6;
      padding-top: 22px;
      margin-top: 28px;
    }

    .campaign-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
    }

    .campaign-right {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .campaign-setting-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 15px 0;
      border-bottom: 1px solid #edf0f6;
    }

    .campaign-setting-row:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }

    .campaign-setting-label {
      color: #74819a;
      font-size: 11px;
    }

    .campaign-setting-select {
      width: 52%;
      max-width: 145px;
      padding: 7px 6px;
      border: 1px solid transparent;
      border-radius: 6px;
      color: #293750;
      background: transparent;
      font: inherit;
      font-weight: 650;
      text-align: right;
      cursor: pointer;
      outline: none;
    }

    .campaign-setting-select:hover,
    .campaign-setting-select:focus {
      background: #f6f8fc;
      border-color: #e1e8f2;
    }

    .campaign-progress-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .campaign-progress-number {
      font-size: 11px;
      color: #75839a;
    }

    .campaign-progress-track {
      height: 5px;
      background: #edf0f6;
      border-radius: 10px;
      overflow: hidden;
      margin: 17px 0;
    }

    .campaign-progress-bar {
      height: 100%;
      background: #3868e5;
      border-radius: inherit;
      transition: width .25s;
    }

    .campaign-check {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 0;
      color: #63718a;
      font-size: 11px;
      line-height: 1.5;
      cursor: pointer;
    }

    .campaign-check input {
      width: 14px;
      height: 14px;
      margin: 2px 0 0;
      accent-color: #3868e5;
      flex-shrink: 0;
    }

    .campaign-check.checked span {
      color: #16956c;
    }

    .campaign-tip {
      padding: 14px;
      background: #f4f7ff;
      border: 1px solid #dfe8ff;
      border-radius: 9px;
      margin-top: 19px;
    }

    .campaign-tip-title {
      font-size: 11px;
      font-weight: 700;
      color: #3158b8;
      margin-bottom: 7px;
    }

    .campaign-tip p {
      font-size: 11px;
      color: #7685a1;
      line-height: 1.8;
      margin: 0;
    }

    .campaign-notice {
      margin-top: 20px;
      padding: 13px 16px;
      background: #eff9f4;
      border: 1px solid #caeedb;
      border-radius: 8px;
      color: #18764f;
      font-size: 12px;
      line-height: 1.6;
    }

    .campaign-notice.error {
      background: #fff3f3;
      border-color: #f4d3d7;
      color: #b93646;
    }

    .campaign-bottom {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 26px;
      color: #98a3b6;
      font-size: 10px;
    }

    .campaign-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: grid;
      place-items: center;
      padding: 20px;
      background: #101a32a8;
    }

    .campaign-modal {
      width: min(620px, 100%);
      max-height: 90vh;
      overflow-y: auto;
      padding: 25px;
      border-radius: 14px;
      background: #fff;
      box-shadow: 0 25px 90px #0003;
    }

    .campaign-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
    }

    .campaign-email-preview {
      padding: 23px;
      margin-top: 18px;
      border: 1px solid #e1e8f2;
      border-radius: 10px;
      line-height: 1.8;
      color: #596780;
      overflow-wrap: anywhere;
    }

    .campaign-email-banner {
      padding: 25px 16px;
      margin: 16px 0;
      text-align: center;
      border-radius: 8px;
      background: #14213d;
      color: white;
    }

    .campaign-email-banner h3 {
      margin: 0 0 10px;
      font-size: 22px;
    }

    @media (max-width: 1000px) {
      .campaign-page { padding: 24px; }
      .campaign-grid { grid-template-columns: 1fr; }
      .campaign-right {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-items: start;
      }
    }

    @media (max-width: 650px) {
      .campaign-page { padding: 18px 12px; }
      .campaign-title { font-size: 24px; }
      .campaign-heading { flex-direction: column; }
      .campaign-stats { grid-template-columns: 1fr; gap: 12px; }
      .campaign-stat { padding: 17px; }
      .campaign-stat-top { margin-bottom: 9px; }
      .campaign-stat-value { font-size: 24px; }
      .campaign-fields { grid-template-columns: 1fr; gap: 18px; }
      .campaign-field-full { grid-column: auto; }
      .campaign-right { grid-template-columns: 1fr; }
      .campaign-card { padding: 18px; }
      .campaign-form-footer { align-items: flex-start; flex-direction: column; }
      .campaign-actions { width: 100%; }
      .campaign-actions .campaign-btn { flex: 1; }
      .campaign-bottom { flex-direction: column; }
    }
  `;

  return (
    <div className="campaign-page">
      <style>{css}</style>

      <main className="campaign-container">
        <div className="campaign-breadcrumb">
          <span>Marketing</span>
          <span>/</span>
          <span>Email</span>
          <span>/</span>
          <span>Campaign Editor</span>
        </div>

        <header className="campaign-heading">
          <div>
            <h1 className="campaign-title">Email campaign editor</h1>
            <p className="campaign-subtitle">
              Create, customize and manage your email campaigns.
              <br />
              Configure sender details, content and delivery settings.
            </p>
          </div>

          <button
            type="button"
            className="campaign-btn campaign-btn-primary"
            onClick={() =>
              document.getElementById("campaign-name")?.focus()
            }
          >
            <span style={{ fontSize: 18 }}>＋</span>
            New campaign
          </button>
        </header>

        <section className="campaign-stats">
          <div className="campaign-stat">
            <div className="campaign-stat-top">
              <span>Total campaigns</span>
              <span className="campaign-stat-icon">▦</span>
            </div>
            <div className="campaign-stat-value">24</div>
            <div className="campaign-stat-caption">
              <span className="campaign-positive">+12%</span> from last month
            </div>
          </div>

          <div className="campaign-stat">
            <div className="campaign-stat-top">
              <span>Emails sent</span>
              <span className="campaign-stat-icon">✉</span>
            </div>
            <div className="campaign-stat-value">12,480</div>
            <div className="campaign-stat-caption">
              <span className="campaign-positive">+8.4%</span> campaign reach
            </div>
          </div>

          <div className="campaign-stat">
            <div className="campaign-stat-top">
              <span>Average open rate</span>
              <span className="campaign-stat-icon">◉</span>
            </div>
            <div className="campaign-stat-value">38.5%</div>
            <div className="campaign-stat-caption">
              <span className="campaign-positive">+4.2%</span> engagement rate
            </div>
          </div>
        </section>

        <form onSubmit={saveCampaign}>
          <div className="campaign-grid">
            <section className="campaign-card">
              <div className="campaign-card-heading">
                <div>
                  <h2 className="campaign-card-title">Basic information</h2>
                  <div className="campaign-card-description">
                    Add the essential details for your email campaign.
                  </div>
                </div>
                <div className="campaign-card-icon">✎</div>
              </div>

              <div className="campaign-fields">
                <div className="campaign-field">
                  <label className="campaign-label" htmlFor="campaign-name">
                    Internal name <span className="campaign-required">*</span>
                  </label>
                  <input
                    id="campaign-name"
                    className="campaign-input"
                    placeholder="e.g. October product launch"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                  />
                  <span className="campaign-hint">
                    Only visible to your team.
                  </span>
                </div>

                <div className="campaign-field">
                  <label className="campaign-label" htmlFor="campaign-from">
                    From name <span className="campaign-required">*</span>
                  </label>
                  <input
                    id="campaign-from"
                    className="campaign-input"
                    placeholder="Brand / team name"
                    value={form.fromName}
                    onChange={(e) => update("fromName", e.target.value)}
                    required
                  />
                </div>

                <div className="campaign-field">
                  <label className="campaign-label" htmlFor="campaign-email">
                    From email <span className="campaign-required">*</span>
                  </label>
                  <input
                    id="campaign-email"
                    type="email"
                    className="campaign-input"
                    placeholder="hello@company.com"
                    value={form.fromEmail}
                    onChange={(e) => update("fromEmail", e.target.value)}
                    required
                  />
                  <span className="campaign-hint">
                    Use a verified sender email address.
                  </span>
                </div>

                <div className="campaign-field">
                  <label className="campaign-label" htmlFor="campaign-subject">
                    Email subject <span className="campaign-required">*</span>
                  </label>
                  <input
                    id="campaign-subject"
                    className="campaign-input"
                    placeholder="Write a compelling subject"
                    maxLength={100}
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    required
                  />
                  <span className="campaign-hint">
                    {form.subject.length}/100 characters
                  </span>
                </div>

                <div className="campaign-field">
                  <label className="campaign-label" htmlFor="campaign-preheader">
                    Preheader text
                  </label>
                  <input
                    id="campaign-preheader"
                    className="campaign-input"
                    placeholder="A short email preview"
                    value={form.preheader}
                    onChange={(e) => update("preheader", e.target.value)}
                  />
                  <span className="campaign-hint">
                    Add a short preview to encourage opens.
                  </span>
                </div>

                <div className="campaign-field">
                  <label className="campaign-label" htmlFor="campaign-template">
                    Email template
                  </label>
                  <select
                    id="campaign-template"
                    className="campaign-select"
                    value={form.template}
                    onChange={(e) => update("template", e.target.value)}
                  >
                    <option value="">Choose a design</option>
                    <option value="Newsletter">Newsletter</option>
                    <option value="Promotion">Promotional offer</option>
                    <option value="Announcement">Announcement</option>
                    <option value="Welcome">Welcome email</option>
                    <option value="Product launch">Product launch</option>
                  </select>
                </div>

                <div className="campaign-field campaign-field-full">
                  <label className="campaign-label" htmlFor="campaign-message">
                    Campaign message
                  </label>
                  <textarea
                    id="campaign-message"
                    className="campaign-textarea"
                    placeholder="Write your email content or campaign message..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                  />
                </div>
              </div>

              <div className="campaign-form-footer">
                <span className="campaign-hint">
                  <span className="campaign-required">*</span> Required fields
                </span>

                <div className="campaign-actions">
                  <button
                    type="button"
                    className="campaign-btn"
                    onClick={resetForm}
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    className="campaign-btn"
                    onClick={() => setShowPreview(true)}
                  >
                    ◉ Preview
                  </button>

                  <button
                    type="submit"
                    className="campaign-btn campaign-btn-primary"
                  >
                    ✓ Save record
                  </button>
                </div>
              </div>
            </section>

            <aside className="campaign-right">
              <section className="campaign-card">
                <div className="campaign-card-heading">
                  <div>
                    <h2 className="campaign-card-title">Record settings</h2>
                    <div className="campaign-card-description">
                      Manage ownership and access.
                    </div>
                  </div>
                  <div className="campaign-card-icon">⚙</div>
                </div>

                {[
                  {
                    label: "Status",
                    key: "status",
                    options: ["Draft", "New", "In review", "Scheduled", "Active", "Paused"],
                  },
                  {
                    label: "Priority",
                    key: "priority",
                    options: ["Low", "Normal", "High", "Urgent"],
                  },
                  {
                    label: "Assigned team",
                    key: "team",
                    options: ["Marketing", "Sales", "Support", "Growth", "Management"],
                  },
                  {
                    label: "Visibility",
                    key: "visibility",
                    options: ["Team", "Private", "Workspace"],
                  },
                ].map((item) => (
                  <div className="campaign-setting-row" key={item.key}>
                    <label
                      className="campaign-setting-label"
                      htmlFor={`setting-${item.key}`}
                    >
                      {item.label}
                    </label>

                    <select
                      id={`setting-${item.key}`}
                      className="campaign-setting-select"
                      value={form[item.key]}
                      onChange={(e) => update(item.key, e.target.value)}
                    >
                      {item.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <div className="campaign-tip">
                  <div className="campaign-tip-title">✦ Campaign tip</div>
                  <p>
                    Use a recognizable sender name and a clear subject line
                    to build trust and improve engagement.
                  </p>
                </div>
              </section>

              <section className="campaign-card">
                <div className="campaign-progress-heading">
                  <h2 className="campaign-card-title">Checklist</h2>
                  <span className="campaign-progress-number">
                    {completed}/3 completed
                  </span>
                </div>

                <div className="campaign-progress-track">
                  <div
                    className="campaign-progress-bar"
                    style={{ width: `${(completed / 3) * 100}%` }}
                  />
                </div>

                <label className={`campaign-check ${requiredComplete ? "checked" : ""}`}>
                  <input type="checkbox" checked={Boolean(requiredComplete)} readOnly />
                  <span>Required fields complete</span>
                </label>

                <label className={`campaign-check ${checks.duplicate ? "checked" : ""}`}>
                  <input
                    type="checkbox"
                    checked={checks.duplicate}
                    onChange={(e) =>
                      setChecks((prev) => ({
                        ...prev,
                        duplicate: e.target.checked,
                      }))
                    }
                  />
                  <span>Duplicate check</span>
                </label>

                <label className={`campaign-check ${checks.consent ? "checked" : ""}`}>
                  <input
                    type="checkbox"
                    checked={checks.consent}
                    onChange={(e) =>
                      setChecks((prev) => ({
                        ...prev,
                        consent: e.target.checked,
                      }))
                    }
                  />
                  <span>Consent captured</span>
                </label>

                <div className="campaign-card-description" style={{ marginTop: 10 }}>
                  Complete all checks before proceeding with your campaign.
                </div>

                <button
                  type="button"
                  className="campaign-btn"
                  style={{ width: "100%", marginTop: 17 }}
                  onClick={() => {
                    if (!requiredComplete) {
                      setNotice("Complete all required fields first.");
                    } else if (!checks.duplicate || !checks.consent) {
                      setNotice("Complete the duplicate and consent checks first.");
                    } else {
                      setNotice("All checklist items are complete.");
                    }
                  }}
                >
                  Validate campaign →
                </button>
              </section>

              <section className="campaign-card">
                <h2 className="campaign-card-title">Email actions</h2>
                <div className="campaign-card-description" style={{ marginBottom: 17 }}>
                  Preview your content and prepare a test.
                </div>

                <button
                  type="button"
                  className="campaign-btn"
                  style={{ width: "100%", marginBottom: 10 }}
                  onClick={() => setShowPreview(true)}
                >
                  ◉ Preview email
                </button>

                <button
                  type="button"
                  className="campaign-btn"
                  style={{ width: "100%", marginBottom: 10 }}
                  onClick={prepareTest}
                >
                  ✉ Prepare test email
                </button>

                <button
                  type="button"
                  className="campaign-btn campaign-btn-primary"
                  style={{ width: "100%" }}
                  onClick={saveTemplate}
                >
                  ♧ Save as template
                </button>
              </section>
            </aside>
          </div>
        </form>

        {notice && (
          <div
            className={`campaign-notice ${
              /please|complete|required|enter |unable/i.test(notice)
                ? "error"
                : ""
            }`}
            role="status"
          >
            {saved ? "✓ " : "ℹ "}
            {notice}
          </div>
        )}

        <footer className="campaign-bottom">
          <span>© 2026 growthOS. All rights reserved.</span>
          <span>Marketing / Email campaign editor</span>
        </footer>
      </main>

      {showPreview && (
        <div
          className="campaign-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPreview(false);
          }}
        >
          <div
            className="campaign-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Email preview"
          >
            <div className="campaign-modal-header">
              <div>
                <h2 className="campaign-card-title">Email preview</h2>
                <div className="campaign-card-description">
                  Preview your campaign before sending.
                </div>
              </div>

              <button
                type="button"
                className="campaign-btn"
                onClick={() => setShowPreview(false)}
              >
                ✕ Close
              </button>
            </div>

            <div style={{ fontSize: 11, color: "#8290a7" }}>
              From: {form.fromName || "Your brand"}
              {form.fromEmail ? ` <${form.fromEmail}>` : ""}
            </div>

            <p>
              <strong>Subject: </strong>
              {form.subject || "Your email subject"}
            </p>

            <div style={{ color: "#8290a7" }}>
              {form.preheader || "Your email preview text"}
            </div>

            <div className="campaign-email-preview">
              <div style={{ textAlign: "center", fontWeight: 800, fontSize: 18 }}>
                {form.fromName || "Your Brand"}
              </div>

              <div className="campaign-email-banner">
                <h3>{form.subject || "Your campaign headline"}</h3>
                <p>{form.preheader || "A message for your audience."}</p>
              </div>

              <p style={{ whiteSpace: "pre-wrap" }}>
                {form.message || "Your campaign content will appear here."}
              </p>

              <div
                style={{
                  borderTop: "1px solid #e7ecf4",
                  paddingTop: 15,
                  marginTop: 25,
                  textAlign: "center",
                  fontSize: 10,
                  color: "#98a3b6",
                }}
              >
                You are receiving this email because you subscribed to our updates.
              </div>
            </div>

            <button
              type="button"
              className="campaign-btn campaign-btn-primary"
              style={{ width: "100%", marginTop: 20 }}
              onClick={() => setShowPreview(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailCampaigns;
