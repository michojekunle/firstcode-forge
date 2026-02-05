"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/10 blur-[100px]"
        />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground">
            <Rocket className="w-8 h-8" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient-primary">Transform</span>{" "}
            Your Learning?
          </h2>

          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Take a quick survey and get your personalized learning roadmap with
            AI-generated challenges tailored just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" glow className="group">
                Take the Survey
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/learn">
              <Button size="lg" variant="ghost">
                Browse Lessons First
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
