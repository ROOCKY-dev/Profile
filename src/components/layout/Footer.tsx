'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { fadeSlideUp } from '@/lib/animations';

export default function Footer() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <motion.footer
      id="contact"
      className="bg-black text-white px-6 md:px-12 py-12 md:py-16"
      variants={fadeSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-12">
        {/* Left — Email CTA */}
        <div>
          <div className="text-[10px] font-bold tracking-[4px] uppercase text-[#555] mb-4">
            Let&apos;s build something
          </div>
          <a
            href={`mailto:${personal.email}`}
            className="group block"
          >
            <AnimatedText
              text={personal.email.toUpperCase()}
              as="span"
              mode="letter"
              className="text-[clamp(20px,4vw,32px)] font-black tracking-[-1px] border-b-2 border-white group-hover:border-gray transition-colors inline-flex flex-wrap"
            />
          </a>
        </div>

        {/* Right — Links */}
        <div className="flex flex-col gap-2 md:text-right">
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold tracking-[3px] uppercase hover:text-[#555] transition-colors"
          >
            GitHub
          </a>
          <a
            href={personal.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold tracking-[3px] uppercase hover:text-[#555] transition-colors"
          >
            Instagram
          </a>
          <a
            href={personal.socials.wa}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold tracking-[3px] uppercase hover:text-[#555] transition-colors"
          >
            WhatsApp
          </a>
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#555] mt-4">
            © {new Date().getFullYear()} {personal.name}
          </span>
        </div>
      </div>
    </motion.footer>
  );
}
