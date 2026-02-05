"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Code2,
  Palette,
  Gamepad2,
  Brain,
  Globe,
  Database,
  Smartphone,
  Bot,
  Briefcase,
  GraduationCap,
  Rocket,
  Users,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const experienceLevels = [
  {
    value: "beginner",
    label: "Beginner",
    description: "New to programming",
    emoji: "🌱",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Know the basics",
    emoji: "🌿",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Experienced developer",
    emoji: "🌳",
  },
] as const;

const languages = [
  { value: "flutter", label: "Flutter/Dart", icon: "💙" },
  { value: "python", label: "Python", icon: "🐍" },
  { value: "javascript", label: "JavaScript", icon: "⚡" },
  { value: "typescript", label: "TypeScript", icon: "📘" },
  { value: "rust", label: "Rust", icon: "🦀" },
  { value: "go", label: "Go", icon: "🐹" },
  { value: "java", label: "Java", icon: "☕" },
  { value: "swift", label: "Swift", icon: "🍎" },
];

const interests = [
  { value: "mobile", label: "Mobile Apps", icon: Smartphone, emoji: "📱" },
  { value: "web", label: "Web Development", icon: Globe, emoji: "🌐" },
  { value: "ai", label: "AI & Machine Learning", icon: Brain, emoji: "🤖" },
  { value: "games", label: "Game Development", icon: Gamepad2, emoji: "🎮" },
  { value: "data", label: "Data Science", icon: Database, emoji: "📊" },
  { value: "design", label: "UI/UX Design", icon: Palette, emoji: "🎨" },
  { value: "automation", label: "Automation & Bots", icon: Bot, emoji: "⚙️" },
  { value: "backend", label: "Backend Systems", icon: Code2, emoji: "🔧" },
];

const goals = [
  {
    value: "portfolio",
    label: "Build a Portfolio",
    icon: Briefcase,
    emoji: "💼",
  },
  { value: "job", label: "Get a Tech Job", icon: Rocket, emoji: "🚀" },
  { value: "learn", label: "Learn for Fun", icon: GraduationCap, emoji: "🎓" },
  { value: "startup", label: "Build a Startup", icon: Users, emoji: "💡" },
];

const learningStyles = [
  {
    value: "visual",
    label: "Visual",
    description: "Learn through animations and diagrams",
    emoji: "👁️",
  },
  {
    value: "hands-on",
    label: "Hands-on",
    description: "Learn by building projects",
    emoji: "🛠️",
  },
  {
    value: "reading",
    label: "Reading",
    description: "Learn through documentation",
    emoji: "📚",
  },
] as const;

const steps = [
  { title: "Experience", subtitle: "What's your coding level?", emoji: "📊" },
  { title: "Language", subtitle: "Which language interests you?", emoji: "💻" },
  { title: "Interests", subtitle: "What do you want to build?", emoji: "🎯" },
  { title: "Goals", subtitle: "What's your main objective?", emoji: "🏆" },
  { title: "Style", subtitle: "How do you learn best?", emoji: "🧠" },
];

// 3D Card component for options
function OptionCard({
  children,
  selected,
  onClick,
  index = 0,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  index?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [5, -5]);
  const rotateY = useTransform(x, [-50, 50], [-5, 5]);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 2);
    y.set((e.clientY - centerY) / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring" as const }}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-xl border text-left transition-all duration-300",
        "transform-gpu perspective-1000",
        selected
          ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
          : "border-border hover:border-primary/50 hover:bg-muted/50",
      )}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
        >
          <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
        </motion.div>
      )}
      {children}
    </motion.button>
  );
}

