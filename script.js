const DESIGN_WIDTH = 2048;
const DESIGN_HEIGHT = 1152;

function setArtboardScale() {
  if (window.innerWidth <= 768) {
    document.documentElement.style.setProperty("--artboard-scale", 1);
    return;
  }
  const scale = Math.min(
    window.innerWidth / DESIGN_WIDTH,
    window.innerHeight / DESIGN_HEIGHT
  );
  document.documentElement.style.setProperty("--artboard-scale", scale);
}

window.addEventListener("resize", setArtboardScale);
setArtboardScale();
document.documentElement.classList.add("is-ready");

// Scroll Animation Observer
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
});

// AI Volumetric Stack Interactivity
document.addEventListener('DOMContentLoaded', () => {
  const layers = document.querySelectorAll('.ai-block-layer');
  const cards = document.querySelectorAll('.ai-detail-card');
  
  if (!layers.length) return;

  layers.forEach(layer => {
    layer.addEventListener('mouseenter', () => {
      // Scrub active states from physical vector array
      layers.forEach(l => l.classList.remove('active'));
      cards.forEach(c => c.classList.remove('active'));

      // Re-inject active state to target vector
      layer.classList.add('active');
      
      const buildID = layer.getAttribute('data-build');
      const targetCard = document.getElementById(`desc-${buildID}`);
      
      if (targetCard) {
        targetCard.classList.add('active');
      }
    });
  });
});

// Premium Cinematic Text Transformation
document.addEventListener('DOMContentLoaded', () => {
  const roleText = document.getElementById('hero-role');
  const insightText = document.getElementById('hero-insight');

  if (!roleText || !insightText) return;

  const states = [
    { role: "Data Analyst", insight: "Data Insights", isPrimary: true },
    { role: "AI Builder", insight: "AI Builds", isPrimary: false }
  ];

  let currentState = 0;

  // Initialize by wrapping existing text in .word spans
  [roleText, insightText].forEach(el => {
    el.classList.add('is-primary-state'); // Initial load condition
    const text = el.textContent;
    el.innerHTML = '';
    text.split(' ').forEach((wordText, index, arr) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = wordText;
      el.appendChild(span);
      if (index < arr.length - 1) el.appendChild(document.createTextNode(' '));
    });
  });

  function animateTextElement(el, newText, makePrimary) {
    const existingWords = el.querySelectorAll('.word');
    
    // Outgoing Flash Burst
    existingWords.forEach((word) => {
      word.style.transitionDelay = '0ms'; 
      word.classList.add('text-flash-out');
    });
    
    // Wait for the flash to hit peak brightness
    setTimeout(() => {
      const words = newText.split(' ');
      el.innerHTML = '';
      
      // Toggle conditional styling bridge before appending new words
      if (makePrimary) {
        el.classList.add('is-primary-state');
      } else {
        el.classList.remove('is-primary-state');
      }

      // Swap text while blinded
      words.forEach((wordText) => {
        const span = document.createElement('span');
        span.className = 'word text-flash-in';
        span.textContent = wordText;
        el.appendChild(span);
        if (wordText !== words[words.length - 1]) el.appendChild(document.createTextNode(' '));
      });

      // Clear the flash to reveal the new text smoothly
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const newWordSpans = el.querySelectorAll('.word');
          newWordSpans.forEach(span => {
            span.classList.remove('text-flash-in');
          });
        });
      });
    }, 400);
  }

  const workBtn = document.querySelector('.button--work');
  const buildsBtn = document.querySelector('.button--builds');

  function triggerButtonGlares() {
    if (workBtn) {
      workBtn.classList.remove('button-glare-sweep-rtl');
      void workBtn.offsetWidth; // Force reflow
      workBtn.classList.add('button-glare-sweep-rtl');
    }
    if (buildsBtn) {
      buildsBtn.classList.remove('button-glare-sweep-ltr');
      void buildsBtn.offsetWidth; // Force reflow
      buildsBtn.classList.add('button-glare-sweep-ltr');
    }
  }

  setInterval(() => {
    currentState = (currentState + 1) % states.length;
    const currentSet = states[currentState];
    
    // Animate "Data Analyst" to "AI Builder"
    animateTextElement(roleText, currentSet.role, currentSet.isPrimary);
    
    // Animate "Data Insights" to "AI Builds" 1 second later
    setTimeout(() => {
      animateTextElement(insightText, currentSet.insight, currentSet.isPrimary);
    }, 1000);

    // Trigger button glares slightly after the second line finishes snapping in
    setTimeout(() => {
      triggerButtonGlares();
    }, 2000);

  }, 4500); // 4.5 seconds interval
});

