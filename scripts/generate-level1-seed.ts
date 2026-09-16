import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { parseBlockData, type BlockType } from '../src/types/content-blocks.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = path.join(__dirname, '../content/seeds/ia-gestion-proyectos.json')

type BlockSeed = {
  type: BlockType
  order: number
  blockData: Record<string, unknown>
}

type ModuleSeed = {
  title: string
  order: number
  level: number
  levelTitle: string
  blocks: BlockSeed[]
}

// ----------------------------------------------------
// MÓDULO 1: Orientación, Diagnóstico Y Reto Integrador
// ----------------------------------------------------
const module1Blocks: BlockSeed[] = [
  {
    type: 'TEXT',
    order: 1,
    blockData: {
      heading: '¡Bienvenido(a) a Fundamentos de la Gestión de Proyectos e IA!',
      content:
        'Te damos la bienvenida al Objeto Virtual de Aprendizaje (OVA) Fundamentos de la Gestión de Proyectos e Inteligencia Artificial.\n\nA lo largo de este curso aprenderás a formular, planificar, ejecutar y cerrar proyectos tecnológicos utilizando las buenas prácticas del PMBOK® y herramientas de inteligencia artificial generativa como apoyo para mejorar la productividad, la calidad de los entregables y la toma de decisiones.\n\nNo necesitas experiencia previa. Cada tema se desarrollará mediante ejemplos, actividades interactivas, simulaciones y casos prácticos que te permitirán aprender haciendo.\n\nAl finalizar el curso habrás construido un proyecto tecnológico completo en tu Bitácora Personal que integrará todos los conocimientos adquiridos.',
    },
  },
  {
    type: 'TEXT',
    order: 2,
    blockData: {
      heading: '¿Qué aprenderás en este curso?',
      content:
        'Este OVA está diseñado para desarrollar competencias en gestión de proyectos e inteligencia artificial mediante una metodología basada en la práctica y la resolución de problemas.\n\nDurante el curso no solo estudiarás conceptos; también construirás un proyecto real mientras aprendes a:\n• Comprender problemas y necesidades organizacionales.\n• Formular soluciones tecnológicas pertinentes.\n• Planificar proyectos bajo marcos adaptados.\n• Gestionar recursos, tiempos y costos.\n• Analizar y mitigar riesgos tecnológicos.\n• Utilizar IA de manera responsable y ética.\n• Evaluar la creación real de valor.\n\nCada módulo aportará un nuevo componente a tu proyecto integrador.',
    },
  },
  {
    type: 'SURVEY',
    order: 3,
    blockData: {
      title: 'Actividad interactiva: Tus intereses de aprendizaje',
      question: '¿Qué temas te interesa más aprender durante este OVA? (Selecciona hasta tres opciones):',
      maxSelections: 3,
      options: [
        { id: 'gp', text: 'Gestión de proyectos' },
        { id: 'ia', text: 'Inteligencia Artificial' },
        { id: 'prompts', text: 'Ingeniería de prompts' },
        { id: 'liderazgo', text: 'Liderazgo de equipos' },
        { id: 'riesgos', text: 'Gestión de riesgos' },
        { id: 'software', text: 'Desarrollo de software' },
        { id: 'automatizacion', text: 'Automatización de tareas' },
        { id: 'analitica', text: 'Analítica de datos' },
      ],
      feedback:
        '¡Excelente selección! Durante el curso trabajarás todos estos temas. Tus respuestas permitirán orientar y personalizar algunas recomendaciones en tu Bitácora.',
      pointsAwarded: 25,
    },
  },
  {
    type: 'TEXT',
    order: 4,
    blockData: {
      heading: '¿Por qué aprender Gestión de Proyectos?',
      content:
        'La gestión de proyectos consiste en aplicar conocimientos, habilidades, herramientas y técnicas para alcanzar los objetivos de un proyecto y generar valor para la organización.\n\nUn proyecto tecnológico implica personas, recursos, tiempo, costos y riesgos. Gestionarlo adecuadamente permite:\n• Organizar el trabajo en fases lógicas.\n• Priorizar actividades críticas.\n• Controlar el avance y el presupuesto.\n• Mejorar la comunicación con los interesados.\n• Reducir la incertidumbre técnica y del negocio.\n• Aumentar significativamente la probabilidad de éxito.\n\nSegún el PMBOK®, la gestión de proyectos debe adaptarse al contexto específico y enfocarse en la generación sostenible de valor.',
    },
  },
  {
    type: 'QUIZ',
    order: 5,
    blockData: {
      question: '¿Cuál es el principal beneficio de la gestión de proyectos?',
      options: [
        { id: 'a', text: 'Eliminar completamente los riesgos del entorno', isCorrect: false },
        { id: 'b', text: 'Organizar y controlar el trabajo para aumentar las probabilidades de éxito', isCorrect: true },
        { id: 'c', text: 'Reducir el número de integrantes del equipo técnico', isCorrect: false },
        { id: 'd', text: 'Evitar cualquier tipo de cambio durante el proyecto', isCorrect: false },
      ],
      explanation:
        'Ninguna metodología elimina el riesgo por completo, pero la gestión de proyectos organiza, controla y adapta el trabajo para maximizar las probabilidades de éxito y entrega de valor.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 6,
    blockData: {
      title: 'Actividad gamificada: Buenas vs Malas Prácticas',
      instruction: 'Clasifica cada situación según corresponda a una Buena o Mala Práctica de gestión:',
      categories: ['Buena práctica', 'Mala práctica'],
      items: [
        { id: '1', text: 'Definir actividades y entregables claramente', category: 'Buena práctica' },
        { id: '2', text: 'Asignar responsables específicos a cada tarea', category: 'Buena práctica' },
        { id: '3', text: 'Programar software sin planificar previamente', category: 'Mala práctica' },
        { id: '4', text: 'Elaborar y actualizar el cronograma del proyecto', category: 'Buena práctica' },
        { id: '5', text: 'Identificar y controlar riesgos tempranamente', category: 'Buena práctica' },
        { id: '6', text: 'Trabajar sin objetivos claros ni métricas de éxito', category: 'Mala práctica' },
      ],
      explanation:
        'La improvisación y el trabajo sin objetivos conducen a sobrecostos y retrasos. Las buenas prácticas estructuran el esfuerzo y facilitan el control.',
      pointsAwarded: 30,
    },
  },
  {
    type: 'VIDEO',
    order: 7,
    blockData: {
      title: 'Video: Gestión de proyectos EXPLICADO',
      url: 'https://www.youtube.com/watch?v=yqOLdGif4R0',
      durationSeconds: 420,
      transcript: 'Explicación dinámica sobre los conceptos fundamentales de la dirección de proyectos y el PMBOK.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'TEXT',
    order: 8,
    blockData: {
      heading: '¿Por qué integrar Inteligencia Artificial en la gestión de proyectos?',
      content:
        'La Inteligencia Artificial (IA) es un conjunto de tecnologías capaces de realizar tareas que normalmente requieren inteligencia humana, como analizar información, reconocer patrones y apoyar la toma de decisiones.\n\nLa IA Generativa es un tipo de IA que crea texto, imágenes, código y documentos a partir de instrucciones (prompts).\n\n⚠️ Principio fundamental del curso: La IA NO reemplaza al director del proyecto ni al equipo humano. Su función es actuar como un copiloto inteligente para tareas repetitivas y análisis de datos, liberando tiempo para la creatividad, la negociación, la empatía y la toma de decisiones estratégicas.',
    },
  },
  {
    type: 'QUIZ',
    order: 9,
    blockData: {
      question: '¿Cuál representa el mejor uso de la IA en un proyecto?',
      options: [
        { id: 'a', text: 'Delegar completamente la planificación y decisiones a la herramienta', isCorrect: false },
        { id: 'b', text: 'Utilizar la IA como apoyo inicial y validar críticamente todos sus resultados', isCorrect: true },
        { id: 'c', text: 'Permitir que la IA apruebe contratos y presupuestos sin revisión', isCorrect: false },
        { id: 'd', text: 'Prohibir totalmente el uso de herramientas de IA en el equipo', isCorrect: false },
      ],
      explanation:
        'La IA es un asistente. La responsabilidad final, ética, legal y operativa siempre permanece en el equipo humano.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'VIDEO',
    order: 10,
    blockData: {
      title: 'Video: ¿Qué es la Inteligencia Artificial Generativa?',
      url: 'https://www.youtube.com/watch?v=RtT3gJ3VQIk',
      durationSeconds: 380,
      transcript: 'Introducción a modelos generativos, prompts y casos de uso en productividad.',
      followUpPrompt: 'Escribe dos actividades del proyecto donde consideres que la IA podría ayudarte y explica por qué.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'TEXT',
    order: 11,
    blockData: {
      heading: '¿Cómo aprenderás en este OVA?',
      content:
        'Este OVA utiliza una metodología de aprendizaje activo. Cada concepto se desarrollará siguiendo esta secuencia:\n\nConcepto → Explicación → Ejemplo → Pregunta rápida → Actividad interactiva → Proyecto Integrador → IA Aplicada.\n\nAprenderás construyendo desde el primer día tu propio proyecto tecnológico.',
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 12,
    blockData: {
      title: 'IA Aplicada: Comprendiendo el concepto de proyecto tecnológico',
      role: 'Actúa como consultor pedagógico en tecnología.',
      prompt: 'Explícame qué es un proyecto tecnológico utilizando un ejemplo sencillo y cotidiano.',
      guidance: 'Copia este prompt, pruébalo en una IA y reflexiona comparando su respuesta con la definición del OVA.',
      reflectionQuestions: [
        '¿Qué similitudes encontraste entre la respuesta de la IA y el concepto del OVA?',
        '¿Qué diferencias u omisiones observaste en la explicación de la IA?',
        '¿Qué información agregarías o corregirías para tu contexto?',
      ],
      pointsAwarded: 40,
    },
  },
  {
    type: 'TEXT',
    order: 13,
    blockData: {
      heading: 'Ruta de Aprendizaje del OVA',
      content:
        'El curso está organizado en tres niveles progresivos:\n\n• NIVEL 1: Comprensión del proyecto tecnológico (Fundamentos, PMBOK, tipos TIC, enfoques y fundamentos de IA).\n• NIVEL 2: Formulación y planeación (Alcance, cronograma, riesgos, presupuesto y prompts avanzados).\n• NIVEL 3: Ejecución, seguimiento, gobernanza y cierre (Monitoreo, control, ética y entrega del proyecto).\n\nCada nivel se desbloquea al completar y aprobar el nivel anterior.',
    },
  },
  {
    type: 'VIDEO',
    order: 14,
    blockData: {
      title: 'Video: ¿Qué hace un Director de Proyectos?',
      url: 'https://www.youtube.com/watch?v=AfwF4JPsI0o',
      durationSeconds: 410,
      transcript: 'Roles, habilidades blandas, liderazgo y responsabilidades del Project Manager.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'TEXT',
    order: 15,
    blockData: {
      heading: 'Sistema de Gamificación: Niveles, XP e Insignias',
      content:
        'Durante este curso avanzarás mediante retos y recompensas:\n\n• XP (Experiencia): ganas puntos por completar lecturas, acertar quizzes, interactuar con IA y registrar tu Bitácora.\n• Niveles: tu nivel sube a medida que acumulas XP.\n• Insignias: obtendrás insignias por hitos como "Explorador del OVA", "Arquitecto del Proyecto", "Detector de IA" y "Especialista Nivel 1".\n\nNo compites contra otros: compites contigo mismo para mejorar continuamente.',
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 16,
    blockData: {
      stepNumber: 0,
      title: 'Selección del Proyecto Tecnológico Integrador',
      instruction:
        'Selecciona el proyecto tecnológico que estructurarás durante todo el curso. A partir de este momento se inicializa tu Bitácora Personal.',
      stepType: 'SELECT_PROJECT',
      projectOptions: [
        'Sistema Académico Universitario',
        'Aplicación móvil de salud',
        'Sistema de gestión hotelera',
        'Plataforma de comercio electrónico',
        'Sistema IoT para monitoreo inteligente',
        'ERP Empresarial (Compras, Inventario, Finanzas)',
        'Proyecto propio',
      ],
      advice:
        'Elige un proyecto con el que te sientas cómodo o relacionado. Lo acompañarás a lo largo de los 17 pasos de caracterización y planificación.',
      pointsAwarded: 50,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 17,
    blockData: {
      title: 'IA Aplicada: Descripción preliminar del proyecto',
      role: 'Actúa como consultor senior en proyectos TIC.',
      prompt:
        'Propón una breve descripción para un proyecto de [escribe el nombre de tu proyecto seleccionado], indicando qué problema busca resolver y cuál es su objetivo principal.',
      guidance: 'Revisa si la propuesta de la IA es realista y ajústala con tus propias palabras en tu Bitácora.',
      reflectionQuestions: [
        '¿La propuesta de la IA identificó un problema real y concreto?',
        '¿Qué ajustarías para que se adapte mejor a tus expectativas?',
      ],
      pointsAwarded: 35,
    },
  },
  {
    type: 'SURVEY',
    order: 18,
    blockData: {
      title: 'Evaluación Diagnóstica Inicial',
      question: 'Responde honestamente para personalizar tu ruta de aprendizaje:',
      maxSelections: 1,
      options: [
        { id: '1', text: 'Nunca he gestionado proyectos ni utilizado herramientas de IA' },
        { id: '2', text: 'Tengo nociones básicas de proyectos pero poco uso de IA' },
        { id: '3', text: 'Utilizo IA frecuentemente pero quiero estructurar la gestión de proyectos' },
        { id: '4', text: 'Tengo experiencia en ambas áreas y busco profesionalizar mis competencias' },
      ],
      feedback:
        '¡Diagnóstico registrado! El curso te guiará paso a paso desde conceptos básicos hasta aplicaciones avanzadas.',
      pointsAwarded: 20,
    },
  },
  {
    type: 'SCENARIO',
    order: 19,
    blockData: {
      title: 'Caso Introductorio: La Universidad Innovar',
      situation:
        'La Universidad Innovar desea modernizar sus procesos de matrícula: actualmente son presenciales, con largas filas, demoras y quejas constantes. El Rector inicia un proyecto de transformación digital y has sido designado como Director del Proyecto. ¿Cuál debe ser tu primera acción?',
      choices: [
        {
          id: 'a',
          text: 'Comprar inmediatamente licencias de servidores y software',
          feedback: 'Incorrecto. Comprar tecnología sin entender la necesidad real casi siempre genera sobrecostos.',
          isOptimal: false,
        },
        {
          id: 'b',
          text: 'Comprender a fondo el problema y analizar las necesidades de los interesados antes de proponer soluciones',
          feedback: '¡Excelente decisión! Todo proyecto exitoso inicia comprendiendo el problema antes de saltar a la solución.',
          isOptimal: true,
        },
        {
          id: 'c',
          text: 'Comenzar a programar una app móvil sin levantar requisitos',
          feedback: 'Incorrecto. Programar a ciegas conduce a productos que los usuarios no adoptan.',
          isOptimal: false,
        },
      ],
      pointsAwarded: 25,
    },
  },
  {
    type: 'CHECKPOINT',
    order: 20,
    blockData: {
      title: '¡Felicitaciones! Has completado el Módulo 1',
      description:
        'Has dado el primer paso para convertirte en un director de proyectos tecnológicos capaz de integrar PMBOK® con Inteligencia Artificial.\n\nLogros alcanzados:\n✔ Organización del curso y metodología activa comprendidas.\n✔ Uso responsable de la IA como copiloto.\n✔ Proyecto tecnológico seleccionado.\n✔ Bitácora inicial creada.',
      criteria: [
        'Orientación del OVA completada',
        'Proyecto integrador seleccionado',
        'Diagnóstico inicial registrado',
      ],
      badgeKey: 'explorador-ova',
      pointsAwarded: 100,
    },
  },
]

// ----------------------------------------------------
// MÓDULO 2: Proyecto, Valor y Contexto Organizacional
// ----------------------------------------------------
const module2Blocks: BlockSeed[] = [
  {
    type: 'TEXT',
    order: 1,
    blockData: {
      heading: '¿Qué es un Proyecto?',
      content:
        'Un proyecto es un esfuerzo temporal que se realiza para crear un producto, servicio o resultado único que genere valor.\n\nCaracterísticas distintivas:\n• Temporal: tiene un inicio y un final definidos.\n• Único: produce un resultado diferenciado.\n• Orientado al valor: busca resolver una necesidad, aprovechar una oportunidad o habilitar un cambio organizacional.',
    },
  },
  {
    type: 'QUIZ',
    order: 2,
    blockData: {
      question: '¿Cuál de las siguientes situaciones representa un proyecto?',
      options: [
        { id: 'a', text: 'Registrar diariamente la asistencia de los estudiantes', isCorrect: false },
        { id: 'b', text: 'Desarrollar una plataforma virtual para la gestión de matrículas', isCorrect: true },
        { id: 'c', text: 'Atender llamadas continuas en el centro de soporte técnico', isCorrect: false },
        { id: 'd', text: 'Realizar copias de seguridad automáticas cada noche', isCorrect: false },
      ],
      explanation:
        'Desarrollar la plataforma es un esfuerzo temporal y único. Las demás son actividades operativas permanentes.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 3,
    blockData: {
      stepNumber: 1,
      title: 'Nombre y Descripción del Proyecto TIC',
      instruction:
        'Define el nombre de tu proyecto y redacta una descripción clara de lo que pretende lograr (máximo 150 palabras).',
      fields: [
        { key: 'projectName', label: 'Nombre definitivo del proyecto TIC', placeholder: 'Ej. Sistema Inteligente de...', fieldType: 'text' },
        { key: 'projectDescription', label: 'Descripción general del proyecto', maxWords: 150, placeholder: 'Describe el problema que aborda y el objetivo principal...', fieldType: 'textarea' },
      ],
      advice: 'No entres aún en detalles técnicos de programación; enfócate en el qué y para qué del proyecto.',
      pointsAwarded: 50,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 4,
    blockData: {
      title: 'IA Aplicada: Validación de las características de proyecto',
      role: 'Actúa como director de proyectos certificado PMP®.',
      prompt:
        'Analiza la siguiente descripción de proyecto y determina si realmente corresponde a un proyecto según el PMBOK®. Explica por qué y sugiere dos mejoras de redacción: [Pega aquí tu descripción].',
      reflectionQuestions: [
        '¿La IA confirmó que tu propuesta cumple con temporalidad y unicidad?',
        '¿Qué ajustes hiciste en tu Bitácora tras la sugerencia?',
      ],
      pointsAwarded: 35,
    },
  },
  {
    type: 'TEXT',
    order: 5,
    blockData: {
      heading: 'Producto, Servicio y Resultado',
      content:
        'Es fundamental no confundir estos tres conceptos clave:\n\n1. Producto: elemento tangible o digital que se crea (ej. el software instalado, la app móvil).\n2. Servicio: la actividad o capacidad que permite realizar a los usuarios (ej. agendar citas médicas en línea 24/7).\n3. Resultado: el cambio o beneficio medible que produce su uso (ej. reducir el tiempo de espera de 48 a 12 horas).',
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 6,
    blockData: {
      title: 'Actividad interactiva: Producto vs Servicio',
      instruction: 'Clasifica cada elemento según corresponda a un Producto o a un Servicio:',
      categories: ['Producto', 'Servicio'],
      items: [
        { id: '1', text: 'Aplicación móvil instalada en el smartphone', category: 'Producto' },
        { id: '2', text: 'Atención personalizada mediante chatbot 24/7', category: 'Servicio' },
        { id: '3', text: 'Plataforma web de e-learning configurada', category: 'Producto' },
        { id: '4', text: 'Consulta y descarga de certificados en línea', category: 'Servicio' },
      ],
      explanation: 'El producto es el artefacto construido; el servicio es la función que brinda a las personas.',
      pointsAwarded: 30,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 7,
    blockData: {
      stepNumber: 2,
      title: 'Producto, Servicio y Resultado del Proyecto Integrador',
      instruction: 'Identifica y diferencia claramente qué entregarás, qué servicio habilitarás y qué resultado esperarás.',
      fields: [
        { key: 'mainProduct', label: 'Producto principal que se entregará', placeholder: 'Ej. Software web de gestión...', fieldType: 'text' },
        { key: 'mainService', label: 'Servicio que ofrecerá a los usuarios', placeholder: 'Ej. Consulta y radicación en línea...', fieldType: 'textarea' },
        { key: 'expectedResult', label: 'Resultado o cambio medible esperado', placeholder: 'Ej. Reducción del tiempo de respuesta en un 60%...', fieldType: 'textarea' },
        { key: 'successIndicator', label: 'Indicador de éxito inicial', placeholder: 'Ej. % de adopción de usuarios en 3 meses...', fieldType: 'text' },
      ],
      advice: 'Recuerda: el producto es el medio; el resultado es el impacto que genera.',
      pointsAwarded: 50,
    },
  },
  {
    type: 'TEXT',
    order: 8,
    blockData: {
      heading: 'La Creación de Valor y el Contexto Organizacional',
      content:
        'El PMBOK® establece que el propósito de todo proyecto es crear valor (financiero, social, operativo o estratégico).\n\nUn proyecto puede cumplir tiempo, costo y alcance, pero si los usuarios no adoptan la solución, el proyecto habrá generado poco valor.\n\nAsimismo, el proyecto opera dentro de un contexto organizacional: normas, políticas, infraestructura existente y cultura institucional que condicionan su éxito.',
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 9,
    blockData: {
      stepNumber: 3,
      title: 'Matriz de Valor y Contexto Organizacional',
      instruction: 'Analiza el valor generado y el entorno interno/externo en el que operará tu proyecto:',
      matrixColumns: ['Aspecto', 'Respuesta'],
      matrixRows: [
        '¿Qué valor concreto aporta el proyecto?',
        '¿Quiénes son los beneficiarios directos?',
        '¿Cómo se medirá el éxito del proyecto?',
        '¿Qué ocurriría si el proyecto NO se realiza?',
        'Restricciones y contexto institucional clave',
      ],
      advice: 'Esta matriz servirá como base para el Caso de Negocio (Business Case) de tu proyecto.',
      pointsAwarded: 60,
    },
  },
  {
    type: 'CHECKPOINT',
    order: 10,
    blockData: {
      title: '¡Felicitaciones! Has completado el Módulo 2',
      description:
        'Has definido con rigor los cimientos de tu proyecto integrador:\n✔ Diferenciación de producto, servicio y resultado.\n✔ Enfoque en la generación de valor según PMBOK®.\n✔ Análisis del contexto organizacional.\n✔ Matriz de valor registrada en tu Bitácora.',
      criteria: [
        'Concepto de proyecto y valor comprendidos',
        'Pasos 1, 2 y 3 del proyecto integrador completados',
      ],
      badgeKey: 'arquitecto-proyecto',
      pointsAwarded: 250,
    },
  },
]

// ----------------------------------------------------
// MÓDULO 3: Proyectos, Programas, Portafolios y Operaciones
// ----------------------------------------------------
const module3Blocks: BlockSeed[] = [
  {
    type: 'TEXT',
    order: 1,
    blockData: {
      heading: 'Proyectos, Programas, Portafolios y Operaciones',
      content:
        'Para liderar iniciativas tecnológicas es clave comprender cómo se estructuran dentro de la organización:\n\n• Proyecto: esfuerzo temporal para crear un resultado único.\n• Programa: grupo de proyectos relacionados gestionados de forma coordinada para obtener beneficios que no se lograrían por separado.\n• Portafolio: conjunto de proyectos, programas y operaciones agrupados para cumplir objetivos estratégicos de la organización.\n• Operaciones: actividades permanentes y continuas que mantienen el negocio funcionando.\n• PMO (Oficina de Gestión de Proyectos): estructura que estandariza prácticas, asesora y supervisa proyectos.',
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 2,
    blockData: {
      title: 'Actividad interactiva: Proyecto vs Operación',
      instruction: 'Clasifica cada actividad según corresponda a un Proyecto o a una Operación:',
      categories: ['Proyecto', 'Operación'],
      items: [
        { id: '1', text: 'Desarrollo de un chatbot institucional con IA', category: 'Proyecto' },
        { id: '2', text: 'Atención diaria de incidentes en la mesa de ayuda', category: 'Operación' },
        { id: '3', text: 'Implementación y despliegue inicial de un ERP', category: 'Proyecto' },
        { id: '4', text: 'Copias de seguridad automáticas programadas cada noche', category: 'Operación' },
        { id: '5', text: 'Migración de servidores físicos hacia la nube', category: 'Proyecto' },
        { id: '6', text: 'Actualización mensual de parches de seguridad en producción', category: 'Operación' },
      ],
      explanation: 'Los proyectos transforman y crean nuevas capacidades; las operaciones las mantienen en funcionamiento.',
      pointsAwarded: 35,
    },
  },
  {
    type: 'TEXT',
    order: 3,
    blockData: {
      heading: 'Tipos de Proyectos TIC',
      content:
        'En las organizaciones encontramos diversas categorías de proyectos tecnológicos:\n\n1. Desarrollo de Software: aplicaciones a la medida, web y móviles.\n2. Infraestructura Tecnológica: redes, cableado, centros de datos.\n3. Cloud Computing: migraciones (IaaS, PaaS, SaaS) a AWS, Azure o GCP.\n4. Inteligencia Artificial: asistentes virtuales, analítica predictiva, visión por computador.\n5. IoT (Internet de las Cosas): sensores inteligentes y monitoreo en tiempo real.\n6. ERP / Sistemas Empresariales: integración de finanzas, compras, inventario (ej. SAP).\n7. Ciberseguridad: autenticación multifactor, gobierno de identidades, SOC.',
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 4,
    blockData: {
      stepNumber: 4,
      title: 'Clasificación del Proyecto TIC y Gobierno Organizacional',
      instruction: 'Clasifica tu proyecto integrador y determina su encuadre estratégico:',
      fields: [
        {
          key: 'ticProjectType',
          label: 'Tipo principal de proyecto TIC',
          fieldType: 'select',
          options: [
            'Desarrollo de software',
            'Infraestructura tecnológica',
            'Cloud Computing',
            'Inteligencia Artificial',
            'Internet de las Cosas (IoT)',
            'ERP Empresarial',
            'Ciberseguridad',
            'Aplicación móvil',
          ],
        },
        { key: 'ticTechnologies', label: 'Tecnologías clave previstas', placeholder: 'Ej. React, Python, PostgreSQL, Azure...', fieldType: 'text' },
        { key: 'programAffiliation', label: '¿Podría formar parte de un programa mayor? ¿Cuál?', placeholder: 'Ej. Programa de Transformación Digital...', fieldType: 'textarea' },
        { key: 'postProjectOperations', label: 'Operaciones que surgirán cuando el proyecto finalice', placeholder: 'Ej. Soporte técnico a usuarios, monitoreo de servidores...', fieldType: 'textarea' },
      ],
      advice: 'Pensar desde el inicio en la transición a operaciones evitará que tu proyecto quede abandonado.',
      pointsAwarded: 60,
    },
  },
  {
    type: 'CHECKPOINT',
    order: 5,
    blockData: {
      title: '¡Felicitaciones! Has completado el Módulo 3',
      description:
        'Comprendes el mapa macro de los proyectos tecnológicos:\n✔ Diferenciación de proyectos, programas, portafolios y operaciones.\n✔ Rol de la PMO.\n✔ Taxonomía de proyectos TIC.\n✔ Clasificación formal de tu proyecto en la Bitácora.',
      criteria: [
        'Estructura organizacional comprendida',
        'Paso 4 del proyecto integrador completado',
      ],
      badgeKey: 'arquitecto-tic',
      pointsAwarded: 300,
    },
  },
]

// ----------------------------------------------------
// MÓDULO 4: Ciclo de Vida, Enfoques de Gestión y Dominios
// ----------------------------------------------------
const module4Blocks: BlockSeed[] = [
  {
    type: 'TEXT',
    order: 1,
    blockData: {
      heading: 'Ciclo de Vida vs Enfoque de Desarrollo',
      content:
        'Dos conceptos esenciales que todo gestor debe dominar:\n\n• Ciclo de Vida: la estructura temporal de fases por las que atraviesa un proyecto desde su inicio hasta su cierre (Inicio → Planificación → Ejecución → Monitoreo y Control → Cierre).\n\n• Enfoque de Desarrollo: la manera en que se produce y entrega el producto:\n  - Predictivo (Cascada): requisitos estables, planificación exhaustiva inicial.\n  - Ágil (Adaptativo): entregas incrementales y cortas, requisitos emergentes, retroalimentación continua (Scrum, Kanban, XP).\n  - Híbrido: combina predictivo para componentes estables (ej. infraestructura/contratos) y ágil para componentes inciertos (ej. interfaz de usuario).',
    },
  },
  {
    type: 'QUIZ',
    order: 2,
    blockData: {
      question: '¿Qué debería determinar principalmente la selección del enfoque de gestión?',
      options: [
        { id: 'a', text: 'La moda tecnológica o la preferencia personal del director', isCorrect: false },
        { id: 'b', text: 'Que la organización siempre use la misma metodología para todo', isCorrect: false },
        { id: 'c', text: 'Las características, nivel de incertidumbre, requisitos y contexto del proyecto', isCorrect: true },
        { id: 'd', text: 'La cantidad de documentos que exija la auditoría', isCorrect: false },
      ],
      explanation:
        'El principio de adaptación (tailoring) del PMBOK® exige adaptar el enfoque al contexto real del proyecto.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 3,
    blockData: {
      title: 'Actividad interactiva: Predictivo, Ágil o Híbrido',
      instruction: 'Relaciona cada escenario de proyecto con el enfoque más conveniente:',
      categories: ['Predictivo', 'Ágil', 'Híbrido'],
      items: [
        { id: '1', text: 'Instalación de fibra óptica y cableado estructurado con normas estrictas', category: 'Predictivo' },
        { id: '2', text: 'Nueva app móvil innovadora donde los usuarios aún no definen qué funciones prefieren', category: 'Ágil' },
        { id: '3', text: 'Implementación ERP con infraestructura fija y módulos que evolucionan con feedback', category: 'Híbrido' },
        { id: '4', text: 'Construcción de un centro de datos con especificaciones contractuales fijas', category: 'Predictivo' },
      ],
      explanation: 'Alta certeza → Predictivo. Alta incertidumbre → Ágil. Mixto → Híbrido.',
      pointsAwarded: 35,
    },
  },
  {
    type: 'TEXT',
    order: 4,
    blockData: {
      heading: 'Los 8 Dominios de Desempeño del PMBOK®',
      content:
        'Los dominios de desempeño son áreas de enfoque críticas para entregar resultados efectivos:\n\n1. Interesados (Stakeholders): expectativas y comunicación.\n2. Equipo: liderazgo, clima laboral y competencias.\n3. Enfoque de Desarrollo y Ciclo de Vida: cadencia de entrega y fases.\n4. Planificación: organización estructurada del trabajo.\n5. Trabajo del Proyecto: ejecución fluida y gestión de cambios.\n6. Entrega: cumplimiento de alcance, calidad y criterios de aceptación.\n7. Medición: métricas e indicadores de desempeño.\n8. Incertidumbre: gestión proactiva de riesgos y oportunidades.',
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 5,
    blockData: {
      stepNumber: 5,
      title: 'Selección y Justificación del Enfoque del Proyecto TIC',
      instruction: 'Define y fundamenta el ciclo de vida, enfoque y framework de tu proyecto integrador:',
      fields: [
        {
          key: 'selectedApproach',
          label: 'Enfoque de gestión seleccionado',
          fieldType: 'select',
          options: ['Predictivo', 'Ágil', 'Híbrido'],
        },
        { key: 'approachJustification', label: 'Justificación del enfoque según tu nivel de incertidumbre', placeholder: 'Explica por qué es conveniente para tu solución...', fieldType: 'textarea' },
        { key: 'complementaryFramework', label: 'Framework o método complementario (ej. Scrum, Kanban, DevOps, XP)', placeholder: 'Ej. Scrum para sprints de desarrollo y Kanban para soporte...', fieldType: 'text' },
        { key: 'priorityDomains', label: '¿Cuáles dominios de desempeño requerirán mayor atención y por qué?', placeholder: 'Ej. Interesados y Entrega porque...', fieldType: 'textarea' },
      ],
      advice: 'No existen respuestas únicas: lo crucial es que tu justificación esté fundamentada en los requisitos del proyecto.',
      pointsAwarded: 70,
    },
  },
  {
    type: 'CHECKPOINT',
    order: 6,
    blockData: {
      title: '¡Felicitaciones! Has completado el Módulo 4',
      description:
        'Dominas la estrategia metodológica de proyectos:\n✔ Ciclos de vida y adaptación.\n✔ Cuándo usar predictivo, ágil o híbrido.\n✔ Frameworks tecnológicos (Scrum, Kanban, DevOps).\n✔ Los 8 dominios de desempeño del PMBOK®.',
      criteria: [
        'Enfoques de desarrollo comprendidos',
        'Paso 5 del proyecto integrador completado',
      ],
      badgeKey: 'estratega-proyecto',
      pointsAwarded: 350,
    },
  },
]

// ----------------------------------------------------
// MÓDULO 5: Fundamentos de IA para la Gestión de Proyectos
// ----------------------------------------------------
const module5Blocks: BlockSeed[] = [
  {
    type: 'TEXT',
    order: 1,
    blockData: {
      heading: 'Modelos de Lenguaje (LLMs), Capacidades y Límites',
      content:
        'Un Large Language Model (LLM) es una red neuronal entrenada con enormes volúmenes de texto para predecir la secuencia de palabras más probable en función de un prompt.\n\n⚠️ Consecuencia crítica: Que una IA responda con total seguridad y elocuencia NO significa que la información sea verdadera.\n\nAlucinación de IA: fenómeno en el que el modelo inventa datos, normas, fechas o métricas con apariencia convincente pero sin respaldo en la realidad.',
    },
  },
  {
    type: 'MINIGAME',
    order: 2,
    blockData: {
      gameType: 'CONFIDENCE_ROUNDS',
      title: 'Minijuego: ¿Lo sabe o lo está inventando?',
      description:
        'Tu asistente de IA ha generado afirmaciones sobre un proyecto. Tu misión es evaluar qué tan confiable es cada una clasificándola con el semáforo y justificando tu decisión.',
      badgeKey: 'detector-ia',
      pointsAwarded: 200,
      rounds: [
        {
          roundNumber: 1,
          context: 'El presupuesto aprobado para el proyecto es de COP $50 millones.',
          aiResponse: 'El proyecto cuenta con un presupuesto aprobado de COP $50 millones.',
          correctAnswer: 'RESPALDADA',
          feedback: 'Correcto. La afirmación coincide directamente con la información disponible.',
          justificationOptions: [
            { id: 'a', text: 'La información disponible coincide directamente con la afirmación.', isCorrect: true },
            { id: 'b', text: 'La IA siempre proporciona información verdadera.', isCorrect: false },
            { id: 'c', text: 'No es necesario revisar la información de IA.', isCorrect: false },
          ],
          xpAwarded: 30,
        },
        {
          roundNumber: 2,
          context: 'El proyecto contempla desarrollar una aplicación móvil para gestionar solicitudes de usuarios.',
          aiResponse: 'La aplicación reducirá en un 30 % el tiempo necesario para realizar las solicitudes.',
          correctAnswer: 'VERIFICAR',
          feedback: 'Correcto. La cifra del 30% es un resultado cuantitativo que no ha sido medido ni comprobado aún.',
          justificationOptions: [
            { id: 'a', text: 'La cifra está comprobada porque la calculó la IA.', isCorrect: false },
            { id: 'b', text: 'La cifra representa una estimación o meta que debe demostrarse con datos.', isCorrect: true },
            { id: 'c', text: 'Las herramientas de IA nunca pueden dar números.', isCorrect: false },
          ],
          xpAwarded: 30,
        },
        {
          roundNumber: 3,
          context: 'La información indica únicamente: "La plataforma será desarrollada utilizando tecnologías web."',
          aiResponse: 'El sistema utilizará React, Node.js y PostgreSQL.',
          correctAnswer: 'SIN_EVIDENCIA',
          feedback: 'Correcto. Aunque sean tecnologías populares, la información no especificó esa arquitectura.',
          justificationOptions: [
            { id: 'a', text: 'Son tecnologías populares en la web.', isCorrect: false },
            { id: 'b', text: 'La información disponible no especifica ni aprueba ese stack tecnológico.', isCorrect: true },
            { id: 'c', text: 'Probablemente sean esas.', isCorrect: false },
          ],
          xpAwarded: 30,
        },
        {
          roundNumber: 4,
          context: 'La empresa está evaluando diferentes proveedores de tecnología.',
          aiResponse: 'TechProvider S.A.S. es el proveedor más adecuado porque tiene mayor experiencia.',
          correctAnswer: 'VERIFICAR',
          feedback: 'Correcto. Es una valoración subjetiva que exige evaluar propuestas técnicas y contractuales.',
          justificationOptions: [
            { id: 'a', text: 'La IA sabe qué proveedor tiene mejor reputación.', isCorrect: false },
            { id: 'b', text: 'La afirmación requiere evidencia demostrable para justificar la selección.', isCorrect: true },
            { id: 'c', text: 'Ninguna IA puede opinar sobre empresas.', isCorrect: false },
          ],
          xpAwarded: 30,
        },
        {
          roundNumber: 5,
          context: 'La documentación indica: "El sistema se encuentra actualmente en fase de pruebas."',
          aiResponse: 'El sistema fue aprobado por el cliente el 10 de agosto de 2026.',
          correctAnswer: 'SIN_EVIDENCIA',
          feedback: '¡Alucinación detectada! La documentación dice que está en pruebas; no existe aprobación ni fecha.',
          justificationOptions: [
            { id: 'a', text: 'La fecha es concreta y por ende real.', isCorrect: false },
            { id: 'b', text: 'La información no respalda ni la fecha ni la aprobación del cliente.', isCorrect: true },
            { id: 'c', text: 'La IA consultó el correo del cliente.', isCorrect: false },
          ],
          xpAwarded: 30,
        },
      ],
    },
  },
  {
    type: 'MINIGAME',
    order: 3,
    blockData: {
      gameType: 'ERROR_HUNTER',
      title: 'Minijuego: Cazadores de Errores (Auditoría de Informe de IA)',
      description:
        'Un informe de avance generado por IA sobre un ERP contiene inconsistencias. Audítalo para encontrar: 2 datos inventados, 1 contradicción, 1 afirmación sin evidencia y 1 dato correcto.',
      badgeKey: 'auditor-ia',
      pointsAwarded: 125,
      reportAudit: {
        reportTitle: 'Informe de avance del proyecto: Implementación de ERP Empresarial',
        reportDate: '12 de agosto de 2026 · Estado: En ejecución',
        reportSections: [
          {
            title: '1. Resumen y Presupuesto',
            content:
              'El presupuesto aprobado es de COP $80.000.000 y se han ejecutado COP $40.000.000.\nLa IA concluye: "El proyecto ha utilizado el 50 % del presupuesto disponible."',
          },
          {
            title: '2. Cronograma y Migración de Datos',
            content:
              'La migración de datos históricos presenta retrasos debido a inconsistencias encontradas.\nLa IA concluye: "El proyecto finalizará dentro del plazo y no será necesario modificar el cronograma."\nAdemás, en la sección técnica la IA afirma: "El 100 % de los datos históricos ya fueron validados y están listos para ser migrados."',
          },
          {
            title: '3. Equipo del Proyecto y Riesgos',
            content:
              'El equipo real cuenta con 1 consultor ERP, 2 analistas y 2 especialistas técnicos.\nLa IA indica: "El proyecto cuenta con cuatro consultores ERP certificados."\nEntre los riesgos se registran inconsistencias de datos y disponibilidad de usuarios, pero la IA concluye: "El principal riesgo es que el sistema no tenga suficiente capacidad de almacenamiento."',
          },
        ],
        targets: [
          {
            id: 't1',
            type: 'INVENTED',
            typeLabel: 'Dato Inventado 1',
            location: 'Equipo del proyecto',
            targetText: 'El proyecto cuenta con cuatro consultores ERP certificados.',
            explanation: 'La información indica 1 consultor, no cuatro, y no hay evidencia de certificación.',
          },
          {
            id: 't2',
            type: 'INVENTED',
            typeLabel: 'Dato Inventado 2',
            location: 'Riesgos',
            targetText: 'El principal riesgo es que el sistema no tenga suficiente capacidad de almacenamiento.',
            explanation: 'El almacenamiento no figuraba en la matriz de riesgos del proyecto.',
          },
          {
            id: 't3',
            type: 'CONTRADICTION',
            typeLabel: 'Contradicción Crítica',
            location: 'Cronograma vs Migración',
            targetText: 'El 100 % de los datos ya fueron validados vs La migración presenta retrasos por inconsistencias.',
            explanation: 'Si la migración está retrasada por inconsistencias, no puede estar el 100% validado.',
          },
          {
            id: 't4',
            type: 'NO_EVIDENCE',
            typeLabel: 'Afirmación sin Evidencia',
            location: 'Cronograma',
            targetText: 'El proyecto finalizará dentro del plazo establecido y no será necesario modificar el cronograma.',
            explanation: 'Es una predicción optimista de la IA sin datos para sustentarla.',
          },
          {
            id: 't5',
            type: 'CORRECT',
            typeLabel: 'Dato Correcto Verificado',
            location: 'Presupuesto',
            targetText: 'El proyecto ha utilizado el 50 % del presupuesto disponible.',
            explanation: 'Comprobación matemática: (40M ÷ 80M) x 100 = 50%. Afirmación 100% verídica.',
          },
        ],
      },
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 4,
    blockData: {
      stepNumber: 6,
      title: 'Uso Responsable de IA en el Proyecto Integrador',
      instruction: 'Define las políticas de gobernanza para el uso de IA en tu proyecto:',
      fields: [
        {
          key: 'aiActivities',
          label: 'Actividades donde el equipo utilizará IA como apoyo',
          fieldType: 'checkbox_group',
          options: [
            'Generación de ideas iniciales',
            'Borradores de documentación',
            'Identificación preliminar de riesgos',
            'Síntesis de actas y reuniones',
            'Análisis de datos de prueba',
          ],
        },
        { key: 'confidentialInfoPolicy', label: 'Información sensible o confidencial que NUNCA se compartirá con IA pública', placeholder: 'Ej. Datos personales de clientes, contraseñas, contratos...', fieldType: 'textarea' },
        { key: 'verificationMechanism', label: 'Mecanismos obligatorios de verificación humana', placeholder: 'Ej. Revisión técnica por el líder antes de incorporar código o textos...', fieldType: 'textarea' },
        { key: 'humanDecisions', label: 'Decisiones críticas que permanecerán 100% bajo supervisión humana', placeholder: 'Ej. Aprobación de presupuesto, contratación y entrega final...', fieldType: 'textarea' },
      ],
      advice: 'El uso ético de la IA protege a la organización y salvaguarda la privacidad de las personas.',
      pointsAwarded: 70,
    },
  },
  {
    type: 'CHECKPOINT',
    order: 5,
    blockData: {
      title: '¡Felicitaciones! Has completado el Módulo 5',
      description:
        'Has adquirido pensamiento crítico y competencias de auditoría frente a la IA:\n✔ Comprensión de LLMs y modelos predictivos.\n✔ Detección de alucinaciones y datos no respaldados.\n✔ Protocolos de uso responsable y protección de datos.\n✔ Política de IA integrada en tu Bitácora.',
      criteria: [
        'Minijuegos de auditoría superados',
        'Paso 6 de política de IA completado',
      ],
      badgeKey: 'supervisor-ia',
      pointsAwarded: 400,
    },
  },
]

// ----------------------------------------------------
// EVALUACIÓN FINAL: 25 Preguntas (Nivel 1 Completo)
// ----------------------------------------------------
const finalExamBlock: BlockSeed = {
  type: 'EXAM',
  order: 6,
  blockData: {
    title: 'Evaluación Final - Nivel 1: Comprensión del Proyecto Tecnológico',
    description:
      'Evaluación global de los 5 módulos (Módulos 1 al 5). Consta de 25 preguntas de opción múltiple (4 puntos c/u = 100 puntos en total). Mínimo aprobatorio: 70%. Al aprobar obtendrás la insignia "Especialista Nivel 1" y habilitarás el Nivel 2.',
    questionsCount: 25,
    pointsPerQuestion: 4,
    passingScore: 70,
    badgeKey: 'graduado-nivel-1',
    pointsAwarded: 500,
    questions: [
      {
        id: 1,
        question: 'Una universidad registra las matrículas mediante varios sistemas independientes y decide desarrollar una nueva plataforma centralizada con equipo, presupuesto y fecha definida. ¿Cuál afirmación describe mejor esta iniciativa?',
        options: [
          { id: 'a', text: 'Es una operación porque la matrícula ocurre todos los semestres.' },
          { id: 'b', text: 'Es un proyecto porque representa un esfuerzo temporal orientado a generar un producto único.' },
          { id: 'c', text: 'Es un servicio porque los estudiantes utilizarán la plataforma.' },
          { id: 'd', text: 'Es una actividad rutinaria porque utiliza tecnología existente.' },
        ],
        correctOptionId: 'b',
        explanation: 'Desarrollar la nueva plataforma es temporal y genera un producto único; la atención semestral posterior será la operación.',
      },
      {
        id: 2,
        question: 'Una empresa desarrolla un sistema de atención móvil: obtiene la app funcionando, permite solicitar servicios desde cualquier lugar y reduce el tiempo de atención de 48 a 12 horas. ¿Cuál identifica correctamente producto, servicio y resultado?',
        options: [
          { id: 'a', text: 'Producto: reducción del tiempo; servicio: aplicación; resultado: solicitudes.' },
          { id: 'b', text: 'Producto: aplicación móvil; servicio: solicitud de servicios desde la app; resultado: reducción del tiempo.' },
          { id: 'c', text: 'Producto: solicitudes; servicio: reducción del tiempo; resultado: aplicación móvil.' },
          { id: 'd', text: 'Producto: aplicación móvil; servicio: reducción del tiempo; resultado: sistema instalado.' },
        ],
        correctOptionId: 'b',
        explanation: 'Producto: el artefacto creado; Servicio: lo que permite hacer; Resultado: el impacto o mejora medible.',
      },
      {
        id: 3,
        question: 'Una empresa implementa un sistema de inventario en tiempo y costo. Sin embargo, los empleados siguen usando hojas de cálculo porque el sistema es difícil de usar. ¿Cuál es la mejor conclusión?',
        options: [
          { id: 'a', text: 'El proyecto fue completamente exitoso porque cumplió cronograma y presupuesto.' },
          { id: 'b', text: 'El proyecto generó valor porque el software se desarrolló.' },
          { id: 'c', text: 'El proyecto cumplió objetivos de ejecución, pero generó poco valor al no producir los beneficios esperados.' },
          { id: 'd', text: 'El proyecto debe considerarse una operación.' },
        ],
        correctOptionId: 'c',
        explanation: 'El valor no está en la entrega del artefacto sino en la adopción efectiva y los beneficios que produce para el negocio.',
      },
      {
        id: 4,
        question: 'Antes de planificar una plataforma educativa, el equipo analiza calendario, políticas, infraestructura, presupuesto y necesidades de los usuarios. ¿Por qué es importante este análisis?',
        options: [
          { id: 'a', text: 'Para seleccionar únicamente el lenguaje de programación.' },
          { id: 'b', text: 'Para comprender el contexto organizacional y adaptar la gestión a sus características.' },
          { id: 'c', text: 'Para eliminar la necesidad de identificar riesgos.' },
          { id: 'd', text: 'Para garantizar que el proyecto termine antes de la fecha prevista.' },
        ],
        correctOptionId: 'b',
        explanation: 'El PMBOK® indica que el éxito radica en comprender el contexto y adaptar los procesos a la realidad de la organización.',
      },
      {
        id: 5,
        question: 'Durante el desarrollo aparecen retrasos; el director reúne al equipo, redistribuye tareas, comunica la situación al sponsor y coordina una solución. ¿Qué competencia demuestra principalmente?',
        options: [
          { id: 'a', text: 'Desarrollo de software.' },
          { id: 'b', text: 'Operación de sistemas.' },
          { id: 'c', text: 'Dirección y coordinación del proyecto.' },
          { id: 'd', text: 'Administración de infraestructura física.' },
        ],
        correctOptionId: 'c',
        explanation: 'La dirección se enfoca en liderar personas, resolver impedimentos y negociar con los interesados clave.',
      },
      {
        id: 6,
        question: 'Una empresa implementa un software con fecha de inicio y fin. Una vez en producción, el personal atiende solicitudes diariamente usando el nuevo sistema. ¿Cuál clasificación es correcta?',
        options: [
          { id: 'a', text: 'Tanto la implementación como la atención diaria son proyectos.' },
          { id: 'b', text: 'La implementación es un proyecto y la atención diaria corresponde a una operación.' },
          { id: 'c', text: 'La implementación es una operación y la atención diaria es un proyecto.' },
          { id: 'd', text: 'Ambas actividades son operaciones continuas.' },
        ],
        correctOptionId: 'b',
        explanation: 'El desarrollo es temporal (proyecto); la atención repetitiva y continua posterior es operativa.',
      },
      {
        id: 7,
        question: 'Una organización tiene tres proyectos coordinados: Implementar un ERP, migrar datos corporativos y capacitar usuarios. Juntos logran un beneficio mayor que por separado. ¿Qué concepto describe mejor esta situación?',
        options: [
          { id: 'a', text: 'Portafolio.' },
          { id: 'b', text: 'Operación.' },
          { id: 'c', text: 'Programa.' },
          { id: 'd', text: 'PMO.' },
        ],
        correctOptionId: 'c',
        explanation: 'Un programa agrupa proyectos interrelacionados para lograr beneficios sinérgicos.',
      },
      {
        id: 8,
        question: 'Una empresa evalúa proyectos de ciberseguridad, apps móviles, cloud, IA e infraestructura que no están relacionados entre sí, para decidir la inversión según la estrategia. ¿A qué concepto corresponde?',
        options: [
          { id: 'a', text: 'Programa.' },
          { id: 'b', text: 'Portafolio.' },
          { id: 'c', text: 'Operación.' },
          { id: 'd', text: 'Sprint.' },
        ],
        correctOptionId: 'b',
        explanation: 'El portafolio agrupa proyectos y programas diversos alineados a la estrategia organizacional.',
      },
      {
        id: 9,
        question: 'Una organización crea una unidad encargada de definir metodologías, indicadores, plantillas y capacitación para directores de proyectos. ¿Cuál es su propósito principal?',
        options: [
          { id: 'a', text: 'Programar todas las aplicaciones de la empresa.' },
          { id: 'b', text: 'Sustituir a los directores de proyectos.' },
          { id: 'c', text: 'Apoyar y estandarizar prácticas de dirección y gestión de proyectos (PMO).' },
          { id: 'd', text: 'Operar los sistemas una vez finalizados.' },
        ],
        correctOptionId: 'c',
        explanation: 'Esa es la función medular de una Oficina de Gestión de Proyectos (PMO).',
      },
      {
        id: 10,
        question: 'Una empresa traslada sus servidores y aplicaciones a una plataforma de computación en la nube, diseñando arquitectura y migrando servicios. ¿Cómo clasificarías este proyecto?',
        options: [
          { id: 'a', text: 'Proyecto de aplicaciones móviles.' },
          { id: 'b', text: 'Proyecto de infraestructura / Cloud.' },
          { id: 'c', text: 'Proyecto exclusivamente de ciberseguridad.' },
          { id: 'd', text: 'Proyecto de IoT.' },
        ],
        correctOptionId: 'b',
        explanation: 'Pertenece a la categoría de proyectos de Infraestructura Tecnológica y Cloud Computing.',
      },
      {
        id: 11,
        question: 'Una solución recopila datos de sensores en máquinas industriales y los transmite a una plataforma para monitorear variables en tiempo real. ¿Qué tipo de proyecto TIC es?',
        options: [
          { id: 'a', text: 'Internet de las Cosas (IoT).' },
          { id: 'b', text: 'ERP Empresarial.' },
          { id: 'c', text: 'Aplicación móvil de usuario final.' },
          { id: 'd', text: 'Migración de correo.' },
        ],
        correctOptionId: 'a',
        explanation: 'IoT combina sensores físicos, conectividad y analítica para monitoreo en tiempo real.',
      },
      {
        id: 12,
        question: 'Una empresa desea implementar un sistema integrado para compras, inventario, ventas y finanzas que sustituya sistemas aislados. ¿Qué tipo de proyecto TIC corresponde mejor?',
        options: [
          { id: 'a', text: 'Proyecto de IA Generativa.' },
          { id: 'b', text: 'Proyecto IoT.' },
          { id: 'c', text: 'Proyecto ERP.' },
          { id: 'd', text: 'Proyecto exclusivamente de red.' },
        ],
        correctOptionId: 'c',
        explanation: 'Un Enterprise Resource Planning (ERP) integra las áreas centrales de negocio.',
      },
      {
        id: 13,
        question: '¿Cuál secuencia representa el ciclo de vida estándar de un proyecto estudiado en el curso?',
        options: [
          { id: 'a', text: 'Ejecución → Inicio → Cierre → Planificación → Monitoreo.' },
          { id: 'b', text: 'Inicio → Planificación → Ejecución → Monitoreo y Control → Cierre.' },
          { id: 'c', text: 'Planificación → Inicio → Monitoreo → Ejecución → Cierre.' },
          { id: 'd', text: 'Inicio → Ejecución → Planificación → Cierre → Monitoreo.' },
        ],
        correctOptionId: 'b',
        explanation: 'Secuencia clásica y coherente: Inicio, Planificación, Ejecución, Monitoreo y Control, y Cierre.',
      },
      {
        id: 14,
        question: 'Un sistema tecnológico altamente regulado posee requisitos claros desde el inicio, pocas posibilidades de cambio y auditorías estrictas. ¿Qué enfoque resulta más conveniente?',
        options: [
          { id: 'a', text: 'Predictivo.' },
          { id: 'b', text: 'Ágil exclusivamente.' },
          { id: 'c', text: 'Kanban obligatorio.' },
          { id: 'd', text: 'Incremental libre.' },
        ],
        correctOptionId: 'a',
        explanation: 'Cuando la incertidumbre es baja y los requisitos son estables y regulados, el enfoque predictivo es ideal.',
      },
      {
        id: 15,
        question: 'Una startup desarrolla una app pero los usuarios no tienen claro qué funciones prefieren. El equipo busca entregar versiones funcionales cortas para recibir feedback. ¿Qué enfoque conviene?',
        options: [
          { id: 'a', text: 'Predictivo rígido.' },
          { id: 'b', text: 'Ágil / Adaptativo.' },
          { id: 'c', text: 'Operativo continuo.' },
          { id: 'd', text: 'Cierre anticipado.' },
        ],
        correctOptionId: 'b',
        explanation: 'La agilidad brilla ante alta incertidumbre y necesidad de validación frecuente con usuarios.',
      },
      {
        id: 16,
        question: 'En un ERP, la infraestructura tiene requisitos fijos y contratos rígidos, pero la interfaz y experiencia de usuario requiere iteraciones con empleados. ¿Qué enfoque es más adecuado?',
        options: [
          { id: 'a', text: 'Predictivo para absolutamente todo.' },
          { id: 'b', text: 'Ágil para absolutamente todo.' },
          { id: 'c', text: 'Híbrido, combinando predictivo para infraestructura y ágil para interfaz.' },
          { id: 'd', text: 'Ningún enfoque.' },
        ],
        correctOptionId: 'c',
        explanation: 'El enfoque híbrido aprovecha lo mejor de ambos mundos adaptado a cada componente.',
      },
      {
        id: 17,
        question: 'Un equipo entrega primero el login; luego el catálogo; luego el carrito; y finalmente los pagos. ¿Qué característica representa principalmente este ejemplo?',
        options: [
          { id: 'a', text: 'Desarrollo incremental.' },
          { id: 'b', text: 'Operación continua.' },
          { id: 'c', text: 'Desarrollo exclusivamente predictivo.' },
          { id: 'd', text: 'Cierre del proyecto.' },
        ],
        correctOptionId: 'a',
        explanation: 'El desarrollo incremental entrega valor funcional utilizable en bloques sucesivos.',
      },
      {
        id: 18,
        question: 'En un proyecto, los usuarios piden funciones, el sponsor busca ahorro económico y el equipo técnico estabilidad. ¿Qué dominio de desempeño requiere especial atención?',
        options: [
          { id: 'a', text: 'Interesados (Stakeholders).' },
          { id: 'b', text: 'Medición.' },
          { id: 'c', text: 'Trabajo.' },
          { id: 'd', text: 'Entrega.' },
        ],
        correctOptionId: 'a',
        explanation: 'El dominio de Interesados gestiona expectativas, acuerdos y relaciones entre distintos grupos.',
      },
      {
        id: 19,
        question: 'Un PM recibe grabaciones de 5 reuniones y usa IA Generativa para obtener un borrador de acuerdos y tareas pendientes, el cual revisa y valida personalmente. ¿Qué afirmación describe mejor la situación?',
        options: [
          { id: 'a', text: 'La IA está sustituyendo la dirección del proyecto.' },
          { id: 'b', text: 'La IA está apoyando una tarea de transformación y síntesis de información.' },
          { id: 'c', text: 'La IA tomó una decisión contractual crítica.' },
          { id: 'd', text: 'La IA garantiza que no existan errores en el acta.' },
        ],
        correctOptionId: 'b',
        explanation: 'Representa el uso ideal: la IA asiste procesando información y el profesional valida.',
      },
      {
        id: 20,
        question: 'Una herramienta de IA cita normas legales y fechas de vigencia para un software médico. El director decide comprobar las leyes en fuentes oficiales antes de usarlas. ¿Por qué es acertado?',
        options: [
          { id: 'a', text: 'Porque los LLMs nunca pueden responder preguntas de tecnología.' },
          { id: 'b', text: 'Porque una respuesta elocuente no garantiza que sea verdadera y puede contener alucinaciones.' },
          { id: 'c', text: 'Porque la IA solo sirve para generar imágenes.' },
          { id: 'd', text: 'Porque la IA no puede leer texto.' },
        ],
        correctOptionId: 'b',
        explanation: 'Los LLMs pueden alucinar citas jurídicas o técnicas con total apariencia de veracidad.',
      },
      {
        id: 21,
        question: 'Dos empresas desarrollan sistemas: una tiene equipo de 4 y requisitos estables; otra tiene 30 personas y requisitos cambiantes. ¿Qué principio del PMBOK® aplica?',
        options: [
          { id: 'a', text: 'Ambas empresas deben utilizar exactamente los mismos procesos.' },
          { id: 'b', text: 'La segunda empresa está obligada a usar Scrum.' },
          { id: 'c', text: 'La gestión debe adaptarse al tamaño, complejidad, incertidumbre y contexto de cada proyecto.' },
          { id: 'd', text: 'El PMBOK® es un manual rígido de cumplimiento legal.' },
        ],
        correctOptionId: 'c',
        explanation: 'El principio de adaptación (tailoring) es la piedra angular del PMBOK® moderno.',
      },
      {
        id: 22,
        question: 'Un proyecto entrega una plataforma digital a tiempo, pero seis meses después los usuarios siguen haciendo los trámites en papel y no bajaron los tiempos. ¿Qué elemento está faltando principalmente?',
        options: [
          { id: 'a', text: 'Un producto.' },
          { id: 'b', text: 'Un entregable.' },
          { id: 'c', text: 'La generación efectiva de valor y adopción de beneficios esperados.' },
          { id: 'd', text: 'Una operación técnica.' },
        ],
        correctOptionId: 'c',
        explanation: 'Tener el producto terminado no equivale a haber creado valor si los usuarios no lo usan.',
      },
      {
        id: 23,
        question: 'Un director pide a una IA analizar 3 alternativas de proveedores. La IA lista ventajas, desventajas y riesgos. ¿Cuál es el uso más apropiado de ese análisis?',
        options: [
          { id: 'a', text: 'Permitir que la IA seleccione y firme el contrato automáticamente.' },
          { id: 'b', text: 'Utilizar el análisis como insumo consultivo y tomar la decisión tras contrastar fuentes y contexto.' },
          { id: 'c', text: 'Elegir automáticamente al proveedor que la IA nombró primero.' },
          { id: 'd', text: 'Ignorar el análisis por completo.' },
        ],
        correctOptionId: 'b',
        explanation: 'La IA asesora y estructura alternativas; el criterio humano evalúa el contexto y decide.',
      },
      {
        id: 24,
        question: 'Un integrante del equipo propone subir contratos con datos personales de clientes y contraseñas a una IA pública para "analizar riesgos". ¿Qué debe hacer el equipo?',
        options: [
          { id: 'a', text: 'Subir todo porque los modelos necesitan contexto completo.' },
          { id: 'b', text: 'Subir únicamente las credenciales de acceso.' },
          { id: 'c', text: 'Verificar políticas de seguridad y prohibir compartir datos sensibles o confidenciales sin autorización.' },
          { id: 'd', text: 'Subir los contratos pero quitar el logo de la empresa.' },
        ],
        correctOptionId: 'c',
        explanation: 'La confidencialidad y protección de datos (Habeas Data, GDPR) es un deber ineludible en proyectos.',
      },
      {
        id: 25,
        question: 'Una empresa desarrolla una solución de IA para atención al cliente con alta incertidumbre de usuarios. ¿Cuál alternativa integra mejor las buenas prácticas aprendidas?',
        options: [
          { id: 'a', text: 'Usar enfoque predictivo rígido, entregar todo al final y aceptar ciegamente las sugerencias de la IA.' },
          { id: 'b', text: 'Usar enfoque ágil iterativo e incremental, medir la respuesta de los usuarios y usar IA con supervisión humana.' },
          { id: 'c', text: 'Considerar el proyecto como una operación rutinaria.' },
          { id: 'd', text: 'Delegar todas las decisiones a la IA y eliminar las pruebas de usuario.' },
        ],
        correctOptionId: 'b',
        explanation: 'Sintetiza la visión completa: agilidad para incertidumbre, medición de valor real y supervisión ética de la IA.',
      },
    ],
  },
}

// ----------------------------------------------------
// ENSAMBLAJE DEL CURSO NIVEL 1
// ----------------------------------------------------
const level1Course = {
  course: {
    title: 'Fundamentos de Gestión de Proyectos e Inteligencia Artificial',
    slug: 'ia-gestion-proyectos',
    description:
      'Nivel 1 de 3 · Comprensión del proyecto tecnológico, PMBOK®, enfoques predictivos, ágiles e híbridos, gobernanza y uso responsable de Inteligencia Artificial Generativa.',
  },
  modules: [
    {
      title: 'Orientación, Diagnóstico y Reto Integrador',
      order: 1,
      level: 1,
      levelTitle: 'Nivel 1: Comprensión del Proyecto Tecnológico',
      blocks: module1Blocks,
    },
    {
      title: 'Proyecto, Valor y Contexto Organizacional',
      order: 2,
      level: 1,
      levelTitle: 'Nivel 1: Comprensión del Proyecto Tecnológico',
      blocks: module2Blocks,
    },
    {
      title: 'Proyectos, Programas, Portafolios y Operaciones',
      order: 3,
      level: 1,
      levelTitle: 'Nivel 1: Comprensión del Proyecto Tecnológico',
      blocks: module3Blocks,
    },
    {
      title: 'Ciclo de Vida, Enfoques de Gestión y Dominios de Desempeño',
      order: 4,
      level: 1,
      levelTitle: 'Nivel 1: Comprensión del Proyecto Tecnológico',
      blocks: module4Blocks,
    },
    {
      title: 'Fundamentos de IA para la Gestión de Proyectos',
      order: 5,
      level: 1,
      levelTitle: 'Nivel 1: Comprensión del Proyecto Tecnológico',
      blocks: [...module5Blocks, finalExamBlock],
    },
  ],
}

async function main() {
  console.log('Validating all block schemas...')
  let totalBlocks = 0
  for (const m of level1Course.modules) {
    for (const b of m.blocks) {
      parseBlockData(b.type, b.blockData)
      totalBlocks++
    }
  }
  console.log(`✓ Validated ${totalBlocks} blocks across ${level1Course.modules.length} modules without errors.`)

  const jsonContent = JSON.stringify(level1Course, null, 2)
  await writeFile(OUTPUT_PATH, jsonContent, 'utf-8')
  console.log(`✓ Successfully generated complete seed file: ${OUTPUT_PATH}`)
}

main().catch((err) => {
  console.error('Error generating seed:', err)
  process.exit(1)
})
