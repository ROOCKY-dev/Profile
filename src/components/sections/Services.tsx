'use client';

import { motion } from 'framer-motion';
import { fadeSlideUp, staggerContainer } from '@/lib/animations';

const SERVICES = [
  {
    name: 'Web Design',
    price: '$100',
    unit: '/ site',
    description:
      'Custom websites designed and built from scratch. React/Next.js, CMS, responsive, deployed.',
    cta: 'Start Project',
    available: true,
  },
  {
    name: 'Solutions',
    price: '$50',
    unit: '/ mo',
    description:
      'Hosting, server administration, security, updates, and ongoing maintenance.',
    cta: 'Book Meeting',
    available: true,
  },
  {
    name: 'Game Dev',
    price: '$75',
    unit: '/ hr',
    description:
      'Unity games and Minecraft mod development. Custom mechanics, UI/UX, performance tuning.',
    cta: 'Enquire',
    available: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 px-6 md:px-12">
      {/* Header */}
      <div className="mb-12">
        <div className="section-number">04</div>
        <div className="label-text mt-2">Services & Pricing</div>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 border-[3px] border-black"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.name}
            variants={fadeSlideUp}
            className={`p-8 flex flex-col ${
              i < SERVICES.length - 1
                ? 'border-b-[3px] md:border-b-0 md:border-r-[3px] border-black'
                : ''
            } ${!service.available ? 'opacity-50' : ''}`}
          >
            <h3 className="text-[14px] font-black uppercase tracking-[2px] mb-6">
              {service.name}
            </h3>
            <div className="mb-6">
              <span className="text-[40px] font-black leading-none tracking-[-2px]">
                {service.price}
              </span>
              <span className="text-[11px] text-gray ml-1 tracking-[2px] uppercase">
                {service.unit}
              </span>
            </div>
            <p className="text-[12px] text-gray leading-[1.7] flex-1 mb-8">
              {service.description}
            </p>
            {service.available ? (
              <a
                href="mailto:letsbuild@roocky.dev"
                className="block text-center text-[10px] font-bold tracking-[3px] uppercase bg-black text-white py-3 border-2 border-black hover:bg-white hover:text-black transition-colors"
              >
                {service.cta} →
              </a>
            ) : (
              <span className="block text-center text-[10px] font-bold tracking-[3px] uppercase text-gray py-3 border-2 border-gray-lt">
                Currently Unavailable
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
