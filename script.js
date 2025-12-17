// Данные товаров
const products = [
    {
        id: 1,
        name: "Цемент М500",
        description: "Портландцемент высокого качества, 50 кг",
        price: 350,
        oldPrice: null,
        badge: null,
        emoji: "🧱",
        category: "materials"
    },
    {
        id: 2,
        name: "Кирпич красный",
        description: "Облицовочный кирпич, 1000 шт",
        price: 8500,
        oldPrice: 9500,
        badge: "Скидка",
        emoji: "🧱",
        category: "materials"
    },
    {
        id: 3,
        name: "Перфоратор Bosch",
        description: "Мощный перфоратор для бетона и кирпича",
        price: 12500,
        oldPrice: null,
        badge: "Популярное",
        emoji: "🔨",
        category: "tools"
    },
    {
        id: 4,
        name: "Шуруповерт аккумуляторный",
        description: "18V, комплект с двумя аккумуляторами",
        price: 4500,
        oldPrice: 5500,
        badge: "Скидка",
        emoji: "🔧",
        category: "tools"
    },
    {
        id: 5,
        name: "Краска для стен",
        description: "Водоэмульсионная краска, 10 л",
        price: 1200,
        oldPrice: null,
        badge: null,
        emoji: "🎨",
        category: "finishing"
    },
    {
        id: 6,
        name: "Ламинат Premium",
        description: "Класс 33, толщина 12 мм, 2 кв.м",
        price: 1800,
        oldPrice: 2200,
        badge: "Скидка",
        emoji: "🪵",
        category: "finishing"
    },
    {
        id: 7,
        name: "Плитка керамическая",
        description: "Напольная плитка 30x30 см, 1 кв.м",
        price: 650,
        oldPrice: null,
        badge: null,
        emoji: "🧱",
        category: "finishing"
    },
    {
        id: 8,
        name: "Болгарка",
        description: "УШМ 125 мм, мощность 1100 Вт",
        price: 3200,
        oldPrice: 3800,
        badge: "Скидка",
        emoji: "⚙️",
        category: "tools"
    },
    {
        id: 9,
        name: "Песок строительный",
        description: "Карьерный песок, 1 тонна",
        price: 800,
        oldPrice: null,
        badge: null,
        emoji: "🏜️",
        category: "materials"
    },
    {
        id: 10,
        name: "Гипсокартон",
        description: "Лист 2500x1200x12.5 мм",
        price: 450,
        oldPrice: null,
        badge: null,
        emoji: "📐",
        category: "materials"
    },
    {
        id: 11,
        name: "Обои виниловые",
        description: "Рулон 10 м, ширина 53 см",
        price: 550,
        oldPrice: 650,
        badge: "Скидка",
        emoji: "🖼️",
        category: "finishing"
    },
    {
        id: 12,
        name: "Дрель ударная",
        description: "Мощность 800 Вт, комплект сверл",
        price: 2800,
        oldPrice: null,
        badge: "Популярное",
        emoji: "🔩",
        category: "tools"
    }
];

let cart = [];
let cartCount = 0;
let currentFilter = 'all';

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
    updateCartCount();
});

// Рендеринг товаров
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    currentFilter = filter;
    
    let filteredProducts = products;
    
    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.category === filter);
    }
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" style="position: relative;">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div>
                        <span class="product-price">${formatPrice(product.price)} ₽</span>
                        ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)} ₽</span>` : ''}
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">В корзину</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Форматирование цены
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Добавление в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        cartCount++;
        updateCartCount();
        
        // Анимация кнопки
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Добавлено!';
        btn.style.background = '#10b981';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 1000);
    }
}

// Обновление счетчика корзины
function updateCartCount() {
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cartCount;
        cartCountEl.style.display = cartCount > 0 ? 'flex' : 'none';
    }
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Фильтры товаров
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const filter = e.target.getAttribute('data-filter');
            renderProducts(filter);
        });
    });

    // Поиск
    const searchInput = document.querySelector('.search-input');
    const searchSubmit = document.querySelector('.search-submit');
    
    if (searchSubmit) {
        searchSubmit.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase();
            if (query) {
                const filtered = products.filter(p => 
                    p.name.toLowerCase().includes(query) || 
                    p.description.toLowerCase().includes(query)
                );
                
                if (filtered.length > 0) {
                    const grid = document.getElementById('productsGrid');
                    grid.innerHTML = filtered.map(product => `
                        <div class="product-card" style="position: relative;">
                            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                            <div class="product-image">${product.emoji}</div>
                            <div class="product-info">
                                <h3 class="product-name">${product.name}</h3>
                                <p class="product-description">${product.description}</p>
                                <div class="product-footer">
                                    <div>
                                        <span class="product-price">${formatPrice(product.price)} ₽</span>
                                        ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)} ₽</span>` : ''}
                                    </div>
                                    <button class="add-to-cart" onclick="addToCart(${product.id})">В корзину</button>
                                </div>
                            </div>
                        </div>
                    `).join('');
                } else {
                    alert('Товары по вашему запросу не найдены');
                }
            } else {
                renderProducts(currentFilter);
            }
        });
    }

    // Форма обратной связи
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо за ваш вопрос! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
        });
    }

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Анимация при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.category-card, .product-card, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
}

// Анимация счетчиков
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString('ru-RU');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString('ru-RU');
        }
    }, 16);
}

// Запуск анимации счетчиков при загрузке
window.addEventListener('load', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(el => {
        const text = el.textContent.replace(/\s/g, '');
        const target = parseInt(text.replace(/[^0-9]/g, ''));
        if (target) {
            animateCounter(el, target);
        }
    });
});

