
// Developer Team Data
const developers = [
    {
        name: 'Çiğdem Ergal',
        role: 'Team Lead',
        image: new URL('../images/footer/cigdem.webp', import.meta.url).href,
        github: 'https://github.com/CigdemErgal',
        linkedin: 'https://www.linkedin.com/in/%C3%A7i%C4%9Fdem-ergal/',
    },
    {
        name: 'Halenur Gürel',
        role: 'Scrum Master',
        image: new URL('../images/footer/halenur.webp', import.meta.url).href,
        github: 'https://github.com/halenurgurel',
        linkedin: 'https://www.linkedin.com/in/halenurgurel/',
    },
    {
        name: 'Ali Hamza Çakmak',
        role: 'Developer',
        image: new URL('../images/footer/ali.webp', import.meta.url).href,
        github: 'https://github.com/MRMARUL',
        linkedin: 'https://www.linkedin.com/in/ali-hamza-%C3%A7akmak-8112553a8/',
    },
    {
        name: 'Aslıhan Erdal',
        role: 'Developer',
        image: new URL('../images/footer/aslihan.webp', import.meta.url).href,
        github: 'https://github.com/ERDLL0',
        linkedin: 'https://www.linkedin.com/in/aslihan-erdal/',
    },
    {
        name: 'Burak Gökay',
        role: 'Developer',
        image: new URL('../images/footer/burak.webp', import.meta.url).href,
        github: 'https://github.com/bgokay007-tech',
        linkedin: 'https://www.linkedin.com/in/burak-g%C3%B6kay-196b66348/',
    },
    {
        name: 'Kerem Yıldırım',
        role: 'Developer',
        image: new URL('../images/footer/kerem.webp', import.meta.url).href,
        github: 'https://github.com/keremyldrm61',
        linkedin: 'https://www.linkedin.com/in/kerem-y%C4%B1ld%C4%B1r%C4%B1m-0053a5191/',
    },
    {
        name: 'Kutluhan Gül',
        role: 'Developer',
        image: new URL('../images/footer/kutluhan.webp', import.meta.url).href,
        github: 'https://github.com/kutluhangil',
        linkedin: 'https://www.linkedin.com/in/kutluhangil/',
    },
    {
        name: 'Nur Seda Ağgünlü',
        role: 'Developer',
        image: new URL('../images/footer/nurseda.webp', import.meta.url).href,
        github: 'https://github.com/nursedaaggunlu',
        linkedin: 'https://www.linkedin.com/in/nur-seda-aggunlu/',
    },
    {
        name: 'Yusuf Soylu',
        role: 'Developer',
        image: new URL('../images/footer/yusuf.webp', import.meta.url).href,
        github: 'https://github.com/soylu1092',
        linkedin: 'https://www.linkedin.com/in/yusuf-soylu-525236306/',
    },
    {
        name: 'Zehra Yazıcı',
        role: 'Developer',
        image: new URL('../images/footer/zehra.webp', import.meta.url).href,
        github: 'https://github.com/zehrayazici',
        linkedin: 'https://www.linkedin.com/in/zehrayazici/',
    },
];

// Icons with white fill
const svgs = {
    github: `<svg class="social-icon-svg" viewBox="0 0 24 24" style="fill: white;"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
    linkedin: `<svg class="social-icon-svg" viewBox="0 0 24 24" style="fill: white;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
};

export function initFooter() {
    const footerLinkSelector = '#footer-link';
    const backdropSelector = '[data-footer-modal]';
    const closeBtnSelector = '[data-footer-close]';
    const teamListSelector = '.team-list';

    // Helper to get backdrop safely
    const getBackdrop = () => document.querySelector(backdropSelector);

    // Render Function
    const renderTeam = () => {
        const teamList = document.querySelector(teamListSelector);
        if (!teamList || teamList.children.length > 0) return;

        const markup = developers.map(dev => `
            <li class="team-card">
              <img
                src="${dev.image}"
                alt="${dev.name}"
                class="team-image"
                loading="lazy"
                width="180"
                height="180"
                onerror="this.src='https://placehold.co/180x180?text=${encodeURIComponent(dev.name)}'"
              />
              <h3 class="team-name">${dev.name}</h3>
              <p class="team-role">${dev.role}</p>
              <div class="social-links">
                <a href="${dev.github}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
                  ${svgs.github}
                </a>
                <a href="${dev.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
                  ${svgs.linkedin}
                </a>
              </div>
            </li>
        `).join('');

        teamList.innerHTML = markup;
    };

    const openModal = (e) => {
        const backdrop = getBackdrop();
        if (backdrop) {
            e.preventDefault();
            renderTeam();
            backdrop.classList.remove('is-hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        const backdrop = getBackdrop();
        if (backdrop) {
            backdrop.classList.add('is-hidden');
            document.body.style.overflow = '';
        }
    };

    // Event Delegation
    document.addEventListener('click', (e) => {
        if (e.target.closest(footerLinkSelector)) {
            openModal(e);
            return;
        }

        if (e.target.closest(closeBtnSelector)) {
            closeModal();
            return;
        }

        const backdrop = getBackdrop();
        if (backdrop && e.target === backdrop) {
            closeModal();
        }
    });

    // Close (ESC)
    document.addEventListener('keydown', (e) => {
        const backdrop = getBackdrop();
        if (e.key === 'Escape' && backdrop && !backdrop.classList.contains('is-hidden')) {
            closeModal();
        }
    });
}

// Scroll to Top Logic
const scrollToTopBtn = document.querySelector('.scroll-to-top');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('is-visible');
        } else {
            scrollToTopBtn.classList.remove('is-visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
