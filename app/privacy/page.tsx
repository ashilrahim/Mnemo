'use client'

import React from 'react'

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <p className="mb-4">
        Mnemo  operates the AI MCQ Flashcard Generator accessible from
        <strong> mnemo.vercel.app</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        When you sign up or log in using Google, we collect basic information such as your name,
        email address, and profile picture. This information is used to personalize your experience
        and maintain your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use your data only to provide and improve Mnemo. Specifically, we use it to:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Authenticate your account and maintain login sessions</li>
        <li>Store your generated flashcards securely</li>
        <li>Improve our AI and user experience over time</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing and Security</h2>
      <p className="mb-4">
        We do not sell, rent, or share your personal information with third parties. All user data
        is securely stored using Supabase authentication and database services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Payments</h2>
      <p className="mb-4">
        Mnemo is currently a free service. We do not collect or process any payment or financial
        information. If paid features are introduced in the future, this policy will be updated
        accordingly.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You can request to delete your account or data at any time by contacting us at
        <strong> contact@mnemo.ai</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Updates to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy occasionally. Updates will be reflected with a new “Last
        Updated” date at the top of this page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, contact us at{' '}
        <a href="mailto:ashilrahimck1@gmail.com" className="text-blue-500 underline">
          ashilrahimck1@gmail.com
        </a>.
      </p>
    </main>
  )
}
