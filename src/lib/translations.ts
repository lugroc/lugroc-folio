export const translations = {
  es: {
    nav: { home: 'Inicio', about: 'Sobre mí', projects: 'Proyectos', skills: 'Habilidades', experience: 'Experiencia', education: 'Educación', contact: 'Contacto' },
    hero: { tagline1: 'Desarrollador Backend enfocado en', tagline2: 'construyendo APIs RESTful y aplicaciones web.', contactBtn: 'Contáctame', cvBtn: 'Ver CV' },
    about: { heading: 'Sobre mí', p1: 'Soy un Desarrollador Backend de Santiago, Chile, especializado en Java con Spring Boot para construir APIs RESTful y aplicaciones web, incluyendo uso de servicios cloud. También trabajo con Node.js y React para desarrollo full-stack.', p2: 'Manejo inglés fluido y soy un entusiasta de Linux. Mi stack incluye TypeScript, Tailwind CSS, PostgreSQL, Docker y Git, con fundamentos de redes y herramientas como Postman y SSH.' },
    projects: { heading: 'Mis proyectos' },
    projectsData: [
      { title: 'Sistema de Gestión de Clientes', description: 'Microservicio con autenticación por sesiones, API Gateway y descubrimiento de servicios. Despliegue en EC2 con Docker e integración serverless con Lambda y DynamoDB.', tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS', 'API', 'Backend'], flags: ['Online'] },
      { title: 'Procesamiento de Imágenes con IA', description: 'Aplicación web que elimina fondos de imágenes automáticamente usando un modelo pre-entrenado.', tags: ['Python', 'Flask', 'Docker'], flags: ['Online', 'Cloud'], imageUrl: '/backgroundremover.jpg', url: 'https://eraser-h6cota2n5a-uc.a.run.app/', target: '_blank' },
      { title: 'Panel de Gestión de Inventario', description: 'Gestión de inventario full-stack con CRUD, búsqueda, filtros y control de acceso por roles.', tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind'], flags: ['Dashboard', 'Full Stack'], imageUrl: '/ecommerce.jpg' },
    ],
    skills: { heading: 'Mis habilidades' },
    experience: { heading: 'Mi experiencia', items: [{ title: 'Desarrollador Freelance', location: 'Santiago, Chile', description: 'Implementación de API Getnet para procesamiento de pagos. Desarrollo de funcionalidades y mantenimiento de aplicaciones web con Java, Spring Boot y React.', date: '2022 - presente' }, { title: 'Evaluador de Motores de Búsqueda y Recopilación de Datos', location: 'Santiago, Chile', description: 'Evalué métricas de relevancia y calidad de motores de búsqueda.', date: '2022 - 2025' }, { title: 'Asistente Técnico de Computación', location: 'Santiago, Chile', description: 'Proporcioné soporte técnico y mantenimiento para sistemas informáticos. Asistí con la resolución de problemas de hardware y software.', date: '2014 - 2018' }] },
    education: { heading: 'Mi educación', items: [{ title: 'Ingeniería Civil Informática (5 semestres)', location: 'Universidad San Sebastian', date: '2019 - 2021' }] },
    contact: { heading: 'Contáctame', subtext: '¿Tienes un proyecto en mente o solo quieres saludar?', namePlaceholder: 'Tu nombre', emailPlaceholder: 'Tu correo', messagePlaceholder: 'Tu mensaje', sendBtn: 'Enviar mensaje', sending: 'Enviando...', success: '¡Mensaje enviado con éxito!', error: 'Error al enviar. Intenta de nuevo.' },
    footer: { rights: 'Todos los derechos reservados.', built: 'Acerca de este sitio web:', builtText: 'construido con React, Vite, TypeScript, Tailwind CSS, Framer Motion.' },
    auth: { login: 'Iniciar sesión', register: 'Registrarse', email: 'Correo electrónico', password: 'Contraseña', firstName: 'Nombre', lastName: 'Apellido', loginSuccess: '¡Inicio de sesión exitoso!', registerSuccess: '¡Registro exitoso! Ahora puedes iniciar sesión.', invalidEmail: 'Correo o contraseña inválidos', registerFailed: 'Registro fallido. El correo puede estar en uso.', loggingIn: 'Iniciando sesión...', registering: 'Registrando...', generateRandom: 'Generar nombre y correo aleatorios', noAccount: '¿No tienes cuenta?', hasAccount: '¿Ya tienes cuenta?' },
    layout: { session: 'Sesión', expired: 'Sesión expirada', logout: 'Cerrar sesión', loadingDashboard: 'Cargando panel...' },
    dashboard: { heading: 'Mi Panel', userId: 'ID de Usuario', sessionStatus: 'Estado de Sesión', online: 'En línea', timeRemaining: 'Tiempo Restante', sessionDetails: 'Detalles de Sesión', sessionId: 'ID de Sesión', createdAt: 'Creada', expiresAt: 'Expira' },
  },
  en: {
    nav: { home: 'Home', about: 'About', projects: 'Projects', skills: 'Skills', experience: 'Experience', education: 'Education', contact: 'Contact' },
    hero: { tagline1: 'Backend Developer focused on', tagline2: 'building RESTful APIs and web applications.', contactBtn: 'Contact me here', cvBtn: 'Check CV' },
    about: { heading: 'About me', p1: 'I am a Backend Developer from Santiago, Chile, specialized in Java with Spring Boot to build RESTful APIs and web applications, including cloud services. I also work with Node.js and React for full-stack development.', p2: 'I am fluent in English and a Linux enthusiast. My stack includes TypeScript, Tailwind CSS, PostgreSQL, Docker and Git, with networking fundamentals and tools like Postman and SSH.' },
    projects: { heading: 'My projects' },
    projectsData: [
      { title: 'Customer Management System', description: 'Microservice with session-based auth, API Gateway and service discovery. Deployed on EC2 with Docker and serverless integration with Lambda and DynamoDB.', tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS', 'API', 'Backend'], flags: ['Online'] },
      { title: 'Image Processing with AI', description: 'Web app that removes image backgrounds automatically using a pre-trained model.', tags: ['Python', 'Flask', 'Docker'], flags: ['Online', 'Cloud'], imageUrl: '/backgroundremover.jpg', url: 'https://eraser-h6cota2n5a-uc.a.run.app/', target: '_blank' },
      { title: 'Inventory Management Dashboard', description: 'Full-stack inventory management with CRUD, search, filtering and role-based access control.', tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind'], flags: ['Dashboard', 'Full Stack'], imageUrl: '/ecommerce.jpg' },
    ],
    skills: { heading: 'My skills' },
    experience: { heading: 'My experience', items: [{ title: 'Freelance Developer', location: 'Santiago, Chile', description: 'Getnet API integration for payment processing. Feature development and maintenance of web applications using Java, Spring Boot, and React.', date: '2022 - present' }, { title: 'Search Engine Evaluator and Data Collection', location: 'Santiago, Chile', description: 'Evaluated search engine relevance and quality metrics.', date: '2022 - 2025' }, { title: 'Computer Technical Assistant', location: 'Santiago, Chile', description: 'Provided technical support and maintenance for computer systems. Assisted with hardware and software troubleshooting.', date: '2014 - 2018' }] },
    education: { heading: 'My education', items: [{ title: 'Ingeniería Civil Informática (5 semesters)', location: 'Universidad San Sebastian', date: '2019 - 2021' }] },
    contact: { heading: 'Contact me', subtext: 'Have a project in mind or just want to say hi?', namePlaceholder: 'Your name', emailPlaceholder: 'Your email', messagePlaceholder: 'Your message', sendBtn: 'Send message', sending: 'Sending...', success: 'Message sent successfully!', error: 'Failed to send. Please try again.' },
    footer: { rights: 'All rights reserved.', built: 'About this website:', builtText: 'built with React & Vite, TypeScript, Tailwind CSS, Framer Motion.' },
    auth: { login: 'Login', register: 'Register', email: 'Email', password: 'Password', firstName: 'First Name', lastName: 'Last Name', loginSuccess: 'Login successful!', registerSuccess: 'Registration successful! You can now log in.', invalidEmail: 'Invalid email or password', registerFailed: 'Registration failed. Email may already be taken.', loggingIn: 'Logging in...', registering: 'Registering...', generateRandom: 'Generate random name & email', noAccount: "Don't have an account?", hasAccount: 'Already have an account?' },
    layout: { session: 'Session', expired: 'Session expired', logout: 'Logout', loadingDashboard: 'Loading dashboard...' },
    dashboard: { heading: 'My Dashboard', userId: 'User ID', sessionStatus: 'Session Status', online: 'Online', timeRemaining: 'Time Remaining', sessionDetails: 'Session Details', sessionId: 'Session ID', createdAt: 'Created', expiresAt: 'Expires' },
  },
};

export type Lang = keyof typeof translations;
export type Project = (typeof translations.en.projectsData)[number];
