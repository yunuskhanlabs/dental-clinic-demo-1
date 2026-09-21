const { CLINIC_CONFIG, CLINIC_CATEGORIES, resolveClinicConfig } = require('../config/clinic-data.js');

console.log("Supported categories in CLINIC_CATEGORIES:", Object.keys(CLINIC_CATEGORIES));

const requiredCategories = [
  "dental",
  "dermatology",
  "ophthalmology",
  "ent",
  "orthopedic",
  "physiotherapy",
  "general",
  "gynecology",
  "pediatrics",
  "neurology",
  "cardiology"
];

for (const catId of requiredCategories) {
  if (!CLINIC_CATEGORIES[catId]) {
    console.error(`ERROR: Missing category definition for: ${catId}`);
    process.exit(1);
  }
  
  // Test resolving config with this category
  const testConf = JSON.parse(JSON.stringify(CLINIC_CONFIG));
  testConf.category = { type: catId };
  resolveClinicConfig(testConf);

  const featured = testConf.services.filter(s => s.featured);
  console.log(`[PASS] ${catId.padEnd(14)} -> Services: ${testConf.services.length}, Featured: ${featured.length}, FAQs: ${testConf.faqs.length}, 3D: ${testConf.category.defaultShow3D}`);
}

console.log("\nALL 11 CATEGORIES RESOLVED SUCCESSFULLY!");
