
import React, { useState } from 'react'
import { Mail, Eye, Save, Send, Smartphone } from 'lucide-react'

export default function EmailEditor() {
  const [subject, setSubject] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [content, setContent] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Editor</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and customize your email campaign.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
          >
            <Eye size={17} /> Preview
          </button>

          <button
            onClick={() => alert('Email draft saved in this demo.')}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-white hover:bg-blue-700"
          >
            <Save size={17} /> Save Draft
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Subject
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter your email subject"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Preview Text
            </label>
            <input
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              placeholder="Text shown beside the subject in the inbox"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              placeholder="Write your email content here..."
              className="w-full resize-y rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => alert('Email sending is not connected yet.')}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Send size={17} /> Send Test Email
          </button>
        </div>

        <aside className="rounded-xl border border-gray-200 bg-white p-5">
          {showPreview ? (
            <>
              <div className="mb-4 flex items-center gap-2 text-gray-500">
                <Smartphone size={18} />
                <span className="text-sm">Email Preview</span>
              </div>
              <div className="rounded-lg border p-4">
                <Mail size={22} className="mb-4 text-blue-600" />
                <h2 className="font-semibold">
                  {subject || 'Your email subject'}
                </h2>
                <p className="mt-2 text-xs text-gray-500">
                  {previewText || 'Your preview text will appear here.'}
                </p>
                <div className="my-4 border-t" />
                <p className="whitespace-pre-wrap break-words text-sm text-gray-700">
                  {content || 'Your email content will appear here.'}
                </p>
              </div>
            </>
          ) : (
            <>
              <Mail size={26} className="mb-3 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Email Checklist</h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-500">
                <li>✓ Add a clear subject line</li>
                <li>✓ Write preview text</li>
                <li>✓ Review the email content</li>
                <li>✓ Preview before sending</li>
              </ul>
            </>
          )}
        </aside>
      </div>
    </div>
  )
}