// Animated background
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px]"
      />
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, setProfile, setCurrentStep, currentStep } = useAppStore();
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return profile.experienceLevel !== null;
      case 1:
        return profile.preferredLanguage !== null;
      case 2:
        return profile.interests.length > 0;
      case 3:
        return profile.goals.length > 0;
      case 4:
        return profile.learningStyle !== null;
      default:
        return false;
    }
  };

  const toggleArrayItem = (key: "interests" | "goals", value: string) => {
    const current = profile[key];
    if (current.includes(value)) {
      setProfile({ [key]: current.filter((v) => v !== value) });
    } else {
      setProfile({ [key]: [...current, value] });
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 relative">
      {mounted && <AnimatedBackground />}

      <div className="w-full max-w-2xl relative z-10">
        {/* Progress Bar with step indicators */}
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  scale: index === currentStep ? 1.1 : 1,
                }}
                className="flex flex-col items-center gap-1"
              >
                <motion.div
                  animate={{
                    backgroundColor:
                      index <= currentStep ? "var(--primary)" : "var(--muted)",
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <span
                      className={
                        index <= currentStep
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {step.emoji}
                    </span>
                  )}
                </motion.div>
                <span
                  className={cn(
                    "text-xs font-medium hidden sm:block",
                    index <= currentStep
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={false}
              animate={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
            />
          </div>
        </div>

        {/* Step Content Card */}
        <motion.div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8 min-h-[450px] relative overflow-hidden shadow-xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Step Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" as const, delay: 0.1 }}
                  className="text-4xl mb-4"
                >
                  {steps[currentStep].emoji}
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="text-muted-foreground font-playful">
                  {steps[currentStep].subtitle}
                </p>
              </div>

              {/* Step 0: Experience Level */}
              {currentStep === 0 && (
                <div className="grid gap-3">
                  {experienceLevels.map((level, index) => (
                    <OptionCard
                      key={level.value}
                      selected={profile.experienceLevel === level.value}
                      onClick={() =>
                        setProfile({ experienceLevel: level.value })
                      }
                      index={index}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{level.emoji}</span>
                        <div>
                          <div className="font-semibold">{level.label}</div>
                          <div className="text-sm text-muted-foreground">
                            {level.description}
                          </div>
                        </div>
                      </div>
                    </OptionCard>
                  ))}
                </div>
              )}

              {/* Step 1: Language */}
              {currentStep === 1 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {languages.map((lang, index) => (
                    <OptionCard
                      key={lang.value}
                      selected={profile.preferredLanguage === lang.value}
                      onClick={() =>
                        setProfile({ preferredLanguage: lang.value })
                      }
                      index={index}
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{
                            scale:
                              profile.preferredLanguage === lang.value
                                ? 1.2
                                : 1,
                          }}
                          className="text-3xl mb-2"
                        >
                          {lang.icon}
                        </motion.div>
                        <div className="font-medium text-sm">{lang.label}</div>
                      </div>
                    </OptionCard>
                  ))}
                </div>
              )}

              {/* Step 2: Interests */}
              {currentStep === 2 && (
                <div className="grid grid-cols-2 gap-3">
                  {interests.map((interest, index) => {
                    const selected = profile.interests.includes(interest.value);
                    return (
                      <OptionCard
                        key={interest.value}
                        selected={selected}
                        onClick={() =>
                          toggleArrayItem("interests", interest.value)
                        }
                        index={index}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{interest.emoji}</span>
                          <span className="font-medium text-sm">
                            {interest.label}
                          </span>
                        </div>
                      </OptionCard>
                    );
                  })}
                </div>
              )}

              {/* Step 3: Goals */}
              {currentStep === 3 && (
                <div className="grid grid-cols-2 gap-3">
                  {goals.map((goal, index) => {
                    const selected = profile.goals.includes(goal.value);
                    return (
                      <OptionCard
                        key={goal.value}
                        selected={selected}
                        onClick={() => toggleArrayItem("goals", goal.value)}
                        index={index}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{goal.emoji}</span>
                          <span className="font-medium">{goal.label}</span>
                        </div>
                      </OptionCard>
                    );
                  })}
                </div>
              )}

              {/* Step 4: Learning Style */}
              {currentStep === 4 && (
                <div className="grid gap-3">
                  {learningStyles.map((style, index) => (
                    <OptionCard
                      key={style.value}
                      selected={profile.learningStyle === style.value}
                      onClick={() => setProfile({ learningStyle: style.value })}
                      index={index}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{style.emoji}</span>
                        <div>
                          <div className="font-semibold">{style.label}</div>
                          <div className="text-sm text-muted-foreground">
                            {style.description}
                          </div>
                        </div>
                      </div>
                    </OptionCard>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            glow={canProceed()}
            className="gap-2"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Generate Challenge
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
