"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { OperatingMap } from "./OperatingMap";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-canvas">
      <Container className="grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-6">
          <motion.h1
            id="hero-title"
            className="text-display"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {site.tagline}
          </motion.h1>
          <motion.p
            className="mt-7 max-w-[34rem] text-lead text-muted"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease }}
          >
            {site.description}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease }}
          >
            <ButtonLink href="/products" size="lg">
              Explore our products
            </ButtonLink>
            <ButtonLink href="/contact?topic=project" size="lg" variant="secondary">
              Start a project
            </ButtonLink>
          </motion.div>
        </div>

        <div className="hidden sm:block lg:col-span-6">
          <OperatingMap />
        </div>
      </Container>
    </section>
  );
}
