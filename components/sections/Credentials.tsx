import { SectionHeader } from '@/components/primitives/SectionHeader'
import { EvidenceChip } from '@/components/primitives/EvidenceChip'
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

      <ul className="space-y-6">
        {credentials.map((credential) => (
          <li key={credential.title} className="border-l-2 border-detect pl-4">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <EvidenceChip variant="solid">
                {credential.kind === 'publication' ? 'Publication' : 'Patent'}
              </EvidenceChip>
              {credential.identifier && <EvidenceChip>{credential.identifier}</EvidenceChip>}
              <span className="num text-[0.6875rem] text-ink-faint">{credential.date}</span>
            </div>

            <h3 className="max-w-2xl text-[1.0625rem] font-semibold leading-snug text-ink">
              {/* Becomes a link only when href exists, so no dead link can render. */}
              {credential.href ? (
                <a href={credential.href} className="hover:text-detect">
                  {credential.title}
                </a>
              ) : (
                credential.title
              )}
            </h3>

            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
              {credential.venue}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
