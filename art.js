/* ============================================================= *
 *  VAULTURE — art.js
 *  Original engraved SVG identity: vulture seal, crew emblems,
 *  gadget glyphs, guilloché + grain textures, dial, hero collage.
 *  All line work uses currentColor so CSS ink drives the color.
 * ============================================================= */
(function(){
"use strict";

/* ---- encode an SVG string to a CSS url() data URI ---- */
const uri = svg => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

/* ============== TEXTURE: ink/paper-fibre grain (banknote) ============== */
/* denser, higher-contrast navy speckle — reads like ink sitting in paper fibre */
const grainSVG =
  `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220">
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.03  0 0 0 0 0.11  0 0 0 0 0.17  0 0 0 0.14 0"/></filter>
    <rect width="220" height="220" filter="url(#n)"/></svg>`;

/* ============== TEXTURE: guilloché rosette (banknote spirograph) ============== */
function guillocheSVG(){
  const cx=100, cy=100, n=44, parts=[];
  for(let i=0;i<n;i++){
    const a=(360/n)*i;
    parts.push(`<ellipse cx="${cx}" cy="${cy}" rx="86" ry="34" transform="rotate(${a} ${cx} ${cy})"/>`);
    parts.push(`<ellipse cx="${cx}" cy="${cy}" rx="60" ry="60" transform="rotate(${a} ${cx} ${cy})"/>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <g fill="none" stroke="#16374A" stroke-width="0.5" opacity="0.9">${parts.join("")}</g></svg>`;
}

/* set the CSS custom properties used across the stylesheets */
const root=document.documentElement.style;
root.setProperty("--grain", grainSVG ? uri(grainSVG) : "none");
root.setProperty("--guilloche", uri(guillocheSVG()));
root.setProperty("--bankframe", uri(bankFrameSVG()));

/* ============== helper: wrap an inner SVG body ============== */
const svg = (vb, body, extra="") => `<svg viewBox="${vb}" ${extra} xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

/* ============================================================= *
 *  CREW EMBLEMS — engraved line marks (24x24, currentColor)
 * ============================================================= */
const CREW_EMBLEM = {
  // Spark (Hacker) — wireman / signals: lightning through a node
  Hacker: `<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round">
      <path d="M13 2 L5 13 h6 l-2 9 8-12 h-6 z" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="12" r="10.4" stroke-width="1.1" opacity=".5"/></g>`,
  // Rook (Mastermind) — the planner: chess rook
  Mastermind: `<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
      <path d="M6 8 V5 h2.4 V6.6 h2.4 V5 h2.4 V6.6 h2.4 V5 H18 v3 l-1.6 1.6 v6.4 l1.8 3.4 H5.8 l1.8-3.4 V9.6 z" fill="currentColor" stroke="none"/>
      <path d="M9 12 h6 M9.4 16 h5.2" stroke="#F0E5C9" stroke-width="1.1"/></g>`,
  // Ram (Demolition) — breaker: ram head with curled horns
  Demolition: `<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 6 c-2.5 0-4.4 1.9-4.4 4.6 0 3 2 5.4 4.4 6.4 2.4-1 4.4-3.4 4.4-6.4C16.4 7.9 14.5 6 12 6Z" fill="currentColor" stroke="none"/>
      <path d="M8 7 C4 6 3 9 4.4 11.6 5.4 13.4 7 13.4 7.6 12.2"/>
      <path d="M16 7 C20 6 21 9 19.6 11.6 18.6 13.4 17 13.4 16.4 12.2"/>
      <circle cx="10.3" cy="11" r=".9" fill="#F0E5C9" stroke="none"/><circle cx="13.7" cy="11" r=".9" fill="#F0E5C9" stroke="none"/></g>`,
  // Veil (Face) — inside man: domino / theatre mask
  Face: `<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
      <path d="M3.5 8 C8 6.5 16 6.5 20.5 8 c0 4-2.4 7.5-4.6 8.4 -1.4.6-2.2-.6-3.9-.6s-2.5 1.2-3.9.6C7.9 15.5 3.5 12 3.5 8Z" fill="currentColor" stroke="none"/>
      <ellipse cx="8.6" cy="10" rx="1.9" ry="1.4" fill="#F0E5C9" stroke="none"/>
      <ellipse cx="15.4" cy="10" rx="1.9" ry="1.4" fill="#F0E5C9" stroke="none"/></g>`,
  // Dash (Driver) — the wheel: steering wheel
  Driver: `<g fill="none" stroke="currentColor" stroke-width="1.7">
      <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/>
      <path d="M12 9.5 V3.2 M9.7 13.4 4.6 17 M14.3 13.4 19.4 17" stroke-linecap="round"/>
      <path d="M4.5 11 A 7.6 7.6 0 0 1 19.5 11" stroke-width="1.2"/></g>`,
};

/* ============================================================= *
 *  CREW PORTRAITS — original retro crime-poster busts.
 *  Poster chiaroscuro: charcoal/navy figure, cream rim-light,
 *  halftone shading, one crew-colour accent. Distinct silhouette
 *  + prop per character. viewBox 0 0 100 124, fixed colours.
 * ============================================================= */
const PORTRAIT_D="#23201C", PORTRAIT_N="#16374A", PORTRAIT_C="#F3EAD0", PORTRAIT_C2="#E0CEA2";
function crewPortrait(sym, accent){
  const D=PORTRAIT_D, N=PORTRAIT_N, C=PORTRAIT_C, C2=PORTRAIT_C2, A=accent;
  const ht=`ht_${sym}`;
  const defs=`<defs>
    <pattern id="${ht}" width="3.6" height="3.6" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
      <circle cx="1.8" cy="1.8" r="0.75" fill="${D}" opacity="0.5"/></pattern>
    <clipPath id="cl_${sym}"><rect x="0" y="0" width="100" height="124"/></clipPath></defs>`;
  // shared: faint accent halftone glow behind head
  const glow=`<circle cx="50" cy="46" r="40" fill="${A}" opacity="0.13"/>
    <circle cx="50" cy="46" r="40" fill="url(#${ht})" opacity="0.6"/>`;

  let body="";
  if(sym==="Mastermind"){ // ROOK — the Planner: fedora, overcoat, sharp lapels
    body=`
      <path d="M6 124 V94 Q10 82 26 80 L40 76 H60 L74 80 Q90 82 94 94 V124 Z" fill="${N}"/>
      <path d="M40 76 L50 96 L60 76 Z" fill="${C}"/>
      <path d="M40 76 L50 96 L44 78 Z" fill="${C2}"/>
      <path d="M47 80 L50 96 L53 80 Z" fill="${A}"/>
      <rect x="44" y="70" width="12" height="12" fill="${C}"/>
      <ellipse cx="50" cy="48" rx="18" ry="21" fill="${D}"/>
      <path d="M50 28 Q63 30 66 48 Q66 64 50 70 Z" fill="${C}" opacity="0.9"/>
      <path d="M50 30 Q60 32 63 48 Q63 60 50 66 Z" fill="url(#${ht})"/>
      <path d="M54 44 q5 0 7 3" stroke="${D}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M55 52 q4 2 8 1" stroke="${D}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path d="M16 30 Q50 16 84 30 Q84 36 50 36 Q16 36 16 30 Z" fill="${D}"/>
      <path d="M30 30 Q34 14 50 13 Q66 14 70 30 Q60 24 50 24 Q40 24 30 30 Z" fill="${D}"/>
      <rect x="30" y="28" width="40" height="3.4" rx="1.6" fill="${A}"/>`;
  } else if(sym==="Hacker"){ // SPARK — the Wireman: flat cap, headphones, round specs
    body=`
      <path d="M8 124 V96 Q12 86 28 83 L40 80 H60 L72 83 Q88 86 92 96 V124 Z" fill="${N}"/>
      <path d="M40 80 L50 92 L60 80 L58 100 H42 Z" fill="${C2}"/>
      <path d="M44 80 H56 L54 96 H46 Z" fill="${C}"/>
      <rect x="44" y="72" width="12" height="11" fill="${C}"/>
      <ellipse cx="50" cy="50" rx="17" ry="20" fill="${D}"/>
      <path d="M50 32 Q62 34 65 50 Q65 64 50 70 Z" fill="${C}" opacity="0.9"/>
      <path d="M50 34 Q60 36 62 50 Q62 60 50 66 Z" fill="url(#${ht})"/>
      <circle cx="33" cy="52" rx="7" r="8" fill="${D}"/>
      <circle cx="67" cy="52" r="8" fill="${D}"/>
      <path d="M30 36 Q50 28 70 36 L70 46 Q50 40 30 46 Z" fill="${D}"/>
      <path d="M28 30 Q50 22 72 30 Q74 35 70 37 Q50 30 30 37 Q26 35 28 30 Z" fill="${D}"/>
      <path d="M30 33 L18 30 Q14 31 16 35" stroke="${D}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <circle cx="44" cy="50" r="5.4" fill="none" stroke="${A}" stroke-width="2"/>
      <circle cx="60" cy="50" r="5.4" fill="none" stroke="${A}" stroke-width="2"/>
      <path d="M49.4 50 h1.2" stroke="${A}" stroke-width="2"/>
      <circle cx="33" cy="52" r="3.2" fill="${A}"/><circle cx="67" cy="52" r="3.2" fill="${A}"/>`;
  } else if(sym==="Demolition"){ // RAM — the Breaker: bandana, goggles on forehead, broad
    body=`
      <path d="M2 124 V92 Q8 80 26 78 L40 74 H60 L74 78 Q92 80 98 92 V124 Z" fill="${N}"/>
      <path d="M40 74 L50 90 L60 74 Z" fill="${C2}"/>
      <rect x="43" y="66" width="14" height="12" fill="${C}"/>
      <path d="M30 60 Q30 36 50 36 Q70 36 70 60 Q70 74 50 78 Q30 74 30 60 Z" fill="${D}"/>
      <path d="M50 40 Q67 42 68 60 Q66 72 50 76 Z" fill="${C}" opacity="0.88"/>
      <path d="M50 42 Q63 44 64 60 Q62 70 50 73 Z" fill="url(#${ht})"/>
      <path d="M40 58 q5 -3 10 0" stroke="${D}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M44 64 q6 3 11 0" stroke="${D}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M26 34 Q50 24 74 34 L72 44 Q50 36 28 44 Z" fill="${A}"/>
      <path d="M26 34 Q50 28 74 34 L74 30 Q50 22 26 30 Z" fill="${D}"/>
      <path d="M72 40 L86 36 L84 46 L72 46 Z" fill="${A}"/>
      <path d="M74 38 L88 33" stroke="${D}" stroke-width="2" stroke-linecap="round"/>
      <rect x="30" y="40" width="40" height="9" rx="4.5" fill="${D}"/>
      <circle cx="40" cy="44.5" r="5.5" fill="${N}" stroke="${C2}" stroke-width="1.4"/>
      <circle cx="60" cy="44.5" r="5.5" fill="${N}" stroke="${C2}" stroke-width="1.4"/>`;
  } else if(sym==="Face"){ // VEIL — the Inside: wide hat + draped veil, domino mask
    body=`
      <path d="M10 124 V98 Q14 88 30 84 Q40 96 50 96 Q60 96 70 84 Q86 88 90 98 V124 Z" fill="${N}"/>
      <path d="M34 80 Q50 100 66 80 L66 92 Q50 102 34 92 Z" fill="${A}" opacity="0.5"/>
      <rect x="44" y="68" width="12" height="14" fill="${C}"/>
      <ellipse cx="50" cy="50" rx="16" ry="20" fill="${D}"/>
      <path d="M50 32 Q62 34 64 50 Q64 64 50 70 Z" fill="${C}" opacity="0.92"/>
      <path d="M50 34 Q60 36 61 50 Q61 60 50 66 Z" fill="url(#${ht})"/>
      <path d="M40 48 Q50 44 60 48 Q60 54 50 55 Q40 54 40 48 Z" fill="${D}"/>
      <ellipse cx="45" cy="49.5" rx="2.4" ry="1.7" fill="${C}"/>
      <ellipse cx="56" cy="49.5" rx="2.4" ry="1.7" fill="${C}"/>
      <path d="M46 60 q4 2 8 0" stroke="${A}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M14 36 Q50 18 86 36 Q86 44 50 42 Q14 44 14 36 Z" fill="${D}"/>
      <path d="M30 34 Q50 22 70 34 Q60 28 50 28 Q40 28 30 34 Z" fill="${D}"/>
      <rect x="32" y="33" width="36" height="3.2" rx="1.6" fill="${A}"/>
      <path d="M70 38 Q84 44 80 60" stroke="${A}" stroke-width="1.4" fill="none" opacity="0.7"/>`;
  } else { // DASH — the Wheel: driving cap, aviator goggles, scarf
    body=`
      <path d="M8 124 V96 Q12 86 28 83 L40 80 H60 L72 83 Q88 86 92 96 V124 Z" fill="${N}"/>
      <path d="M34 80 Q50 92 66 80 Q70 88 58 96 L42 96 Q30 88 34 80 Z" fill="${A}"/>
      <path d="M44 78 H56 L54 90 H46 Z" fill="${C2}"/>
      <rect x="44" y="70" width="12" height="11" fill="${C}"/>
      <ellipse cx="50" cy="50" rx="17" ry="20" fill="${D}"/>
      <path d="M50 32 Q62 34 65 50 Q65 63 50 69 Z" fill="${C}" opacity="0.9"/>
      <path d="M50 34 Q60 36 62 50 Q62 60 50 65 Z" fill="url(#${ht})"/>
      <path d="M44 62 q6 2 11 -1" stroke="${D}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <rect x="29" y="44" width="42" height="11" rx="5.5" fill="${D}"/>
      <circle cx="40" cy="49.5" r="6" fill="${A}" stroke="${D}" stroke-width="1.6"/>
      <circle cx="60" cy="49.5" r="6" fill="${A}" stroke="${D}" stroke-width="1.6"/>
      <circle cx="40" cy="49.5" r="2.4" fill="${C}"/><circle cx="60" cy="49.5" r="2.4" fill="${C}"/>
      <path d="M24 38 Q50 26 76 38 L78 44 L22 44 Z" fill="${D}"/>
      <path d="M22 44 L16 41 Q12 43 15 47 L24 46 Z" fill="${D}"/>
      <path d="M28 36 Q50 30 72 36" stroke="${C2}" stroke-width="1.2" fill="none" opacity="0.6"/>`;
  }
  return `<svg viewBox="0 0 100 124" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    ${defs}<g clip-path="url(#cl_${sym})">${glow}${body}</g></svg>`;
}

/* ============================================================= *
 *  GADGET GLYPHS — engraved line icons keyed by gadget id
 * ============================================================= */
const G = {
  coin:`<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5 v9 M9.8 9.4 h3.6 a1.8 1.8 0 0 1 0 3.6 h-3 a1.8 1.8 0 0 0 0 3.6 h3.8" stroke-width="1.3"/>`,
  key:`<circle cx="8" cy="9" r="3.6"/><path d="M10.6 11.6 L19 20 M16.5 17.5 l2-2 M14 15 l2-2"/>`,
  charge:`<rect x="7.5" y="9" width="9" height="11" rx="1"/><path d="M12 9 V5 M9.5 5 h5 M12 12 v5"/><circle cx="12" cy="6.6" r="1.3" fill="currentColor" stroke="none"/>`,
  mask:`<path d="M4 9 C8 7.5 16 7.5 20 9 c0 4-2.2 7-4.2 7.8-1.3.5-2-.5-3.8-.5s-2.5 1-3.8.5C6.2 16 4 13 4 9Z"/><circle cx="9" cy="10.6" r="1"/><circle cx="15" cy="10.6" r="1"/>`,
  wheel:`<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2"/><path d="M12 10 V4 M10.2 13.4 5 17 M13.8 13.4 19 17"/>`,
  hands:`<path d="M3 13 l4-2 4 2 M21 13 l-4-2-4 2"/><path d="M7 11 l2-3 3 1 3-1 2 3"/><path d="M9 13 l3 2 3-2"/>`,
  target:`<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>`,
  medal:`<circle cx="12" cy="14" r="5"/><path d="M9 9.6 L7 3 h4 l1.2 3 M15 9.6 L17 3 h-4"/><path d="M12 11.6 l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2-1.4-1.4 2-.3z" fill="currentColor" stroke="none" stroke-width=".5"/>`,
  bolt:`<path d="M13 3 L6 13 h5 l-1.5 8 8-11 h-5 z" fill="currentColor" stroke="none"/>`,
  wild:`<path d="M12 4 v16 M5 7.5 14 0 M19 7.5 -14 0" transform="translate(0 4)"/><path d="M12 4 l2.4 5 5.4.6-4 3.7 1.1 5.3-4.9-2.8-4.9 2.8 1.1-5.3-4-3.7 5.4-.6z" fill="currentColor" stroke="none"/>`,
  quill:`<path d="M5 19 C7 12 13 6 19 4 c0 6-3 12-9 14 z"/><path d="M5 19 l4-4 M9.5 13.5 c1.5.3 2.7-0 3.3-1.3"/>`,
  dice:`<rect x="4.5" y="4.5" width="15" height="15" rx="2.5"/><circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="15" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none"/>`,
  flag:`<path d="M6 21 V3"/><path d="M6 4 C10 2 14 6 19 4 V12 C14 14 10 10 6 12"/>`,
  clover:`<path d="M12 12 C12 8 8 8 8 11 s4 1 4 1 c0-4-4-4-4-1m4 1c0-4 4-4 4-1s-4 1-4 1m0 0c4 0 4 4 1 4s-1-4-1-4m0 0c-4 0-4 4-1 4s1-4 1-4" fill="currentColor" stroke="none"/><path d="M12 12 l1 8" stroke-width="1.4"/>`,
  bag:`<path d="M7 8 h10 l2 12 H5 z"/><path d="M9 8 C9 4 15 4 15 8" /><path d="M5 20 h14" stroke-width="1.2"/>`,
  note:`<rect x="3.5" y="7" width="17" height="10" rx="1"/><circle cx="12" cy="12" r="2.4"/><path d="M6 9.5 h0 M18 14.5 h0" stroke-linecap="round" stroke-width="2"/>`,
};
const wrapG = inner => `<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
const GADGET_GLYPH = {
  inside_Hacker:G.bolt, inside_Demolition:G.charge, inside_Face:G.mask, inside_Driver:G.wheel,
  loyalty:G.hands, all_in:G.target, veteran:G.medal, adrenaline:G.bolt, mastermind_wild:G.wild,
  forger:G.quill, double_down:G.dice, getaway:G.flag, lucky:G.clover, big_bag:G.bag, fence:G.note,
};

/* ============================================================= *
 *  UTILITY ICONS
 * ============================================================= */
const ICONS = {
  cash:`<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="1"/><circle cx="12" cy="12" r="2.8"/><path d="M6 8.5 h0 M18 15.5 h0" stroke-linecap="round" stroke-width="2.4"/></g>`,
  check:`<path d="M4 13 l5 5 L20 5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  sound:`<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M4 9 h3 l4-3 v12 l-4-3 H4 z" fill="currentColor" stroke="none"/><path d="M15 9 a4 4 0 0 1 0 6 M17.5 7 a7 7 0 0 1 0 10"/></g>`,
  mute:`<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M4 9 h3 l4-3 v12 l-4-3 H4 z" fill="currentColor" stroke="none"/><path d="M15 9 l5 6 M20 9 l-5 6" stroke-linecap="round"/></g>`,
  share:`<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M8 11 l8-4 M8 13 l8 4"/></g>`,
  copy:`<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M4 16 V4 h12"/></g>`,
  save:`<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 3 h11 l3 3 v15 H5 z"/><path d="M8 3 v6 h7 V3 M8 14 h8 v7 H8 z"/></g>`,
  reroll:`<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7 A8 8 0 1 0 21 14"/><path d="M20 3 v4 h-4"/></g>`,
  arrow:`<path d="M4 12 h14 M13 6 l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
};

/* ============================================================= *
 *  VAULT DIAL — combination safe dial for the play stage
 * ============================================================= */
/* ============================================================= *
 *  BANKNOTE FRAME — ornate engraved certificate border.
 *  Built for CSS border-image (slice 84, `round`): nested rules,
 *  guilloché braid + dentil chain on the edge-middles, scrolled
 *  acanthus volutes in the corners. Green ink baked in.
 * ============================================================= */
function bankFrameSVG(){
  const R=Math.PI/180, INK="#2F5E3D", PAPER="#F0E5C9", Cx=150;

  // ----- nested rectangle rules (continuous on all four sides) -----
  const rects=[ [6,2.6],[10,1],[28,1.3],[46,1.3],[50,0.8] ]
    .map(([d,w])=>`<rect x="${d}" y="${d}" width="${300-2*d}" height="${300-2*d}" stroke-width="${w}"/>`).join("");

  // ----- guilloché braid (one repeatable wavelength unit) -----
  const wave=(y,amp,lam,phase,x0,x1)=>{let d="";
    for(let x=x0;x<=x1;x+=2){const yy=y+amp*Math.sin(((x-x0)/lam*360+phase)*R); d+=(x===x0?"M":"L")+x+" "+yy.toFixed(2);}return d;};
  // top edge middle = x 84..216 (132 = 11 × 12)
  const braid=
    `<path d="${wave(19,4.2,12,0,84,216)}" stroke-width="0.8"/>`+
    `<path d="${wave(19,4.2,12,180,84,216)}" stroke-width="0.8"/>`;
  // ----- dentil teeth along top middle (period 12) -----
  let teeth=""; for(let i=0;i<11;i++){const x=84+i*12; teeth+=`<rect x="${x}" y="31" width="7" height="9" fill="${INK}" stroke="none"/>`;}
  // small scroll accent at the edge centre
  const edgeAccent=`<g transform="translate(150 0)">
      <path d="M-9 60 q9 -7 0 -14 q-9 7 0 14Z" fill="none" stroke-width="1"/>
      <path d="M9 60 q-9 -7 0 -14 q9 7 0 14Z" fill="none" stroke-width="1"/>
      <circle cx="0" cy="55" r="2.4" fill="${INK}" stroke="none"/></g>`;
  const topEdge=`<g>${braid}${teeth}${edgeAccent}</g>`;

  // ----- corner ornament (top-left, ~0..84) -----
  // archimedean volute
  const spiral=(cx,cy,r0,r1,t0,turns,sw)=>{let p="";const steps=Math.round(turns*40);
    for(let i=0;i<=steps;i++){const f=i/steps,a=(t0+turns*360*f)*R,r=r0+(r1-r0)*f;
      p+=(i?"L":"M")+(cx+Math.cos(a)*r).toFixed(2)+" "+(cy+Math.sin(a)*r).toFixed(2);}
    return `<path d="${p}" stroke-width="${sw}"/>`;};
  const leaf=(x,y,rot,sc)=>`<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})">
      <path d="M0 0 C7 -5 10 -14 6 -25 C3 -16 -3 -11 -6 -11 C-2 -6 -1 -3 0 0Z" fill="${INK}" stroke="none"/>
      <path d="M0 -1 C2 -9 3 -16 5 -23" fill="none" stroke="${PAPER}" stroke-width="0.9"/></g>`;
  const corner=`<g>
      <circle cx="18" cy="18" r="6.5" fill="none" stroke-width="1.1"/>
      <circle cx="18" cy="18" r="2.4" fill="${INK}" stroke="none"/>
      ${[0,90,180,270].map(a=>`<circle cx="${(18+Math.cos(a*R)*6.5).toFixed(2)}" cy="${(18+Math.sin(a*R)*6.5).toFixed(2)}" r="1.3" fill="${INK}" stroke="none"/>`).join("")}
      <g transform="translate(38 38)">
        <g transform="translate(20 20)">${spiral(0,0,2,15,200,2.05,1.5)}</g>
        ${leaf(20,18,128,1.05)}
        ${leaf(12,26,168,0.9)}
        ${leaf(30,12,92,0.82)}
        <path d="M6 40 q10 -26 36 -34" fill="none" stroke-width="1"/>
        ${[0,1,2,3,4].map(i=>{const t=i/4;const x=6+(42-6)*t,y=40-(40-6)*t-Math.sin(t*Math.PI)*4;return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.4" fill="${INK}" stroke="none"/>`;}).join("")}
      </g>
      <rect x="31" y="31" width="7" height="9" fill="${INK}" stroke="none"/>
      <rect x="31" y="31" width="9" height="7" fill="${INK}" stroke="none"/>
    </g>`;

  const rot=(deg)=>`rotate(${deg} ${Cx} ${Cx})`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
    <g fill="none" stroke="${INK}" stroke-linejoin="round" stroke-linecap="round">
      <g>${rects}</g>
      <g>${topEdge}</g>
      <g transform="${rot(90)}">${topEdge}</g>
      <g transform="${rot(180)}">${topEdge}</g>
      <g transform="${rot(270)}">${topEdge}</g>
      <g>${corner}</g>
      <g transform="${rot(90)}">${corner}</g>
      <g transform="${rot(180)}">${corner}</g>
      <g transform="${rot(270)}">${corner}</g>
    </g></svg>`;
}

/* ============================================================= *
 *  VULTURE SEAL — currency-style medallion (hero emblem)
 *  size param controls ring micro-text density
 * ============================================================= */
function vultureBird(){
  // heraldic bowed vulture, centered at (50,50) in a 0..100 box, fill currentColor
  return `<g fill="currentColor" stroke="none">
    <path d="M50 36 C34 32 18 41 16 61 c7-5 13-6 13-6 -4 6-5 13-3 19 5-7 9-9 9-9 -1 6 0 13 4 18 1-23 6-37 11-46z"/>
    <path d="M50 36 C66 32 82 41 84 61 c-7-5-13-6-13-6 4 6 5 13 3 19 -5-7-9-9-9-9 1 6 0 13-4 18 -1-23-6-37-11-46z"/>
    <path d="M50 33 C43 33 39 42 39 55 c0 13 5 23 11 28 6-5 11-15 11-28 0-13-4-22-11-22z"/>
    <path d="M50 29 c-4 0-7 3-7 7 0 4 3 7 4 8 l6 0 c1-1 4-4 4-8 0-4-3-7-7-7z"/>
    <circle cx="50" cy="25" r="5.6"/>
    <path d="M47 29 l3 7 3-7 c-1 2-5 2-6 0z"/>
    <path d="M44 80 l6 13 6-13 -3 2 -3 0 -3-2z"/>
    <rect x="33" y="86" width="34" height="2.6" rx="1"/>
  </g>
  <circle cx="48.4" cy="24" r="1.3" fill="#F0E5C9"/>
  <g fill="none" stroke="#F0E5C9" stroke-width="1" opacity=".85">
    <path d="M44 50 q6 4 12 0"/><path d="M44 58 q6 4 12 0"/><path d="M44 66 q6 4 12 0"/>
  </g>`;
}
function vultureSeal(){
  const ring="VAULTURE · ONE VAULT · SAME ODDS · ";
  const txt=(ring+ring).split("");
  const chars=txt.map((c,i)=>{
    const total=txt.length, a=(360/total)*i;
    return `<text font-family="Courier Prime, monospace" font-size="6.4" font-weight="700" fill="currentColor"
      text-anchor="middle" transform="rotate(${a} 100 100) translate(100 19)">${c==="·"?"&#183;":c}</text>`;
  }).join("");
  return svg("0 0 200 200",
    `<g stroke="currentColor" fill="none">
       <circle cx="100" cy="100" r="96" stroke-width="2.5"/>
       <circle cx="100" cy="100" r="89" stroke-width="1"/>
       <circle cx="100" cy="100" r="62" stroke-width="1"/>
       <circle cx="100" cy="100" r="58" stroke-width="2"/>
     </g>
     <g opacity=".9">${chars}</g>
     <g stroke="currentColor" stroke-width="1"><circle cx="100" cy="26" r="1.6" fill="currentColor"/><circle cx="100" cy="174" r="1.6" fill="currentColor"/><circle cx="26" cy="100" r="1.6" fill="currentColor"/><circle cx="174" cy="100" r="1.6" fill="currentColor"/></g>
     <g transform="translate(54 54) scale(0.92)">${vultureBird()}</g>`,
    `preserveAspectRatio="xMidYMid meet"`);
}

/* ============================================================= *
 *  HERO COLLAGE — engraved skyline rising from a cash hand,
 *  fanned banknotes behind. Original, print-collage spirit.
 * ============================================================= */
function heroCollage(){
  return svg("0 0 340 230",
   `<defs>
      <pattern id="hwin" width="7" height="9.5" patternUnits="userSpaceOnUse"><rect width="3.6" height="5.4" x="1.7" y="2" fill="#0C2635" opacity=".4"/></pattern>
      <pattern id="hwin2" width="9" height="11" patternUnits="userSpaceOnUse"><rect width="5" height="6.6" x="2" y="2.4" fill="#0C2635" opacity=".34"/></pattern>
      <pattern id="hhatch" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4.5" stroke="#0C2635" stroke-width="0.7" opacity=".5"/></pattern>
      <filter id="hsky" x="-15%" y="-15%" width="130%" height="135%"><feDropShadow dx="3.5" dy="5" stdDeviation="3.5" flood-color="#0C2635" flood-opacity=".26"/></filter>
      <filter id="hflat" x="-25%" y="-25%" width="150%" height="160%"><feDropShadow dx="2" dy="3" stdDeviation="2" flood-color="#0C2635" flood-opacity=".3"/></filter>
    </defs>

    <!-- engraved stone plinth (the vault floor) -->
    <g stroke="#0C2635" fill="none">
      <line x1="16" y1="189" x2="324" y2="189" stroke-width="2"/>
      <line x1="20" y1="193.5" x2="320" y2="193.5" stroke-width="1"/>
      <rect x="30" y="195" width="280" height="15" fill="url(#hhatch)" stroke="none" opacity=".85"/>
      <g stroke-width="1">${[66,108,150,192,234,276].map(x=>`<line x1="${x}" y1="195" x2="${x}" y2="210"/>`).join("")}</g>
      <line x1="30" y1="210" x2="310" y2="210" stroke-width="1.6"/>
    </g>

    <!-- skyline (engraved navy line-work), back to front -->
    <g stroke="#0C2635" stroke-width="1.4" stroke-linejoin="round" fill="#e8dcbf" filter="url(#hsky)">
      <!-- far slim spire (behind, lighter) -->
      <g stroke-width="1.1" fill="#efe3c6"><path d="M214 189 V70 l9-16 9 16 V189 z"/><rect x="217" y="80" width="12" height="100" fill="url(#hwin)" stroke="none"/></g>

      <!-- left clock tower -->
      <g transform="translate(42 0)">
        <path d="M0 189 V92 h28 V189 z"/>
        <path d="M-3 92 l17-15 17 15 z" fill="#F0E5C9"/>
        <rect x="2" y="78" width="24" height="12" fill="#F0E5C9"/>
        <rect x="4" y="104" width="20" height="76" fill="url(#hwin)" stroke="none"/>
        <circle cx="14" cy="68" r="8" fill="#F0E5C9"/><path d="M14 68 V61 M14 68 l4 3" stroke-width="1.1"/>
      </g>

      <!-- central classical bank (hero) -->
      <g transform="translate(120 0)">
        <rect x="0" y="150" width="100" height="39"/>
        <path d="M-4 150 h108 v-12 h-108 z" fill="#F0E5C9"/>        <!-- entablature -->
        <path d="M-6 138 L50 104 L106 138 Z" fill="#F0E5C9"/>        <!-- pediment -->
        <line x1="50" y1="104" x2="50" y2="96" stroke-width="1.2"/><circle cx="50" cy="93" r="3.4" fill="#F0E5C9"/>
        <g stroke-width="1.6">${[12,30,48,66,84].map(x=>`<line x1="${x}" y1="150" x2="${x}" y2="138"/>`).join("")}</g> <!-- columns -->
        <g stroke-width="1">${[156,162,168].map(y=>`<line x1="-2" y1="${y}" x2="102" y2="${y}"/>`).join("")}</g> <!-- steps -->
      </g>

      <!-- right tower with shaded face -->
      <g transform="translate(250 0)">
        <path d="M0 189 V72 h6 V64 h12 V72 h6 V189 z"/>
        <rect x="3" y="84" width="18" height="96" fill="url(#hwin2)" stroke="none"/>
        <path d="M24 189 V72 h0 z"/>
        <rect x="24" y="72" width="0" height="0"/>
      </g>
      <!-- shaded right slab -->
      <g transform="translate(276 0)">
        <path d="M0 189 V96 h22 V189 z"/>
        <rect x="0" y="96" width="22" height="93" fill="url(#hhatch)" stroke="none" opacity=".7"/>
        <rect x="3" y="104" width="16" height="78" fill="url(#hwin)" stroke="none"/>
      </g>
    </g>

    <!-- guilloche banknote fan, tucked at the foot of the city -->
    <g stroke="#28583B" stroke-width="1.2" filter="url(#hflat)">
      <g transform="rotate(-13 96 196)">
        <rect x="44" y="170" width="96" height="50" rx="3" fill="#cfe0c0"/>
        <rect x="49" y="175" width="86" height="40" rx="2" fill="none" stroke-width="0.8"/>
        <ellipse cx="74" cy="195" rx="13" ry="15" fill="#bcd6ad" stroke-width="0.9"/>
        <text x="92" y="184" font-family="DM Serif Display,serif" font-size="11" fill="#28583B">100</text>
        <text x="129" y="213" font-family="DM Serif Display,serif" font-size="9" fill="#28583B" text-anchor="end">VLT</text>
      </g>
      <g transform="rotate(11 250 196)">
        <rect x="206" y="172" width="96" height="50" rx="3" fill="#d6e4c8"/>
        <rect x="211" y="177" width="86" height="40" rx="2" fill="none" stroke-width="0.8"/>
        <ellipse cx="270" cy="197" rx="13" ry="15" fill="#c4dbb5" stroke-width="0.9"/>
        <text x="214" y="214" font-family="DM Serif Display,serif" font-size="11" fill="#28583B">100</text>
      </g>
    </g>

    <!-- central $ seal on the steps -->
    <g transform="translate(170 196)" filter="url(#hflat)">
      <circle r="16" fill="#F0E5C9" stroke="#28583B" stroke-width="1.6"/>
      <circle r="12.5" fill="none" stroke="#28583B" stroke-width="0.8"/>
      <text x="0" y="6" font-family="DM Serif Display,serif" font-size="18" fill="#28583B" text-anchor="middle">$</text>
    </g>`,
   `preserveAspectRatio="xMidYMid meet"`);
}

/* ============================================================= *
 *  PUBLIC API
 * ============================================================= */
window.ART = {
  // role medallion (image 2) — used for the corner pip + shop crew face
  crewEmblem: sym => `<img src="assets/role_${sym}.png" alt="" draggable="false" style="width:100%;height:100%;object-fit:contain;display:block;pointer-events:none">`,
  // framed character portrait (image 1, top row) — fills the card's portrait window
  crewPortrait: (sym, accent) => `<img class="cportrait" src="assets/crew_${sym}.png" alt="" draggable="false" style="width:100%;height:100%;object-fit:cover;object-position:50% 18%;display:block;pointer-events:none">`,
  // role medallion at seal scale — used for the intro crew strip + field-key legend
  crewSeal: (sym,color) => `<img src="assets/role_${sym}.png" alt="" draggable="false" style="width:100%;height:100%;object-fit:contain;display:block;pointer-events:none">`,
  gadgetIcon: id => svg("0 0 24 24", wrapG(GADGET_GLYPH[id]||G.coin), `style="width:100%;height:100%"`),
  icon: name => svg("0 0 24 24", ICONS[name]||"", `style="width:100%;height:100%"`),
  // engraved oval medallion behind a card emblem (uses currentColor)
  cardVignette: () => svg("0 0 64 64",
      `<g fill="none" stroke="currentColor" stroke-linecap="round">
        <ellipse cx="32" cy="32" rx="27" ry="30" stroke-width="0.7"/>
        <ellipse cx="32" cy="32" rx="23" ry="26" stroke-width="0.5"/>
        ${Array.from({length:54},(_,i)=>{const a=i*(360/54)*Math.PI/180,x1=32+Math.cos(a)*14.5,y1=32+Math.sin(a)*16.5,x2=32+Math.cos(a)*22.5,y2=32+Math.sin(a)*25.5;return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke-width="0.45"/>`;}).join("")}
      </g>`, `style="width:100%;height:100%"`),
  dial: bankFrameSVG, vultureSeal, heroCollage,
};
})();
