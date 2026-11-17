document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. MENU MOBILE (Sanduíche)
    // =========================================
    const btnMobile = document.getElementById('menu-mobile');
    const navLinks = document.getElementById('nav-links');

    btnMobile.addEventListener('click', () => {
        navLinks.classList.toggle('ativo');
        // Troca o ícone de barras para X
        const icone = btnMobile.querySelector('i');
        if (navLinks.classList.contains('ativo')) {
            icone.classList.remove('fa-bars');
            icone.classList.add('fa-times');
        } else {
            icone.classList.remove('fa-times');
            icone.classList.add('fa-bars');
        }
    });

    // Fecha o menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('ativo');
            btnMobile.querySelector('i').classList.remove('fa-times');
            btnMobile.querySelector('i').classList.add('fa-bars');
        });
    });

    // =========================================
    // 2. HEADER COM SOMBRA AO ROLAR
    // =========================================
    const header = document.getElementById('header');
    const btnTopo = document.getElementById('btn-topo');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('rolado');
            btnTopo.classList.add('visivel');
        } else {
            header.classList.remove('rolado');
            btnTopo.classList.remove('visivel');
        }
    });

    // Botão voltar ao topo
    btnTopo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =========================================
    // 3. ANIMAÇÃO DE ENTRADA (Fade Up)
    // =========================================
    const elementosAnimar = document.querySelectorAll('section, .servico-card, .problema-card, .passo-item, .diferencial-item');
    
    // Adiciona a classe base para começar invisível
    elementosAnimar.forEach(el => el.classList.add('animar'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ativo');
                observer.unobserve(entry.target); // Anima só uma vez
            }
        });
    }, {
        threshold: 0.1 // Dispara quando 10% do elemento está visível
    });

    elementosAnimar.forEach(el => observer.observe(el));

    // =========================================
    // 4. CONTADOR ANIMADO (Faixa de Credibilidade)
    // =========================================
    const contadores = document.querySelectorAll('.contador');
    
    const animarContador = (contador) => {
        const alvo = +contador.getAttribute('data-alvo');
        const duracao = 2000; // 2 segundos
        const passo = alvo / (duracao / 16); // 60fps
        let atual = 0;

        const atualizar = () => {
            atual += passo;
            if (atual < alvo) {
                contador.innerText = Math.ceil(atual) + (alvo >= 100 ? '' : '+');
                requestAnimationFrame(atualizar);
            } else {
                contador.innerText = alvo + (alvo >= 100 ? '' : '+');
            }
        };
        atualizar();
    };

    const observerContador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContador(entry.target);
                observerContador.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    contadores.forEach(c => observerContador.observe(c));

    // =========================================
    // 5. MÁSCARA DE WHATSAPP E VALIDAÇÃO DO FORMULÁRIO
    // =========================================
    const form = document.getElementById('form-contato');
    const inputWhats = document.getElementById('whatsapp');
    const formSucesso = document.getElementById('form-sucesso');

    // Máscara de telefone
    inputWhats.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, ''); // Só números
        if (valor.length > 11) valor = valor.slice(0, 11);
        
        if (valor.length > 6) {
            valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
        } else if (valor.length > 2) {
            valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
        } else if (valor.length > 0) {
            valor = `(${valor}`;
        }
        e.target.value = valor;
    });

    // Validação do Formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Honeypot (Anti-spam)
        const honeypot = document.getElementById('website').value;
        if (honeypot !== '') {
            // Se o campo invisível foi preenchido, é um robô. Ignora.
            return;
        }

        let valido = true;
        const campos = form.querySelectorAll('input[required], textarea[required]');

        campos.forEach(campo => {
            const errorMsg = campo.nextElementSibling;
            
            if (!campo.value.trim()) {
                campo.classList.add('erro');
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.innerText = 'Ops, por favor preencha esse campo.';
                }
                valido = false;
            } else if (campo.type === 'email' && !campo.value.includes('@')) {
                campo.classList.add('erro');
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.innerText = 'Confere esse e-mail pra mim?';
                }
                valido = false;
            } else {
                campo.classList.remove('erro');
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.innerText = '';
                }
            }
        });

        // Se for válido, simula o envio
        if (valido) {
            const btnSubmit = form.querySelector('button[type="submit"]');
            const textoOriginal = btnSubmit.innerHTML;
            
            btnSubmit.innerHTML = 'Enviando...';
            btnSubmit.disabled = true;

            // Simula espera de 1.5 segundos (aqui entraria sua integração real depois)
            setTimeout(() => {
                form.classList.add('oculto');
                formSucesso.classList.remove('oculto');
                formSucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Opcional: Limpar formulário
                form.reset();
                btnSubmit.innerHTML = textoOriginal;
                btnSubmit.disabled = false;
            }, 1500);
        }
    });

    // =========================================
    // 6. ANO DO RODAPÉ AUTOMÁTICO
    // =========================================
    document.getElementById('ano-atual').innerText = new Date().getFullYear();

    // =========================================
    // 7. ESPAÇOS RESERVADOS PARA RASTREAMENTO
    // =========================================
    // Para ligar o Google Analytics, cole seu script aqui.
    // Para ligar o Meta Pixel, cole o script aqui.
    // Para ligar a Tag do Google Ads, cole o script aqui.

});