import QualificationFlow from "@/components/QualificationFlow";

export default function Home() {
  return (
    <main className="min-h-screen bg-luxury">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 md:px-8 lg:px-10">
        <header className="flex items-center justify-between">
          <div className="text-xs font-semibold tracking-[0.22em] text-gold md:text-sm md:tracking-[0.25em]">
            DIGITAL ASSET BOUTIQUE
          </div>

          <div className="hidden rounded-full border border-white/10 px-4 py-2 text-xs text-white/70 md:block">
            Partnerqualifikation
          </div>
        </header>

        <div className="grid flex-1 items-center gap-6 py-6 md:gap-10 md:py-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-2 text-xs text-gold md:px-4 md:text-sm">
              Für Finanzberater, Vermittler & strategische Partner
            </div>

            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-6xl">
              Prüfen Sie in 60 Sekunden Ihre Partnerqualifikation.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72 md:mt-6 md:text-lg md:leading-8">
              Erweitern Sie Ihr Leistungsangebot um professionelle Lösungen im
              Bereich digitaler Vermögenswerte – ohne eigene Krypto-Infrastruktur
              aufzubauen.
            </p>

            <div className="mt-4 text-xs font-medium text-white/50 md:hidden">
              Reguliert. Persönlich. Partnerorientiert.
            </div>

            <div className="mt-8 hidden gap-3 text-sm text-white/72 sm:grid-cols-3 md:grid">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                Regulatorisch orientierte Infrastruktur
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                Professionelle Partnerbetreuung
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                Neue Potenziale für Ihr Netzwerk
              </div>
            </div>
          </div>

          <QualificationFlow />
        </div>
      </section>
    </main>
  );
}
