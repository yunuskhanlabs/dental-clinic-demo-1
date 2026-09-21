const fs = require('fs');
const path = require('path');

const generatorScript = `
/**
 * =====================================================================
 * CLINIC MASTER CONFIGURATION & UNIVERSAL CATEGORY SYSTEM
 * =====================================================================
 * Single source of truth for clinic branding, category/specialty configuration,
 * doctor credentials, contact details, location data, services, testimonials,
 * FAQs, and section display flags.
 *
 * Switching category:
 *   category: { type: "dental" }        // or "dermatology", "ophthalmology", "ent", "orthopedic",
 *                                       // "physiotherapy", "general", "gynecology", "pediatrics",
 *                                       // "neurology", "cardiology"
 *
 * Automatically loads category-specific services, featured services, FAQs,
 * hero copywriting, appointment dropdown options, and hero visual behavior.
 */

// =====================================================================
// 1. UNIVERSAL CATEGORY DATASETS (11 Medical Specialties)
// =====================================================================
const CLINIC_CATEGORIES = {
  // 1. Dental Clinic (Default)
  dental: {
    type: "dental",
    name: "Dental Clinic",
    specialty: "Dentistry & Implantology",
    doctorDesignation: "Chief Dental Surgeon & Implantologist",
    doctorSpecialization: "Comprehensive Dentistry, Implants & Restorative Care",
    heroTagline: "Complete Dental Care for a",
    heroHighlight: "Healthier, Confident Smile",
    heroSubline: "Personalized, ethical dental care for individuals and families in [CITY]. Comprehensive diagnostics, advanced implant procedures, and gentle restorative treatments.",
    heroBadge: "Biometric 3D Scan Active",
    heroOverlayText: "Clinical Scan Ready",
    servicesHeading: "Clinical Treatments & Care",
    servicesSubheading: "Modern dental solutions spanning preventive, restorative, and advanced implantology.",
    whyUsExcellence: "Advanced Dental Care",
    whyUsSpectrum: "Comprehensive Smile Care",
    whyUsAccessible: "Transparent Dental Care",
    consultationTitle: "Dental Consultation",
    consultationDesc: "Includes comprehensive intra-oral examination, clinical diagnosis, and tailored treatment planning.",
    appointmentHeading: "Schedule Your Dental Consultation",
    ctaBadge: "Gentle Dental Care",
    ctaHeading: "Ready for a Healthier, More Confident Smile?",
    footerTreatmentsHeading: "Dental Treatments",
    defaultShow3D: true,
    services: [
      {
        category: "General Dentistry",
        name: "Dental Consultation",
        shortDesc: "Comprehensive intra-oral examination, diagnosis of dental complaints, and transparent treatment plan.",
        fullDesc: "Full checkup by [DOCTOR NAME] ([QUALIFICATION]) covering tooth condition, gum health, bite alignment, and oral hygiene recommendations.",
        idealFor: "Routine checkups & dental advice",
        featured: false
      },
      {
        category: "General Dentistry",
        name: "Teeth Cleaning & Scaling",
        shortDesc: "Gentle removal of hardened plaque (calculus), bacterial stains, and tartar build-up to maintain healthy gums.",
        fullDesc: "Ultrasonic scaling removes plaque and tartar from above and below the gumline, preventing gingivitis, bad breath, and long-term gum infections.",
        idealFor: "Plaque, tartar & gum hygiene",
        featured: false
      },
      {
        category: "General Dentistry",
        name: "Dental Fillings",
        shortDesc: "Tooth-colored composite fillings to repair cavities, restore chewing surfaces, and arrest progressive tooth decay.",
        fullDesc: "Tooth-shaded composite materials blend naturally with your smile while restoring structural integrity to teeth damaged by cavities or chipping.",
        idealFor: "Cavities & chipped teeth",
        featured: false
      },
      {
        category: "General Dentistry",
        name: "Tooth Extraction",
        shortDesc: "Gentle, safe removal of severely broken, un-restorable, or infected teeth with proper local anesthesia.",
        fullDesc: "When a tooth cannot be saved through root canal therapy or restoration, careful extraction prevents systemic infection and relieves discomfort.",
        idealFor: "Severe decay or non-restorable teeth",
        featured: false
      },
      {
        category: "General Dentistry",
        name: "Scaling & Polishing",
        shortDesc: "Surface smoothing and polishing after cleaning to restore a smooth enamel texture and brighten your smile.",
        fullDesc: "Polishing smooths microscopic roughness on the enamel surfaces, making it harder for plaque and tea/coffee stains to adhere.",
        idealFor: "Smooth enamel & stain prevention",
        featured: false
      },
      {
        category: "Implants & Missing Teeth",
        name: "Dental Implants",
        shortDesc: "Permanent, bio-compatible titanium root replacements to restore missing teeth with natural look and full chewing force.",
        fullDesc: "Modern tooth replacement solution anchored securely into jaw bone, preventing bone loss and eliminating removable dentures.",
        idealFor: "Missing single or multiple teeth",
        featured: true
      },
      {
        category: "Implants & Missing Teeth",
        name: "Crowns & Bridges",
        shortDesc: "Precision-milled ceramic and zirconia crowns to protect root canal treated or weakened teeth.",
        fullDesc: "Custom prosthetics designed to match surrounding teeth in contour and color, restoring full masticatory strength and natural appearance.",
        idealFor: "Weakened, fractured or missing teeth",
        featured: false
      },
      {
        category: "Restorative & Root Canal",
        name: "Root Canal Treatment (RCT)",
        shortDesc: "Pain-relieving endodontic therapy to remove pulp infection, disinfect inner root canals, and save the natural tooth.",
        fullDesc: "Careful mechanical cleaning and hermetic obturation of infected dental root pulp, saving severely decayed teeth from extraction.",
        idealFor: "Severe toothache, abscess or deep decay",
        featured: true
      },
      {
        category: "Restorative & Root Canal",
        name: "Single-Sitting RCT",
        shortDesc: "Modern rotary endodontic technique completing root canal disinfection and sealing in a single clinical appointment.",
        fullDesc: "Utilizing modern apex locators and rotary files, single-sitting endodontics offers rapid infection control with maximum patient convenience.",
        idealFor: "Suitable vital or acute cases",
        featured: false
      },
      {
        category: "Cosmetic & Orthodontics",
        name: "Teeth Whitening",
        shortDesc: "Professional clinic-supervised whitening for safe, dramatic brightening of discolored or stained enamel.",
        fullDesc: "Safe, targeted whitening formulations lift deep enamel stains caused by tea, coffee, smoking, and age without damaging enamel structure.",
        idealFor: "Dull, yellowed or stained teeth",
        featured: true
      },
      {
        category: "Cosmetic & Orthodontics",
        name: "Braces & Aligners Consultation",
        shortDesc: "Orthodontic assessment for teeth alignment, crowding correction, and modern clear invisible aligners.",
        fullDesc: "Evaluation of dental arches and malocclusion, offering transparent treatment roadmaps with metal, ceramic braces or invisible aligners.",
        idealFor: "Crooked teeth, gaps & bite alignment",
        featured: false
      },
      {
        category: "Paediatric & Family Care",
        name: "Paediatric Dental Care",
        shortDesc: "Friendly, gentle dental checkups, cavity fillings, and preventive fluoride treatments for infants and young children.",
        fullDesc: "Positive, stress-free dental experiences for children, focusing on preventive cavity sealants, milk tooth health, and habit guidance.",
        idealFor: "Infants, kids & teenagers",
        featured: false
      }
    ],
    faqs: [
      {
        question: "What is the consultation fee?",
        answer: "The consultation fee is [CONSULTATION FEE]. It covers the comprehensive primary oral examination and treatment diagnosis by [DOCTOR NAME] ([QUALIFICATION])."
      },
      {
        question: "Where is the clinic located?",
        answer: "The clinic is located at [FULL ADDRESS], [AREA], [CITY], [STATE] – [PINCODE]."
      },
      {
        question: "What are the clinic timings?",
        answer: "The clinic operates Monday to Saturday from 9:30 AM to 1:30 PM (morning session) and 5:00 PM to 9:00 PM (evening session). The clinic remains closed on Sundays."
      },
      {
        question: "Does the clinic provide dental implants?",
        answer: "Yes, [CLINIC NAME] provides dental implant consultations and replacement procedures for missing teeth."
      },
      {
        question: "Do you provide root canal treatment?",
        answer: "Yes, root canal treatment (RCT) and protective dental crown restorations are routinely performed to save infected natural teeth."
      },
      {
        question: "Do you treat children (Paediatric care)?",
        answer: "Yes, family and paediatric dental checkups, milk tooth restorations, and habit guidance are provided."
      },
      {
        question: "How can I book an appointment or enquire via WhatsApp?",
        answer: "You can use the appointment form above, call directly at +91 00000 00000, or send a message directly on WhatsApp for appointment confirmation."
      }
    ]
  },

  // 2. Dermatology & Skin Clinic
  dermatology: {
    type: "dermatology",
    name: "Skin & Dermatology Clinic",
    specialty: "Dermatology & Cosmetology",
    doctorDesignation: "Consultant Dermatologist & Dermatosurgeon",
    doctorSpecialization: "Clinical Dermatology, Trichology & Aesthetic Skin Care",
    heroTagline: "Advanced Skin & Hair Care for",
    heroHighlight: "Healthy Skin, Confident You",
    heroSubline: "Evidence-based clinical dermatology and aesthetic care in [CITY]. Specialized treatments for acne, pigmentation, hair loss, and chronic skin conditions.",
    heroBadge: "Clinical Derma Profile",
    heroOverlayText: "Skin Health Protocol Ready",
    servicesHeading: "Dermatology & Skin Solutions",
    servicesSubheading: "Specialized clinical and aesthetic dermatological care tailored to your skin type.",
    whyUsExcellence: "Evidence-Based Skin Care",
    whyUsSpectrum: "Full Dermatological Spectrum",
    whyUsAccessible: "Transparent Skin Care",
    consultationTitle: "Dermatology Consultation",
    consultationDesc: "Includes detailed skin, hair, or scalp evaluation, clinical dermoscopy, and customized skincare regimen.",
    appointmentHeading: "Schedule Your Skin Consultation",
    ctaBadge: "Personalized Derma Care",
    ctaHeading: "Ready for Healthier, Radiant & Clear Skin?",
    footerTreatmentsHeading: "Skin Treatments",
    defaultShow3D: false,
    services: [
      {
        category: "Clinical Dermatology",
        name: "Dermatology Consultation",
        shortDesc: "In-depth diagnostic evaluation of skin, hair, and nail conditions with personalized treatment plans.",
        fullDesc: "Comprehensive examination by [DOCTOR NAME] ([QUALIFICATION]) covering active rashes, infections, allergic reactions, and chronic dermatological concerns.",
        idealFor: "Skin diagnosis & management",
        featured: false
      },
      {
        category: "Clinical Dermatology",
        name: "Acne & Scar Treatment",
        shortDesc: "Targeted protocols combining medical management, chemical peels, and subcision for active breakouts and scars.",
        fullDesc: "Multi-modal approach addressing comedones, cystic acne, and post-inflammatory erythema/hyperpigmentation to prevent permanent scarring.",
        idealFor: "Active acne, breakouts & acne scars",
        featured: true
      },
      {
        category: "Clinical Dermatology",
        name: "Pigmentation & Melasma Care",
        shortDesc: "Advanced therapeutic regimens to treat stubborn pigmentation, dark spots, sun damage, and melasma.",
        fullDesc: "Combination therapies including medical topicals, targeted peels, and skin barrier strengthening for balanced and even tone.",
        idealFor: "Dark spots, melasma & sun damage",
        featured: false
      },
      {
        category: "Clinical Dermatology",
        name: "Eczema, Psoriasis & Allergy Care",
        shortDesc: "Evidence-based long-term management protocols for sensitive skin, chronic eczema, dermatitis, and psoriasis.",
        fullDesc: "Systematic care identifying allergic triggers, restoring skin barrier integrity, and providing immunomodulatory and topical relief.",
        idealFor: "Chronic itching, flakes & inflammation",
        featured: false
      },
      {
        category: "Hair & Scalp (Trichology)",
        name: "Hair Fall & Scalp Therapy",
        shortDesc: "Clinical evaluation of telogen effluvium, pattern alopecia, dandruff, and scalp dermatitis with restorative therapies.",
        fullDesc: "Trichoscopic scalp assessment, targeted nutritional optimization, and advanced regenerative mesotherapy for stronger hair roots.",
        idealFor: "Hair thinning, shedding & scalp issues",
        featured: true
      },
      {
        category: "Hair & Scalp (Trichology)",
        name: "Regenerative Hair Treatments",
        shortDesc: "Growth factor concentrate and regenerative micro-needling protocols for follicular stimulation and density improvement.",
        fullDesc: "Minimally invasive autologous regenerative therapy stimulating dormant follicles to encourage healthy hair regrowth.",
        idealFor: "Thinning crown & receding hairline",
        featured: false
      },
      {
        category: "Aesthetic & Rejuvenation",
        name: "Medical Chemical Peels",
        shortDesc: "Dermatologist-grade exfoliating peels for deep exfoliation, oil control, radiant glow, and skin renewal.",
        fullDesc: "Customized formulations (glycolic, salicylic, lactic, mandelic) tailored to your skin tolerance to reveal fresh, renewed skin.",
        idealFor: "Dullness, uneven texture & mild spots",
        featured: true
      },
      {
        category: "Aesthetic & Rejuvenation",
        name: "Laser Skin Treatments",
        shortDesc: "Precision laser toning, carbon peel therapies, and fractional treatments for skin rejuvenation and texture refinement.",
        fullDesc: "State-of-the-art non-ablative laser technology targeting dermal collagen remodeling and pigment fragmentation with minimal downtime.",
        idealFor: "Pores, fine lines & skin rejuvenation",
        featured: false
      },
      {
        category: "Aesthetic & Rejuvenation",
        name: "Wart, Mole & Skin Tag Removal",
        shortDesc: "Safe, painless radiofrequency (RF) and electrocautery removal of benign skin tags, seborrheic keratosis, and warts.",
        fullDesc: "Precise minor dermatosurgical procedure performed under local anesthesia with minimal scarring and quick healing.",
        idealFor: "Skin tags, facial warts & moles",
        featured: false
      }
    ],
    faqs: [
      {
        question: "What is the consultation fee for skin concerns?",
        answer: "The consultation fee is [CONSULTATION FEE]. It includes a detailed dermatological evaluation and personalized treatment regimen by [DOCTOR NAME] ([QUALIFICATION])."
      },
      {
        question: "Where is the clinic located?",
        answer: "The clinic is located at [FULL ADDRESS], [AREA], [CITY], [STATE] – [PINCODE]."
      },
      {
        question: "What are the clinic timings?",
        answer: "The clinic operates Monday to Saturday from 9:30 AM to 1:30 PM (morning session) and 5:00 PM to 9:00 PM (evening session). Sundays are closed."
      },
      {
        question: "Do you provide treatments for persistent acne and acne scars?",
        answer: "Yes, we offer tailored protocols combining clinical skincare, chemical peels, subcision, and scar-resurfacing treatments."
      },
      {
        question: "Are hair fall treatments suitable for both men and women?",
        answer: "Yes, we conduct comprehensive trichological evaluations to identify the underlying cause of hair fall in both men and women before starting treatment."
      },
      {
        question: "Are laser and peel procedures safe for Indian skin types?",
        answer: "Yes, all treatments are customized by our specialist dermatologist using protocols specifically suited for sensitive and higher-melanin skin types."
      },
      {
        question: "How do I book an appointment or consult via WhatsApp?",
        answer: "You can book using the appointment form above, call +91 00000 00000, or send a message directly on WhatsApp for quick scheduling."
      }
    ]
  },

  // 3. Eye & Ophthalmology Clinic
  ophthalmology: {
    type: "ophthalmology",
    name: "Eye & Ophthalmology Clinic",
    specialty: "Ophthalmology & Vision Care",
    doctorDesignation: "Consultant Eye Specialist & Ophthalmic Surgeon",
    doctorSpecialization: "Comprehensive Vision Care, Cataract & Refractive Assessment",
    heroTagline: "Advanced Eye & Vision Care for",
    heroHighlight: "Clear Vision, Better Life",
    heroSubline: "State-of-the-art vision diagnostics and ophthalmic consultations in [CITY]. Personalized eye examinations, cataract assessments, and precision refractive care.",
    heroBadge: "Precision Vision Diagnostics",
    heroOverlayText: "Ophthalmic Assessment Ready",
    servicesHeading: "Ophthalmic Care & Vision Services",
    servicesSubheading: "Comprehensive eye care spanning preventive exams, cataract triage, and refractive solutions.",
    whyUsExcellence: "Precision Vision Care",
    whyUsSpectrum: "Comprehensive Eye Health",
    whyUsAccessible: "Transparent Vision Care",
    consultationTitle: "Eye Examination & Consultation",
    consultationDesc: "Includes computerized refraction, visual acuity testing, intraocular pressure measurement, and slit-lamp evaluation.",
    appointmentHeading: "Schedule Your Comprehensive Eye Exam",
    ctaBadge: "Dedicated Vision Care",
    ctaHeading: "Ready for Crisp, Clear & Comfortable Vision?",
    footerTreatmentsHeading: "Eye Care Services",
    defaultShow3D: false,
    services: [
      {
        category: "General Eye Care",
        name: "Comprehensive Eye Examination",
        shortDesc: "Full clinical evaluation of visual acuity, refractive error, corneal health, and ocular pressure.",
        fullDesc: "Computerized eye testing combined with detailed slit-lamp biomicroscopy by [DOCTOR NAME] to detect early visual changes and eye disorders.",
        idealFor: "Routine vision checkups & eye strain",
        featured: false
      },
      {
        category: "Surgical & Cataract Evaluation",
        name: "Cataract Screening & Evaluation",
        shortDesc: "Early diagnosis and surgical evaluation for cloudy lens symptoms, glare sensitivity, and diminished night vision.",
        fullDesc: "Advanced biometry and slit-lamp grading to determine cataract maturity and discuss modern micro-incision phacoemulsification options.",
        idealFor: "Blurry vision, glare & seniors",
        featured: true
      },
      {
        category: "Surgical & Cataract Evaluation",
        name: "LASIK & Refractive Consultation",
        shortDesc: "Detailed corneal topography and pachymetry to assess suitability for laser vision correction (spectacle removal).",
        fullDesc: "Comprehensive pre-refractive screening evaluating corneal thickness and curvature to safely determine eligibility for LASIK or PRK.",
        idealFor: "Spectacle removal & active lifestyles",
        featured: true
      },
      {
        category: "Specialty Eye Health",
        name: "Glaucoma Screening & Management",
        shortDesc: "Intraocular pressure (IOP) measurement, optic disc assessment, and visual field evaluation to prevent silent vision loss.",
        fullDesc: "Essential screening to detect elevated eye pressure and optic nerve damage early, protecting your peripheral vision through timely medical management.",
        idealFor: "Family history of glaucoma & age 40+",
        featured: false
      },
      {
        category: "Specialty Eye Health",
        name: "Diabetic Retinopathy Screening",
        shortDesc: "Dilated fundus examination to assess retinal microvasculature health in diabetic and hypertensive patients.",
        fullDesc: "Annual retinal screening for diabetic individuals to identify microaneurysms, macular edema, or bleeding before vision is impaired.",
        idealFor: "Diabetic & hypertensive individuals",
        featured: false
      },
      {
        category: "Specialty Eye Health",
        name: "Dry Eye & Digital Strain Therapy",
        shortDesc: "Tear film assessment, lubricating regimens, and ergonomic eye care protocols for screen fatigue.",
        fullDesc: "Targeted management for burning sensations, eye fatigue, and redness caused by long hours of digital screen usage and environmental dryness.",
        idealFor: "Computer users & contact lens wearers",
        featured: true
      },
      {
        category: "Pediatric & Refractive",
        name: "Pediatric Eye Evaluation",
        shortDesc: "Child-friendly visual screening for refractive errors, amblyopia (lazy eye), and squint alignment.",
        fullDesc: "Early detection and correction of childhood eye conditions to support optimal visual development and academic learning.",
        idealFor: "School-age children & squint screening",
        featured: false
      },
      {
        category: "Pediatric & Refractive",
        name: "Refraction & Prescription Glasses",
        shortDesc: "Precise computerized and subjective optical refraction for crystal-clear prescription spectacles.",
        fullDesc: "Accurate determination of spherical and cylindrical power for single-vision, bifocal, and progressive lenses.",
        idealFor: "Eyeglass prescription & updates",
        featured: false
      }
    ],
    faqs: [
      {
        question: "What is included in the eye consultation fee?",
        answer: "The consultation fee is [CONSULTATION FEE]. It includes computerized eye testing, vision refraction, slit-lamp examination, and intraocular pressure checkup."
      },
      {
        question: "Where is the eye clinic located?",
        answer: "The clinic is located at [FULL ADDRESS], [AREA], [CITY], [STATE] – [PINCODE]."
      },
      {
        question: "How often should I get my eyes checked?",
        answer: "Adults should undergo a comprehensive eye examination annually. Individuals with diabetes, hypertension, or high myopia should be screened every 6 to 12 months."
      },
      {
        question: "What are the common symptoms of a cataract?",
        answer: "Common signs include blurred or foggy vision, glare around lights when driving at night, faded colors, and frequent changes in eyeglass prescriptions."
      },
      {
        question: "Am I a candidate for LASIK spectacle removal?",
        answer: "Candidates are generally 18 years or older with stable vision for at least one year and adequate corneal thickness, which we assess during pre-LASIK evaluation."
      },
      {
        question: "How do I book an appointment for an eye checkup?",
        answer: "You can book directly using the online form above, call +91 00000 00000, or send a quick WhatsApp message to reserve your preferred time."
      }
    ]
  },

  // 4. ENT (Ear, Nose, Throat) Clinic
  ent: {
    type: "ent",
    name: "ENT & Head-Neck Clinic",
    specialty: "Ear, Nose & Throat (Otorhinolaryngology)",
    doctorDesignation: "Consultant ENT Surgeon & Endoscopist",
    doctorSpecialization: "Ear, Nose & Throat Disorders, Sinus Care & Hearing Health",
    heroTagline: "Specialized ENT Care for",
    heroHighlight: "Clear Breathing, Healthy Hearing",
    heroSubline: "Comprehensive diagnostic and therapeutic ENT care in [CITY]. Advanced endoscopic evaluations, sinus treatments, allergy management, and hearing solutions.",
    heroBadge: "Endoscopic ENT Suite",
    heroOverlayText: "ENT Diagnostic Protocol Active",
    servicesHeading: "ENT Treatments & Clinical Care",
    servicesSubheading: "Specialized care for ear infections, sinus pressure, throat discomfort, and hearing concerns.",
    whyUsExcellence: "Advanced ENT Care",
    whyUsSpectrum: "Full ENT & Sinus Spectrum",
    whyUsAccessible: "Transparent ENT Care",
    consultationTitle: "ENT Consultation",
    consultationDesc: "Includes detailed ear, nose, throat, and vocal examination with video diagnostic assessment.",
    appointmentHeading: "Schedule Your ENT Consultation",
    ctaBadge: "Gentle ENT Care",
    ctaHeading: "Ready for Relief from Ear, Sinus & Throat Concerns?",
    footerTreatmentsHeading: "ENT Treatments",
    defaultShow3D: false,
    services: [
      {
        category: "Clinical ENT",
        name: "ENT Consultation",
        shortDesc: "Comprehensive examination of the ears, nasal passages, throat, and head-and-neck region.",
        fullDesc: "Clinical examination by [DOCTOR NAME] ([QUALIFICATION]) identifying root causes of acute or chronic upper respiratory and auditory complaints.",
        idealFor: "General ear, nose & throat issues",
        featured: false
      },
      {
        category: "Nose & Sinus Care",
        name: "Sinusitis & Allergy Care",
        shortDesc: "Targeted diagnosis and medical relief for chronic sinus congestion, facial pressure, nasal polyps, and rhinitis.",
        fullDesc: "Diagnostic nasal endoscopy and allergy management plans designed to restore clear breathing and alleviate chronic sinus headaches.",
        idealFor: "Sinus pressure, blocked nose & allergies",
        featured: true
      },
      {
        category: "Ear & Auditory Health",
        name: "Ear Infection & Wax Removal",
        shortDesc: "Gentle, painless microsuction ear cleaning and medical management of otitis media and swimmer's ear.",
        fullDesc: "Precise microscopic examination and safe removal of impacted cerumen (wax) and foreign bodies, alleviating earache, fullness, and infection.",
        idealFor: "Ear pain, discharge & blocked feeling",
        featured: false
      },
      {
        category: "Ear & Auditory Health",
        name: "Hearing Evaluation & Audiometry",
        shortDesc: "Comprehensive hearing screening to detect conductive and sensorineural hearing loss across all age groups.",
        fullDesc: "Pure tone audiometry and tympanometry evaluations determining the degree of hearing impairment and counseling for assistive solutions.",
        idealFor: "Difficulty hearing, muffled sound & seniors",
        featured: true
      },
      {
        category: "Throat & Voice Care",
        name: "Throat & Tonsil Care",
        shortDesc: "Clinical evaluation and medical management of recurrent tonsillitis, pharyngitis, and swallowing difficulties.",
        fullDesc: "Assessment of chronic sore throats, tonsil stones, and adenoid hypertrophy with personalized medical or minimally invasive recommendations.",
        idealFor: "Sore throat, difficult swallowing & fever",
        featured: false
      },
      {
        category: "Throat & Voice Care",
        name: "Voice & Hoarseness Assessment",
        shortDesc: "Diagnostic evaluation for persistent hoarseness, vocal cord strain, and chronic throat clearing.",
        fullDesc: "Laryngeal examination for teachers, singers, and professionals experiencing vocal fatigue or long-standing changes in voice pitch.",
        idealFor: "Hoarseness, voice strain & chronic cough",
        featured: true
      },
      {
        category: "Balance & Sleep",
        name: "Vertigo & Dizziness Management",
        shortDesc: "Systematic evaluation and repositioning maneuvers (Epley) for benign paroxysmal positional vertigo (BPPV).",
        fullDesc: "Accurate differential diagnosis between inner ear vestibular causes and systemic dizziness, providing targeted relief maneuvers.",
        idealFor: "Spinning sensations, imbalance & dizziness",
        featured: false
      },
      {
        category: "Balance & Sleep",
        name: "Snoring & Sleep Apnea Triage",
        shortDesc: "Airway evaluation and screening for obstructive sleep apnea, heavy snoring, and daytime fatigue.",
        fullDesc: "Anatomical examination of the palate, uvula, and tongue base to identify physical obstructions contributing to restless sleep.",
        idealFor: "Heavy snoring, mouth breathing & fatigue",
        featured: false
      }
    ],
    faqs: [
      {
        question: "What is the ENT consultation fee?",
        answer: "The consultation fee is [CONSULTATION FEE]. It includes a comprehensive ear, nose, and throat examination by [DOCTOR NAME] ([QUALIFICATION])."
      },
      {
        question: "Where is the ENT clinic located?",
        answer: "The clinic is located at [FULL ADDRESS], [AREA], [CITY], [STATE] – [PINCODE]."
      },
      {
        question: "Is ear wax removal painful?",
        answer: "No, ear wax removal is performed gently using modern microsuction or delicate manual instruments under direct visualization, ensuring complete safety and comfort."
      },
      {
        question: "What causes chronic sinusitis and nasal blockage?",
        answer: "Chronic sinusitis can be triggered by allergies, a deviated nasal septum, nasal polyps, or recurring bacterial infections, all of which are evaluated via nasal endoscopy."
      },
      {
        question: "Can vertigo (spinning sensation) be treated at the clinic?",
        answer: "Yes, inner ear conditions such as BPPV (positional vertigo) can frequently be treated quickly and effectively with canalith repositioning maneuvers during your visit."
      },
      {
        question: "How do I book an ENT appointment?",
        answer: "You can book using the online form above, call +91 00000 00000, or send an enquiry via WhatsApp for swift scheduling."
      }
    ]
  },

  // 5. Orthopedic & Joint Care Clinic
  orthopedic: {
    type: "orthopedic",
    name: "Orthopedic & Joint Care Clinic",
    specialty: "Orthopedics & Joint Health",
    doctorDesignation: "Consultant Orthopedic Surgeon & Joint Specialist",
    doctorSpecialization: "Joint Pain, Spine Disorders, Sports Injuries & Bone Health",
    heroTagline: "Advanced Orthopedic Care for",
    heroHighlight: "Pain-Free Movement & Active Living",
    heroSubline: "Evidence-based orthopedic assessments and non-surgical to surgical joint care in [CITY]. Focused on mobility restoration, arthritis management, and spine health.",
    heroBadge: "Musculoskeletal Diagnostic Suite",
    heroOverlayText: "Mobility Protocol Active",
    servicesHeading: "Orthopedic & Joint Services",
    servicesSubheading: "Restoring strength, flexibility, and painless movement through specialized musculoskeletal care.",
    whyUsExcellence: "Precision Orthopedic Care",
    whyUsSpectrum: "Comprehensive Joint Health",
    whyUsAccessible: "Transparent Bone & Joint Care",
    consultationTitle: "Orthopedic Consultation",
    consultationDesc: "Includes clinical range-of-motion assessment, joint stability examination, and imaging review.",
    appointmentHeading: "Schedule Your Orthopedic Consultation",
    ctaBadge: "Active Mobility Care",
    ctaHeading: "Ready to Move Without Joint & Back Pain?",
    footerTreatmentsHeading: "Orthopedic Treatments",
    defaultShow3D: false,
    services: [
      {
        category: "Clinical Orthopedics",
        name: "Orthopedic Consultation",
        shortDesc: "Thorough musculoskeletal examination, review of X-rays/MRI, and structured recovery roadmap.",
        fullDesc: "Clinical evaluation by [DOCTOR NAME] ([QUALIFICATION]) covering bone, joint, ligament, and spine conditions to pinpoint pain sources.",
        idealFor: "Bone & joint pain evaluation",
        featured: false
      },
      {
        category: "Joint Care & Arthritis",
        name: "Knee Pain & Arthritis Management",
        shortDesc: "Non-surgical, regenerative, and surgical protocols for knee osteoarthritis and cartilage wear.",
        fullDesc: "Multi-tiered approach incorporating lifestyle modification, intra-articular injections, targeted physiotherapy, and joint replacement triage.",
        idealFor: "Knee stiffness, swelling & walking pain",
        featured: true
      },
      {
        category: "Joint Care & Arthritis",
        name: "Hip & Shoulder Joint Care",
        shortDesc: "Specialized assessment for frozen shoulder, rotator cuff tears, bursitis, and hip joint degeneration.",
        fullDesc: "Focused evaluation of joint mechanics, impingement tests, and guided therapy to relieve chronic stiffness and restore arm mobility.",
        idealFor: "Shoulder stiffness & hip discomfort",
        featured: false
      },
      {
        category: "Spine & Back Care",
        name: "Back & Neck Pain Management",
        shortDesc: "Evidence-based management of cervical spondylosis, lumbar disc prolapse, and sciatica nerve pain.",
        fullDesc: "Comprehensive spine screening identifying postural strain, disc herniation, and nerve compression, emphasizing non-operative spine stabilization.",
        idealFor: "Sciatica, slipped disc & chronic back pain",
        featured: true
      },
      {
        category: "Sports Injury & Trauma",
        name: "Sports Injury & Ligament Care",
        shortDesc: "Clinical triage and rehabilitation roadmaps for ACL tears, meniscus sprains, ankle twists, and muscle tears.",
        fullDesc: "Rapid injury assessment for athletes and active individuals to restore athletic conditioning, stability, and prevent re-injury.",
        idealFor: "Ligament sprains & athletic injuries",
        featured: true
      },
      {
        category: "Sports Injury & Trauma",
        name: "Fracture Consultation & Trauma Care",
        shortDesc: "Prompt evaluation of bone fractures, cast immobilization, and post-traumatic healing follow-ups.",
        fullDesc: "Careful radiological evaluation, casting/splinting, and rehabilitation oversight to ensure proper bone union and joint function.",
        idealFor: "Suspected fractures, falls & trauma",
        featured: false
      },
      {
        category: "Preventive Bone Health",
        name: "Osteoporosis & Bone Density Screening",
        shortDesc: "Screening and medical protocols to strengthen fragile bones and prevent debilitating osteoporotic fractures.",
        fullDesc: "Bone health assessment including calcium/vitamin D optimization, DEXA interpretation, and anti-resorptive therapies for seniors.",
        idealFor: "Seniors, post-menopausal women & fracture risk",
        featured: false
      }
    ],
    faqs: [
      {
        question: "What is the orthopedic consultation fee?",
        answer: "The consultation fee is [CONSULTATION FEE]. It covers the clinical joint and mobility examination and X-ray/MRI review by [DOCTOR NAME] ([QUALIFICATION])."
      },
      {
        question: "Where is the clinic located?",
        answer: "The clinic is located at [FULL ADDRESS], [AREA], [CITY], [STATE] – [PINCODE]."
      },
      {
        question: "Can knee pain be treated without surgery?",
        answer: "Yes, many knee pain and mild-to-moderate osteoarthritis cases respond favorably to non-surgical protocols including guided exercise, weight management, and targeted injections."
      },
      {
        question: "When should I consult a doctor for back pain?",
        answer: "You should seek consultation if back pain persists for more than a few days, radiates down your legs (sciatica), or is accompanied by numbness or weakness."
      },
      {
        question: "Do you treat sports injuries?",
        answer: "Yes, we evaluate and treat acute and chronic sports injuries such as ankle sprains, ACL/meniscus injuries, and rotator cuff strains."
      },
      {
        question: "How can I book an orthopedic consultation?",
        answer: "You can book using the appointment form above, call +91 00000 00000, or send an enquiry directly via WhatsApp."
      }
    ]
  },

  // 6. Physiotherapy & Rehabilitation Clinic
  physiotherapy: {
    type: "physiotherapy",
    name: "Physiotherapy & Rehabilitation Clinic",
    specialty: "Physiotherapy & Sports Rehab",
    doctorDesignation: "Lead Physiotherapist & Rehabilitation Specialist",
    doctorSpecialization: "Musculoskeletal Rehabilitation, Spine Care & Sports Physical Therapy",
    heroTagline: "Targeted Physiotherapy for",
    heroHighlight: "Restored Mobility, Strength & Relief",
    heroSubline: "Personalized manual therapy, therapeutic exercise, and advanced electrotherapy in [CITY]. Accelerating recovery from pain, surgery, and sports injuries.",
    heroBadge: "Physical Rehab Protocol Active",
    heroOverlayText: "Movement Analysis Ready",
    servicesHeading: "Physiotherapy & Rehab Programs",
    servicesSubheading: "Evidence-based physical therapy designed to eliminate pain and restore functional movement.",
    whyUsExcellence: "Targeted Physical Therapy",
    whyUsSpectrum: "Full Rehabilitation Spectrum",
    whyUsAccessible: "Transparent Rehab Care",
    consultationTitle: "Physiotherapy Assessment",
    consultationDesc: "Includes comprehensive biomechanical movement screening, muscle strength testing, and custom rehab plan.",
    appointmentHeading: "Schedule Your Physiotherapy Session",
    ctaBadge: "Restorative Physical Therapy",
    ctaHeading: "Ready to Overcome Pain and Reclaim Your Mobility?",
    footerTreatmentsHeading: "Rehab Programs",
    defaultShow3D: false,
    services: [
      {
        category: "Clinical Assessment",
        name: "Physiotherapy Initial Assessment",
        shortDesc: "Biomechanical evaluation, posture screening, muscle testing, and personalized recovery roadmap.",
        fullDesc: "Comprehensive physical examination by [DOCTOR NAME] identifying muscular imbalances, restricted joints, and motor control deficits.",
        idealFor: "Acute or chronic pain evaluation",
        featured: false
      },
      {
        category: "Spine & Pain Relief",
        name: "Cervical & Lumbar Spine Rehab",
        shortDesc: "Specialized physical therapy for neck stiffness, herniated discs, postural strain, and sciatica relief.",
        fullDesc: "McKenzie method, core muscle retraining, and gentle traction techniques designed to decompress spinal nerves and alleviate pain.",
        idealFor: "Neck pain, lower back pain & sciatica",
        featured: true
      },
      {
        category: "Spine & Pain Relief",
        name: "Joint Mobilization & Manual Therapy",
        shortDesc: "Hands-on joint gliding, myofascial release, and trigger point therapy to restore fluid movement.",
        fullDesc: "Expert manual techniques reducing soft tissue restrictions, improving joint lubrication, and accelerating natural tissue healing.",
        idealFor: "Stiff joints, frozen shoulder & muscle spasms",
        featured: false
      },
      {
        category: "Sports & Orthopedic Rehab",
        name: "Sports Injury Rehabilitation",
        shortDesc: "Progressive conditioning, agility drills, and strength recovery following ligament sprains and muscle tears.",
        fullDesc: "Targeted athletic rehabilitation protocols returning runners, gym enthusiasts, and sports players safely to full performance.",
        idealFor: "ACL recovery, ankle sprains & muscle tears",
        featured: true
      },
      {
        category: "Sports & Orthopedic Rehab",
        name: "Post-Surgical Orthopedic Rehab",
        shortDesc: "Structured phase-wise recovery following knee/hip replacement, spine surgery, or fracture repair.",
        fullDesc: "Supervised gentle mobility and progressive loading protocols to rebuild muscle volume and restore independent daily walking.",
        idealFor: "Knee replacement, arthroscopy & fracture post-care",
        featured: true
      },
      {
        category: "Therapeutic Modalities",
        name: "Advanced Electrotherapy & Modalities",
        shortDesc: "TENS, IFT, therapeutic ultrasound, and heat/ice therapies to reduce acute inflammatory pain.",
        fullDesc: "Clinical modalities delivering pain modulation and deep tissue stimulation to facilitate comfortable active exercise therapy.",
        idealFor: "Acute pain flare-ups & inflammation",
        featured: false
      },
      {
        category: "Lifestyle & Ergonomics",
        name: "Posture & Ergonomic Correction",
        shortDesc: "Screen posture analysis, desk setup guidance, and postural corrective exercises for desk workers.",
        fullDesc: "Preventive physical therapy addressing tech-neck, rounded shoulders, and repetitive strain injuries from desk work.",
        idealFor: "Desk workers & chronic posture fatigue",
        featured: false
      }
    ],
    faqs: [
      {
        question: "What is the initial physiotherapy assessment fee?",
        answer: "The initial assessment fee is [CONSULTATION FEE]. It includes a detailed biomechanical evaluation, movement analysis, and a structured recovery plan."
      },
      {
        question: "Where is the physiotherapy clinic located?",
        answer: "The clinic is located at [FULL ADDRESS], [AREA], [CITY], [STATE] – [PINCODE]."
      },
      {
        question: "How many physiotherapy sessions will I need?",
        answer: "The number of sessions depends on the nature and chronicity of your condition. Many acute strains improve within 3 to 6 sessions, while post-surgical rehabilitation typically spans a customized 4 to 8 week program."
      },
      {
        question: "Do I need a doctor's referral for physiotherapy?",
        answer: "A referral is not mandatory. You can consult directly for assessment and treatment of muscular aches, joint stiffness, and sports injuries."
      },
      {
        question: "What should I wear to a physiotherapy appointment?",
        answer: "Wear comfortable, loose-fitting athletic clothing that allows easy movement and direct examination of the affected joint or area."
      },
      {
        question: "How do I book a physiotherapy session?",
        answer: "You can book using the appointment form above, call +91 00000 00000, or send an enquiry via WhatsApp."
      }
    ]
  },

  // 7. General Physician & Family Medicine Clinic
  general: {
    type: "general",
    name: "General Physician & Family Health Clinic",
    specialty: "General & Family Medicine",
    doctorDesignation: "Consultant Physician & Family Health Specialist",
    doctorSpecialization: "Preventive Healthcare, Chronic Disease Management & Primary Care",
    heroTagline: "Trusted Family Healthcare for",
    heroHighlight: "Lifelong Wellness & Preventive Care",
    heroSubline: "Comprehensive medical consultations and compassionate family healthcare in [CITY]. Managing fever, acute infections, lifestyle disorders, and preventive wellness.",
    heroBadge: "Primary Health Screening Active",
    heroOverlayText: "Clinical Health Protocol Ready",
    servicesHeading: "Primary Healthcare & Clinical Services",
    servicesSubheading: "Compassionate, holistic medical care for acute illnesses and long-term health management.",
    whyUsExcellence: "Holistic Family Medicine",
    whyUsSpectrum: "Comprehensive Health Spectrum",
    whyUsAccessible: "Transparent Primary Care",
    consultationTitle: "General Physician Consultation",
    consultationDesc: "Includes vital signs assessment, systemic medical evaluation, diagnostic review, and tailored prescriptions.",
    appointmentHeading: "Schedule Your Doctor Consultation",
    ctaBadge: "Family Health First",
    ctaHeading: "Prioritize Your Health with Trusted Family Medicine",
    footerTreatmentsHeading: "Medical Services",
    defaultShow3D: false,
    services: [
      {
        category: "Primary Care",
        name: "General Medical Consultation",
        shortDesc: "Complete clinical evaluation of physical symptoms, medical history review, and evidence-based prescriptions.",
        fullDesc: "Thorough clinical examination by [DOCTOR NAME] ([QUALIFICATION]) addressing general health complaints, diagnostic workups, and health guidance.",
        idealFor: "General illness & health concerns",
        featured: false
      },
      {
        category: "Acute Illness",
        name: "Fever & Infection Management",
        shortDesc: "Prompt diagnosis and treatment of viral fevers, malaria, dengue, typhoid, and seasonal infections.",
        fullDesc: "Accurate clinical triage, laboratory test coordination, and systematic medical management to accelerate safe recovery from acute infections.",
        idealFor: "Fevers, chills, body aches & weakness",
        featured: true
      },
      {
        category: "Chronic Disease",
        name: "Diabetes & Metabolic Care",
        shortDesc: "Comprehensive blood glucose monitoring, HbA1c control, dietary counseling, and complication prevention.",
        fullDesc: "Holistic management of Type 2 diabetes through customized medical regimens, lifestyle interventions, and organ protection strategies.",
        idealFor: "Diabetes control & lifestyle management",
        featured: true
      },
      {
        category: "Chronic Disease",
        name: "Hypertension & Heart Health",
        shortDesc: "Blood pressure optimization, cardiovascular risk reduction, and kidney-protective medical protocols.",
        fullDesc: "Regular BP monitoring, medication adjustment, and preventive lifestyle recommendations to safeguard heart and brain health.",
        idealFor: "High blood pressure & cardiac screening",
        featured: false
      },
      {
        category: "Chronic Disease",
        name: "Thyroid & Lipid Disorder Care",
        shortDesc: "Diagnostic assessment and hormonal balancing for hypothyroidism, hyperthyroidism, and high cholesterol.",
        fullDesc: "Precision medication titration and lipid management to normalize energy levels, metabolism, and cardiovascular health.",
        idealFor: "Thyroid imbalance & high cholesterol",
        featured: false
      },
      {
        category: "Preventive Care",
        name: "Preventive Health Checkup",
        shortDesc: "Comprehensive routine health screenings to identify silent health risks before symptoms develop.",
        fullDesc: "Annual wellness checkup covering blood pressure, body mass index, organ function panels, and personalized preventive counseling.",
        idealFor: "Annual wellness & early detection",
        featured: true
      },
      {
        category: "Respiratory & Gastro",
        name: "Respiratory & Gastrointestinal Care",
        shortDesc: "Medical management for cough, asthma, bronchitis, acid reflux (GERD), and digestive disturbances.",
        fullDesc: "Systematic care identifying allergic and infectious triggers for chronic cough, acidity, indigestion, and irritable bowel symptoms.",
        idealFor: "Acidity, indigestion & persistent cough",
        featured: false
      }
    ],
    faqs: [
      {
        question: "What is the general consultation fee?",
        answer: "The consultation fee is [CONSULTATION FEE]. It covers the complete clinical evaluation, vitals check, and prescription by [DOCTOR NAME] ([QUALIFICATION])."
      },
      {
        question: "Where is the clinic located?",
        answer: "The clinic is located at [FULL ADDRESS], [AREA], [CITY], [STATE] – [PINCODE]."
      },
      {
        question: "Do you treat acute fevers like dengue or typhoid?",
        answer: "Yes, we provide systematic diagnostic evaluation and medical treatment for acute fevers, including ordering necessary blood tests and monitoring platelet counts and recovery."
      },
      {
        question: "Can I get long-term management for high BP and diabetes?",
        answer: "Yes, regular follow-ups, medication titration, lifestyle counseling, and complication prevention for diabetes and hypertension are central to our practice."
      },
      {
        question: "How can I book an appointment with the doctor?",
        answer: "You can book using the appointment form above, call directly at +91 00000 00000, or send an enquiry via WhatsApp."
      }
    ]
  },

  // 8. Women's Health & Gynecology Clinic
  gynecology: {
    type: "gynecology",
    name: "Women's Health & Gynecology Clinic",
    specialty: "Obstetrics & Gynecology",
    doctorDesignation: "Consultant Obstetrician & Gynecologist",
    doctorSpecialization: "Women's Wellness, Antenatal Care & Hormonal Health",
    heroTagline: "Compassionate Women's Health for",
    heroHighlight: "Complete Wellness at Every Stage",
    heroSubline: "Specialized, confidential gynecological and obstetric care in [CITY]. Dedicated to women's reproductive health, prenatal guidance, and hormonal balance.",
    heroBadge: "Women's Health Suite",
    heroOverlayText: "Clinical Wellness Protocol Active",
    servicesHeading: "Gynecology & Obstetric Services",
    servicesSubheading: "Comprehensive, empathetic healthcare designed specifically for women of all ages.",
    whyUsExcellence: "Dedicated Women's Health",
    whyUsSpectrum: "Full Obstetric & Gynecologic Care",
    whyUsAccessible: "Empathetic & Confidential Care",
    consultationTitle: "Gynecology Consultation",
    consultationDesc: "Includes confidential wellness evaluation, clinical consultation, and tailored treatment planning.",
    appointmentHeading: "Schedule Your Women's Health Consultation",
    ctaBadge: "Empathetic Women's Care",
    ctaHeading: "Compassionate Care for Every Stage of Womanhood",
    footerTreatmentsHeading: "Women's Health Services",
    defaultShow3D: false,
    services: [
      {
        category: "Clinical Gynecology",
        name: "Gynecology Consultation",
        shortDesc: "Confidential clinical examination and evidence-based guidance for routine women's reproductive health.",
        fullDesc: "Compassionate consultation with [DOCTOR NAME] ([QUALIFICATION]) covering menstrual concerns, pelvic discomfort, and general gynecological well-being.",
        idealFor: "Routine checkups & pelvic health",
        featured: false
      },
      {
        category: "Hormonal & Lifestyle",
        name: "PCOS & PCOD Management",
        shortDesc: "Holistic, evidence-based management for irregular cycles, acne, weight changes, and hormonal imbalances.",
        fullDesc: "Targeted medical management combining metabolic optimization, nutritional guidance, and cycle regulation for polycystic ovarian syndrome.",
        idealFor: "Irregular periods, PCOS & facial hair",
        featured: true
      },
      {
        category: "Pregnancy & Maternity",
        name: "Antenatal & Pregnancy Care",
        shortDesc: "Routine prenatal checkups, fetal growth monitoring, and nutritional counseling throughout pregnancy.",
        fullDesc: "Structured trimester-by-trimester care ensuring maternal health, fetal well-being, and safe birth preparation.",
        idealFor: "Expecting mothers & prenatal guidance",
        featured: true
      },
      {
        category: "Menstrual & Pelvic Care",
        name: "Menstrual Irregularity Care",
        shortDesc: "Diagnostic evaluation for heavy bleeding, painful periods (dysmenorrhea), and cycle disruptions.",
        fullDesc: "Identifying underlying causes such as fibroids, adenomyosis, or hormonal shifts to restore painless, regular cycles.",
        idealFor: "Painful, heavy or irregular periods",
        featured: false
      },
      {
        category: "Preventive Care",
        name: "Cervical Screening & Pap Smear",
        shortDesc: "Preventive cervical cancer screening and HPV counseling for long-term health protection.",
        fullDesc: "Quick, routine cervical cell screening providing early detection of abnormal cellular changes before they can progress.",
        idealFor: "Routine women's preventive screening",
        featured: true
      },
      {
        category: "Midlife Wellness",
        name: "Menopause Transition Support",
        shortDesc: "Empathetic medical support for hot flashes, sleep disturbances, mood changes, and bone health.",
        fullDesc: "Comprehensive care navigating perimenopause and menopause through lifestyle adjustments and bone-protective strategies.",
        idealFor: "Perimenopausal & menopausal women",
        featured: false
      }
    ],
    faqs: [
      {
        question: "What is the gynecology consultation fee?",
        answer: "The consultation fee is [CONSULTATION FEE]. It covers a confidential, comprehensive clinical evaluation and treatment plan by [DOCTOR NAME] ([QUALIFICATION])."
      },
      {
        question: "Where is the clinic located?",
        answer: "The clinic is located at [FULL ADDRESS], [AREA], [CITY], [STATE] – [PINCODE]."
      },
      {
        question: "How is PCOS diagnosed and treated?",
        answer: "PCOS is diagnosed through clinical symptoms, hormone profiles, and pelvic ultrasound. Management focuses on cycle regulation, metabolic health, and symptom relief."
      },
      {
        question: "When should women get a Pap smear?",
        answer: "Women aged 21 to 65 are advised to undergo cervical screening every 3 years, or every 5 years when combined with HPV testing."
      },
      {
        question: "How do I book a confidential consultation?",
        answer: "You can book using the form above, call +91 00000 00000, or send an enquiry directly via WhatsApp."
      }
    ]
  },

  // 9. Pediatrics & Child Health Clinic
  pediatrics: {
    type: "pediatrics",
    name: "Children's Health & Pediatric Clinic",
    specialty: "Pediatrics & Child Healthcare",
    doctorDesignation: "Consultant Pediatrician & Child Specialist",
    doctorSpecialization: "Newborn Care, Pediatric Nutrition & Childhood Wellness",
    heroTagline: "Gentle Pediatric Healthcare for",
    heroHighlight: "Healthy Growth & Happy Childhood",
    heroSubline: "Compassionate, friendly child healthcare in [CITY]. Newborn checkups, vaccinations, developmental milestones, and acute infection management.",
    heroBadge: "Pediatric Wellness Suite",
    heroOverlayText: "Child Health Protocol Active",
    servicesHeading: "Pediatric Services & Child Care",
    servicesSubheading: "Gentle and comprehensive healthcare supporting your child's healthy growth and development.",
    whyUsExcellence: "Gentle Child Care",
    whyUsSpectrum: "Comprehensive Pediatric Care",
    whyUsAccessible: "Parent-Centered Guidance",
    consultationTitle: "Pediatric Consultation",
    consultationDesc: "Includes child-friendly physical examination, growth and milestone assessment, and parental guidance.",
    appointmentHeading: "Schedule Your Child's Consultation",
    ctaBadge: "Child-Friendly Care",
    ctaHeading: "Dedicated to the Health and Happiness of Your Child",
    footerTreatmentsHeading: "Pediatric Care",
    defaultShow3D: false,
    services: [
      {
        category: "Primary Pediatric Care",
        name: "Pediatric Consultation",
        shortDesc: "Child-friendly clinical examination addressing acute symptoms, general well-being, and growth tracking.",
        fullDesc: "Gentle, stress-free clinical visit with [DOCTOR NAME] ([QUALIFICATION]) ensuring your child feels safe while addressing parental health concerns.",
        idealFor: "Routine checkups & child illnesses",
        featured: false
      },
      {
        category: "Preventive Immunization",
        name: "Vaccination & Immunization",
        shortDesc: "Complete National & IAP vaccination schedules administered with gentle care and minimal distress.",
        fullDesc: "Essential immunization tracking protecting your child from serious childhood illnesses, complete with vaccination record maintenance.",
        idealFor: "Infants, toddlers & school-age kids",
        featured: true
      },
      {
        category: "Infant Care",
        name: "Newborn & Infant Care",
        shortDesc: "Specialized monitoring for newborn jaundice, breastfeeding guidance, weight gain, and infant colic.",
        fullDesc: "Expert newborn evaluations helping new parents navigate feeding, sleep routines, and normal developmental benchmarks.",
        idealFor: "Newborns & infants under 1 year",
        featured: true
      },
      {
        category: "Acute Pediatric Care",
        name: "Childhood Fever & Infection Care",
        shortDesc: "Prompt clinical assessment for pediatric fevers, earaches, throat infections, and stomach upsets.",
        fullDesc: "Judicious medical management avoiding unnecessary medication while ensuring safe, rapid recovery from common childhood infections.",
        idealFor: "Fever, ear pain, cough & vomiting",
        featured: false
      },
      {
        category: "Allergy & Respiratory",
        name: "Pediatric Asthma & Allergy Care",
        shortDesc: "Management of recurrent wheezing, childhood asthma, seasonal allergies, and skin rashes.",
        fullDesc: "Tailored inhaler guidance, trigger identification, and long-term respiratory plans so your child can play and learn actively without breathing distress.",
        idealFor: "Wheezing, chronic cough & allergies",
        featured: true
      },
      {
        category: "Growth & Nutrition",
        name: "Growth & Milestone Tracking",
        shortDesc: "Regular physical growth percentiles, cognitive milestone evaluations, and pediatric dietary advice.",
        fullDesc: "Monitoring height, weight, and developmental progress to ensure timely intervention if any growth delays are identified.",
        idealFor: "Fussy eaters & milestone screening",
        featured: false
      }
    ],
    faqs: [
      {
        question: "What is the pediatric consultation fee?",
        answer: "The consultation fee is [CONSULTATION FEE]. It includes a comprehensive physical exam, growth monitoring, and guidance by [DOCTOR NAME] ([QUALIFICATION])."
      },
      {
        question: "Where is the pediatric clinic located?",
        answer: "The clinic is located at [FULL ADDRESS], [AREA], [CITY], [STATE] – [PINCODE]."
      },
      {
        question: "Do you follow the IAP vaccination schedule?",
        answer: "Yes, we provide both mandatory and optional vaccines strictly following the Indian Academy of Pediatrics (IAP) guidelines."
      },
      {
        question: "What should I do if my child has a high fever?",
        answer: "Ensure the child is well-hydrated, dress them in light clothing, and consult the clinic promptly for an accurate diagnosis and fever-reduction guidance."
      },
      {
        question: "How do I book an appointment for my child?",
        answer: "You can book using the appointment form above, call +91 00000 00000, or send an enquiry via WhatsApp."
      }
    ]
  },

  // 10. Neurology & Brain Health Clinic
  neurology: {
    type: "neurology",
    name: "Neurology & Brain Health Clinic",
    specialty: "Neurology & Neuro-Care",
    doctorDesignation: "Consultant Neurologist & Neurophysician",
    doctorSpecialization: "Headache Disorders, Epilepsy, Stroke Prevention & Nerve Care",
    heroTagline: "Advanced Neurological Care for",
    heroHighlight: "Optimal Brain & Nerve Health",
    heroSubline: "Expert neurological consultations and diagnostic evaluations in [CITY]. Specialized management for chronic headaches, seizures, neuropathies, and stroke care.",
    heroBadge: "Neurological Diagnostic Protocol",
    heroOverlayText: "Neuro Assessment Ready",
    servicesHeading: "Neurological Care & Clinical Services",
    servicesSubheading: "Specialized clinical diagnosis and long-term care for complex brain, spine, and nerve conditions.",
    whyUsExcellence: "Precision Neurological Care",
    whyUsSpectrum: "Comprehensive Nerve & Brain Care",
    whyUsAccessible: "Transparent Neuro Care",
    consultationTitle: "Neurology Consultation",
    consultationDesc: "Includes thorough neurological physical exam, cranial nerve assessment, reflex testing, and symptom mapping.",
    appointmentHeading: "Schedule Your Neurological Consultation",
    ctaBadge: "Dedicated Neuro Care",
    ctaHeading: "Expert Care for Headaches, Nerves & Neurological Health",
    footerTreatmentsHeading: "Neurology Services",
    defaultShow3D: false,
    services: [
      {
        category: "Clinical Neurology",
        name: "Neurology Consultation",
        shortDesc: "In-depth clinical neurological assessment, cranial nerve testing, and imaging/EEG review.",
        fullDesc: "Specialized clinical evaluation by [DOCTOR NAME] ([QUALIFICATION]) identifying nervous system disorders and formulating structured treatment protocols.",
        idealFor: "Nerve, brain & spine symptom review",
        featured: false
      },
      {
        category: "Headache & Migraine",
        name: "Headache & Migraine Management",
        shortDesc: "Targeted medical management for chronic migraine, tension headaches, and cluster headache disorders.",
        fullDesc: "Systematic identification of headache triggers, acute abortive therapy, and preventive medications to drastically reduce headache frequency.",
        idealFor: "Chronic migraine, severe headaches & nausea",
        featured: true
      },
      {
        category: "Seizure & Epilepsy",
        name: "Epilepsy & Seizure Disorders",
        shortDesc: "Diagnostic classification, EEG coordination, and precision antiepileptic drug (AED) management.",
        fullDesc: "Long-term care aimed at complete seizure freedom with minimal medication side effects and lifestyle counseling.",
        idealFor: "Seizures, convulsions & unexplained blackouts",
        featured: true
      },
      {
        category: "Vascular Neurology",
        name: "Stroke Recovery & Prevention",
        shortDesc: "Secondary stroke prevention, blood pressure and lipid optimization, and neuro-rehabilitation oversight.",
        fullDesc: "Comprehensive risk factor modification and coordinated rehabilitation to restore motor function and prevent recurrent vascular events.",
        idealFor: "Post-stroke patients & high vascular risk",
        featured: false
      },
      {
        category: "Peripheral Nerves",
        name: "Neuropathy & Nerve Pain Care",
        shortDesc: "Clinical evaluation of diabetic peripheral neuropathy, nerve entrapments (carpal tunnel), and burning feet.",
        fullDesc: "Specialized care reducing neuropathic pain, numbness, and tingling while protecting sensory function in extremities.",
        idealFor: "Burning feet, tingling, numbness & nerve pain",
        featured: true
      },
      {
        category: "Movement & Degenerative",
        name: "Tremors & Movement Disorder Care",
        shortDesc: "Clinical evaluation of Parkinson's disease, essential tremors, dystonia, and gait instability.",
        fullDesc: "Medical management to improve motor control, ease muscle stiffness, and maintain functional independence in daily tasks.",
        idealFor: "Hand tremors, slow movement & walking stiffness",
        featured: false
      }
    ],
    faqs: [
      {
        question: "What is the neurology consultation fee?",
        answer: "The consultation fee is [CONSULTATION FEE]. It covers the detailed neurological examination and diagnostic review by [DOCTOR NAME] ([QUALIFICATION])."
      },
      {
        question: "Where is the clinic located?",
        answer: "The clinic is located at [FULL ADDRESS], [AREA], [CITY], [STATE] – [PINCODE]."
      },
      {
        question: "When should I see a neurologist for headaches?",
        answer: "You should seek consultation if headaches are frequent, severe, do not respond to regular painkillers, wake you from sleep, or are accompanied by visual changes or numbness."
      },
      {
        question: "Can diabetic nerve pain (neuropathy) be treated?",
        answer: "Yes, precision medications targeting nerve pain pathways combined with tight glucose control can significantly alleviate burning and tingling sensations in the feet."
      },
      {
        question: "How do I book a neurology consultation?",
        answer: "You can book using the appointment form above, call +91 00000 00000, or send an enquiry via WhatsApp."
      }
    ]
  },

  // 11. Cardiology & Heart Care Clinic
  cardiology: {
    type: "cardiology",
    name: "Cardiology & Heart Care Clinic",
    specialty: "Cardiology & Cardiovascular Medicine",
    doctorDesignation: "Consultant Cardiologist & Heart Specialist",
    doctorSpecialization: "Preventive Cardiology, Hypertension & Heart Disease Management",
    heroTagline: "Comprehensive Heart Care for",
    heroHighlight: "A Stronger, Healthier Heart",
    heroSubline: "Specialized cardiac assessments and preventive cardiovascular medicine in [CITY]. Dedicated to hypertension control, cholesterol management, and long-term heart health.",
    heroBadge: "Cardiovascular Screening Suite",
    heroOverlayText: "Cardiac Diagnostic Protocol Active",
    servicesHeading: "Cardiology Services & Heart Care",
    servicesSubheading: "Advanced cardiac evaluation and preventive protocols to protect and strengthen your cardiovascular system.",
    whyUsExcellence: "Advanced Cardiology Care",
    whyUsSpectrum: "Comprehensive Heart Health",
    whyUsAccessible: "Transparent Cardiac Care",
    consultationTitle: "Cardiology Consultation",
    consultationDesc: "Includes detailed cardiovascular risk assessment, resting ECG review, blood pressure profile, and clinical consultation.",
    appointmentHeading: "Schedule Your Heart Health Consultation",
    ctaBadge: "Dedicated Heart Care",
    ctaHeading: "Protect Your Heart with Expert Cardiovascular Care",
    footerTreatmentsHeading: "Heart Care Services",
    defaultShow3D: false,
    services: [
      {
        category: "Clinical Cardiology",
        name: "Cardiology Consultation",
        shortDesc: "Comprehensive cardiovascular risk assessment, heart sound auscultation, and ECG interpretation.",
        fullDesc: "Clinical evaluation by [DOCTOR NAME] ([QUALIFICATION]) analyzing cardiac risk factors, symptoms of chest tightness, palpitations, and shortness of breath.",
        idealFor: "Cardiac evaluation & second opinions",
        featured: false
      },
      {
        category: "Hypertension & Lipids",
        name: "Hypertension & Blood Pressure Care",
        shortDesc: "Specialized management of resistant high blood pressure to safeguard the heart, brain, and kidneys.",
        fullDesc: "Customized medical therapy, lifestyle guidance, and regular BP monitoring to achieve and sustain target cardiovascular pressures.",
        idealFor: "High blood pressure & cardiovascular risk",
        featured: true
      },
      {
        category: "Hypertension & Lipids",
        name: "Cholesterol & Lipid Management",
        shortDesc: "Advanced lipid panel interpretation, statin optimization, and arterial plaque risk reduction.",
        fullDesc: "Targeted medical management to lower LDL cholesterol, reduce arterial inflammation, and prevent coronary artery disease.",
        idealFor: "High cholesterol & family heart disease history",
        featured: false
      },
      {
        category: "Coronary & Rhythm",
        name: "ECG & Heart Rhythm Assessment",
        shortDesc: "Resting 12-lead electrocardiogram evaluation to detect arrhythmias, conduction blocks, and ischemic changes.",
        fullDesc: "Rapid diagnostic screening for irregular heartbeats (palpitations), bradycardia, tachycardia, and silent ischemic changes.",
        idealFor: "Palpitations, fluttering & skipped beats",
        featured: true
      },
      {
        category: "Coronary & Rhythm",
        name: "Coronary Artery Disease Care",
        shortDesc: "Long-term medical management and lifestyle guidance for patients with angina or prior stenting.",
        fullDesc: "Evidence-based medical optimization ensuring optimal blood flow, symptom prevention, and post-angioplasty wellness.",
        idealFor: "Angina, prior stent or bypass patients",
        featured: true
      },
      {
        category: "Preventive Cardiology",
        name: "Preventive Heart Health Screening",
        shortDesc: "Complete cardiovascular wellness screening to identify early arterial disease in high-risk individuals.",
        fullDesc: "Multi-parameter risk stratification combining family history, blood pressure, lipids, and lifestyle factors to safeguard heart health.",
        idealFor: "Individuals aged 35+ & family history",
        featured: false
      }
    ],
    faqs: [
      {
        question: "What is the cardiology consultation fee?",
        answer: "The consultation fee is [CONSULTATION FEE]. It covers the clinical cardiovascular examination, ECG review, and personalized management plan by [DOCTOR NAME] ([QUALIFICATION])."
      },
      {
        question: "Where is the clinic located?",
        answer: "The clinic is located at [FULL ADDRESS], [AREA], [CITY], [STATE] – [PINCODE]."
      },
      {
        question: "What are the common warning signs of heart trouble?",
        answer: "Warning signs include chest discomfort or pressure, breathlessness on exertion, palpitations, uncharacteristic fatigue, and dizziness. Immediate evaluation is recommended if these occur."
      },
      {
        question: "How can I reduce my risk of coronary heart disease?",
        answer: "Key preventive steps include maintaining optimal blood pressure, keeping LDL cholesterol within safe limits, regular aerobic exercise, smoking cessation, and stress management."
      },
      {
        question: "How do I schedule a cardiology consultation?",
        answer: "You can book using the appointment form above, call +91 00000 00000, or send an enquiry via WhatsApp."
      }
    ]
  }
};

// =====================================================================
// 2. MASTER CLINIC CONFIGURATION (Single Source of Truth)
// =====================================================================
const CLINIC_CONFIG = {
  // Category / Specialty Setting (Change type here to switch specialty)
  category: {
    type: "dental"           // "dental" (default), "dermatology", "ophthalmology", "ent", "orthopedic",
                             // "physiotherapy", "general", "gynecology", "pediatrics", "neurology", "cardiology"
  },

  // Clinic Branding & Identity
  clinic: {
    name: "[CLINIC NAME]",
    shortName: "[CLINIC NAME]",
    altName: "[CLINIC NAME]",
    tagline: "Complete Dental Care for a",
    taglineHighlight: "Healthier, Confident Smile",
    subline: "Personalized, ethical dental care for individuals and families in [CITY]. Comprehensive diagnostics, advanced implant procedures, and gentle restorative treatments.",
    logoText: "[CLINIC NAME]",
    logoSubtext: "Dental Care & Implant Centre"
  },

  // Central Asset & Media Configuration
  assets: {
    logo: "",              // Relative path e.g. "assets/logo/logo.png" (Empty string triggers luxury SVG logo)
    doctorImage: "",       // Relative path e.g. "assets/doctor/doctor.jpg" (Empty string triggers avatar placeholder)
    heroImage: "",         // Relative path e.g. "assets/clinic/hero.jpg" (Used when show3D is false)
    clinicExterior: "",    // Relative path e.g. "assets/clinic/exterior.jpg"
    clinicInterior: "",    // Relative path e.g. "assets/clinic/interior.jpg"
    teamImage: ""          // Relative path e.g. "assets/general/team.jpg"
  },

  // Primary Doctor Credentials & Bio
  doctor: {
    name: "[DOCTOR NAME]",
    shortName: "[DOCTOR NAME]",
    qualification: "[QUALIFICATION]",
    designation: "[DESIGNATION]",
    specialization: "[SPECIALIZATION]",
    experience: "[EXPERIENCE]",
    languages: ["English", "Hindi", "Local Language"],
    languagesDisplay: "Eng • Hin • Local",
    languagesList: "English, Hindi, and regional languages",
    bio: "With over [EXPERIENCE] in clinical practice, [DOCTOR NAME] ([QUALIFICATION]) provides comprehensive healthcare to patients across [CITY]. The practice is centered around patient comfort, clear diagnosis, and treatment plans tailored to each individual's health requirements. [DOCTOR NAME] conducts consultations with dedicated attention, ensuring patients feel completely heard and comfortable discussing their symptoms and treatment choices.",
    image: "" // Optional URL or local path to doctor portrait
  },

  // Contact Information
  contact: {
    phone: "+91 00000 00000",
    phoneDisplay: "+91 00000 00000",
    whatsapp: "910000000000",
    email: "" // Optional clinic email address
  },

  // Clinic Physical Location & Navigation
  location: {
    address: "[FULL ADDRESS], [AREA], [CITY], [STATE] - [PINCODE]",
    line1: "[FULL ADDRESS]",
    line2: "[AREA]",
    landmark: "[LANDMARK]",
    city: "[CITY]",
    state: "[STATE]",
    pincode: "[PINCODE]",
    country: "India",
    clinicBranch: "[BRANCH NAME]",
    areaCity: "[AREA] and [CITY]",
    timingsSummary: "Mon–Sat: 9:30 AM – 1:30 PM & 5:00 PM – 9:00 PM",
    footerAddress: "[FULL ADDRESS], [AREA], [CITY], [STATE] – [PINCODE].",
    mapsUrl: "https://maps.google.com/?q=[FULL+ADDRESS]+[CITY]"
  },

  // Pricing Information
  pricing: {
    consultationFee: "[CONSULTATION FEE]",
    consultationNote: "Per Visit • Includes comprehensive clinical checkup & diagnosis"
  },

  // Patient Ratings & Social Proof
  socialProof: {
    rating: "4.9★",
    scale: "4.9 / 5",
    reviewCount: "500+ Patient Reviews",
    badge: "Highest Patient-Rated Clinic in [AREA]"
  },

  // Weekly Consultation Schedule
  timings: [
    { label: "Monday – Saturday (Morning)", time: "9:30 AM – 1:30 PM", closed: false },
    { label: "Monday – Saturday (Evening)", time: "5:00 PM – 9:00 PM", closed: false },
    { label: "Sunday", time: "Closed", closed: true }
  ],

  // Representative Patient Testimonials
  testimonials: [
    {
      author: "[PATIENT NAME 1]",
      location: "[LOCAL AREA]",
      rating: "★★★★★",
      comment: "Highly professional and gentle consultation. [DOCTOR NAME] explained the treatment procedure thoroughly and ensured complete comfort throughout the visit."
    },
    {
      author: "[PATIENT NAME 2]",
      location: "[LOCAL AREA]",
      rating: "★★★★★",
      comment: "Very clean and modern clinic facility in [CITY]. The appointment was on time and the diagnosis was clear, transparent, and honest."
    },
    {
      author: "[PATIENT NAME 3]",
      location: "[LOCAL AREA]",
      rating: "★★★★★",
      comment: "Exceptional clinical care and very polite staff. I felt well-cared for from the moment I entered the clinic. Highly recommended for families."
    }
  ],

  // Optional Section Visibility Flags
  sections: {
    // show3D: undefined (by default follows category.defaultShow3D: true for dental, false for others)
    showPricing: true,
    showDoctor: true,
    showReviews: true,
    showTestimonials: true,
    showFaq: true,
    showDemoBar: false
  },

  // SEO & OpenGraph Meta
  seo: {
    title: "[CLINIC NAME] | [SPECIALIZATION] | [CITY]",
    description: "[CLINIC NAME] in [CITY], led by [DOCTOR NAME], [QUALIFICATION] ([EXPERIENCE]). Comprehensive clinical care and personalized healthcare."
  }
};

// =====================================================================
// 3. DYNAMIC CATEGORY RESOLVER ENGINE
// =====================================================================
function resolveClinicConfig(config) {
  const activeType = (config.category && config.category.type) ? config.category.type : "dental";
  const catDef = CLINIC_CATEGORIES[activeType] || CLINIC_CATEGORIES["dental"];

  // Merge category definitions
  config.category = Object.assign({}, catDef, config.category || {});
  if (!config.category.name || (activeType !== 'dental' && config.category.name === 'Dental Clinic')) {
    config.category.name = catDef.name;
    config.category.specialty = catDef.specialty;
  }

  // Dynamic services & FAQs based on active category
  config.services = catDef.services || [];
  config.faqs = catDef.faqs || [];

  // Adapt hero copywriting to the active category
  config.clinic.tagline = catDef.heroTagline;
  config.clinic.taglineHighlight = catDef.heroHighlight;
  config.clinic.subline = catDef.heroSubline;
  if (!config.doctor.designation || config.doctor.designation === "[DESIGNATION]") {
    config.doctor.designation = catDef.doctorDesignation;
  }
  if (!config.doctor.specialization || config.doctor.specialization === "[SPECIALIZATION]") {
    config.doctor.specialization = catDef.doctorSpecialization;
  }

  // Backward compatibility root aliases
  config.name = config.clinic.name;
  config.altName = config.clinic.altName;
  config.tagline = config.clinic.tagline;
  config.subline = config.clinic.subline;
  config.phone = config.contact.phone;
  config.whatsappNumber = config.contact.whatsapp;
  config.mapsUrl = config.location.mapsUrl;
  config.consultationFee = config.pricing.consultationFee;
  config.ratings = config.socialProof;
  config.address = config.location;

  // Template helper getters
  config.doctor.titleAndQual = \`\${config.doctor.name} (\${config.doctor.qualification})\`;
  config.doctor.roleSubtitle = \`\${config.doctor.qualification} • \${config.doctor.designation}\`;
  config.pricing.consultationFeeShort = \`\${config.pricing.consultationFee}\`;

  return config;
}

// Resolve initial configuration
resolveClinicConfig(CLINIC_CONFIG);

// Expose on window in browser and module.exports in Node.js
if (typeof window !== 'undefined') {
  window.CLINIC_CATEGORIES = CLINIC_CATEGORIES;
  window.CLINIC_CONFIG = CLINIC_CONFIG;
  window.resolveClinicConfig = resolveClinicConfig;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CLINIC_CONFIG,
    CLINIC_CATEGORIES,
    resolveClinicConfig
  };
}
`;

fs.writeFileSync(path.join(__dirname, '../config/clinic-data.js'), generatorScript.trim() + '\n', 'utf8');
console.log('Successfully written updated config/clinic-data.js');
