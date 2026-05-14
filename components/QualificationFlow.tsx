"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Clock3 } from "lucide-react";

type Answers = Record<string, string>;
type QualificationResult = "qualified" | "manual" | "notQualified";

const questions = [
  {
    id: "partnerType",
    question: "Wie sind Sie aktuell im Finanzvertrieb positioniert?",
    options: [
      "Freier Finanz- oder Versicherungsmakler",
      "Ausschließlichkeitsvertreter, z. B. Allianz, Ergo, R+V",
      "Strukturvertrieb / Vertriebsorganisation, z. B. DVAG, Swiss Life Select, MLP, Telis, TauRes",
      "Vermögensverwalter / Family Office / Private Banking",
      "Tippgeber / Netzwerkpartner ohne eigene Beratungserlaubnis",
      "Sonstiges / nicht sicher"
    ]
  },
  {
    id: "cooperationFreedom",
    question: "Wie frei können Sie über neue Kooperationen entscheiden?",
    options: [
      "Ich entscheide selbstständig",
      "Ich kann Kooperationen anbahnen, muss sie aber intern abstimmen",
      "Ich bin an Vorgaben meiner Organisation gebunden",
      "Nicht sicher"
    ]
  },
  {
    id: "clients",
    question: "Wie groß ist Ihr aktuell betreutes Kunden- oder Kontaktnetzwerk?",
    options: [
      "Im Aufbau",
      "10–100",
      "100–500",
      "500–2.000",
      "Mehr als 2.000"
    ]
  },
  {
    id: "license",
    question:
      "Verfügen Sie über eine Erlaubnis zur Finanzanlagenvermittlung? (§34f GewO oder vergleichbare Zulassung)",
    options: ["Ja", "Nein", "Nein, aber in Planung", "Nicht sicher"]
  },
  {
    id: "demand",
    question:
      "Werden Sie bereits von Kunden auf Bitcoin, Krypto oder digitale Assets angesprochen?",
    options: [
      "Ja, regelmäßig",
      "Gelegentlich",
      "Selten",
      "Noch nicht, aber ich sehe Potenzial"
    ]
  },
  {
    id: "interest",
    question: "Was wäre für Sie an einer Partnerschaft besonders interessant?",
    options: [
      "Neue Umsatzpotenziale",
      "Kundenbindung",
      "Professionelle Digital-Asset-Lösung",
      "Regulatorisch saubere Infrastruktur",
      "Zugang zu Expertenwissen",
      "Positionierung im Zukunftsmarkt"
    ]
  }
];

function calculateQualification(answers: Answers): QualificationResult {
  let score = 0;

  // Frage 1: Positionierung im Finanzvertrieb
  if (answers.partnerType === "Freier Finanz- oder Versicherungsmakler") {
    score += 3;
  }

  if (
    answers.partnerType ===
    "Vermögensverwalter / Family Office / Private Banking"
  ) {
    score += 4;
  }

  if (
    answers.partnerType ===
    "Strukturvertrieb / Vertriebsorganisation, z. B. DVAG, Swiss Life Select, MLP, Telis, TauRes"
  ) {
    score += 1;
  }

  if (
    answers.partnerType ===
    "Tippgeber / Netzwerkpartner ohne eigene Beratungserlaubnis"
  ) {
    score += 1;
  }

  if (
    answers.partnerType ===
    "Ausschließlichkeitsvertreter, z. B. Allianz, Ergo, R+V"
  ) {
    score -= 1;
  }

  if (answers.partnerType === "Sonstiges / nicht sicher") {
    score += 0;
  }

  // Frage 2: Freiheit bei Kooperationen
  if (answers.cooperationFreedom === "Ich entscheide selbstständig") {
    score += 3;
  }

  if (
    answers.cooperationFreedom ===
    "Ich kann Kooperationen anbahnen, muss sie aber intern abstimmen"
  ) {
    score += 2;
  }

  if (
    answers.cooperationFreedom ===
    "Ich bin an Vorgaben meiner Organisation gebunden"
  ) {
    score -= 1;
  }

  if (answers.cooperationFreedom === "Nicht sicher") {
    score += 0;
  }

  // Frage 3: Kunden- oder Kontaktnetzwerk
  if (answers.clients === "Mehr als 2.000") score += 4;
  if (answers.clients === "500–2.000") score += 3;
  if (answers.clients === "100–500") score += 2;
  if (answers.clients === "10–100") score += 1;
  if (answers.clients === "Im Aufbau") score += 0;

  // Frage 4: Erlaubnis Finanzanlagenvermittlung
  if (answers.license === "Ja") score += 3;
  if (answers.license === "Nein, aber in Planung") score += 1;
  if (answers.license === "Nicht sicher") score += 0;
  if (answers.license === "Nein") score -= 2;

  // Frage 5: Nachfrage nach digitalen Assets
  if (answers.demand === "Ja, regelmäßig") score += 3;
  if (answers.demand === "Gelegentlich") score += 2;
  if (answers.demand === "Selten") score += 1;
  if (answers.demand === "Noch nicht, aber ich sehe Potenzial") score += 1;

  // Frage 6: Interesse
  if (answers.interest === "Neue Umsatzpotenziale") score += 2;
  if (answers.interest === "Kundenbindung") score += 2;
  if (answers.interest === "Professionelle Digital-Asset-Lösung") score += 2;
  if (answers.interest === "Regulatorisch saubere Infrastruktur") score += 2;
  if (answers.interest === "Zugang zu Expertenwissen") score += 1;
  if (answers.interest === "Positionierung im Zukunftsmarkt") score += 2;

  if (score >= 11) return "qualified";
  if (score >= 6) return "manual";
  return "notQualified";
}

