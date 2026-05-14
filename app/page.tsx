import QualificationFlow from "@/components/QualificationFlow";

function TeroxxLogo() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white md:h-9 md:w-9">
          <div className="absolute h-[2px] w-6 rotate-45 rounded-full bg-white md:w-7" />
          <div className="absolute h-[2px] w-6 -rotate-45 rounded-full bg-white md:w-7" />
          <div className="absolute h-2 w-2 rounded-full bg-white md:h-2.5 md:w-2.5" />
        </div>

        <span className="text-xl font-semibold tracking-tight text-white md:text-2xl">
          Teroxx
        </span>
      </div>

      <span className="ml-11 mt-0.5 text-[9px] font-medium uppercase tracking-[0.24em] text-sand/70 md:ml-12 md:mt-1 md:text-[10px] md:tracking-[0.28em]">
        Digital Asset Boutique
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-luxury">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 md:px-8 md:py-5 lg:px-10">
        <header className="flex items-start justify-between">
          <TeroxxLogo />

          <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/70 md:block">
            Partnerqualifikation
          </div>
        </header>

        <div className="grid flex-1 items-start gap-4 pt-5 md:items-center md:gap-10 md:py-10 lg:grid-cols-[1fr_0.92fr]">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-sand/30 bg-sand/10 px-3 py-1.5 text-[11px] text-sand md:mb-4 md:px-4 md:py-2 md:text-sm">
              Für Finanzberater & Vermittler
            </div>

            <h1 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              Finanzberater? Prüfen Sie Ihre Partnerqualifikation.
            </h1>

            <p className="mt-3 text-xs leading-5 text-white/60 md:hidden">
              Beantworten Sie wenige Fragen und erfahren Sie, ob Ihr Profil
              grundsätzlich passt.
            </p>

            <p className="mt-6 hidden max-w-2xl text-lg leading-8 text-white/72 md:block">
              Erweitern Sie Ihr Leistungsangebot um professionelle
              Digital-Asset-Lösungen – ohne eigene Krypto-Infrastruktur, ohne
              eigene Regulierungskomplexität und ohne Krypto-Hype.
            </p>

            <div className="mt-4 hidden flex-wrap gap-2 text-xs font-medium text-white/55 md:flex">
              <span>Regulatorisch orientiert</span>
              <span>•</span>
              <span>Persönlich begleitet</span>
              <span>•</span>
              <span>Partnerfokussiert</span>
            </div>

            <div className="mt-8 hidden gap-3 text-sm text-white/72 md:grid md:grid-cols-3">
              <div className="brand-card rounded-2xl p-4">
                <div className="mb-2 h-1 w-8 rounded-full bg-electric" />
                Regulatorisch orientierte Infrastruktur
              </div>

              <div className="brand-card rounded-2xl p-4">
                <div className="mb-2 h-1 w-8 rounded-full bg-sand" />
                Persönliche Partnerbetreuung
              </div>

              <div className="brand-card rounded-2xl p-4">
                <div className="mb-2 h-1 w-8 rounded-full bg-ember" />
                Neue Potenziale für Ihr Netzwerk
              </div>
            </div>
          </div>

          <QualificationFlow />
        </div>

        <footer className="hidden border-t border-white/10 py-4 text-center text-[11px] leading-5 text-white/38 md:block">
          Regulatorisch orientiert · Persönlich begleitet · Für professionelle
          Finanzpartner
        </footer>
      </section>
    </main>
  );
}
