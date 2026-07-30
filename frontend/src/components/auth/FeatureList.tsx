import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function FeatureList() {
  const features = [
    { title: 'GitHub Sync', desc: 'Automatically sync your code files, repositories, and commits in real-time.' },
    { title: 'AI Code Explanation', desc: 'SyncForge AI reviews and documents your complex codebase changes instantly.' },
    { title: 'Revision Notes', desc: 'Generate revision files and cheat-sheets directly from commit snapshots.' },
    { title: 'Analytics Dashboard', desc: 'Visualize sync throughput, latency, and contribution statistics.' },
    { title: 'Smart Recommendations', desc: 'Get intelligent suggestions on database schemas alignment.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 18,
      },
    },
  };

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      {features.map((feature, idx) => (
        <motion.li
          key={idx}
          variants={itemVariants}
          className="flex items-start gap-4 text-left"
        >
          {/* Circular Check Indicator */}
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100/10 border border-primary-500/20 text-primary-400 shrink-0 mt-0.5">
            <Check className="h-3.5 w-3.5" />
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-slate-100">{feature.title}</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{feature.desc}</p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
