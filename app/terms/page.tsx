'use client'

import React from 'react'

export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <p className="mb-4">
        Welcome to Mnemo! These Terms of Service govern your use of the Mnemo AI MCQ
        Flashcard Generator available at <strong>mnemo.vercel.app</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing or using Mnemo, you agree to comply with and be bound by these Terms. If you do
        not agree, please do not use the Service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Description of Service</h2>
      <p className="mb-4">
        Mnemo allows users to generate AI-powered flashcards for study purposes. The service is
        provided on an “as is” and “as available” basis.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. User Accounts</h2>
      <p className="mb-4">
        You must log in using Google to access certain features. You are responsible for maintaining
        the confidentiality of your account credentials and for all activities under your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Use of the Service</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Do not use Mnemo for illegal or harmful activities.</li>
        <li>Do not attempt to reverse-engineer or misuse the system.</li>
        <li>Respect the rights of other users and data privacy.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Payments</h2>
      <p className="mb-4">
        Mnemo is currently offered free of charge. We do not collect any payments or financial data.
        If we introduce paid plans in the future, we will notify users and update these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate your account if you violate these Terms or
        misuse the platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Limitation of Liability</h2>
      <p className="mb-4">
        Mnemo is not responsible for any damages arising from your use or inability to use the
        Service. Use it at your own risk.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to These Terms</h2>
      <p className="mb-4">
        We may modify these Terms at any time. Changes will take effect once posted on this page
        with an updated “Last Updated” date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
      <p>
        For any questions about these Terms, contact us at{' '}
        <a href="mailto:ashilrahimck1@gmail.com" className="text-blue-500 underline">
          ashilrahimck1@gmail.com
        </a>.
      </p>
    </main>
  )
}
