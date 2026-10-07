'use client'

import React from 'react'

/**
 * Parses inline formatting:
 * - Bold: **text**
 * - Italic: *text*
 * - Image: ![alt](url)
 * - Link: [text](url)
 */
export function renderInlineFormatted(text: string): React.ReactNode {
  // Pattern matching: ![alt](url), [text](url), **bold**, *italic*
  const pattern = /(!?\[[^\]]*\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g
  const parts = text.split(pattern)

  return parts.map((part, index) => {
    if (!part) return null

    // Markdown Image: ![alt](url)
    if (part.startsWith('![') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/^!\[(.*?)\]\((.*?)\)$/)
      if (match) {
        const alt = match[1] || 'Imagen del curso'
        const src = match[2]
        return (
          <span key={index} className="my-4 block overflow-hidden rounded-xl border bg-muted/20 p-2 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="mx-auto max-h-[440px] w-auto max-w-full rounded-lg object-contain"
              loading="lazy"
            />
            {alt && (
              <span className="mt-2 block text-center text-xs font-medium text-muted-foreground">
                {alt}
              </span>
            )}
          </span>
        )
      }
    }

    // Markdown Link: [text](url)
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/)
      if (match) {
        const label = match[1]
        const url = match[2]
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            {label}
          </a>
        )
      }
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const content = part.slice(2, -2)
      return (
        <strong key={index} className="font-bold text-foreground">
          {content}
        </strong>
      )
    }

    // Italic: *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      const content = part.slice(1, -1)
      return (
        <em key={index} className="italic text-foreground/90">
          {content}
        </em>
      )
    }

    // Plain text
    return <React.Fragment key={index}>{part}</React.Fragment>
  })
}

interface FormattedTextProps {
  content: string
  className?: string
}

export function FormattedText({ content, className = '' }: FormattedTextProps) {
  if (!content) return null

  // Split into paragraphs by double newlines
  const paragraphs = content.split(/\n\n+/)

  return (
    <div className={`space-y-3.5 text-sm leading-relaxed text-foreground/90 ${className}`}>
      {paragraphs.map((paragraph, pIdx) => {
        const lines = paragraph.split('\n')

        // Check if paragraph is a bullet list (all or most lines start with • or - or *)
        const isList = lines.every((line) => {
          const trimmed = line.trim()
          return trimmed === '' || trimmed.startsWith('•') || trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)
        })

        if (isList && lines.length > 1) {
          return (
            <ul key={pIdx} className="my-2 space-y-1.5 pl-1">
              {lines
                .filter((l) => l.trim() !== '')
                .map((line, lIdx) => {
                  const cleaned = line.replace(/^[•\-*]\s*|^\d+\.\s*/, '').trim()
                  return (
                    <li key={lIdx} className="flex items-start gap-2 text-foreground/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                      <span className="flex-1">{renderInlineFormatted(cleaned)}</span>
                    </li>
                  )
                })}
            </ul>
          )
        }

        return (
          <p key={pIdx} className="leading-relaxed">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {renderInlineFormatted(line)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        )
      })}
    </div>
  )
}
