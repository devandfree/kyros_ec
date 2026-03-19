import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  CheckCircle2, 
  Search, 
  Settings, 
  Users, 
  BarChart3, 
  ArrowRight, 
  Menu, 
  X,
  Clock,
  ShieldCheck,
  Zap,
  MessageSquare,
  ChevronDown,
  FileText,
  Layout,
  Database,
  Briefcase,
  Layers,
  Award,
  TrendingUp,
  Globe,
  Heart,
  Target,
  Eye,
  ChevronUp
} from 'lucide-react';

// --- Components ---

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-white rounded-full shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center"
          aria-label="Retour en haut"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ activePage, setActivePage }: { activePage: string, setActivePage: (page: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'À propos', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActivePage('home')}
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-secondary">
            Kyros
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activePage === link.id ? 'text-primary' : 'text-secondary/80'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => setActivePage('contact')}
            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Parlons de votre projet
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-secondary p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setIsOpen(false);
                  }}
                  className={`text-left text-lg py-2 font-semibold transition-colors ${
                    activePage === link.id ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="h-px bg-slate-100 my-2"></div>
              <button 
                onClick={() => {
                  setActivePage('contact');
                  setIsOpen(false);
                }}
                className="bg-primary text-white px-6 py-4 rounded-2xl text-center font-bold shadow-lg shadow-primary/20"
              >
                Contactez-nous
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
      >
        <span className="text-lg font-bold text-secondary">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-primary"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-8 pb-6 text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer = ({ setActivePage }: { setActivePage: (page: string) => void }) => (
  <footer className="bg-secondary text-white py-12">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="text-xl font-bold">Kyros</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Expert en conseil et accompagnement pour le choix de solutions logicielles adaptées aux PME.
        </p>
      </div>
      
      <div>
        <h4 className="font-bold mb-4 text-white">Navigation</h4>
        <ul className="space-y-2 text-slate-400 text-sm">
          <li><button onClick={() => setActivePage('home')} className="hover:text-primary transition-colors">Accueil</button></li>
          <li><button onClick={() => setActivePage('services')} className="hover:text-primary transition-colors">Services</button></li>
          <li><button onClick={() => setActivePage('about')} className="hover:text-primary transition-colors">À propos</button></li>
          <li><button onClick={() => setActivePage('contact')} className="hover:text-primary transition-colors">Contact</button></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-4 text-white">Services</h4>
        <ul className="space-y-2 text-slate-400 text-sm">
          <li><a href="#" className="hover:text-primary transition-colors">Audit & Diagnostic</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Sourcing Logiciel</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Aide au Choix</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Accompagnement Déploiement</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-4 text-white">Contact</h4>
        <ul className="space-y-2 text-slate-400 text-sm">
          <li className="flex items-center gap-3">
            <MessageSquare size={16} className="text-primary" />
            contact@kyros-conseil.com
          </li>
          <li className="flex items-center gap-3">
            <Users size={16} className="text-primary" />
            LinkedIn
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-slate-800 text-center text-slate-500 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
      <p>© {new Date().getFullYear()} Kyros | Etudes & Conseils. Tous droits réservés.</p>
      <p>Conçu par Steve EMANE</p>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Zap size={14} />
              Expertise & Conseil
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-secondary leading-[1.1] mb-8">
              Choisissez le <span className="text-primary italic">bon logiciel</span> pour votre entreprise.
            </h1>
            <p className="text-base md:text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
              Économisez-vous du temps et du stress. Nous vous accompagnons dans votre recherche de logiciel adapté au besoin de votre entreprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('services')}
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-primary/20"
              >
                Découvrir nos services
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-white text-secondary border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:border-primary hover:text-primary transition-all flex items-center justify-center"
              >
                Prendre rendez-vous
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white p-4 rounded-3xl shadow-2xl border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                alt="Software selection analysis" 
                className="rounded-2xl w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-0"></div>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 top-1/4 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 text-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary">Solution Validée</p>
                  <p className="text-[10px] text-slate-400">ROI Optimisé</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-1">150+</p>
              <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold">Logiciels Audités</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-1">50+</p>
              <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold">PME Accompagnées</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-1">98%</p>
              <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold">Satisfaction Client</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-1">10+</p>
              <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold">Ans d'Expertise</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Kyros Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Pourquoi Kyros ?</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-6">L'expertise au service de votre transformation numérique</h3>
            <p className="text-lg text-slate-500">
              Choisir un logiciel est une décision stratégique. Nous apportons la clarté nécessaire pour faire le bon choix, sans compromis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Clock className="text-primary" size={32} />,
                title: "Gain de temps",
                desc: "Ne passez plus des semaines à comparer des outils. Nous filtrons le marché pour vous."
              },
              {
                icon: <ShieldCheck className="text-primary" size={32} />,
                title: "Sécurité du choix",
                desc: "Évitez les erreurs coûteuses et les logiciels inadaptés à votre structure."
              },
              {
                icon: <BarChart3 className="text-primary" size={32} />,
                title: "Neutralité totale",
                desc: "Nous ne sommes liés à aucun éditeur. Notre seul objectif est votre réussite."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className="mb-6">{item.icon}</div>
                <h4 className="text-2xl font-bold text-secondary mb-4">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Notre Méthode</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Un processus clair pour des résultats concrets</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
            
            {[
              { step: "01", title: "Audit", desc: "Analyse de vos besoins et de vos outils actuels." },
              { step: "02", title: "Sourcing", desc: "Sélection rigoureuse des solutions du marché." },
              { step: "03", title: "Benchmark", desc: "Comparaison détaillée et démonstrations." },
              { step: "04", title: "Choix", desc: "Aide à la décision et validation finale." }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-6 shadow-lg shadow-primary/30">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-secondary mb-3">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Secteurs d'Expertise</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-8">Nous comprenons les enjeux de votre métier</h3>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                Chaque secteur a ses propres codes et contraintes. Notre expérience multi-sectorielle nous permet d'apporter un regard neuf tout en respectant les spécificités de votre industrie.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Industrie & Production",
                  "Services & Conseil",
                  "Retail & E-commerce",
                  "Santé & Médical",
                  "Logistique & Transport",
                  "BTP & Immobilier"
                ].map((sector, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-bold text-secondary">{sector}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-6">
                <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=400" alt="Industry" className="w-full rounded-3xl shadow-lg object-cover aspect-square sm:aspect-auto" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=400" alt="Services" className="w-full rounded-3xl shadow-lg object-cover aspect-square sm:aspect-auto" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-6 pt-0 sm:pt-12">
                <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=400" alt="Retail" className="w-full rounded-3xl shadow-lg object-cover aspect-square sm:aspect-auto" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400" alt="Tech" className="w-full rounded-3xl shadow-lg object-cover aspect-square sm:aspect-auto" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">FAQ</h2>
            <h3 className="text-4xl font-bold text-secondary">Questions Fréquentes</h3>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Combien de temps dure un accompagnement type ?",
                a: "Un projet dure généralement entre 4 et 8 semaines, selon la complexité du besoin et le nombre de solutions à auditer."
              },
              {
                q: "Êtes-vous rémunérés par les éditeurs de logiciels ?",
                a: "Absolument pas. Notre indépendance est notre plus grande valeur. Nous sommes rémunérés uniquement par nos clients pour garantir une neutralité totale."
              },
              {
                q: "Travaillez-vous avec tous les secteurs d'activité ?",
                a: "Oui, nous accompagnons les PME de tous secteurs (Industrie, Services, Retail, etc.) car notre méthodologie d'analyse est universelle."
              },
              {
                q: "Quel est le coût de vos services ?",
                a: "Nos tarifs sont adaptés à la taille de votre entreprise et à l'ampleur du projet. Nous proposons un premier diagnostic gratuit pour évaluer vos besoins."
              }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-white max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Prêt à moderniser vos outils ?</h2>
              <p className="text-xl text-white/80">
                Discutons ensemble de vos besoins et trouvons la solution qui fera passer votre entreprise au niveau supérieur.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-secondary text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-secondary/90 transition-all shadow-2xl"
            >
              Démarrer l'audit gratuit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const services = [
    {
      icon: <Search size={40} />,
      title: "Audit & Diagnostic",
      desc: "Analyse approfondie de vos processus actuels et identification des points de friction pour définir vos besoins réels.",
      features: ["Analyse des flux de travail", "Inventaire des outils existants", "Définition du cahier des charges"]
    },
    {
      icon: <Settings size={40} />,
      title: "Sourcing & Benchmark",
      desc: "Recherche et comparaison des meilleures solutions du marché adaptées à votre secteur et à votre budget.",
      features: ["Veille technologique", "Comparatif fonctionnel", "Analyse des coûts (TCO)"]
    },
    {
      icon: <Users size={40} />,
      title: "Aide au Choix",
      desc: "Accompagnement lors des démonstrations éditeurs et aide à la décision finale basée sur des critères objectifs.",
      features: ["Grille d'évaluation", "Organisation des démos", "Négociation contractuelle"]
    },
    {
      icon: <CheckCircle2 size={40} />,
      title: "Accompagnement Déploiement",
      desc: "Suivi de la mise en œuvre pour garantir que le logiciel choisi est correctement adopté par vos équipes.",
      features: ["Suivi de projet", "Gestion du changement", "Vérification de conformité"]
    }
  ];

  return (
    <div className="pt-28 md:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary mb-8">Nos Services</h1>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed">
            Une approche structurée pour garantir le succès de vos projets informatiques. Nous intervenons à chaque étape de votre réflexion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-24 md:mb-32">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-12 rounded-[40px] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
            >
              <div className="w-20 h-20 bg-slate-50 text-primary rounded-3xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                {service.icon}
              </div>
              <h3 className="text-3xl font-bold text-secondary mb-6">{service.title}</h3>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                {service.desc}
              </p>
              <ul className="space-y-4">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-secondary font-medium">
                    <div className="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                      <ChevronRight size={14} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Software Categories Section */}
        <div className="mb-24 md:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Expertise Logicielle</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">Nous vous accompagnons sur tous vos outils critiques</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <Database size={24} />, title: "ERP & Gestion" },
              { icon: <Users size={24} />, title: "CRM & Vente" },
              { icon: <Briefcase size={24} />, title: "SIRH & Paie" },
              { icon: <BarChart3 size={24} />, title: "BI & Analytics" },
              { icon: <Layout size={24} />, title: "E-commerce" },
              { icon: <Layers size={24} />, title: "WMS & Logistique" },
              { icon: <Settings size={24} />, title: "GPAO & Production" },
              { icon: <MessageSquare size={24} />, title: "Collaboration" }
            ].map((cat, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center hover:bg-white hover:shadow-lg transition-all cursor-default">
                <div className="text-primary mb-4">{cat.icon}</div>
                <span className="font-bold text-secondary">{cat.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables Section */}
        <div className="mb-24 md:mb-32 bg-secondary rounded-[40px] md:rounded-[60px] p-8 md:p-24 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-6">Nos Livrables</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight">Des documents actionnables pour décider sereinement</h3>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Notre mission ne s'arrête pas au conseil oral. Nous vous fournissons des supports complets et structurés pour justifier vos investissements.
              </p>
              
              <div className="space-y-6">
                {[
                  "Cahier des charges fonctionnel détaillé",
                  "Grille comparative multicritères (Benchmark)",
                  "Analyse financière du TCO (Coût total de possession)",
                  "Rapport de préconisation stratégique"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-48 bg-white/5 rounded-3xl border border-white/10 p-6 flex flex-col justify-end">
                    <FileText className="text-primary mb-4" size={32} />
                    <span className="text-sm font-bold uppercase tracking-wider">Audit</span>
                  </div>
                  <div className="h-64 bg-white/5 rounded-3xl border border-white/10 p-6 flex flex-col justify-end">
                    <BarChart3 className="text-primary mb-4" size={32} />
                    <span className="text-sm font-bold uppercase tracking-wider">Benchmark</span>
                  </div>
                </div>
                <div className="space-y-4 pt-0 sm:pt-8">
                  <div className="h-64 bg-white/5 rounded-3xl border border-white/10 p-6 flex flex-col justify-end">
                    <Settings className="text-primary mb-4" size={32} />
                    <span className="text-sm font-bold uppercase tracking-wider">Cahier des charges</span>
                  </div>
                  <div className="h-48 bg-white/5 rounded-3xl border border-white/10 p-6 flex flex-col justify-end">
                    <CheckCircle2 className="text-primary mb-4" size={32} />
                    <span className="text-sm font-bold uppercase tracking-wider">Validation</span>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-slate-50 rounded-[40px] p-16 border border-slate-100">
          <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Prêt à transformer votre système d'information ?</h3>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            Discutons de vos enjeux et voyons comment Kyros peut vous aider à choisir les meilleurs outils pour votre croissance.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 mx-auto"
          >
            Démarrer un projet <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const AboutPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="pt-28 md:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary mb-8">Notre Histoire</h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-6">
              Kyros est né d'un constat simple : les PME perdent un temps précieux et des ressources considérables en choisissant des logiciels inadaptés à leur réalité.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed">
              Notre mission est de devenir le partenaire de confiance des dirigeants pour naviguer dans l'écosystème complexe des solutions numériques. Nous ne vendons pas de logiciels, nous vendons de la clarté et de la sérénité.
            </p>
          </motion.div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
              alt="L'équipe Kyros" 
              className="rounded-[30px] md:rounded-[40px] shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary p-6 md:p-8 rounded-3xl text-white shadow-xl hidden sm:block">
              <p className="text-2xl md:text-3xl font-bold">100%</p>
              <p className="text-xs font-medium opacity-80 uppercase tracking-wider">Indépendant</p>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-16">Nos Valeurs Fondamentales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Indépendance",
                desc: "Nous ne percevons aucune commission des éditeurs. Notre conseil est 100% impartial et orienté vers votre intérêt."
              },
              {
                title: "Expertise",
                desc: "Une veille constante sur le marché des logiciels pour vous proposer les solutions les plus innovantes et robustes."
              },
              {
                title: "Proximité",
                desc: "Nous nous immergeons dans votre métier pour comprendre vos enjeux spécifiques et parler votre langage."
              }
            ].map((val, idx) => (
              <div key={idx} className="p-10 rounded-3xl bg-white border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 font-bold text-xl">
                  0{idx + 1}
                </div>
                <h4 className="text-2xl font-bold text-secondary mb-4">{val.title}</h4>
                <p className="text-slate-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-primary/5 p-12 rounded-[40px] border border-primary/10">
            <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center mb-6">
              <Target size={24} />
            </div>
            <h3 className="text-3xl font-bold text-secondary mb-6">Notre Mission</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Démocratiser l'accès au conseil stratégique en systèmes d'information pour les PME et ETI. Nous transformons la complexité technologique en levier de croissance simple et efficace.
            </p>
          </div>
          <div className="bg-secondary/5 p-12 rounded-[40px] border border-secondary/10">
            <div className="w-12 h-12 bg-secondary text-white rounded-2xl flex items-center justify-center mb-6">
              <Eye size={24} />
            </div>
            <h3 className="text-3xl font-bold text-secondary mb-6">Notre Vision</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Devenir la référence incontournable du conseil indépendant, reconnue pour son intégrité, son expertise pointue et son impact direct sur la performance des entreprises.
            </p>
          </div>
        </div>

        {/* Key Figures Section */}
        <div className="mb-24 py-16 bg-slate-50 rounded-[60px] border border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <TrendingUp size={32} />, value: "50+", label: "Projets Accompagnés" },
              { icon: <Clock size={32} />, value: "15+", label: "Ans d'Expérience" },
              { icon: <Globe size={32} />, value: "200+", label: "Logiciels Référencés" },
              { icon: <Award size={32} />, value: "100%", label: "Clients Satisfaits" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-primary mb-4 opacity-80">{stat.icon}</div>
                <div className="text-4xl font-bold text-secondary mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">L'Équipe</h2>
            <h3 className="text-4xl font-bold text-secondary mb-6">Des experts passionnés à votre service</h3>
            <p className="text-lg text-slate-500 leading-relaxed">
              Kyros réunit des consultants seniors issus des mondes de l'informatique, de la gestion et de la stratégie d'entreprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: "Steve EMANE",
                role: "Fondateur & Ingénieur de Conception",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
                bio: "Ingénieur de Conception en Génie Informatique, Business Analyst et Business Process Engineer."
              },
              {
                name: "Julie Durand",
                role: "Consultante ERP & CRM",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
                bio: "Spécialiste de l'optimisation des flux opérationnels et du sourcing logiciel."
              },
              {
                name: "Alexandre Petit",
                role: "Expert BI & Data",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
                bio: "Passionné par la valorisation des données pour l'aide à la décision stratégique."
              }
            ].map((member, idx) => (
              <div key={idx} className="group">
                <div className="relative mb-6 overflow-hidden rounded-[40px]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <p className="text-white text-sm italic">"{member.bio}"</p>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-secondary mb-1">{member.name}</h4>
                <p className="text-primary font-bold text-sm uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary rounded-[60px] p-12 md:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Notre Approche</h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Nous croyons que la technologie doit être au service de l'humain, et non l'inverse. Chaque recommandation Kyros est le fruit d'une analyse rigoureuse mêlant besoins techniques, contraintes budgétaires et culture d'entreprise.
              </p>
              <div className="space-y-4">
                {["Écoute active", "Analyse objective", "Accompagnement humain"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary" size={20} />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-40 bg-white/5 rounded-3xl"></div>
                <div className="h-60 bg-primary/20 rounded-3xl"></div>
              </div>
              <div className="space-y-4 pt-0 sm:pt-8">
                <div className="h-60 bg-white/10 rounded-3xl"></div>
                <div className="h-40 bg-white/5 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA for About Page */}
        <div className="mt-24 text-center bg-slate-50 rounded-[40px] p-16 border border-slate-100">
          <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Vous souhaitez en savoir plus sur notre expertise ?</h3>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            Chaque projet est unique. Rencontrons-nous pour discuter de la manière dont Kyros peut accompagner votre transformation.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 mx-auto"
          >
            Prendre rendez-vous <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-28 md:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary mb-8">Parlons de votre futur.</h1>
            <p className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed">
              Vous avez un projet de changement de logiciel ou vous souhaitez optimiser vos outils actuels ? Notre équipe est à votre écoute.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-secondary mb-1">Email</h4>
                  <p className="text-slate-500">contact@kyros-conseil.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center shrink-0">
                  <Users size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-secondary mb-1">Réseaux Sociaux</h4>
                  <p className="text-slate-500">Suivez-nous sur LinkedIn pour nos conseils experts.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-12 rounded-[40px] shadow-2xl border border-slate-100">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider">Nom complet</label>
                  <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary transition-colors" placeholder="Jean Dupont" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider">Entreprise</label>
                  <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary transition-colors" placeholder="Ma PME" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary uppercase tracking-wider">Email professionnel</label>
                <input type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary transition-colors" placeholder="jean@entreprise.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary uppercase tracking-wider">Message</label>
                <textarea rows={4} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary transition-colors" placeholder="Décrivez brièvement votre besoin..."></textarea>
              </div>
              <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                Envoyer ma demande
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activePage === 'home' && <HomePage onNavigate={setActivePage} />}
            {activePage === 'services' && <ServicesPage onNavigate={setActivePage} />}
            {activePage === 'about' && <AboutPage onNavigate={setActivePage} />}
            {activePage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setActivePage={setActivePage} />
      <BackToTop />
    </div>
  );
}
