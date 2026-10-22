import { RetroWindow } from '@/components/retro-ui'

const questions = [
  {
    q: 'Are the kits really free?',
    a: 'Yes. Every kit is free for personal and commercial projects. There is no sign-up and no email wall. The only condition is a small credit linking back to the author, as described on the license page.',
  },
  {
    q: 'Which frameworks do the kits support?',
    a: 'The components are written in React with Tailwind CSS v4. They work in Next.js, Vite and any other React setup that runs Tailwind.',
  },
  {
    q: 'How do I install a kit?',
    a: 'Install the npm package and import its stylesheet, or copy the components into your project with the shadcn CLI. Then import the components you need.',
  },
  {
    q: 'Can I change the colors?',
    a: 'Yes. All colors, bevels and radii are CSS variables defined in a single theme block, so you can re-skin a kit by editing a handful of values.',
  },
  {
    q: 'Are the components accessible?',
    a: 'They use semantic HTML, native dialogs, visible keyboard focus and ARIA attributes where needed, so the retro look does not cost you usability.',
  },
  {
    q: 'Will you add more kits?',
    a: 'More classic desktop styles are planned. Every new kit will be free and follow the same structure as the ones available today.',
  },
]

export function Faq() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="mx-auto max-w-4xl scroll-mt-16 px-4 py-12">
      <RetroWindow
        title="FAQ.HLP - Frequently asked questions"
        titleAs="h2"
        status={<span className="flex-1">{questions.length} topics</span>}
      >
        <div className="rt-sunken m-3 divide-y divide-rt-shadow/40">
          {questions.map((item, index) => (
            <details key={item.q} open={index === 0} className="group">
              <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 font-medium select-none hover:bg-rt-face-hi focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rt-accent [&::-webkit-details-marker]:hidden">
                <svg
                  viewBox="0 0 8 8"
                  aria-hidden="true"
                  className="size-2.5 shrink-0 fill-rt-ink transition-transform group-open:rotate-90"
                >
                  <path d="M1 0l6 4-6 4z" />
                </svg>
                {item.q}
              </summary>
              <p className="px-4 pb-4 pl-9.5 leading-relaxed text-pretty text-rt-ink/80">{item.a}</p>
            </details>
          ))}
        </div>
      </RetroWindow>
    </section>
  )
}
