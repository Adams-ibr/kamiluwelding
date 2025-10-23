// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion } from 'framer-motion';
// FIX: Replaced non-existent SourcingIcon and QualityIcon with existing OnSiteIcon and StructuralIcon respectively to resolve import errors.
import { OnSiteIcon, StructuralIcon, ProcessingIcon, DocumentationIcon, ShipmentIcon, SupportIcon, ConsultationIcon } from './icons';
import SectionTitle from './SectionTitle';

const processSteps = [
    { name: 'Consultation & Design', description: 'We start by understanding your vision, requirements, and technical specifications to create detailed plans and mockups.', icon: <ConsultationIcon /> },
    { name: 'Material Sourcing', description: 'We procure high-quality, certified metals from trusted suppliers to meet the exact needs of your project.', icon: <OnSiteIcon /> },
    { name: 'Precision Fabrication', description: 'Our expert fabricators use state-of-the-art equipment to cut, bend, and assemble components with unparalleled accuracy.', icon: <ProcessingIcon /> },
    { name: 'Expert Welding', description: 'Certified welders join the fabricated parts, ensuring structural integrity and a flawless finish.', icon: <StructuralIcon /> },
    { name: 'Finishing & Quality Assurance', description: 'The project undergoes finishing (e.g., powder coating, polishing) and a rigorous final inspection to guarantee it meets our high standards.', icon: <DocumentationIcon /> },
    { name: 'Logistics & Delivery', description: 'We arrange secure packaging and transportation to deliver your finished project safely to the site.', icon: <ShipmentIcon /> },
    { name: 'On-Site Installation', description: 'Our professional team can manage the final installation, ensuring everything fits perfectly and functions as designed.', icon: <SupportIcon /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const ExportProcessFlow: React.FC = () => {
    return (
        <div className="container mx-auto px-4">
            <SectionTitle>Our Project Workflow</SectionTitle>
            <div className="max-w-3xl mx-auto">
                <motion.div 
                    className="relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="absolute left-6 top-6 h-full w-0.5 bg-brand-gold/30 dark:bg-brand-gold/50" aria-hidden="true"></div>
                    
                    {processSteps.map((step, index) => (
                        <motion.div key={index} className="relative flex items-start space-x-8 mb-12" variants={itemVariants}>
                            <div className="flex-shrink-0 flex flex-col items-center">
                                <div className="z-10 bg-brand-gold border-4 border-brand-light dark:border-gray-800 rounded-full h-12 w-12 flex items-center justify-center">
                                    {React.cloneElement(step.icon, { className: "h-6 w-6 text-white" })}
                                </div>
                            </div>
                            
                            <div className="pt-1.5">
                                <p className="text-sm font-semibold text-brand-blue dark:text-brand-gold tracking-wider">STEP {index + 1}</p>
                                <h3 className="text-xl font-bold text-brand-charcoal dark:text-gray-100 mb-1">{step.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ExportProcessFlow;