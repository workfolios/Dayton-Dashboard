(() => {
  'use strict';

  const mobileBreakpoint = 768;
  const main = document.getElementById('main-content');
  const sidebar = document.getElementById('sidebar');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lastDrawerTrigger = mobileBtn;

  const isMobile = () => window.innerWidth < mobileBreakpoint;
  const drawerIsOpen = () => isMobile() && !sidebar.classList.contains('-translate-x-full');

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.id = 'mobileMenuClose';
  closeBtn.setAttribute('aria-label', 'Close briefing navigation');
  closeBtn.className = 'md:hidden absolute top-4 right-4 p-2 text-zinc-300 hover:text-white text-xl font-bold z-40';
  closeBtn.innerHTML = '<i data-lucide="x"></i>';
  sidebar.prepend(closeBtn);
  if (window.lucide) window.lucide.createIcons();

  mobileBtn.type = 'button';
  mobileBtn.setAttribute('aria-controls', 'sidebar');
  sidebar.setAttribute('aria-label', 'Interactive briefing navigation');
  main.setAttribute('tabindex', '-1');

  function setDrawerState(open, options = {}) {
    const { returnFocus = false, focusMain = false } = options;
    if (!isMobile()) {
      sidebar.classList.remove('-translate-x-full');
      sidebar.removeAttribute('aria-hidden');
      mobileBtn.setAttribute('aria-expanded', 'false');
      mobileBtn.setAttribute('aria-label', 'Open briefing navigation');
      main.inert = false;
      return;
    }

    sidebar.classList.toggle('-translate-x-full', !open);
    sidebar.setAttribute('aria-hidden', open ? 'false' : 'true');
    mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileBtn.setAttribute('aria-label', open ? 'Close briefing navigation' : 'Open briefing navigation');
    main.inert = open;

    if (open) {
      closeBtn.focus();
    } else if (focusMain) {
      main.focus({ preventScroll: true });
    } else if (returnFocus && lastDrawerTrigger) {
      lastDrawerTrigger.focus();
    }
  }

  function openDrawer() {
    lastDrawerTrigger = mobileBtn;
    setDrawerState(true);
  }

  function closeDrawer(returnFocus = true) {
    setDrawerState(false, { returnFocus });
  }

  mobileBtn.addEventListener('click', (event) => {
    if (!isMobile()) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    drawerIsOpen() ? closeDrawer(true) : openDrawer();
  }, true);

  closeBtn.addEventListener('click', () => closeDrawer(true));

  document.addEventListener('keydown', (event) => {
    if (!drawerIsOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer(true);
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable = [...sidebar.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter(el => !el.hidden && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  function syncResponsiveDrawer() {
    if (isMobile()) {
      const open = !sidebar.classList.contains('-translate-x-full');
      sidebar.setAttribute('aria-hidden', open ? 'false' : 'true');
      mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      main.inert = open;
    } else {
      sidebar.classList.remove('-translate-x-full');
      sidebar.removeAttribute('aria-hidden');
      main.inert = false;
      mobileBtn.setAttribute('aria-expanded', 'false');
      mobileBtn.setAttribute('aria-label', 'Open briefing navigation');
    }
  }
  window.addEventListener('resize', syncResponsiveDrawer);
  syncResponsiveDrawer();

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    const id = btn.id.replace('nav-', '');
    btn.setAttribute('aria-controls', `tab-${id}`);
    if (id === 'bridge') btn.setAttribute('aria-current', 'page');
  });

  const originalSwitchTab = window.switchTab;
  if (typeof originalSwitchTab === 'function') {
    window.switchTab = function(tabId) {
      originalSwitchTab(tabId);
      document.querySelectorAll('.nav-btn').forEach(btn => btn.removeAttribute('aria-current'));
      document.getElementById(`nav-${tabId}`)?.setAttribute('aria-current', 'page');
      if (isMobile()) setDrawerState(false, { focusMain: true });
      if (prefersReducedMotion.matches) main.scrollTo({ top: 0, behavior: 'auto' });
    };
  }

  document.querySelectorAll('.source-badge').forEach((badge, index) => {
    badge.setAttribute('role', 'button');
    badge.setAttribute('tabindex', '0');
    badge.setAttribute('aria-expanded', 'false');
    badge.setAttribute('aria-label', `Source Intel ${index + 1}`);

    const setExpanded = (expanded) => {
      badge.dataset.expanded = expanded ? 'true' : 'false';
      badge.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    };

    badge.addEventListener('click', (event) => {
      event.stopPropagation();
      setExpanded(badge.getAttribute('aria-expanded') !== 'true');
    });
    badge.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setExpanded(badge.getAttribute('aria-expanded') !== 'true');
      } else if (event.key === 'Escape') {
        setExpanded(false);
        badge.focus();
      }
    });
  });

  document.querySelectorAll('.blueprint-zone').forEach((zone) => {
    const title = zone.querySelector('h3')?.textContent.trim() || 'Blueprint zone';
    zone.setAttribute('role', 'button');
    zone.setAttribute('tabindex', '0');
    zone.setAttribute('aria-expanded', 'false');
    zone.setAttribute('aria-label', `${title}: reveal details`);

    const setExpanded = (expanded) => {
      zone.dataset.expanded = expanded ? 'true' : 'false';
      zone.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    };

    zone.addEventListener('click', (event) => {
      event.stopPropagation();
      setExpanded(zone.getAttribute('aria-expanded') !== 'true');
    });
    zone.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setExpanded(zone.getAttribute('aria-expanded') !== 'true');
      } else if (event.key === 'Escape') {
        setExpanded(false);
        zone.focus();
      }
    });
  });

  document.addEventListener('click', (event) => {
    document.querySelectorAll('.source-badge[aria-expanded="true"], .blueprint-zone[aria-expanded="true"]').forEach((control) => {
      if (!control.contains(event.target)) {
        control.dataset.expanded = 'false';
        control.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const funnelList = document.getElementById('funnel-list');
  if (funnelList) {
    funnelList.setAttribute('aria-live', 'polite');
    funnelList.setAttribute('aria-atomic', 'true');
  }

  document.querySelectorAll('.funnel-layer').forEach((layer) => {
    layer.setAttribute('role', 'button');
    layer.setAttribute('tabindex', '0');
    layer.setAttribute('aria-pressed', 'false');
    layer.addEventListener('click', () => {
      document.querySelectorAll('.funnel-layer').forEach(item => item.setAttribute('aria-pressed', 'false'));
      layer.setAttribute('aria-pressed', 'true');
    });
    layer.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        layer.click();
      }
    });
  });

  const revenueCanvas = document.getElementById('revenueChart');
  if (revenueCanvas) {
    revenueCanvas.setAttribute('role', 'img');
    revenueCanvas.setAttribute('aria-label', 'Six-month revenue capacity scenario chart showing the lean production base and optional logistics and brand support upside.');
  }

  const scenarioStatus = document.createElement('div');
  scenarioStatus.className = 'sr-status';
  scenarioStatus.setAttribute('aria-live', 'polite');
  scenarioStatus.setAttribute('aria-atomic', 'true');
  const scenarioControls = document.getElementById('toggle-logistics')?.closest('.flex.flex-col.gap-3');
  if (scenarioControls) scenarioControls.appendChild(scenarioStatus);

  ['toggle-logistics', 'toggle-brand'].forEach((id) => {
    const toggle = document.getElementById(id);
    toggle?.addEventListener('change', () => {
      const logistics = document.getElementById('toggle-logistics')?.checked ? 'included' : 'excluded';
      const brand = document.getElementById('toggle-brand')?.checked ? 'included' : 'excluded';
      scenarioStatus.textContent = `Scenario updated. Logistics upside ${logistics}. Brand upside ${brand}.`;
    });
  });

  const slider = document.getElementById('delay-slider');
  const burnReadout = document.getElementById('burn-readout');
  const monthsReadout = document.getElementById('months-readout');
  if (slider) {
    slider.setAttribute('aria-label', 'Pre-opening delay in months');
    slider.setAttribute('aria-describedby', 'months-readout burn-readout');
    const syncSliderValue = () => {
      const months = slider.value;
      const burn = burnReadout?.textContent.trim() || '';
      slider.setAttribute('aria-valuetext', `${months} months, total cash burn ${burn}`);
    };
    slider.addEventListener('input', syncSliderValue);
    syncSliderValue();
  }
})();