// --- Dynamic 3D Flying Word Navigation Transition & Active Scroll Spy ---
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.pill-list .pill, .hero__copy a.button, .button--reach');
  const sections = document.querySelectorAll('section, main.hero');
  const header = document.querySelector('.site-header');
  const heroArtboard = document.querySelector('.hero-artboard');
  // 1. Dynamic Dynamic Registry (Scales kinetics to all defined sections!)
  const trackedNodes = [];
  const validTargets = ['about', 'education', 'projects', 'tools', 'ai-builds', 'exposure', 'testimonials', 'contact'];
  
  validTargets.forEach(id => {
    const section = document.getElementById(id);
    const link = Array.from(links).find(l => l.getAttribute('href') === '#' + id);
    const targetWord = section ? section.querySelector('.title-merge-target') : null;

    if (section && link && targetWord) {
      // Spawn unique kinetic vessel for this distinct channel
      const kinetic = document.createElement('div');
      kinetic.className = 'scroll-reactive-word';
      kinetic.textContent = targetWord.textContent.trim().toUpperCase();
      
      // Dynamically hijack computed state to guarantee perfect mathematical scaling ratio and color parity!
      const computedStyles = window.getComputedStyle(link);
      const targetStyles = window.getComputedStyle(targetWord);
      
      kinetic.style.fontSize = computedStyles.fontSize; // Cures the scaling overflow bug!
      if (targetStyles.color) kinetic.style.color = targetStyles.color;
      
      document.body.appendChild(kinetic);

      document.body.appendChild(kinetic);

      trackedNodes.push({
        id,
        section,
        link,
        targetWord,
        dom: kinetic,
        // Metric cache fields
        baseFont: 17, targetFont: 80, maxScale: 4.7,
        startX: 0, startY: 0, absoluteTargetLeft: 0, absoluteTargetTop: 0
      });
    }
  });

  // Systemic Cache Engine: Pre-calculate all expensive DOM layout reads to guarantee 60fps scrolling!
  let sectionMetrics = [];
  function updateLayoutMetrics() {
    trackedNodes.forEach(node => {
      node.baseFont = parseFloat(window.getComputedStyle(node.link).fontSize) || 17;
      node.targetFont = parseFloat(window.getComputedStyle(node.targetWord).fontSize) || 80;
      node.maxScale = node.targetFont / node.baseFont;
      
      const srcRect = node.link.getBoundingClientRect();
      node.startX = srcRect.left;
      node.startY = srcRect.top;
      
      const destRect = node.targetWord.getBoundingClientRect();
      node.absoluteTargetLeft = destRect.left;
      node.absoluteTargetTop = destRect.top + window.scrollY;
    });

    sectionMetrics = Array.from(sections).map(section => ({
      id: section.getAttribute('id') || 'home',
      top: section.offsetTop,
      height: section.clientHeight
    }));
  }

  // Bind Cache Engine to critical viewport changes
  window.addEventListener('resize', updateLayoutMetrics);
  setTimeout(updateLayoutMetrics, 300); // Initial calculation after DOM settle

  // Reusable flying word physics engine (Optimized for direct Clicks)
  function triggerFlyingWord(link, targetSection, duration = '1.2s') {
    // Fetch proper text and color via dynamic matching node for guaranteed semantic unity
    const matchingNode = trackedNodes.find(n => n.section === targetSection);
    const wordText = matchingNode ? matchingNode.targetWord.textContent.trim().toUpperCase() : link.textContent.toUpperCase();
    
    const flyingWord = document.createElement('div');
    flyingWord.className = 'flying-word';
    flyingWord.textContent = wordText;
    
    if (matchingNode) {
       flyingWord.style.color = matchingNode.dom.style.color;
    }

    flyingWord.style.position = 'absolute';
    flyingWord.style.transition = `transform ${duration} cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration} cubic-bezier(0.16, 1, 0.3, 1)`;

    const rect = link.getBoundingClientRect();
    const startX = rect.left + window.scrollX;
    const startY = rect.top + window.scrollY;

    flyingWord.style.left = `${startX}px`;
    flyingWord.style.top = `${startY}px`;
    flyingWord.style.fontSize = window.getComputedStyle(link).fontSize;
    flyingWord.style.fontWeight = '600';
    document.body.appendChild(flyingWord);

    setTimeout(() => {
      const targetTitle = targetSection.querySelector('.section-title');
      let targetAbsX = window.innerWidth / 2;
      let targetAbsY = targetSection.offsetTop + 100;

      if (targetTitle) {
        const tRect = targetTitle.getBoundingClientRect();
        targetAbsX = tRect.left + window.scrollX;
        targetAbsY = targetSection.offsetTop + 100;
      }

      const deltaX = targetAbsX - startX;
      const deltaY = targetAbsY - startY;

      flyingWord.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(4) rotateX(35deg) rotateY(-20deg)`;
      flyingWord.style.opacity = '0';
    }, 50);

    setTimeout(() => {
      flyingWord.remove();
    }, parseFloat(duration) * 1000 + 200);
  }

  // Manual Link Interceptors
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '#home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        links.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
        return;
      }
      if (!targetId.startsWith('#')) return;
      
      e.preventDefault();
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      links.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');

      triggerFlyingWord(link, targetSection, '1.2s');
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Master Scroll Monitor System (Throttled for Performance)
  let isScrolling = false;
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;

    // 0. Interactive Hero Fading Engine (Clears the slate for the Journey Word)
    if (heroArtboard) {
      const heroFade = Math.max(0, Math.min(1, currentScroll / 380));
      heroArtboard.style.opacity = (1 - heroFade).toString();
    }

    // 1. Feature A: Dynamic Background Persistence
    if (currentScroll > 25) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }

    // 2. Feature B: The Grand Orchestra - Orchestrated Systemic Word Merging!
    trackedNodes.forEach(node => {
      const targetScrollLimit = node.section.offsetTop;
      let progress = 0;

      // Specialized Physics Formula Selection
      if (node.id === 'about') {
        // Retain original mechanics for 'About': linear from top, early-snap at 80%
        progress = Math.max(0, Math.min(1, currentScroll / (targetScrollLimit * 0.8)));
      } else {
        // Absolute Depth Calibration: Anchor strictly to visual pixel differentials rather than percentages.
        // This cures all escalation bugs and guarantees identical pacing for the remainder of the page!
        const finishScroll = targetScrollLimit - 300; // Lock early 300px below top
        const travelRange = 350; // Snappy duration
        const startScroll = finishScroll - travelRange; // Universal Launch explicitly pegged 650px before arrival
        
        if (currentScroll > startScroll) {
          progress = Math.max(0, Math.min(1, (currentScroll - startScroll) / travelRange));
        }
      }
      
      if (progress > 0.001) {
        // High-performance cached geometry rendering (ZERO layout thrashing!)
        const destRectLeft = node.absoluteTargetLeft;
        const destRectTop = node.absoluteTargetTop - currentScroll;

        const currentX = node.startX + (destRectLeft - node.startX) * progress;
        const currentY = node.startY + (destRectTop - node.startY) * progress;
        const scale = 1 + (node.maxScale - 1) * progress;
        
        let op = 1;
        if (progress < 0.15) op = progress / 0.15;

        // Perfect Handoff Engine: When arrived, show native text to fix subpixel scale drift!
        if (progress >= 1) {
          node.dom.style.opacity = '0';
          node.targetWord.style.opacity = '1';
        } else {
          node.dom.style.opacity = op.toString();
          node.targetWord.style.opacity = '0';
        }

        node.dom.style.left = `${currentX}px`;
        node.dom.style.top = `${currentY}px`;
        node.dom.style.transform = `scale(${scale})`;
      } else {
        node.dom.style.opacity = '0';
        node.targetWord.style.opacity = '0';
      }
    });

    // 3. Feature C: High Integrity Scroll Spy (Cached Version)
    let current = 'home';
    if (sectionMetrics.length > 0) {
      sectionMetrics.forEach(metric => {
        if (currentScroll >= metric.top - metric.height / 3) {
          current = metric.id;
        }
      });
    }

    links.forEach(link => {
      link.classList.remove('is-active');
      const href = link.getAttribute('href');
      if (href === '#' && current === 'home') {
        link.classList.add('is-active');
      } else if (href === '#' + current) {
        link.classList.add('is-active');
      }
    });

    // 4. Feature D: Buttery Smooth Active Dot Sliding (Optimized!)
    const activeDot = document.querySelector('.nav-active-dot');
    const activeLink = document.querySelector('.pill-list .pill.is-active');
    
    // Only fire the animation and layout calculation if the active section actually changed
    // This prevents firing hundreds of overlapping GSAP tweens and DOM layout recalculations every millisecond!
    if (activeDot && activeLink && activeDot.dataset.currentActive !== current) {
      activeDot.dataset.currentActive = current;
      
      const containerRect = document.querySelector('.pill-nav-items').getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      
      // Calculate exact pixel offset from the left edge of the container to the center of the active pill
      const targetX = (linkRect.left - containerRect.left) + (linkRect.width / 2);
      
      gsap.to(activeDot, {
        x: targetX,
        xPercent: -50,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }
    
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // Force an initial scroll event to calculate and position the active dot on page load
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 100);
});

// --- Cinematic 3D Parallax Tilt for Cards ---
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.about-card, .project-card, .testimonial-card');

  cards.forEach(card => {
    // Lock the card into a 3D rendering context
    card.style.transformStyle = 'preserve-3d';
    
    // Elevate all direct children so they float dynamically off the card surface when it tilts
    Array.from(card.children).forEach(child => {
      child.style.transform = 'translateZ(30px)';
      // Add a slight transition in case we want to animate the pop-out later
      child.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mousemove', (e) => {
      // Prevent math glitches if the card hasn't faded in yet via scroll-spy
      if (!card.closest('.is-visible') && !card.closest('.hero')) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation. Max rotation is 12 degrees on the furthest edge.
      const rotateX = ((y - centerY) / centerY) * -12; 
      const rotateY = ((x - centerX) / centerX) * 12;
      
      // Fast transition for instantaneous, buttery smooth mouse tracking
      card.style.transition = 'transform 0.1s ease-out';
      card.style.transform = `perspective(1000px) translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      // Restore the smooth, heavy cinematic transition for the reset
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.transform = 'perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg)';
      
      // Clean up inline styles after the reset transition finishes 
      // so native CSS hover rules can resume control seamlessly.
      setTimeout(() => {
         if (!card.matches(':hover')) {
             card.style.transform = '';
             card.style.transition = '';
         }
      }, 500);
    });
  });
});

