"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { QuizCard } from "@/components/ui/QuizCard";
import { formatMoneyShort, formatRent } from "@/lib/format";
import {
  bedroomOptions,
  budgetOptionsByPathway,
  getRecommendedSuburbs,
  propertyTypeOptions,
  riskOptions,
  toQueryString,
} from "@/lib/recommendations";
import type {
  BuyPropertyPreference,
  InvestRiskPreference,
  Pathway,
  Priority,
  RecommendationPreferences,
  RegionPreference,
  RentBedroomPreference,
} from "@/lib/types";
import { cn } from "@/lib/utils";

type PathwayChoice = Pathway | "not-sure";

interface QuizAnswers {
  pathway?: PathwayChoice;
  priority?: Priority;
  budget?: string;
  region?: RegionPreference;
  bedrooms?: RentBedroomPreference;
  propertyType?: BuyPropertyPreference;
  risk?: InvestRiskPreference;
}

interface QuizOption<TValue extends string = string> {
  label: string;
  value: TValue;
  helper?: string;
}

const pathwayOptions: QuizOption<PathwayChoice>[] = [
  { label: "Rent a place", value: "rent", helper: "Find suburbs that make weekly rent and daily life work." },
  { label: "Buy a home", value: "buy", helper: "Shortlist suburbs for liveability, schools, and value." },
  { label: "Invest in property", value: "invest", helper: "Compare suburb-level yield, demand, and risk signals." },
  { label: "Not sure yet", value: "not-sure", helper: "Let Nook infer a pathway from your priorities." },
];

const priorityOptions: QuizOption<Priority>[] = [
  { label: "Affordability", value: "affordability" },
  { label: "Transport access", value: "transport" },
  { label: "Schools and family lifestyle", value: "schools" },
  { label: "Rental return", value: "yield" },
  { label: "Growth potential", value: "growth" },
  { label: "Safety and quietness", value: "safety" },
  { label: "Parks, cafes, and lifestyle", value: "lifestyle" },
];

const regionQuizOptions: QuizOption<RegionPreference>[] = [
  { label: "Inner North", value: "Inner North" },
  { label: "Inner South", value: "Inner South" },
  { label: "Inner East", value: "Inner East" },
  { label: "Inner West", value: "Inner West" },
  { label: "Middle Ring", value: "Middle Ring" },
  { label: "Outer North", value: "Outer North" },
  { label: "Outer South", value: "Outer South" },
  { label: "Outer East", value: "Outer East" },
  { label: "Outer West", value: "Outer West" },
  { label: "Anywhere", value: "Anywhere" },
];

const totalSteps = 5;

function inferPathway(answers: QuizAnswers): Pathway {
  if (answers.pathway && answers.pathway !== "not-sure") {
    return answers.pathway;
  }

  if (answers.priority === "yield" || answers.priority === "growth") {
    return "invest";
  }

  if (answers.priority === "schools" || answers.priority === "safety") {
    return "buy";
  }

  return "rent";
}

function getBudgetOptions(pathway: Pathway): QuizOption[] {
  return budgetOptionsByPathway[pathway]
    .filter((option) => option.value !== "any")
    .map((option) => ({ label: option.label, value: option.value }));
}

function getFinalQuestion(pathway: Pathway) {
  if (pathway === "rent") {
    return {
      title: "How much space do you need?",
      options: bedroomOptions,
      key: "bedrooms" as const,
    };
  }

  if (pathway === "buy") {
    return {
      title: "What type of home are you considering?",
      options: propertyTypeOptions,
      key: "propertyType" as const,
    };
  }

  return {
    title: "What kind of investment profile feels right?",
    options: riskOptions,
    key: "risk" as const,
  };
}

function buildPreferences(answers: QuizAnswers): RecommendationPreferences {
  const pathway = inferPathway(answers);
  const preferences: RecommendationPreferences = {
    pathway,
    priority: answers.priority ?? "balanced",
    budget: answers.budget ?? budgetOptionsByPathway[pathway][1].value,
    region: answers.region ?? "Anywhere",
  };

  if (pathway === "rent") {
    preferences.bedrooms = answers.bedrooms ?? "2-bed";
  }

  if (pathway === "buy") {
    preferences.propertyType = answers.propertyType ?? "flexible";
  }

  if (pathway === "invest") {
    preferences.risk = answers.risk ?? "balanced";
  }

  return preferences;
}

function formatPathway(pathway: Pathway) {
  return pathway === "rent" ? "Rent" : pathway === "buy" ? "Buy" : "Invest";
}

function getSuburbStat(preferences: RecommendationPreferences, suburb: ReturnType<typeof getRecommendedSuburbs>[number]["suburb"]) {
  if (preferences.pathway === "rent") {
    return formatRent(suburb.medianRentEstimate);
  }

  if (preferences.pathway === "buy") {
    return formatMoneyShort(suburb.medianBuyPriceEstimate);
  }

  return `${suburb.estimatedYield.toFixed(1)}% yield`;
}

