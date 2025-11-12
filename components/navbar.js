class CustomNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupMobileMenu();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.98);
          border-bottom: 1px solid #E5E5E5;
        }
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .logo img { height: 40px; width: auto; }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0; padding: 0;
          align-items: center;
        }
        .nav-links a {
          text-decoration: none;
          color: #000000;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          font-size: 1rem;
        }
        .nav-links a:hover { color: #e5d708; }
        .nav-links a::after {
          content: '';
          position: absolute;
          width: 0; height: 2px; bottom: -4px; left: 0;
          background: #e5d708;
          transition: width 0.3s ease;
        }
        .nav-links a:hover::after { width: 100%; }

        .mobile-menu-btn {
          display: none;
          background: none; border: none;
          color: #000000; cursor: pointer;
          padding: 0.5rem;
        }
        .mobile-menu-btn svg { width: 24px; height: 24px; display: block; }

        .cta-button {
          background: #e5d708; color: #000000;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .cta-button:hover {
          background: #000000; color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(229, 215, 8, 0.3);
        }

        @media (max-width: 768px) {
          nav { padding: 1rem; }
          .nav-links {
            display: none;
            position: absolute; top: 100%; left: 0; right: 0;
            background: rgba(255, 255, 255, 0.98);
            flex-direction: column;
            padding: 1rem; gap: 1rem;
            border-top: 1px solid #E5E5E5;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          .nav-links.active { display: flex; }
          .mobile-menu-btn { display: block; }
        }
      </style>

      <nav>
        <a href="/" class="logo">
          <img src="/images/climatbloc-logo-color.svg" alt="ClimatBloc Logo">
        </a>

        <button class="mobile-menu-btn" aria-label="Toggle menu" aria-expanded="false">
          ${this.icon('menu')}
        </button>

        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/products.html">Products</a></li>
          <li><a href="/about.html">About Us</a></li>
          <li><a href="/contact.html" class="cta-button">Contact</a></li>
        </ul>
      </nav>
    `;
  }

  icon(name) {
    // Inline SVGs so we don’t depend on Feather in Shadow DOM
    const icons = {
      menu: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6"  x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `,
      x: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6"  y1="6" x2="18" y2="18"></line>
        </svg>
      `
    };
    return icons[name] || '';
  }

  setupMobileMenu() {
    const menuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
    const navLinks = this.shadowRoot.querySelector('.nav-links');

    const setIcon = (open) => {
      menuBtn.innerHTML = open ? this.icon('x') : this.icon('menu');
      menuBtn.setAttribute('aria-expanded', String(open));
    };

    setIcon(false);

    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      setIcon(isOpen);
    });

    this.shadowRoot.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          setIcon(false);
        }
      });
    });

    // Optional: close menu when clicking outside
    this.outsideClickHandler = (evt) => {
      const inShadow = this.shadowRoot.contains(evt.target);
      if (!inShadow && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        setIcon(false);
      }
    };
    document.addEventListener('click', this.outsideClickHandler);
  }

  disconnectedCallback() {
    // Clean up optional outside-click listener
    if (this.outsideClickHandler) {
      document.removeEventListener('click', this.outsideClickHandler);
    }
  }
}

customElements.define('custom-navbar', CustomNavbar);
