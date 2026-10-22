import { STUDIO_CONFIG } from "./studio-config.js";

const getElement = (id) => document.getElementById(id);
const mobileMenuButton = getElement("mobile-menu-btn");
const mobileMenu = getElement("mobile-menu");
const modalityModal = getElement("modality-modal");
const lightboxModal = getElement("lightbox-modal");

function setText(id, value) {
    const element = getElement(id);
    if (element) {
        element.textContent = value;
    }
}

function updateStudioDetails() {
    setText("year", new Date().getFullYear());
    setText("display-address", `${STUDIO_CONFIG.address} - ${STUDIO_CONFIG.city}`);
    setText("display-hours", STUDIO_CONFIG.openingHours);
    setText("display-phone", STUDIO_CONFIG.phone);
    setText("footer-address", STUDIO_CONFIG.address);
    setText("footer-phone", STUDIO_CONFIG.phone);
    setText("footer-email", STUDIO_CONFIG.email);

    const floatingWhatsApp = getElement("floating-whatsapp");
    if (floatingWhatsApp) {
        floatingWhatsApp.href = createWhatsAppUrl(STUDIO_CONFIG.defaultWhatsAppMsg);
    }

    document.querySelectorAll("[data-whatsapp-message]").forEach((link) => {
        link.href = createWhatsAppUrl(link.dataset.whatsappMessage);
    });

    document.querySelectorAll("[data-instagram-link]").forEach((link) => {
        link.href = STUDIO_CONFIG.instagramUrl;
    });

    document.querySelectorAll("[data-instagram-handle]").forEach((element) => {
        element.textContent = STUDIO_CONFIG.instagram;
    });
}

function createWhatsAppUrl(message = "") {
    return `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function setModalVisibility(modal, isVisible) {
    if (!modal) {
        return;
    }

    modal.classList.toggle("hidden", !isVisible);
    modal.classList.toggle("flex", isVisible);
}

function openModalityModal(title, description) {
    setText("modal-title", title);
    setText("modal-description", description);
    setModalVisibility(modalityModal, true);
}

function closeModalityModal() {
    setModalVisibility(modalityModal, false);
}

function openLightbox(image, caption) {
    const lightboxImage = getElement("lightbox-img");
    if (lightboxImage) {
        lightboxImage.src = image;
        lightboxImage.alt = caption;
    }
    setText("lightbox-caption", caption);
    setModalVisibility(lightboxModal, true);
}

function closeLightbox() {
    setModalVisibility(lightboxModal, false);
}

function toggleFaq(button) {
    const answer = button.nextElementSibling;
    const isOpen = !answer.classList.contains("hidden");

    document.querySelectorAll(".faq-answer").forEach((item) => item.classList.add("hidden"));
    document.querySelectorAll(".faq-item [data-lucide='chevron-down']").forEach((icon) => {
        icon.style.transform = "rotate(0deg)";
    });
    document.querySelectorAll(".faq-item [data-action='toggle-faq']").forEach((item) => {
        item.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
        answer.classList.remove("hidden");
        button.setAttribute("aria-expanded", "true");
        const icon = button.querySelector("[data-lucide='chevron-down']");
        if (icon) {
            icon.style.transform = "rotate(180deg)";
        }
    }
}

function filterModalities(button) {
    const category = button.dataset.category;
    document.querySelectorAll(".filter-btn").forEach((filterButton) => {
        const isSelected = filterButton === button;
        filterButton.classList.toggle("active-filter", isSelected);
        filterButton.classList.toggle("bg-brand-rose", isSelected);
        filterButton.classList.toggle("text-white", isSelected);
        filterButton.classList.toggle("border-brand-rose", isSelected);
        filterButton.classList.toggle("bg-brand-card", !isSelected);
        filterButton.classList.toggle("text-brand-muted", !isSelected);
        filterButton.classList.toggle("border-brand-border", !isSelected);
        filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    document.querySelectorAll(".modality-card").forEach((card) => {
        card.style.display = category === "all" || card.dataset.cat === category ? "flex" : "none";
    });
}

function submitBookingForm(event) {
    event.preventDefault();

    const name = getElement("form-name").value.trim();
    const phone = getElement("form-phone").value.trim();
    const period = getElement("form-period").value;
    const modality = getElement("form-modality").value;
    const message = getElement("form-message").value.trim();
    const text = `Olá! Meu nome é ${name} (${phone}). Gostaria de agendar uma aula experimental no ${STUDIO_CONFIG.name}.\n\n` +
        `• Modalidade: ${modality}\n` +
        `• Período de preferência: ${period}\n` +
        (message ? `• Observação: ${message}` : "");

    window.open(createWhatsAppUrl(text), "_blank", "noopener,noreferrer");
}

function handleDocumentClick(event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) {
        return;
    }

    const actionElement = target.closest("[data-action]");
    if (actionElement) {
        const action = actionElement.dataset.action;

        if (action === "open-modality") {
            openModalityModal(actionElement.dataset.modalityTitle, actionElement.dataset.modalityDescription);
        } else if (action === "close-modality") {
            closeModalityModal();
        } else if (action === "open-lightbox") {
            openLightbox(actionElement.dataset.image, actionElement.dataset.caption);
        } else if (action === "close-lightbox" &&
            (actionElement !== lightboxModal || target === lightboxModal)) {
            closeLightbox();
        } else if (action === "toggle-faq") {
            toggleFaq(actionElement);
        }
    }

    const filterButton = target.closest(".filter-btn");
    if (filterButton) {
        filterModalities(filterButton);
    }

    if (target.closest("#mobile-menu-btn")) {
        const isOpen = mobileMenuButton.getAttribute("aria-expanded") === "true";
        mobileMenuButton.setAttribute("aria-expanded", String(!isOpen));
        mobileMenu.classList.toggle("hidden", isOpen);
    } else if (target.closest(".mobile-link")) {
        mobileMenu.classList.add("hidden");
        mobileMenuButton.setAttribute("aria-expanded", "false");
    }
}

function handleDocumentKeydown(event) {
    if (event.key === "Escape") {
        closeModalityModal();
        closeLightbox();
        mobileMenu?.classList.add("hidden");
        mobileMenuButton?.setAttribute("aria-expanded", "false");
    }

    if ((event.key === "Enter" || event.key === " ") &&
        event.target instanceof Element &&
        event.target.matches(".gallery-item[role='button']")) {
        event.preventDefault();
        openLightbox(event.target.dataset.image, event.target.dataset.caption);
    }
}

function initializeRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("active"));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach((element) => observer.observe(element));
}

function initializeIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

document.addEventListener("click", handleDocumentClick);
document.addEventListener("keydown", handleDocumentKeydown);
getElement("booking-form")?.addEventListener("submit", submitBookingForm);

document.querySelectorAll(".filter-btn").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("active-filter")));
});

updateStudioDetails();
initializeRevealAnimations();
initializeIcons();
