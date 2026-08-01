var e=`nies_custom_blog_posts`,t=[{id:1,title:`Essential Fire Safety Maintenance Rules for Industrial Facilities`,slug:`essential-fire-safety-maintenance`,category:`Fire Safety`,summary:`Regular maintenance and annual refilling of fire extinguishers are critical line-of-defense measures.`,content:`<p>Fire is a serious threat to the physical safety and security of any workplace. Regular inspection and servicing using well-equipped workshops guarantee optimal operational readiness in emergency scenarios.</p><h3>1. Annual Extinguisher Servicing & Chemical Purging</h3><p>ABC Powder and CO2 cylinders require hydrostatic pressure checks and chemical quality inspection annually according to Bangladesh Fire Service & Civil Defence norms.</p>`,thumbnail:`/frontend_for_Nies/wp-content/uploads/2017/05/fire-detection-alarm-system.jpg`,published_at:`2026-07-01`,author:`N.I. Safety Team`},{id:2,title:`Why Modern Facilities Need Integrated CCTV & Access Control`,slug:`integrated-cctv-and-access-control`,category:`CCTV & Access Control`,summary:`Learn how combining surveillance cameras with smart door access boosts facility protection.`,content:`<p>INTEGRATED SOLUTIONS FOR SECURITY & SURVEILLANCE bring together real-time tracking, intruder detection, and central control room management.</p><h3>Biometric Security Integration</h3><p>Pairing HD IP surveillance cameras with fingerprint and RFID door locks ensures full audit trail compliance for commercial buildings in Dhaka.</p>`,thumbnail:`/frontend_for_Nies/wp-content/uploads/2017/11/AccessControlSystems.jpg`,published_at:`2026-07-15`,author:`N.I. Safety Team`},{id:3,title:`The 6 Classes of Fire & Extinguisher Selection Guide`,slug:`classes-of-fire-extinguisher-guide`,category:`Safety Awareness`,summary:`Master the 6 classes of fire (A, B, C, D, Electrical, K) and learn which extinguisher to use to protect your home or business.`,content:`<p class="lead text-base font-medium text-navy mb-4">Understanding the different <strong>classes of fire</strong> is a fundamental safety requirement for every homeowner, business owner, and facility manager. When a fire breaks out, human instinct often tells us to grab water—but in many common scenarios, water will actually cause a fire to explode.</p><p class="mb-4">Fire isn't one-size-fits-all; its behavior depends entirely on the fuel source. Using the wrong <strong>fire extinguisher type</strong> can transform a minor flare-up into a catastrophic disaster.</p><h3 class="text-lg font-extrabold text-navy uppercase mb-3">🧯 The 6 Classes of Fire Quick Guide</h3><ul class="list-disc pl-5 mb-4 space-y-2 text-sm text-navy"><li><strong>Class A (Ash):</strong> Ordinary Combustibles (Wood, paper, trash) — <em>Use Water, Foam, or ABC Dry Powder</em></li><li><strong>Class B (Barrel):</strong> Flammable Liquids (Petrol, oil, paint) — <em>Use Foam, CO2, or Dry Powder. 🛑 NEVER WATER!</em></li><li><strong>Class C (Cylinder):</strong> Flammable Gases (LPG, Methane) — <em>Use Dry Powder (Turn off gas first!)</em></li><li><strong>Class D (Dense Metals):</strong> Combustible Metals (Magnesium, Titanium) — <em>Use Class D Powder. 🛑 NEVER WATER!</em></li><li><strong>Electrical:</strong> Energized Equipment (Short circuits, motors) — <em>Use CO2 or ABC Powder. 🛑 NEVER WATER!</em></li><li><strong>Class K (Kitchen):</strong> Cooking Oils & Grease — <em>Use Wet Chemical, Fire Blanket, or Lid. 🛑 NEVER WATER!</em></li></ul><h3 class="text-lg font-extrabold text-navy uppercase mb-3">🧠 Master Fire Preparedness: The "See, Do, Teach" Drill</h3><p class="mb-4">Reading safety guidelines is a great first step, but under high-stress conditions, quick muscle memory is required. Conduct hazard assessments in your office and kitchen, and ensure your team knows why throwing water on grease or electrical fires is extremely dangerous.</p>`,thumbnail:`/frontend_for_Nies/wp-content/uploads/2017/11/mr-fire-safety-limited-fire-safety-training-shrewsbury-banner.jpg`,published_at:`2026-08-01`,author:`N.I. Safety Team`}];function n(){let n=localStorage.getItem(e);if(!n)return localStorage.setItem(e,JSON.stringify(t)),t;try{return JSON.parse(n)}catch{return t}}var r=n(),i=document.getElementById(`featured-article-container`),a=document.getElementById(`blog-posts-grid`),o=document.getElementById(`articles-count-badge`),s=document.getElementById(`blog-search-input`),c=document.getElementById(`reader-modal`),l=document.getElementById(`reader-close-btn`),u=document.getElementById(`reader-close-bottom`),d=document.getElementById(`reader-cat-badge`),f=document.getElementById(`reader-title`),p=document.getElementById(`reader-meta`),m=document.getElementById(`reader-img`),h=document.getElementById(`reader-content`);function g(e){d&&(d.textContent=e.category||`Fire Safety`),f&&(f.textContent=e.title),p&&(p.textContent=`${e.published_at} • By ${e.author||`N.I. Safety Team`}`),m&&(m.src=e.thumbnail||`/frontend_for_Nies/wp-content/uploads/2017/05/fire-detection-alarm-system.jpg`),h&&(h.innerHTML=e.content||`<p>${e.summary}</p>`),c&&(c.classList.remove(`hidden`),c.classList.add(`flex`))}function _(){c&&(c.classList.add(`hidden`),c.classList.remove(`flex`))}l?.addEventListener(`click`,_),u?.addEventListener(`click`,_);function v(e){!i||!e||(i.innerHTML=`
      <div class="bg-navy text-white rounded-2xl overflow-hidden shadow-2xl border border-navy-light grid grid-cols-1 lg:grid-cols-12">
        <div class="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
          <div class="space-y-4">
            <span class="inline-block px-3 py-1 bg-flame text-white text-[10px] font-black uppercase tracking-widest rounded shadow">
              🔥 Featured Safety Insights
            </span>
            <h2 class="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
              ${e.title}
            </h2>
            <div class="flex items-center space-x-3 text-xs text-gray-400 font-semibold">
              <span>${e.published_at}</span>
              <span>•</span>
              <span>By ${e.author||`N.I. Safety Team`}</span>
            </div>
            <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
              ${e.summary}
            </p>
          </div>

          <div>
            <button data-read-id="${e.id}" class="read-post-trigger inline-flex items-center px-6 py-3 bg-flame hover:bg-flame-hover text-white text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-md transition-all">
              <span>Read Full Featured Article</span>
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <div class="lg:col-span-5 relative h-64 lg:h-auto overflow-hidden">
          <img src="${e.thumbnail}" alt="${e.title}" class="w-full h-full object-cover" />
        </div>
      </div>
    `)}function y(e){if(o&&(o.textContent=`Showing ${e.length} Articles`),a){if(e.length===0){a.innerHTML=`<div class="col-span-full py-12 text-center text-gray-500 text-xs uppercase font-bold">No articles match your search or filter.</div>`;return}a.innerHTML=e.map(e=>`
      <article class="blog-card bg-clean border border-clean-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
        <div class="h-56 overflow-hidden relative">
          <img 
            src="${e.thumbnail||`/frontend_for_Nies/wp-content/uploads/2017/05/fire-detection-alarm-system.jpg`}" 
            alt="${e.title}"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <span class="absolute top-4 left-4 bg-navy text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded shadow">
            ${e.category||`Fire Safety`}
          </span>
        </div>

        <div class="p-6 flex-grow flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <div class="flex items-center space-x-3 text-xs text-gray-500 font-semibold">
              <span>${e.published_at}</span>
              <span>•</span>
              <span>By ${e.author||`N.I. Safety Team`}</span>
            </div>

            <h2 class="text-xl font-bold text-navy group-hover:text-flame transition-colors line-clamp-2">
              <button data-read-id="${e.id}" class="read-post-trigger text-left hover:underline">
                ${e.title}
              </button>
            </h2>

            <p class="text-xs text-gray-600 leading-relaxed line-clamp-3">
              ${e.summary}
            </p>
          </div>

          <div class="pt-4 border-t border-clean-border flex items-center justify-between">
            <button 
              data-read-id="${e.id}"
              class="read-post-trigger inline-flex items-center text-xs font-extrabold uppercase text-flame hover:underline space-x-1"
            >
              <span>Read Article</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>
      </article>
    `).join(``),document.querySelectorAll(`.read-post-trigger`).forEach(e=>{e.addEventListener(`click`,e=>{let t=parseInt(e.currentTarget.getAttribute(`data-read-id`)||`0`,10),n=r.find(e=>e.id===t);n&&g(n)})})}}r.length>0&&(v(r[0]),y(r)),s?.addEventListener(`input`,()=>{let e=s.value.toLowerCase().trim();y(r.filter(t=>t.title.toLowerCase().includes(e)||t.summary.toLowerCase().includes(e)||t.category&&t.category.toLowerCase().includes(e)))});var b=document.querySelectorAll(`.blog-cat-btn`);b.forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget,n=t.getAttribute(`data-cat`);b.forEach(e=>{e.className=`blog-cat-btn px-4 py-2 text-xs font-bold uppercase rounded-lg bg-white text-navy border border-clean-border hover:bg-flame hover:text-white transition-all`}),t.className=`blog-cat-btn px-4 py-2 text-xs font-bold uppercase rounded-lg bg-flame text-white shadow transition-all`,y(n===`all`?r:r.filter(e=>e.category===n))})});