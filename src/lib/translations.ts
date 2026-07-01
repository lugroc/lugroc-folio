export const translations = {
  es: {
    nav: { home: 'Inicio', about: 'Sobre mí', projects: 'Proyectos', skills: 'Habilidades', experience: 'Experiencia', education: 'Educación', contact: 'Contacto' },
    hero: { tagline1: 'Desarrollador de Software enfocado en', tagline2: 'construyendo servicios web y aplicaciones.', contactBtn: 'Contáctame', cvBtn: 'Ver CV' },
    about: { heading: 'Sobre mí', p1: 'Soy un Desarrollador de Software de Santiago, Chile. Mi experiencia se centra en Java con Spring Boot, construyendo microservicios escalables. También trabajo con Node.js y React para desarrollo full-stack.', p2: 'Soy un entusiasta de Linux y uso NeoVim como mi editor principal. Mi stack tecnológico también incluye TypeScript, Tailwind CSS y PostgreSQL.', p3: '' },
    projects: { heading: 'Mis proyectos' },
    projectsData: [
      { title: 'API REST - Java Spring Boot', description: 'Microservicio con autenticación por sesiones, API Gateway y descubrimiento de servicios.', tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'], flags: ['API', 'Backend', 'Online', 'EC2', 'Lambda'] },
      { title: 'Procesamiento de Imágenes con IA', description: 'Aplicación web que elimina fondos de imágenes automáticamente usando un modelo pre-entrenado.', tags: ['Python', 'Flask', 'Docker'], flags: ['Online', 'Cloud'], imageUrl: '/backgroundremover.jpg', url: 'https://eraser-h6cota2n5a-uc.a.run.app/', target: '_blank' },
      { title: 'Panel de Gestión de Inventario', description: 'Gestión de inventario full-stack con CRUD, búsqueda, filtros y control de acceso por roles.', tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind'], flags: ['Dashboard', 'Full Stack'], imageUrl: '/ecommerce.jpg' },
    ],
    github: { heading: 'GitHub', noDescription: 'Sin descripción' },
    skills: { heading: 'Mis habilidades' },
    experience: { heading: 'Mi experiencia', items: [{ title: 'Desarrollador Freelance', location: 'Santiago, Chile', description: 'Desarrollando aplicaciones web full-stack y APIs REST usando Java, Spring Boot y React. Diseñando arquitecturas de microservicios con contenedores Docker.', date: '2022 - presente' }, { title: 'Evaluador de Motores de Búsqueda y Recopilación de Datos', location: 'Santiago, Chile', description: 'Evalué métricas de relevancia y calidad de motores de búsqueda.', date: '2022 - 2025' }, { title: 'Asistente Técnico de Computación', location: 'Santiago, Chile', description: 'Proporcioné soporte técnico y mantenimiento para sistemas informáticos. Asistí con la resolución de problemas de hardware y software.', date: '2014 - 2018' }] },
    education: { heading: 'Mi educación', items: [{ title: 'Ingeniería Civil Informática', location: 'Universidad San Sebastian', description: '', date: '2019 - 2021' }] },
    contact: { heading: 'Contáctame', subtext: '¿Tienes un proyecto en mente o solo quieres saludar?', namePlaceholder: 'Tu nombre', emailPlaceholder: 'Tu correo', messagePlaceholder: 'Tu mensaje', sendBtn: 'Enviar mensaje', sending: 'Enviando...', success: '¡Mensaje enviado con éxito!', error: 'Error al enviar. Intenta de nuevo.' },
    footer: { rights: 'Todos los derechos reservados.', built: 'Acerca de este sitio web:', builtText: 'construido con React, Vite, TypeScript, Tailwind CSS, Framer Motion.' },
    auth: { login: 'Iniciar sesión', register: 'Registrarse', email: 'Correo electrónico', password: 'Contraseña', firstName: 'Nombre', lastName: 'Apellido', loginSuccess: '¡Inicio de sesión exitoso!', registerSuccess: '¡Registro exitoso! Ahora puedes iniciar sesión.', invalidEmail: 'Correo o contraseña inválidos', registerFailed: 'Registro fallido. El correo puede estar en uso.', loggingIn: 'Iniciando sesión...', registering: 'Registrando...', generateRandom: 'Generar nombre y correo aleatorios', noAccount: '¿No tienes cuenta?', hasAccount: '¿Ya tienes cuenta?' },
    layout: { session: 'Sesión', expired: 'Sesión expirada', logout: 'Cerrar sesión', loadingDashboard: 'Cargando panel...' },
    dashboard: { heading: 'Mi Panel', userId: 'ID de Usuario', sessionStatus: 'Estado de Sesión', online: 'En línea', offline: 'Desconectado', timeRemaining: 'Tiempo Restante', sessionDetails: 'Detalles de Sesión', sessionId: 'ID de Sesión', createdAt: 'Creada', expiresAt: 'Expira' },
    headerLogin: 'Iniciar sesión',
  },
  en: {
    nav: { home: 'Home', about: 'About', projects: 'Projects', skills: 'Skills', experience: 'Experience', education: 'Education', contact: 'Contact' },
    hero: { tagline1: 'Software Developer focused on', tagline2: 'building web services and applications.', contactBtn: 'Contact me here', cvBtn: 'Check CV' },
    about: { heading: 'About me', p1: 'I am a Software Developer from Santiago, Chile. My expertise lies in Java with Spring Boot, building scalable microservices. I also work with Node.js and React for full-stack development.', p2: 'I am a Linux enthusiast and use NeoVim as my daily driver. My tech stack also includes TypeScript, Tailwind CSS, and PostgreSQL.', p3: '' },
    projects: { heading: 'My projects' },
    projectsData: [
      { title: 'API REST - Java Spring Boot', description: 'Microservice with session-based auth, API Gateway and service discovery.', tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'], flags: ['API', 'Backend', 'Online', 'EC2', 'Lambda'] },
      { title: 'Image Processing with AI', description: 'Web app that removes image backgrounds automatically using a pre-trained model.', tags: ['Python', 'Flask', 'Docker'], flags: ['Online', 'Cloud'], imageUrl: '/backgroundremover.jpg', url: 'https://eraser-h6cota2n5a-uc.a.run.app/', target: '_blank' },
      { title: 'Inventory Management Dashboard', description: 'Full-stack inventory management with CRUD, search, filtering and role-based access control.', tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind'], flags: ['Dashboard', 'Full Stack'], imageUrl: '/ecommerce.jpg' },
    ],
    github: { heading: 'GitHub', noDescription: 'No description' },
    skills: { heading: 'My skills' },
    experience: { heading: 'My experience', items: [{ title: 'Freelance Developer', location: 'Santiago, Chile', description: 'Developing full-stack web applications and REST APIs using Java, Spring Boot, and React. Designing microservices architectures with Docker containerization.', date: '2022 - present' }, { title: 'Search Engine Evaluator and Data Collection', location: 'Santiago, Chile', description: 'Evaluated search engine relevance and quality metrics.', date: '2022 - 2025' }, { title: 'Computer Technical Assistant', location: 'Santiago, Chile', description: 'Provided technical support and maintenance for computer systems. Assisted with hardware and software troubleshooting.', date: '2014 - 2018' }] },
    education: { heading: 'My education', items: [{ title: 'Ingeniería Civil Informática', location: 'Universidad San Sebastian', description: '', date: '2019 - 2021' }] },
    contact: { heading: 'Contact me', subtext: 'Have a project in mind or just want to say hi?', namePlaceholder: 'Your name', emailPlaceholder: 'Your email', messagePlaceholder: 'Your message', sendBtn: 'Send message', sending: 'Sending...', success: 'Message sent successfully!', error: 'Failed to send. Please try again.' },
    footer: { rights: 'All rights reserved.', built: 'About this website:', builtText: 'built with React & Vite, TypeScript, Tailwind CSS, Framer Motion.' },
    auth: { login: 'Login', register: 'Register', email: 'Email', password: 'Password', firstName: 'First Name', lastName: 'Last Name', loginSuccess: 'Login successful!', registerSuccess: 'Registration successful! You can now log in.', invalidEmail: 'Invalid email or password', registerFailed: 'Registration failed. Email may already be taken.', loggingIn: 'Logging in...', registering: 'Registering...', generateRandom: 'Generate random name & email', noAccount: "Don't have an account?", hasAccount: 'Already have an account?' },
    layout: { session: 'Session', expired: 'Session expired', logout: 'Logout', loadingDashboard: 'Loading dashboard...' },
    dashboard: { heading: 'My Dashboard', userId: 'User ID', sessionStatus: 'Session Status', online: 'Online', offline: 'Offline', timeRemaining: 'Time Remaining', sessionDetails: 'Session Details', sessionId: 'Session ID', createdAt: 'Created', expiresAt: 'Expires' },
    headerLogin: 'Login',
  },
};

export type Lang = keyof typeof translations;
export type Project = (typeof translations.en.projectsData)[number];
