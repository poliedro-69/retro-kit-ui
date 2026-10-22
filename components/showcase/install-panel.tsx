import { InstallTabs, PackageManagerProvider } from '@/components/docs/package-manager'
import { RetroLinkButton, RetroWindow } from '@/components/retro-ui'
import { installCommands, shadcnAddCommands } from '@/lib/docs'
import { site } from '@/lib/site'

export function InstallPanel() {
  return (
    <RetroWindow
      title="Quick Install"
      status={
        <>
          <span className="flex-1 truncate">Free. Credit {site.author.name} in your project.</span>
          <RetroLinkButton href="/docs" size="sm">
            Full guide
          </RetroLinkButton>
        </>
      }
    >
      <PackageManagerProvider>
        <div className="grid gap-4 p-3 lg:grid-cols-2">
          <section aria-labelledby="install-npm" className="flex flex-col gap-2">
            <h2 id="install-npm" className="font-mono text-[11px] font-semibold tracking-widest uppercase">
              npm package
            </h2>
            <InstallTabs commands={installCommands(site.packageName)} />
          </section>
          <section aria-labelledby="install-shadcn" className="flex flex-col gap-2">
            <h2 id="install-shadcn" className="font-mono text-[11px] font-semibold tracking-widest uppercase">
              shadcn registry
            </h2>
            <InstallTabs commands={shadcnAddCommands('retro-ui', 'mac-ui')} />
          </section>
        </div>
      </PackageManagerProvider>
    </RetroWindow>
  )
}