function getResultContent(result: QualificationResult) {
  if (result === "qualified") {
    return {
      icon: <CheckCircle2 className="mb-5 h-12 w-12 text-sand" />,
      label: "Grundsätzlich geeignet",
      headline:
        "Herzlichen Glückwunsch – Ihr Profil passt grundsätzlich zu unserer Partnerprüfung.",
      text:
        "Auf Basis Ihrer Angaben könnte eine Zusammenarbeit mit unserer Digital Asset Boutique interessant sein. Im nächsten Schritt prüfen wir gemeinsam, welches Kooperationsmodell zu Ihrem Profil und Netzwerk passt.",
      button: "Partneranfrage absenden"
    };
  }

  if (result === "manual") {
    return {
      icon: <Clock3 className="mb-5 h-12 w-12 text-sand" />,
      label: "Individuelle Prüfung empfohlen",
      headline:
        "Ihr Profil ist interessant – wir empfehlen eine individuelle Prüfung.",
      text:
        "Ihre Angaben zeigen grundsätzliches Kooperationspotenzial. Je nach Netzwerk, Kundengruppe und regulatorischer Ausgangslage prüfen wir gerne persönlich, welches Partnermodell für Sie infrage kommt.",
      button: "Anfrage zur individuellen Prüfung absenden"
    };
  }

  return {
    icon: <AlertCircle className="mb-5 h-12 w-12 text-sand" />,
    label: "Weitere Angaben erforderlich",
    headline:
      "Aktuell ist eine direkte Partnerprüfung noch nicht eindeutig möglich.",
    text:
      "Sie können Ihre Angaben überprüfen oder sich für zukünftige Updates eintragen. Je nach Entwicklung Ihres Netzwerks oder Ihrer regulatorischen Voraussetzungen kann eine Partnerschaft zu einem späteren Zeitpunkt interessant werden.",
    button: "Für zukünftige Updates eintragen"
  };
}

