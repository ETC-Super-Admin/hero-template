"use client";

import React from 'react'

export default function Page({ params }: { params: any }) {
  // unwrap params (may be a Promise in this runtime)
  const resolved = React.use(params) as { locale?: string; viewMode?: string } | undefined

  const locale = resolved?.locale ?? 'en'
  const mode = resolved?.viewMode ?? 'unknown'

  return (
    <div>
      <h2>Gallery — {mode}</h2>
      <p>Locale: {locale}</p>
    </div>
  )
}
