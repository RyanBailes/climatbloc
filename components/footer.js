class CustomFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    color: white;
                    padding: 3rem 2rem;
                }

                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                }
                .footer-section h3 {
                    color: #e5d708;
                    margin-bottom: 1rem;
                    font-size: 1.25rem;
                    font-weight: 600;
                }
.footer-section p {
                    color: #cbd5e1;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }

                .footer-links {
                    list-style: none;
                    padding: 0;
                }

                .footer-links li {
                    margin-bottom: 0.5rem;
                }

                .footer-links a {
                    color: #cbd5e1;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                .footer-links a:hover {
                    color: #e5d708;
                }
.social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .social-links a {
                    color: #cbd5e1;
                    transition: color 0.3s ease;
                }
                .social-links a:hover {
                    color: #e5d708;
                }
.footer-bottom {
                    max-width: 1200px;
                    margin: 2rem auto 0;
                    padding-top: 2rem;
                    border-top: 1px solid #334155;
                    text-align: center;
                    color: #94a3b8;
                }

                @media (max-width: 768px) {
                    footer {
                        padding: 2rem 1rem;
                    }
                    
                    .footer-content {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }
                    
                    .social-links {
                        justify-content: center;
                    }
                }
            </style>

            <footer>
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>ClimatBloc™</h3>
                        <p>Revolutionary building technology for sustainable construction. Faster, stronger, and more efficient than traditional methods.</p>
<div class="social-links">
                            <a href="#" aria-label="Facebook">
                                <i data-feather="facebook"></i>
                            </a>
                            <a href="#" aria-label="Twitter">
                                <i data-feather="twitter"></i>
                            </a>
                            <a href="#" aria-label="LinkedIn">
                                <i data-feather="linkedin"></i>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <i data-feather="instagram"></i>
                            </a>
                        </div>
                    </div>

                    <div class="footer-section">
                        <h3>Products</h3>
                            <ul class="footer-links">
                            <li><a href="/products.html#foundation-blocks">Foundation Blocks</a></li>
                            <li><a href="/products.html#engineered-foundation-wall-system">Foundation Wall System</a></li>
                            <li><a href="/products.html#exterior-wall-blocks">Exterior Wall Blocks</a></li>
                            <li><a href="/products.html#engineered-wall-system">Engineered Wall System</a></li>
                            </ul>
                    </div>

                    <div class="footer-section">
                        <h3>Company</h3>
                        <ul class="footer-links">
                            <li><a href="/products.html">Products</a></li>
                            <li><a href="/about.html">About Us</a></li>
                            <li><a href="/contact.html">Contact</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h3>Contact</h3>
                        <p>
                            <i data-feather="map-pin" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i>
                            Texas, USA
                        </p>
                        <p>
                            <i data-feather="phone" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i>
                            +1 (555) 123-4567
                        </p>
                        <p>
                            <i data-feather="mail" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i>
                            info@climatbloc.com
                        </p>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>&copy; 2025 Calimatbloc™. All rights reserved. Made in the USA</p>
</div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);