export default function QualificationFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [qualificationResult, setQualificationResult] =
    useState<QualificationResult | null>(null);

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    privacy: false
  });

  const isQuestionStep = step < questions.length;

  const progress = useMemo(() => {
    return Math.min(
      100,
      Math.round(((step + 1) / (questions.length + 1)) * 100)
    );
  }, [step]);

  const chooseAnswer = (questionId: string, value: string) => {
    const updatedAnswers = {
      ...answers,
      [questionId]: value
    };

    setAnswers(updatedAnswers);

    const isLastQuestion = step === questions.length - 1;

    if (isLastQuestion) {
      const result = calculateQualification(updatedAnswers);

      setTimeout(() => {
        setQualificationResult(result);
        setStep((prev) => prev + 1);
      }, 220);

      return;
    }

    setTimeout(() => setStep((prev) => prev + 1), 220);
  };

  const goBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      setQualificationResult(null);
    }
  };

  const reviewAnswers = () => {
    setStep(0);
    setQualificationResult(null);
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!contact.privacy) {
      alert("Bitte stimmen Sie der Datenschutzerklärung zu.");
      return;
    }

    console.log("Lead submitted:", {
      qualificationResult,
      answers,
      contact
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="brand-card rounded-3xl p-6 backdrop-blur md:p-8">
        <CheckCircle2 className="mb-5 h-12 w-12 text-sand" />
        <h2 className="text-2xl font-semibold text-white">
          Vielen Dank für Ihre Anfrage.
        </h2>
        <p className="mt-4 leading-7 text-white/70">
          Ihre Angaben wurden aufgenommen. Wir prüfen Ihr Profil und melden uns
          zeitnah persönlich bei Ihnen.
        </p>
      </div>
    );
  }

  const resultContent = qualificationResult
    ? getResultContent(qualificationResult)
    : null;

  return (
    <div className="brand-card rounded-3xl p-5 backdrop-blur md:p-7">
      <div className="mb-5">
        <div className="mb-3 flex items-center justify-between text-xs text-white/50">
          <span>Partnerqualifikation</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-sand transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isQuestionStep ? (
          <motion.div
            key={questions[step].id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
          >
            <div className="mb-2 text-sm text-sand">
              Schritt {step + 1} von {questions.length}
            </div>

            <h2 className="text-2xl font-semibold text-white">
              {questions[step].question}
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/60">
              Beantworten Sie wenige Fragen, damit wir einschätzen können, ob
              eine strategische Partnerschaft grundsätzlich zu Ihrem Profil
              passt.
            </p>

            <div className="mt-6 grid gap-3">
              {questions[step].options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => chooseAnswer(questions[step].id, option)}
                  className={`rounded-2xl border px-4 py-4 text-left text-sm transition ${
                    answers[questions[step].id] === option
                      ? "border-sand/70 bg-sand/10 text-sand"
                      : "border-white/10 bg-white/[0.04] text-white/85 hover:border-sand/50 hover:bg-sand/10"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                type="button"
                onClick={goBack}
                className="mt-5 text-sm text-white/50 transition hover:text-sand"
              >
                Zurück
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
          >
            {resultContent?.icon}

            <div className="mb-2 text-sm text-sand">
              {resultContent?.label}
            </div>

            <h2 className="text-2xl font-semibold text-white">
              {resultContent?.headline}
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/65">
              {resultContent?.text}
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-xs leading-6 text-white/55">
              Ihre Anfrage wird persönlich geprüft. Eine automatische Freigabe
              erfolgt nicht.
            </div>

            {qualificationResult === "notQualified" && (
              <button
                type="button"
                onClick={reviewAnswers}
                className="mt-5 rounded-2xl border border-sand/40 px-5 py-3 text-sm font-semibold text-sand transition hover:bg-sand/10"
              >
                Angaben überprüfen
              </button>
            )}

            {qualificationResult !== "notQualified" && (
              <button
                type="button"
                onClick={goBack}
                className="mt-5 text-sm text-white/50 transition hover:text-sand"
              >
                Zurück zu den Angaben
              </button>
            )}

            <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  placeholder="Vorname"
                  value={contact.firstName}
                  onChange={(e) =>
                    setContact({ ...contact, firstName: e.target.value })
                  }
                  className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-sand/60"
                />

                <input
                  required
                  placeholder="Nachname"
                  value={contact.lastName}
                  onChange={(e) =>
                    setContact({ ...contact, lastName: e.target.value })
                  }
                  className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-sand/60"
                />
              </div>

              <input
                placeholder="Unternehmen"
                value={contact.company}
                onChange={(e) =>
                  setContact({ ...contact, company: e.target.value })
                }
                className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-sand/60"
              />

              <input
                required
                type="email"
                placeholder="E-Mail"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-sand/60"
              />

              <input
                required={qualificationResult !== "notQualified"}
                placeholder={
                  qualificationResult === "notQualified"
                    ? "Telefonnummer optional"
                    : "Telefonnummer"
                }
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
                className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-sand/60"
              />

              <textarea
                placeholder="Was möchten Sie uns vorab mitteilen? Optional."
                value={contact.message}
                onChange={(e) =>
                  setContact({ ...contact, message: e.target.value })
                }
                className="min-h-24 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-sand/60"
              />

              <label className="mt-2 flex gap-3 text-xs leading-5 text-white/60">
                <input
                  type="checkbox"
                  checked={contact.privacy}
                  onChange={(e) =>
                    setContact({ ...contact, privacy: e.target.checked })
                  }
                  className="mt-1"
                />
                <span>
                  Ich stimme der Verarbeitung meiner Daten gemäß
                  Datenschutzerklärung zu.
                </span>
              </label>

              <button
                type="submit"
                className="mt-3 rounded-2xl bg-sand px-5 py-4 font-semibold text-navy transition hover:brightness-110"
              >
                {resultContent?.button}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
