// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // URL de destino para todos os botÃµes e links
    const REDIRECT_URL = 'https://portalbrasil.onrender.com/aberturamei';
    
    // Redireciona todos os links e botÃµes para o mesmo URL
    function redirectAllButtons() {
        // Seleciona todos os links (exceto Ã¢ncoras internas)
        const links = document.querySelectorAll('a[href]:not([href^="#"])');
        links.forEach(link => {
            link.href = REDIRECT_URL;
        });
        
        // Seleciona todos os formulÃ¡rios e modifica o action
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.action = REDIRECT_URL;
            form.method = 'get';
        });
        
        // Adiciona event listeners para botÃµes que nÃ£o sÃ£o de formulÃ¡rio
        const buttons = document.querySelectorAll('button:not([type="submit"])');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = REDIRECT_URL;
            });
        });
    }
    
    // Executa o redirecionamento
    redirectAllButtons();
    
    // NavegaÃ§Ã£o mÃ³vel
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // NavegaÃ§Ã£o suave (desabilitada pois todos os links agora redirecionam)
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const target = document.querySelector(this.getAttribute('href'));
    //         if (target) {
    //             const headerHeight = document.querySelector('.header').offsetHeight;
    //             const targetPosition = target.offsetTop - headerHeight - 20;
                
    //             window.scrollTo({
    //                 top: targetPosition,
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active', !isActive);
        });
    });
    
    // ValidaÃ§Ã£o e envio de formulÃ¡rios
    const heroForm = document.getElementById('hero-form');
    const mainForm = document.getElementById('main-form');
    
    // FunÃ§Ã£o para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // FunÃ§Ã£o para validar telefone
    function isValidPhone(phone) {
        const phoneRegex = /^[\(\)\s\-\+\d]{10,}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }
    
    // FunÃ§Ã£o para formatar telefone
    function formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (cleaned.length === 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return phone;
    }
    
    // MÃ¡scara para telefone
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', function(e) {
            const value = e.target.value.replace(/\D/g, '');
            e.target.value = formatPhone(value);
        });
    });
    
    // ValidaÃ§Ã£o do formulÃ¡rio hero
    if (heroForm) {
        heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const telefone = this.querySelector('input[type="tel"]').value.trim();
            
            // ValidaÃ§Ãµes
            if (!nome || nome.length < 2) {
                showMessage('Por favor, insira seu nome completo.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Por favor, insira um e-mail vÃ¡lido.', 'error');
                return;
            }
            
            if (!isValidPhone(telefone)) {
                showMessage('Por favor, insira um telefone vÃ¡lido.', 'error');
                return;
            }
            
            // Redireciona para o URL especificado
            window.location.href = REDIRECT_URL;
        });
    }
    
    // ValidaÃ§Ã£o do formulÃ¡rio principal
    if (mainForm) {
        mainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const atividade = document.getElementById('atividade').value.trim();
            const cidade = document.getElementById('cidade').value.trim();
            
            // ValidaÃ§Ãµes
            if (!nome || nome.length < 2) {
                showMessage('Por favor, insira seu nome completo.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Por favor, insira um e-mail vÃ¡lido.', 'error');
                return;
            }
            
            if (!isValidPhone(telefone)) {
                showMessage('Por favor, insira um telefone vÃ¡lido.', 'error');
                return;
            }
            
            // Redireciona para o URL especificado
            window.location.href = REDIRECT_URL;
        });
    }
    
    // FunÃ§Ã£o para mostrar mensagens
    function showMessage(message, type = 'info') {
        // Remove mensagem anterior se existir
        const existingMessage = document.querySelector('.message-toast');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Cria nova mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-toast message-${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="message-close">&times;</button>
            </div>
        `;
        
        // Adiciona estilos
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        messageDiv.querySelector('.message-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.75rem;
        `;
        
        messageDiv.querySelector('.message-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            margin-left: auto;
        `;
        
        // Adiciona ao DOM
        document.body.appendChild(messageDiv);
        
        // Anima entrada
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(0)';
        }, 100);
        
        // FunÃ§Ã£o para remover mensagem
        function removeMessage() {
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }
        
        // Remove ao clicar no X
        messageDiv.querySelector('.message-close').addEventListener('click', removeMessage);
        
        // Remove automaticamente apÃ³s 5 segundos
        setTimeout(removeMessage, 5000);
    }
    
    // AnimaÃ§Ãµes ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observa elementos para animaÃ§Ã£o
    document.querySelectorAll('.requirement-card, .benefit-item, .testimonial-card, .step').forEach(el => {
        observer.observe(el);
    });
    
    // Contador animado para estatÃ­sticas
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.textContent.includes('+')) {
                element.textContent = '+' + Math.floor(current).toLocaleString('pt-BR');
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current).toLocaleString('pt-BR');
            }
        }, 16);
    }
    
    // Observa estatÃ­sticas para animaÃ§Ã£o
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    
                    if (statNumber.textContent.includes('50')) {
                        animateCounter(statNumber, 50);
                    } else if (statNumber.textContent.includes('99')) {
                        animateCounter(statNumber, 99);
                    }
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-item').forEach(el => {
        statsObserver.observe(el);
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Adiciona classe ativa ao link de navegaÃ§Ã£o baseado na seÃ§Ã£o atual (desabilitado pois todos os links redirecionam)
    // const sections = document.querySelectorAll('section[id]');
    // const navLinks = document.querySelectorAll('.nav-link');
    
    // window.addEventListener('scroll', () => {
    //     const scrollPosition = window.scrollY + 100;
        
    //     sections.forEach(section => {
    //         const sectionTop = section.offsetTop;
    //         const sectionHeight = section.offsetHeight;
    //         const sectionId = section.getAttribute('id');
            
    //         if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
    //             navLinks.forEach(link => {
    //                 link.classList.remove('active');
    //                 if (link.getAttribute('href') === `#${sectionId}`) {
    //                     link.classList.add('active');
    //                 }
    //             });
    //         }
    //     });
    // });
    
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // PrevenÃ§Ã£o de spam em formulÃ¡rios
    let lastSubmitTime = 0;
    const SUBMIT_COOLDOWN = 5000; // 5 segundos
    
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const now = Date.now();
            if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
                e.preventDefault();
                showMessage('Aguarde alguns segundos antes de enviar novamente.', 'error');
                return;
            }
            lastSubmitTime = now;
        });
    });
    
    // Adiciona efeito de hover nos cards
    document.querySelectorAll('.requirement-card, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // InicializaÃ§Ã£o completa
    console.log('Site MEI FÃ¡cil carregado com sucesso! Todos os botÃµes redirecionam para:', REDIRECT_URL);
    
    // Adiciona classe para indicar que o JavaScript foi carregado
    document.body.classList.add('js-loaded');
});

// FunÃ§Ã£o utilitÃ¡ria para debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// FunÃ§Ã£o utilitÃ¡ria para throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Adiciona suporte para Service Worker (PWA bÃ¡sico)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(registrationError => {
                console.log('Falha no registro do SW:', registrationError);
            });
    });
}
