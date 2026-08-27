import { SectionHeader } from '@/components/primitives/SectionHeader'
import { Pill } from '@/components/primitives/Pill'
import { credentials } from '@/content/credentials'

export function Credentials() {
  return (
    <section aria-labelledby="credentials-heading" className="mb-24">
      <SectionHeader
        index="03"
        label="Publications & Patents"
        title="Peer-reviewed and granted"
        id="credentials-heading"
      />

      {/* Split rows: metadata in the left margin, the citation itself on the
          right. The same two-column rhythm the section headers use. */}
      <ul className="border-t border-rule">
        {credentials.map((credential) => (
          <li
            key={credential.title}
            className="grid gap-4 border-b border-rule py-7 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] sm:gap-10"
          >
            <div className="flex flex-col items-start gap-2">
              <Pill solid>{credential.kind === 'publication' ? 'Publication' : 'Patent'}</Pill>
              <span className="num text-[0.6875rem] text-ink-faint">{credential.date}</span>
              {credential.identifier && (
                <span className="num text-[0.6875rem] leading-snug text-ink-faint">
                  {credential.identifier}
                </span>
              )}
            </div>

            <div>
              <h3 className="display max-w-2xl text-2xl leading-tight text-ink">
                {/* Becomes a link only when href exists, so no dead link can render. */}
                {credential.href ? (
                  <a href={credential.href} className="transition-colors hover:text-burgundy">
                    {credential.title}
                  </a>
                ) : (
                  credential.title
                )}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
                {credential.venue}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