export function LandingQuiz() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const pathway = inferPathway(answers);
  const finalQuestion = getFinalQuestion(pathway);
  const isComplete = step >= totalSteps;

  const preferences = useMemo(() => buildPreferences(answers), [answers]);
  const recommendations = useMemo(
    () => getRecommendedSuburbs(preferences, { limit: 3, fallback: true }),
    [preferences]
  );
  const ctaHref = `/${preferences.pathway}?${toQueryString(preferences)}`;

  const activeQuestion = useMemo(() => {
    if (step === 0) {
      return {
        title: "What are you looking for?",
        options: pathwayOptions,
        onChoose: (value: string) => setAnswers((current) => ({ ...current, pathway: value as PathwayChoice })),
        selected: answers.pathway,
      };
    }

    if (step === 1) {
      return {
        title: "What matters most to you?",
        options: priorityOptions,
        onChoose: (value: string) => setAnswers((current) => ({ ...current, priority: value as Priority })),
        selected: answers.priority,
      };
    }

    if (step === 2) {
      return {
        title: "What is your approximate budget?",
        options: getBudgetOptions(pathway),
        onChoose: (value: string) => setAnswers((current) => ({ ...current, budget: value })),
        selected: answers.budget,
      };
    }

    if (step === 3) {
      return {
        title: "Which part of Brisbane are you open to?",
        options: regionQuizOptions,
        onChoose: (value: string) => setAnswers((current) => ({ ...current, region: value as RegionPreference })),
        selected: answers.region,
      };
    }

    return {
      title: finalQuestion.title,
      options: finalQuestion.options,
      onChoose: (value: string) =>
        setAnswers((current) => ({
          ...current,
          [finalQuestion.key]: value,
        })),
      selected: answers[finalQuestion.key],
    };
  }, [answers, finalQuestion, pathway, step]);

  function handleChoose(value: string) {
    activeQuestion.onChoose(value);
    setStep((current) => Math.min(totalSteps, current + 1));
  }

  function handleBack() {
    setStep((current) => Math.max(0, current - 1));
  }

  function handleRestart() {
    setAnswers({});
    setStep(0);
  }

  return (
    <div id="quiz" className="scroll-mt-28">
      <QuizCard
        eyebrow={isComplete ? "Your Nook shortlist" : `Step ${Math.min(step + 1, totalSteps)} of ${totalSteps}`}
        title={isComplete ? "A suburb pathway to start with." : activeQuestion.title}
        progress={isComplete ? 100 : ((step + 1) / totalSteps) * 100}
      >
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="results"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.24 }}
              className="space-y-5"
            >
              <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.05] p-4">
                <p className="text-sm font-medium text-white/62">Recommended pathway</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
                  {formatPathway(preferences.pathway)}
                </p>
              </div>

              <div className="space-y-3">
                {recommendations.map((result) => (
                  <div key={result.suburb.id} className="rounded-[1.1rem] border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold tracking-tight text-white">{result.suburb.name}</h3>
                        <p className="mt-1 text-sm leading-6 text-white/64">{result.explanation}</p>
                      </div>
                      <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/80">
                        {getSuburbStat(preferences, result.suburb)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold tracking-tight text-brand-navy transition hover:bg-[#f4efe6]"
                >
                  View full recommendations
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/[0.04] px-5 py-3 text-sm font-semibold tracking-tight text-white transition hover:bg-white/[0.08]"
                  onClick={handleRestart}
                >
                  <RotateCcw className="h-4 w-4" />
                  Start again
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className={cn("grid gap-2.5", step === 3 ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
                {activeQuestion.options.map((option) => {
                  const selected = activeQuestion.selected === option.value;
                  const helper = "helper" in option ? option.helper : undefined;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={selected}
                      className={cn(
                        "group min-h-[4.4rem] rounded-[1.05rem] border px-4 py-3 text-left transition duration-200",
                        selected
                          ? "border-white/35 bg-white/[0.12]"
                          : "border-white/10 bg-white/[0.04] hover:border-white/24 hover:bg-white/[0.08]"
                      )}
                      onClick={() => handleChoose(option.value)}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span>
                          <span className="block text-sm font-semibold tracking-tight text-white">{option.label}</span>
                          {helper ? (
                            <span className="mt-1 block text-xs leading-5 text-white/56">{helper}</span>
                          ) : null}
                        </span>
                        {selected ? <CheckCircle2 className="h-4 w-4 shrink-0 text-[#f4e8d4]" /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold tracking-tight text-white/78 transition hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={handleBack}
                  disabled={step === 0}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <span className="text-xs font-medium text-white/46">
                  {pathway === "invest" ? "Investor mode" : pathway === "buy" ? "Buyer mode" : "Renter mode"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </QuizCard>
    </div>
  );
}
