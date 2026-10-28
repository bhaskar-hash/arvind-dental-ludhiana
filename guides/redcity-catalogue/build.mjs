#!/usr/bin/env node
import { execFileSync, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const catalogueDir = __dirname;
const cardsDir = path.join(catalogueDir, "cards");
const publicDir = path.join(root, "apps/web/public");

if (!fs.existsSync(cardsDir)) fs.mkdirSync(cardsDir, { recursive: true });

const catalogue = JSON.parse(fs.readFileSync(path.join(catalogueDir, "catalogue.json"), "utf8"));

const ARTWORK_MAP = {
  "photo-review": "ai/catalogue/photo-review.jpg",
  "checkup": "ai/catalogue/checkup.jpg",
  "cleaning": "ai/catalogue/cleaning.jpg",
  "digital-xray": "ai/catalogue/digital-xray.jpg",
  "dental-implants": "ai/catalogue/implants.jpg",
  "dentures-bridges": "ai/treatments/dentures-bridges.jpg",
  "full-mouth-rehabilitation": "ai/catalogue/full-mouth-rehabilitation.jpg",
  "root-canal-treatment": "ai/treatments/root-canal-treatment.jpg",
  "crowns": "ai/treatments/crowns.jpg",
  "emergency-dental-care": "ai/treatments/emergency-dental-care.jpg",
  "laser-dentistry": "ai/treatments/laser-dentistry.jpg",
  "veneers": "ai/treatments/veneers.jpg",
  "teeth-whitening": "ai/treatments/teeth-whitening.jpg",
  "smile-makeover": "ai/catalogue/smile-makeover.jpg",
  "paediatric-dentistry": "ai/treatments/paediatric-dentistry.jpg",
  "membership-basic": "ai/catalogue/membership.jpg",
  "membership-advanced": "ai/catalogue/membership.jpg",
  "membership-pro": "ai/catalogue/membership.jpg",
  "membership-family": "ai/catalogue/membership-family.jpg",
  "meet-dr-sahu": "dr-arvind-sahu.jpg",
  "cover": "ai/catalogue/cover.jpg"
};

function getFileUrl(relPath) {
  return "file://" + path.join(publicDir, relPath);
}

// -------------------------------------------------------------
// 5A. Generate HTML for the 19 Service Cards
// -------------------------------------------------------------
function renderServiceCardHtml(item) {
  const artworkRel = ARTWORK_MAP[item.id] || "dr-arvind-sahu.jpg";
  const artworkUrl = getFileUrl(artworkRel);
  const logoUrl = getFileUrl("redcity-logo.png");

  const isPriceAfterExam = item.price === "Price after examination";
  const priceColor = isPriceAfterExam ? "#5E5456" : "#A61C2E";
  const priceWeight = isPriceAfterExam ? 600 : 700;
  const priceSize = isPriceAfterExam ? "28px" : "34px";

  const badgeHtml = item.badge
    ? `<div class="badge">${item.badge}</div>`
    : "";

  const priceAltHtml = item.priceAlt
    ? `<div class="price-alt">${item.priceAlt}</div>`
    : "";

  const fineHtml = item.fine
    ? `<div class="fine">${item.fine}</div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${item.name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Gurmukhi:wght@500&family=Roboto+Slab:wght@700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 1080px; height: 1080px; overflow: hidden; background: #FBF6F4; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
    .card { width: 1080px; height: 1080px; position: relative; background: #FBF6F4; }
    
    .artwork {
      width: 1080px;
      height: 560px;
      object-fit: cover;
      object-position: center 45%;
      display: block;
    }
    
    .badge {
      position: absolute;
      top: calc(560px - 22px);
      left: 32px;
      background: #D4AF37;
      color: #2B0A0F;
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 24px;
      padding: 10px 22px;
      border-radius: 999px;
      z-index: 10;
      box-shadow: 0 4px 12px rgba(43, 10, 15, 0.15);
      line-height: 1;
    }
    
    .text-panel {
      position: absolute;
      top: 560px;
      left: 0;
      width: 1080px;
      height: 424px;
      background: #FFFFFF;
      padding: 44px 56px;
      display: flex;
      flex-direction: column;
    }
    
    .name {
      font-family: 'Roboto Slab', serif;
      font-weight: 800;
      font-size: 58px;
      line-height: 1.08;
      color: #1F1718;
      max-height: 126px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .line {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 29px;
      line-height: 1.25;
      color: #5E5456;
      margin-top: 14px;
      max-height: 74px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .price-row {
      margin-top: 20px;
    }
    
    .price {
      font-family: 'Inter', sans-serif;
      font-weight: ${priceWeight};
      font-size: ${priceSize};
      color: ${priceColor};
      line-height: 1.2;
    }
    
    .price-alt {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 22px;
      color: #5E5456;
      margin-top: 6px;
      line-height: 1.2;
    }
    
    .fine {
      position: absolute;
      bottom: 24px;
      left: 56px;
      right: 56px;
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 18px;
      line-height: 1.35;
      color: #5E5456;
      max-height: 50px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .footer-bar {
      position: absolute;
      top: 984px;
      left: 0;
      width: 1080px;
      height: 96px;
      background: #2B0A0F;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 48px;
    }
    
    .logo-tile {
      background: #FFFFFF;
      border-radius: 10px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 56px;
    }
    
    .logo-tile img {
      height: 40px;
      width: auto;
      display: block;
    }
    
    .doctor-center {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 22px;
      color: #FFFFFF;
    }
    
    .phone-right {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 26px;
      color: #F2D98A;
      display: flex;
      align-items: center;
      gap: 6px;
    }
  </style>
</head>
<body>
  <div class="card">
    <img class="artwork" src="${artworkUrl}" alt="${item.name}">
    ${badgeHtml}
    <div class="text-panel">
      <div class="name">${item.name}</div>
      <div class="line">${item.line}</div>
      <div class="price-row">
        <div class="price">${item.price}</div>
        ${priceAltHtml}
      </div>
      ${fineHtml}
    </div>
    <div class="footer-bar">
      <div class="logo-tile">
        <img src="${logoUrl}" alt="RedCity Dental">
      </div>
      <div class="doctor-center">Dr. Arvind Sahu · MDS (Prosthodontics)</div>
      <div class="phone-right">📞 76268 58230</div>
    </div>
  </div>
</body>
</html>`;
}

// -------------------------------------------------------------
// 5A. Generate HTML for "Meet Dr. Sahu" Card
// -------------------------------------------------------------
function renderMeetDrSahuCardHtml(doctorData) {
  const portraitUrl = getFileUrl("dr-arvind-sahu.jpg");
  const logoUrl = getFileUrl("redcity-logo.png");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Meet Dr. Arvind Sahu</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Gurmukhi:wght@500;600&family=Roboto+Slab:wght@700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 1080px; height: 1080px; overflow: hidden; background: #2B0A0F; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
    .card { width: 1080px; height: 1080px; position: relative; background: #2B0A0F; color: #FFFFFF; }
    
    .content-area {
      position: absolute;
      top: 0;
      left: 0;
      width: 1080px;
      height: 984px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 64px 0 64px;
    }
    
    .left-col {
      width: 480px;
    }
    
    .title {
      font-family: 'Roboto Slab', serif;
      font-weight: 800;
      font-size: 60px;
      line-height: 1.12;
      color: #FFFFFF;
    }
    
    .credentials {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 24px;
      color: #F2D98A;
      margin-top: 14px;
      line-height: 1.3;
    }
    
    .role {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 26px;
      color: rgba(255, 255, 255, 0.82);
      margin-top: 8px;
      line-height: 1.3;
    }
    
    .gold-rule {
      width: 60px;
      height: 3px;
      background: #D4AF37;
      margin: 28px 0 22px;
      border-radius: 2px;
    }
    
    .punjabi-quote {
      font-family: 'Noto Sans Gurmukhi', sans-serif;
      font-weight: 500;
      font-size: 30px;
      line-height: 1.5;
      color: #FFFFFF;
    }
    
    .right-col {
      width: 420px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .portrait {
      width: 420px;
      height: 566px;
      object-fit: cover;
      object-position: center 20%;
      border-radius: 24px;
      border: 2px solid #D4AF37;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
      display: block;
    }
    
    .footer-bar {
      position: absolute;
      top: 984px;
      left: 0;
      width: 1080px;
      height: 96px;
      background: #1F070A;
      border-top: 1px solid rgba(212, 175, 55, 0.25);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 48px;
    }
    
    .logo-tile {
      background: #FFFFFF;
      border-radius: 10px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 56px;
    }
    
    .logo-tile img {
      height: 40px;
      width: auto;
      display: block;
    }
    
    .doctor-center {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 22px;
      color: #FFFFFF;
    }
    
    .phone-right {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 26px;
      color: #F2D98A;
      display: flex;
      align-items: center;
      gap: 6px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="content-area">
      <div class="left-col">
        <div class="title">${doctorData.title}</div>
        <div class="credentials">${doctorData.credentials}</div>
        <div class="role">${doctorData.role}</div>
        <div class="gold-rule"></div>
        <div class="punjabi-quote">${doctorData.quote}</div>
      </div>
      <div class="right-col">
        <img class="portrait" src="${portraitUrl}" alt="Dr. Arvind Sahu">
      </div>
    </div>
    <div class="footer-bar">
      <div class="logo-tile">
        <img src="${logoUrl}" alt="RedCity Dental">
      </div>
      <div class="doctor-center">Dr. Arvind Sahu · MDS (Prosthodontics)</div>
      <div class="phone-right">📞 76268 58230</div>
    </div>
  </div>
</body>
</html>`;
}

// -------------------------------------------------------------
// 5B. Generate HTML for the 9-Page PDF Catalogue
// -------------------------------------------------------------
function renderPdfCatalogueHtml() {
  const logoFullUrl = getFileUrl("redcity-logo-full.png");
  const logoSmallUrl = getFileUrl("redcity-logo.png");
  const coverArtUrl = getFileUrl("ai/catalogue/cover.jpg");
  const portraitUrl = getFileUrl("dr-arvind-sahu.jpg");
  const exteriorUrl = getFileUrl("clinic-exterior.jpg");

  const getItem = (id) => catalogue.items.find((x) => x.id === id);

  function treatmentCardHtml(id) {
    const item = getItem(id);
    if (!item) return "";
    const artRel = ARTWORK_MAP[item.id] || "dr-arvind-sahu.jpg";
    const artUrl = getFileUrl(artRel);
    const badge = item.badge ? `<span class="badge-mini">${item.badge}</span>` : "";
    const fine = item.fine ? `<div class="card-fine">${item.fine}</div>` : "";

    return `
      <div class="pdf-item">
        <div class="pdf-item-art">
          <img src="${artUrl}" alt="${item.name}">
          ${badge}
        </div>
        <div class="pdf-item-body">
          <div class="pdf-item-head">
            <h3 class="pdf-item-title">${item.name}</h3>
            <span class="pdf-item-price">${item.price}</span>
          </div>
          <p class="pdf-item-desc">${item.description}</p>
          ${fine}
        </div>
      </div>
    `;
  }

  const footerHtml = `
    <footer class="pdf-footer">
      <span>RedCity Dental Care &amp; Implant Centre · 47 A/1, South Model Gram, Ludhiana · +91 76268 58230</span>
      <span>Prices as of October 2026. Final cost is confirmed after examination.</span>
    </footer>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>RedCity Dental Care — Complete Service Catalogue</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Gurmukhi:wght@500;600&family=Roboto+Slab:wght@700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      background: #FBF6F4;
      font-family: 'Inter', -apple-system, sans-serif;
      color: #1F1718;
      font-size: 13px;
      line-height: 1.5;
    }
    .page {
      width: 210mm;
      height: 297mm;
      position: relative;
      background: #FBF6F4;
      overflow: hidden;
      page-break-after: always;
      break-after: page;
      display: flex;
      flex-direction: column;
    }
    
    /* Cover Page */
    .cover-top {
      width: 210mm;
      height: 135mm;
      overflow: hidden;
    }
    .cover-top img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 40%;
      display: block;
    }
    .cover-body {
      flex: 1;
      padding: 36px 48px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #FBF6F4;
    }
    .cover-logo img {
      height: 48px;
      width: auto;
      display: block;
    }
    .cover-title {
      font-family: 'Roboto Slab', serif;
      font-weight: 800;
      font-size: 38px;
      line-height: 1.15;
      color: #1F1718;
      margin-top: 14px;
    }
    .cover-subtitle {
      font-size: 18px;
      font-weight: 500;
      color: #5E5456;
      margin-top: 6px;
    }
    .cover-meta {
      background: #FFFFFF;
      border: 1px solid #EADFDC;
      border-radius: 14px;
      padding: 22px 28px;
      margin-top: 20px;
    }
    .cover-meta-doctor {
      font-family: 'Roboto Slab', serif;
      font-size: 20px;
      font-weight: 700;
      color: #1F1718;
    }
    .cover-meta-creds {
      font-size: 14px;
      font-weight: 600;
      color: #A61C2E;
      margin-top: 2px;
    }
    .cover-meta-addr {
      font-size: 13px;
      color: #5E5456;
      margin-top: 6px;
    }
    .cover-meta-phone {
      font-size: 15px;
      font-weight: 700;
      color: #A61C2E;
      margin-top: 8px;
    }
    
    /* Inner Page Layout */
    .page-header {
      padding: 32px 42px 14px;
      border-bottom: 2px solid #EADFDC;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .page-title {
      font-family: 'Roboto Slab', serif;
      font-size: 26px;
      font-weight: 800;
      color: #1F1718;
      line-height: 1.15;
    }
    .page-sub {
      font-size: 13px;
      color: #5E5456;
      margin-top: 4px;
    }
    .header-logo img {
      height: 28px;
      width: auto;
    }
    
    .page-content {
      flex: 1;
      padding: 22px 42px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .pdf-footer {
      height: 16mm;
      padding: 0 42px;
      border-top: 1px solid #EADFDC;
      background: #F6ECE9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10px;
      color: #5E5456;
    }
    
    /* Meet Dr Sahu Page */
    .doc-grid {
      display: grid;
      grid-template-columns: 58mm 1fr;
      gap: 20px;
      align-items: start;
    }
    .doc-portrait {
      width: 58mm;
      height: 78mm;
      object-fit: cover;
      object-position: center 20%;
      border-radius: 12px;
      border: 2px solid #D4AF37;
      display: block;
    }
    .doc-lead {
      font-size: 13.5px;
      color: #1F1718;
      margin-bottom: 8px;
    }
    .doc-edu {
      background: #FFFFFF;
      border: 1px solid #EADFDC;
      border-radius: 10px;
      padding: 12px 16px;
      margin-top: 10px;
    }
    .edu-item {
      margin-bottom: 6px;
    }
    .edu-item:last-child { margin-bottom: 0; }
    .edu-deg { font-weight: 700; color: #1F1718; font-size: 12.5px; }
    .edu-inst { color: #5E5456; font-size: 11.5px; }
    
    .chips-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 12px;
    }
    .chip {
      background: #FFFFFF;
      border: 1px solid #EADFDC;
      border-radius: 999px;
      padding: 3px 10px;
      font-size: 11px;
      font-weight: 600;
      color: #2B0A0F;
    }
    
    .punjabi-box {
      background: #F6ECE9;
      border: 1px solid #EADFDC;
      border-radius: 12px;
      padding: 16px 20px;
      font-family: 'Noto Sans Gurmukhi', sans-serif;
      margin-top: 10px;
    }
    .punjabi-quote-lg {
      font-weight: 600;
      font-size: 14px;
      color: #A61C2E;
      margin-bottom: 8px;
      line-height: 1.4;
    }
    .punjabi-p {
      font-size: 11.5px;
      line-height: 1.6;
      color: #2B0A0F;
      margin-bottom: 6px;
    }
    .punjabi-p:last-child { margin-bottom: 0; }
    
    /* Treatment Card Styling in PDF */
    .pdf-item {
      background: #FFFFFF;
      border: 1px solid #EADFDC;
      border-radius: 12px;
      padding: 14px 18px;
      display: grid;
      grid-template-columns: 45mm 1fr;
      gap: 16px;
      align-items: center;
    }
    .pdf-item-art {
      width: 45mm;
      height: 38mm;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
    }
    .pdf-item-art img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .badge-mini {
      position: absolute;
      top: 6px;
      left: 6px;
      background: #D4AF37;
      color: #2B0A0F;
      font-size: 9px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 999px;
    }
    .pdf-item-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
    }
    .pdf-item-title {
      font-family: 'Roboto Slab', serif;
      font-size: 16px;
      font-weight: 700;
      color: #1F1718;
    }
    .pdf-item-price {
      font-weight: 700;
      font-size: 13.5px;
      color: #A61C2E;
      white-space: nowrap;
      margin-left: 12px;
    }
    .pdf-item-desc {
      font-size: 11.5px;
      color: #5E5456;
      line-height: 1.45;
    }
    .card-fine {
      font-size: 10.5px;
      color: #7D1523;
      margin-top: 4px;
      font-style: italic;
    }
    .pdf-item-link {
      font-size: 9.5px;
      color: #A61C2E;
      margin-top: 4px;
    }
    
    /* Table Styling */
    .table-wrap {
      background: #FFFFFF;
      border: 1px solid #EADFDC;
      border-radius: 12px;
      overflow: hidden;
      margin-top: 6px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
    }
    th {
      background: #2B0A0F;
      color: #FFFFFF;
      font-weight: 600;
      padding: 10px 12px;
      text-align: left;
    }
    td {
      padding: 10px 12px;
      border-bottom: 1px solid #EADFDC;
      vertical-align: top;
    }
    tr:last-child td { border-bottom: none; }
    .td-plan { font-weight: 700; font-size: 12px; color: #1F1718; }
    .td-price { font-weight: 700; color: #A61C2E; }
    
    /* Callout & Promises */
    .callout {
      background: #FFFFFF;
      border-left: 4px solid #A61C2E;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 8px;
    }
    .callout h4 {
      font-family: 'Roboto Slab', serif;
      font-size: 15px;
      color: #1F1718;
      margin-bottom: 4px;
    }
    .callout p {
      font-size: 12px;
      color: #5E5456;
      line-height: 1.5;
    }
    
    /* Visit Us */
    .clinic-photo {
      width: 100%;
      height: 90mm;
      object-fit: cover;
      object-position: center 50%;
      border-radius: 12px;
      border: 2px solid #D4AF37;
      display: block;
    }
    .contact-card {
      background: #FFFFFF;
      border: 1px solid #EADFDC;
      border-radius: 12px;
      padding: 18px 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 10px;
    }
    .contact-line {
      margin-bottom: 8px;
    }
    .contact-label {
      font-weight: 700;
      color: #1F1718;
      font-size: 12px;
      display: block;
    }
    .contact-val {
      color: #5E5456;
      font-size: 12px;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1: COVER ==================== -->
  <section class="page">
    <div class="cover-top">
      <img src="${coverArtUrl}" alt="RedCity Dental Care">
    </div>
    <div class="cover-body">
      <div>
        <div class="cover-logo">
          <img src="${logoFullUrl}" alt="RedCity Dental Care">
        </div>
        <h1 class="cover-title">Treatments, Fees &amp; Memberships</h1>
        <p class="cover-subtitle">Complete Care · Advanced Care · Personalized Care</p>
      </div>
      <div class="cover-meta">
        <div class="cover-meta-doctor">Dr. Arvind Sahu</div>
        <div class="cover-meta-creds">BDS, MDS (Prosthodontics &amp; Crown &amp; Bridge) · Prosthodontist &amp; Oral Implantologist</div>
        <div class="cover-meta-addr">📍 47 A/1, South Model Gram, Ludhiana, Punjab 141002 (Near South Model Town)</div>
        <div class="cover-meta-phone">📞 +91 76268 58230 · WhatsApp: https://wa.me/917626858230</div>
      </div>
    </div>
    ${footerHtml}
  </section>

  <!-- ==================== PAGE 2: MEET DR SAHU ==================== -->
  <section class="page">
    <header class="page-header">
      <div>
        <h2 class="page-title">Meet Dr. Arvind Sahu</h2>
        <p class="page-sub">Prosthodontist &amp; Oral Implantologist · Ludhiana</p>
      </div>
      <div class="header-logo"><img src="${logoSmallUrl}" alt="RedCity"></div>
    </header>
    <div class="page-content">
      <div class="doc-grid">
        <img class="doc-portrait" src="${portraitUrl}" alt="Dr. Arvind Sahu">
        <div>
          <p class="doc-lead"><strong>Dr. Arvind Sahu</strong> is dedicated to delivering advanced, personalized dental care with a focus on function, aesthetics, precision, and long-term results.</p>
          <p class="doc-lead">With a strong interest in implant dentistry and digital prosthodontics, Dr. Sahu integrates modern technology and evidence-based treatment principles to create natural-looking, comfortable, and functional dental restorations.</p>
          <p class="doc-lead">His philosophy is simple: every patient deserves a treatment plan that is scientifically sound, aesthetically pleasing, and designed around their individual needs.</p>
          
          <div class="doc-edu">
            <div class="edu-item">
              <div class="edu-deg">Bachelor of Dental Surgery (BDS)</div>
              <div class="edu-inst">Bhojia Dental College, Himachal Pradesh</div>
            </div>
            <div class="edu-item">
              <div class="edu-deg">Master of Dental Surgery (MDS), Prosthodontics &amp; Crown and Bridge</div>
              <div class="edu-inst">Seema Dental College &amp; Hospital, Rishikesh</div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 4px;">
        <strong style="font-size:12px; color:#1F1718;">Clinical Expertise:</strong>
        <div class="chips-row">
          <span class="chip">Dental Implants</span>
          <span class="chip">Full Mouth Rehabilitation</span>
          <span class="chip">Crowns &amp; Bridges</span>
          <span class="chip">Smile Design</span>
          <span class="chip">Esthetic Dentistry</span>
          <span class="chip">Digital Dentistry</span>
          <span class="chip">Complete Dentures</span>
          <span class="chip">Overdentures</span>
          <span class="chip">Maxillofacial Prosthetics</span>
        </div>
      </div>

      <div class="punjabi-box">
        <div class="punjabi-quote-lg">“ਹਰ ਮੁਸਕਾਨ ਦੀ ਆਪਣੀ ਇੱਕ ਕਹਾਣੀ ਹੁੰਦੀ ਹੈ, ਅਤੇ ਮੇਰਾ ਮਕਸਦ ਉਸ ਮੁਸਕਾਨ ਨੂੰ ਹੋਰ ਖੂਬਸੂਰਤ ਬਣਾਉਣਾ ਹੈ।”</div>
        <p class="punjabi-p">ਮੇਰੇ ਲਈ ਡੈਂਟਲ ਟ੍ਰੀਟਮੈਂਟ ਸਿਰਫ਼ ਦੰਦਾਂ ਦਾ ਇਲਾਜ ਨਹੀਂ—ਇਹ ਤੁਹਾਡੀ ਸਿਹਤ, ਤੁਹਾਡੇ ਆਰਾਮ ਅਤੇ ਤੁਹਾਡੇ ਆਤਮ-ਵਿਸ਼ਵਾਸ ਨਾਲ ਜੁੜਿਆ ਹੋਇਆ ਹੈ।</p>
        <p class="punjabi-p">ਮੈਂ ਹਰ ਮਰੀਜ਼ ਨੂੰ ਧਿਆਨ ਨਾਲ ਸੁਣਨ, ਉਸਦੀ ਸਮੱਸਿਆ ਨੂੰ ਸਮਝਣ ਅਤੇ ਉਸਦੇ ਲਈ ਸਹੀ, ਇਮਾਨਦਾਰ ਅਤੇ ਵਿਅਕਤੀਗਤ ਇਲਾਜ ਦੀ ਯੋਜਨਾ ਬਣਾਉਣ ਵਿੱਚ ਵਿਸ਼ਵਾਸ ਰੱਖਦਾ ਹਾਂ।</p>
        <p class="punjabi-p">ਤੁਹਾਡੇ ਦੰਦ ਸਿਰਫ਼ ਤੁਹਾਡੀ ਮੁਸਕਾਨ ਦਾ ਹਿੱਸਾ ਨਹੀਂ—ਇਹ ਤੁਹਾਡੀ ਪਹਿਚਾਣ ਦਾ ਹਿੱਸਾ ਹਨ। ਆਓ, ਮਿਲ ਕੇ ਤੁਹਾਡੀ ਮੁਸਕਾਨ ਨੂੰ ਸਿਹਤਮੰਦ, ਕੁਦਰਤੀ ਅਤੇ ਆਤਮ-ਵਿਸ਼ਵਾਸ ਨਾਲ ਭਰਪੂਰ ਬਣਾਈਏ।</p>
      </div>
    </div>
    ${footerHtml}
  </section>

  <!-- ==================== PAGE 3: START HERE ==================== -->
  <section class="page">
    <header class="page-header">
      <div>
        <h2 class="page-title">Start Here · Photo Review &amp; Routine Care</h2>
        <p class="page-sub">Clear fees, no hidden extras, and honest advice first</p>
      </div>
      <div class="header-logo"><img src="${logoSmallUrl}" alt="RedCity"></div>
    </header>
    <div class="page-content">
      ${treatmentCardHtml("photo-review")}
      ${treatmentCardHtml("checkup")}
      ${treatmentCardHtml("cleaning")}
      ${treatmentCardHtml("digital-xray")}
    </div>
    ${footerHtml}
  </section>

  <!-- ==================== PAGE 4: REPLACE MISSING TEETH ==================== -->
  <section class="page">
    <header class="page-header">
      <div>
        <h2 class="page-title">Replace Missing Teeth</h2>
        <p class="page-sub">Dental implants, precision prosthetics, and complete rehabilitations</p>
      </div>
      <div class="header-logo"><img src="${logoSmallUrl}" alt="RedCity"></div>
    </header>
    <div class="page-content" style="gap: 22px;">
      ${treatmentCardHtml("dental-implants")}
      ${treatmentCardHtml("dentures-bridges")}
      ${treatmentCardHtml("full-mouth-rehabilitation")}
    </div>
    ${footerHtml}
  </section>

  <!-- ==================== PAGE 5: PAIN & REPAIR ==================== -->
  <section class="page">
    <header class="page-header">
      <div>
        <h2 class="page-title">Pain &amp; Repair</h2>
        <p class="page-sub">Root canals, restorative crowns, and urgent emergency relief</p>
      </div>
      <div class="header-logo"><img src="${logoSmallUrl}" alt="RedCity"></div>
    </header>
    <div class="page-content">
      ${treatmentCardHtml("root-canal-treatment")}
      ${treatmentCardHtml("crowns")}
      ${treatmentCardHtml("emergency-dental-care")}
      ${treatmentCardHtml("laser-dentistry")}
    </div>
    ${footerHtml}
  </section>

  <!-- ==================== PAGE 6: SMILE & CHILDREN ==================== -->
  <section class="page">
    <header class="page-header">
      <div>
        <h2 class="page-title">Smile &amp; Children</h2>
        <p class="page-sub">Custom aesthetic smile design and positive paediatric dentistry</p>
      </div>
      <div class="header-logo"><img src="${logoSmallUrl}" alt="RedCity"></div>
    </header>
    <div class="page-content">
      ${treatmentCardHtml("veneers")}
      ${treatmentCardHtml("teeth-whitening")}
      ${treatmentCardHtml("smile-makeover")}
      ${treatmentCardHtml("paediatric-dentistry")}
    </div>
    ${footerHtml}
  </section>

  <!-- ==================== PAGE 7: MEMBERSHIPS ==================== -->
  <section class="page">
    <header class="page-header">
      <div>
        <h2 class="page-title">Dental Membership Plans</h2>
        <p class="page-sub">Predictable prevention and discounted care for you and your family</p>
      </div>
      <div class="header-logo"><img src="${logoSmallUrl}" alt="RedCity"></div>
    </header>
    <div class="page-content">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>3 Months</th>
              <th>6 Months</th>
              <th>12 Months</th>
              <th>Included Care &amp; Member Discounts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td-plan">Basic<br><span style="font-weight:normal;color:#5E5456;font-size:10px">Healthy teeth</span></td>
              <td class="td-price">₹199</td>
              <td class="td-price">₹299</td>
              <td class="td-price">₹499</td>
              <td>• Check-up with Dr. Sahu every 6 months<br>• Consultations for new problems<br>• 10% off cleanings, X-rays and general treatment</td>
            </tr>
            <tr>
              <td class="td-plan">Advanced<br><span style="font-weight:normal;color:#5E5456;font-size:10px">Cleanings &amp; savings</span></td>
              <td class="td-price">₹749</td>
              <td class="td-price">₹1,399</td>
              <td class="td-price">₹2,499</td>
              <td>• <strong>Check-ups, cleanings and X-rays included</strong><br>• 15% off fillings, root canals and extractions<br>• 10% off crowns, bridges, dentures and implants*</td>
            </tr>
            <tr>
              <td class="td-plan">Pro<br><span style="font-weight:normal;color:#5E5456;font-size:10px">In treatment</span></td>
              <td class="td-price">₹1,049</td>
              <td class="td-price">₹1,899</td>
              <td class="td-price">₹3,499</td>
              <td>• Everything in Advanced included<br>• <strong>20% off general treatment</strong><br>• <strong>15% off crowns, bridges, dentures &amp; implants*</strong><br>• Priority WhatsApp replies &amp; same-day emergency slot</td>
            </tr>
            <tr>
              <td class="td-plan">Family with Pro<br><span style="font-weight:normal;color:#5E5456;font-size:10px">Whole family</span></td>
              <td class="td-price">₹2,999</td>
              <td class="td-price">₹5,499</td>
              <td class="td-price">₹9,999</td>
              <td>• Pro benefits for <strong>2 adults and 2 children</strong> under 18<br>• Fluoride or sealants for children when clinically advised<br>• Add extra members: ₹749 (3m) · ₹1,399 (6m) · ₹2,499 (12m)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="background:#FFFFFF; border:1px solid #EADFDC; border-radius:10px; padding:14px 18px; margin-top:8px;">
        <strong style="color:#1F1718; font-size:12px;">Important Membership Terms:</strong>
        <p style="color:#5E5456; font-size:11px; margin-top:4px; line-height:1.5;">
          *Larger discounts on crowns, bridges, dentures and implants apply to 6 and 12-month memberships. Discounts apply to the clinic's professional fees; lab work and implant parts are charged at normal price.<br>
          <strong>This is a membership plan, not dental insurance.</strong> Plans are non-transferable and apply to treatment at RedCity Dental Care.
        </p>
      </div>
    </div>
    ${footerHtml}
  </section>

  <!-- ==================== PAGE 8: OUR PROMISES ==================== -->
  <section class="page">
    <header class="page-header">
      <div>
        <h2 class="page-title">Our Promises to Patients</h2>
        <p class="page-sub">Clear warranties, honest pricing, and compassionate policies</p>
      </div>
      <div class="header-logo"><img src="${logoSmallUrl}" alt="RedCity"></div>
    </header>
    <div class="page-content" style="gap: 14px;">
      <div class="callout">
        <h4>Dental Implant Warranty: Up to lifetime warranty*</h4>
        <p>
          We stand firmly behind our implant restorations. Which option a patient receives is agreed upon with Dr. Sahu and clearly specified on your treatment plan:<br>
          • <strong>5-year, 10-year or lifetime coverage</strong> on the implant fixture depending on the selected option.<br>
          • <strong>Check-up requirement:</strong> To keep your implant warranty active, a routine check-up is required every 6 months.<br>
          • <em>*Breakage and failure resulting from poor oral hygiene, accidental trauma, or unmanaged systemic conditions aren't covered.</em>
        </p>
      </div>

      <div class="callout">
        <h4>Transparent Payments &amp; Staged Plans</h4>
        <p>
          • <strong>Accepted payment methods:</strong> UPI (Google Pay, PhonePe, Paytm), debit and credit cards, and cash.<br>
          • <strong>Staged payment for bigger work:</strong> Extensive treatments such as full mouth rehabilitations, multiple implants, or smile makeovers can be paid in scheduled stages as clinical phases are completed.<br>
          • <strong>No surprise bills:</strong> You will always receive a clear written estimate before any major procedure begins.
        </p>
      </div>

      <div class="callout">
        <h4>Appointment Flexibility &amp; Refund Policy</h4>
        <p>
          • <strong>Rescheduling:</strong> We ask for at least 24 hours notice to reschedule your appointment without any charge, allowing us to offer the slot to an emergency patient.<br>
          • <strong>Refunds:</strong> If a treatment plan is changed or uncommenced procedures are cancelled, refunds are processed back to the original payment method within 7 working days.<br>
          • <strong>Binding policies:</strong> Full patient commitments and clinic policies are available upon request at our reception desk.
        </p>
      </div>
    </div>
    ${footerHtml}
  </section>

  <!-- ==================== PAGE 9: VISIT US ==================== -->
  <section class="page">
    <header class="page-header">
      <div>
        <h2 class="page-title">Visit RedCity Dental Care</h2>
        <p class="page-sub">Centrally located in South Model Gram, Ludhiana</p>
      </div>
      <div class="header-logo"><img src="${logoSmallUrl}" alt="RedCity"></div>
    </header>
    <div class="page-content">
      <img class="clinic-photo" src="${exteriorUrl}" alt="RedCity Dental Care Clinic Building">
      
      <div class="contact-card">
        <div>
          <div class="contact-line">
            <span class="contact-label">Clinic Location:</span>
            <span class="contact-val">47 A/1, South Model Gram, Ludhiana, Punjab 141002</span>
          </div>
          <div class="contact-line">
            <span class="contact-label">Landmark:</span>
            <span class="contact-val">Near South Model Town</span>
          </div>
          <div class="contact-line">
            <span class="contact-label">Directions &amp; Map:</span>
            <span class="contact-val" style="color:#A61C2E;">https://maps.app.goo.gl/aw86VcC2PLQ8iETQ8</span>
          </div>
        </div>
        <div>
          <div class="contact-line">
            <span class="contact-label">Phone &amp; WhatsApp:</span>
            <span class="contact-val" style="font-weight:700;color:#A61C2E;">+91 76268 58230 · WhatsApp: https://wa.me/917626858230</span>
          </div>
          <div class="contact-line">
            <span class="contact-label">Consultation Hours:</span>
            <span class="contact-val">Call or WhatsApp for today's hours</span>
          </div>
          <div class="contact-line">
            <span class="contact-label">Languages Spoken:</span>
            <span class="contact-val">English · ਪੰਜਾਬੀ · हिंदी</span>
          </div>
        </div>
      </div>

      <div style="background:#2B0A0F; color:#FFFFFF; border-radius:12px; padding:18px 24px; display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
        <div>
          <div style="font-family:'Roboto Slab',serif; font-size:18px; font-weight:700;">Ready to book your appointment?</div>
          <div style="font-size:12px; color:rgba(255,255,255,0.8); margin-top:2px;">Call us or send 3 photos on WhatsApp for Dr. Sahu's personal review.</div>
        </div>
        <div style="font-size:18px; font-weight:700; color:#F2D98A;">📞 76268 58230</div>
      </div>
    </div>
    ${footerHtml}
  </section>

</body>
</html>`;
}

// -------------------------------------------------------------
// MAIN BUILD EXECUTION
// -------------------------------------------------------------
async function main() {
  console.log("=== Building RedCity Dental Catalogue ===");

  // 1. Render all 19 service cards HTML
  for (const item of catalogue.items) {
    const htmlPath = path.join(cardsDir, `${item.id}.html`);
    fs.writeFileSync(htmlPath, renderServiceCardHtml(item), "utf8");
    console.log(`✓ Generated ${item.id}.html`);
  }

  // 2. Render "Meet Dr. Sahu" HTML
  const meetHtmlPath = path.join(cardsDir, "meet-dr-sahu.html");
  fs.writeFileSync(meetHtmlPath, renderMeetDrSahuCardHtml(catalogue.meetDrSahu), "utf8");
  console.log(`✓ Generated meet-dr-sahu.html`);

  // 3. Render 9-page PDF HTML
  const catalogueHtmlPath = path.join(catalogueDir, "catalogue.html");
  fs.writeFileSync(catalogueHtmlPath, renderPdfCatalogueHtml(), "utf8");
  console.log(`✓ Generated catalogue.html (9-page PDF source)`);

  // 4. Capture screenshots with Chrome for each card and convert with sips
  const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const allCardIds = [...catalogue.items.map((x) => x.id), "meet-dr-sahu"];

  console.log("\nCapturing 20 cards at 1080x1080 with Chrome...");
  for (const id of allCardIds) {
    const htmlFile = path.join(cardsDir, `${id}.html`);
    const pngFile = path.join(cardsDir, `${id}.png`);
    const jpgFile = path.join(cardsDir, `${id}.jpg`);

    execFileSync(chromePath, [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1080,1080",
      "--virtual-time-budget=8000",
      `--screenshot=${pngFile}`,
      `file://${htmlFile}`,
    ]);

    execFileSync("sips", [
      "-s", "format", "jpeg",
      "-s", "formatOptions", "90",
      pngFile,
      "--out", jpgFile,
    ], { stdio: "ignore" });

    if (fs.existsSync(pngFile)) fs.unlinkSync(pngFile);
    console.log(`  ✓ Created cards/${id}.jpg (1080x1080)`);
  }

  // 5. Create cards.zip with all 20 JPGs
  console.log("\nCreating cards.zip...");
  const zipPath = path.join(catalogueDir, "cards.zip");
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  execSync(`cd "${cardsDir}" && zip -q "../cards.zip" *.jpg`);
  console.log("✓ Created cards.zip");

  // 6. Print 9-page PDF with Chrome
  console.log("\nPrinting 9-page PDF with Chrome...");
  const pdfPath = path.join(catalogueDir, "RedCity-Dental-Catalogue.pdf");
  execFileSync(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--virtual-time-budget=8000",
    `--print-to-pdf=${pdfPath}`,
    `file://${catalogueHtmlPath}`,
  ]);
  console.log(`✓ Created RedCity-Dental-Catalogue.pdf`);

  console.log("\n=== Build Complete ===");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