// --- Vanilla JS DotField Canvas Engine ---
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('dot-field-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Config exactly mapped from the User's React Snippet
  const config = {
    dotRadius: 0.7,   /* Reduced from 1 to make dots physically smaller and sharper */
    dotSpacing: 20,   /* Increased from 14 to spread them out for a more elegant, subtle look */
    bulgeStrength: 67,
    glowRadius: 90,
    cursorRadius: 250,
    cursorForce: 0.12,
    gradientFrom: '#A855F7',
    gradientTo: '#B497CF',
    glowColor: '#120F17'
  };

  let width, height;
  let dots = [];
  let mouse = { x: -1000, y: -1000 };
  let targetMouse = { x: -1000, y: -1000 };

  // Utility to parse hex
  function hexToRgb(hex) {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : {r:0,g:0,b:0};
  }

  const cFrom = hexToRgb(config.gradientFrom);
  const cTo = hexToRgb(config.gradientTo);
  const cGlow = hexToRgb(config.glowColor);

  function lerpColorObj(c1, c2, factor) {
    return {
      r: Math.round(c1.r + factor * (c2.r - c1.r)),
      g: Math.round(c1.g + factor * (c2.g - c1.g)),
      b: Math.round(c1.b + factor * (c2.b - c1.b))
    };
  }

  function resize() {
    // Pro-Tip: Lock the internal canvas resolution precisely to the user's viewport.
    // If we use parentElement (body), it tries to render a canvas 5000px tall!
    width = window.innerWidth;
    height = window.innerHeight;
    // Scale for High-DPI / Retina displays to keep dots perfectly crisp
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    initDots();
  }

  function initDots() {
    dots = [];
    const cols = Math.ceil(width / config.dotSpacing) + 2;
    const rows = Math.ceil(height / config.dotSpacing) + 2;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          baseX: i * config.dotSpacing,
          baseY: j * config.dotSpacing,
          x: i * config.dotSpacing,
          y: j * config.dotSpacing
        });
      }
    }
  }

  // Track mouse coordinates globally across the viewport
  window.addEventListener('mousemove', (e) => {
    targetMouse.x = e.clientX;
    targetMouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    targetMouse.x = -1000;
    targetMouse.y = -1000;
  });

  window.addEventListener('resize', resize);
  
  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth physics interpolation for the mouse tracking (spring effect)
    mouse.x += (targetMouse.x - mouse.x) * config.cursorForce;
    mouse.y += (targetMouse.y - mouse.y) * config.cursorForce;

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const dx = mouse.x - dot.baseX;
      const dy = mouse.y - dot.baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repulsion / Bulge Physics
      if (dist < config.cursorRadius) {
        // Curve the force: strongest near the center, fading out to the edge of cursorRadius
        const ratio = 1 - dist / config.cursorRadius;
        const force = ratio * config.bulgeStrength;
        
        const angle = Math.atan2(dy, dx);
        dot.x = dot.baseX - Math.cos(angle) * force;
        dot.y = dot.baseY - Math.sin(angle) * force;
      } else {
        // Spring back to resting grid position if outside interaction radius
        dot.x += (dot.baseX - dot.x) * 0.1;
        dot.y += (dot.baseY - dot.y) * 0.1;
      }

      // Dynamic Gradient Coloring
      const xRatio = Math.max(0, Math.min(1, dot.baseX / width));
      let colorObj = lerpColorObj(cFrom, cTo, xRatio);

      // Glow logic: if close to cursor, mix in the glowColor
      if (dist < config.glowRadius) {
        const glowRatio = 1 - (dist / config.glowRadius);
        // Exponent curves the glow so it's concentrated exactly near the center
        colorObj = lerpColorObj(colorObj, cGlow, Math.pow(glowRatio, 1.5));
      }

      ctx.fillStyle = `rgb(${colorObj.r}, ${colorObj.g}, ${colorObj.b})`;
      ctx.beginPath();
      // Draw the dot
      ctx.arc(dot.x, dot.y, config.dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Request next frame for 60fps loop
    requestAnimationFrame(render);
  }

  // Boot up the engine
  resize();
  render();
});

