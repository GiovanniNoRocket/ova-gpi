import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { parseBlockData, type BlockType } from '../src/types/content-blocks.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SEED_FILE_PATH = path.join(__dirname, '../content/seeds/ia-gestion-proyectos.json')

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

// =========================================================================
// MÓDULO 13: Diseño, evaluación y mejora de instrucciones (Nivel 4 - Módulo 1)
// =========================================================================
export const module13Blocks: BlockSeed[] = [
  // Pantalla 0: Introducción al Módulo
  {
    type: 'TEXT',
    order: 1,
    blockData: {
      heading: '¡Bienvenido al Módulo 13: Diseño, evaluación y mejora de instrucciones!',
      content: `Módulo 13 (Módulo 1 del Nivel 4). Diseño, evaluación y mejora de instrucciones
Duración estimada: 150–180 minutos | Nivel: Avanzado

Objetivo general:
Desarrollar capacidades para diseñar, estructurar, evaluar y mejorar instrucciones dirigidas a herramientas de inteligencia artificial generativa, utilizando principios de ingeniería de prompts para obtener resultados pertinentes, estructurados y útiles en situaciones relacionadas con proyectos tecnológicos.

Objetivos específicos:
• Comprender los fundamentos de la ingeniería de prompts y sus componentes esenciales.
• Diferenciar instrucciones simples de instrucciones estructuradas y delimitar contexto y propósito.
• Incorporar roles y perspectivas pertinentes; formular tareas y objetivos verificables.
• Establecer restricciones y criterios de calidad objetivos; especificar formatos de salida estructurados.
• Aplicar patrones de prompting (ej. few-shot) y descomponer problemas complejos en tareas manejables.
• Diseñar prompts para operaciones cognitivas: análisis, generación, transformación, síntesis, comparación y evaluación.
• Analizar la calidad de los resultados producidos por la IA y detectar deficiencias o alucinaciones causales.
• Refinar prompts mediante ciclos sucesivos de mejora empírica y comparar versiones con criterios observables.
• Diseñar prompts especializados para proyectos TIC y utilizar la IA como apoyo socrático.
• Documentar evidencias de diseño, evaluación y refinamiento para el portafolio.

Producto del módulo:
Producto 1: Instrucciones diseñadas y validadas
Construirás y documentarás un conjunto de instrucciones aplicadas a proyectos TIC siguiendo el ciclo:
Tarea → Prompt inicial → Resultado → Evaluación → Problemas detectados → Refinamiento → Nuevo resultado → Comparación → Validación
Este producto alimentará tu Portafolio de aplicaciones de IA validadas del Nivel 4.

Mapa del módulo:
Ingeniería de prompts → Estructura y contexto → Diseño de instrucciones → Patrones y descomposición → Aplicación de prompts → Evaluación y refinamiento → Prompts para proyectos TIC → Laboratorio → Microevaluación → ¡Felicidades!`,
    },
  },

  // Pantalla 1: Introducción a la ingeniería de prompts
  {
    type: 'TEXT',
    order: 2,
    blockData: {
      heading: 'Pantalla 1: Introducción a la ingeniería de prompts',
      content: `La ingeniería de prompts consiste en diseñar instrucciones para orientar el comportamiento de un modelo de inteligencia artificial generativa hacia un resultado determinado. No se limita a escribir una pregunta, sino que implica establecer con claridad qué debe realizar el modelo y qué características debe tener la respuesta.

En un proyecto TIC, una petición como "analiza los riesgos del proyecto" deja demasiados elementos abiertos: el modelo no conoce qué proyecto está analizando, qué datos utilizar, qué criterios aplicar ni cómo presentar los riesgos identificados. La ingeniería de prompts convierte esa petición general en una instrucción controlada y verificable.

Ejemplo:
Un equipo necesita revisar los riesgos de una aplicación móvil de turismo:
• Petición inicial: "Identifica los riesgos del proyecto."
• Instrucción mejorada: "Analiza los riesgos de una aplicación móvil de turismo cuya primera versión debe estar disponible en cuatro meses. Clasifica los riesgos por categoría y presenta causa, posible impacto y señal de alerta."
La segunda instrucción delimita la tarea y permite comprobar si la respuesta sirve para la toma de decisiones.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 3,
    blockData: {
      title: 'Actividad: Semáforo de instrucciones',
      instruction: 'Clasifica cada solicitud según su nivel de estructuración y control:',
      categories: ['Instrucción estructurada', 'Parcialmente definida', 'Petición general'],
      items: [
        { id: 'item1', text: '“Analiza los riesgos de seguridad de la aplicación móvil, clasifícalos por tipo de amenaza y señala qué información adicional se necesita para valorar su impacto.”', category: 'Instrucción estructurada' },
        { id: 'item2', text: '“Dime todo lo que puedas sobre los riesgos de este proyecto.”', category: 'Petición general' },
        { id: 'item3', text: '“Identifica cinco riesgos tecnológicos de la aplicación y presenta para cada uno su causa, posible impacto y medida de respuesta.”', category: 'Instrucción estructurada' },
        { id: 'item4', text: '“Revisa los riesgos tecnológicos de la aplicación y explica cuáles podrían afectar el proyecto.”', category: 'Parcialmente definida' },
        { id: 'item5', text: '“Busca problemas en el proyecto y dime qué deberíamos hacer.”', category: 'Petición general' },
      ],
      explanation: 'Una petición general deja elementos críticos a la interpretación del modelo. Una instrucción estructurada delimita la operación, restringe supuestos y define criterios de salida verificables.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 4,
    blockData: {
      title: 'IA Aplicada: Tutor socrático de ingeniería de prompts',
      role: 'Tutor de ingeniería de prompts para proyectos TIC',
      prompt: `Actúa como tutor de ingeniería de prompts. Te proporcionaré una petición que quiero realizar a una IA. No la mejores directamente. Primero pregúntame cuál es el objetivo, qué información tiene disponible la IA, qué resultado espero y cómo sabré si la respuesta es útil. Después de mis respuestas, ayúdame a identificar qué componentes debería incorporar y permite que yo construya una primera versión. Finalmente, revisa mi propuesta mediante preguntas y sugerencias, sin escribir el prompt final por mí.`,
      reflectionQuestions: [
        '¿Qué preguntas te formuló el tutor antes de sugerir componentes?',
        '¿Cómo cambió tu petición inicial tras delimitar el objetivo y los datos disponibles?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 2: Anatomía de una instrucción
  {
    type: 'TEXT',
    order: 5,
    blockData: {
      heading: 'Pantalla 2: Anatomía de una instrucción',
      content: `Una instrucción puede estructurarse mediante diferentes componentes que ayudan al modelo a interpretar correctamente la tarea: contexto, rol, tarea, criterios, restricciones y formato de salida.

No todos los prompts requieren todos los componentes. La finalidad no es agregar texto decorativo, sino incorporar aquellos elementos que reduzcan la ambigüedad y hagan verificable el resultado.

Ejemplo:
Situación: Un gestor solicita a la IA revisar una matriz de riesgos.
• Contexto: Plataforma web de reservas turísticas en fase de pruebas.
• Rol: Especialista en riesgos TIC.
• Tarea: Revisar la matriz registrada.
• Criterio: Consistencia entre probabilidad e impacto sobre cronograma y costo.
• Formato: Tabla estructurada de hallazgos.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 6,
    blockData: {
      title: 'Actividad: Relaciona las piezas de la instrucción',
      instruction: 'Relaciona cada fragmento con el componente estructural correspondiente:',
      categories: ['Contexto', 'Rol', 'Tarea', 'Criterio', 'Formato'],
      items: [
        { id: 'anat_1', text: '“Proyecto de desarrollo de una aplicación móvil para gestionar reservas turísticas”', category: 'Contexto' },
        { id: 'anat_2', text: '“Actúa como especialista en gestión de riesgos de proyectos TIC”', category: 'Rol' },
        { id: 'anat_3', text: '“Analiza los riesgos registrados en la matriz proporcionada”', category: 'Tarea' },
        { id: 'anat_4', text: '“Identifica cuáles presentan mayor posibilidad de afectar el plazo y el presupuesto”', category: 'Criterio' },
        { id: 'anat_5', text: '“Organiza los resultados en una tabla con riesgo, probabilidad, impacto y prioridad”', category: 'Formato' },
      ],
      explanation: 'Cada componente cumple una función diferenciada. Confundir la tarea con el criterio o el formato reduce la precisión del prompt.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 7,
    blockData: {
      title: 'IA Aplicada: Tutor de validación del portafolio',
      role: 'Tutor de validación de evidencias del portafolio',
      prompt: `Actúa como tutor de validación del portafolio. Revisaremos mi evidencia completa. Pregúntame por cada etapa del ciclo y solicita evidencias de mis decisiones. Si falta información, indícame qué debo demostrar mediante preguntas. La validación final debe ser mi justificación; no la redactes por mí.`,
      reflectionQuestions: [
        '¿Qué criterios te exigió el tutor para justificar cada componente del prompt?',
        '¿Por qué es indispensable que la validación final la redacte el estudiante y no el modelo?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 3: Contexto y propósito
  {
    type: 'TEXT',
    order: 8,
    blockData: {
      heading: 'Pantalla 3: Contexto y propósito',
      content: `El contexto proporciona la información necesaria para interpretar la tarea dentro de una situación determinada (características del proyecto, etapa, restricciones técnicas). El propósito establece para qué se necesita el resultado y a qué decisión o audiencia va dirigido.

Sin contexto suficiente, el modelo completará vacíos con supuestos que no corresponden al proyecto. Un análisis para una reunión ejecutiva requiere un nivel de síntesis distinto al de una sesión técnica de depuración de código.`,
    },
  },
  {
    type: 'QUIZ',
    order: 9,
    blockData: {
      question: 'El equipo debe seleccionar una herramienta de colaboración. La coordinadora pide: "Compara las alternativas y recomienda una". Para que la IA realice una comparación pertinente, primero debe definir:',
      options: [
        { id: 'opt_a', text: 'Alternativas específicas, criterios de comparación objetivos y contexto del proyecto.', isCorrect: true, feedback: '¡Correcto! Sin alternativas y criterios contextualizados, el modelo asume variables arbitrarias.' },
        { id: 'opt_b', text: 'Más adjetivos calificativos, una respuesta extensa y opiniones personales.', isCorrect: false, feedback: 'Incorrecto. Añadir texto sin propósito operativo no resuelve la falta de información.' },
        { id: 'opt_c', text: 'Colores de la interfaz, cantidad de páginas y una frase motivacional.', isCorrect: false, feedback: 'Incorrecto. Son elementos estéticos o superfluos sin valor para la toma de decisiones.' },
        { id: 'opt_d', text: 'Únicamente el nombre comercial de la herramienta más popular.', isCorrect: false, feedback: 'Incorrecto. No permite establecer una comparación multilateral sustentada.' },
      ],
      explanation: 'Una comparación válida exige alternativas definidas, criterios explícitos y el contexto de restricciones del proyecto.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 10,
    blockData: {
      title: 'IA Aplicada: Auditor socrático de contexto y supuestos',
      role: 'Auditor de contexto y supuestos',
      prompt: `Actúa como tutor. Te entregaré una instrucción que considero completa. Pregúntame qué información conoce la IA, qué información desconoce, cuál es el propósito y qué supuestos podría realizar. No agregues información por mí. Ayúdame mediante preguntas a determinar qué contexto es realmente necesario y después solicita que yo reconstruya la instrucción.`,
      reflectionQuestions: [
        '¿Qué supuestos no intencionales estaba haciendo el modelo con tu instrucción original?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 4: Rol y perspectiva
  {
    type: 'TEXT',
    order: 11,
    blockData: {
      heading: 'Pantalla 4: Rol y perspectiva',
      content: `Un rol orienta la perspectiva disciplinar desde la cual la IA debe abordar la tarea (gestor de proyectos, analista de seguridad, arquitecto de software). 

El rol no sustituye la información ni los datos de entrada. Decir "actúa como un genio de la informática" no aporta criterios operativos; en cambio, "actúa como gestor de proyectos TIC considerando dependencias, esfuerzo y cronograma" delimita el enfoque de evaluación.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 12,
    blockData: {
      title: 'Actividad: Detective de perspectivas',
      instruction: 'Determina si la asignación de rol en cada prompt es Pertinente u Innecesaria:',
      categories: ['Pertinente', 'Innecesario'],
      items: [
        { id: 'rol_1', text: '“Actúa como gestor de proyectos TIC y analiza las dependencias entre actividades, el esfuerzo estimado y su posible impacto en el cronograma.”', category: 'Pertinente' },
        { id: 'rol_2', text: '“Actúa como experto extraordinario y utiliza toda tu inteligencia para analizar el proyecto.”', category: 'Innecesario' },
        { id: 'rol_3', text: '“Actúa como analista de requisitos de software y clasifica los requisitos proporcionados como funcionales o no funcionales.”', category: 'Pertinente' },
        { id: 'rol_4', text: '“Actúa como una persona extremadamente creativa y resume las siguientes decisiones del proyecto.”', category: 'Innecesario' },
      ],
      explanation: 'Un rol es pertinente cuando aporta un marco disciplinar con criterios concretos para la tarea. Los adjetivos superlativos no añaden valor técnico.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 13,
    blockData: {
      title: 'IA Aplicada: Análisis de pertinencia de rol',
      role: 'Analista de roles y perspectivas',
      prompt: `Analiza conmigo el rol que estoy pensando incorporar en un prompt. Primero pregúntame qué tarea debe realizar la IA y qué perspectiva necesito. Después pregúntame qué decisiones cambiarían si utilizo ese rol. Si el rol no aporta una diferencia real, ayúdame a detectarlo mediante preguntas. No escribas el prompt final.`,
      reflectionQuestions: [
        '¿Cambió el comportamiento del análisis al definir un rol técnico específico?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 5: Tarea y objetivo
  {
    type: 'TEXT',
    order: 14,
    blockData: {
      heading: 'Pantalla 5: Tarea y objetivo',
      content: `La tarea indica qué operación concreta debe realizar la IA (clasificar, comparar, transformar, analizar), mientras que el objetivo explica para qué se busca conseguir esa operación.

Separar la acción del objeto y del propósito evita ambigüedades. "Analiza este cronograma" es incompleto frente a: "Analiza las dependencias del cronograma e identifica secuencias críticas que generen retrasos, con el propósito de preparar la reunión de seguimiento."`,
    },
  },
  {
    type: 'QUIZ',
    order: 15,
    blockData: {
      question: '¿Cuál es el orden secuencial correcto para construir una formulación de tarea completa y verificable?',
      options: [
        { id: 'opt_ord_a', text: 'Acción (verbo operativo) → Objeto (información sobre la que actúa) → Resultado esperado → Propósito (para qué se utilizará).', isCorrect: true, feedback: '¡Correcto! Esta estructura delimita la operación, los datos de entrada, el entregable y su utilidad posterior.' },
        { id: 'opt_ord_b', text: 'Propósito → Resultado → Acción → Objeto.', isCorrect: false, feedback: 'Incorrecto. Empezar por el propósito sin definir la operación crea ambigüedad inicial en el modelo.' },
        { id: 'opt_ord_c', text: 'Resultado → Acción → Propósito → Objeto.', isCorrect: false, feedback: 'Incorrecto. No sigue la progresión lógica de entrada-operación-salida.' },
        { id: 'opt_ord_d', text: 'Objeto → Propósito → Acción → Resultado.', isCorrect: false, feedback: 'Incorrecto.' },
      ],
      explanation: 'Acción → Objeto → Resultado → Propósito permite pasar de una intención vaga a una instrucción delimitada y auditable.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 16,
    blockData: {
      title: 'IA Aplicada: Precisión de verbos operativos',
      role: 'Tutor de precisión sintáctica y operativa de prompts',
      prompt: `Quiero construir un prompt para una tarea de un proyecto. Pregúntame primero cuál es la acción que necesito, después sobre qué información se aplicará, qué resultado necesito y para qué lo utilizaré. Si utilizo un verbo ambiguo, pídeme que lo precise. Después revisa mi propuesta sin reemplazarla.`,
      reflectionQuestions: [
        '¿Qué verbo ambiguo reemplazaste por una acción operativa medible?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 6: Restricciones y criterios
  {
    type: 'TEXT',
    order: 17,
    blockData: {
      heading: 'Pantalla 6: Restricciones y criterios',
      content: `Las restricciones delimitan las condiciones inviolables que la respuesta debe respetar (presupuesto, plazos, tecnologías, exclusiones). Los criterios permiten determinar si el resultado cumple con los estándares de calidad exigidos.

En proyectos TIC, las restricciones evitan que la IA proponga soluciones técnicamente atractivas pero financieramente inviables o contractualmente prohibidas.`,
    },
  },
  {
    type: 'QUIZ',
    order: 18,
    blockData: {
      question: 'Un equipo busca alternativas para reducir la duración de una actividad sin aumentar presupuesto ni añadir personal externo. ¿Cuáles restricciones son pertinentes para el prompt?',
      options: [
        { id: 'restr_a', text: 'No aumentar el presupuesto aprobado, utilizar exclusivamente los recursos disponibles y no modificar actividades con compromiso contractual.', isCorrect: true, feedback: '¡Exacto! Son restricciones reales de viabilidad operativa y contractual del proyecto.' },
        { id: 'restr_b', text: 'Que cada alternativa tenga exactamente 37 palabras y empiece con una frase motivacional.', isCorrect: false, feedback: 'Incorrecto. Son restricciones puramente formales o decorativas sin relación con el valor del proyecto.' },
        { id: 'restr_c', text: 'Permitir cualquier costo adicional siempre que la alternativa sea innovadora.', isCorrect: false, feedback: 'Incorrecto. Viola la condición de no aumentar el presupuesto.' },
        { id: 'restr_d', text: 'Prohibir el uso de software existente en la organización.', isCorrect: false, feedback: 'Incorrecto.' },
      ],
      explanation: 'Las buenas restricciones delimitan el espacio de solución según la realidad del proyecto, sin añadir reglas superfluas.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 19,
    blockData: {
      title: 'IA Aplicada: Criterios observables vs restricciones superfluas',
      role: 'Profesor de diseño y refinamiento de restricciones',
      prompt: `Actúa como profesor de diseño de prompts. Te proporcionaré una tarea y las restricciones que pensé utilizar. Pregúntame qué problema resuelve cada restricción y qué ocurriría si la elimino. Ayúdame a identificar restricciones innecesarias y a formular criterios que puedan comprobarse objetivamente. No construyas la versión final por mí.`,
      reflectionQuestions: [
        '¿Eliminaste alguna restricción que resultaba redundante o que limitaba innecesariamente la solución?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 7: Formato y estructura de salida
  {
    type: 'TEXT',
    order: 20,
    blockData: {
      heading: 'Pantalla 7: Formato y estructura de salida',
      content: `Definir el formato de salida indica cómo debe estructurarse la respuesta: tablas, listas ordenadas, matrices, esquemas JSON, fichas estandarizadas.

El formato debe responder al uso posterior: si el resultado se integrará en una matriz de riesgos, pedir una tabla comparativa con columnas explícitas ahorra reprocesos y facilita auditorías de completitud.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 21,
    blockData: {
      title: 'Actividad: Relaciona necesidad y formato de salida',
      instruction: 'Asigna a cada necesidad de gestión el formato de salida más adecuado:',
      categories: ['Tabla comparativa', 'Lista numerada', 'Matriz', 'Estructura de campos'],
      items: [
        { id: 'fmt_1', text: 'Comparar cinco herramientas tecnológicas según costo, soporte e integración.', category: 'Tabla comparativa' },
        { id: 'fmt_2', text: 'Presentar una secuencia paso a paso de actividades de despliegue.', category: 'Lista numerada' },
        { id: 'fmt_3', text: 'Cruzar y clasificar riesgos combinando probabilidad e impacto.', category: 'Matriz' },
        { id: 'fmt_4', text: 'Entregar especificaciones estructuradas (ID, tipo, prioridad) para ingesta automática.', category: 'Estructura de campos' },
      ],
      explanation: 'El formato no se elige por gusto estético, sino para acelerar la toma de decisiones y la reutilización de datos.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 22,
    blockData: {
      title: 'IA Aplicada: Selección de formato según ciclo de vida',
      role: 'Tutor de especificación de salidas estructuradas',
      prompt: `Ayúdame a seleccionar el formato de salida de un prompt. Pregúntame primero cómo voy a utilizar la respuesta y qué información necesito comparar, ordenar o reutilizar. Propón dos o tres posibilidades de formato, pero no selecciones por mí. Después pídeme justificar mi elección y verifica si el formato permite evaluar fácilmente el resultado.`,
      reflectionQuestions: [
        '¿Cómo facilitó el formato elegido la verificación de campos faltantes?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 8: Prompts simples y estructurados
  {
    type: 'TEXT',
    order: 23,
    blockData: {
      heading: 'Pantalla 8: Prompts simples vs estructurados',
      content: `Un prompt simple contiene una instrucción directa y es suficiente para operaciones de baja complejidad. Un prompt estructurado desglosa contexto, tarea, criterios y salida cuando intervienen múltiples variables.

Regla de diseño:
La complejidad del prompt debe corresponder a la complejidad de la tarea. Sobrediseñar un prompt para traducir una frase añade fricción inútil; subdiseñar un prompt para conciliar desviaciones de alcance y costos genera respuestas ambiguas.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 24,
    blockData: {
      title: 'Actividad: Simple o estructurado',
      instruction: 'Clasifica cada caso según el nivel de estructuración requerido en el prompt:',
      categories: ['Simple', 'Estructurado'],
      items: [
        { id: 's_e_1', text: 'Traducir una frase breve de interfaz de usuario del inglés al español.', category: 'Simple' },
        { id: 's_e_2', text: 'Analizar desviaciones de cronograma, costo y alcance en un proyecto con 3 proveedores.', category: 'Estructurado' },
        { id: 's_e_3', text: 'Definir el significado técnico de un término de telecomunicaciones.', category: 'Simple' },
        { id: 's_e_4', text: 'Comparar tres alternativas tecnológicas usando cinco criterios y salida tabular para la junta directiva.', category: 'Estructurado' },
      ],
      explanation: 'Aplica prompts simples a tareas directas sin dependencias; usa prompts estructurados cuando existan variables cruzadas y criterios de aceptación formales.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 25,
    blockData: {
      title: 'IA Aplicada: Balance de esfuerzo y control en prompts',
      role: 'Evaluador de balance de complejidad en prompts',
      prompt: `Te proporcionaré una tarea. Pregúntame primero cuántas variables intervienen y qué nivel de control necesito sobre la salida. Después pídeme decidir si utilizaría un prompt simple o estructurado. Si eliges una opción diferente de la mía, no me des la respuesta inmediatamente: formula preguntas que me permitan descubrir la diferencia.`,
      reflectionQuestions: [
        '¿En qué situación justificaste la necesidad de una estructura por secciones?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 9: Patrones de prompting
  {
    type: 'TEXT',
    order: 26,
    blockData: {
      heading: 'Pantalla 9: Patrones de prompting y few-shot',
      content: `Los patrones de prompting son esquemas recurrentes de diseño instruccional (ej. role prompting, few-shot prompting, chain-of-thought, templates de extracción).

Few-shot prompting:
Consiste en proporcionar ejemplos representativos de pares entrada-salida para que el modelo replique el criterio de clasificación, tono o formato exacto sin necesidad de largas explicaciones teóricas.`,
    },
  },
  {
    type: 'QUIZ',
    order: 27,
    blockData: {
      question: 'Un equipo incluye 3 ejemplos de tickets clasificados previamente (Caso 1 → Alta, Caso 2 → Media, Caso 3 → Baja) antes de pedir la clasificación de nuevos casos. ¿Qué patrón se está utilizando?',
      options: [
        { id: 'pat_a', text: 'Prompt basado en ejemplos (Few-shot prompting).', isCorrect: true, feedback: '¡Correcto! Proporcionar ejemplos representativos entrena en contexto al modelo sobre los criterios aplicables.' },
        { id: 'pat_b', text: 'Transformación de formato.', isCorrect: false, feedback: 'Incorrecto. No se está convirtiendo un documento de un formato a otro.' },
        { id: 'pat_c', text: 'Resumen ejecutivo.', isCorrect: false, feedback: 'Incorrecto.' },
        { id: 'pat_d', text: 'Comparación multilateral.', isCorrect: false, feedback: 'Incorrecto.' },
      ],
      explanation: 'Few-shot prompting utiliza ejemplos concretos para guiar la inferencia y el formato de salida esperado.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 28,
    blockData: {
      title: 'IA Aplicada: Explorador de patrones para proyectos TIC',
      role: 'Consultor de patrones de prompting para gestión tecnológica',
      prompt: `Presenta una tarea relacionada con proyectos TIC y pregúntame qué patrón de prompting podría utilizar. Permíteme justificar la elección. Si considero un patrón poco adecuado, formula preguntas sobre su propósito, ventajas y limitaciones antes de mostrarme una alternativa.`,
      reflectionQuestions: [
        '¿Por qué los ejemplos inconsistentes o ambiguos en un few-shot dañan el resultado?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 10: Descomposición de problemas complejos
  {
    type: 'TEXT',
    order: 29,
    blockData: {
      heading: 'Pantalla 10: Descomposición de problemas complejos',
      content: `La descomposición consiste en fragmentar un problema amplio en operaciones secuenciales manejables (diagnóstico → análisis causal → alternativas → evaluación). 

Pedir "analiza el proyecto y resuélvelo todo" mezcla diagnóstico con decisión y suele producir alucinaciones. Separar en etapas permite controlar y auditar la evidencia antes de pasar a la siguiente fase.`,
    },
  },
  {
    type: 'QUIZ',
    order: 30,
    blockData: {
      question: 'Frente a un retraso crítico en una entrega, ¿cuál es el orden metodológico para descomponer la instrucción a la IA?',
      options: [
        { id: 'desc_a', text: 'Recopilar información disponible → Comprobar información faltante → Identificar el problema → Proponer alternativas → Evaluar alternativas.', isCorrect: true, feedback: '¡Correcto! Se parte de los datos reales antes de formular interpretaciones o soluciones.' },
        { id: 'desc_b', text: 'Proponer alternativas → Evaluar alternativas → Recopilar información → Identificar el problema.', isCorrect: false, feedback: 'Incorrecto. Proponer soluciones antes de verificar los hechos conduce a soluciones inadecuadas.' },
        { id: 'desc_c', text: 'Identificar el problema → Evaluar alternativas → Recopilar información → Proponer alternativas.', isCorrect: false, feedback: 'Incorrecto.' },
        { id: 'desc_d', text: 'Evaluar alternativas → Proponer alternativas → Comprobar información faltante.', isCorrect: false, feedback: 'Incorrecto.' },
      ],
      explanation: 'Una descomposición rigurosa parte de los datos observables y vacíos de información antes de diagnosticar y proponer soluciones.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 31,
    blockData: {
      title: 'IA Aplicada: Encadenamiento de tareas intermedias',
      role: 'Tutor de descomposición funcional y encadenamiento de prompts',
      prompt: `Te presentaré una tarea compleja. No la dividas automáticamente. Primero pregúntame qué resultado final necesito y qué decisiones intermedias debo tomar. Después ayúdame a determinar qué tareas dependen de otras. Revisa mi secuencia y formula preguntas para detectar pasos faltantes o innecesarios.`,
      reflectionQuestions: [
        '¿Qué paso intermedio descubriste que era indispensable antes de proponer soluciones?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 11: Prompts para análisis
  {
    type: 'TEXT',
    order: 32,
    blockData: {
      heading: 'Pantalla 11: Prompts para análisis de datos',
      content: `Los prompts de análisis instruyen a la IA para examinar datos existentes y extraer patrones, inconsistencias o categorías sin inventar información no suministrada.

Hecho observable vs Inferencia causal:
• Hecho sustentado: Lo que los datos demuestran de forma directa.
• Hipótesis o aspecto por verificar: Una relación posible que requiere investigación adicional.
• Atribución causal sin evidencia: Afirmar que A causó B sin datos que demuestren el mecanismo causal.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 33,
    blockData: {
      title: 'Actividad: Hecho, hipótesis o causalidad en datos de incidencias',
      instruction: 'A partir de datos de 3 periodos (Periodo 1: 8 inc, 90h; Periodo 2: 11 inc, 82h; Periodo 3: 15 inc, 75h), clasifica cada afirmación:',
      categories: ['Sustentada por datos', 'Requiere verificación', 'Conclusión prudente'],
      items: [
        { id: 'an_1', text: '“La cantidad de incidencias aumentó durante los tres períodos.”', category: 'Sustentada por datos' },
        { id: 'an_2', text: '“La reducción de la capacidad disponible causó el aumento de incidencias.”', category: 'Requiere verificación' },
        { id: 'an_3', text: '“La capacidad disponible del equipo disminuyó durante los tres períodos.”', category: 'Sustentada por datos' },
        { id: 'an_4', text: '“La disminución de la capacidad y el aumento de incidencias presentan un comportamiento simultáneo que debería investigarse.”', category: 'Conclusión prudente' },
      ],
      explanation: 'Nunca conviertas correlaciones temporales en causas demostradas sin evidencia empírica verificable.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 34,
    blockData: {
      title: 'IA Aplicada: Detección de alucinación causal en análisis',
      role: 'Auditor de análisis de datos para proyectos',
      prompt: `Actúa como tutor de análisis de información de proyectos. Te proporcionaré datos y mi interpretación. Pregúntame qué afirmaciones están directamente respaldadas, cuáles requieren verificación y cuáles representan inferencias. No corrijas inmediatamente mis conclusiones; ayúdame a justificar cada una con evidencia disponible.`,
      reflectionQuestions: [
        '¿Cómo obligaste al modelo a citar la evidencia textual o numérica para cada afirmación?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 12: Prompts para generación
  {
    type: 'TEXT',
    order: 35,
    blockData: {
      heading: 'Pantalla 12: Prompts para generación de alternativas',
      content: `Los prompts de generación solicitan a la IA producir alternativas, borradores o escenarios dentro de un espacio delimitado de restricciones.

Regla clave:
Generar no es aceptar acríticamente. El prompt debe fijar cantidad, condiciones de viabilidad y restricciones explícitas para evitar opciones inviables.`,
    },
  },
  {
    type: 'QUIZ',
    order: 36,
    blockData: {
      question: 'Se necesita reducir el tiempo de capacitación sin eliminar temas obligatorios ni contratar servicios externos y usando recursos digitales existentes. ¿Cuál prompt está mejor formulado?',
      options: [
        { id: 'gen_a', text: '“Dame algunas ideas para mejorar la capacitación de los usuarios de la nueva plataforma.”', isCorrect: false, feedback: 'Demasiado vago e impreciso.' },
        { id: 'gen_b', text: '“Genera alternativas innovadoras para hacer más rápida la capacitación de los usuarios.”', isCorrect: false, feedback: 'No incluye restricciones de presupuesto ni recursos.' },
        { id: 'gen_c', text: '“Genera cuatro alternativas para reducir el tiempo de capacitación de los usuarios de la nueva plataforma. Mantén todos los contenidos obligatorios, no propongas contratación de nuevos servicios y utiliza únicamente los recursos digitales disponibles en la organización.”', isCorrect: true, feedback: '¡Excelente! Delimita cantidad, objetivo específico y todas las restricciones inviolables.' },
        { id: 'gen_d', text: '“Propón la mejor estrategia para reducir la capacitación y explica cómo implementarla.”', isCorrect: false, feedback: 'Delega la toma de decisiones unilateralmente en el modelo.' },
      ],
      explanation: 'Una instrucción de generación rigurosa acota el espacio de búsqueda con restricciones reales de viabilidad.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 37,
    blockData: {
      title: 'IA Aplicada: Generación de alternativas delimitadas',
      role: 'Tutor de generación controlada de soluciones',
      prompt: `Ayúdame a diseñar un prompt para generar alternativas. Pregúntame qué problema quiero explorar, cuántas alternativas necesito, qué condiciones deben cumplir y cómo evaluaré las propuestas. Después revisa mi instrucción mediante preguntas. No generes las alternativas por mí.`,
      reflectionQuestions: [
        '¿Cómo cambió la calidad de las propuestas al fijar 3 restricciones inviolables?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 13: Prompts para transformación y síntesis
  {
    type: 'TEXT',
    order: 38,
    blockData: {
      heading: 'Pantalla 13: Prompts para transformación y síntesis',
      content: `La transformación adapta el formato o lenguaje de una información existente para una audiencia particular sin alterar el contenido esencial. La síntesis integra múltiples fuentes dispersas en un resumen estructurado.

Distinción:
Transformar no es embellecer texto: al traducir una especificación técnica para usuarios finales se debe conservar la regla funcional eliminando jerga de arquitectura interna.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 39,
    blockData: {
      title: 'Actividad: Conserva, transforma o reduce',
      instruction: 'Al adaptar una lista técnica de requisitos para una sesión de validación con usuarios finales, clasifica qué hacer con cada elemento:',
      categories: ['Conservar', 'Transformar', 'Reducir / Eliminar'],
      items: [
        { id: 'tr_1', text: 'Requisito funcional que describe la operación del usuario en la pantalla.', category: 'Conservar' },
        { id: 'tr_2', text: 'Descripción técnica compleja del patrón de microservicios y socket de red.', category: 'Reducir / Eliminar' },
        { id: 'tr_3', text: 'Criterio de aceptación observable que el usuario debe validar.', category: 'Conservar' },
        { id: 'tr_4', text: 'Términos técnicos del protocolo de autenticación que los usuarios no comprenden.', category: 'Transformar' },
        { id: 'tr_5', text: 'Información de negocio indispensable para validar la funcionalidad.', category: 'Conservar' },
      ],
      explanation: 'La adaptación preserva el significado funcional y los criterios de aceptación, reformula términos oscuros y suprime detalles internos de implementación.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 40,
    blockData: {
      title: 'IA Aplicada: Transformación para audiencias ejecutivas',
      role: 'Especialista en comunicación y síntesis técnica',
      prompt: `Te proporcionaré un contenido y explicaré para quién necesito transformarlo. Pregúntame qué información debe conservarse, qué puede eliminarse y qué debe cambiar. Después pídeme diseñar el prompt de transformación y revisa si mantiene el propósito original.`,
      reflectionQuestions: [
        '¿Qué criterios de negocio lograste conservar sin sobrecargar al usuario con jerga técnica?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 14: Prompts para comparación y evaluación
  {
    type: 'TEXT',
    order: 41,
    blockData: {
      heading: 'Pantalla 14: Prompts para comparación y evaluación',
      content: `Los prompts de comparación contrastan alternativas bajo una base de análisis común y homogénea. Los prompts de evaluación miden el grado de cumplimiento de un objeto frente a criterios observables.

Criterios homogéneos:
Comparar una herramienta por costo y otra por interfaz invalida metodológicamente el análisis. Las dimensiones deben evaluarse en todas las alternativas por igual.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 42,
    blockData: {
      title: 'Actividad: Construye la matriz de comparación',
      instruction: 'Determina si cada criterio es Pertinente y objetivo o Subjetivo e inadecuado para comparar 3 herramientas de gestión TIC:',
      categories: ['Criterio pertinente y objetivo', 'Subjetivo e inadecuado'],
      items: [
        { id: 'mat_1', text: 'Costo total de implementación, licencias y mantenimiento anual.', category: 'Criterio pertinente y objetivo' },
        { id: 'mat_2', text: 'Facilidad de adopción y curva de aprendizaje del equipo.', category: 'Criterio pertinente y objetivo' },
        { id: 'mat_3', text: 'Preferencia personal o simpatía del director del proyecto.', category: 'Subjetivo e inadecuado' },
        { id: 'mat_4', text: 'Capacidad de integración con los sistemas y bases de datos actuales.', category: 'Criterio pertinente y objetivo' },
        { id: 'mat_5', text: 'Color predominante de la interfaz gráfica y logotipo.', category: 'Subjetivo e inadecuado' },
        { id: 'mat_6', text: 'Escalabilidad técnica según el crecimiento estimado de usuarios.', category: 'Criterio pertinente y objetivo' },
      ],
      explanation: 'Una matriz objetiva descarta sesgos personales y aspectos superficiales, priorizando costos, compatibilidad, soporte y escalabilidad.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 43,
    blockData: {
      title: 'IA Aplicada: Matriz de evaluación con indicadores observables',
      role: 'Tutor de evaluación multicriterio para proyectos TIC',
      prompt: `Ayúdame a diseñar criterios para evaluar una respuesta generada por IA. Pregúntame primero qué resultado necesito y qué características demostrarían que cumple. Después pídeme construir una matriz de criterios con indicadores observables. Revisa mi matriz mediante preguntas y no selecciones los criterios por mí.`,
      reflectionQuestions: [
        '¿Cómo convertiste un criterio vago como "calidad" en indicadores verificables?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 15: Iteración de instrucciones
  {
    type: 'TEXT',
    order: 44,
    blockData: {
      heading: 'Pantalla 15: Iteración de instrucciones',
      content: `La iteración es el proceso deliberado de modificar componentes de un prompt tras auditar las deficiencias de la respuesta inicial. El primer prompt es una hipótesis de trabajo sujeta a prueba empírica.`,
    },
  },
  {
    type: 'QUIZ',
    order: 45,
    blockData: {
      question: 'La primera respuesta para redactar criterios de aceptación produjo declaraciones vagas no verificables en pruebas de software. ¿Qué cambios deben incorporarse en la siguiente iteración?',
      options: [
        { id: 'it_a', text: 'Indicar la funcionalidad específica, exigir criterios observables/cuantificables y pedir que cada criterio pueda comprobarse mediante un caso de prueba.', isCorrect: true, feedback: '¡Correcto! Esos cambios atacan directamente la falta de verificabilidad.' },
        { id: 'it_b', text: 'Pedir que la respuesta sea tres veces más larga y use metáforas técnicas.', isCorrect: false, feedback: 'Incorrecto. Añade ruido sin mejorar la verificación.' },
        { id: 'it_c', text: 'Añadir información de otros proyectos que no tienen relación con la funcionalidad.', isCorrect: false, feedback: 'Incorrecto. Contamina el contexto.' },
        { id: 'it_d', text: 'Solicitar más criterios sin establecer condiciones ni pruebas.', isCorrect: false, feedback: 'Incorrecto.' },
      ],
      explanation: 'Una iteración eficaz modifica únicamente los elementos vinculados a las deficiencias observadas.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 46,
    blockData: {
      title: 'IA Aplicada: Formulación de hipótesis de refinamiento',
      role: 'Consultor de iteración y optimización de prompts',
      prompt: `Te proporcionaré un prompt y el resultado obtenido. Pregúntame primero qué problema específico observé. Después ayúdame a formular hipótesis sobre qué componente del prompt puede estar causando el problema. Pídeme modificar solo los elementos que considere necesarios y comparar posteriormente las versiones.`,
      reflectionQuestions: [
        '¿Cuál fue la hipótesis causal que explicó el fallo del prompt original?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 16: Evaluación de resultados generados
  {
    type: 'TEXT',
    order: 47,
    blockData: {
      heading: 'Pantalla 16: Evaluación y auditoría de resultados',
      content: `Evaluar un resultado implica auditar su correspondencia con los datos, la precisión conceptual, el respeto a las restricciones y la completitud del formato. La elocuencia del lenguaje no es evidencia de veracidad técnica.`,
    },
  },
  {
    type: 'QUIZ',
    order: 48,
    blockData: {
      question: 'El prompt pedía un objetivo claro, medible y orientado a reducir tiempos de atención. La IA propuso: "Mejorar la experiencia de los usuarios mediante una plataforma de atención moderna." ¿Qué falla en la auditoría?',
      options: [
        { id: 'aud_a', text: 'No menciona a los usuarios del proyecto.', isCorrect: false, feedback: 'Sí los menciona.' },
        { id: 'aud_b', text: 'No es medible ni cuantifica una reducción concreta del tiempo de atención.', isCorrect: true, feedback: '¡Exacto! Es una aspiración genérica que no cumple la restricción de medición establecida.' },
        { id: 'aud_c', text: 'Contiene demasiados indicadores matemáticos.', isCorrect: false, feedback: 'No contiene ningún indicador.' },
        { id: 'aud_d', text: 'Propone una plataforma de software.', isCorrect: false, feedback: 'Ese no es el defecto.' },
      ],
      explanation: 'La auditoría detecta de inmediato el incumplimiento de criterios clave como verificabilidad y métricas de impacto.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 49,
    blockData: {
      title: 'IA Aplicada: Matriz de auditoría de cumplimiento',
      role: 'Auditor riguroso de resultados generados por IA',
      prompt: `Actúa como profesor y evaluador de resultados generados. Te proporcionaré el prompt, la respuesta y mis criterios. Pregúntame primero qué evidencia demuestra cumplimiento. Después ayúdame a clasificar cada criterio como cumplido, parcialmente cumplido o no cumplido. Si mi evaluación no está sustentada, solicítame justificar.`,
      reflectionQuestions: [
        '¿Qué afirmaciones en apariencia convincentes carecían de respaldo?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 17: Detección de respuestas deficientes
  {
    type: 'TEXT',
    order: 50,
    blockData: {
      heading: 'Pantalla 17: Detección de respuestas deficientes y alucinaciones',
      content: `Una respuesta deficiente puede contener inferencias no sustentadas, supuestos no solicitados o contradicciones directas con los datos suministrados.`,
    },
  },
  {
    type: 'QUIZ',
    order: 51,
    blockData: {
      question: 'Ante 18 incidencias (7 críticas) y un retraso de 2 días, la IA responde: "Las 18 incidencias provocaron el retraso y causarán al menos 5 días más de atraso. Debe contratarse más personal ya." ¿Cuál es el problema?',
      options: [
        { id: 'caz_a', text: 'La IA usó demasiados datos en su análisis.', isCorrect: false, feedback: 'Incorrecto.' },
        { id: 'caz_b', text: 'La IA convirtió correlaciones en conclusiones causales y predicciones sin evidencia suficiente en los registros.', isCorrect: true, feedback: '¡Correcto! Atribuye causalidad y profetiza retrasos futuros sin datos que lo respalden.' },
        { id: 'caz_c', text: 'No identificó que existían 18 incidencias abiertas.', isCorrect: false, feedback: 'Sí las identificó.' },
        { id: 'caz_d', text: 'No propuso suficientes acciones de respuesta.', isCorrect: false, feedback: 'Incorrecto.' },
      ],
      explanation: 'Una respuesta defectuosa mezcla hechos con extrapolaciones no demostrables y toma decisiones no autorizadas.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 52,
    blockData: {
      title: 'IA Aplicada: Separación estricta de hechos y conjeturas',
      role: 'Auditor de evidencia y trazabilidad factual',
      prompt: `Te proporcionaré una respuesta generada por IA. No la corrijas directamente. Pregúntame qué afirmaciones puedo comprobar con la información disponible y cuáles representan inferencias. Después solicita que justifique cada posible problema. Si encuentro un error, pregúntame qué modificación del prompt podría reducir su aparición.`,
      reflectionQuestions: [
        '¿Cómo impidió la instrucción que la IA emitiera recomendaciones de contratación sin datos financieros?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 18: Refinamiento del prompt
  {
    type: 'TEXT',
    order: 53,
    blockData: {
      heading: 'Pantalla 18: Refinamiento quirúrgico del prompt',
      content: `Refinar un prompt es intervenir específicamente el componente que causó la deficiencia (alcance, categorías, formato, restricciones de inferencia), manteniendo la trazabilidad del cambio.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 54,
    blockData: {
      title: 'Actividad: Empareja problema y refinamiento',
      instruction: 'Relaciona cada problema detectado en la respuesta con la acción de refinamiento correspondiente:',
      categories: [
        'A. Definir categorías y criterios de separación',
        'B. Establecer estructura y plantilla de salida',
        'C. Precisar alcance y resultado esperado',
        'D. Incorporar restricción presupuestaria explícita',
      ],
      items: [
        { id: 'ref_1', text: 'Respuestas demasiado generales que no se concentran en el resultado específico del proyecto.', category: 'C. Precisar alcance y resultado esperado' },
        { id: 'ref_2', text: 'Se mezclan requisitos funcionales, de seguridad y de rendimiento en una sola lista desordenada.', category: 'A. Definir categorías y criterios de separación' },
        { id: 'ref_3', text: 'La información es pertinente pero se presenta en párrafos densos imposibles de tabular.', category: 'B. Establecer estructura y plantilla de salida' },
        { id: 'ref_4', text: 'La IA propone soluciones viables técnicamente pero que superan el presupuesto asignado.', category: 'D. Incorporar restricción presupuestaria explícita' },
      ],
      explanation: 'El refinamiento debe atacar la raíz del problema: alcance, categorías, formato o restricciones.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 55,
    blockData: {
      title: 'IA Aplicada: Refinamiento quirúrgico sin sobrecarga',
      role: 'Tutor de refinamiento estructurado de prompts',
      prompt: `Trabajaremos con un prompt que produjo un resultado deficiente. Pregúntame primero cuál es la deficiencia exacta y qué componente del prompt podría estar relacionado. Después solicita que proponga una modificación. Evalúa mi propuesta mediante preguntas y ayúdame a comprobar si realmente responde al problema sin introducir restricciones innecesarias.`,
      reflectionQuestions: [
        '¿Qué componente modificaste y cómo evitaste añadir complejidad innecesaria?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 19: Comparación entre versiones
  {
    type: 'TEXT',
    order: 56,
    blockData: {
      heading: 'Pantalla 19: Comparación sistemática entre versiones',
      content: `Comparar versiones requiere mantener criterios estables (pertinencia, extensión, estructura, completitud) y contrastar evidencias. Una respuesta más corta no siempre es mejor si sacrificó información esencial.`,
    },
  },
  {
    type: 'QUIZ',
    order: 57,
    blockData: {
      question: 'La Versión 1 produjo criterios de aceptación claros pero muy largos. La Versión 2 los hizo breves, pero varios perdieron datos necesarios para escribir las pruebas de software. ¿Cuál es la conclusión correcta?',
      options: [
        { id: 'comp_a', text: 'La Versión 2 es mejor porque siempre se prefiere una salida más concisa.', isCorrect: false, feedback: 'Incorrecto. La concisión no debe sacrificar la verificabilidad.' },
        { id: 'comp_b', text: 'La Versión 1 es mejor porque contiene más palabras.', isCorrect: false, feedback: 'Incorrecto.' },
        { id: 'comp_c', text: 'La Versión 2 resolvió la extensión, pero debe ajustarse para recuperar la información necesaria para las pruebas.', isCorrect: true, feedback: '¡Exacto! El refinamiento resolvió una dimensión pero afectó otra; requiere calibración.' },
        { id: 'comp_d', text: 'No es necesario comparar si ambas versiones hablan de criterios.', isCorrect: false, feedback: 'Incorrecto.' },
      ],
      explanation: 'La comparación evalúa el balance global de criterios para decidir si se aprueba la versión o se realiza otra iteración.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 58,
    blockData: {
      title: 'IA Aplicada: Comparación de versiones con matriz objetiva',
      role: 'Auditor comparativo de iteraciones de prompts',
      prompt: `Te proporcionaré dos versiones de un prompt y sus resultados. Pregúntame qué cambió entre ambas versiones y qué problema pretendía solucionar el cambio. Después pídeme evaluar cada versión con los mismos criterios. No determines cuál es mejor por mí; ayúdame a justificar mi conclusión mediante evidencia.`,
      reflectionQuestions: [
        '¿Qué evidencia concreta demostró que la Versión 2 superó a la Versión 1?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 20: Prompts especializados para proyectos TIC
  {
    type: 'TEXT',
    order: 59,
    blockData: {
      heading: 'Pantalla 20: Prompts especializados para proyectos TIC (Tailoring)',
      content: `Concepto y Principio de Adaptación (PMBOK®):
Un prompt especializado para proyectos TIC incorpora elementos propios del dominio (requisitos funcionales vs no funcionales, rutas críticas, matriz de riesgos, pruebas de integración).

Tailoring:
El PMBOK® Guide enfatiza que las prácticas y herramientas deben adaptarse al contexto específico del proyecto. Especializar no es saturar de tecnicismos, sino formular la tarea respetando el ciclo de vida y los criterios del proyecto.`,
    },
  },
  {
    type: 'QUIZ',
    order: 60,
    blockData: {
      question: 'Para revisar requisitos de una app turística sin que la IA invente datos inexistentes, ¿cuál prompt está mejor especializado?',
      options: [
        { id: 'esp_a', text: '“Revisa los requisitos y dime si están bien.”', isCorrect: false, feedback: 'Genérico y subjetivo.' },
        { id: 'esp_b', text: '“Analiza los requisitos proporcionados de la aplicación móvil de turismo, clasifica cada uno como funcional o no funcional, identifica ambigüedades y señala la información faltante. No agregues requisitos que no estén en la información proporcionada.”', isCorrect: true, feedback: '¡Perfecto! Delimita dominio, operaciones de clasificación y auditoría, y prohíbe invenciones.' },
        { id: 'esp_c', text: '“Analiza completamente la aplicación y propón todos los cambios que consideres necesarios.”', isCorrect: false, feedback: 'Sin límites ni criterios.' },
        { id: 'esp_d', text: '“Revisa requisitos, riesgos, costos, cronograma, interesados y calidad del proyecto a la vez.”', isCorrect: false, feedback: 'Mezcla dimensiones dispares sin foco operativo.' },
      ],
      explanation: 'La especialización define la tarea técnica, las categorías analíticas y la restricción de confinamiento a los datos proporcionados.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 61,
    blockData: {
      title: 'IA Aplicada: Especialización de prompts según dominio TIC',
      role: 'Tutor de ingeniería de prompts aplicada a proyectos TIC',
      prompt: `Actúa como tutor de ingeniería de prompts aplicada a proyectos TIC. Te proporcionaré una necesidad concreta de mi proyecto. Pregúntame en qué etapa estoy, qué información tengo, qué decisión o actividad quiero apoyar y qué resultado sería útil. Después ayúdame a seleccionar los componentes del prompt y solicítame construirlo. Evalúa mi propuesta sin escribirla por mí.`,
      reflectionQuestions: [
        '¿Cómo conectaste el prompt con un entregable concreto del PMBOK?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 21: Laboratorio de construcción de instrucciones
  {
    type: 'TEXT',
    order: 62,
    blockData: {
      heading: 'Pantalla 21: Laboratorio de construcción de instrucciones',
      content: `Reto Práctico del Módulo:
Integrarás los principios aprendidos para diseñar, probar, evaluar y refinar un prompt especializado en una de las siguientes situaciones:
• Situación A (Análisis de riesgos): Analizar riesgos e identificar cuáles requieren mayor atención.
• Situación B (Revisión de requisitos): Detectar ambigüedades, omisiones y separar funcionales de no funcionales.
• Situación C (Generación de alternativas): Proponer alternativas para resolver un cuello de botella con restricciones de tiempo y presupuesto.
• Situación D (Transformación de información): Traducir especificaciones técnicas complejas a lenguaje claro para usuarios de negocio.

Sigue el ciclo de 5 pasos en tu Bitácora:
Paso 1: Define la tarea → Paso 2: Construye Versión 1 → Paso 3: Ejecuta y audita → Paso 4: Refina a Versión 2 → Paso 5: Justifica la mejora.`,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 63,
    blockData: {
      stepNumber: 21,
      title: 'Documento de diseño, prueba y refinamiento del prompt especializado',
      instruction: 'Completa los 5 pasos del ciclo metodológico para documentar tu instrucción especializada para proyectos TIC:',
      fields: [
        { key: 'lab13_situacion', label: '1. Situación seleccionada (A, B, C o D) y problema específico:', fieldType: 'textarea', maxWords: 80 },
        { key: 'lab13_objetivo_datos', label: '2. Objetivo del prompt e información de entrada suministrada a la IA:', fieldType: 'textarea', maxWords: 100 },
        { key: 'lab13_prompt_v1', label: '3. Mi prompt – Versión 1 (Contexto, tarea, criterios, restricciones, formato):', fieldType: 'textarea', maxWords: 150 },
        { key: 'lab13_auditoria_v1', label: '4. Auditoría de la respuesta V1 y problema principal detectado:', fieldType: 'textarea', maxWords: 120 },
        { key: 'lab13_prompt_v2', label: '5. Mi prompt – Versión 2 refinado (Cambio quirúrgico aplicado):', fieldType: 'textarea', maxWords: 150 },
        { key: 'lab13_justificacion_mejora', label: '6. Justificación de la mejora (Comparación de resultados V1 vs V2):', fieldType: 'textarea', maxWords: 120 },
      ],
      advice: 'Demuestra cómo el cambio específico en el prompt corrigió la deficiencia sin incorporar restricciones redundantes.',
      pointsAwarded: 50,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 64,
    blockData: {
      title: 'IA Aplicada: Acompañamiento en el laboratorio de prompts',
      role: 'Profesor evaluador de laboratorio de prompting',
      prompt: `Actúa como profesor durante mi laboratorio de ingeniería de prompts. No construyas el prompt por mí. Primero pregúntame cuál es la tarea, el contexto, el resultado esperado y los criterios de éxito. Después pídeme redactar una versión inicial. Analiza conmigo el resultado mediante preguntas, ayúdame a localizar deficiencias, solicita que proponga cambios y acompáñame en una segunda iteración. Al final, verifica conmigo si puedo justificar cada modificación realizada.`,
      reflectionQuestions: [
        '¿Cuál fue la justificación cuantitativa o cualitativa de la mejora de tu prompt V2?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 22: Microevaluación Módulo 13 (10 preguntas)
  {
    type: 'EXAM',
    order: 65,
    blockData: {
      title: 'Pantalla 22: Microevaluación — Diseño, evaluación y mejora de instrucciones',
      description: '10 preguntas contextualizadas de opción múltiple sobre ingeniería de prompts para proyectos TIC. Mínimo aprobatorio: 70%.',
      questionsCount: 10,
      pointsPerQuestion: 10,
      passingScore: 70,
      pointsAwarded: 100,
      questions: [
        {
          id: 1,
          question: 'Un líder utiliza IA para revisar requisitos funcionales con el prompt: "Revisa estos requisitos y dime cuáles están mal redactados. Explícalos y propón una solución." La IA altera requisitos que solo tenían diferente estilo. ¿Cuál prompt resuelve la necesidad?',
          options: [
            { id: 'a', text: '“Actúa como un experto senior en ingeniería de requisitos con amplia experiencia en proyectos TIC. Revisa detalladamente todos los requisitos y proporciona una respuesta técnica, completa y profesional.”' },
            { id: 'b', text: '“Revisa los requisitos e identifica aquellos cuya redacción pueda generar interpretaciones diferentes, dificulte verificar su cumplimiento o combine varias necesidades en una misma afirmación. Para cada caso, explica el problema identificado y señala qué aspecto de la redacción lo genera.”' },
            { id: 'c', text: '“Revisa todos los requisitos, corrige los que consideres deficientes y entrega una nueva versión completamente mejorada para que pueda ser utilizada directamente por el equipo.”' },
            { id: 'd', text: '“Analiza los requisitos desde las perspectivas de desarrollo, pruebas, seguridad, usuarios e interesados, determina cuáles están mal redactados y realiza una propuesta de mejora integral.”' },
          ],
          correctOptionId: 'b',
          explanation: 'La opción B establece criterios objetivos y observables (ambigüedad, verificabilidad, atomicidad) para separar defectos reales de diferencias estilísticas.',
        },
        {
          id: 2,
          question: 'El equipo compara 3 alternativas tecnológicas para una reunión directiva donde importan costo inicial, compatibilidad, tiempo de implementación y escalabilidad. ¿Qué modificación al prompt original es la más adecuada?',
          options: [
            { id: 'a', text: '“Compara ampliamente las tres alternativas y determina cuál es la mejor utilizando todos los aspectos técnicos que consideres relevantes.”' },
            { id: 'b', text: '“Compara las tres alternativas considerando costo inicial, compatibilidad con la infraestructura existente, tiempo estimado de implementación y capacidad de crecimiento. Organiza el análisis para apoyar la discusión de la alternativa que continuará a evaluación.”' },
            { id: 'c', text: '“Actúa como consultor tecnológico senior y recomienda la alternativa que consideres más conveniente para una organización que necesita modernizar sus sistemas.”' },
            { id: 'd', text: '“Compara las tres alternativas, asigna una puntuación de 1 a 10 a cada una y selecciona la que obtenga el promedio más alto.”' },
          ],
          correctOptionId: 'b',
          explanation: 'Delimita explícitamente los criterios directivos y el propósito de habilitar la discusión informada.',
        },
        {
          id: 3,
          question: 'Durante la ejecución se solicita incorporar una nueva funcionalidad y el líder desea analizar dependencias, esfuerzo, capacidad y fechas. ¿Cuál uso de rol es más pertinente?',
          options: [
            { id: 'a', text: '“Actúa como el mejor experto en tecnología y analiza profundamente la nueva funcionalidad para entregar una respuesta profesional y completa.”' },
            { id: 'b', text: '“Analiza la nueva funcionalidad de manera objetiva, considerando todos los aspectos importantes del proyecto antes de emitir una conclusión.”' },
            { id: 'c', text: '“Actúa como gestor de proyectos TIC. Analiza la nueva funcionalidad considerando las dependencias con actividades existentes, el esfuerzo requerido, la capacidad disponible y su posible efecto sobre las fechas planificadas.”' },
            { id: 'd', text: '“Actúa simultáneamente como gestor de proyectos, desarrollador, analista financiero, usuario y especialista de calidad. Evalúa la funcionalidad desde todas estas perspectivas y determina si debe incorporarse.”' },
          ],
          correctOptionId: 'c',
          explanation: 'Orienta el análisis con los criterios propios de la gestión de proyectos: dependencias, capacidad, esfuerzo y cronograma.',
        },
        {
          id: 4,
          question: 'Un proyecto debe integrarse con un sistema legado cuyo código no puede modificarse por contrato en la fase 1. La IA propuso alternativas que alteraban el sistema interno. ¿Cuál instrucción corrige el problema?',
          options: [
            { id: 'a', text: '“Propón alternativas innovadoras, realistas y profesionales para integrar ambos sistemas, evitando soluciones demasiado complejas.”' },
            { id: 'b', text: '“Propón cuatro alternativas de integración y selecciona las más convenientes de acuerdo con tu experiencia en arquitectura de sistemas.”' },
            { id: 'c', text: '“Propón cuatro alternativas de integración considerando como restricción que el código del sistema legado no puede modificarse durante la primera fase. Para cada alternativa, indica cómo cumple esta restricción.”' },
            { id: 'd', text: '“Propón alternativas de integración seguras, económicas, escalables y técnicamente adecuadas, explicando detalladamente las ventajas y desventajas de cada una.”' },
          ],
          correctOptionId: 'c',
          explanation: 'Establece la restricción contractual inviolable y exige justificar su cumplimiento para cada alternativa.',
        },
        {
          id: 5,
          question: 'La IA generó una respuesta narrativa heterogénea sobre riesgos que dificulta la comparación. El equipo decide modificar únicamente el formato de salida. ¿Qué opción es más apropiada?',
          options: [
            { id: 'a', text: 'Solicitar una explicación narrativa más extensa para cada riesgo.' },
            { id: 'b', text: 'Solicitar una tabla con las columnas: riesgo, causa, probabilidad, impacto, evidencia disponible y respuesta propuesta, manteniendo la misma estructura para todos los registros.' },
            { id: 'c', text: 'Solicitar que la IA construya una tabla con las columnas que considere necesarias según cada riesgo.' },
            { id: 'd', text: 'Solicitar una lista ordenada del riesgo más al menos importante con un texto general.' },
          ],
          correctOptionId: 'b',
          explanation: 'Una tabla con columnas fijas estandarizadas permite comparar todos los registros bajo los mismos parámetros.',
        },
        {
          id: 6,
          question: 'Varias actividades sufren retrasos y se necesita determinar si existe un patrón. Se propuso: "Analiza los retrasos, descubre sus causas y dime qué hacer". ¿Qué descomposición es más adecuada?',
          options: [
            { id: 'a', text: 'Separar el análisis en identificación de actividades retrasadas, organización de los retrasos según características comunes, revisión de la evidencia disponible y formulación de posibles explicaciones que posteriormente puedan contrastarse.' },
            { id: 'b', text: 'Solicitar primero varias soluciones posibles y después pedir a la IA que determine cuáles podrían explicar los retrasos.' },
            { id: 'c', text: 'Solicitar simultáneamente un análisis de cronograma, costos, riesgos, calidad y comunicaciones.' },
            { id: 'd', text: 'Solicitar una explicación causal completa y pedir que se reduzca a conclusiones principales.' },
          ],
          correctOptionId: 'a',
          explanation: 'Parte de hechos observables y patrones comunes antes de formular hipótesis y contrastar explicaciones causales.',
        },
        {
          id: 7,
          question: 'La IA afirma: "Los riesgos de integración son los principales responsables de los retrasos actuales". Los datos solo contenían descripción, probabilidad e impacto de riesgos, sin datos de retrasos históricos. ¿Cómo evaluar esta afirmación?',
          options: [
            { id: 'a', text: 'Válida porque los riesgos de integración siempre causan retrasos en tecnología.' },
            { id: 'b', text: 'Inválida porque la IA no puede analizar riesgos sin datos de 5 años atrás.' },
            { id: 'c', text: 'Requiere verificación porque la información disponible permite analizar prioridad según probabilidad e impacto, pero no demuestra causalidad con los retrasos observados.' },
            { id: 'd', text: 'Aceptable si el equipo opina de manera similar.' },
          ],
          correctOptionId: 'c',
          explanation: 'Diferencia lo sustentado (prioridad teórica) de lo que requiere verificación empírica (atribución causal de retrasos reales).',
        },
        {
          id: 8,
          question: 'Al pedir requisitos no funcionales de seguridad, la IA entregó 8 elementos: 3 eran funcionales, 1 no estaba en los datos de entrada y 4 eran correctos. ¿Qué refinamiento responde a estos problemas?',
          options: [
            { id: 'a', text: 'Pedir una lista más extensa de requisitos de seguridad.' },
            { id: 'b', text: 'Asignar el rol de especialista en seguridad y solicitar mayor tecnicismo.' },
            { id: 'c', text: 'Solicitar que utilice únicamente los requisitos proporcionados, clasifique cada elemento como funcional o no funcional, identifique cuáles corresponden a seguridad y señale explícitamente cualquier elemento que no pueda sustentarse en la información suministrada.' },
            { id: 'd', text: 'Pedir que seleccione los que considere más importantes según su criterio.' },
          ],
          correctOptionId: 'c',
          explanation: 'Restringe la entrada a los datos provistos, exige categorización funcional vs no funcional y prohíbe inventar elementos.',
        },
        {
          id: 9,
          question: 'Un estudiante compara dos versiones para analizar solicitudes de cambio. La Versión 2 analiza por separado impacto en alcance, cronograma y recursos con evidencia. El estudiante dice: "La V2 es mejor porque es más larga". ¿Cuál justificación es rigurosa?',
          options: [
            { id: 'a', text: 'La V2 es mejor porque al tener más texto tiene mayor calidad.' },
            { id: 'b', text: 'La segunda versión permite verificar por separado dimensiones del impacto que antes estaban mezcladas y relacionar las afirmaciones con la información que las sustenta.' },
            { id: 'c', text: 'La primera versión es mejor porque un prompt corto siempre es superior.' },
            { id: 'd', text: 'Son equivalentes porque ambas analizan cambios.' },
          ],
          correctOptionId: 'b',
          explanation: 'La mejora se justifica por criterios verificables de separación dimensional y respaldo de evidencia, no por la longitud del texto.',
        },
        {
          id: 10,
          question: 'En la etapa de validación de un ciclo de prompts, una estudiante escribe: "La segunda versión es válida porque me parece más clara y profesional". ¿Qué debe incorporar para sustentarla?',
          options: [
            { id: 'a', text: 'Una tercera ejecución del mismo prompt para comprobar si la respuesta se repite.' },
            { id: 'b', text: 'Una explicación adicional sobre el lenguaje técnico y formato visual.' },
            { id: 'c', text: 'Una justificación que relacione los problemas identificados inicialmente, los cambios realizados en la instrucción y los criterios utilizados para determinar que el nuevo resultado responde mejor a la tarea.' },
            { id: 'd', text: 'Una consulta a la IA para que el modelo elija su versión favorita.' },
          ],
          correctOptionId: 'c',
          explanation: 'La validación rigurosa articula problema detectado, cambio deliberado en el prompt y criterios observables de cumplimiento.',
        },
      ],
    },
  },

  // Pantalla 23: Checkpoint ¡Felicitaciones! Módulo 13
  {
    type: 'CHECKPOINT',
    order: 66,
    blockData: {
      title: '¡Felicitaciones! Has completado el Módulo 13',
      description: 'Has dominado el diseño, evaluación, auditoría y refinamiento de instrucciones para proyectos tecnológicos.',
      criteria: [
        'Comprendiste la anatomía y componentes de una instrucción efectiva (contexto, rol, tarea, restricciones, criterios y formato).',
        'Aplicaste patrones de prompting (few-shot) y descomposición de problemas complejos.',
        'Diseñaste prompts para análisis, generación, transformación, comparación y evaluación.',
        'Auditaste respuestas de IA detectando afirmaciones no sustentadas y sesgos causales.',
        'Refinaste prompts empíricamente y documentaste la justificación en tu Bitácora.',
      ],
      badgeKey: 'arquitecto-instrucciones',
      pointsAwarded: 100,
    },
  },
]

// =========================================================================
// MÓDULO 14: Laboratorio de IA para proyectos tecnológicos (Nivel 4 - Módulo 2)
// =========================================================================
export const module14Blocks: BlockSeed[] = [
  // Pantalla 0: Introducción al Módulo 14
  {
    type: 'TEXT',
    order: 1,
    blockData: {
      heading: '¡Bienvenido al Módulo 14: Laboratorio de IA para proyectos tecnológicos!',
      content: `Módulo 14. Laboratorio de IA para proyectos tecnológicos
Duración estimada: 180–240 minutos | Nivel: Avanzado

Objetivo general:
Aplicar instrucciones de IA generativa en situaciones contextualizadas de proyectos tecnológicos, evaluando los resultados obtenidos, realizando refinamientos fundamentados y validando su utilidad como apoyo a diferentes actividades de gestión del proyecto.

Objetivos específicos:
• Aplicar instrucciones previamente diseñadas a situaciones concretas del proyecto tecnológico SIGA-TI (TecnoGestión S.A.S.).
• Seleccionar y preparar información contextualizada diferenciando datos observados de interpretaciones.
• Auditar resultados generados identificando vacíos, afirmaciones no sustentadas e inconsistencias.
• Refinar instrucciones a partir de la evidencia observada y comparar resultados antes y después del refinamiento.
• Validar la utilidad de aplicaciones de IA mediante evidencias contrastadas con el equipo.
• Construir y documentar el Portafolio de aplicaciones de IA validadas.

Mapa de entregables del laboratorio:
1. Laboratorio 1: Ficha de aplicación de IA (Semana 8)
2. Laboratorio 2: Registro de aplicación de IA (Semana 9)
3. Laboratorio 3: Informe de evaluación y refinamiento (Semana 10)
4. Laboratorio 4: Caso de aplicación integral de IA (Semana 11 - Reto integrador)
5. Portafolio de aplicaciones de IA validadas: Consolidación final para la toma de decisiones.`,
    },
  },

  // Laboratorio 1: Identifica una oportunidad de aplicación de IA
  {
    type: 'TEXT',
    order: 2,
    blockData: {
      heading: 'Laboratorio 1: Identifica una oportunidad de aplicación de IA (Semana 8)',
      content: `Caso del Proyecto SIGA-TI (Semana 8):
La empresa TecnoGestión S.A.S. desarrolla la plataforma web SIGA-TI (duración: 20 semanas, actualmente en Semana 8) para centralizar solicitudes de soporte tecnológico.

Recursos disponibles del caso:
• Recurso 1. Requisitos:
  - RQ-01: Registrar solicitudes indicando asunto, descripción y prioridad.
  - RQ-02: Consultar el estado de una solicitud.
  - RQ-03: Asignar solicitudes a responsables.
  - RQ-04: Notificar cambios de estado.
  - RQ-05: Consultar reportes mensuales.
  - RQ-06: Dar tratamiento prioritario a solicitudes de seguridad.
  - RQ-07: Filtrar solicitudes por estado, responsable, prioridad y fecha.
  - RQ-08: Generar resumen mensual de solicitudes atendidas.
• Recurso 2. Historias de usuario: HU-01 a HU-05 (registro, pendientes, reportes, seguridad, incidencias de pruebas).
• Recurso 3. Incidencias registradas:
  - INC-01 (Alta, Abierta, Solicitudes): Botón de registro no responde tras completar formulario.
  - INC-02 (Media, Análisis, Notificaciones): Correo de notificación llega con retraso.
  - INC-03 (Alta, Abierta, Reportes): Filtro por responsable no devuelve todos los registros.
  - INC-04 (Media, Análisis, Consultas): Pantalla de consulta tarda más de lo esperado.
  - INC-05 (Alta, Abierta, Seguridad): Un usuario puede consultar solicitudes fuera de su área.
  - INC-06 (Alta, Análisis, Reportes): Reporte mensual presenta registros duplicados.
  - INC-07 (Media, Abierta, Solicitudes): Prioridad seleccionada no aparece correctamente.
  - INC-08 (Baja, Abierta, Solicitudes): Cambio de estado no actualiza inmediatamente la UI.
• Recurso 4. Registro de reunión: El director pide hallar qué problemas se repiten más; el analista nota mezcla de necesidades con soluciones; el profesional de pruebas pide priorizar.
• Recurso 5. Condiciones: La IA debe responder a una necesidad concreta, no inventar datos, señalar información insuficiente y permitir revisión humana.`,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 3,
    blockData: {
      stepNumber: 22,
      title: 'Laboratorio 1: Ficha de aplicación de IA',
      instruction: 'Analiza los recursos de la Semana 8 y documenta tu Ficha de aplicación de IA en la Bitácora:',
      fields: [
        { key: 'lab1_situacion_necesidad', label: '1. Situación del proyecto, necesidad identificada y actividad de gestión:', fieldType: 'textarea', maxWords: 100 },
        { key: 'lab1_objetivo_utilidad', label: '2. Objetivo de la aplicación (qué se busca) y para qué se utilizará el resultado:', fieldType: 'textarea', maxWords: 100 },
        { key: 'lab1_info_disponible_faltante', label: '3. Información disponible utilizada e información faltante identificada:', fieldType: 'textarea', maxWords: 120 },
        { key: 'lab1_tarea_instruccion', label: '4. Tipo de tarea de IA seleccionada e instrucción completa aplicada:', fieldType: 'textarea', maxWords: 150 },
        { key: 'lab1_resultado_evaluacion', label: '5. Resultado obtenido y evaluación con criterios (cumplimiento vs revisión):', fieldType: 'textarea', maxWords: 150 },
        { key: 'lab1_conclusion_utilidad', label: '6. Conclusión sobre la utilidad para el equipo y aspectos a mejorar:', fieldType: 'textarea', maxWords: 100 },
      ],
      advice: 'No inventes información ausente: documentar lo que falta es parte del valor profesional de la ficha.',
      pointsAwarded: 40,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 4,
    blockData: {
      title: 'IA Aplicada: Asistente para delimitar la oportunidad en SIGA-TI',
      role: 'Tutor de gestión de proyectos para delimitación de casos',
      prompt: `Actúa como asesor del proyecto SIGA-TI. Te presentaré la oportunidad de aplicación de IA que identifiqué en la semana 8 a partir de los requisitos e incidencias. Pregúntame qué datos del caso sustentan mi elección, qué información me hace falta confirmar y cómo comprobaré que la salida es útil para el director del proyecto. No redactes la ficha por mí.`,
      reflectionQuestions: [
        '¿Qué información ausente en el caso registraste como limitación?',
      ],
      pointsAwarded: 15,
    },
  },

  // Laboratorio 2: Aplica IA a una situación del proyecto
  {
    type: 'TEXT',
    order: 5,
    blockData: {
      heading: 'Laboratorio 2: Aplica IA a una situación del proyecto (Semana 9)',
      content: `Contexto del Proyecto SIGA-TI (Semana 9):
El proyecto avanza a la Semana 9. Han surgido nuevas solicitudes, incidencias y solicitudes de cambio que presionan el alcance y los módulos en desarrollo.

Nuevos Recursos disponibles:
• Recurso 1. Nuevas solicitudes: SOL-01 a SOL-08 (historial completo, tickets estancados, reporte gerencial de fallas, clasificación de accesos por seguridad, preparación de reunión de seguimiento).
• Recurso 2. Nuevas incidencias:
  - INC-09 (Alta, Abierta, Seguimiento): Solicitudes sin actualización durante varios días.
  - INC-10 (Media, Análisis, Historial): Historial no muestra todos los cambios realizados.
  - INC-11 (Media, Abierta, Solicitudes): Descripciones demasiado generales en tickets.
  - INC-12 (Alta, Abierta, Seguridad): Solicitudes de accesos sin clasificación uniforme.
  - INC-13 (Alta, Análisis, Reportes): Reportes contienen datos que requieren revisión previa.
  - INC-14 (Media, Abierta, Solicitudes): Solicitudes similares registradas con descripciones dispares.
  - INC-15 (Alta, Análisis, Pruebas): Problemas registrados en múltiples módulos en simultáneo.
  - INC-16 (Media, Abierta, Solicitudes): Información insuficiente para determinar tratamiento del ticket.
• Recurso 3. Solicitudes de cambio (En revisión/análisis):
  - CAM-01: Categoría específica para solicitudes de seguridad.
  - CAM-02: Modificar contenido del reporte mensual.
  - CAM-03: Incorporar campos adicionales en el historial.
  - CAM-04: Ajustar filtros para consultar solicitudes.
• Recurso 4. Estado de actividades: Desarrollo de solicitudes, reportes, pruebas funcionales y pruebas de seguridad en ejecución; notificaciones en revisión; pruebas con usuarios pendientes.
• Condición clave: Diferenciar estrictamente datos observados de inferencias; no predecir impactos sin datos numéricos suficientes.`,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 6,
    blockData: {
      stepNumber: 23,
      title: 'Laboratorio 2: Registro de aplicación de IA',
      instruction: 'Aplica una instrucción a una situación concreta de la Semana 9 y documenta tu Registro de aplicación:',
      fields: [
        { key: 'lab2_contexto_necesidad', label: '1. Contexto de aplicación y necesidad concreta atendida (Semana 9):', fieldType: 'textarea', maxWords: 100 },
        { key: 'lab2_info_entrada', label: '2. Información de entrada seleccionada (datos, antecedentes, restricciones):', fieldType: 'textarea', maxWords: 120 },
        { key: 'lab2_instruccion_proposito', label: '3. Instrucción aplicada y propósito de la interacción:', fieldType: 'textarea', maxWords: 150 },
        { key: 'lab2_ejecucion_resultado', label: '4. Evidencia de la ejecución y resultado completo generado por la IA:', fieldType: 'textarea', maxWords: 150 },
        { key: 'lab2_analisis_critico', label: '5. Análisis del resultado (datos pertinentes, vacíos, aspectos que requieren verificación):', fieldType: 'textarea', maxWords: 150 },
        { key: 'lab2_hallazgos_conclusion', label: '6. Principales hallazgos para el proyecto, valor aportado y limitaciones:', fieldType: 'textarea', maxWords: 120 },
      ],
      advice: 'Distingue con claridad qué afirmó la IA y qué datos del proyecto respaldan realmente esa afirmación.',
      pointsAwarded: 40,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 7,
    blockData: {
      title: 'IA Aplicada: Verificación de evidencia empírica en Semana 9',
      role: 'Auditor de calidad y seguimiento de proyectos TIC',
      prompt: `Actúa como auditor de seguimiento del proyecto SIGA-TI. Te presentaré mi análisis de las solicitudes de cambio (CAM-01 a CAM-04) y nuevas incidencias de la semana 9. Pregúntame si las conclusiones que obtuve provienen directamente de los registros o si representan supuestos de impacto que no están demostrados.`,
      reflectionQuestions: [
        '¿Qué hallazgo identificaste que requería validación previa con el desarrollador o analista?',
      ],
      pointsAwarded: 15,
    },
  },

  // Laboratorio 3: Audita y mejora el resultado
  {
    type: 'TEXT',
    order: 8,
    blockData: {
      heading: 'Laboratorio 3: Audita y mejora el resultado (Semana 10)',
      content: `Situación de Auditoría en la Semana 10:
Durante la semana 10 se analizó la lista de incidencias INC-01 a INC-08. Se ejecutó una instrucción inicial que produjo un resultado con graves sesgos metodológicos.

Instrucción inicial defectuosa utilizada:
“Analiza las incidencias del proyecto SIGA-TI y presenta un resumen organizado por módulo. Identifica cuáles son los problemas más importantes, explica qué está ocurriendo y señala qué debería hacer el equipo para solucionarlos.”

Resultado inicial generado por la IA (a auditar):
Resumen de incidencias: El análisis muestra que la mayoría de problemas están relacionados con el módulo de solicitudes. Los principales problemas parecen deberse a deficiencias en el desarrollo y a una falta de coordinación entre los desarrolladores.
Las incidencias de mayor importancia son INC-01, INC-03, INC-05 e INC-06. Estas deberían solucionarse inmediatamente porque afectan la operación.
Las incidencias de reportes son las más frecuentes. Esto indica que el módulo de reportes presenta problemas estructurales que requieren una revisión completa. Las de prioridad media son secundarias.
Se recomienda asignar más desarrolladores a estas áreas y hacer una revisión técnica completa.
Conclusión: El principal problema es la calidad del desarrollo. Hay alta probabilidad de problemas técnicos adicionales no detectados.

Auditoría requerida:
1. Afirmación no sustentada: Culpar a la "falta de coordinación de los desarrolladores" sin ningún dato sobre desempeño de equipo.
2. Error de conteo: Decir que las incidencias de reportes son "las más frecuentes" cuando solicitudes tiene 3 (INC-01, 07, 08) y reportes tiene 2 (INC-03, 06).
3. Decisiones no autorizadas: Recomendar "asignar más desarrolladores" sin conocer presupuesto ni capacidad.
4. Vulnerabilidad de seguridad subestimada: Tratar INC-05 (acceso indebido a solicitudes ajenas) como una falla común sin destacar la violación de confidencialidad.`,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 9,
    blockData: {
      stepNumber: 24,
      title: 'Laboratorio 3: Informe de evaluación y refinamiento',
      instruction: 'Audita el resultado defectuoso, formula tu refinamiento y documenta el informe en tu Bitácora:',
      fields: [
        { key: 'lab3_resultado_inicial', label: '1. Resultado inicial e instrucción original analizada:', fieldType: 'textarea', maxWords: 100 },
        { key: 'lab3_criterios_auditoria', label: '2. Criterios de evaluación aplicados y condiciones infringidas:', fieldType: 'textarea', maxWords: 100 },
        { key: 'lab3_problemas_detectados', label: '3. Problemas detectados (alucinaciones causales, conteos erróneos, decisiones arbitrarias):', fieldType: 'textarea', maxWords: 150 },
        { key: 'lab3_refinamiento_justificacion', label: '4. Modificaciones realizadas a la instrucción y su justificación:', fieldType: 'textarea', maxWords: 120 },
        { key: 'lab3_instruccion_refinada', label: '5. Nueva instrucción refinada y nuevo resultado generado:', fieldType: 'textarea', maxWords: 150 },
        { key: 'lab3_comparacion_validacion', label: '6. Comparación sistemática V1 vs V2, mejoras obtenidas y limitaciones pendientes:', fieldType: 'textarea', maxWords: 150 },
      ],
      advice: 'Demuestra cómo la instrucción refinada prohibió inferencias causales y exigió conteos basados estrictamente en la tabla.',
      pointsAwarded: 40,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 10,
    blockData: {
      title: 'IA Aplicada: Detección socrática de juicios de valor en auditoría',
      role: 'Auditor de sesgos e inferencias causales en IA',
      prompt: `Actúa como auditor técnico de software. Te mostraré el resultado inicial generado sobre las incidencias de SIGA-TI y mi auditoría de problemas. Pregúntame qué afirmaciones de la IA constituyen juicios de valor sin evidencia, qué conteos contradicen la tabla y cómo redacté las restricciones para impedir que el modelo vuelva a inventar causas organizacionales.`,
      reflectionQuestions: [
        '¿Cómo redactaste la restricción para evitar que el modelo asuma causas de coordinación interna?',
      ],
      pointsAwarded: 15,
    },
  },

  // Laboratorio 4: Reto integrador TIC
  {
    type: 'TEXT',
    order: 11,
    blockData: {
      heading: 'Laboratorio 4: Reto integrador TIC (Semana 11)',
      content: `Reto Integrador en la Semana 11:
En la Semana 11, el proyecto acumula:
• 8 Requisitos formales (RQ-01 a RQ-08)
• 5 Historias de usuario (HU-01 a HU-05)
• 16 Incidencias acumuladas (INC-01 a INC-16)
• 4 Solicitudes de cambio (CAM-01 a CAM-04)
• Actividades en desarrollo y pruebas con usuarios preparándose.

El desafío:
Debes asumir el ciclo completo de aplicación de IA generativa para apoyar una actividad estratégica de toma de decisiones (ej. priorización de defectos de cara a las pruebas con usuarios, conciliación de solicitudes de cambio vs estabilidad de módulos, o análisis cruzado de seguridad).

Condiciones obligatorias:
1. Responder a una necesidad concreta del proyecto.
2. Utilizar únicamente información pertinente sin inventar datos.
3. Diferenciar datos de interpretaciones y señalar vacíos de información.
4. Generar resultado inicial → auditar → refinar instrucción → generar nuevo resultado → comparar → validar.
5. El resultado final permanece sujeto a revisión y decisión humana.`,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 12,
    blockData: {
      stepNumber: 25,
      title: 'Laboratorio 4: Caso de aplicación integral de IA',
      instruction: 'Ejecuta el ciclo integral completo en la Semana 11 y documenta el Caso de aplicación integral:',
      fields: [
        { key: 'lab4_contexto_necesidad', label: '1. Contexto, necesidad del proyecto y justificación de la aplicación de IA seleccionada:', fieldType: 'textarea', maxWords: 120 },
        { key: 'lab4_datos_instruccion_inicial', label: '2. Información suministrada, restricciones y texto de la instrucción inicial:', fieldType: 'textarea', maxWords: 150 },
        { key: 'lab4_resultado_v1_auditoria', label: '3. Resultado inicial obtenido, hallazgos de auditoría y problemas detectados:', fieldType: 'textarea', maxWords: 150 },
        { key: 'lab4_refinamiento_nueva_instruccion', label: '4. Refinamiento justificado y texto de la nueva instrucción final:', fieldType: 'textarea', maxWords: 150 },
        { key: 'lab4_resultado_final_comparacion', label: '5. Resultado final obtenido y comparación sistemática frente a la versión inicial:', fieldType: 'textarea', maxWords: 150 },
        { key: 'lab4_justificacion_validacion', label: '6. Justificación del valor aportado, validación con criterios y condiciones de uso humano:', fieldType: 'textarea', maxWords: 150 },
      ],
      advice: 'El portafolio integral demuestra que dominas el uso de IA como herramienta de apoyo rigurosa, auditable y complementaria al juicio profesional.',
      pointsAwarded: 60,
    },
  },
  {
    type: 'TEXT',
    order: 13,
    blockData: {
      heading: 'Consolidación del Portafolio de aplicaciones de IA validadas',
      content: `Portafolio de Aplicaciones de IA Validadas:
Con los cuatro laboratorios concluidos, has conformado tu portafolio oficial:
1. Ficha de aplicación de IA (Lab 1): Delimitación y pertinencia en fase de desarrollo.
2. Registro de aplicación de IA (Lab 2): Análisis de cambios e incidencias con trazabilidad empírica.
3. Informe de evaluación y refinamiento (Lab 3): Auditoría crítica, eliminación de sesgos y refinamiento instruccional.
4. Caso de aplicación integral de IA (Lab 4): Gobernanza integral, ciclo de mejora y supervisión humana activa.

Este portafolio constituye la evidencia verificable de tu competencia como gestor tecnológico en la era de la inteligencia artificial.`,
    },
  },

  // Microevaluación Módulo 14 (5 preguntas)
  {
    type: 'EXAM',
    order: 14,
    blockData: {
      title: 'Microevaluación — Laboratorio de IA para proyectos tecnológicos',
      description: '5 preguntas de evaluación sobre la aplicación práctica de IA en el proyecto SIGA-TI. Mínimo aprobatorio: 70%.',
      questionsCount: 5,
      pointsPerQuestion: 20,
      passingScore: 70,
      pointsAwarded: 100,
      questions: [
        {
          id: 1,
          question: 'Durante un proyecto, el equipo dispone de requisitos, incidencias y actas. Un miembro propone "enviar todo a la IA para que analice y encuentre problemas", sin definir necesidad ni resultado esperado. ¿Cuál debe ser el primer paso?',
          options: [
            { id: 'a', text: 'Proporcionar toda la información disponible y permitir que la IA determine qué problema es más importante.' },
            { id: 'b', text: 'Definir una necesidad concreta, delimitar la tarea que realizará la IA y establecer el resultado esperado.' },
            { id: 'c', text: 'Construir una instrucción extensa que incluya todos los recursos del proyecto.' },
            { id: 'd', text: 'Ejecutar varias herramientas de IA y seleccionar posteriormente la respuesta más completa.' },
          ],
          correctOptionId: 'b',
          explanation: 'Una aplicación de IA debe partir de una necesidad concreta y un resultado esperado verificable.',
        },
        {
          id: 2,
          question: 'Una IA analiza 8 incidencias y afirma que una falla se debió a problemas de coordinación del equipo. En los registros solo aparece descripción y prioridad, sin causas registradas. ¿Qué debe hacer el estudiante?',
          options: [
            { id: 'a', text: 'Aceptar la conclusión porque la IA analizó información del proyecto.' },
            { id: 'b', text: 'Eliminar toda la respuesta porque una parte no está sustentada.' },
            { id: 'c', text: 'Identificar la afirmación como una interpretación no sustentada y señalar que requiere verificación.' },
            { id: 'd', text: 'Incorporar la causa propuesta como hipótesis confirmada en el informe.' },
          ],
          correctOptionId: 'c',
          explanation: 'Se debe separar la información demostrada de interpretaciones no sustentadas, marcando estas últimas para verificación humana.',
        },
        {
          id: 3,
          question: 'Tras la primera ejecución, la IA mezcla datos con interpretaciones y propone acciones no solicitadas. ¿Cuál acción representa un refinamiento adecuado?',
          options: [
            { id: 'a', text: 'Agregar más información al azar para aumentar el contexto.' },
            { id: 'b', text: 'Reemplazar completamente la herramienta por otra diferente.' },
            { id: 'c', text: 'Mantener la instrucción original y corregir manualmente toda la respuesta.' },
            { id: 'd', text: 'Modificar la instrucción para delimitar la tarea, diferenciar datos e interpretaciones y establecer restricciones sobre el resultado esperado.' },
          ],
          correctOptionId: 'd',
          explanation: 'El refinamiento ataca la causa raíz acotando la tarea, prohibiendo inferencias libres y fijando restricciones.',
        },
        {
          id: 4,
          question: 'Después de refinar, la segunda respuesta está mejor organizada pero aún contiene una afirmación no comprobable con los datos. ¿Cuál es la interpretación adecuada?',
          options: [
            { id: 'a', text: 'La comparación debe identificar las mejoras obtenidas y mantener registrada la afirmación que continúa requiriendo verificación.' },
            { id: 'b', text: 'La segunda versión debe descartarse completamente porque aún tiene una limitación.' },
            { id: 'c', text: 'La segunda versión debe considerarse infalible porque mejoró respecto de la primera.' },
            { id: 'd', text: 'La afirmación puede aceptarse como hecho porque apareció tras el refinamiento.' },
          ],
          correctOptionId: 'a',
          explanation: 'El refinamiento es acumulativo; se documentan los avances alcanzados y las limitaciones remanentes.',
        },
        {
          id: 5,
          question: 'Una aplicación de IA organiza incidencias y es útil para preparar la reunión de seguimiento, pero algunos datos requieren confirmación del equipo. ¿Cuál conclusión valida adecuadamente la aplicación?',
          options: [
            { id: 'a', text: 'La aplicación está validada porque ahorró tiempo al equipo.' },
            { id: 'b', text: 'La aplicación no es útil porque requiere revisión humana.' },
            { id: 'c', text: 'La aplicación puede considerarse útil como apoyo si cumple los criterios establecidos, sus limitaciones están identificadas y se mantiene la revisión necesaria.' },
            { id: 'd', text: 'La aplicación es perfecta porque la segunda ejecución fue más clara.' },
          ],
          correctOptionId: 'c',
          explanation: 'La validación reconoce el valor de apoyo de la herramienta sin prescindir de la supervisión y responsabilidad humana.',
        },
      ],
    },
  },

  // Checkpoint ¡Felicitaciones! Módulo 14
  {
    type: 'CHECKPOINT',
    order: 15,
    blockData: {
      title: '¡Felicitaciones! Has completado el Módulo 14',
      description: 'Has culminado con éxito los laboratorios prácticos de IA aplicada al proyecto tecnológico SIGA-TI y consolidado tu portafolio.',
      criteria: [
        'Identificaste oportunidades de IA sustentadas en las necesidades reales del proyecto.',
        'Documentaste la Ficha de aplicación de IA y el Registro de aplicación en situaciones contextualizadas.',
        'Auditaste resultados sesgados y refinaste instrucciones quirúrgicamente.',
        'Ejecutaste el Reto integrador TIC y consolidaste el Portafolio de aplicaciones de IA validadas.',
      ],
      badgeKey: 'arquitecto-aplicaciones-ia',
      pointsAwarded: 100,
    },
  },

  // EVALUACIÓN FINAL DEL NIVEL 4 (25 preguntas)
  {
    type: 'EXAM',
    order: 16,
    blockData: {
      title: 'Evaluación Final - Nivel 4: IA Generativa Aplicada',
      description: 'Evaluación integral de los Módulos 13 y 14. Consta de 25 preguntas de opción múltiple (4 puntos c/u = 100 puntos en total). Mínimo aprobatorio: 70%. Al aprobar obtendrás la insignia "Especialista Nivel 4" y habilitarás el Nivel 5.',
      questionsCount: 25,
      pointsPerQuestion: 4,
      passingScore: 70,
      badgeKey: 'graduado-nivel-4',
      pointsAwarded: 500,
      questions: [
        {
          id: 1,
          question: 'Una empresa acumula 96 registros de incidencias de equipos médicos y desea usar IA. No se ha definido qué resultado obtener. ¿Cuál decisión representa mejor el principio de diseño de instrucciones?',
          options: [
            { id: 'a', text: 'Enviar primero todos los registros para que la IA decida autónomamente el problema principal.' },
            { id: 'b', text: 'Indicar a la IA que actúe como directora y pida los datos que considere necesarios.' },
            { id: 'c', text: 'El equipo debe definir primero una necesidad concreta, la actividad que desea apoyar y el resultado esperado, para luego seleccionar datos y restricciones evaluables.' },
            { id: 'd', text: 'Construir desde el inicio un prompt extenso que incluya análisis, clasificación y recomendaciones a la vez.' },
          ],
          correctOptionId: 'c',
          explanation: 'Toda instrucción estructurada parte de la necesidad concreta y el entregable verificable antes de alimentar datos a la IA.',
        },
        {
          id: 2,
          question: 'En un análisis de 74 comentarios de usuarios sobre un gestor documental, se busca identificar patrones sin convertir quejas en causas confirmadas. ¿Cuál instrucción es más adecuada?',
          options: [
            { id: 'a', text: 'Analizar los 74 comentarios clasificándolos según búsqueda, navegación, permisos y versiones; identificar patrones recurrentes; diferenciar lo que los usuarios reportan de cualquier interpretación posterior; y señalar como requerimiento de verificación cualquier causa que no esté respaldada directamente por los comentarios.' },
            { id: 'b', text: 'Analizar los comentarios desde la perspectiva de UX y determinar causas principales complementando con problemas habituales de otros sistemas.' },
            { id: 'c', text: 'Revisar comentarios, clasificar problemas graves y proponer rediseño basándose en la experiencia de la IA cuando falten datos.' },
            { id: 'd', text: 'Resumir los comentarios y completar vacíos usando patrones habituales de aplicaciones similares.' },
          ],
          correctOptionId: 'a',
          explanation: 'Restringe el análisis a las categorías del proyecto, separa hechos de interpretaciones y marca vacíos para verificación.',
        },
        {
          id: 3,
          question: 'Un proyecto migra datos a un ERP y usa IA para revisar reglas de transformación entre origen y destino sin aprobar la migración automáticamente. ¿Cuál instrucción incorpora mejor el uso del rol?',
          options: [
            { id: 'a', text: 'Actuar como director de migración y aprobar la carga de datos según su experiencia general.' },
            { id: 'b', text: 'Actuar como especialista en migraciones de datos y revisar las reglas proporcionadas para identificar correspondencias inconsistentes, transformaciones ambiguas y campos cuya equivalencia no pueda establecerse con la información disponible; separar los hallazgos que requieren validación humana.' },
            { id: 'c', text: 'Actuar como experto internacional y comparar con otras empresas añadiendo recomendaciones externas.' },
            { id: 'd', text: 'Actuar como auditor y emitir concepto vinculante final aprobando o rechazando reglas.' },
          ],
          correctOptionId: 'b',
          explanation: 'El rol delimita la óptica disciplinar técnica mientras reserva la aprobación final a los especialistas humanos.',
        },
        {
          id: 4,
          question: 'Para revisar 42 historias de usuario de una app bancaria y detectar ambigüedades que impidan escribir pruebas, ¿cuál alternativa define con mayor precisión la tarea y el objetivo?',
          options: [
            { id: 'a', text: 'Revisar las 42 historias y explicar cuáles deberían mejorarse y si parecen adecuadas.' },
            { id: 'b', text: 'Analizar las historias desde ingeniería de requisitos y entregar versiones mejoradas de las problemáticas.' },
            { id: 'c', text: 'Estudiar las historias y clasificarlas en claras o no claras con consejos generales.' },
            { id: 'd', text: 'Revisar cada historia de usuario buscando ambigüedades en actor, acción, condición y resultado esperado. Para cada hallazgo, identificar el fragmento que genera la ambigüedad, explicar por qué dificulta su verificación y señalar si requiere revisión del analista de requisitos.' },
          ],
          correctOptionId: 'd',
          explanation: 'Desglosa la tarea en componentes observables (actor, acción, condición, resultado) y vincula el hallazgo a su impacto en la verificabilidad.',
        },
        {
          id: 5,
          question: 'Se evalúan 3 arquitecturas de almacenamiento con presupuesto máximo y cuatro criterios: capacidad, disponibilidad, costo y escalabilidad, sin tecnologías externas. ¿Cuál opción establece mejor la tarea?',
          options: [
            { id: 'a', text: 'Comparar las 3 alternativas y elegir la más moderna completando con datos generales de infraestructura.' },
            { id: 'b', text: 'Analizar las características técnicas y económicas usando información externa si los datos son insuficientes.' },
            { id: 'c', text: 'Comparar exclusivamente las tres alternativas suministradas utilizando capacidad, disponibilidad, costo operativo y escalabilidad como criterios. Respetar el presupuesto máximo establecido, no incorporar soluciones externas y señalar explícitamente cualquier información que resulte insuficiente para evaluar un criterio.' },
            { id: 'd', text: 'Presentar una matriz de ventajas y desventajas añadiendo criterios de modernidad.' },
          ],
          correctOptionId: 'c',
          explanation: 'Confinamiento estricto a las 3 opciones, respeto al techo presupuestario y señalamiento explícito de datos insuficientes.',
        },
        {
          id: 6,
          question: 'En un proyecto ERP se revisan 38 requisitos funcionales para una sesión de depuración. ¿Cuál diseño de salida es más pertinente?',
          options: [
            { id: 'a', text: 'Un informe narrativo libre agrupado por el nivel de importancia que determine la IA.' },
            { id: 'b', text: 'Párrafos amplios con explicaciones de calidad y recomendaciones libres.' },
            { id: 'c', text: 'Resumen ejecutivo sin detalles de evidencia textual.' },
            { id: 'd', text: 'Solicitar una tabla con ID del requisito, fragmento analizado, tipo de problema, evidencia disponible, impacto sobre la verificabilidad y necesidad de revisión. Cada requisito debe conservar su identificación para facilitar la trazabilidad.' },
          ],
          correctOptionId: 'd',
          explanation: 'Una tabla estandarizada con ID y evidencia textual asegura la trazabilidad durante la reunión de depuración.',
        },
        {
          id: 7,
          question: 'Para comparar cuatro alternativas de arquitectura tecnológica integral, ¿cuál estrategia representa una descomposición adecuada?',
          options: [
            { id: 'a', text: 'Dividir el trabajo en etapas: organizar primero la información disponible; analizar posteriormente cada dimensión definida; comparar las alternativas utilizando criterios comunes; y finalmente sintetizar los hallazgos, indicando qué aspectos continúan requiriendo verificación.' },
            { id: 'b', text: 'Solicitar a la IA que decida autónomamente sus pasos de análisis y entregue solo la conclusión.' },
            { id: 'c', text: 'Pedir que elija primero la mejor alternativa y luego genere análisis que justifiquen esa elección.' },
            { id: 'd', text: 'Hacer una instrucción aislada para cada alternativa con recomendación final y elegir la respuesta más larga.' },
          ],
          correctOptionId: 'a',
          explanation: 'Descomposición por fases: organización de datos → análisis dimensional → matriz comparativa → síntesis con vacíos señalados.',
        },
        {
          id: 8,
          question: 'Una mesa de servicio registra subida en tiempos de respuesta en la semana 5 y aumento de tickets en la semana 6 sin datos de causalidad. ¿Cuál instrucción es rigurosa?',
          options: [
            { id: 'a', text: 'Analizar los registros y determinar las causas del aumento completando con patrones habituales.' },
            { id: 'b', text: 'Analizar los registros de las ocho semanas, identificar cambios y patrones directamente observables, separar los datos de las interpretaciones y señalar como hipótesis o aspectos por verificar cualquier explicación causal que no esté sustentada por los registros.' },
            { id: 'c', text: 'Determinar la causa más probable complementando variables faltantes con conocimientos del modelo.' },
            { id: 'd', text: 'Proponer acciones correctivas basadas en las causas inferidas por el modelo.' },
          ],
          correctOptionId: 'b',
          explanation: 'Prohíbe inventar vínculos causales y categoriza cualquier posible relación como hipótesis sujeta a verificación.',
        },
        {
          id: 9,
          question: 'Se necesitan mensajes para ocho estados de tickets con tono institucional sin agregar promesas o plazos no definidos. ¿Cuál instrucción representa mejor esta generación?',
          options: [
            { id: 'a', text: 'Analizar mensajes existentes y hacerlos más atractivos según diseño moderno.' },
            { id: 'b', text: 'Comparar con otras plataformas y adoptar las prácticas que la IA prefiera.' },
            { id: 'c', text: 'Explicar cómo debería comunicarse cada estado antes de que el equipo redacte.' },
            { id: 'd', text: 'Generar tres alternativas de mensaje para cada uno de los ocho estados proporcionados, manteniendo el significado original, utilizando el tono institucional suministrado y sin introducir condiciones, tiempos o compromisos que no estén definidos en la información del proyecto.' },
          ],
          correctOptionId: 'd',
          explanation: 'Generación controlada: fija cantidad de alternativas, preserva el significado y veta promesas no autorizadas.',
        },
        {
          id: 10,
          question: 'Para consolidar decisiones y pendientes de 21 actas heterogéneas con acuerdos repetidos y actualizados, ¿cuál instrucción representa una síntesis adecuada?',
          options: [
            { id: 'a', text: 'Seleccionar las decisiones más importantes y proponer decisiones para los pendientes vagos.' },
            { id: 'b', text: 'Comparar con actas de otros proyectos para sugerir prácticas de gestión.' },
            { id: 'c', text: 'Consolidar las decisiones y pendientes presentes en las 21 actas, agrupar información repetida, conservar los responsables explícitamente registrados, reflejar las actualizaciones posteriores y marcar como indeterminados los elementos que no puedan establecerse con la información disponible.' },
            { id: 'd', text: 'Generar un nuevo informe deduciendo qué debería hacer cada responsable.' },
          ],
          correctOptionId: 'c',
          explanation: 'Unifica información repetida, conserva responsables registrados, respeta la cronología y no inventa datos ausentes.',
        },
        {
          id: 11,
          question: 'Se evalúan 3 redes con 4 criterios (disponibilidad, costo, escalabilidad y complejidad) sin añadir datos no presentes en las fichas. ¿Cuál opción plantea una comparación estructurada?',
          options: [
            { id: 'a', text: 'Comparar las tres arquitecturas según los cuatro criterios definidos, presentar la evidencia disponible para cada criterio, señalar las diferencias entre alternativas y marcar como pendiente cualquier aspecto que no pueda establecerse con la información suministrada.' },
            { id: 'b', text: 'Comparar las arquitecturas y seleccionar la de mayor potencial completando con tendencias del mercado.' },
            { id: 'c', text: 'Analizar ventajas y recomendar la opción equilibrada resolviendo vacíos con experiencia general.' },
            { id: 'd', text: 'Seleccionar la que la IA prefiera añadiendo criterios adicionales sobre la marcha.' },
          ],
          correctOptionId: 'a',
          explanation: 'Compara con criterios homogéneos, cita evidencia de los documentos y declara pendientes los vacíos técnicos.',
        },
        {
          id: 12,
          question: 'Al revisar 50 requisitos de nómina con 4 criterios (cobertura, evidencia textual, confinamiento y reporte de vacíos), la IA incluye afirmaciones sin respaldo textual. ¿Cuál procedimiento corresponde?',
          options: [
            { id: 'a', text: 'Considerar válido el resultado por tener redacción profesional y estructura ordenada.' },
            { id: 'b', text: 'Comparar sistemáticamente el resultado con los cuatro criterios definidos, identificar qué hallazgos están respaldados, cuáles carecen de evidencia, qué información fue omitida y qué partes requieren revisión antes de utilizar el resultado.' },
            { id: 'c', text: 'Pedir explicaciones más detalladas y aceptar los hallazgos si suenan convincentes.' },
            { id: 'd', text: 'Evaluar solo la cantidad de problemas encontrados sin revisar la evidencia de origen.' },
          ],
          correctOptionId: 'b',
          explanation: 'Audita hallazgo por hallazgo contrastando con los criterios y separando afirmaciones respaldadas de las infundadas.',
        },
        {
          id: 13,
          question: 'En 30 incidencias de integración (errores, fechas y módulos), la IA concluye que la causa principal es falta de coordinación entre desarrollo e infraestructura, sin datos sobre relaciones de equipo. ¿Cómo debe tratarse esa conclusión?',
          options: [
            { id: 'a', text: 'Como conclusión válida porque es una explicación común en tecnología.' },
            { id: 'b', text: 'Como hallazgo demostrado indirectamente por la concentración de fallas en módulos integrados.' },
            { id: 'c', text: 'Como información complementaria que puede mantenerse si coincide con la intuición del equipo.' },
            { id: 'd', text: 'Clasificarla como una interpretación o afirmación que requiere verificación, porque los registros permiten identificar incidencias y módulos afectados, pero no aportan evidencia suficiente para confirmar esa causa.' },
          ],
          correctOptionId: 'd',
          explanation: 'Los datos registran fallas y fechas, pero no relaciones interpersonales; la conclusión es una inferencia no sustentada.',
        },
        {
          id: 14,
          question: 'La primera versión de clasificación de incidencias mezcló fallas con opiniones y en 5 casos inventó causas no documentadas. ¿Cuál refinamiento ataca estos problemas?',
          options: [
            { id: 'a', text: 'Añadir un rol de experto para que defina nuevas categorías a su criterio.' },
            { id: 'b', text: 'Pedir 3 respuestas adicionales y votar por la que más le guste a los desarrolladores.' },
            { id: 'c', text: 'Definir explícitamente las categorías de clasificación, exigir que cada hallazgo esté respaldado por información del registro, impedir que se presenten causas no documentadas como hechos y marcar los aspectos no sustentados para verificación.' },
            { id: 'd', text: 'Ampliar con datos teóricos de apps móviles para que la IA deduzca posibles causas.' },
          ],
          correctOptionId: 'c',
          explanation: 'Establece taxonomía estricta, exige cita del registro y prohíbe emitir causas especulativas como hechos.',
        },
        {
          id: 15,
          question: 'Se comparan dos versiones de prompt para requisitos. La Versión 2 exige evidencia textual y reporta vacíos, produciendo más hallazgos pero algunos aún sin cita. ¿Cómo determinar la mejora?',
          options: [
            { id: 'a', text: 'Comparar ambas versiones utilizando los mismos criterios, revisar qué deficiencias de la primera versión fueron corregidas, identificar cuáles persisten y analizar si los cambios introducidos en la segunda instrucción explican las diferencias observadas.' },
            { id: 'b', text: 'Elegir la versión 2 automáticamente porque contiene más texto y produjo más resultados.' },
            { id: 'c', text: 'Comparar solo los textos de los prompts sin evaluar los resultados entregados.' },
            { id: 'd', text: 'Seleccionar la respuesta que visualmente parezca más elegante.' },
          ],
          correctOptionId: 'a',
          explanation: 'La evaluación compara el comportamiento de ambas versiones bajo una matriz idéntica para verificar el progreso real.',
        },
        {
          id: 16,
          question: 'En un proyecto se necesita: 1) detectar inconsistencias en requisitos, 2) consolidar 12 actas y 3) redactar nuevos mensajes para usuarios. ¿Qué operaciones de IA corresponden?',
          options: [
            { id: 'a', text: 'Generación para requisitos, análisis para actas y comparación para mensajes.' },
            { id: 'b', text: 'Utilizar análisis para revisar los requisitos, síntesis para consolidar la información de las reuniones y generación para producir nuevas propuestas de mensajes bajo las condiciones definidas.' },
            { id: 'c', text: 'Transformación para requisitos, evaluación para actas y síntesis para mensajes.' },
            { id: 'd', text: 'Evaluación para las tres necesidades sin distinguir la operación cognitiva.' },
          ],
          correctOptionId: 'b',
          explanation: 'Análisis (examinar datos existentes), Síntesis (integrar múltiples fuentes) y Generación (producir nuevos borradores).',
        },
        {
          id: 17,
          question: 'Una estudiante aplicó IA a cambios del proyecto pero no documentó criterios, problemas detectados ni aspectos que requerían verificación antes de guardar en el portafolio. ¿Cuál valoración corresponde?',
          options: [
            { id: 'a', text: 'Validada porque la respuesta suena profesional y coincide en parte con los cambios.' },
            { id: 'b', text: 'Validada porque la respuesta es larga y no contiene faltas ortográficas.' },
            { id: 'c', text: 'Considerar incompleta la validación porque todavía no existe evidencia suficiente de cumplimiento de criterios, revisión de limitaciones y justificación de los aspectos que requieren verificación antes de considerar útil la aplicación.' },
            { id: 'd', text: 'Inválida para siempre porque la IA no sirve en gestión de proyectos.' },
          ],
          correctOptionId: 'c',
          explanation: 'Sin criterios documentados ni auditoría de limitaciones, la aplicación carece de rigor para considerarse validada.',
        },
        {
          id: 18,
          question: '¿Cuál es la secuencia correcta del ciclo metodológico completo de ingeniería de prompts trabajado en el módulo?',
          options: [
            { id: 'a', text: 'Resultado inicial → prompt final → evaluación → tarea → comparación → validación.' },
            { id: 'b', text: 'Tarea → resultado final → evaluación → prompt inicial → problema detectado → validación.' },
            { id: 'c', text: 'Prompt inicial → tarea → resultado → validación → refinamiento → nuevo resultado.' },
            { id: 'd', text: 'Tarea → prompt inicial → resultado → evaluación → problemas detectados → refinamiento → nuevo resultado → comparación → validación.' },
          ],
          correctOptionId: 'd',
          explanation: 'Secuencia completa del ciclo iterativo formal del Nivel 4.',
        },
        {
          id: 19,
          question: 'En el Laboratorio 1 (SIGA-TI, Semana 8), el estudiante recibe requisitos, historias, incidencias y notas de reunión para documentar una Ficha de aplicación de IA. ¿Cuál actuación corresponde a su propósito?',
          options: [
            { id: 'a', text: 'Seleccionar una aplicación conocida al azar y forzar la documentación del proyecto para justificarla.' },
            { id: 'b', text: 'Analizar la situación del proyecto, identificar una necesidad concreta, determinar qué actividad de gestión podría apoyarse mediante IA, justificar la aplicación seleccionada y posteriormente construir y ejecutar una instrucción que permita evaluar el resultado.' },
            { id: 'c', text: 'Pedir a la IA que revise todo el proyecto y determine por su cuenta la prioridad sin criterio humano.' },
            { id: 'd', text: 'Construir una instrucción compleja sin analizar la información disponible ni determinar datos necesarios.' },
          ],
          correctOptionId: 'b',
          explanation: 'El laboratorio exige diagnosticar la necesidad real del proyecto, acotar la actividad de apoyo y evaluar el resultado obtenido.',
        },
        {
          id: 20,
          question: 'Durante el Laboratorio 2 (SIGA-TI, Semana 9), al evaluar solicitudes de cambio (CAM-01 a CAM-04) y nuevas incidencias en el Registro de aplicación, ¿cómo deben tratarse las estimaciones de impacto?',
          options: [
            { id: 'a', text: 'Aceptar las estimaciones de días de atraso generadas por la IA como datos fidedignos para modificar el cronograma.' },
            { id: 'b', text: 'Diferenciar la información sustentada por los registros disponibles de las interpretaciones, señalando como aspecto que requiere verificación cualquier impacto no demostrable con los datos actuales.' },
            { id: 'c', text: 'Descartar todo uso de IA en cambios porque no se cuenta con métricas históricas de 10 proyectos pasados.' },
            { id: 'd', text: 'Permitir que la IA decida autónomamente cuáles solicitudes de cambio deben ser aprobadas o rechazadas.' },
          ],
          correctOptionId: 'b',
          explanation: 'El Registro de aplicación exige separar datos observados de estimaciones especulativas que requieren confirmación técnica.',
        },
        {
          id: 21,
          question: 'En la auditoría del Laboratorio 3 (Semana 10), la IA afirmó que "los problemas se deben a falta de coordinación de los desarrolladores". Al contrastar con INC-01 a INC-08, ¿cuál es el diagnóstico metodológico?',
          options: [
            { id: 'a', text: 'Es un hallazgo correcto porque los defectos de software siempre reflejan desorganización humana.' },
            { id: 'b', text: 'La IA atribuyó una causa no documentada y emitió un juicio sin evidencia, ya que los datos suministrados solo contenían descripción, prioridad, estado y módulo de las fallas.' },
            { id: 'c', text: 'La respuesta es válida si el director del proyecto sospecha que los desarrolladores no se comunican.' },
            { id: 'd', text: 'El fallo se debió a que la lista de incidencias era menor a 50 registros.' },
          ],
          correctOptionId: 'b',
          explanation: 'Atribuir causas interpersonales sin datos de desempeño constituye una alucinación causal no sustentada en la entrada.',
        },
        {
          id: 22,
          question: 'La instrucción inicial del Lab 3 pedía: "Analiza incidencias, explica qué está ocurriendo y señala qué debería hacer el equipo para solucionarlos". ¿Qué deficiencia de diseño provocó los sesgos en la respuesta?',
          options: [
            { id: 'a', text: 'El prompt era corto y no incluía un rol de gurú de aseguramiento de calidad.' },
            { id: 'b', text: 'El prompt solicitó "explicar qué está ocurriendo y qué debería hacer el equipo" de forma abierta, sin restringir el análisis a los datos objetivos ni prohibir inferencias causales no fundamentadas.' },
            { id: 'c', text: 'No se especificó la versión exacta del modelo de lenguaje que procesaba la solicitud.' },
            { id: 'd', text: 'Se organizó por módulo en lugar de organizar por fecha de creación.' },
          ],
          correctOptionId: 'b',
          explanation: 'Pedir explicaciones y soluciones abiertas sin restricciones instruccionales incita al modelo a especular causas y recomendar acciones no autorizadas.',
        },
        {
          id: 23,
          question: 'En el Reto Integrador (Lab 4, Semana 11), una condición obligatoria es que "la IA no debe sustituir decisiones que correspondan al equipo". ¿Cuál resultado cumple rigurosamente esta condición?',
          options: [
            { id: 'a', text: 'Un informe en el que la IA aprueba formalmente el paso a producción del módulo de solicitudes.' },
            { id: 'b', text: 'Una matriz estructurada que organiza evidencias y clasifica incidencias por severidad, señalando vacíos de información y dejando la priorización y decisión en manos de los líderes del proyecto.' },
            { id: 'c', text: 'Un plan de contingencia generado automáticamente que reasigna el presupuesto del proyecto sin revisión.' },
            { id: 'd', text: 'Un documento que determina de forma vinculante qué programadores deben ser reasignados a soporte técnico.' },
          ],
          correctOptionId: 'b',
          explanation: 'La IA actúa como herramienta de apoyo analítico estructurado; la priorización y la toma de decisiones permanecen bajo el criterio y responsabilidad humana.',
        },
        {
          id: 24,
          question: 'El Portafolio de aplicaciones de IA validadas consolida la Ficha (Lab 1), Registro (Lab 2), Informe (Lab 3) y Caso integral (Lab 4). ¿Qué demuestra este producto a nivel de competencias profesionales?',
          options: [
            { id: 'a', text: 'Que el estudiante puede generar textos extensos rápidamente con herramientas automáticas.' },
            { id: 'b', text: 'Que el profesional domina el ciclo metodológico completo de formulación, prueba, auditoría crítica, refinamiento y validación ética y verificable de IA en entornos TIC.' },
            { id: 'c', text: 'Que el estudiante reemplazó la necesidad de contar con analistas de requisitos y evaluadores en el equipo.' },
            { id: 'd', text: 'Que todas las respuestas de IA son infalibles si el prompt tiene más de tres párrafos.' },
          ],
          correctOptionId: 'b',
          explanation: 'El portafolio evidencia competencia en gobernanza, verificación empírica y uso crítico de IA generativa en proyectos.',
        },
        {
          id: 25,
          question: 'De acuerdo con el PMBOK® Guide y los fundamentos del Nivel 4, ¿cómo se aplica el principio de adaptación (tailoring) al diseño de instrucciones de IA para proyectos tecnológicos?',
          options: [
            { id: 'a', text: 'Aplicando siempre la misma plantilla genérica de prompt a cualquier tarea de gestión sin modificar sus componentes.' },
            { id: 'b', text: 'Ajustando deliberadamente los componentes del prompt (contexto, rol, restricciones, criterios y formato) a la complejidad, etapa del ciclo de vida y necesidad específica del proyecto TIC.' },
            { id: 'c', text: 'Utilizando únicamente modelos de lenguaje de código abierto para evitar dependencias de proveedores.' },
            { id: 'd', text: 'Traduciendo todas las instrucciones al idioma inglés para aumentar la velocidad del modelo.' },
          ],
          correctOptionId: 'b',
          explanation: 'Tailoring implica calibrar deliberadamente contexto, restricciones y criterios a la situación específica del proyecto tecnológico.',
        },
      ],
    },
  },
]

async function main() {
  console.log(`Reading course seed from ${SEED_FILE_PATH}...`)
  const fileRaw = await readFile(SEED_FILE_PATH, 'utf-8')
  const currentSeed = JSON.parse(fileRaw)

  // Filter out any existing module 13 or 14 to allow idempotent updates
  const existingModules: ModuleSeed[] = currentSeed.modules.filter(
    (m: ModuleSeed) => m.order !== 13 && m.order !== 14,
  )

  const newModule13: ModuleSeed = {
    title: 'Diseño, evaluación y mejora de instrucciones',
    order: 13,
    level: 4,
    levelTitle: 'Nivel 4: IA Generativa Aplicada',
    blocks: module13Blocks,
  }

  const newModule14: ModuleSeed = {
    title: 'Laboratorio de IA para proyectos tecnológicos',
    order: 14,
    level: 4,
    levelTitle: 'Nivel 4: IA Generativa Aplicada',
    blocks: module14Blocks,
  }

  const allModules: ModuleSeed[] = [...existingModules, newModule13, newModule14]

  console.log(`Validating all blocks across ${allModules.length} modules with Zod...`)
  let totalBlocks = 0
  for (const mod of allModules) {
    for (const b of mod.blocks) {
      parseBlockData(b.type, b.blockData)
      totalBlocks++
    }
  }

  console.log(`✓ All ${totalBlocks} blocks validated successfully against Zod schemas!`)

  const updatedCourseSeed = {
    ...currentSeed,
    course: {
      ...currentSeed.course,
      description: 'Nivel 1 a 4 · Fundamentos de Gestión de Proyectos con IA, Formulación, Ejecución y Laboratorio de IA Generativa Aplicada (PMBOK®).'
    },
    modules: allModules,
  }

  await writeFile(SEED_FILE_PATH, JSON.stringify(updatedCourseSeed, null, 2), 'utf-8')
  console.log(`✓ Successfully updated ${SEED_FILE_PATH} with Nivel 4 (Módulos 13 y 14)!`)
}

main().catch((err) => {
  console.error('Error generating level 4 seed:', err)
  process.exit(1)
})
