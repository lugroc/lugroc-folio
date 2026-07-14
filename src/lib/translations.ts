export const translations = {
  es: {
    nav: { home: 'Inicio', about: 'Sobre mí', projects: 'Proyectos', skills: 'Habilidades', experience: 'Experiencia', education: 'Educación', contact: 'Contacto' },
    hero: { tagline1: 'Desarrollador Backend enfocado en', tagline2: 'construyendo APIs RESTful y aplicaciones web.', contactBtn: 'Contáctame', cvBtn: 'Ver CV' },
    about: { heading: 'Sobre mí', p1: 'Desarrollador Backend especializado en Java y Spring Boot, con sólida base en APIs RESTful, arquitectura de microservicios y servicios cloud. Disfruto enfrentar desafíos técnicos y explorar tecnologías emergentes, complementando mi perfil con conocimientos de Inteligencia Artificial y Machine Learning.', p2: 'Manejo inglés fluido y soy un entusiasta de Linux. Mi stack incluye TypeScript, Tailwind CSS, PostgreSQL, Docker y Git, con fundamentos de redes y herramientas como Postman y SSH.' },
    projects: { heading: 'Mis proyectos' },
    projectsData: [
      { title: 'Sistema de Gestión de Clientes', description: 'Sistema de gestión de clientes con microservicios, APIs RESTful, Spring Data JPA, autenticación por sesiones y tests unitarios.', tags: ['Java', 'Spring Boot', 'Spring Cloud', 'Spring Security', 'Hibernate', 'PostgreSQL', 'Docker', 'AWS', 'API', 'CI/CD'], flags: ['Online'], imageUrl: '/loginpv.png' },
      { title: 'Procesamiento de Imágenes con IA', description: 'Servicio web para procesamiento automatizado de imágenes usando un modelo de IA pre-entrenado. Desplegado en Google Cloud Run con Artifact Registry.', tags: ['Python', 'Flask', 'Docker', 'Cloud'], flags: ['Online'], imageUrl: '/backgroundremover.jpg', url: 'https://eraser-h6cota2n5a-uc.a.run.app/', target: '_blank' },
      { title: 'Panel de Gestión de Inventario', description: 'Gestión de inventario full-stack con CRUD, búsqueda, filtros y control de acceso por roles.', tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind'], flags: ['Dashboard', 'Full Stack'], imageUrl: '/ecommerce.jpg' },
    ],
    skills: { heading: 'Mis habilidades' },
    experience: { heading: 'Mi experiencia', items: [{ title: 'Desarrollador Freelance', location: 'Santiago, Chile', description: 'Integración de API Getnet para procesamiento de pagos. Desarrollo de funcionalidades y mantenimiento de aplicaciones web con Java, Spring Boot y React.', date: '2022 - presente' }, { title: 'Asistente Técnico de Computación', location: 'Santiago, Chile', description: 'Soporte técnico, diagnóstico de problemas, instalación y mantenimiento de equipos.', date: '2014 - 2018' }] },
    education: { heading: 'Mi educación', items: [{ title: 'Ingeniería Civil Informática', location: 'Universidad San Sebastian', date: '2019 - 2021' }] },
    contact: { heading: 'Contáctame', subtext: '¿Tienes un proyecto en mente o solo quieres saludar?', namePlaceholder: 'Tu nombre', emailPlaceholder: 'Tu correo', messagePlaceholder: 'Tu mensaje', sendBtn: 'Enviar mensaje', sending: 'Enviando...', success: '¡Mensaje enviado con éxito!', error: 'Error al enviar. Intenta de nuevo.' },
    footer: { rights: 'Todos los derechos reservados.', built: 'Acerca de este sitio web:', builtText: 'construido con React, Vite, TypeScript, Tailwind CSS, Framer Motion.' },
    auth: { login: 'Iniciar sesión', register: 'Registrarse', email: 'Correo electrónico', password: 'Contraseña', firstName: 'Nombre', lastName: 'Apellido', loginSuccess: '¡Inicio de sesión exitoso!', registerSuccess: '¡Registro exitoso! Ahora puedes iniciar sesión.', invalidEmail: 'Correo o contraseña inválidos', registerFailed: 'Registro fallido. El correo puede estar en uso.', loggingIn: 'Iniciando sesión...', registering: 'Registrando...', generateRandom: 'Generar nombre y correo aleatorios', noAccount: '¿No tienes cuenta?', hasAccount: '¿Ya tienes cuenta?' },
    layout: { session: 'Sesión', expired: 'Sesión expirada', logout: 'Cerrar sesión', loadingDashboard: 'Cargando panel...' },
    dashboard: { heading: 'Mi Panel', userId: 'ID de Usuario', sessionStatus: 'Estado de Sesión', online: 'En línea', timeRemaining: 'Tiempo Restante', sessionDetails: 'Detalles de Sesión', sessionId: 'ID de Sesión', createdAt: 'Creada', expiresAt: 'Expira' },
    inventory: { heading: 'Inventario', add: 'Agregar', edit: 'Editar', del: 'Eliminar', save: 'Guardar', cancel: 'Cancelar', name: 'Nombre', sku: 'SKU', description: 'Descripción', price: 'Precio', quantity: 'Cantidad', category: 'Categoría', search: 'Buscar producto...', empty: 'Sin productos aún' },
  },
  en: {
    nav: { home: 'Home', about: 'About', projects: 'Projects', skills: 'Skills', experience: 'Experience', education: 'Education', contact: 'Contact' },
    hero: { tagline1: 'Backend Developer focused on', tagline2: 'building RESTful APIs and web applications.', contactBtn: 'Contact me here', cvBtn: 'Check CV' },
    about: { heading: 'About me', p1: 'Backend Developer specializing in Java and Spring Boot, with a strong foundation in RESTful APIs, microservices architecture, and cloud services. I enjoy tackling technical challenges and exploring emerging technologies, complementing my profile with knowledge of Artificial Intelligence and Machine Learning.', p2: 'I am fluent in English and a Linux enthusiast. My stack includes TypeScript, Tailwind CSS, PostgreSQL, Docker and Git, with networking fundamentals and tools like Postman and SSH.' },
    projects: { heading: 'My projects' },
    projectsData: [
      { title: 'Customer Management System', description: 'Customer management system with microservices, RESTful APIs, Spring Data JPA, session-based auth, and unit tests.', tags: ['Java', 'Spring Boot', 'Spring Cloud', 'Spring Security', 'Hibernate', 'PostgreSQL', 'Docker', 'AWS', 'API', 'CI/CD'], flags: ['Online'], imageUrl: '/loginpv.png' },
      { title: 'Image Processing with AI', description: 'Web service for automated image processing using a pre-trained AI model. Deployed on Google Cloud Run with Artifact Registry.', tags: ['Python', 'Flask', 'Docker', 'Cloud'], flags: ['Online'], imageUrl: '/backgroundremover.jpg', url: 'https://eraser-h6cota2n5a-uc.a.run.app/', target: '_blank' },
      { title: 'Inventory Management Dashboard', description: 'Full-stack inventory management with CRUD, search, filtering and role-based access control.', tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind'], flags: ['Dashboard', 'Full Stack'], imageUrl: '/ecommerce.jpg' },
    ],
    skills: { heading: 'My skills' },
    experience: { heading: 'My experience', items: [{ title: 'Freelance Developer', location: 'Santiago, Chile', description: 'Getnet API integration for payment processing. Feature development and maintenance of web applications using Java, Spring Boot, and React.', date: '2022 - present' }, { title: 'Technical Support Assistant', location: 'Santiago, Chile', description: 'Technical support, troubleshooting, installation and maintenance of computer systems.', date: '2014 - 2018' }] },
    education: { heading: 'My education', items: [{ title: 'Ingeniería Civil Informática', location: 'Universidad San Sebastian', date: '2019 - 2021' }] },
    contact: { heading: 'Contact me', subtext: 'Have a project in mind or just want to say hi?', namePlaceholder: 'Your name', emailPlaceholder: 'Your email', messagePlaceholder: 'Your message', sendBtn: 'Send message', sending: 'Sending...', success: 'Message sent successfully!', error: 'Failed to send. Please try again.' },
    footer: { rights: 'All rights reserved.', built: 'About this website:', builtText: 'built with React & Vite, TypeScript, Tailwind CSS, Framer Motion.' },
    auth: { login: 'Login', register: 'Register', email: 'Email', password: 'Password', firstName: 'First Name', lastName: 'Last Name', loginSuccess: 'Login successful!', registerSuccess: 'Registration successful! You can now log in.', invalidEmail: 'Invalid email or password', registerFailed: 'Registration failed. Email may already be taken.', loggingIn: 'Logging in...', registering: 'Registering...', generateRandom: 'Generate random name & email', noAccount: "Don't have an account?", hasAccount: 'Already have an account?' },
    layout: { session: 'Session', expired: 'Session expired', logout: 'Logout', loadingDashboard: 'Loading dashboard...' },
    dashboard: { heading: 'My Dashboard', userId: 'User ID', sessionStatus: 'Session Status', online: 'Online', timeRemaining: 'Time Remaining', sessionDetails: 'Session Details', sessionId: 'Session ID', createdAt: 'Created', expiresAt: 'Expires' },
    inventory: { heading: 'Inventory', add: 'Add', edit: 'Edit', del: 'Delete', save: 'Save', cancel: 'Cancel', name: 'Name', sku: 'SKU', description: 'Description', price: 'Price', quantity: 'Qty', category: 'Category', search: 'Search products...', empty: 'No products yet' },
  },
};

export type Lang = keyof typeof translations;
export type Project = (typeof translations.en.projectsData)[number];