// --- GSAP Pill Navigation Engine ---
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP is not loaded. PillNav animations will not work.');
    return;
  }

  const pills = document.querySelectorAll('.pill-list .pill');
  if (pills.length === 0) return;

  const ease = 'power3.easeOut';
  const timelines = [];
  const activeTweens = [];

  function layout() {
    pills.forEach((pill, i) => {
      const circle = pill.querySelector('.hover-circle');
      const label = pill.querySelector('.pill-label');
      const hoverLabel = pill.querySelector('.pill-label-hover');
      
      if (!circle) return;

      const rect = pill.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      
      // Advanced geometry to calculate exact circle size needed to cover the rectangle
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`
      });

      if (label) gsap.set(label, { y: 0 });
      if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

      // Kill old timeline if it exists
      if (timelines[i]) timelines[i].kill();
      
      const tl = gsap.timeline({ paused: true });

      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

      if (label) {
        tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
      }

      if (hoverLabel) {
        gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
      }

      timelines[i] = tl;
    });
  }

  // Initial layout. Add a small delay to ensure web fonts have loaded and sizes are final.
  setTimeout(() => {
    layout();
  }, 150);

  window.addEventListener('resize', layout);

  pills.forEach((pill, i) => {
    pill.addEventListener('mouseenter', () => {
      const tl = timelines[i];
      if (!tl) return;
      if (activeTweens[i]) activeTweens[i].kill();
      activeTweens[i] = tl.tweenTo(tl.duration(), {
        duration: 0.3,
        ease,
        overwrite: 'auto'
      });
    });

    pill.addEventListener('mouseleave', () => {
      const tl = timelines[i];
      if (!tl) return;
      if (activeTweens[i]) activeTweens[i].kill();
      activeTweens[i] = tl.tweenTo(0, {
        duration: 0.2,
        ease,
        overwrite: 'auto'
      });
    });
  });

  // Note: Your main IntersectionObserver scrollspy code needs to update the class from 
  // `.site-nav__link--active` to `.is-active` to match this new structure! Let's handle that.
});

// --- Hover Popup System ---
document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.hover-trigger[data-popup]');
  const popupContainer = document.getElementById('project-popup');
  
  if (!popupContainer || triggers.length === 0) return;

  // Add event listeners to all triggers
  triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', handlePopupEnter);
    trigger.addEventListener('mouseleave', handlePopupLeave);
  });

  // Keep popup active if hovering over the popup itself
  popupContainer.addEventListener('mouseenter', () => {
    popupContainer.classList.add('is-active');
  });
  
  popupContainer.addEventListener('mouseleave', () => {
    popupContainer.classList.remove('is-active');
  });

  function handlePopupEnter(e) {
    // Disable on tablets and mobile devices
    if (window.innerWidth <= 1024) return;

    const trigger = e.currentTarget;
    const popupId = trigger.getAttribute('data-popup');
    
    // Switch active content block
    const contents = popupContainer.querySelectorAll('.popup-content');
    contents.forEach(content => content.style.display = 'none');
    
    const activeContent = document.getElementById(`popup-content-${popupId}`);
    if (activeContent) {
      if (activeContent.classList.contains('popup-content-custom')) {
        activeContent.style.display = 'block';
      } else {
        activeContent.style.display = 'grid';
      }
    }
    
    // Position calculation
    // Base the right edge on the parent li to ensure all popups perfectly align vertically
    const alignElement = this.closest('li') || this;
    const rect = alignElement.getBoundingClientRect();
    const firstItemRect = this.closest('ul').firstElementChild.getBoundingClientRect();
    
    // We align the top relative to the top of the entire list section
    let top = firstItemRect.top + window.scrollY - 160; 
    let left = rect.right + 30; // 30px gap to the right of the hovered bullet point
    
    // Determine the actual width the popup will take
    let popupWidth = 1100; // Default max-width
    if (activeContent && activeContent.classList.contains('popup-content-custom')) {
      popupWidth = 900;
    }
    
    // Check if it overflows the right edge of the screen
    if (left + popupWidth + 40 > window.innerWidth) {
      // Anchor it to the right side of the screen (the green box area)
      // instead of flipping it to the left and covering the first column.
      left = window.innerWidth - popupWidth - 40;
    }
    
    // Apply calculated position
    popupContainer.style.top = `${top}px`;
    popupContainer.style.left = `${left}px`;
    
    // Show popup
    popupContainer.classList.add('is-active');
  }

  function handlePopupLeave(e) {
    // 50ms delay gives the user a tiny window to move the cursor
    // from the trigger onto the popup itself without it immediately disappearing
    setTimeout(() => {
      if (!popupContainer.matches(':hover')) {
        popupContainer.classList.remove('is-active');
      }
    }, 50);
  }
    
  // KNIME Dynamic Popup Hover Logic
  const btnHoverRfm = document.getElementById('btn-hover-rfm');
  const btnHoverWorkflow = document.getElementById('btn-hover-workflow');
  
  const textRfm = document.getElementById('knime-text-rfm');
  const textWorkflow = document.getElementById('knime-text-workflow');
  const visualRfm = document.getElementById('knime-visual-rfm');
  const visualWorkflow = document.getElementById('knime-visual-workflow');
  
  if (btnHoverRfm && btnHoverWorkflow) {
    btnHoverRfm.addEventListener('mouseenter', () => {
      // Activate RFM button
      btnHoverRfm.classList.add('popup-btn-active');
      btnHoverWorkflow.classList.remove('popup-btn-active');
      
      // Show RFM Content via stacking classes
      textRfm.classList.add('active-state');
      visualRfm.classList.add('active-state');
      
      // Hide Workflow Content
      textWorkflow.classList.remove('active-state');
      visualWorkflow.classList.remove('active-state');
    });
    
    btnHoverWorkflow.addEventListener('mouseenter', () => {
      // Activate Workflow button
      btnHoverWorkflow.classList.add('popup-btn-active');
      btnHoverRfm.classList.remove('popup-btn-active');
      
      // Show Workflow Content via stacking classes
      textWorkflow.classList.add('active-state');
      visualWorkflow.classList.add('active-state');
      
      // Hide RFM Content
      textRfm.classList.remove('active-state');
      visualRfm.classList.remove('active-state');
    });
  }

    // MBA Dynamic Popup Hover Logic
    const btnHoverMbaOverview = document.getElementById('btn-hover-mba-overview');
    const btnHoverMbaWorkflow = document.getElementById('btn-hover-mba-workflow');
    
    const textMbaOverview = document.getElementById('mba-text-overview');
    const textMbaWorkflow = document.getElementById('mba-text-workflow');
    const visualMbaOverview = document.getElementById('mba-visual-overview');
    const visualMbaWorkflow = document.getElementById('mba-visual-workflow');
    
    if (btnHoverMbaOverview && btnHoverMbaWorkflow) {
      btnHoverMbaOverview.addEventListener('mouseenter', () => {
        // Activate Overview button
        btnHoverMbaOverview.classList.add('popup-btn-active');
        btnHoverMbaWorkflow.classList.remove('popup-btn-active');
        
        // Show Overview Content via stacking classes
        textMbaOverview.classList.add('active-state');
        visualMbaOverview.classList.add('active-state');
        
        // Hide Workflow Content
        textMbaWorkflow.classList.remove('active-state');
        visualMbaWorkflow.classList.remove('active-state');
      });
      
      btnHoverMbaWorkflow.addEventListener('mouseenter', () => {
        // Activate Workflow button
        btnHoverMbaWorkflow.classList.add('popup-btn-active');
        btnHoverMbaOverview.classList.remove('popup-btn-active');
        
        // Show Workflow Content via stacking classes
        textMbaWorkflow.classList.add('active-state');
        visualMbaWorkflow.classList.add('active-state');
        
        // Hide Overview Content
        textMbaOverview.classList.remove('active-state');
        visualMbaOverview.classList.remove('active-state');
      });
    }

  // 3D Tools Carousel Hover Rotation Logic
  const toolsScene = document.querySelector('.tools-3d-scene');
  const toolsTrack = document.querySelector('.tools-3d-track');
  
  if (toolsScene && toolsTrack) {
    let currentAngle = 0;
    let targetSpeed = 0.15; // default slow continuous orbit
    let currentSpeed = 0.15;
    
    // Smooth animation loop
    function updateCarousel() {
      // Interpolate speed for smooth momentum transitions
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;
      
      currentAngle += currentSpeed;
      toolsTrack.style.transform = `rotateX(-10deg) rotateY(${currentAngle}deg)`;
      
      requestAnimationFrame(updateCarousel);
    }
    
    updateCarousel();

    toolsScene.addEventListener('mousemove', (e) => {
      // Check if hovering exactly on a card
      if (e.target.closest('.tools-3d-panel')) {
        targetSpeed = 0; // stop to focus
        return;
      }
      
      // Calculate mouse position relative to the scene container
      const rect = toolsScene.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const width = rect.width;
      
      // Left 35% zone (spin bringing left cards forward)
      if (mouseX < width * 0.35) {
        targetSpeed = 1.0; 
      } 
      // Right 35% zone (spin bringing right cards forward)
      else if (mouseX > width * 0.65) {
        targetSpeed = -1.0; 
      } 
      // Middle zone (default orbit speed)
      else {
        targetSpeed = 0.15; 
      }
    });

    toolsScene.addEventListener('mouseleave', () => {
      targetSpeed = 0.15; // resume default when mouse leaves the entire area
    });
  }
});
