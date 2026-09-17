'use strict';

(() => {
  const { domains, phases, faqs } = window.KBS_CONTENT;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const phaseNames = ['RECONNAISSANCE', 'COVERAGE-LED HUNTING', 'CANDIDATE VALIDATION', 'STRUCTURED OUTPUT', 'INDEPENDENT VERIFICATION', 'TARGET-NEUTRAL REPORT'];
  const shortNames = ['Map the surface', 'Hunt with coverage', 'Challenge each claim', 'Structure the evidence', 'Verify independently', 'Report what holds'];
  const snippets = [
    '# architecture.md\n\nentry_points → trust_boundaries\n              → protected_resources\n\ncoverage: planned / checked / deferred',
    '// coverage-ledger.json\n\nunit: request → authorization → data\nhunter: isolated_agent\ncritic: check_gaps_and_evidence',
    '// independent verifier\n\ntrace: input → control → boundary\nquestion: can_this_claim_be_disproved?\nresult: bounded_observation',
    '// findings.json\n\nverdicts: [\n  "confirmed",\n  "needs_validation", "rejected"\n]',
    '// fresh source verification\n\nsource_claim → current_source\nchanged_record → independent_recheck\nfinal_record → schema_validation',
    'audit-output/\n├── REPORT.md\n├── FINDINGS-DETAIL.md\n├── NEEDS-VALIDATION.md\n└── coverage-ledger.json'
  ];
  const artifacts = ['architecture.md', 'coverage-ledger.json', 'candidate-validation', 'findings.json', 'verified-records', 'audit-output/'];
  const phaseTabs = $('#phase-tabs');
  phases.forEach((phase, i) => {
    const tab = document.createElement('button');
    tab.className = 'phase-tab'; tab.id = `phase-${i}`; tab.type = 'button';
    tab.setAttribute('role', 'tab'); tab.setAttribute('aria-controls', 'phase-panel');
    tab.innerHTML = `<span>${String(i + 1).padStart(2, '0')}</span><span><strong>${escape(shortNames[i])}</strong><small>${escape(phaseNames[i])}</small></span><span class="tab-arrow" aria-hidden="true">↗</span>`;
    tab.addEventListener('click', () => selectPhase(i));
    phaseTabs.append(tab);
  });
  function selectPhase(index) {
    $$('.phase-tab').forEach((tab, i) => { tab.classList.toggle('active', i === index); tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    const phase = phases[index];
    $('#phase-panel').setAttribute('aria-labelledby', `phase-${index}`);
    $('#phase-panel').innerHTML = `<div class="panel-top"><span class="panel-step">PHASE ${String(index + 1).padStart(2, '0')} / 06</span><span>THE AUDIT PLAYBOOK</span></div><h3>${escape(phase.title)}</h3><p>${escape(phase.description)}</p><div class="artifact-preview"><div class="artifact-window"><div class="artifact-bar"><i></i><i></i><i></i><span>${escape(artifacts[index])}</span></div><pre class="artifact-code">${escape(snippets[index])}</pre></div><p class="panel-foot">Artifact: ${escape(phase.artifact)}<br>Simplified examples illustrate the workflow; they are not complete report records.</p></div>`;
  }
  function keyboardTabs(container, selector, choose) {
    container.addEventListener('keydown', (event) => {
      const tabs = [...container.querySelectorAll(selector)];
      const index = tabs.indexOf(document.activeElement);
      if (index < 0) return;
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault(); choose(next); tabs[next].focus();
    });
  }
  selectPhase(0);
  keyboardTabs(phaseTabs, '.phase-tab', selectPhase);

  const icons = {
    core: '<path d="M12 2 3 6v6c0 5 5 8 9 10 4-2 9-5 9-10V6Z"/><path d="m8 12 3 3 5-6"/>',
    ai: '<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4M9 9h6v6H9Z"/>',
    web: '<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M3 8h18M3 16h18"/>',
    browser: '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20M5 5.5h.01M8 5.5h.01m1 7-3 3 3 3m6-6 3 3-3 3"/>',
    'supply-chain': '<path d="m12 2 9 5v10l-9 5-9-5V7Z"/><path d="m3 7 9 5 9-5M12 12v10M7.5 4.5l9 5v5"/>',
    cloud: '<path d="M6 17a5 5 0 1 1 1-10 6 6 0 0 1 11 2 4 4 0 1 1 0 8M12 13v9m-4-5 4-4 4 4"/>',
    protocols: '<rect x="8" y="2" width="8" height="5" rx="1"/><rect x="1" y="17" width="8" height="5" rx="1"/><rect x="15" y="17" width="8" height="5" rx="1"/><path d="M12 7v5m-7 5v-5h14v5"/>',
    availability: '<path d="M2 13h4l3-9 6 16 3-7h4"/><path d="M3 3h3M18 3h3M3 21h3"/>',
    data: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 4 18 4 18 0V5M3 12c0 4 18 4 18 0"/>',
    native: '<rect x="2" y="3" width="14" height="13" rx="1"/><path d="M5 21h8m-4-5v5"/><rect x="16" y="10" width="6" height="12" rx="1"/><path d="M18 19h2"/>',
    memory: '<path d="M2 7h20v11H2Z"/><path d="M5 18v3m4-3v3m6-3v3m4-3v3M5 10h4v5H5Zm10 0h4v5h-4Z"/>'
  };
  const groups = { app: ['core', 'web', 'browser', 'native', 'memory'], infra: ['supply-chain', 'cloud', 'protocols', 'availability', 'data'], ai: ['ai'] };
  let activeFilter = 'all';
  function renderDomains() {
    const term = $('#domain-search').value.trim().toLocaleLowerCase();
    const visible = domains.filter((domain) => (activeFilter === 'all' || groups[activeFilter].includes(domain.id)) && [domain.title, domain.english, domain.description, ...domain.tags].join(' ').toLocaleLowerCase().includes(term));
    const grid = $('#domain-grid'); grid.replaceChildren();
    visible.forEach((domain) => {
      const card = document.createElement('a'); card.className = `domain-card${domain.id === 'ai' ? ' featured' : ''}`;
      card.href = `https://github.com/cloudflare/security-audit-skill/blob/main/skills/security-audit/${encodeURIComponent(domain.sourceFilename)}`;
      card.target = '_blank'; card.rel = 'noopener noreferrer';
      card.setAttribute('aria-label', `Open the original ${domain.title} guide in a new tab`);
      card.innerHTML = `<div class="card-top"><span class="domain-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${icons[domain.id]}</svg></span><span class="card-number">${String(domains.indexOf(domain) + 1).padStart(2, '0')}<span class="card-arrow" aria-hidden="true">↗</span></span></div><h3>${escape(domain.title)}</h3><p>${escape(domain.description)}</p><div class="domain-tags">${domain.tags.map((tag) => `<span>${escape(tag)}</span>`).join('')}</div>`;
      grid.append(card);
    });
    $('#empty-state').hidden = visible.length > 0;
    $('#result-count').textContent = `${visible.length} security ${visible.length === 1 ? 'domain' : 'domains'} shown.`;
  }
  $$('.filter').forEach((button) => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    $$('.filter').forEach((item) => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
    renderDomains();
  }));
  $('#domain-search').addEventListener('input', renderDomains);
  $('#reset-search').addEventListener('click', () => { $('#domain-search').value = ''; $('[data-filter="all"]').click(); $('#domain-search').focus(); });
  renderDomains();

  const examples = {
    confirmed: { label: 'CONFIRMED', className: 'confirmed', title: 'A boundary violation is observed.', rows: [['Trust boundary', 'A user in tenant A must not be able to read documents belonging to tenant B.'], ['Illustrative evidence', 'In this fictional local test, an authenticated user from tenant A reads a dummy document owned by tenant B.'], ['Remediation direction', 'Verify the current user\'s tenant and the document\'s ownership before returning any data.']], note: 'A real finding must include the complete source path, validation conditions, and observed impact.' },
    needs_validation: { label: 'NEEDS VALIDATION', className: 'pending', title: 'A critical fact is still unknown.', rows: [['Source hypothesis', 'Authentication is delegated to an external gateway, so the application alone does not show the full control.'], ['Unresolved fact', 'The authentication policy applied to this route by the deployed gateway still needs to be verified.'], ['Next check', 'Ask the owner to confirm the configuration, or reproduce the relevant policy in an isolated local environment.']], note: 'Do not assign severity to an item awaiting validation. An unverified hypothesis is not a confirmed vulnerability.' },
    rejected: { label: 'REJECTED', className: 'rejected', title: 'An existing control blocks the path.', rows: [['Initial candidate', 'A user-supplied file path appeared capable of escaping its permitted directory.'], ['Counterevidence', 'In this fictional example, the trusted input layer normalizes the path and rejects access outside the root before it reaches the file operation.'], ['Final judgment', 'The actual input path is blocked by an effective control, so the candidate is rejected.']], note: 'A missing additional defense is not itself a vulnerability when an existing control already prevents the attack.' }
  };
  function selectFinding(verdict) {
    const example = examples[verdict];
    $$('.finding').forEach((button) => { const active = button.dataset.verdict === verdict; button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
    $('#finding-detail').setAttribute('aria-labelledby', `finding-${verdict}`);
    $('#finding-detail').innerHTML = `<div class="detail-header"><span>SAMPLE / ${verdict === 'confirmed' ? '001' : verdict === 'needs_validation' ? '002' : '003'}</span><span class="verdict ${example.className}">${example.label}</span></div><h3>${escape(example.title)}</h3>${example.rows.map(([label, body]) => `<div class="evidence-item"><span>${escape(label)}</span><p>${escape(body)}</p></div>`).join('')}<p class="evidence-note">↳ ${escape(example.note)}</p>`;
  }
  $$('.finding').forEach((button) => button.addEventListener('click', () => selectFinding(button.dataset.verdict)));
  keyboardTabs($('.finding-list'), '.finding', (index) => selectFinding(Object.keys(examples)[index]));
  selectFinding('confirmed');

  faqs.forEach((faq, index) => {
    const details = document.createElement('details');
    if (index === 0) details.open = true;
    const summary = document.createElement('summary'); summary.textContent = faq.question;
    const paragraph = document.createElement('p'); paragraph.textContent = faq.answer;
    details.append(summary, paragraph); $('#faq-list').append(details);
  });
  let toastTimer;
  function toast(message) { clearTimeout(toastTimer); $('#toast').textContent = message; $('#toast').classList.add('visible'); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3000); }
  $('#download-sample').addEventListener('click', () => {
    const link = document.createElement('a'); link.href = './sample-report.json'; link.download = 'boundary-lab-verdict-examples.json'; document.body.append(link); link.click(); link.remove();
    toast('Educational sample JSON download requested.');
  });

  const dialog = $('#install-dialog');
  let dialogOpener;
  const commandBase = 'npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit';
  let scope = 'project';
  function selectScope(nextScope) {
    scope = nextScope;
    $$('.install-tabs button').forEach((button) => { const active = button.dataset.scope === scope; button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
    $('#install-panel').setAttribute('aria-labelledby', `install-${scope}`);
    $('#install-command').textContent = commandBase + (scope === 'global' ? ' --global' : '');
    $('#copy-install').textContent = 'Copy';
  }
  selectScope('project');
  $$('.install-tabs button').forEach((button) => button.addEventListener('click', () => selectScope(button.dataset.scope)));
  keyboardTabs($('.install-tabs'), 'button', (index) => selectScope(index === 0 ? 'project' : 'global'));
  $$('[data-install]').forEach((button) => button.addEventListener('click', () => { dialogOpener = button.closest('#mobile-menu') ? $('.header-actions [data-install]') : button; closeMenu(); dialog.showModal(); document.body.style.overflow = 'hidden'; }));
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; dialogOpener?.focus(); });
  dialog.addEventListener('click', (event) => { const bounds = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close(); });
  $('#copy-install').addEventListener('click', async () => {
    const text = $('#install-command').textContent;
    try { await navigator.clipboard.writeText(text); }
    catch {
      const input = document.createElement('textarea'); input.value = text; input.style.position = 'fixed'; input.style.opacity = '0'; dialog.append(input); input.select();
      const copied = document.execCommand('copy'); input.remove();
      if (!copied) { toast('Select the command and copy it manually.'); return; }
    }
    $('#copy-install').textContent = 'Copied ✓'; toast('Installation command copied.');
  });
  const toggle = $('.menu-toggle');
  function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); $('#mobile-menu').hidden = true; }
  toggle.addEventListener('click', () => { const expanded = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(expanded)); toggle.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu'); $('#mobile-menu').hidden = !expanded; });
  $$('#mobile-menu a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !$('#mobile-menu').hidden) { closeMenu(); toggle.focus(); }
    if (event.key === '/' && !dialog.open && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) && !document.activeElement.isContentEditable) { event.preventDefault(); $('#domain-search').focus(); }
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });
})();
