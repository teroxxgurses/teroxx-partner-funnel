"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Clock3 } from "lucide-react";

type Answers = Record<string, string>;
type QualificationResult = "qualified" | "manual" | "notQualified";

const questions = [
  {
    id: "partnerType",
    question: "Welche Art von Finanzpartner sind Sie?",
    options: [
      "Gebundener Vermittler, z. B. Allianz, Ergo, R+V",
      "Freier Finanzmakler",
      "Vermögensberater",
      "Handelsvertreter nach §84 HGB",
      "Nebenberuflicher Tippgeber",
      "Vermögensverwalter / Family Office / Private Banking",
      "Sonstiges"
    ]
  },
  {
    id: "clients",
    question: "Wie viele Kunden betreuen Sie aktuell ungefähr?",
    options: [
      "10–100",
      "100–500",
      "500–2.000",
      "Mehr als 2.000",
      "Ich baue mein Netzwerk aktuell auf"
    ]
  },
  {
    id: "license",
    question: "Dürfen Sie aktuell Finanzanlagen vermitteln?",
    options: ["Ja", "Nein", "Nein, aber ich plane es", "Nicht sicher"]
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

  // Frage 1: Partnerart
  if (answers.partnerType === "Freier Finanzmakler") score += 3;
  if (answers.partnerType === "Vermögensberater") score += 3;
  if (answers.partnerType === "Handelsvertreter nach §84 HGB") score += 2;
  if (
    answers.partnerType ===
    "Vermögensverwalter / Family Office / Private Banking"
  )
    score += 4;
  if (answers.partnerType === "Nebenberuflicher Tippgeber") score += 1;
  if (answers.partnerType === "Sonstiges") score += 0;
  if (
    answers.partnerType ===
    "Gebundener Vermittler, z. B. Allianz, Ergo, R+V"
  )
    score -= 2;

  // Frage 2: Kundenanzahl
  if (answers.clients === "Mehr als 2.000") score += 4;
  if (answers.clients === "500–2.000") score += 3;
  if (answers.clients === "100–500") score += 2;
  if (answers.clients === "10–100") score += 1;
  if (answers.clients === "Ich baue mein Netzwerk aktuell auf") score += 0;

  // Frage 3: Erlaubnis Finanzanlagenvermittlung
  if (answers.license === "Ja") score += 3;
  if (answers.license === "Nein, aber ich plane es") score += 1;
  if (answers.license === "Nicht sicher") score += 0;
  if (answers.license === "Nein") score -= 2;

  // Frage 4: Nachfrage nach digitalen Assets
  if (answers.demand === "Ja, regelmäßig") score += 3;
  if (answers.demand === "Gelegentlich") score += 2;
  if (answers.demand === "Selten") score += 1;
  if (answers.demand === "Noch nicht, aber ich sehe Potenzial") score += 1;

  // Ergebnislogik
  if (score >= 8) return "qualified";
  if (score >= 4) return "manual";
  return "notQualified";
}

function getResultContent(result: QualificationResult) {
  if (result === "qualified") {
    return {
      icon: <CheckCircle2 className="mb-5 h-12 w-12 text-gold" />,
      label: "Grundsätzlich geeignet",
      headline:
        "Herzlichen Glückwunsch – Sie erfüllen grundsätzlich die Voraussetzungen für eine Partnerprüfung.",
      text:
        "Auf Basis Ihrer Angaben könnten Sie für eine Zusammenarbeit mit unserer Digital Asset Boutique geeignet sein. Im nächsten Schritt prüfen wir gemeinsam, welches Kooperationsmodell zu Ihrem Profil passt.",
      button: "Partneranfrage absenden"
    };
  }

  if (result === "manual") {
    return {
      icon: <Clock3 className="mb-5 h-12 w-12 text-gold" />,
      label: "Individuelle Prüfung empfohlen",
      headline: "Vielen Dank – Ihr Profil könnte grundsätzlich interessant sein.",
      text:
        "Auf Basis Ihrer Angaben empfehlen wir eine individuelle Prüfung. Je nach Netzwerk, Kundengruppe und regulatorischer Ausgangslage könnte ein passendes Kooperationsmodell für Sie infrage kommen.",
      button: "Anfrage zur individuellen Prüfung absenden"
    };
  }

  return {
    icon: <AlertCircle className="mb-5 h-12 w-12 text-gold" />,
    label: "Aktuell noch nicht direkt qualifiziert",
    headline: "Vielen Dank für Ihr Interesse.",
    text:
      "Auf Basis Ihrer Angaben erfüllen Sie aktuell noch nicht die Voraussetzungen für eine direkte Partnerprüfung. Sie können sich jedoch gerne für zukünftige Updates und Informationen eintragen.",
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
    return Math.round(((step + 1) / (questions.length + 1)) * 100);
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
      }, 250);

      return;
    }

    setTimeout(() => setStep((prev) => prev + 1), 250);
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
      <div className="rounded-3xl border border-gold/25 bg-white/[0.06] p-6 shadow-2xl backdrop-blur md:p-8">
        <CheckCircle2 className="mb-5 h-12 w-12 text-gold" />
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
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur md:p-7">
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-xs text-white/50">
          <span>Partnerqualifikation</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gold transition-all duration-500"
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
            transition={{ duration: 0.25 }}
          >
            <div className="mb-2 text-sm text-gold">
              Schritt {step + 1} von {questions.length}
            </div>

            <h2 className="text-2xl font-semibold text-white">
              {questions[step].question}
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/60">
              Ihre Angaben helfen uns einzuschätzen, welches Partnermodell zu
              Ihrem Profil passt.
            </p>

            <div className="mt-6 grid gap-3">
              {questions[step].options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => chooseAnswer(questions[step].id, option)}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left text-sm text-white/85 transition hover:border-gold/50 hover:bg-gold/10"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
          >
            {resultContent?.icon}

            <div className="mb-2 text-sm text-gold">
              {resultContent?.label}
            </div>

            <h2 className="text-2xl font-semibold text-white">
              {resultContent?.headline}
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/65">
              {resultContent?.text}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  placeholder="Vorname"
                  value={contact.firstName}
                  onChange={(e) =>
                    setContact({ ...contact, firstName: e.target.value })
                  }
                  className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-gold/60"
                />

                <input
                  required
                  placeholder="Nachname"
                  value={contact.lastName}
                  onChange={(e) =>
                    setContact({ ...contact, lastName: e.target.value })
                  }
                  className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-gold/60"
                />
              </div>

              <input
                placeholder="Unternehmen"
                value={contact.company}
                onChange={(e) =>
                  setContact({ ...contact, company: e.target.value })
                }
                className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-gold/60"
              />

              <input
                required
                type="email"
                placeholder="E-Mail"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-gold/60"
              />

              <input
                required={qualificationResult !== "notQualified"}
                placeholder="Telefonnummer"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
                className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-gold/60"
              />

              <textarea
                placeholder="Was möchten Sie uns vorab mitteilen? Optional."
                value={contact.message}
                onChange={(e) =>
                  setContact({ ...contact, message: e.target.value })
                }
                className="min-h-24 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-gold/60"
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
                className="mt-3 rounded-2xl bg-gold px-5 py-4 font-semibold text-navy transition hover:brightness-110"
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
