document.addEventListener('DOMContentLoaded', () => {
    // Funções para a página inicial
    const messageButtons = document.querySelectorAll('.message-btn');
    if (messageButtons.length > 0) {
        messageButtons.forEach(button => {
            button.addEventListener('click', function() {
                const message = this.nextElementSibling;
                if (message.style.display === 'block') {
                    message.style.display = 'none';
                } else {
                    message.style.display = 'block';
                    createHearts();
                }
            });
        });
    }

    // Função para criar corações
    function createHearts() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * 100 + 'vw';
                document.getElementById('hearts-container').appendChild(heart);

                // Remover o coração após a animação
                heart.addEventListener('animationend', () => {
                    heart.remove();
                });
            }, i * 150);
        }
    }

    // Funções para a página da galeria
    const musicToggle = document.getElementById('toggle-music');
    const music = document.getElementById('background-music');
    if (musicToggle && music) {
        musicToggle.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                music.pause();
                musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }

    // Lightbox para fotos
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const close = document.querySelector('.close');

    if (lightbox && lightboxImg) {
        // Adicionar evento de clique em todas as fotos
        document.querySelectorAll('.gallery-item img').forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        // Fechar lightbox
        close.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        // Fechar lightbox ao clicar fora da imagem
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        // Fechar lightbox com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            }
        });
    }

    // Função para abrir imagem em tela cheia
    function openFullScreen(imgElement) {
        var modal = document.getElementById("fullscreen-modal");
        var fullImage = document.getElementById("fullscreen-image");
        fullImage.src = imgElement.src;
        modal.style.display = "flex";
    }

    // Função para fechar o modal de tela cheia
    function closeFullScreen() {
        var modal = document.getElementById("fullscreen-modal");
        modal.style.display = "none";
    }

    // Função para controlar o início da música
    function setStartTime() {
        const music = document.getElementById('background-music');
        const startTime = document.getElementById('start-time').value;

        if (startTime && !isNaN(startTime)) {
            music.currentTime = parseInt(startTime);
            music.play();
            document.getElementById('toggle-music').innerHTML = '<i class="fas fa-pause"></i>';
        }
    }

    // Lazy loading para vídeos
    const videos = document.querySelectorAll('video');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.preload = 'metadata';
                videoObserver.unobserve(video);
            }
        });
    });

    videos.forEach(video => {
        videoObserver.observe(video);
    });
});
