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
// MÓDULO 6: Problema, Oportunidad, Objetivos y Viabilidad (Nivel 2)
// =========================================================================
const module6Blocks: BlockSeed[] = [
  // Pantalla 1
  {
    type: 'TEXT',
    order: 1,
    blockData: {
      heading: 'Pantalla 1: ¿De dónde surge un proyecto?',
      content: 'Los proyectos surgen para generar un cambio. Ese cambio puede responder a un problema existente, una necesidad, una oportunidad, un requisito o una situación que requiere transformación.\n\nEn un proyecto TIC, identificar correctamente el punto de partida evita que el equipo seleccione una tecnología antes de comprender qué necesita resolver.\n\nCuando una organización dice "necesitamos una aplicación", todavía no tenemos suficiente información para formular el proyecto. La aplicación es una posible solución, pero primero debemos conocer la situación que origina la necesidad.\n\nEl análisis inicial debe permitir responder: ¿qué ocurre?, ¿a quién afecta?, ¿por qué importa? y ¿qué debería cambiar?\n\nEjemplo:\nLa universidad afirma: "Necesitamos una plataforma con IA."\nEl equipo investiga y descubre que:\n• Las solicitudes llegan por diferentes canales sin seguimiento centralizado.\n• Los estudiantes realizan consultas repetitivas.\n• Ahora existe una situación real que puede analizarse.',
    },
  },
  {
    type: 'QUIZ',
    order: 2,
    blockData: {
      question: 'La dirección propone desarrollar inmediatamente una aplicación. ¿Qué debería hacer primero el equipo?',
      options: [
        { id: 'a', text: 'Seleccionar la tecnología', isCorrect: false },
        { id: 'b', text: 'Diseñar las pantallas', isCorrect: false },
        { id: 'c', text: 'Analizar la situación que origina la iniciativa', isCorrect: true },
        { id: 'd', text: 'Contratar desarrolladores', isCorrect: false },
      ],
      explanation: 'La tecnología debe responder a una necesidad o problema identificado. Comenzar por la solución puede provocar que el proyecto resuelva algo que no era prioritario.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 3,
    blockData: {
      stepNumber: 1,
      title: 'Paso 1: Situación Inicial del Proyecto Nivel 2',
      instruction: 'Abre tu Plan Inicial / Backlog Integral del Nivel 2 y completa la situación inicial que pretende transformar tu proyecto:',
      fields: [
        { key: 'situacion_transformar', label: '¿Qué situación pretende transformar mi proyecto?', fieldType: 'textarea', maxWords: 120 },
        { key: 'afectados', label: '¿Quiénes están afectados?', fieldType: 'textarea', maxWords: 80 },
        { key: 'por_que_importa', label: '¿Por qué esta situación merece atención?', fieldType: 'textarea', maxWords: 100 },
      ],
      advice: 'Enfócate en los hechos y las personas afectadas, sin mencionar aún lenguajes de programación o tecnologías específicas.',
      pointsAwarded: 25,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 4,
    blockData: {
      title: 'Laboratorio de IA: Identificación del Punto de Partida',
      guidance: 'Copia el prompt guía, ejecútalo en ChatGPT u otro LLM con los datos de tu caso y reflexiona sobre el resultado.',
      role: 'Actúa como analista de proyectos TIC.',
      prompt: 'Actúa como analista de proyectos TIC. Analiza la siguiente situación y determina qué problema, necesidad u oportunidad podría estar originando la iniciativa. No propongas todavía una solución tecnológica y no inventes información que no esté presente:\n\nSituación: [Pega aquí la descripción de tu situación inicial]',
      toolUrl: 'https://chatgpt.com',
      reflectionQuestions: [
        '¿La IA identificó el mismo problema que tú o planteó una perspectiva diferente?',
        '¿Qué información adicional identificaste que debería validarse en la realidad?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 2
  {
    type: 'TEXT',
    order: 5,
    blockData: {
      heading: 'Pantalla 2: ¿Qué es un problema?',
      content: 'Un problema es una situación existente que representa una condición no deseada y que afecta a personas, procesos, organizaciones o resultados.\n\nEn proyectos TIC, formular correctamente el problema permite establecer posteriormente objetivos y alternativas de solución coherentes.\n\nUn problema debe describir lo que está ocurriendo, no la tecnología que queremos utilizar. Por eso, expresiones como "necesitamos una aplicación" o "debemos implementar IA" no constituyen por sí mismas una formulación del problema.\n\nUna buena formulación permite comprender la brecha entre la situación actual y la situación que se desea alcanzar.\n\n❌ Formulación incorrecta: "La universidad necesita una aplicación para gestionar solicitudes."\n\n✅ Formulación adecuada: "Los estudiantes tienen dificultades para consultar oportunamente el estado de sus solicitudes debido a que la información se encuentra distribuida entre diferentes canales de atención."',
    },
  },
  {
    type: 'QUIZ',
    order: 6,
    blockData: {
      question: '¿Cuál de las siguientes opciones representa mejor un problema?',
      options: [
        { id: 'a', text: 'Crear una aplicación móvil', isCorrect: false },
        { id: 'b', text: 'Implementar inteligencia artificial', isCorrect: false },
        { id: 'c', text: 'Los estudiantes tienen dificultades para conocer el estado de sus solicitudes', isCorrect: true },
        { id: 'd', text: 'Comprar una plataforma tecnológica', isCorrect: false },
      ],
      explanation: 'Un problema describe una situación actual no deseada que debe transformarse. Las otras opciones representan soluciones tecnológicas o decisiones de implementación.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 7,
    blockData: {
      stepNumber: 2,
      title: 'Paso 2: Problema Preliminar',
      instruction: 'Formula el problema preliminar completando las tres secciones clave:',
      fields: [
        { key: 'problema_actualmente', label: 'Actualmente, (describe la situación no deseada)...', fieldType: 'textarea', maxWords: 100 },
        { key: 'problema_afecta', label: 'Esto afecta principalmente a...', fieldType: 'textarea', maxWords: 60 },
        { key: 'problema_genera', label: 'La situación genera...', fieldType: 'textarea', maxWords: 80 },
      ],
      pointsAwarded: 25,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 8,
    blockData: {
      title: 'Laboratorio de IA: Diferenciación de Problema vs Solución',
      guidance: 'Usa el prompt para verificar que tu problema no esté sesgado hacia una solución tecnológica:',
      role: 'Auditor de formulación de proyectos TIC.',
      prompt: 'Analiza la siguiente descripción de un proyecto TIC. Identifica el problema central y diferencia entre problema, síntoma, causa, consecuencia y posible solución. No inventes información:\n\n[Pega aquí tu problema preliminar]',
      reflectionQuestions: [
        '¿Identificó la IA algún sesgo de solución tecnológica prematura en tu redacción?',
        '¿Qué elementos requieren mayor validación con datos reales?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 3
  {
    type: 'TEXT',
    order: 9,
    blockData: {
      heading: 'Pantalla 3: Problema, síntoma, causa y consecuencia',
      content: 'Diferenciar estos elementos permite evitar diagnósticos superficiales:\n\n• Síntoma: Manifestación observable del problema (ej. los estudiantes realizan consultas repetitivas).\n• Causa: Razón que explica por qué ocurre la situación (ej. la información está distribuida entre varios canales).\n• Problema Central: La situación no deseada que requiere transformación (ej. existe dificultad para realizar seguimiento de solicitudes).\n• Consecuencia: El efecto o impacto producido (ej. aumentan los tiempos de atención e inconformidad).\n\nPreguntas clave para analizar relaciones causales:\n- Causa: ¿Por qué ocurre?\n- Problema: ¿Qué situación necesita cambiar?\n- Consecuencia: ¿Qué ocurre como resultado?',
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 10,
    blockData: {
      title: 'Actividad: Síntoma, Causa, Problema y Consecuencia',
      instruction: 'Clasifica cada elemento del caso conductor según corresponda:',
      categories: ['Causa', 'Síntoma observable', 'Problema central', 'Consecuencia'],
      items: [
        { id: 'c1', text: 'Información distribuida entre varios canales', category: 'Causa' },
        { id: 'c2', text: 'Aumento repetitivo de consultas de estudiantes', category: 'Síntoma observable' },
        { id: 'c3', text: 'Dificultad para realizar seguimiento a las solicitudes', category: 'Problema central' },
        { id: 'c4', text: 'Retrasos en los tiempos de respuesta y atención', category: 'Consecuencia' },
      ],
      pointsAwarded: 30,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 11,
    blockData: {
      stepNumber: 3,
      title: 'Paso 3: Matriz Causal (Causas y Consecuencias)',
      instruction: 'Desglosa las posibles causas y consecuencias de tu proyecto:',
      fields: [
        { key: 'problema_central_refinado', label: 'Problema Central Refinado', fieldType: 'textarea', maxWords: 80 },
        { key: 'causas_lista', label: 'Posibles Causas (al menos 3):', fieldType: 'textarea', maxWords: 150 },
        { key: 'consecuencias_lista', label: 'Posibles Consecuencias (al menos 3):', fieldType: 'textarea', maxWords: 150 },
        { key: 'info_pendiente_validar', label: 'Información pendiente de validar en campo:', fieldType: 'textarea', maxWords: 100 },
      ],
      pointsAwarded: 30,
    },
  },

  // Pantalla 4
  {
    type: 'TEXT',
    order: 12,
    blockData: {
      heading: 'Pantalla 4: Evidencias y Necesidades',
      content: 'La evidencia permite sustentar que un problema existe. Puede provenir de datos, registros, entrevistas, encuestas, observaciones o indicadores.\n\nLas necesidades representan aquello que las personas, procesos u organizaciones requieren para mejorar la situación actual.\n\nNo es suficiente afirmar "los usuarios están inconformes"; debemos identificar cómo podemos comprobarlo objetivamente. Cuando aún no contamos con información suficiente, debemos declararlo como "Pendiente de validación" en lugar de inventar datos.\n\nEjemplo del caso:\n• Problema: Los estudiantes tienen dificultades para conocer el estado de sus solicitudes.\n• Evidencia: Los registros de atención muestran más de 450 consultas mensuales repetitivas.\n• Necesidad: Los estudiantes necesitan acceder oportunamente al estado trazable de sus solicitudes.',
    },
  },
  {
    type: 'QUIZ',
    order: 13,
    blockData: {
      question: '¿Cuál de las siguientes afirmaciones representa mejor una evidencia?',
      options: [
        { id: 'a', text: 'Creemos que los estudiantes están inconformes', isCorrect: false },
        { id: 'b', text: 'Los estudiantes necesitan una aplicación', isCorrect: false },
        { id: 'c', text: 'Los registros de atención muestran numerosas consultas sobre el estado de solicitudes', isCorrect: true },
        { id: 'd', text: 'La IA debería solucionar el problema', isCorrect: false },
      ],
      explanation: 'La evidencia debe permitir comprobar objetivamente una afirmación mediante datos o registros observables. Las demás representan percepciones o propuestas de solución.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 14,
    blockData: {
      stepNumber: 4,
      title: 'Paso 4: Registro de Evidencias y Necesidades',
      instruction: 'Documenta las evidencias que respaldan el problema y las necesidades identificadas:',
      fields: [
        { key: 'evidencias_tabla', label: 'Evidencias (Fuente y Estado: Por validar / Validada):', fieldType: 'textarea', maxWords: 150 },
        { key: 'necesidades_usuarios', label: 'Necesidades identificadas de los Usuarios:', fieldType: 'textarea', maxWords: 100 },
        { key: 'necesidades_organizacion', label: 'Necesidades identificadas de la Organización:', fieldType: 'textarea', maxWords: 100 },
      ],
      pointsAwarded: 25,
    },
  },

  // Pantalla 5
  {
    type: 'TEXT',
    order: 15,
    blockData: {
      heading: 'Pantalla 5: Árbol de problemas',
      content: 'El árbol de problemas es una herramienta visual que representa las relaciones lógicas entre las causas, el problema central y sus consecuencias:\n\n• Consecuencias (Hojas y Ramas): Efectos directos e indirectos.\n• Problema Central (Tronco): La situación focal que requiere ser transformada.\n• Causas (Raíces): Causas directas e indirectas que originan el problema.\n\nEsta estructura permite clarificar la lógica causal antes de diseñar objetivos o comprometer recursos técnicos.',
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 16,
    blockData: {
      stepNumber: 5,
      title: 'Paso 5: Árbol de Problemas Estructurado',
      instruction: 'Construye el árbol de problemas para tu proyecto integrador:',
      fields: [
        { key: 'causas_indirectas', label: 'Causas Indirectas (Raíces profundas):', fieldType: 'textarea', maxWords: 100 },
        { key: 'causas_directas', label: 'Causas Directas (Raíces inmediatas):', fieldType: 'textarea', maxWords: 100 },
        { key: 'problema_central_arbol', label: 'Problema Central (Tronco):', fieldType: 'textarea', maxWords: 80 },
        { key: 'consecuencias_directas', label: 'Consecuencias Directas (Ramas):', fieldType: 'textarea', maxWords: 100 },
        { key: 'consecuencias_indirectas', label: 'Consecuencias Indirectas (Efectos finales):', fieldType: 'textarea', maxWords: 100 },
      ],
      pointsAwarded: 35,
    },
  },

  // Pantalla 6
  {
    type: 'TEXT',
    order: 17,
    blockData: {
      heading: 'Pantalla 6: ¿Qué es una oportunidad?',
      content: 'Una oportunidad es una situación favorable que puede aprovecharse para generar valor, mejorar el desempeño, innovar, desarrollar nuevas capacidades o responder a cambios del entorno.\n\nUn proyecto puede surgir para resolver un problema, pero también para aprovechar una oportunidad favorable (como la disponibilidad de nuevas herramientas de IA, nuevas regulaciones o capacidades de integración cloud).\n\nIdentificar una oportunidad no significa comprar tecnología a ciegas: primero debemos determinar si existe valor suficiente y si las condiciones organizacionales permiten aprovecharla.',
    },
  },
  {
    type: 'SCENARIO',
    order: 18,
    blockData: {
      title: 'Escenario: Detección de Oportunidad de Innovación',
      situation: 'Una organización funciona adecuadamente en sus procesos de registro manual, pero una nueva tecnología de procesamiento de documentos con IA permitiría automatizar la extracción de datos.',
      choices: [
        { id: 'c1', text: 'Comprar inmediatamente licencias empresariales de la herramienta de IA.', isOptimal: false, feedback: 'Comprar software sin evaluar necesidades, viabilidad ni valor real genera gastos innecesarios y riesgo de no adopción.' },
        { id: 'c2', text: 'Analizar la oportunidad en términos de valor, viabilidad, riesgos y alineación estratégica antes de comprometer recursos.', isOptimal: true, feedback: '¡Excelente decisión! Una oportunidad debe evaluarse según su valor neto y capacidad de la organización para adoptarla.' },
        { id: 'c3', text: 'Rechazar la tecnología porque el proceso actual funciona y no debe cambiarse nunca.', isOptimal: false, feedback: 'Cerrarse a la innovación impide mejorar la competitividad y la eficiencia operativa.' },
      ],
      pointsAwarded: 25,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 19,
    blockData: {
      stepNumber: 6,
      title: 'Paso 6: Oportunidad y Valor Potencial',
      instruction: 'Define la oportunidad que tu proyecto TIC puede aprovechar:',
      fields: [
        { key: 'oportunidad_identificada', label: 'Oportunidad favorable identificada:', fieldType: 'textarea', maxWords: 100 },
        { key: 'valor_potencial', label: 'Valor potencial esperado (eficiencia, satisfacción, impacto):', fieldType: 'textarea', maxWords: 100 },
        { key: 'info_pendiente_oportunidad', label: 'Información pendiente de validar:', fieldType: 'textarea', maxWords: 80 },
      ],
      pointsAwarded: 25,
    },
  },

  // Pantalla 7, 8, 9, 10
  {
    type: 'TEXT',
    order: 20,
    blockData: {
      heading: 'Pantalla 7-10: De la Situación Actual a los Objetivos SMART',
      content: 'Un objetivo expresa una condición futura que el proyecto pretende alcanzar.\n\n• Objetivo General: Expresa el propósito principal del proyecto y resume la transformación esperada. Debe estar orientado a resultados y alineado al problema o la oportunidad.\n\n• Objetivos Específicos: Descomponen el objetivo general en resultados concretos y verificables.\n\nFórmula de transformación:\nSituación problemática actual ➔ Situación deseada ➔ Objetivo general orientado a valor.',
    },
  },
  {
    type: 'QUIZ',
    order: 21,
    blockData: {
      question: '¿Cuál de los siguientes objetivos está mejor formulado como Objetivo General?',
      options: [
        { id: 'a', text: 'Crear una aplicación móvil y programar un sistema', isCorrect: false },
        { id: 'b', text: 'Implementar inteligencia artificial porque está de moda', isCorrect: false },
        { id: 'c', text: 'Mejorar la trazabilidad y seguimiento de las solicitudes estudiantiles mediante una solución digital centralizada', isCorrect: true },
        { id: 'd', text: 'Comprar servidores en la nube para el departamento de TI', isCorrect: false },
      ],
      explanation: 'La opción C expresa claramente el resultado y la transformación esperada. Las demás se limitan a actividades o tecnologías.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'QUIZ',
    order: 22,
    blockData: {
      question: 'Al redactar objetivos específicos, ¿cuál de los siguientes NO está correctamente formulado?',
      options: [
        { id: 'a', text: 'Analizar el proceso actual de gestión de solicitudes', isCorrect: false },
        { id: 'b', text: 'Identificar los requisitos funcionales y no funcionales de los usuarios', isCorrect: false },
        { id: 'c', text: 'Hacer algo moderno con tecnología de punta', isCorrect: true },
        { id: 'd', text: 'Validar la solución digital con usuarios reales', isCorrect: false },
      ],
      explanation: '"Hacer algo moderno" es ambiguo, subjetivo y no permite comprobar de manera objetiva qué resultado verificable se pretende alcanzar.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 23,
    blockData: {
      stepNumber: 7,
      title: 'Paso 7: Objetivos General y Específicos del Proyecto',
      instruction: 'Formula el objetivo general y al menos 4 objetivos específicos verificables:',
      fields: [
        { key: 'objetivo_general', label: 'Objetivo General del Proyecto TIC:', fieldType: 'textarea', maxWords: 70 },
        { key: 'objetivo_esp_1', label: 'Objetivo Específico 1 (Diagnóstico/Análisis):', fieldType: 'text' },
        { key: 'objetivo_esp_2', label: 'Objetivo Específico 2 (Diseño/Requisitos):', fieldType: 'text' },
        { key: 'objetivo_esp_3', label: 'Objetivo Específico 3 (Desarrollo/Implementación):', fieldType: 'text' },
        { key: 'objetivo_esp_4', label: 'Objetivo Específico 4 (Validación/Despliegue):', fieldType: 'text' },
      ],
      pointsAwarded: 35,
    },
  },

  // Pantallas 11-16: Justificación y Viabilidad 5D
  {
    type: 'TEXT',
    order: 24,
    blockData: {
      heading: 'Pantalla 11-16: Justificación y Viabilidad 5D (Técnica, Económica, Operativa, Legal, Temporal)',
      content: 'Una iniciativa puede responder a un problema válido y aún así no ser viable bajo las condiciones actuales. Por ello evaluamos 5 dimensiones críticas:\n\n1. Viabilidad Técnica: ¿Se cuenta con las capacidades, arquitectura, integraciones y APIs alcanzables?\n2. Viabilidad Económica: ¿Los costos requeridos son compatibles con el presupuesto y el valor generado?\n3. Viabilidad Operativa: ¿Los usuarios y la organización tienen la capacidad y disposición para adoptar la solución?\n4. Viabilidad Legal: ¿Cumple con protección de datos personales (Habeas Data), licencias y regulaciones?\n5. Viabilidad Temporal: ¿El trabajo necesario puede completarse dentro del plazo y fechas límites disponibles?\n\nSemáforo de viabilidad:\n🟢 Favorable | 🟡 Condicionada | 🔴 Crítica',
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 25,
    blockData: {
      stepNumber: 8,
      title: 'Paso 8: Matriz 5D de Viabilidad y Justificación',
      instruction: 'Evalúa la situación actual y estado del semáforo para cada dimensión de viabilidad:',
      fields: [
        { key: 'justificacion_proyecto', label: 'Justificación (¿Por qué es necesario y qué valor aportará?):', fieldType: 'textarea', maxWords: 150 },
        { key: 'viabilidad_tecnica', label: 'Viabilidad Técnica (Estado: Favorable / Condicionada / Crítica y situación):', fieldType: 'textarea', maxWords: 80 },
        { key: 'viabilidad_economica', label: 'Viabilidad Económica (Presupuesto vs costos estimados):', fieldType: 'textarea', maxWords: 80 },
        { key: 'viabilidad_operativa', label: 'Viabilidad Operativa (Capacidad de adopción y capacitación):', fieldType: 'textarea', maxWords: 80 },
        { key: 'viabilidad_legal', label: 'Viabilidad Legal (Habeas Data, privacidad, términos):', fieldType: 'textarea', maxWords: 80 },
        { key: 'viabilidad_temporal', label: 'Viabilidad Temporal (Fecha límite y tiempo estimado):', fieldType: 'textarea', maxWords: 80 },
      ],
      pointsAwarded: 40,
    },
  },

  // Pantallas 17-21: Supuestos, Restricciones y Coherencia
  {
    type: 'TEXT',
    order: 26,
    blockData: {
      heading: 'Pantallas 17-21: Supuestos, Restricciones y Reto de Decisión',
      content: '• Supuesto: Condición que se considera verdadera para efectos de planificación y que debe validarse.\n• Restricción: Condición que limita las opciones o posibilidades del proyecto (presupuesto tope, plazo fijo, regulaciones).\n\nReto de Decisión (¿Continuar o Reformular?):\nCuando un proyecto tiene viabilidad técnica favorable pero viabilidad económica o temporal condicionada, la decisión profesional recomendada es: Continuar con condiciones, resolviendo las principales incertidumbres antes de comprometer inversiones mayores.',
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 27,
    blockData: {
      title: 'Actividad: Clasificación de Supuestos vs Restricciones',
      instruction: 'Clasifica cada enunciado según corresponda a un Supuesto o a una Restricción:',
      categories: ['Supuesto', 'Restricción'],
      items: [
        { id: 'sr1', text: 'Presupuesto máximo aprobado de $20 millones COP', category: 'Restricción' },
        { id: 'sr2', text: 'Se espera que los usuarios tengan acceso continuo a Internet', category: 'Supuesto' },
        { id: 'sr3', text: 'Fecha límite de entrega obligatoria en cuatro meses', category: 'Restricción' },
        { id: 'sr4', text: 'Se asume que el proveedor mantendrá disponible el servicio de API', category: 'Supuesto' },
      ],
      pointsAwarded: 30,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 28,
    blockData: {
      stepNumber: 9,
      title: 'Paso 9: Supuestos, Restricciones y Decisión de Viabilidad',
      instruction: 'Registra los supuestos, restricciones y la decisión formal de viabilidad:',
      fields: [
        { key: 'supuestos_lista', label: 'Supuestos iniciales (al menos 3):', fieldType: 'textarea', maxWords: 120 },
        { key: 'restricciones_lista', label: 'Restricciones iniciales (al menos 3):', fieldType: 'textarea', maxWords: 120 },
        { key: 'decision_viabilidad', label: 'Decisión preliminar (Continuar / Continuar con condiciones / Reformular / Detener) y justificación:', fieldType: 'textarea', maxWords: 100 },
        { key: 'registro_ia', label: 'Registro de uso de IA (Prompt utilizado, cambios propios y validaciones realizadas):', fieldType: 'textarea', maxWords: 120 },
      ],
      pointsAwarded: 35,
    },
  },

  // Pantalla 22: Microevaluación Módulo 6 (10 preguntas)
  {
    type: 'EXAM',
    order: 29,
    blockData: {
      title: 'Microevaluación Módulo 6: Formulación, Objetivos y Viabilidad',
      description: 'Demuestra tu comprensión de formulación de problemas TIC, árbol causal, objetivos SMART y viabilidad 5D.',
      questionsCount: 10,
      pointsPerQuestion: 10,
      passingScore: 70,
      badgeKey: 'formulador-proyectos',
      pointsAwarded: 100,
      questions: [
        {
          id: 1,
          question: '¿Cuál sería la formulación más adecuada del problema para la plataforma académica?',
          options: [
            { id: 'a', text: 'La universidad no tiene una aplicación móvil moderna.' },
            { id: 'b', text: 'La universidad necesita implementar inteligencia artificial.' },
            { id: 'c', text: 'Los estudiantes tienen dificultades para consultar oportunamente el estado de sus solicitudes debido a la dispersión de la información.' },
            { id: 'd', text: 'La universidad debe contratar desarrolladores para crear una aplicación.' },
          ],
          correctOptionId: 'c',
          explanation: 'El problema describe una situación real no deseada que debe transformarse, no una tecnología o actividad.',
        },
        {
          id: 2,
          question: '¿Cuál de las siguientes relaciones causales representa mejor la lógica del problema?',
          options: [
            { id: 'a', text: 'Consultas repetitivas → múltiples canales → problema central.' },
            { id: 'b', text: 'Múltiples canales sin integración → dificultad de seguimiento → consultas repetitivas y mayores tiempos de atención.' },
            { id: 'c', text: 'Aplicación móvil → inteligencia artificial → reducción de consultas.' },
            { id: 'd', text: 'Funcionarios → clientes → sistema tecnológico.' },
          ],
          correctOptionId: 'b',
          explanation: 'Establece la relación lógica directa entre la causa raíz, el problema central y las consecuencias observables.',
        },
        {
          id: 3,
          question: 'Un integrante afirma: "Estoy seguro de que los estudiantes están inconformes porque todos se quejan". ¿Qué debe hacer el equipo?',
          options: [
            { id: 'a', text: 'Utilizar la afirmación como evidencia suficiente porque el equipo conoce el entorno.' },
            { id: 'b', text: 'Pedir a la IA que invente estadísticas sobre la inconformidad.' },
            { id: 'c', text: 'Recopilar información verificable y registros que permitan validar la existencia y magnitud del problema.' },
            { id: 'd', text: 'Iniciar inmediatamente el desarrollo de software.' },
          ],
          correctOptionId: 'c',
          explanation: 'Las percepciones deben contrastarse con datos e información verificable antes de asumirlas como evidencia.',
        },
        {
          id: 4,
          question: 'Una empresa tiene un proceso que funciona pero consume muchas horas manuales; una nueva tecnología permitiría automatizarlo. ¿Cómo debe interpretarse?',
          options: [
            { id: 'a', text: 'Como un problema crítico que obliga a cancelar el proceso actual.' },
            { id: 'b', text: 'Como una oportunidad potencial que debe analizarse en términos de valor y viabilidad.' },
            { id: 'c', text: 'Como una obligación de comprar inmediatamente la nueva tecnología.' },
            { id: 'd', text: 'Como evidencia suficiente para aprobar el proyecto sin análisis.' },
          ],
          correctOptionId: 'b',
          explanation: 'Una oportunidad representa una opción favorable que debe evaluarse en función del valor neto, costos y viabilidad.',
        },
        {
          id: 5,
          question: '¿Cuál representa mejor un Objetivo General?',
          options: [
            { id: 'a', text: 'Desarrollar una aplicación móvil en Flutter.' },
            { id: 'b', text: 'Programar una base de datos relacional.' },
            { id: 'c', text: 'Mejorar la trazabilidad y seguimiento de las solicitudes mediante una solución digital centralizada.' },
            { id: 'd', text: 'Comprar servidores dedicados para el nuevo sistema.' },
          ],
          correctOptionId: 'c',
          explanation: 'Expresa el propósito y la transformación esperada, manteniendo trazabilidad directa con el problema.',
        },
        {
          id: 6,
          question: 'Sobre los objetivos específicos de un proyecto TIC, ¿cuál afirmación es correcta?',
          options: [
            { id: 'a', text: 'Todos los objetivos específicos deben comenzar con la palabra "Crear".' },
            { id: 'b', text: 'Son coherentes cuando descomponen el propósito general en resultados concretos orientados a alcanzarlo.' },
            { id: 'c', text: 'Solo debería existir un único objetivo específico por proyecto.' },
            { id: 'd', text: 'Deben limitarse a listar los nombres de las tecnologías utilizadas.' },
          ],
          correctOptionId: 'b',
          explanation: 'Los objetivos específicos descomponen el objetivo general en resultados verificables que guían las fases del proyecto.',
        },
        {
          id: 7,
          question: '¿Cuál de las siguientes justificaciones es más sólida para un proyecto TIC?',
          options: [
            { id: 'a', text: '"Debemos desarrollar la solución porque la inteligencia artificial es una tecnología moderna y popular."' },
            { id: 'b', text: '"El proyecto busca atender dificultades en el seguimiento de solicitudes, mejorar la disponibilidad de información y optimizar la atención."' },
            { id: 'c', text: 'Ambas son igualmente sólidas.' },
            { id: 'd', text: 'Los proyectos tecnológicos no requieren justificación de negocio.' },
          ],
          correctOptionId: 'b',
          explanation: 'Conecta la iniciativa con una necesidad concreta, beneficiarios reales y el valor esperado que justifica la inversión.',
        },
        {
          id: 8,
          question: 'La nueva plataforma debe integrarse con un sistema legado sin documentación técnica ni APIs conocidas. ¿Qué debe hacerse primero?',
          options: [
            { id: 'a', text: 'Comprar inmediatamente la nueva plataforma.' },
            { id: 'b', text: 'Asumir que la integración será automática y transparente.' },
            { id: 'c', text: 'Investigar las capacidades, dependencias y restricciones técnicas del sistema existente.' },
            { id: 'd', text: 'Eliminar el sistema legado sin realizar análisis de impacto.' },
          ],
          correctOptionId: 'c',
          explanation: 'La viabilidad técnica exige evaluar dependencias y restricciones antes de comprometer decisiones arquitectónicas.',
        },
        {
          id: 9,
          question: 'Un proyecto presenta beneficios potenciales pero todavía no ha estimado los costos de infraestructura, desarrollo ni operación. ¿Cuál debe ser la actuación?',
          options: [
            { id: 'a', text: 'Aprobar el proyecto porque los beneficios siempre superan los costos.' },
            { id: 'b', text: 'Cancelar el proyecto inmediatamente.' },
            { id: 'c', text: 'Realizar una estimación inicial de costos y contrastarla con los recursos y beneficios esperados.' },
            { id: 'd', text: 'Pedir a la IA que invente un presupuesto ficticio.' },
          ],
          correctOptionId: 'c',
          explanation: 'La viabilidad económica relaciona los recursos requeridos con el retorno de valor esperado antes de comprometer presupuesto.',
        },
        {
          id: 10,
          question: 'El proyecto tiene problema claro, solución técnicamente posible, pero presupuesto no confirmado y plazo ajustado. ¿Cuál es la decisión más adecuada?',
          options: [
            { id: 'a', text: 'Ejecutar inmediatamente sin importar el presupuesto.' },
            { id: 'b', text: 'Cancelar definitivamente el proyecto.' },
            { id: 'c', text: 'Continuar la formulación resolviendo las incertidumbres económicas, legales y temporales antes de comprometer la ejecución.' },
            { id: 'd', text: 'Dejar que la IA tome la decisión definitiva.' },
          ],
          correctOptionId: 'c',
          explanation: 'La incertidumbre controlada no exige cancelar, sino condicionar la ejecución a la mitigación de los riesgos críticos.',
        },
      ],
    },
  },
]

// =========================================================================
// MÓDULO 7: Interesados, Requisitos, Alcance y Entregables (Nivel 2)
// =========================================================================
const module7Blocks: BlockSeed[] = [
  // Pantalla 1-2
  {
    type: 'TEXT',
    order: 1,
    blockData: {
      heading: 'Pantalla 1-2: Stakeholders Internos y Externos',
      content: 'Los stakeholders o interesados son personas, grupos u organizaciones que pueden influir en el proyecto, verse afectados por sus decisiones o resultados, o percibir que sus intereses se ven impactados.\n\n• Internos: Patrocinador (Sponsor), equipo de TI, usuarios directos, directivos, área jurídica, seguridad informática.\n• Externos: Proveedores cloud, consultores, usuarios externos, entidades reguladoras y aliados.\n\nUn error frecuente es entrevistar únicamente al usuario final: seguridad informática puede imponer restricciones de protección de datos, y el área jurídica puede definir condiciones normativas ineludibles.',
    },
  },
  {
    type: 'QUIZ',
    order: 2,
    blockData: {
      question: 'La universidad afirma: "Solo necesitamos entrevistar a los estudiantes porque ellos utilizarán la plataforma". ¿Es correcta esta decisión?',
      options: [
        { id: 'a', text: 'Sí, porque son los únicos que interactúan con la interfaz', isCorrect: false },
        { id: 'b', text: 'No, porque existen otros interesados (TI, seguridad, administración) que aportan requisitos y restricciones críticas', isCorrect: true },
        { id: 'c', text: 'Sí, para evitar reuniones innecesarias', isCorrect: false },
        { id: 'd', text: 'No, porque solo la dirección debe tomar decisiones', isCorrect: false },
      ],
      explanation: 'Omitir a áreas como seguridad o soporte genera requisitos incompletos y reprocesos técnicos mayores.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 3,
    blockData: {
      stepNumber: 10,
      title: 'Paso 10: Registro Inicial de Stakeholders (Internos y Externos)',
      instruction: 'Identifica al menos 4 stakeholders clave para tu iniciativa TIC:',
      fields: [
        { key: 'sh1_datos', label: 'Stakeholder 1 (Nombre/Grupo, Rol, Interno/Externo, Necesidad principal):', fieldType: 'textarea', maxWords: 80 },
        { key: 'sh2_datos', label: 'Stakeholder 2 (Nombre/Grupo, Rol, Interno/Externo, Necesidad principal):', fieldType: 'textarea', maxWords: 80 },
        { key: 'sh3_datos', label: 'Stakeholder 3 (Seguridad / Soporte / Jurídica):', fieldType: 'textarea', maxWords: 80 },
        { key: 'sh4_datos', label: 'Stakeholder 4 (Patrocinador / Directivo):', fieldType: 'textarea', maxWords: 80 },
      ],
      pointsAwarded: 25,
    },
  },

  // Pantalla 3-5: Poder, Interés, Influencia y Comunicación
  {
    type: 'TEXT',
    order: 4,
    blockData: {
      heading: 'Pantalla 3-5: Matriz Poder-Interés y Estrategia de Comunicación',
      content: '• Poder: Capacidad para influir en recursos, decisiones o resultados del proyecto.\n• Interés: Nivel de atención o preocupación frente al proyecto.\n\nCuadrantes de Gestión:\n- Alto Poder / Alto Interés: Gestionar atentamente (comunicación cercana y frecuente).\n- Alto Poder / Bajo Interés: Mantener satisfecho.\n- Bajo Poder / Alto Interés: Mantener informado.\n- Bajo Poder / Bajo Interés: Monitorear.\n\nLa actitud (favorable, neutral o resistente) determina además la estrategia de involucramiento para mitigar resistencias al cambio.',
    },
  },
  {
    type: 'QUIZ',
    order: 5,
    blockData: {
      question: 'Un patrocinador institucional que tiene autoridad para aprobar el presupuesto y participa activamente en el comité, ¿dónde debe ubicarse?',
      options: [
        { id: 'a', text: 'Bajo poder / Bajo interés', isCorrect: false },
        { id: 'b', text: 'Bajo poder / Alto interés', isCorrect: false },
        { id: 'c', text: 'Alto poder / Bajo interés', isCorrect: false },
        { id: 'd', text: 'Alto poder / Alto interés', isCorrect: true },
      ],
      explanation: 'Tiene alta autoridad sobre los recursos y alto interés en los resultados; requiere gestión y comunicación cercana.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 6,
    blockData: {
      stepNumber: 11,
      title: 'Paso 11: Matriz Poder-Interés y Plan de Comunicación',
      instruction: 'Asigna prioridad y estrategia de comunicación a tus stakeholders:',
      fields: [
        { key: 'matriz_poder_interes', label: 'Matriz Poder e Interés (Stakeholder, Poder A/M/B, Interés A/M/B, Cuadrante):', fieldType: 'textarea', maxWords: 120 },
        { key: 'estrategia_comunicacion', label: 'Plan de Comunicación (Stakeholder, Información a transmitir, Canal, Frecuencia):', fieldType: 'textarea', maxWords: 120 },
      ],
      pointsAwarded: 30,
    },
  },

  // Pantallas 6-10: De la Necesidad a los Requisitos MoSCoW
  {
    type: 'TEXT',
    order: 7,
    blockData: {
      heading: 'Pantallas 6-10: Requisitos Funcionales, No Funcionales y MoSCoW',
      content: 'Secuencia fundamental: Necesidad ➔ Requisito ➔ Solución\n\n• Requisitos Funcionales (RF): Qué debe hacer el sistema (ej. permitir registro de solicitudes, enviar alertas por correo).\n• Requisitos No Funcionales (RNF): Criterios de calidad, seguridad, rendimiento y disponibilidad (ej. tiempo de respuesta < 2s, cifrado TLS 1.3, disponibilidad 99.5%).\n\nPriorización MoSCoW:\n- Must have: Indispensable para que la solución funcione y aporte valor mínimo.\n- Should have: Importante pero no crítico para el lanzamiento inicial.\n- Could have: Deseable si sobran recursos o tiempo.\n- Won’t have: Explícitamente fuera del alcance de la versión actual.',
    },
  },
  {
    type: 'QUIZ',
    order: 8,
    blockData: {
      question: '¿Cuál de los siguientes corresponde a un Requisito No Funcional?',
      options: [
        { id: 'a', text: 'Permitir que los usuarios creen una cuenta con correo y contraseña', isCorrect: false },
        { id: 'b', text: 'Permitir que los administradores generen reportes mensuales', isCorrect: false },
        { id: 'c', text: 'Permitir consultar el estado de la solicitud ingresando el número de radicado', isCorrect: false },
        { id: 'd', text: 'Garantizar que la información sensible almacenada esté protegida mediante cifrado AES-256', isCorrect: true },
      ],
      explanation: 'El cifrado AES-256 define una condición de seguridad y calidad técnica, mientras que las otras son funcionalidades del sistema.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'QUIZ',
    order: 9,
    blockData: {
      question: '¿Cuál de los siguientes requisitos está mejor formulado por ser específico y objetivamente verificable?',
      options: [
        { id: 'a', text: 'El sistema deberá ofrecer un nivel de seguridad muy alto para proteger a todos', isCorrect: false },
        { id: 'b', text: 'El sistema deberá funcionar correctamente y brindar una buena experiencia', isCorrect: false },
        { id: 'c', text: 'El sistema deberá bloquear la cuenta después de cinco intentos fallidos consecutivos de autenticación', isCorrect: true },
        { id: 'd', text: 'El sistema deberá contar con una interfaz moderna y atractiva', isCorrect: false },
      ],
      explanation: 'Establece una condición medible y comprobable mediante pruebas de software. Las demás opciones usan adjetivos subjetivos.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 10,
    blockData: {
      stepNumber: 12,
      title: 'Paso 12: Catálogo de Requisitos y Priorización MoSCoW',
      instruction: 'Registra los requisitos funcionales y no funcionales clasificados con MoSCoW:',
      fields: [
        { key: 'rf_must', label: 'Requisitos Funcionales MUST (Indispensables):', fieldType: 'textarea', maxWords: 120 },
        { key: 'rf_should_could', label: 'Requisitos Funcionales SHOULD y COULD:', fieldType: 'textarea', maxWords: 120 },
        { key: 'rnf_calidad', label: 'Requisitos No Funcionales (Seguridad, Rendimiento, Disponibilidad):', fieldType: 'textarea', maxWords: 120 },
        { key: 'wont_have', label: "Requisitos WON'T HAVE (Fuera del alcance de esta versión):", fieldType: 'textarea', maxWords: 80 },
      ],
      pointsAwarded: 35,
    },
  },

  // Pantallas 11-16: Alcance, Exclusiones, Entregables y EDT
  {
    type: 'TEXT',
    order: 11,
    blockData: {
      heading: 'Pantallas 11-16: Alcance, Exclusiones, Entregables y EDT/WBS',
      content: 'El alcance define las fronteras del proyecto: qué incluye y qué se excluye formalmente.\n\n• Entregable: Un resultado tangible, verificable y comprobable (ej. "Módulo de radicación desplegado y validado", NO "programar pantallas" que es una actividad).\n• Criterios de Aceptación: Condiciones medibles que determinan si el entregable satisface los requisitos.\n• EDT/WBS (Estructura de Desglose del Trabajo): Descomposición jerárquica orientada a entregables.',
    },
  },
  {
    type: 'QUIZ',
    order: 12,
    blockData: {
      question: '¿Cuál de las siguientes opciones representa un entregable verificable (y no una actividad)?',
      options: [
        { id: 'a', text: 'Programar el módulo de usuarios', isCorrect: false },
        { id: 'b', text: 'Realizar reuniones de seguimiento semanal', isCorrect: false },
        { id: 'c', text: 'Sistema de autenticación funcional y validado con pruebas de seguridad', isCorrect: true },
        { id: 'd', text: 'Analizar los requisitos de la base de datos', isCorrect: false },
      ],
      explanation: 'Un entregable es el producto final verificable. Las otras opciones son actividades (verbos en infinitivo que representan el esfuerzo).',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 13,
    blockData: {
      stepNumber: 13,
      title: 'Paso 13: Alcance, Entregables y Criterios de Aceptación',
      instruction: 'Define el alcance positivo, exclusiones y lista de entregables principales:',
      fields: [
        { key: 'alcance_inclusiones', label: 'Inclusiones del Alcance (Qué abarca el proyecto):', fieldType: 'textarea', maxWords: 120 },
        { key: 'alcance_exclusiones', label: 'Exclusiones formales (Qué NO incluye explícitamente):', fieldType: 'textarea', maxWords: 100 },
        { key: 'entregables_principales', label: 'Entregables Principales (E01 a E04) y Criterios de Aceptación:', fieldType: 'textarea', maxWords: 150 },
        { key: 'edt_jerarquia', label: 'Estructura de Desglose del Trabajo (EDT/WBS jerárquica):', fieldType: 'textarea', maxWords: 120 },
      ],
      pointsAwarded: 35,
    },
  },

  // Pantallas 17-23: Cambios, Deuda Técnica, Enfoque y Auditoría IA
  {
    type: 'TEXT',
    order: 14,
    blockData: {
      heading: 'Pantallas 17-23: Cambios, Deuda Técnica, Enfoque y Seguridad',
      content: '• Gestión de Cambios: Ninguna solicitud se incorpora automáticamente. Primero se evalúa impacto en alcance, tiempo, costo, riesgo y valor.\n• Deuda Técnica: Decisión consciente de implementar una solución simplificada temporal para ganar velocidad, documentando la obligación de refactorizarla posteriormente.\n• Enfoque de Desarrollo: Predictivo (requisitos estables), Ágil (alta incertidumbre e iteración), Híbrido (combina infraestructura planificada con software iterativo).',
    },
  },
  {
    type: 'QUIZ',
    order: 15,
    blockData: {
      question: 'Durante el desarrollo, un stakeholder solicita agregar un módulo de pagos en línea que no estaba en el alcance. ¿Qué debe hacer el equipo?',
      options: [
        { id: 'a', text: 'Incorporarlo de inmediato para complacer al stakeholder', isCorrect: false },
        { id: 'b', text: 'Rechazarlo automáticamente sin ningún análisis', isCorrect: false },
        { id: 'c', text: 'Analizar su impacto en valor, alcance, recursos, tiempo, costos y riesgos antes de someterlo al control de cambios', isCorrect: true },
        { id: 'd', text: 'Programarlo en secreto fuera de horario laboral', isCorrect: false },
      ],
      explanation: 'Cualquier modificación al alcance debe someterse a evaluación integrada de cambios para evitar el desborde no controlado (scope creep).',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 16,
    blockData: {
      stepNumber: 14,
      title: 'Paso 14: Gestión de Cambios, Deuda Técnica y Enfoque',
      instruction: 'Consolida la estrategia de cambios, deuda técnica y enfoque:',
      fields: [
        { key: 'procedimiento_cambios', label: 'Estrategia de Control de Cambios y Versiones:', fieldType: 'textarea', maxWords: 80 },
        { key: 'deuda_tecnica_registro', label: 'Registro de Deuda Técnica Consciente (Decisión, Riesgo y Plan de pago):', fieldType: 'textarea', maxWords: 100 },
        { key: 'enfoque_seleccionado', label: 'Enfoque seleccionado (Predictivo / Ágil / Híbrido) y Justificación:', fieldType: 'textarea', maxWords: 100 },
      ],
      pointsAwarded: 30,
    },
  },

  // Pantalla 24: Microevaluación Módulo 7 (4 preguntas)
  {
    type: 'EXAM',
    order: 17,
    blockData: {
      title: 'Microevaluación Módulo 7: Interesados, Requisitos y Alcance',
      description: 'Valida tus conocimientos en gestión de stakeholders, requisitos verificables, EDT y control del alcance.',
      questionsCount: 4,
      pointsPerQuestion: 25,
      passingScore: 75,
      badgeKey: 'arquitecto-alcance',
      pointsAwarded: 100,
      questions: [
        {
          id: 1,
          question: 'Durante la identificación de interesados no se incluyó al área de seguridad informática, aunque establece políticas obligatorias. ¿Qué debería hacer el equipo?',
          options: [
            { id: 'a', text: 'Mantener únicamente a los usuarios directos de la plataforma.' },
            { id: 'b', text: 'Incluir al área de seguridad como stakeholder y analizar sus requisitos e influencia.' },
            { id: 'c', text: 'Incluirla únicamente cuando comience la fase de pruebas finales.' },
            { id: 'd', text: 'Permitir que la inteligencia artificial decida si debe participar.' },
          ],
          correctOptionId: 'b',
          explanation: 'Seguridad es un interesado clave porque impone restricciones obligatorias que deben considerarse desde el inicio.',
        },
        {
          id: 2,
          question: 'Un usuario afirma: "Necesitamos una aplicación móvil porque es más moderna". El equipo aún no conoce la necesidad real. ¿Qué debe hacer primero?',
          options: [
            { id: 'a', text: 'Incorporar inmediatamente la aplicación móvil al alcance.' },
            { id: 'b', text: 'Crear una tarea para programar la aplicación.' },
            { id: 'c', text: 'Investigar la necesidad y el problema antes de definir la solución tecnológica.' },
            { id: 'd', text: 'Utilizar IA para determinar automáticamente cuál debe ser la solución.' },
          ],
          correctOptionId: 'c',
          explanation: 'La aplicación móvil es una solución potencial. Primero debe comprenderse qué necesidad o brecha se busca resolver.',
        },
        {
          id: 3,
          question: 'Entre los requisitos se encuentra: "el sistema debe ser fácil de usar", pero no existe ningún criterio de comprobación. ¿Qué debe hacerse?',
          options: [
            { id: 'a', text: 'Mantener el requisito porque todos entienden intuitivamente su significado.' },
            { id: 'b', text: 'Eliminarlo porque los requisitos no funcionales no son necesarios.' },
            { id: 'c', text: 'Reformularlo para establecer condiciones objetivas y verificables (ej. tasa de éxito en tareas de usuario).' },
            { id: 'd', text: 'Pedir a la IA que determine si el requisito está cumplido.' },
          ],
          correctOptionId: 'c',
          explanation: 'Los requisitos deben ser verificables para evitar ambigüedades durante la aceptación y las pruebas.',
        },
        {
          id: 4,
          question: 'El cliente solicita un módulo de pagos que aportaría valor pero aumentaría tiempo, recursos y riesgos. ¿Cuál es la acción correcta?',
          options: [
            { id: 'a', text: 'Incorporarlo inmediatamente porque el cliente lo solicitó.' },
            { id: 'b', text: 'Rechazarlo automáticamente porque no estaba en el alcance.' },
            { id: 'c', text: 'Analizar su impacto en valor, alcance, recursos, tiempo, costos y riesgos antes de decidir.' },
            { id: 'd', text: 'Incorporarlo a la EDT y evaluar las consecuencias después de haberlo construido.' },
          ],
          correctOptionId: 'c',
          explanation: 'Todo cambio debe someterse a análisis de impacto multidimensional antes de ser aprobado o rechazado.',
        },
      ],
    },
  },
]

// =========================================================================
// MÓDULO 8: Cronograma, Recursos y Costos (Nivel 2)
// =========================================================================
const module8Blocks: BlockSeed[] = [
  // Pantalla 1-4: Del Alcance al Cronograma y Descomposición
  {
    type: 'TEXT',
    order: 1,
    blockData: {
      heading: 'Pantalla 1-4: Del Alcance a la Descomposición de Actividades',
      content: 'Planificar significa determinar qué trabajo debe realizarse, cuándo, con qué recursos y bajo qué condiciones.\n\nPara construir el cronograma, cada entregable de la EDT debe descomponerse en actividades manejables (ej. Diseñar interfaz, Desarrollar API, Configurar base de datos, Probar integración).\n\nUna actividad demasiado general (ej. "hacer el sistema") oculta trabajos dispares e impide un seguimiento real de los avances.',
    },
  },
  {
    type: 'QUIZ',
    order: 2,
    blockData: {
      question: '¿Cuál de las siguientes opciones representa mejor un cronograma?',
      options: [
        { id: 'a', text: 'Una lista de funcionalidades deseadas por el usuario', isCorrect: false },
        { id: 'b', text: 'Una lista del personal contratado en el proyecto', isCorrect: false },
        { id: 'c', text: 'Actividades organizadas temporalmente con duración, dependencias, hitos y fechas', isCorrect: true },
        { id: 'd', text: 'Una matriz de riesgos del departamento de TI', isCorrect: false },
      ],
      explanation: 'El cronograma es un modelo dinámico que organiza el trabajo en el tiempo con dependencias y secuencias lógicas.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 3,
    blockData: {
      stepNumber: 15,
      title: 'Paso 15: Descomposición de Entregables en Actividades',
      instruction: 'Descompón los principales entregables en actividades específicas y estimables:',
      fields: [
        { key: 'actividades_diseno', label: 'Actividades de Análisis y Diseño (A01 - A04):', fieldType: 'textarea', maxWords: 120 },
        { key: 'actividades_desarrollo', label: 'Actividades de Desarrollo y Configuración (A05 - A08):', fieldType: 'textarea', maxWords: 120 },
        { key: 'actividades_pruebas', label: 'Actividades de Pruebas y Despliegue (A09 - A12):', fieldType: 'textarea', maxWords: 120 },
      ],
      pointsAwarded: 30,
    },
  },

  // Pantalla 5-10: Duración, Dependencias, Hitos y Restricciones
  {
    type: 'TEXT',
    order: 4,
    blockData: {
      heading: 'Pantalla 5-10: Duración, Esfuerzo, Dependencias y Hitos',
      content: '• Esfuerzo vs Duración: Esfuerzo es la cantidad de horas netas de trabajo (ej. 24 horas). Duración es el tiempo calendario necesario considerando la jornada disponible (ej. 24h ÷ 6h/día = 4 días calendario).\n\n• Relaciones de Dependencia: Fin-Inicio (FS, la más común: una actividad debe terminar para que inicie la siguiente), Inicio-Inicio (SS), Fin-Fin (FF).\n\n• Hito: Acontecimiento significativo de duración cero que marca un logro o aprobación (ej. "Requisitos aprobados", "MVP disponible en staging").',
    },
  },
  {
    type: 'QUIZ',
    order: 5,
    blockData: {
      question: 'La actividad B (Pruebas de conexión) no puede comenzar hasta que la actividad A (Configurar base de datos) haya terminado. ¿Qué tipo de relación lógica existe?',
      options: [
        { id: 'a', text: 'Inicio – Inicio', isCorrect: false },
        { id: 'b', text: 'Fin – Inicio', isCorrect: true },
        { id: 'c', text: 'Fin – Fin', isCorrect: false },
        { id: 'd', text: 'Inicio – Fin', isCorrect: false },
      ],
      explanation: 'La relación Fin - Inicio (FS) indica que la sucesora solo puede comenzar cuando la predecesora haya concluido.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 6,
    blockData: {
      stepNumber: 16,
      title: 'Paso 16: Secuencia Lógica, Dependencias e Hitos',
      instruction: 'Establece las relaciones de precedencia y define los hitos clave:',
      fields: [
        { key: 'tabla_dependencias', label: 'Tabla de Dependencias (Actividad, Predecesora, Tipo de relación):', fieldType: 'textarea', maxWords: 120 },
        { key: 'hitos_proyecto', label: 'Hitos Principales (H01 a H04 con fecha estimada y criterio de cumplimiento):', fieldType: 'textarea', maxWords: 120 },
        { key: 'restricciones_temporales', label: 'Restricciones de Calendario (Ventanas de mantenimiento, vacaciones, fechas límite):', fieldType: 'textarea', maxWords: 80 },
      ],
      pointsAwarded: 30,
    },
  },

  // Pantalla 11-15: Ruta Crítica, Holgura y Diagrama de Gantt
  {
    type: 'TEXT',
    order: 7,
    blockData: {
      heading: 'Pantalla 11-15: Ruta Crítica, Holgura y Diagrama de Gantt',
      content: '• **Ruta Crítica (CPM):** La secuencia más larga de actividades dependientes que determina la duración mínima total del proyecto. Cualquier retraso en una actividad de la ruta crítica retrasará la fecha final del proyecto.\n\n• **Holgura:** Margen de tiempo que una actividad puede retrasarse sin afectar la fecha de finalización del proyecto. Las actividades sobre la ruta crítica tienen holgura cero (0).\n\n• **Diagrama de Red y Ruta Crítica:**\nRuta A: Análisis (3 días) → Diseño (5 días) → Desarrollo (4 días) = **12 días**\nRuta B: Configuración (2 días) → Pruebas (3 días) → Documentación (2 días) = **7 días**\nDuración mínima del proyecto = **12 días** (determinada por la Ruta A).\n\n![Diagrama de Red del Proyecto - Ruta Crítica](/images/ruta-critica-diagrama.png)',
    },
  },
  {
    type: 'QUIZ',
    order: 8,
    blockData: {
      question: 'En el diagrama de red del proyecto, la **Ruta A** es la ruta crítica y está compuesta por:\n\n![Detalle de la Ruta A](/images/ruta-critica-ruta-a.png)\n\nLa actividad **A2 – Diseño** aumenta su duración de 5 a 8 días debido a un retraso en la validación del diseño. ¿Qué podría suceder con la duración del proyecto?',
      options: [
        { id: 'a', text: 'La duración del proyecto disminuirá 3 días', isCorrect: false },
        { id: 'b', text: 'La duración del proyecto aumentará en 3 días si no se aplica una acción compensatoria', isCorrect: true },
        { id: 'c', text: 'La duración no cambiará porque las demás actividades mantienen su duración', isCorrect: false },
        { id: 'd', text: 'La ruta crítica desaparecerá automáticamente', isCorrect: false },
      ],
      explanation: 'Al pertenecer a la ruta crítica (holgura cero), cualquier retraso desplaza directamente la fecha final del proyecto.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 9,
    blockData: {
      stepNumber: 17,
      title: 'Paso 17: Ruta Crítica y Estructura del Diagrama de Gantt',
      instruction: 'Identifica la ruta crítica preliminar y la representación temporal en Gantt:',
      fields: [
        { key: 'ruta_critica_calculo', label: 'Cálculo de Ruta Crítica (Actividades críticas, duraciones y holgura):', fieldType: 'textarea', maxWords: 120 },
        { key: 'esquema_gantt', label: 'Cronograma / Esquema Gantt (Semanas 1 a N con actividades solapadas):', fieldType: 'textarea', maxWords: 150 },
        { key: 'monitoreo_desviaciones', label: 'Estrategia de Seguimiento y Control ante Desviaciones:', fieldType: 'textarea', maxWords: 80 },
      ],
      pointsAwarded: 35,
    },
  },

  // Pantallas 16-22: Recursos Humanos, Tecnológicos y Financieros
  {
    type: 'TEXT',
    order: 10,
    blockData: {
      heading: 'Pantallas 16-22: Gestión Integral de Recursos y Capacidad',
      content: 'Los recursos incluyen todo lo necesario para ejecutar el trabajo:\n\n• Humanos: Desarrolladores, UX/UI, ciberseguridad, testers, líderes de proyecto.\n• Tecnológicos: Servidores cloud, bases de datos, licencias IDE, APIs de terceros.\n• Materiales/Servicios: Equipos físicos, certificados SSL, conectividad.\n• Financieros: Presupuesto asignado y flujo de caja.\n\nSobreasignación y Cuellos de Botella:\nSi un recurso tiene 20 horas disponibles y se le asignan 30 horas, se genera sobreasignación. Si múltiples actividades críticas dependen de un único especialista, se crea un cuello de botella que debe resolverse equilibrando la carga.',
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 11,
    blockData: {
      title: 'Actividad: Clasificación de Recursos del Proyecto TIC',
      instruction: 'Clasifica cada recurso según su tipología:',
      categories: ['Humano', 'Tecnológico', 'Material', 'Financiero'],
      items: [
        { id: 'r1', text: 'Diseñador UX / UI', category: 'Humano' },
        { id: 'r2', text: 'Servidor en la nube AWS / Azure', category: 'Tecnológico' },
        { id: 'r3', text: 'Presupuesto asignado de $45 millones COP', category: 'Financiero' },
        { id: 'r4', text: 'Dispositivo físico móvil para pruebas en sitio', category: 'Material' },
        { id: 'r5', text: 'Especialista en Ciberseguridad', category: 'Humano' },
        { id: 'r6', text: 'Licencia de base de datos Postgres gestionada', category: 'Tecnológico' },
      ],
      pointsAwarded: 30,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 12,
    blockData: {
      stepNumber: 18,
      title: 'Paso 18: Matriz de Recursos y Nivelación de Carga',
      instruction: 'Asigna los recursos requeridos y verifica que no existan cuellos de botella:',
      fields: [
        { key: 'recursos_humanos', label: 'Recursos Humanos y Roles (Rol, Disponibilidad semanal, Tareas asignadas):', fieldType: 'textarea', maxWords: 120 },
        { key: 'recursos_tecnologicos', label: 'Recursos Tecnológicos e Infraestructura Cloud:', fieldType: 'textarea', maxWords: 120 },
        { key: 'analisis_cuellos_botella', label: 'Análisis de Capacidad (¿Existen sobreasignaciones o cuellos de botella?):', fieldType: 'textarea', maxWords: 100 },
      ],
      pointsAwarded: 30,
    },
  },

  // Pantallas 23-33: Costos, Presupuesto, Reservas y Complejidad
  {
    type: 'TEXT',
    order: 13,
    blockData: {
      heading: 'Pantallas 23-33: Costos, Presupuesto, Reservas e Incertidumbre',
      content: '• Costos Directos: Vinculados exclusivamente al proyecto (ej. horas de desarrollo del equipo, licencias específicas).\n• Costos Indirectos: Compartidos con la operación u otros proyectos (ej. infraestructura corporativa, conectividad general).\n\n• Presupuesto y Línea Base de Costos: Consolidación de costos planificados distribuidos en el tiempo. Si se ha gastado el 60% del presupuesto pero solo se ha completado el 40% del trabajo, existe una desviación desfavorable.\n\n• Reservas de Contingencia: Fondos reservados para riesgos identificados específicos (NO dinero libre para gastos no autorizados).\n\n• Adaptación: En proyectos con alta incertidumbre tecnológica, se deben utilizar rangos de estimación, planificación progresiva y validaciones tempranas.',
    },
  },
  {
    type: 'QUIZ',
    order: 14,
    blockData: {
      question: 'El proyecto necesita una licencia especializada que cuesta $150.000 COP mensuales durante 6 meses. ¿Cuál es el costo total?',
      options: [
        { id: 'a', text: '$600.000 COP', isCorrect: false },
        { id: 'b', text: '$750.000 COP', isCorrect: false },
        { id: 'c', text: '$900.000 COP', isCorrect: true },
        { id: 'd', text: '$1.050.000 COP', isCorrect: false },
      ],
      explanation: 'Multiplicación directa: $150.000 × 6 meses = $900.000 COP.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'QUIZ',
    order: 15,
    blockData: {
      question: 'Una actividad utiliza una tecnología que el equipo nunca ha probado y no hay datos históricos. ¿Qué alternativa de planificación es más adecuada?',
      options: [
        { id: 'a', text: 'Mantener una duración fija exacta sin analizar la incertidumbre', isCorrect: false },
        { id: 'b', text: 'Eliminar la actividad del proyecto', isCorrect: false },
        { id: 'c', text: 'Utilizar una estimación razonable por rangos, documentar el supuesto y realizar una prueba técnica para reducir la incertidumbre', isCorrect: true },
        { id: 'd', text: 'Pedir a la IA que determine con certeza matemática cuántos días tardará', isCorrect: false },
      ],
      explanation: 'Reconocer la incertidumbre mediante rangos y prototipos técnicos permite tomar decisiones fundamentadas sin asumir falsas certezas.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 16,
    blockData: {
      stepNumber: 19,
      title: 'Paso 19: Presupuesto Inicial, Reservas y Gestión de Incertidumbre',
      instruction: 'Consolida el presupuesto inicial de tu Plan Inicial / Backlog Integral del Nivel 2:',
      fields: [
        { key: 'presupuesto_personal', label: 'Costos de Personal / Equipo Humano (Horas, tarifas, total):', fieldType: 'textarea', maxWords: 120 },
        { key: 'presupuesto_tecnologia', label: 'Costos de Tecnología, Cloud, Licencias y Servicios:', fieldType: 'textarea', maxWords: 120 },
        { key: 'reservas_contingencia', label: 'Reservas de Contingencia (Monto y riesgos que cubren):', fieldType: 'textarea', maxWords: 80 },
        { key: 'presupuesto_total_resumen', label: 'Presupuesto Total Consolidado y Supuestos Económicos:', fieldType: 'textarea', maxWords: 100 },
      ],
      pointsAwarded: 40,
    },
  },
  {
    type: 'CHECKPOINT',
    order: 17,
    blockData: {
      title: '¡Felicitaciones! Has completado el Módulo 8 (Cronograma, Recursos y Costos)',
      description: 'Has dominado la estimación temporal, dependencias, ruta crítica, diagramas de Gantt, gestión de recursos humanos y tecnológicos, y estructuración de presupuestos con reservas.',
      criteria: [
        'Actividades, duraciones y dependencias definidas',
        'Diagrama de Gantt y Ruta Crítica identificada',
        'Matriz de recursos y análisis de sobreasignación completada',
        'Presupuesto consolidado con reservas de contingencia'
      ],
      badgeKey: 'planificador-costos',
      pointsAwarded: 100,
    },
  },
]

async function main() {
  console.log('Reading current seed file to merge Level 1 and Level 2...')
  const fileContent = await readFile(SEED_FILE_PATH, 'utf-8')
  const currentSeed = JSON.parse(fileContent)

  // Filter modules to keep level 1 modules (1 to 5)
  const level1Modules = currentSeed.modules.filter((m: ModuleSeed) => (m.level ?? 1) === 1)

  const newModule6: ModuleSeed = {
    title: 'Problema, Oportunidad, Objetivos y Viabilidad',
    order: 6,
    level: 2,
    levelTitle: 'Nivel 2: Formulación y planeación',
    blocks: module6Blocks,
  }

  const newModule7: ModuleSeed = {
    title: 'Interesados (Stakeholders), Requisitos, Alcance y Entregables',
    order: 7,
    level: 2,
    levelTitle: 'Nivel 2: Formulación y planeación',
    blocks: module7Blocks,
  }

  const newModule8: ModuleSeed = {
    title: 'Cronograma, Recursos y Costos',
    order: 8,
    level: 2,
    levelTitle: 'Nivel 2: Formulación y planeación',
    blocks: module8Blocks,
  }

  const allModules: ModuleSeed[] = [
    ...level1Modules,
    newModule6,
    newModule7,
    newModule8,
  ]

  console.log(`Validating all blocks across ${allModules.length} modules...`)
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
    modules: allModules,
  }

  await writeFile(SEED_FILE_PATH, JSON.stringify(updatedCourseSeed, null, 2), 'utf-8')
  console.log(`✓ Successfully updated ${SEED_FILE_PATH} with Nivel 1 & Nivel 2!`)
}

main().catch((err) => {
  console.error('Error generating level 2 seed:', err)
  process.exit(1)
})
