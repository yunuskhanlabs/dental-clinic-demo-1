const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\\\Users\\\\AMIRULLAH\\\\AppData\\\\Local\\\\ms-playwright\\\\chromium-1234\\\\chrome-win64\\\\chrome.exe';
const workspaceDir = path.resolve(__dirname, '..');
const clinicDataPath = path.join(workspaceDir, 'config', 'clinic-data.js');
const HTTP_PORT = 8115;
const CDP_PORT = 9245;
const SITE_URL = `http://127.0.0.1:${HTTP_PORT}/index.html`;

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(workspaceDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.css') contentType = 'text/css';
    else if (ext === '.json') contentType = 'application/json';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg') contentType = 'image/jpeg';
    else if (ext === '.svg') contentType = 'image/svg+xml';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
    });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const defaultConfigFile = fs.readFileSync(clinicDataPath, 'utf8');

function setCategory(catType) {
  let content = fs.readFileSync(clinicDataPath, 'utf8');
  content = content.replace(/type:\s*["'][a-zA-Z0-9_-]+["']/g, `type: "${catType}"`);
  fs.writeFileSync(clinicDataPath, content, 'utf8');
}

function restoreDefaultConfig() {
  fs.writeFileSync(clinicDataPath, defaultConfigFile, 'utf8');
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.consoleErrors = [];

    this.ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && this.pending.has(data.id)) {
        const { resolve, reject } = this.pending.get(data.id);
        this.pending.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      } else if (data.method) {
        if (data.method === 'Runtime.consoleAPICalled' && data.params.type === 'error') {
          const text = data.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ');
          this.consoleErrors.push(text);
        } else if (data.method === 'Runtime.exceptionThrown') {
          this.consoleErrors.push(data.params.exceptionDetails.text + ' ' + (data.params.exceptionDetails.exception?.description || ''));
        }
      }
    };
  }

  async send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result ? res.result.value : undefined;
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runStep5QA() {
  await new Promise(r => server.listen(HTTP_PORT, r));
  console.log(`[HTTP Server] Serving at ${SITE_URL}`);

  const chromeProcess = spawn(chromePath, [
    `--remote-debugging-port=${CDP_PORT}`,
    '--headless=new',
    '--disable-gpu-shader-disk-cache',
    '--no-first-run',
    '--no-default-browser-check',
    '--ignore-gpu-blocklist',
    '--enable-webgl',
    '--use-gl=angle',
    '--window-size=1440,900',
    'about:blank'
  ], { stdio: 'ignore' });

  let cdp;
  let overallPass = true;

  try {
    await sleep(1500);

    const targets = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${CDP_PORT}/json`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });

    const pageTarget = targets.find(t => t.type === 'page');
    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await new Promise(r => cdp.ws.onopen = r);

    await cdp.send('Runtime.enable');
    await cdp.send('Page.enable');
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });

    async function navigateAndWait(url) {
      let loadFired = false;
      const handler = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.method === 'Page.loadEventFired') loadFired = true;
      };
      cdp.ws.addEventListener('message', handler);
      await cdp.send('Page.navigate', { url });
      let waits = 0;
      while (!loadFired && waits < 30) {
        await sleep(100);
        waits++;
      }
      cdp.ws.removeEventListener('message', handler);
      await sleep(500);
    }

    console.log("\n=======================================================");
    console.log("STEP 5: UNIVERSAL CLINIC CATEGORY REAL CHROME QA");
    console.log("=======================================================");

    const categoriesToTest = [
      {
        type: 'dental',
        expected3D: true,
        expectedHighlight: 'Healthier, Confident Smile',
        sampleService: 'Dental Implants',
        sampleFaq: 'dental implants'
      },
      {
        type: 'dermatology',
        expected3D: false,
        expectedHighlight: 'Healthy Skin, Confident You',
        sampleService: 'Acne & Scar Treatment',
        sampleFaq: 'acne and acne scars'
      },
      {
        type: 'ophthalmology',
        expected3D: false,
        expectedHighlight: 'Clear Vision, Better Life',
        sampleService: 'Cataract Screening & Evaluation',
        sampleFaq: 'cataract'
      },
      {
        type: 'ent',
        expected3D: false,
        expectedHighlight: 'Clear Breathing, Healthy Hearing',
        sampleService: 'Sinusitis & Allergy Care',
        sampleFaq: 'sinusitis'
      },
      {
        type: 'physiotherapy',
        expected3D: false,
        expectedHighlight: 'Restored Mobility, Strength & Relief',
        sampleService: 'Cervical & Lumbar Spine Rehab',
        sampleFaq: 'physiotherapy'
      }
    ];

    const viewports = [
      { width: 1440, height: 900, name: '1440px Desktop' },
      { width: 1024, height: 768, name: '1024px Tablet/Small Desktop' },
      { width: 768, height: 1024, name: '768px Tablet Portrait' },
      { width: 390, height: 844, name: '390px Mobile iPhone 14' },
      { width: 375, height: 667, name: '375px Mobile Small' }
    ];

    for (const testCat of categoriesToTest) {
      console.log(`\n-------------------------------------------------------`);
      console.log(`TESTING CATEGORY: [${testCat.type.toUpperCase()}]`);
      console.log(`-------------------------------------------------------`);

      setCategory(testCat.type);
      cdp.consoleErrors = [];

      await navigateAndWait(SITE_URL + `?t=${Date.now()}`);

      const state = await cdp.eval(`({
        categoryType: CLINIC_CONFIG.category?.type,
        categoryName: CLINIC_CONFIG.category?.name,
        heroHighlight: document.querySelector('[data-bind="clinic.taglineHighlight"]')?.textContent,
        is3DCanvasHidden: document.getElementById('dental3dCanvas')?.classList.contains('hidden'),
        isHeroPlaceholderVisible: !document.getElementById('heroFallbackPlaceholder')?.classList.contains('hidden'),
        servicesCount: document.querySelectorAll('#servicesCategoriesContainer .glass-panel').length,
        featuredCount: document.querySelectorAll('#featuredServicesContainer .group').length,
        servicesSample: Array.from(document.querySelectorAll('#servicesCategoriesContainer h4')).map(el => el.textContent.trim()),
        dropdownOptions: Array.from(document.getElementById('treatmentReason')?.options || []).map(o => o.text.trim()),
        faqCount: document.querySelectorAll('#faqAccordion button').length,
        faqSample: Array.from(document.querySelectorAll('#faqAccordion button span:first-child')).map(el => el.textContent.trim()),
        footerTreatments: Array.from(document.querySelectorAll('#footerTreatmentsList li a')).map(el => el.textContent.trim())
      })`);

      console.log(`Active Category in DOM: ${state.categoryType} (${state.categoryName})`);
      console.log(`Hero Tagline Highlight: "${state.heroHighlight}"`);
      console.log(`3D Canvas Hidden: ${state.is3DCanvasHidden} | Hero Card Visible: ${state.isHeroPlaceholderVisible}`);
      console.log(`Services Rendered: Catalog=${state.servicesCount}, Featured=${state.featuredCount}`);
      console.log(`Appointment Dropdown Options: ${state.dropdownOptions.length}`);
      console.log(`FAQ Items: ${state.faqCount}`);
      console.log(`Footer Treatments: [${state.footerTreatments.slice(0, 3).join(', ')}...]`);

      // Verify specific category content
      const heroMatch = state.heroHighlight && state.heroHighlight.includes(testCat.expectedHighlight);
      const is3DValid = testCat.expected3D
        ? (!state.is3DCanvasHidden && !state.isHeroPlaceholderVisible)
        : (state.is3DCanvasHidden && state.isHeroPlaceholderVisible);
      const hasService = state.servicesSample.some(s => s.toLowerCase().includes(testCat.sampleService.toLowerCase()));
      const hasDropdown = state.dropdownOptions.some(o => o.toLowerCase().includes(testCat.sampleService.toLowerCase()));
      const hasFaq = state.faqSample.some(f => f.toLowerCase().includes(testCat.sampleFaq.toLowerCase()));

      console.log(`  ✓ Hero Highlight Match: ${heroMatch ? 'PASS' : 'FAIL'}`);
      console.log(`  ✓ Hero Visual 3D/Fallback State: ${is3DValid ? 'PASS' : 'FAIL'} (Expected 3D=${testCat.expected3D})`);
      console.log(`  ✓ Catalog contains "${testCat.sampleService}": ${hasService ? 'PASS' : 'FAIL'}`);
      console.log(`  ✓ Dropdown contains "${testCat.sampleService}": ${hasDropdown ? 'PASS' : 'FAIL'}`);
      console.log(`  ✓ FAQs contain "${testCat.sampleFaq}": ${hasFaq ? 'PASS' : 'FAIL'}`);

      if (!heroMatch || !is3DValid || !hasService || !hasDropdown || !hasFaq) {
        console.error(`  [FAIL] Verification failed for category: ${testCat.type}`);
        overallPass = false;
      }

      // Responsive Check across viewports
      console.log(`  Checking Responsive Viewports:`);
      for (const vp of viewports) {
        await cdp.send('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.width < 768
        });
        await sleep(150);

        const overflow = await cdp.eval(`({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth
        })`);

        if (overflow.hasOverflow) {
          console.error(`    [FAIL] Overflow at ${vp.name}: scrollWidth=${overflow.scrollWidth} > innerWidth=${overflow.innerWidth}`);
          overallPass = false;
        } else {
          console.log(`    [PASS] ${vp.name} (${overflow.scrollWidth}px <= ${overflow.innerWidth}px)`);
        }
      }

      // Console error check
      if (cdp.consoleErrors.length > 0) {
        console.error(`  [FAIL] Console errors:`, cdp.consoleErrors);
        overallPass = false;
      } else {
        console.log(`  [PASS] 0 Console errors / uncaught exceptions`);
      }
    }

    console.log(`\n=======================================================`);
    if (overallPass) {
      console.log("FINAL QA RESULT: ALL CATEGORIES & VIEWPORTS PASSED (0 ERRORS, 0 OVERFLOW)");
    } else {
      console.log("FINAL QA RESULT: SOME CHECKS FAILED");
    }
    console.log("=======================================================");

  } catch (e) {
    console.error("Test execution exception:", e);
    overallPass = false;
  } finally {
    restoreDefaultConfig();
    console.log("\n[Reset] Restored default configuration: category.type = 'dental'");
    if (chromeProcess) chromeProcess.kill();
    server.close();
    process.exit(overallPass ? 0 : 1);
  }
}

runStep5QA();
