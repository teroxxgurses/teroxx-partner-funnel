"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type Answers = Record<string, string>;

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

export default function QualificationFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
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
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setTimeout(() => setStep((prev) => prev + 1), 250);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!contact.privacy) {
      alert("Bitte stimmen Sie der Datenschutzerklärung zu.");
      return;
    }

    console.log("Lead submitted:", {
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
            <div className="mb-2 text-sm text-gold">Grundsätzlich geeignet</div>

            <h2 className="text-2xl font-semibold text-white">
              Herzlichen Glückwunsch – Sie erfüllen grundsätzlich die
              Voraussetzungen für eine Partnerprüfung.
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/65">
              Im nächsten Schritt prüfen wir gemeinsam, welches
              Kooperationsmodell zu Ihrem Profil passt.
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
                required
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
                Partneranfrage absenden
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
