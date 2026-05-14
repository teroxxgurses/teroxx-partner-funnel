import QualificationFlow from "@/components/QualificationFlow";

function TeroxxLogo() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white">
          <div className="absolute h-[2px] w-7 rotate-45 rounded-full bg-white" />
          <div className="absolute h-[2px] w-7 -rotate-45 rounded-full bg-white" />
          <div className="absolute h-2.5 w-2.5 rounded-full bg-white" />
        </div>

        <span className="text-2xl font-semibold tracking-tight text-white">
          Teroxx
        </span>
      </div>

      <span className="ml-12 mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-sand/70">
        Digital Asset Boutique
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-luxury">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-5 md:px-8 lg:px-10">
        <header className="flex items-start justify-between">
          <TeroxxLogo />

          <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/70 md:block">
            Partnerqualifikation
          </div>
        </header>

        <div className="grid flex-1 items-center gap-5 py-5 md:gap-10 md:py-10 lg:grid-cols-[1fr_0.92fr]">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-sand/30 bg-sand/10 px-3 py-2 text-xs text-sand md:px-4 md:text-sm">
              Für Finanzberater, Vermittler & strategische Partner
            </div>

            <h1 className="max-w-3xl text-[2rem] font-semibold leading-tight tracking-tight text-white md:text-6xl">
              Finanzberater? Prüfen Sie in 60 Sekunden Ihre Partnerqualifikation.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72 md:mt-6 md:text-lg md:leading-8">
              Erweitern Sie Ihr Leistungsangebot um professionelle
              Digital-Asset-Lösungen – ohne eigene Krypto-Infrastruktur, ohne
              eigene Regulierungskomplexität und ohne Krypto-Hype.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-white/55 md:hidden">
              <span>Regulatorisch orientiert</span>
              <span>•</span>
              <span>Persönlich begleitet</span>
              <span>•</span>
              <span>Partnerfokussiert</span>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-xs leading-6 text-white/58 md:hidden">
              Beantworten Sie wenige Fragen und erfahren Sie, ob Ihr Profil
              grundsätzlich für eine strategische Partnerprüfung geeignet ist.
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

        <footer className="border-t border-white/10 py-4 text-center text-[11px] leading-5 text-white/38">
          Regulatorisch orientiert · Persönlich begleitet · Für professionelle
          Finanzpartner
        </footer>
      </section>
    </main>
  );
}
