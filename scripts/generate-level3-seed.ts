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
// MÓDULO 10: Liderazgo, equipo y ejecución (Nivel 3)
// =========================================================================
const module10Blocks: BlockSeed[] = [
  // Pantalla 0: Introducción al Módulo
  {
    type: 'TEXT',
    order: 1,
    blockData: {
      heading: '¡Bienvenido al Módulo 10: Liderazgo, equipo y ejecución!',
      content: `Módulo 10. Liderazgo, equipo y ejecución
Duración estimada: 120 – 150 minutos | Nivel: Intermedio

Objetivo general:
Desarrollar capacidades para liderar y coordinar la ejecución de un proyecto TIC, gestionando personas, actividades, recursos, entregables, situaciones problemáticas y relaciones con terceros, mediante una actuación organizada y el uso responsable de IA generativa.

Objetivos específicos:
Al finalizar este módulo, el estudiante podrá:
• Comprender cómo se desarrolla la ejecución de un proyecto TIC a partir de la planificación realizada.
• Reconocer las responsabilidades del gestor durante la ejecución.
• Aplicar estrategias de liderazgo según las situaciones del proyecto.
• Coordinar roles, responsabilidades, actividades y recursos.
• Gestionar la comunicación y colaboración del equipo.
• Identificar y gestionar conflictos, problemas e impedimentos.
• Coordinar actividades y entregables durante la ejecución.
• Gestionar situaciones relacionadas con recursos, proveedores y terceros.
• Integrar la calidad en el desarrollo del trabajo.
• Gestionar el conocimiento generado durante la ejecución.
• Utilizar IA generativa como apoyo a diferentes actividades de gestión.
• Verificar la información generada por IA antes de utilizarla.
• Tomar decisiones considerando las consecuencias sobre el proyecto.
• Aplicar lo aprendido mediante una simulación de ejecución.

Competencias a desarrollar:
• Coordinar equipos de trabajo en proyectos TIC, considerando roles, responsabilidades y necesidades de colaboración.
• Aplicar estrategias de liderazgo de acuerdo con las situaciones que se presentan durante la ejecución.
• Gestionar la comunicación y colaboración entre los participantes del proyecto.
• Identificar y gestionar conflictos, problemas e impedimentos que afecten la ejecución.
• Coordinar actividades, recursos y entregables de acuerdo con las necesidades del proyecto.
• Gestionar situaciones relacionadas con proveedores y terceros durante la ejecución.
• Integrar prácticas de calidad en el desarrollo y seguimiento de las actividades.
• Registrar decisiones, experiencias y aprendizajes generados durante la ejecución.
• Tomar decisiones frente a situaciones y cambios que se presenten en el proyecto.
• Utilizar IA generativa para apoyar el análisis y organización de situaciones del proyecto.
• Verificar los resultados generados por IA antes de utilizarlos.
• Integrar las competencias desarrolladas en la Simulación de ejecución del proyecto TIC.

Mapa del módulo:
Plan → Liderazgo → Equipo → Organización → Desarrollo → Comunicación → Motivación → Conflictos → Trabajo y entregables → Recursos y conocimiento → Proveedores, calidad e IA → Simulación y decisiones → Felicidades.

Producto del módulo: Producto 1. Simulación de ejecución:
El estudiante continuará trabajando sobre el proyecto TIC desarrollado durante los niveles anteriores. En la simulación asumirá el rol de gestor y deberá enfrentar situaciones relacionadas con el equipo, las actividades, los recursos, los entregables, los proveedores y la calidad.`,
    },
  },

  // Pantalla 1: La Ejecución del Proyecto TIC
  {
    type: 'TEXT',
    order: 2,
    blockData: {
      heading: 'Pantalla 1: La Ejecución del Proyecto TIC',
      content: `La ejecución es la etapa en la que el trabajo planificado comienza a realizarse y se generan los resultados del proyecto. En ella intervienen las personas, actividades, recursos, entregables, proveedores y demás elementos necesarios para transformar lo planificado en resultados concretos.

Ejecutar un proyecto no significa simplemente completar tareas. El gestor debe coordinar el trabajo, facilitar la colaboración, atender situaciones que aparecen durante el desarrollo y mantener la atención sobre los resultados que el proyecto debe producir.

Durante la ejecución pueden aparecer condiciones diferentes a las consideradas durante la planificación. Una actividad puede depender de información que aún no está disponible, un integrante puede tener demasiadas responsabilidades o un proveedor puede modificar una condición del servicio.

Por esta razón, el gestor debe observar la relación entre personas, trabajo, recursos y resultados. Una dificultad en uno de estos elementos puede afectar a los demás y requerir una intervención.

Ejemplo:
Proyecto: Plataforma de atención ciudadana
Una entidad está implementando una plataforma para que los ciudadanos registren solicitudes y consulten su estado.
El equipo está preparado para comenzar el desarrollo de la funcionalidad de registro. Sin embargo, el desarrollador identifica que el requisito sobre documentos adjuntos no indica qué formatos serán permitidos.
El gestor debe decidir cómo actuar antes de comprometer trabajo que podría tener que modificarse posteriormente. La situación demuestra que ejecutar requiere interpretar las condiciones reales del proyecto y no solamente seguir el cronograma.`,
    },
  },
  {
    type: 'QUIZ',
    order: 3,
    blockData: {
      question: 'Actividad: Misión 1 – Activa la operación\nSon las 8:00 a. m. del primer día de ejecución. El desarrollador está disponible y el ambiente de trabajo funciona correctamente. El usuario clave estará disponible hasta las 11:00 a. m., pero existe una duda sobre un requisito de formatos de documentos adjuntos. ¿Cuál es el orden correcto de acciones para permitir que el trabajo avance?',
      options: [
        { id: 'a', text: 'Coordinar la aclaración → Confirmar el requisito → Autorizar el inicio', isCorrect: true },
        { id: 'b', text: 'Iniciar inmediatamente → Confirmar el requisito → Autorizar el inicio', isCorrect: false },
        { id: 'c', text: 'Detener todo el proyecto → Coordinar la aclaración → Ignorar la situación', isCorrect: false },
        { id: 'd', text: 'Autorizar el inicio → Iniciar inmediatamente → Coordinar la aclaración', isCorrect: false },
      ],
      explanation: 'La ejecución debe comenzar con condiciones suficientes para realizar el trabajo correctamente. Iniciar con un requisito ambiguo puede generar reprocesos y afectar actividades posteriores. La intervención adecuada resuelve la incertidumbre específica sin detener innecesariamente el resto del proyecto.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 4,
    blockData: {
      title: 'Laboratorio de IA: Diagnóstico de la Situación de Ejecución',
      role: 'Actúa como asistente de gestión de un proyecto TIC.',
      prompt: 'Actúa como asistente de gestión de un proyecto TIC. Analiza la situación actual e identifica hechos, información faltante, dependencias, posibles impactos y alternativas de actuación. No inventes información ni tomes la decisión por el gestor.\n\nSituación actual: Son las 8:00 a. m. del primer día de ejecución. El desarrollador está disponible y el ambiente de trabajo funciona correctamente. El usuario clave estará disponible hasta las 11:00 a. m., pero existe una duda sobre qué formatos de documentos adjuntos serán permitidos.',
      guidance: 'Ejecuta este prompt en ChatGPT, Claude o Gemini para comprobar cómo la IA estructura los hechos y alternativas sin inventar datos.',
      reflectionQuestions: [
        '¿Cómo ayuda al gestor separar los hechos verificados de las dudas o información faltante?',
        '¿Qué alternativas de actuación identificó la IA para aprovechar la ventana de tiempo del usuario clave?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 2: Del plan a la ejecución
  {
    type: 'TEXT',
    order: 5,
    blockData: {
      heading: 'Pantalla 2: Del plan a la ejecución',
      content: `La planificación establece lo que se pretende realizar y las condiciones consideradas necesarias para hacerlo. Durante la ejecución, estas definiciones se convierten en actividades concretas realizadas por el equipo.

Sin embargo, una actividad planificada no necesariamente está preparada para comenzar. El gestor debe verificar que exista información suficiente, que el responsable esté disponible, que las dependencias hayan sido atendidas y que los resultados esperados sean comprensibles.

Esta revisión permite detectar condiciones que pueden producir retrasos o reprocesos. No busca controlar cada detalle del trabajo, sino asegurar que el equipo pueda comenzar con una comprensión adecuada de lo que debe realizar.

Cuando una condición importante no está disponible, el gestor puede resolverla, reorganizar el trabajo, buscar una alternativa o esperar, dependiendo del impacto que tenga sobre el proyecto.

Ejemplo:
Proyecto: Aplicación para reservas
El cronograma establece que el desarrollo de la pantalla de reservas comenzará el lunes. El diseño está aprobado y el desarrollador está disponible.
Durante una revisión se descubre que el requisito no explica qué ocurre cuando dos usuarios intentan reservar el último cupo disponible simultáneamente. El gestor decide aclarar primero la regla para evitar que el equipo implemente un comportamiento que posteriormente deba cambiarse.`,
    },
  },
  {
    type: 'QUIZ',
    order: 6,
    blockData: {
      question: 'Actividad: Prepara el despegue\nUna actividad está programada para comenzar. ¿Cuál es el orden correcto de las siete fases para preparar y asegurar las condiciones antes y durante la ejecución?',
      options: [
        { id: 'a', text: 'Confirmar responsable → Revisar información → Verificar dependencias → Confirmar criterios → Coordinar inicio → Ejecutar → Verificar resultado', isCorrect: true },
        { id: 'b', text: 'Ejecutar → Verificar dependencias → Confirmar responsable → Coordinar inicio → Revisar información → Confirmar criterios → Verificar resultado', isCorrect: false },
        { id: 'c', text: 'Coordinar inicio → Confirmar responsable → Revisar información → Ejecutar → Verificar dependencias → Confirmar criterios → Verificar resultado', isCorrect: false },
        { id: 'd', text: 'Revisar información → Confirmar criterios → Ejecutar → Confirmar responsable → Coordinar inicio → Verificar dependencias → Verificar resultado', isCorrect: false },
      ],
      explanation: 'Una actividad debe comenzar cuando existen condiciones suficientes para realizarla. Revisar responsables, información, dependencias y criterios permite detectar dificultades antes de comprometer trabajo. La ejecución comienza después de preparar las condiciones necesarias.',
      pointsAwarded: 20,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 7,
    blockData: {
      title: 'Laboratorio de IA: Verificación de Condiciones Previas de Actividades',
      role: 'Actúa como analista de aseguramiento de proyectos TIC.',
      prompt: 'Revisa esta actividad de un proyecto TIC antes de su ejecución. Identifica responsable, información necesaria, dependencias, restricciones y criterios de aceptación. Señala qué debería verificarse antes de comenzar.\n\nActividad: Desarrollo del módulo de confirmación de reservas en tiempo real con pasarela de pagos externa.',
      guidance: 'Usa este prompt como lista de chequeo preventiva antes de autorizar el inicio de cualquier actividad compleja.',
      reflectionQuestions: [
        '¿Qué criterios de aceptación o dependencias técnicas invisibles reveló la IA?',
        '¿Por qué revisar estas condiciones reduce la probabilidad de retrabajo?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 3: Liderazgo en proyectos
  {
    type: 'TEXT',
    order: 8,
    blockData: {
      heading: 'Pantalla 3: Liderazgo en proyectos',
      content: `El liderazgo en proyectos consiste en orientar a las personas hacia los resultados esperados y crear condiciones para que puedan realizar su trabajo. No depende únicamente de la autoridad formal del gestor.

Liderar implica comunicar expectativas, facilitar decisiones, gestionar dificultades, delegar responsabilidades y actuar cuando una situación puede afectar al equipo o al proyecto.

El gestor debe equilibrar dirección y autonomía. Algunas situaciones requieren instrucciones claras y seguimiento cercano, mientras que otras pueden resolverse permitiendo que un integrante experimentado actúe con mayor independencia.

También es necesario comprender la situación antes de intervenir. Una intervención excesiva puede limitar al equipo, mientras que una intervención insuficiente puede dejar problemas sin resolver.

Ejemplo:
Proyecto: Sistema de gestión académica
Una integrante nueva debe coordinar una actividad con usuarios y no conoce todavía el procedimiento utilizado por el proyecto.
El gestor explica el resultado esperado, revisa con ella el primer contacto y establece un seguimiento inicial. Una vez que comprende el proceso, puede continuar con mayor autonomía.`,
    },
  },
  {
    type: 'QUIZ',
    order: 9,
    blockData: {
      question: 'Actividad: ¿Qué haría un buen líder?\nEl estudiante recibe tres situaciones:\n• Caso A: una integrante nueva no comprende su responsabilidad.\n• Caso B: un especialista experimentado tiene una actividad claramente definida.\n• Caso C: dos integrantes no logran ponerse de acuerdo.\n¿Cuál combinación representa mejor la intervención del gestor?',
      options: [
        { id: 'a', text: 'Controlar, controlar, imponer', isCorrect: false },
        { id: 'b', text: 'Orientar, delegar, facilitar', isCorrect: true },
        { id: 'c', text: 'Delegar, orientar, ignorar', isCorrect: false },
        { id: 'd', text: 'Ignorar, controlar, imponer', isCorrect: false },
      ],
      explanation: 'El liderazgo debe responder a la situación y a las necesidades del equipo. Una persona nueva puede necesitar orientación, mientras que un especialista experimentado puede trabajar con autonomía. Ante un desacuerdo, facilitar permite comprender las posiciones y buscar una solución antes de imponerla.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 10,
    blockData: {
      title: 'Laboratorio de IA: Intervención Situacional de Liderazgo',
      role: 'Actúa como consultor de liderazgo y gestión de personas.',
      prompt: 'Analiza esta situación de liderazgo de un proyecto TIC. Indica qué necesita el equipo y qué tipo de intervención sería más adecuada. Explica brevemente la razón y los posibles riesgos de intervenir demasiado o demasiado poco.\n\nSituación: Dos desarrolladores senior tienen visiones opuestas sobre la arquitectura de base de datos a usar y el debate ha retrasado 3 días el inicio del sprint.',
      guidance: 'Observa cómo la IA identifica los riesgos de una intervención autoritaria frente a una facilitación estructurada.',
      reflectionQuestions: [
        '¿Por qué imponer una solución técnica sin escuchar a los especialistas puede desmotivarlos?',
        '¿En qué punto la facilitación debe dar paso a una decisión de cierre para no comprometer el cronograma?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 4: Liderazgo adaptativo
  {
    type: 'TEXT',
    order: 11,
    blockData: {
      heading: 'Pantalla 4: Liderazgo adaptativo',
      content: `El liderazgo adaptativo consiste en ajustar la forma de dirigir según las características de la situación, las necesidades del equipo y el nivel de autonomía de sus integrantes.

El gestor puede orientar, acompañar, facilitar o delegar. Estas alternativas permiten adaptar la intervención sin perder de vista los objetivos y resultados del proyecto.

Para elegir una estrategia pueden considerarse la experiencia de la persona, la claridad de la actividad, la complejidad, la urgencia y las consecuencias de una decisión equivocada.

No existe una única forma correcta de liderar todas las situaciones. El gestor debe determinar cuándo aumentar la orientación y cuándo permitir mayor autonomía.

Ejemplo:
Proyecto: Portal de servicios empresariales
El responsable de pruebas conoce ampliamente el proceso y ha participado en proyectos similares. El gestor acuerda los resultados esperados y los puntos de revisión, pero no controla cada paso.
Una nueva integrante, en cambio, necesita acompañamiento durante sus primeras actividades para comprender la forma de trabajo del proyecto.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 12,
    blockData: {
      title: 'Actividad: Descubre el estilo de liderazgo adaptativo',
      instruction: 'Relaciona cada situación del equipo con el estilo de liderazgo correspondiente:',
      categories: ['Orientar', 'Acompañar', 'Facilitar', 'Delegar'],
      items: [
        { id: 'c1', text: 'No conoce el procedimiento', category: 'Orientar' },
        { id: 'c2', text: 'Conoce el trabajo, pero enfrenta una situación nueva', category: 'Acompañar' },
        { id: 'c3', text: 'Dos personas necesitan ayuda para encontrar un acuerdo', category: 'Facilitar' },
        { id: 'c4', text: 'Especialista experimentado con actividad claramente definida', category: 'Delegar' },
      ],
      explanation: 'La estrategia de liderazgo debe corresponder con las necesidades de la situación. Orientar es apropiado cuando falta claridad; acompañar cuando existe conocimiento parcial; facilitar cuando se requiere colaboración; y delegar cuando existe autonomía suficiente.',
      pointsAwarded: 25,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 13,
    blockData: {
      title: 'Laboratorio de IA: Determinación del Estilo de Liderazgo',
      role: 'Actúa como asesor de gestión de proyectos TIC.',
      prompt: 'Analiza esta situación de un proyecto TIC y determina si conviene orientar, acompañar, facilitar o delegar. Explica qué información sustenta tu recomendación.\n\nSituación: Un ingeniero DevOps experto debe configurar el pipeline de CI/CD para un nuevo microservicio, tarea que ha realizado decenas de veces con éxito en otros proyectos.',
      guidance: 'Usa este ejercicio para sustentar decisiones de delegación con base en evidencia de competencia previa.',
      reflectionQuestions: [
        '¿Qué criterios utilizó la IA para respaldar la delegación en este escenario?',
        '¿Qué consecuencias tiene no delegar en integrantes altamente capacitados?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 5: Roles y responsabilidades del equipo
  {
    type: 'TEXT',
    order: 14,
    blockData: {
      heading: 'Pantalla 5: Roles y responsabilidades del equipo',
      content: `Los roles permiten establecer qué función desempeña cada participante y qué responsabilidades tiene frente al trabajo. Esta claridad reduce duplicidades, actividades sin responsable y conflictos derivados de expectativas diferentes.

Una actividad puede involucrar varias personas con funciones distintas. Una persona puede ejecutar el trabajo, otra coordinarlo, otra verificarlo y otra validar el resultado.

Durante la ejecución, el gestor necesita saber quién debe actuar, quién debe ser consultado y quién participa en la validación. Esto facilita la coordinación y evita que una situación quede sin atención porque todos suponían que otra persona debía actuar.

Cuando una responsabilidad cambia, la nueva distribución debe comunicarse al equipo para evitar interpretaciones diferentes.

Ejemplo:
Proyecto: Aplicación móvil de turismo
El desarrollador implementa la funcionalidad de rutas. El responsable de pruebas verifica su funcionamiento y el usuario clave comprueba si responde a la necesidad definida.
El desarrollador participa en la producción del resultado, pero no determina por sí solo si la funcionalidad satisface la necesidad del usuario.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 15,
    blockData: {
      title: 'Actividad: Arma el equipo — Roles y Responsabilidades',
      instruction: 'Relaciona cada rol con su responsabilidad principal dentro del proyecto TIC:',
      categories: [
        'Coordinar ejecución',
        'Definir requisitos',
        'Diseñar interfaz',
        'Implementar funcionalidad',
        'Verificar funcionamiento',
        'Validar necesidad',
      ],
      items: [
        { id: 'r1', text: 'Gestor del proyecto', category: 'Coordinar ejecución' },
        { id: 'r2', text: 'Analista de requisitos', category: 'Definir requisitos' },
        { id: 'r3', text: 'Diseñador UI/UX', category: 'Diseñar interfaz' },
        { id: 'r4', text: 'Desarrollador', category: 'Implementar funcionalidad' },
        { id: 'r5', text: 'Responsable de pruebas (QA)', category: 'Verificar funcionamiento' },
        { id: 'r6', text: 'Usuario clave', category: 'Validar necesidad' },
      ],
      explanation: 'Las responsabilidades deben permitir distinguir quién coordina, ejecuta, verifica y valida. Una persona puede participar en varias actividades, pero las funciones deben estar claras. Esta claridad facilita la coordinación y reduce conflictos durante la ejecución.',
      pointsAwarded: 30,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 16,
    blockData: {
      title: 'Laboratorio de IA: Auditoría de Matriz de Responsabilidades',
      role: 'Actúa como auditor de procesos de gestión TIC.',
      prompt: 'Revisa esta matriz de responsabilidades de un proyecto TIC. Identifica actividades sin responsable, responsabilidades duplicadas y posibles confusiones entre ejecución, coordinación, verificación y validación.\n\nMatriz:\n1. Pantalla de login: Desarrollador (ejecuta y valida)\n2. Pruebas de carga: Sin responsable asignado\n3. Aprobación final: Analista y Usuario clave (ambos afirman tener la última palabra)',
      guidance: 'Comprueba cómo la IA señala la confusión entre verificar (pruebas técnicas) y validar (satisfacción del usuario).',
      reflectionQuestions: [
        '¿Por qué el desarrollador no debe ser quien valide su propio entregable ante el cliente?',
        '¿Cómo soluciona una matriz RACI los vacíos de responsabilidad en pruebas críticas?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 6: Organización y coordinación del equipo
  {
    type: 'TEXT',
    order: 17,
    blockData: {
      heading: 'Pantalla 6: Organización y coordinación del equipo',
      content: `Coordinar un equipo implica organizar el trabajo para que las personas conozcan qué deben realizar, cuándo hacerlo y qué relación existe con otras actividades.

En los proyectos TIC, una actividad puede producir información o resultados necesarios para otra. Por ello, el gestor debe observar las dependencias que conectan el trabajo.

Cuando una actividad depende de otra que aún no está terminada, el gestor debe determinar cómo afecta esto al trabajo. Puede ser necesario esperar, cambiar la secuencia o buscar una alternativa.

La coordinación también requiere mecanismos para conocer el estado del trabajo y facilitar que los integrantes comuniquen dificultades oportunamente.

Ejemplo:
Proyecto: Plataforma de comercio electrónico
El desarrollo de la pantalla de pagos depende de una definición que debe proporcionar el analista. El desarrollador está disponible, pero la información todavía no ha sido entregada.
Aunque el desarrollador pueda comenzar, hacerlo sin esa información puede producir una solución incorrecta y generar modificaciones posteriores.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 18,
    blockData: {
      title: 'Actividad: Conecta la ruta — Dónde se produce el bloqueo',
      instruction: 'El proyecto sigue el flujo: Requisitos → Diseño → Desarrollo → Pruebas → Validación. Ubica cada obstáculo en el punto del flujo donde genera el bloqueo:',
      categories: ['Entre Diseño y Desarrollo', 'Entre Desarrollo y Pruebas', 'Entre Pruebas y Validación'],
      items: [
        { id: 'b1', text: 'Diseño aprobado, pero no entregado al desarrollador', category: 'Entre Diseño y Desarrollo' },
        { id: 'b2', text: 'Desarrollo terminado, pero no existe ambiente de pruebas', category: 'Entre Desarrollo y Pruebas' },
        { id: 'b3', text: 'Pruebas terminadas, pero el usuario aún no está disponible', category: 'Entre Pruebas y Validación' },
      ],
      explanation: 'Una dependencia conecta actividades y puede impedir que una etapa posterior avance. Identificar el punto exacto del bloqueo ayuda al gestor a intervenir sobre la causa. No basta con observar que una actividad está retrasada; es necesario comprender qué condición está impidiendo su avance.',
      pointsAwarded: 25,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 19,
    blockData: {
      title: 'Laboratorio de IA: Análisis de Actividades y Dependencias Bloqueantes',
      role: 'Actúa como analista de flujo y dependencias en proyectos TIC.',
      prompt: 'Analiza las actividades y dependencias de este proyecto TIC. Identifica cuáles pueden bloquear otras actividades y explica qué información debería verificar el gestor.\n\nFlujo: Diseño UI (completo al 100%) -> API de Autenticación (en desarrollo) -> Interfaz de Usuario (depende de API de Autenticación y Diseño) -> Pruebas de Integración (depende de Interfaz).',
      guidance: 'Usa la IA para identificar dependencias críticas y rutas alternativas de avance.',
      reflectionQuestions: [
        '¿Puede el equipo de interfaz avanzar en maquetación con datos simulados (mocks) mientras la API termina?',
        '¿Cómo ayuda el desacoplamiento a mantener el flujo del equipo sin frenar el proyecto?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 7: Desarrollo y fortalecimiento del equipo
  {
    type: 'TEXT',
    order: 20,
    blockData: {
      heading: 'Pantalla 7: Desarrollo y fortalecimiento del equipo',
      content: `El desempeño de un equipo se desarrolla durante el proyecto. Las personas necesitan comprender el propósito del trabajo, sus responsabilidades, las reglas de colaboración y la manera en que se comunicarán las decisiones.

El gestor puede contribuir mediante inducción, retroalimentación, capacitación, acompañamiento y acuerdos de trabajo.

Fortalecer un equipo no significa únicamente mejorar conocimientos técnicos. También implica desarrollar formas de colaboración que permitan comunicar problemas, coordinar responsabilidades y resolver diferencias.

La intervención debe responder a la causa de la situación. Una persona que desconoce un procedimiento necesita una respuesta diferente de un equipo que presenta problemas de comunicación.

Ejemplo:
Proyecto: Sistema de citas
Una integrante se incorpora cuando el proyecto ya está en ejecución. Tiene experiencia, pero desconoce cómo se registran las decisiones y cuáles son los canales oficiales de comunicación.
El gestor realiza una inducción y explica los acuerdos de trabajo antes de asignarle responsabilidades independientes.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 21,
    blockData: {
      title: 'Actividad: Caja de herramientas de fortalecimiento de equipo',
      instruction: 'Ubica cada situación en la herramienta de gestión adecuada:',
      categories: ['Inducción', 'Capacitación', 'Retroalimentación', 'Acuerdo de trabajo'],
      items: [
        { id: 'h1', text: 'La persona acaba de ingresar al equipo', category: 'Inducción' },
        { id: 'h2', text: 'Existe una brecha de conocimiento técnico o funcional', category: 'Capacitación' },
        { id: 'h3', text: 'Se repite un comportamiento que afecta el trabajo de otros', category: 'Retroalimentación' },
        { id: 'h4', text: 'Dos integrantes tienen expectativas diferentes sobre una responsabilidad', category: 'Acuerdo de trabajo' },
      ],
      explanation: 'Cada herramienta responde a una necesidad diferente. La inducción facilita la incorporación, la capacitación cubre conocimientos, la retroalimentación permite mejorar comportamientos y los acuerdos establecen reglas compartidas. Utilizar la herramienta adecuada permite actuar sobre la causa de la situación.',
      pointsAwarded: 25,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 22,
    blockData: {
      title: 'Laboratorio de IA: Diagnóstico de Necesidades del Equipo',
      role: 'Actúa como coach y gestor de equipos de proyectos TIC.',
      prompt: 'Analiza las situaciones de este equipo de proyecto TIC y determina si requieren inducción, capacitación, retroalimentación o acuerdos de trabajo. Explica brevemente cada clasificación.\n\nCasos:\n1. Un desarrollador entrega código sin pruebas unitarias porque nunca aprendió la librería de testing del framework.\n2. Dos integrantes discuten frecuentemente sobre el horario límite para solicitar revisiones de código.',
      guidance: 'Examina cómo la IA distingue entre una brecha técnica (capacitación) y una regla de convivencia laboral (acuerdo de trabajo).',
      reflectionQuestions: [
        '¿Por qué intentar resolver un problema de acuerdos con capacitación técnica resulta ineficaz?',
        '¿Cómo influye la claridad de las normas de equipo en la reducción de roces cotidianos?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 8: Comunicación y colaboración
  {
    type: 'TEXT',
    order: 23,
    blockData: {
      heading: 'Pantalla 8: Comunicación y colaboración',
      content: `La comunicación durante la ejecución permite compartir información necesaria para coordinar el trabajo y tomar decisiones. Una comunicación deficiente puede generar interpretaciones diferentes, duplicidad de tareas, retrasos o decisiones basadas en información incompleta.

El gestor debe considerar qué información necesita cada participante, cuándo debe recibirla y qué canal resulta apropiado.

No toda comunicación tiene el mismo nivel de formalidad. Una solicitud de un usuario no necesariamente representa un cambio aprobado y una opinión de un integrante no constituye automáticamente una decisión del proyecto.

Mantener claridad sobre el estado de la información permite que el equipo actúe sobre datos confirmados y no sobre interpretaciones.

Ejemplo:
Proyecto: Plataforma de servicios ciudadanos
Un usuario escribe en un chat:
"Sería bueno agregar una opción para descargar el comprobante."
Un integrante interpreta el mensaje como aprobación y comienza a desarrollar la funcionalidad. El gestor revisa la situación y aclara que se trata de una solicitud que todavía debe analizarse.`,
    },
  },
  {
    type: 'QUIZ',
    order: 24,
    blockData: {
      question: 'Actividad: Detecta el mensaje correcto\nUn usuario escribe en un canal informal de chat: "Sería bueno agregar una opción para descargar el comprobante." ¿Cuál mensaje debería recibir el equipo de desarrollo de parte del gestor?',
      options: [
        { id: 'a', text: 'El usuario pidió una nueva funcionalidad, por lo tanto ya está aprobada.', isCorrect: false },
        { id: 'b', text: 'El usuario solicitó una nueva funcionalidad. Se encuentra pendiente de análisis y decisión.', isCorrect: true },
        { id: 'c', text: 'El equipo debería implementarla porque parece importante.', isCorrect: false },
        { id: 'd', text: 'La funcionalidad debe desarrollarse inmediatamente.', isCorrect: false },
      ],
      explanation: 'La comunicación debe representar correctamente el estado de la información. Una solicitud no debe convertirse en una decisión aprobada sin evidencia de aprobación. Comunicar con precisión permite que el equipo conozca qué puede ejecutar y qué asuntos todavía requieren análisis.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 25,
    blockData: {
      title: 'Laboratorio de IA: Clasificación del Estado de Comunicaciones',
      role: 'Actúa como analista de gestión de comunicaciones en proyectos TIC.',
      prompt: 'Clasifica estos mensajes de un proyecto TIC como información, solicitud, decisión, opinión o dato pendiente de confirmar. No conviertas una solicitud en una decisión.\n\nMensajes:\n1. "Creo que el botón azul se vería mejor en verde" (Diseñador en Slack)\n2. "Aprobamos la inclusión del reporte PDF con cargo al presupuesto adicional pactado" (Patrocinador por correo oficial)\n3. "Ojalá pudieran agregar login con huella digital" (Usuario en demo)',
      guidance: 'Usa este prompt para entrenar tu capacidad de discernir entre ideas informales y compromisos contractuales o de alcance.',
      reflectionQuestions: [
        '¿Cómo previene esta clasificación el temido fenómeno del "scope creep" (corrupción del alcance)?',
        '¿Qué canal formal debe utilizar el gestor para comunicar cambios aprobados al equipo?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 9: Motivación, confianza y compromiso
  {
    type: 'TEXT',
    order: 26,
    blockData: {
      heading: 'Pantalla 9: Motivación, confianza y compromiso',
      content: `La confianza influye en la disposición de las personas para comunicar dificultades, solicitar ayuda y asumir responsabilidades. Cuando los integrantes pueden informar problemas oportunamente, el gestor tiene mayores posibilidades de actuar antes de que sus consecuencias aumenten.

La motivación también se relaciona con comprender el propósito del trabajo, reconocer las contribuciones y contar con condiciones razonables para cumplir las responsabilidades.

El gestor debe observar señales como disminución de participación, errores que no se comunican, conflictos frecuentes o sobrecargas que afectan el desempeño.

Antes de intervenir debe comprender la causa. Una dificultad puede estar relacionada con carga de trabajo, falta de claridad, comunicación deficiente o necesidades de apoyo.

Ejemplo:
Proyecto: Portal de inscripción educativa
Una integrante detecta un error en una funcionalidad, pero decide no comunicarlo porque anteriormente recibió una reacción negativa al informar otro problema.
El error aparece durante una prueba. Además de corregirlo, el gestor debe revisar por qué el equipo no se sintió en condiciones de comunicarlo oportunamente.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 27,
    blockData: {
      title: 'Actividad: Semáforo del equipo — Clima de Confianza',
      instruction: 'Clasifica cada situación de acuerdo a su impacto sobre la confianza del equipo:',
      categories: ['🟢 Fortalece la confianza', '🟡 Requiere atención', '🔴 Puede afectar el proyecto'],
      items: [
        { id: 's1', text: 'Comunicar un error oportunamente', category: '🟢 Fortalece la confianza' },
        { id: 's2', text: 'Ocultar un problema por miedo a represalias', category: '🔴 Puede afectar el proyecto' },
        { id: 's3', text: 'Reconocer una contribución del equipo', category: '🟢 Fortalece la confianza' },
        { id: 's4', text: 'Culpar públicamente a una persona', category: '🔴 Puede afectar el proyecto' },
        { id: 's5', text: 'Solicitar ayuda oportunamente ante un bloqueo', category: '🟢 Fortalece la confianza' },
        { id: 's6', text: 'Ignorar repetidamente una sobrecarga', category: '🟡 Requiere atención' },
      ],
      explanation: 'La confianza se construye mediante prácticas consistentes de comunicación y gestión. Comunicar dificultades permite actuar oportunamente, mientras que ocultarlas puede aumentar su impacto. Una sobrecarga que se ignora también requiere atención porque puede terminar afectando el desempeño.',
      pointsAwarded: 30,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 28,
    blockData: {
      title: 'Laboratorio de IA: Análisis de Seguridad Psicológica y Compromiso',
      role: 'Actúa como consultor de clima organizacional y gestión de proyectos.',
      prompt: 'Analiza estas situaciones del equipo e identifica cuáles pueden afectar confianza, motivación o compromiso. Propón una acción de gestión para cada una sin atribuir intenciones que no estén demostradas.\n\nSituación: Durante las últimas dos reuniones diarias de avance, los integrantes no reportan ningún problema, pero el tablero Kanban muestra que tres tareas clave llevan cuatro días sin movimiento.',
      guidance: 'Aprende a interpretar silencios o falta de reporte como posibles indicadores de baja seguridad psicológica.',
      reflectionQuestions: [
        '¿Por qué un tablero paralizado sin problemas reportados es una señal de alarma para el gestor?',
        '¿Qué preguntas abiertas puede formular el líder para invitar a hablar sobre impedimentos sin juzgar?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 10: Gestión de conflictos durante la ejecución
  {
    type: 'TEXT',
    order: 29,
    blockData: {
      heading: 'Pantalla 10: Gestión de conflictos durante la ejecución',
      content: `Durante la ejecución pueden surgir desacuerdos entre integrantes del equipo, usuarios, responsables técnicos o proveedores. El papel del gestor no consiste simplemente en elegir quién tiene la razón, sino en intervenir para evitar que el conflicto afecte el trabajo, las relaciones del equipo o los resultados esperados.

La gestión de conflictos implica comprender la situación, escuchar las posiciones involucradas, identificar el impacto sobre el proyecto y facilitar acuerdos que permitan continuar el trabajo. La intervención debe ser proporcional a la situación y orientada a mantener la colaboración.

Un conflicto puede aparecer por prioridades diferentes, interpretaciones distintas, distribución del trabajo, decisiones técnicas o presión por cumplir una fecha. Si no se atiende oportunamente, puede convertirse en retrasos, reprocesos o deterioro de la colaboración.

Durante la ejecución, el gestor debe actuar como facilitador. Primero establece qué está ocurriendo y qué impacto tiene; después conduce la conversación hacia una solución viable y deja registro de las decisiones cuando estas afectan el proyecto.

Ejemplo:
En un proyecto TIC para implementar una plataforma de atención al usuario, el usuario clave solicita que el equipo priorice una nueva funcionalidad para consultar el estado de las solicitudes.
El desarrollador considera que primero debe corregirse un defecto que afecta una funcionalidad que ya está siendo probada. Ambos comienzan a discutir porque consideran que su actividad es la más importante.
El gestor revisa el impacto de ambas situaciones, reúne a los involucrados y facilita una decisión basada en las prioridades del proyecto. Se acuerda corregir primero el defecto porque bloquea las pruebas y posteriormente programar la nueva funcionalidad.`,
    },
  },
  {
    type: 'QUIZ',
    order: 30,
    blockData: {
      question: 'Actividad didáctica: Sala de mediación\nDurante la ejecución se presenta el siguiente intercambio:\nUsuario: "Necesitamos esta funcionalidad antes de la demostración."\nDesarrollador: "No puedo trabajar en ella hasta corregir el defecto que está bloqueando las pruebas."\n¿Cuál debería ser la primera intervención del gestor?',
      options: [
        { id: 'a', text: 'Dar prioridad inmediatamente al usuario porque representa al cliente.', isCorrect: false },
        { id: 'b', text: 'Dar prioridad inmediatamente al desarrollador porque conoce el trabajo técnico.', isCorrect: false },
        { id: 'c', text: 'Analizar el impacto de ambas situaciones y facilitar un acuerdo sobre la prioridad basado en evidencias y dependencias.', isCorrect: true },
        { id: 'd', text: 'Dejar que los involucrados resuelvan el conflicto por su cuenta.', isCorrect: false },
      ],
      explanation: 'El gestor debe comprender el impacto de las situaciones y facilitar una decisión basada en las necesidades reales del proyecto. Resolver el conflicto no significa imponer una posición basada en jerarquía, sino analizar dependencias y facilitar un acuerdo.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 31,
    blockData: {
      title: 'Laboratorio de IA: Mediación de Conflictos y Búsqueda de Alternativas',
      role: 'Actúa como asistente para la gestión de proyectos TIC.',
      prompt: 'Actúa como asistente para la gestión de proyectos TIC. Analiza la siguiente situación de conflicto entre integrantes del equipo. Identifica las posiciones de cada participante, el impacto potencial sobre el proyecto y tres alternativas de intervención. No tomes una decisión por mí ni inventes información que no esté en el contexto proporcionado.\n\nContexto del conflicto: El usuario clave exige incluir la pantalla de exportación a Excel antes de la demo del viernes, mientras el desarrollador afirma que si no corrige el fallo de seguridad en el login, no autorizará el despliegue.',
      guidance: 'Comprueba cómo la IA desglosa intereses subyacentes frente a posturas rígidas.',
      reflectionQuestions: [
        '¿Cómo ayuda al gestor conocer las posiciones e intereses antes de convocar a la reunión?',
        '¿Por qué las decisiones deben justificarse con el impacto en el proyecto y no con simpatías personales?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 11: Gestión de problemas, impedimentos y bloqueos
  {
    type: 'TEXT',
    order: 32,
    blockData: {
      heading: 'Pantalla 11: Gestión de problemas, impedimentos y bloqueos',
      content: `Durante la ejecución aparecen situaciones que ya están afectando el trabajo: una herramienta que no funciona, una información que no llega, una persona que no está disponible o una dependencia que impide continuar. Estas situaciones deben gestionarse como parte de la operación cotidiana del proyecto.

El gestor debe determinar qué está bloqueando el trabajo, evaluar su impacto, coordinar la acción correspondiente y comprobar que el flujo pueda continuar. La atención oportuna evita que un problema localizado termine afectando otras actividades.

Un problema representa una situación que ya ocurrió y requiere atención. Un impedimento dificulta la realización de una actividad, mientras que un bloqueo puede detener completamente su avance.

Durante la ejecución, no basta con registrar estas situaciones. El gestor debe darles seguimiento hasta comprobar que la acción tomada realmente permitió recuperar el trabajo.

Ejemplo:
En una plataforma de atención ciudadana, el equipo de pruebas debe comenzar la validación de una funcionalidad. Sin embargo, el ambiente de pruebas presenta una falla y el responsable de infraestructura informa que necesita varias horas para solucionarla.
El gestor identifica que las pruebas dependen directamente de ese ambiente. Coordina con infraestructura, informa al equipo sobre la situación y reorganiza temporalmente una actividad que no depende del ambiente. Una vez solucionado el problema, verifica que las pruebas puedan continuar.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 33,
    blockData: {
      title: 'Actividad didáctica: Centro de emergencias — Priorización de Incidentes',
      instruction: 'Relaciona cada alerta que recibe el gestor con la acción inmediata correcta:',
      categories: [
        'Atender y desbloquear el trabajo afectado',
        'Registrar y programar seguimiento',
        'Analizar posteriormente como posible impacto futuro',
      ],
      items: [
        { id: 'al1', text: 'Alerta A: El ambiente de pruebas no permite iniciar las pruebas programadas', category: 'Atender y desbloquear el trabajo afectado' },
        { id: 'al2', text: 'Alerta B: Una documentación complementaria puede actualizarse mañana', category: 'Registrar y programar seguimiento' },
        { id: 'al3', text: 'Alerta C: Un proveedor anuncia una posible modificación de su servicio dentro de un mes', category: 'Analizar posteriormente como posible impacto futuro' },
      ],
      explanation: 'Durante la ejecución, las situaciones que ya bloquean el trabajo requieren atención inmediata. No todas las situaciones tienen la misma prioridad. El gestor debe diferenciar aquello que está deteniendo el trabajo de aquello que puede esperar o requiere seguimiento.',
      pointsAwarded: 25,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 34,
    blockData: {
      title: 'Laboratorio de IA: Triage y Desbloqueo de Incidencias Operativas',
      role: 'Actúa como analista de soporte a la gestión de proyectos TIC.',
      prompt: 'Analiza esta lista de situaciones de un proyecto TIC en ejecución. Para cada una identifica: situación actual, actividad afectada, impacto, responsable de atención y acción inmediata sugerida. No confundas situaciones futuras con problemas actuales y no inventes datos faltantes.\n\nLista de situaciones reportadas:\n1. Certificado SSL de ambiente de pruebas caducó hoy a las 7:00 a. m.\n2. La licencia de una herramienta de diseño vence en tres meses.\n3. El responsable de bases de datos solicita reunión de coordinación para el próximo martes.',
      guidance: 'Observa cómo la IA aísla el bloqueo inmediato (SSL) frente a tareas administrativas futuras.',
      reflectionQuestions: [
        '¿Cuál es la diferencia crítica entre un riesgo (evento incierto futuro) y un impedimento/problema actual?',
        '¿Qué acciones inmediatas puede tomar el gestor mientras infraestructura soluciona una falla externa?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 12: Gestión del trabajo y avance durante la ejecución
  {
    type: 'TEXT',
    order: 35,
    blockData: {
      heading: 'Pantalla 12: Gestión del trabajo y avance durante la ejecución',
      content: `Durante la ejecución, el gestor necesita conocer cómo está avanzando realmente el trabajo y no depender únicamente de lo que estaba previsto en el plan. El estado real permite identificar actividades terminadas, actividades en curso, trabajos detenidos y elementos que requieren atención.

Gestionar el avance implica observar el estado del trabajo, reconocer desviaciones y establecer prioridades para mantener el proyecto en movimiento. El avance no se determina únicamente contando cuántas actividades fueron terminadas.

Una actividad completada puede tener poco impacto mientras que una actividad bloqueada puede detener varias tareas posteriores. Por esta razón, el gestor debe considerar dependencias, prioridades, bloqueos y efectos sobre los entregables.

La información del avance también permite comunicar un estado realista del proyecto y tomar decisiones oportunas antes de que una desviación se convierta en un problema mayor.

Ejemplo:
En una aplicación móvil turística, el equipo presenta el siguiente estado:
• 8 actividades completadas.
• 3 actividades en ejecución.
• 1 actividad bloqueada.
La actividad bloqueada es necesaria para iniciar las pruebas de integración. Aunque la mayoría de las actividades están terminadas, el gestor identifica que resolver el bloqueo tiene mayor prioridad que iniciar otra actividad secundaria.`,
    },
  },
  {
    type: 'QUIZ',
    order: 36,
    blockData: {
      question: 'Actividad didáctica: Control de misión\nObserva el tablero:\n• Diseño de pantalla: Completado (sin dependencias)\n• API de consulta: Completado (sin dependencias)\n• Integración: Bloqueado (depende de API disponible)\n• Documentación: En curso (sin dependencias)\n• Pruebas: Pendiente (depende de Integración)\n¿Qué debe priorizar el gestor?',
      options: [
        { id: 'a', text: 'Terminar la documentación porque ya está en ejecución.', isCorrect: false },
        { id: 'b', text: 'Iniciar una nueva actividad para aumentar el número de tareas realizadas.', isCorrect: false },
        { id: 'c', text: 'Resolver el bloqueo de integración porque afecta el inicio de las pruebas.', isCorrect: true },
        { id: 'd', text: 'Esperar hasta que todas las actividades en curso terminen.', isCorrect: false },
      ],
      explanation: 'La integración representa una dependencia directa para las pruebas, por lo que desbloquearla permite recuperar el flujo del trabajo. Gestionar el avance significa interpretar dependencias y flujo, no simplemente contar tareas completadas.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 37,
    blockData: {
      title: 'Laboratorio de IA: Priorización Basada en Dependencias y Cuellos de Botella',
      role: 'Actúa como analista de operaciones y flujo de proyectos TIC.',
      prompt: 'Analiza el siguiente estado de ejecución de un proyecto TIC. Identifica qué trabajos requieren atención prioritaria considerando bloqueos, dependencias y efectos sobre actividades posteriores. Presenta las razones de cada prioridad sin inventar información.\n\nEstado:\n- Tarea 1: Pasarela de pagos (Bloqueada por credenciales sandbox del banco, 4 tareas dependen de ella)\n- Tarea 2: Redacción de términos de uso (En curso al 80%, ninguna tarea depende de ella)\n- Tarea 3: Diseño de banners (Pendiente, sin dependencias)',
      guidance: 'Comprueba el razonamiento de la IA para justificar por qué la Tarea 1 debe ser la máxima prioridad del gestor hoy.',
      reflectionQuestions: [
        '¿Por qué una alta cifra de tareas secundarias terminadas puede esconder un retraso crítico en la entrega de valor?',
        '¿Cómo ayuda el concepto de "ruta crítica" a no distraerse con tareas periféricas?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 13: Coordinación del flujo de trabajo y entregables
  {
    type: 'TEXT',
    order: 38,
    blockData: {
      heading: 'Pantalla 13: Coordinación del flujo de trabajo y entregables',
      content: `Durante la ejecución, el gestor debe procurar que el trabajo avance de manera continua entre las personas, actividades y etapas involucradas. Un trabajo terminado por un integrante no representa necesariamente un resultado utilizable si el siguiente responsable no puede continuar.

La coordinación del flujo consiste en identificar puntos donde el trabajo se acumula, espera o se detiene y actuar para recuperar la continuidad. Esto permite reducir tiempos de espera, reprocesos y entregas incompletas.

El flujo puede verse afectado por una dependencia no disponible, una revisión pendiente, información incompleta o una capacidad insuficiente en una etapa posterior. El gestor debe observar estas conexiones y coordinar las acciones necesarias.

La atención debe centrarse en mantener la continuidad desde que comienza una actividad hasta que su resultado puede ser utilizado, revisado o validado por quien corresponda.

Ejemplo:
En el desarrollo de una aplicación de reservas, el equipo de desarrollo finaliza una funcionalidad, pero el equipo de pruebas todavía no puede comenzar porque el ambiente requerido no está disponible.
El gestor identifica el punto de espera, coordina con infraestructura la disponibilidad del ambiente y comunica al equipo de pruebas cuándo podrá comenzar. Mientras tanto, evita enviar nuevas funcionalidades a pruebas si estas generarían una acumulación adicional.`,
    },
  },
  {
    type: 'QUIZ',
    order: 39,
    blockData: {
      question: 'Actividad didáctica: Desbloquea la línea de producción\n¿Cuál es el orden secuencial correcto de las cinco acciones que debe realizar el gestor cuando identifica que una etapa del flujo de trabajo está detenida?',
      options: [
        { id: 'a', text: 'Verificar qué dependencia está impidiendo avanzar → Coordinar con el responsable de la dependencia → Confirmar que la condición necesaria esté disponible → Continuar el trabajo afectado → Verificar nuevamente el resultado', isCorrect: true },
        { id: 'b', text: 'Continuar el trabajo afectado → Verificar nuevamente el resultado → Coordinar con el responsable → Verificar qué dependencia está impidiendo avanzar → Confirmar condición', isCorrect: false },
        { id: 'c', text: 'Confirmar que la condición necesaria esté disponible → Continuar el trabajo afectado → Verificar dependencia → Coordinar con responsable → Verificar resultado', isCorrect: false },
        { id: 'd', text: 'Coordinar con el responsable → Continuar el trabajo inmediatamente → Confirmar condición → Verificar dependencia → Verificar resultado', isCorrect: false },
      ],
      explanation: 'La coordinación del flujo requiere intervenir sobre la causa que está deteniendo el trabajo. No se trata de mover artificialmente una actividad de estado, sino de comprobar que las condiciones necesarias estén disponibles y verificar posteriormente que el trabajo realmente haya recuperado su continuidad.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 40,
    blockData: {
      title: 'Laboratorio de IA: Diagnóstico de Flujo y Tiempos de Espera',
      role: 'Actúa como especialista en gestión de flujo y lean delivery TIC.',
      prompt: 'Analiza este flujo de trabajo de un proyecto TIC. Identifica dónde existen esperas, bloqueos o acumulaciones y explica qué dependencia está afectando cada punto. Propón acciones de coordinación sin modificar ni inventar información del proyecto.\n\nFlujo reportado:\n- Desarrollo entrega 6 historias de usuario en un día.\n- El equipo de QA solo tiene capacidad para probar 2 historias por día.\n- Resultado: 4 historias quedan en espera en el repositorio sin validar.',
      guidance: 'Descubre cómo la IA sugiere equilibrar el ritmo de desarrollo con el de validación para evitar cuellos de botella.',
      reflectionQuestions: [
        '¿Por qué seguir produciendo código cuando la etapa de pruebas está saturada genera mayor riesgo de defectos?',
        '¿Cómo ayuda limitar el trabajo en curso (WIP) a acelerar la entrega de valor real?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 14: Gestión de capacidad y disponibilidad del equipo
  {
    type: 'TEXT',
    order: 41,
    blockData: {
      heading: 'Pantalla 14: Gestión de capacidad y disponibilidad del equipo',
      content: `Durante la ejecución, la capacidad real del equipo puede cambiar respecto a lo previsto. Una persona puede ausentarse, asumir una tarea urgente o quedar sobrecargada mientras otro integrante dispone de capacidad.

El gestor debe observar estas situaciones y ajustar la distribución del trabajo cuando sea necesario. La finalidad no es mantener una asignación rígida, sino utilizar responsablemente la capacidad disponible para sostener el avance.

La capacidad depende de factores como disponibilidad, experiencia, carga actual y necesidad de coordinación. Redistribuir una actividad no significa simplemente trasladarla a cualquier persona; debe considerarse quién puede realizarla sin generar nuevos bloqueos o sobrecargas.

La gestión de capacidad también permite anticipar situaciones en las que una persona se convierte en un punto de dependencia para demasiadas actividades.

Ejemplo:
En un proyecto de plataforma educativa, la responsable de pruebas tiene tres actividades simultáneas. Una de ellas es necesaria para liberar una funcionalidad que ya está lista para validación.
Otro integrante del equipo tiene experiencia en pruebas funcionales y dispone de capacidad. El gestor redistribuye una actividad secundaria hacia esa persona y mantiene con la responsable de pruebas la actividad directamente relacionada con la liberación.`,
    },
  },
  {
    type: 'QUIZ',
    order: 42,
    blockData: {
      question: 'Actividad didáctica: Reorganiza el equipo\nEl gestor analiza decisiones frente a sobrecargas y ausencias. ¿Cuál de las siguientes decisiones es INCORRECTA?',
      options: [
        { id: 'a', text: 'Redistribuir una tarea de una persona sobrecargada hacia otro integrante con competencias compatibles.', isCorrect: false },
        { id: 'b', text: 'Asignar cualquier tarea a una persona disponible aunque no tenga las competencias necesarias.', isCorrect: true },
        { id: 'c', text: 'Proteger la capacidad de un especialista para una actividad crítica.', isCorrect: false },
        { id: 'd', text: 'Reasignar temporalmente el trabajo compatible de una persona ausente.', isCorrect: false },
      ],
      explanation: 'La disponibilidad por sí sola no garantiza que una persona pueda asumir correctamente una actividad. Gestionar la capacidad requiere equilibrar disponibilidad, competencias, carga de trabajo y prioridades.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 43,
    blockData: {
      title: 'Laboratorio de IA: Balanceo de Capacidad y Asignación Responsable',
      role: 'Actúa como gestor de recursos y capacidad en proyectos de software.',
      prompt: 'Analiza la carga actual del equipo de un proyecto TIC. Identifica posibles sobrecargas, ausencias y dependencias críticas. Sugiere una redistribución del trabajo considerando competencias y prioridades. No asignes tareas para las cuales no exista evidencia de competencia.\n\nEquipo:\n- Desarrollador A (Senior): Asignado a 4 módulos críticos (120% de carga)\n- Desarrollador B (Junior): Terminado su módulo asignado, disponible (20% de carga, sabe CSS/HTML, no sabe backend Java)\n- Módulo X: Maquetación frontend pendiente que estaba asignada al Desarrollador A.',
      guidance: 'Observa la recomendación precisa de la IA para transferir el módulo de maquetación compatible sin arriesgar la calidad.',
      reflectionQuestions: [
        '¿Por qué proteger la capacidad de los especialistas en actividades críticas evita retrasos en cascada?',
        '¿Cómo fomenta el aprendizaje del equipo asignar tareas compatibles a integrantes con capacidad disponible?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 15: Gestión del conocimiento y aprendizaje durante la ejecución
  {
    type: 'TEXT',
    order: 44,
    blockData: {
      heading: 'Pantalla 15: Gestión del conocimiento y aprendizaje durante la ejecución',
      content: `La ejecución genera conocimiento continuamente. El equipo descubre soluciones, toma decisiones, encuentra errores, modifica formas de trabajo y aprende de situaciones que no estaban previstas inicialmente.

Gestionar este conocimiento significa capturar aquello que puede ser útil para continuar el proyecto y evitar que información importante quede únicamente en conversaciones personales o se pierda cuando cambia algún integrante del equipo.

No todo lo que ocurre durante la ejecución debe registrarse. El gestor debe identificar información que tenga valor para el proyecto, como decisiones relevantes, soluciones a problemas, aprendizajes, cambios aprobados y acciones pendientes.

Este conocimiento permite mejorar la continuidad del trabajo y facilita que otros integrantes comprendan por qué se tomó una decisión o cómo se resolvió una situación.

Ejemplo:
Durante la integración de una plataforma, un desarrollador encuentra una solución para un error que aparecía al conectar dos componentes. La solución queda registrada únicamente en una conversación privada.
Días después, otro integrante encuentra el mismo problema. El gestor decide incorporar la solución y el aprendizaje relevante en el repositorio de conocimiento del proyecto para que pueda ser reutilizado.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 45,
    blockData: {
      title: 'Actividad didáctica: Recupera el conocimiento perdido',
      instruction: 'Selecciona cuáles situaciones deben formar parte del repositorio de conocimiento del proyecto y cuáles deben descartarse:',
      categories: ['Debe conservarse en el conocimiento del proyecto', 'Descartar (no aporta a la gestión del proyecto)'],
      items: [
        { id: 'k1', text: 'Decisión que modificó la forma de ejecutar una actividad', category: 'Debe conservarse en el conocimiento del proyecto' },
        { id: 'k2', text: 'Solución utilizada para resolver un problema recurrente', category: 'Debe conservarse en el conocimiento del proyecto' },
        { id: 'k3', text: 'Lección aprendida durante una integración técnica', category: 'Debe conservarse en el conocimiento del proyecto' },
        { id: 'k4', text: 'Conversación informal sobre el fin de semana', category: 'Descartar (no aporta a la gestión del proyecto)' },
        { id: 'k5', text: 'Cambio aprobado que afecta el trabajo futuro', category: 'Debe conservarse en el conocimiento del proyecto' },
        { id: 'k6', text: 'Acción preventiva pendiente asignada a un responsable', category: 'Debe conservarse en el conocimiento del proyecto' },
      ],
      explanation: 'El conocimiento del proyecto debe conservar información que facilite decisiones, continuidad y aprendizaje. Registrar todo indiscriminadamente genera ruido. El gestor debe seleccionar aquello que pueda ser reutilizado o que sea necesario para comprender la evolución del proyecto.',
      pointsAwarded: 25,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 46,
    blockData: {
      title: 'Laboratorio de IA: Extracción y Organización de Lecciones Aprendidas',
      role: 'Actúa como gestor del conocimiento en proyectos tecnológicos.',
      prompt: 'A partir de estas notas de ejecución de un proyecto TIC, identifica decisiones, soluciones, aprendizajes, acciones pendientes y aspectos que deberían verificarse. Organiza la información sin inventar datos y conserva la diferencia entre una decisión aprobada y una propuesta.\n\nNotas rápidas tomadas en la reunión de cierre de semana:\n- Juan resolvió el bug de timeout cambiando el pool de conexiones a 20.\n- María propuso migrar a Docker pero aún no se aprueba presupuesto.\n- Quedó acordado que los viernes no se harán despliegues a producción.\n- Falta verificar si el servidor de pruebas tiene suficiente espacio en disco.',
      guidance: 'Revisa cómo la IA organiza las notas en categorías claras sin confundir la propuesta de Docker con una decisión aprobada.',
      reflectionQuestions: [
        '¿Por qué es vital que las soluciones a errores técnicos se centralicen en una wiki o base de conocimiento?',
        '¿Cómo evita el gestor que las propuestas no aprobadas se ejecuten por error?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 16: Coordinación de proveedores y dependencias externas
  {
    type: 'TEXT',
    order: 47,
    blockData: {
      heading: 'Pantalla 16: Coordinación de proveedores y dependencias externas',
      content: `Durante la ejecución, el proyecto puede depender de organizaciones, servicios, especialistas o proveedores externos. Estas dependencias pueden afectar directamente el trabajo cuando cambian sus condiciones, presentan retrasos o requieren coordinación adicional.

El gestor debe mantener visibilidad sobre estas dependencias y actuar cuando una situación externa pueda afectar el avance. La gestión durante la ejecución se concentra en coordinar, comunicar, anticipar impactos y comprobar que el servicio o condición externa esté disponible cuando el proyecto lo necesita.

Una dependencia externa puede estar relacionada con infraestructura, servicios en la nube, plataformas de autenticación, licencias, soporte técnico o entrega de componentes. Aunque la actividad esté fuera del control directo del equipo, su impacto forma parte de la gestión del proyecto.

Cuando aparece una situación con un proveedor, el gestor debe determinar qué trabajo puede verse afectado, establecer comunicación con el responsable correspondiente y coordinar alternativas cuando sea necesario.

Ejemplo:
Una plataforma turística utiliza un servicio externo para autenticación de usuarios. El proveedor comunica que realizará una actualización durante el periodo en que el equipo tiene programadas pruebas de integración.
El gestor revisa qué actividades dependen del servicio, coordina con el proveedor la ventana de intervención y comunica al equipo las restricciones. Si la actualización afecta las pruebas, reorganiza las actividades que puedan ejecutarse mientras el servicio vuelve a estar disponible.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 48,
    blockData: {
      title: 'Actividad didáctica: Radar de dependencias externas',
      instruction: 'Relaciona cada alerta proveniente de un tercero con la acción adecuada:',
      categories: [
        'Confirmar disponibilidad y condiciones',
        'Identificar impacto y coordinar una alternativa de contacto',
        'Analizar qué trabajo puede verse afectado y coordinar el mantenimiento',
        'Analizar el impacto sobre la integración antes de continuar',
      ],
      items: [
        { id: 'p1', text: 'Alerta A: El proveedor de infraestructura anuncia mantenimiento durante una actividad de pruebas', category: 'Analizar qué trabajo puede verse afectado y coordinar el mantenimiento' },
        { id: 'p2', text: 'Alerta B: El contacto principal del proveedor estará ausente un día', category: 'Identificar impacto y coordinar una alternativa de contacto' },
        { id: 'p3', text: 'Alerta C: El proveedor confirma que el servicio requerido está disponible', category: 'Confirmar disponibilidad y condiciones' },
        { id: 'p4', text: 'Alerta D: El proveedor informa un cambio que podría modificar una integración', category: 'Analizar el impacto sobre la integración antes de continuar' },
      ],
      explanation: 'Las dependencias externas deben gestionarse desde su impacto sobre el proyecto. El gestor no controla directamente al proveedor, pero sí puede coordinar la comunicación, verificar condiciones, analizar efectos y ajustar el trabajo cuando una dependencia externa cambia.',
      pointsAwarded: 25,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 49,
    blockData: {
      title: 'Laboratorio de IA: Evaluación de Comunicaciones de Proveedores',
      role: 'Actúa como analista de contratos y dependencias externas TIC.',
      prompt: 'Analiza esta comunicación de un proveedor relacionada con un proyecto TIC. Identifica: cambio anunciado, actividades potencialmente afectadas, información que falta confirmar, impacto posible y acciones de coordinación recomendadas. No asumas que un cambio está aprobado ni inventes condiciones que no aparezcan en el mensaje.\n\nComunicado del proveedor:\n"Estimado cliente, el próximo sábado entre las 02:00 y las 06:00 realizaremos una actualización en nuestra API v2. A partir de esa fecha los campos de respuesta vendrán en formato ISO-8601 en lugar de epoch timestamp."',
      guidance: 'Aprende a desglosar el impacto técnico exacto de un cambio externo antes de que rompa la aplicación.',
      reflectionQuestions: [
        '¿Qué actividades de desarrollo y pruebas se ven directamente afectadas por este cambio de formato?',
        '¿Por qué no se debe asumir que un proveedor no romperá compatibilidad hacia atrás?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 17: Calidad durante la ejecución
  {
    type: 'TEXT',
    order: 50,
    blockData: {
      heading: 'Pantalla 17: Calidad durante la ejecución',
      content: `La calidad debe gestionarse durante el desarrollo del trabajo y no únicamente al final del proyecto. Las revisiones y verificaciones realizadas durante la ejecución permiten identificar problemas antes de que se acumulen.

La calidad se relaciona con los criterios que deben cumplir los resultados y con la evidencia utilizada para comprobar que esos criterios se están cumpliendo.

Las actividades de calidad pueden incluir revisiones, pruebas, inspecciones y verificaciones. Cuando se encuentra una desviación, el gestor debe coordinar su tratamiento y posteriormente comprobar que la corrección haya sido efectiva.

Esto permite reducir el riesgo de descubrir problemas importantes cuando el proyecto está próximo a entregar sus resultados.

Ejemplo:
Proyecto: Plataforma de atención
Durante una prueba de calidad se detecta que una solicitud registrada no aparece correctamente en el historial del usuario. El equipo corrige la funcionalidad y ejecuta nuevamente la prueba.
Criterio de aceptación: cada solicitud registrada debe aparecer correctamente en el historial del usuario, mostrando como mínimo su identificador, fecha y estado. El entregable se considera conforme únicamente cuando la prueba confirma el cumplimiento de este criterio.`,
    },
  },
  {
    type: 'QUIZ',
    order: 51,
    blockData: {
      question: 'Actividad: Inspector de calidad\n¿Cuál es el orden riguroso de las seis fases dentro del flujo de control y aseguramiento de la calidad?',
      options: [
        { id: 'a', text: 'Criterio de aceptación → Resultado de prueba → Defecto encontrado → Corrección → Reverificación → Aprobación', isCorrect: true },
        { id: 'b', text: 'Defecto encontrado → Corrección → Aprobación → Criterio de aceptación → Reverificación → Resultado de prueba', isCorrect: false },
        { id: 'c', text: 'Resultado de prueba → Corrección → Defecto encontrado → Reverificación → Criterio de aceptación → Aprobación', isCorrect: false },
        { id: 'd', text: 'Criterio de aceptación → Corrección → Reverificación → Defecto encontrado → Resultado de prueba → Aprobación', isCorrect: false },
      ],
      explanation: 'La calidad requiere establecer qué se espera y comprobarlo mediante evidencia. Una corrección no demuestra por sí sola que el problema haya desaparecido. La reverificación permite confirmar que el resultado vuelve a cumplir el criterio establecido antes de otorgar la aprobación final.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 52,
    blockData: {
      title: 'Laboratorio de IA: Auditoría de Criterios y Evidencias de Calidad',
      role: 'Actúa como especialista en aseguramiento de calidad (QA).',
      prompt: 'Analiza estos criterios y resultados de prueba de un proyecto TIC. Identifica posibles incumplimientos, evidencia faltante y aspectos que deberían verificarse nuevamente. No declares aprobado un resultado sin evidencia suficiente.\n\nCriterio de aceptación: La pasarela debe rechazar tarjetas expiradas mostrando el mensaje "Tarjeta vencida".\nResultado reportado: El desarrollador afirma "Ya corregí la validación en el código, quedó perfecto". No se adjunta captura ni log de ejecución de la prueba.',
      guidance: 'Observa cómo la IA detecta inmediatamente la falta de evidencia empírica para declarar conforme el entregable.',
      reflectionQuestions: [
        '¿Por qué la simple afirmación verbal del programador nunca es suficiente evidencia de calidad?',
        '¿Cómo ayuda el ciclo de reverificación a evitar la reaparición de defectos en etapas avanzadas?',
      ],
      pointsAwarded: 20,
    },
  },

  // Pantalla 18: IA generativa como apoyo a la ejecución
  {
    type: 'TEXT',
    order: 53,
    blockData: {
      heading: 'Pantalla 18: IA generativa como apoyo a la ejecución',
      content: `La IA generativa puede apoyar al gestor durante la ejecución en tareas como organizar información, resumir reuniones, comparar alternativas, preparar comunicaciones, estructurar reportes e identificar situaciones que requieren atención.

Sin embargo, una respuesta generada por IA no constituye automáticamente información verdadera ni una decisión del proyecto. El gestor debe revisar el contexto, verificar los datos y decidir qué información puede utilizar.

Un uso responsable puede seguir cuatro momentos:
1. Contextualizar: Proporcionar información suficiente y hechos verificados.
2. Solicitar: Formular una instrucción precisa y acotada con restricciones.
3. Revisar: Comparar la respuesta con la realidad y detectar posibles alucinaciones.
4. Utilizar: Aplicar únicamente aquello que ha sido validado bajo responsabilidad humana.

La IA puede acelerar tareas de análisis y organización, pero no debe inventar datos faltantes ni asumir la responsabilidad de las decisiones del gestor.

Ejemplo:
Proyecto: Sistema de atención
Después de una reunión, el gestor tiene notas desordenadas donde aparecen decisiones, problemas y acciones pendientes.
Utiliza IA para estructurar la información, pero posteriormente compara el resultado con las notas originales. Encuentra que la herramienta interpretó una propuesta como una decisión aprobada y corrige el resultado antes de incorporarlo al registro del proyecto.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 54,
    blockData: {
      title: 'Actividad: ¿IA, gestor o ambos?',
      instruction: 'Clasifica cada situación de gestión según la responsabilidad correspondiente:',
      categories: ['IA puede apoyar', 'IA puede apoyar, pero requiere verificación', 'Responsabilidad del gestor'],
      items: [
        { id: 'i1', text: 'Organizar notas desordenadas de una reunión', category: 'IA puede apoyar' },
        { id: 'i2', text: 'Proponer alternativas para resolver un bloqueo', category: 'IA puede apoyar, pero requiere verificación' },
        { id: 'i3', text: 'Confirmar si un usuario clave aprobó un cambio de alcance', category: 'Responsabilidad del gestor' },
        { id: 'i4', text: 'Preparar un borrador de resumen de estado semanal', category: 'IA puede apoyar, pero requiere verificación' },
        { id: 'i5', text: 'Decidir si aceptar una modificación que afecta el alcance y costo', category: 'Responsabilidad del gestor' },
      ],
      explanation: 'La IA es especialmente útil para organizar, resumir y estructurar información, pero sus resultados deben revisarse. Las aprobaciones formales y decisiones del proyecto requieren evidencia y responsabilidad humana. El gestor utiliza IA como apoyo sin delegar su responsabilidad.',
      pointsAwarded: 25,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 55,
    blockData: {
      title: 'Laboratorio de IA: Prompt Maestro para la Gestión de Ejecución',
      role: 'Actúa como asistente de gestión de un proyecto TIC.',
      prompt: `Rol: Actúa como asistente de gestión de un proyecto TIC.
Contexto: Analizarás información relacionada con el estado actual del proyecto.
Objetivo: Ayudarme a comprender la situación y preparar alternativas de gestión.
Instrucciones: Identifica hechos, problemas, dependencias, información faltante y posibles alternativas.
Restricciones: No inventes información, no presentes suposiciones como hechos y no tomes decisiones por mí.
Resultado: Presenta situación actual, información faltante, alternativas, posibles impactos y aspectos que debo verificar.

Información del proyecto: [Pega aquí los datos de la situación operativa que deseas analizar]`,
      guidance: 'Guarda esta plantilla: es la estructura de prompt profesional que asegura precisión, objetividad y control humano.',
      reflectionQuestions: [
        '¿Por qué las restricciones explícitas son fundamentales para evitar que la IA invente datos no proporcionados?',
        '¿Cómo ayuda la sección de "información faltante" a saber qué preguntas formular en la próxima reunión de equipo?',
      ],
      pointsAwarded: 25,
    },
  },

  // Pantalla 19: Simulación de ejecución: preparación y escenario inicial (Paso 1)
  {
    type: 'TEXT',
    order: 56,
    blockData: {
      heading: 'Pantalla 19: Simulación de ejecución — Preparación y Escenario Inicial',
      content: `Misión del Producto 1:
Comienza el Producto 1. Simulación de ejecución. Continuarás gestionando el proyecto TIC trabajado durante los niveles anteriores (o el caso conductor de la Plataforma Digital de Atención al Usuario).
Asumirás el rol de gestor del proyecto frente a la operación real.

Caso Conductor: Plataforma Digital de Atención al Usuario:
La organización busca implementar una plataforma que permita registrar solicitudes, consultar su estado y facilitar la atención ciudadana.

Equipo del Proyecto:
• Gestor del proyecto (Tú)
• Analista de requisitos
• Diseñador UI/UX
• Desarrollador
• Responsable de pruebas (QA)
• Usuario clave
• Proveedor de infraestructura cloud

Estado Inicial:
• Equipo: Disponible
• Diseño: Aprobado
• Desarrollo: Listo para iniciar
• Ambiente: Disponible
• Usuario clave: Disponible en la mañana (hasta las 11:00 a. m.)
• Proveedor: Activo
• Requisito sobre adjuntos: Requiere aclaración (no especifica formatos permitidos)

Situación Encontrada:
El desarrollador está listo para comenzar a codificar la pantalla de registro de solicitudes, pero identifica una duda sobre qué formatos de documentos adjuntos se permitirán (PDF, imágenes, tamaño máximo). El usuario clave puede atender la situación durante la mañana.`,
    },
  },
  {
    type: 'SCENARIO',
    order: 57,
    blockData: {
      title: 'Simulación de Ejecución: Misión 1 — Decisión Frente a Requisito Ambiguo',
      situation: 'El desarrollador está listo para codificar a las 8:00 a. m., pero los formatos de adjuntos no están definidos. El usuario clave solo estará disponible hasta las 11:00 a. m. Como gestor del proyecto, ¿cuál decisión tomas?',
      choices: [
        {
          id: 's1_c1',
          text: 'Autorizar el inicio del desarrollo inmediatamente para que el programador no pierda tiempo, asumiendo formatos comunes.',
          feedback: '❌ Reproceso generado: El desarrollador asumió formatos que el usuario rechazó en la validación, obligando a rehacer el componente.',
          isOptimal: false,
        },
        {
          id: 's1_c2',
          text: 'Coordinar de inmediato la aclaración con el usuario clave y el analista, confirmar los formatos requeridos y posteriormente autorizar el inicio del desarrollo.',
          feedback: '✅ Decisión óptima: Aprovechaste la ventana del usuario antes de las 11:00 a. m., confirmaste el requisito exacto y el desarrollo inició a las 9:30 a. m. con certeza y sin reprocesos.',
          isOptimal: true,
        },
        {
          id: 's1_c3',
          text: 'Detener todo el proyecto y esperar a la reunión semanal de seguimiento para discutir los formatos.',
          feedback: '⚠️ Demora injustificada: Detener el proyecto ante una duda puntual genera pérdidas innecesarias de tiempo y ritmo.',
          isOptimal: false,
        },
        {
          id: 's1_c4',
          text: 'Delegar la decisión completamente al desarrollador para que elija los formatos que técnicamente le resulten más fáciles.',
          feedback: '⚠️ Riesgo de desalineación: El criterio técnico no considera las restricciones legales ni de seguridad que el usuario clave necesita.',
          isOptimal: false,
        },
      ],
      pointsAwarded: 25,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 58,
    blockData: {
      stepNumber: 20,
      title: 'Simulación de Ejecución (Paso 1): Preparación y Escenario Inicial',
      instruction: 'Abre tu Bitácora del Producto 1 (Simulación de Ejecución) y registra las decisiones tomadas frente al escenario inicial de tu proyecto TIC:',
      fields: [
        { key: 'sim_caso_inicial', label: '1. Situación o ambigüedad inicial encontrada en el proyecto:', fieldType: 'textarea', maxWords: 100 },
        { key: 'sim_acciones_coordinacion', label: '2. Acciones de coordinación ejecutadas para habilitar el trabajo:', fieldType: 'textarea', maxWords: 100 },
        { key: 'sim_criterio_confirmado', label: '3. Regla de negocio o criterio de aceptación confirmado antes de iniciar:', fieldType: 'textarea', maxWords: 80 },
        { key: 'sim_estado_posterior_1', label: '4. Estado posterior del desarrollo y consecuencias inmediatas observadas:', fieldType: 'textarea', maxWords: 80 },
      ],
      advice: 'Demuestra cómo una intervención oportuna resuelve la incertidumbre sin paralizar el resto del proyecto.',
      pointsAwarded: 30,
    },
  },

  // Pantalla 20: Simulación de ejecución: desarrollo y situaciones (Paso 2)
  {
    type: 'TEXT',
    order: 59,
    blockData: {
      heading: 'Pantalla 20: Simulación de ejecución — Desarrollo y Situaciones',
      content: `Misión de Desarrollo:
El proyecto ya está en plena ejecución. A lo largo de la semana aparecen cuatro eventos simultáneos que ponen a prueba tu capacidad de liderazgo y coordinación:

Evento 1. Ausencia del analista:
El analista informa que estará ausente durante dos días por motivos de salud. Una actividad de desarrollo depende de una especificación detallada que él debía entregar.
Acciones del gestor: Buscar información disponible en los requisitos iniciales, coordinar con el usuario clave o reasignar temporalmente el trabajo a tareas que no dependan del analista.

Evento 2. Cambio del proveedor:
El proveedor de infraestructura anuncia una actualización que modificará los endpoints de una API externa utilizada para la integración.
Acciones del gestor: Analizar la dependencia, coordinar una prueba de verificación preventiva y verificar si la ventana de mantenimiento choca con actividades críticas.

Evento 3. Conflicto de prioridades:
El usuario clave exige que el equipo priorice una nueva pantalla para una demostración ante directivos. Al mismo tiempo, el desarrollador sostiene que debe corregirse primero un defecto que bloquea las pruebas del sistema.
Acciones del gestor: Analizar el impacto de ambas solicitudes, revisar dependencias y facilitar un acuerdo sustentado en las prioridades del proyecto.

Evento 4. Problema de calidad:
Durante una prueba de integración se detecta que una funcionalidad marcada previamente como "terminada" falla al procesar solicitudes con acentos o caracteres especiales.
Acciones del gestor: Registrar formalmente el defecto, coordinar la corrección técnica y programar la reverificación antes de dar conformidad.`,
    },
  },
  {
    type: 'SCENARIO',
    order: 60,
    blockData: {
      title: 'Simulación de Ejecución: Misión 2 — Gestión Multievento en Plena Ejecución',
      situation: 'Llega el jueves por la mañana: el proveedor anuncia una actualización inminente y el usuario clave presiona por la pantalla de demo mientras un defecto bloquea las pruebas. ¿Cuál es tu plan de acción coordinado?',
      choices: [
        {
          id: 's2_c1',
          text: 'Complacer al usuario desarrollando la nueva pantalla y posponer el análisis del proveedor y la corrección del defecto.',
          feedback: '❌ Colapso operativo: Durante la demo la plataforma falló por el defecto no corregido y la actualización del proveedor rompió los servicios no verificados.',
          isOptimal: false,
        },
        {
          id: 's2_c2',
          text: 'Priorizar la corrección del defecto bloqueante para habilitar las pruebas, programar la verificación preventiva con el proveedor y pactar con el usuario una maqueta interactiva para su demo sin comprometer el código base.',
          feedback: '✅ Excelente gestión integral: Mantuviste la integridad técnica, aseguraste la continuidad de las pruebas, blindaste la integración frente al proveedor y respondiste a la necesidad del cliente.',
          isOptimal: true,
        },
        {
          id: 's2_c3',
          text: 'Detener todo el desarrollo y convocar a una reunión de crisis de todo el equipo hasta el lunes siguiente.',
          feedback: '⚠️ Parálisis excesiva: Los problemas encontrados son gestionables mediante priorización ordenada; detener el proyecto genera retrasos graves e innecesarios.',
          isOptimal: false,
        },
      ],
      pointsAwarded: 25,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 61,
    blockData: {
      stepNumber: 21,
      title: 'Simulación de Ejecución (Paso 2): Matriz de Situaciones, Decisiones y Consecuencias',
      instruction: 'Registra en tu Bitácora cómo gestionaste cada uno de los cuatro eventos durante la simulación de ejecución:',
      fields: [
        { key: 'sim_gestion_analista', label: '1. Evento 1 (Ausencia del analista): Decisión tomada para no frenar el avance:', fieldType: 'textarea', maxWords: 80 },
        { key: 'sim_gestion_proveedor', label: '2. Evento 2 (Cambio del proveedor): Acciones de análisis de dependencia y verificación:', fieldType: 'textarea', maxWords: 80 },
        { key: 'sim_gestion_conflicto', label: '3. Evento 3 (Conflicto de prioridades): Criterio de facilitación y acuerdo alcanzado:', fieldType: 'textarea', maxWords: 80 },
        { key: 'sim_gestion_calidad', label: '4. Evento 4 (Defecto de calidad): Tratamiento, asignación de corrección y reverificación:', fieldType: 'textarea', maxWords: 80 },
      ],
      advice: 'Explica el impacto real que cada decisión tuvo sobre el estado del equipo, las dependencias y la calidad del entregable.',
      pointsAwarded: 35,
    },
  },

  // Pantalla 21: Simulación de ejecución: decisiones y resultados (Paso 3)
  {
    type: 'TEXT',
    order: 62,
    blockData: {
      heading: 'Pantalla 21: Simulación de ejecución — Decisiones y Resultados',
      content: `Misión Final: Cierre de la Etapa de Ejecución:
El proyecto se encuentra en una etapa avanzada de ejecución. Algunas actividades están completas, pero persisten condiciones que exigen una intervención final antes de dar paso al seguimiento formal:

Estado Acumulado:
• Equipo: Estable; un integrante presenta sobrecarga acumulada; el conflicto de prioridades anterior fue resuelto con éxito.
• Trabajo: Varias funcionalidades completadas; una actividad permanece bloqueada; la dependencia externa con el proveedor fue restablecida.
• Entregables: Implementación base terminada; un defecto crítico pendiente de reverificación; validación formal del usuario pendiente.

Acciones Disponibles del Gestor:
1. Redistribuir trabajo: Aliviar la sobrecarga del integrante redistribuyendo tareas secundarias compatibles.
2. Coordinar corrección: Pasar el defecto de pendiente a corregido con el desarrollador asignado.
3. Actualizar estado: Reflejar las nuevas condiciones en el tablero Kanban y cronograma.
4. Solicitar validación: Convocar al usuario clave para verificar la conformidad del entregable frente a criterios de aceptación.
5. Registrar decisión: Mantener la trazabilidad en la bitácora de lecciones aprendidas.
6. Convocar al equipo: Alinear al equipo sobre los próximos pasos hacia el módulo de seguimiento y métricas.`,
    },
  },
  {
    type: 'SCENARIO',
    order: 63,
    blockData: {
      title: 'Simulación de Ejecución: Misión 3 — Decisiones Finales y Liberación Conforme',
      situation: 'Para cerrar con éxito esta etapa de ejecución y entregar el primer incremento utilizable al usuario clave, ¿cuál es la secuencia óptima de decisiones?',
      choices: [
        {
          id: 's3_c1',
          text: 'Solicitar validación al usuario inmediatamente antes de corregir el defecto para no atrasar la entrega del sprint.',
          feedback: '❌ Validación fallida: El usuario encontró el defecto durante la revisión, rechazó el entregable y se perdió la confianza construida.',
          isOptimal: false,
        },
        {
          id: 's3_c2',
          text: 'Redistribuir trabajo secundario para proteger al integrante sobrecargado → Coordinar corrección del defecto → Reverificar la prueba de calidad → Solicitar validación formal al usuario → Registrar decisión y actualizar estado.',
          feedback: '✅ Excelente gestión: La carga del equipo quedó equilibrada, el entregable cumplió todos los criterios de aceptación, el usuario aprobó con satisfacción y el proyecto cuenta con trazabilidad total.',
          isOptimal: true,
        },
        {
          id: 's3_c3',
          text: 'Ignorar el estado de sobrecarga y exigir al equipo trabajar horas extras continuas para completar todo sin redistribución.',
          feedback: '⚠️ Riesgo de agotamiento (burnout): La sobrecarga no gestionada provoca nuevos defectos y desmotiva severamente al equipo técnico.',
          isOptimal: false,
        },
      ],
      pointsAwarded: 25,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 64,
    blockData: {
      stepNumber: 22,
      title: 'Simulación de Ejecución (Paso 3): Balance Consolidado del Producto 1',
      instruction: 'Consolida en tu Bitácora el registro final de tu Producto 1 (Simulación de Ejecución) para tu evaluación de Nivel 3:',
      fields: [
        { key: 'sim_balance_equipo', label: '1. Balance del Equipo: Roles, manejo de carga/sobrecarga y lecciones de liderazgo:', fieldType: 'textarea', maxWords: 100 },
        { key: 'sim_balance_entregables', label: '2. Balance de Entregables: Funcionalidades logradas y cumplimiento de criterios de aceptación:', fieldType: 'textarea', maxWords: 100 },
        { key: 'sim_balance_calidad', label: '3. Balance de Calidad y Proveedores: Defectos resueltos, reverificaciones y dependencias externas:', fieldType: 'textarea', maxWords: 100 },
        { key: 'sim_lecciones_ejecucion', label: '4. Principales lecciones aprendidas sobre coordinación e IA generativa en la ejecución:', fieldType: 'textarea', maxWords: 120 },
      ],
      advice: 'Este registro consolidado representa tu Producto 1: Simulación de Ejecución y servirá como insumo directo para el análisis de métricas en el Módulo 11.',
      pointsAwarded: 40,
    },
  },

  // Microevaluación Módulo 10 (10 preguntas)
  {
    type: 'EXAM',
    order: 65,
    blockData: {
      title: 'Microevaluación Módulo 10: Liderazgo, Equipo y Ejecución',
      description: 'Lee atentamente cada situación y selecciona la opción que consideres más adecuada. Las preguntas presentan escenarios relacionados con la ejecución de proyectos TIC, donde deberás aplicar tus conocimientos sobre liderazgo, coordinación de equipos, gestión de conflictos, problemas, avance, capacidad, calidad, dependencias externas y uso responsable de la IA generativa.',
      questionsCount: 10,
      pointsPerQuestion: 10,
      passingScore: 70,
      badgeKey: 'lider-ejecucion',
      pointsAwarded: 100,
      questions: [
        {
          id: 1,
          question: 'Un equipo está iniciando la ejecución de una plataforma digital para gestionar solicitudes de atención al usuario. Al comenzar el desarrollo, el analista identifica que una condición de una funcionalidad no quedó suficientemente clara y que existen dos interpretaciones posibles. El desarrollador considera que puede comenzar utilizando la interpretación que parece más lógica, mientras que el usuario clave estará disponible únicamente durante las próximas horas. ¿Cuál es la actuación más adecuada del gestor?',
          options: [
            { id: 'a', text: 'Autorizar el desarrollo inmediatamente y solicitar que cualquier diferencia encontrada se corrija posteriormente para evitar retrasar el inicio de la ejecución.' },
            { id: 'b', text: 'Coordinar la aclaración con el usuario y el analista, confirmar la interpretación que corresponde al resultado esperado y posteriormente autorizar el trabajo.' },
            { id: 'c', text: 'Solicitar al desarrollador que seleccione la interpretación más viable y registrar la decisión para revisarla durante la siguiente reunión del equipo.' },
            { id: 'd', text: 'Detener todas las actividades del proyecto hasta que todos los requisitos sean revisados nuevamente y no exista ninguna condición pendiente.' },
          ],
          correctOptionId: 'b',
          explanation: 'Pasar de la planificación a la ejecución requiere comprobar que las condiciones necesarias para realizar el trabajo estén suficientemente claras. Cuando existe una ambigüedad que puede generar reprocesos, el gestor debe coordinar su aclaración con las personas correspondientes antes de avanzar.',
        },
        {
          id: 2,
          question: 'En un proyecto para implementar una aplicación móvil participan dos integrantes con características diferentes. Uno de ellos tiene varios años de experiencia, conoce sus responsabilidades y trabaja con autonomía. El segundo integrante acaba de incorporarse al proyecto; posee las competencias técnicas, pero todavía no conoce completamente los acuerdos internos, los canales de comunicación ni la dinámica de toma de decisiones. ¿Cuál alternativa representa mejor una actuación de liderazgo adaptativo?',
          options: [
            { id: 'a', text: 'Aplicar el mismo nivel de supervisión a los dos integrantes para garantizar que todos reciban exactamente el mismo tratamiento durante la ejecución.' },
            { id: 'b', text: 'Mantener una supervisión permanente sobre ambos hasta finalizar el proyecto, ya que el gestor debe controlar directamente las actividades del equipo.' },
            { id: 'c', text: 'Dar mayor autonomía al integrante experimentado y proporcionar orientación y acompañamiento al nuevo integrante mientras se familiariza con la dinámica del proyecto.' },
            { id: 'd', text: 'Permitir que ambos trabajen de manera independiente y esperar a que soliciten apoyo cuando consideren que lo necesitan.' },
          ],
          correctOptionId: 'c',
          explanation: 'El liderazgo durante la ejecución debe adaptarse a las características, experiencia y necesidades de los integrantes del equipo. Una persona experimentada puede desempeñarse con mayor autonomía, mientras que un integrante nuevo puede requerir orientación y acompañamiento inicial.',
        },
        {
          id: 3,
          question: 'Durante la ejecución de una plataforma de atención al usuario, el responsable de pruebas solicita que el equipo dedique la jornada a corregir un defecto que impide validar una funcionalidad. Al mismo tiempo, el usuario clave insiste en que debe priorizarse una nueva funcionalidad porque será presentada en una demostración próxima. ¿Qué debería hacer el gestor ante esta situación?',
          options: [
            { id: 'a', text: 'Priorizar la solicitud del usuario clave porque representa directamente las necesidades del cliente y, por tanto, debe tener la mayor autoridad sobre el trabajo.' },
            { id: 'b', text: 'Priorizar el defecto señalado por pruebas porque los problemas de calidad siempre deben atenderse antes que cualquier nueva funcionalidad.' },
            { id: 'c', text: 'Analizar el impacto de ambas situaciones, considerar dependencias y prioridades del proyecto y facilitar una decisión con los involucrados.' },
            { id: 'd', text: 'Solicitar que los dos responsables lleguen a un acuerdo por sí mismos para evitar que el gestor intervenga directamente en los conflictos del equipo.' },
          ],
          correctOptionId: 'c',
          explanation: 'Los conflictos durante la ejecución deben abordarse considerando el impacto que las diferentes posiciones pueden producir sobre el proyecto. El gestor facilita la conversación, analiza prioridades y dependencias y orienta a los involucrados hacia una decisión sustentada.',
        },
        {
          id: 4,
          question: 'El equipo encargado de validar una plataforma no puede comenzar las pruebas porque el ambiente destinado para esta actividad presenta una falla. Infraestructura estima restablecerlo durante el mismo día. Mientras tanto, dos integrantes de pruebas permanecen disponibles y existe una actividad de documentación que no depende del ambiente. ¿Cuál decisión resulta más adecuada?',
          options: [
            { id: 'a', text: 'Esperar a que infraestructura solucione el problema y mantener al equipo sin nuevas actividades para evitar modificar la planificación.' },
            { id: 'b', text: 'Coordinar la recuperación del ambiente, mantener informado al equipo y aprovechar temporalmente la capacidad disponible en actividades que no dependan del ambiente.' },
            { id: 'c', text: 'Cancelar las pruebas previstas y reasignar definitivamente al equipo a otras actividades para evitar que el bloqueo continúe afectando el proyecto.' },
            { id: 'd', text: 'Solicitar al equipo que comience las pruebas utilizando cualquier ambiente disponible, aunque no sea el definido para la validación.' },
          ],
          correctOptionId: 'b',
          explanation: 'Los problemas que ya afectan la ejecución requieren una respuesta coordinada que permita recuperar las condiciones necesarias para continuar el trabajo. Mientras se atiende un bloqueo, el gestor puede aprovechar la capacidad disponible en actividades compatibles sin desviar la atención de la situación principal.',
        },
        {
          id: 5,
          question: 'El tablero de un proyecto muestra ocho actividades completadas, tres en ejecución y una bloqueada. La actividad bloqueada corresponde a una integración necesaria para iniciar posteriormente las pruebas del sistema. Un integrante propone comenzar dos actividades nuevas para mostrar mayor volumen de trabajo. ¿Cuál debería ser la prioridad del gestor?',
          options: [
            { id: 'a', text: 'Iniciar las dos actividades nuevas porque mantener varias tareas activas permite aprovechar mejor el tiempo disponible del equipo.' },
            { id: 'b', text: 'Finalizar primero las tres actividades que están en ejecución, aunque ninguna de ellas tenga relación directa con la integración bloqueada.' },
            { id: 'c', text: 'Resolver el bloqueo de la integración porque su avance habilita las pruebas y puede recuperar la continuidad del flujo de trabajo.' },
            { id: 'd', text: 'Mantener el plan original sin realizar ninguna modificación, debido a que ocho actividades completadas demuestran que el proyecto presenta un avance satisfactorio.' },
          ],
          correctOptionId: 'c',
          explanation: 'El avance de un proyecto no debe evaluarse únicamente por la cantidad de tareas completadas o abiertas, sino por el efecto que cada trabajo tiene sobre la continuidad del proyecto. Una actividad bloqueada que funciona como dependencia de otras requiere máxima atención.',
        },
        {
          id: 6,
          question: 'En un proyecto de plataforma educativa, la responsable de pruebas tiene cuatro actividades asignadas durante la misma semana (dos críticas para liberación y dos secundarias). Otro integrante del equipo tiene experiencia en pruebas funcionales, conoce el proyecto y actualmente dispone de capacidad para asumir una tarea adicional. ¿Qué decisión permite gestionar mejor la capacidad del equipo?',
          options: [
            { id: 'a', text: 'Mantener las cuatro actividades con la responsable de pruebas porque modificar las asignaciones durante la ejecución puede afectar la organización inicial.' },
            { id: 'b', text: 'Transferir una de las actividades críticas al integrante disponible para equilibrar inmediatamente la cantidad de tareas de ambos participantes.' },
            { id: 'c', text: 'Redistribuir una actividad secundaria compatible con las competencias del integrante disponible y mantener las actividades críticas con la responsable de pruebas.' },
            { id: 'd', text: 'Asignar todas las actividades pendientes al integrante disponible para liberar completamente a la responsable de pruebas de su carga actual.' },
          ],
          correctOptionId: 'c',
          explanation: 'Gestionar la capacidad del equipo implica considerar simultáneamente disponibilidad, competencias, carga de trabajo y prioridades del proyecto. Redistribuir una actividad secundaria reduce la sobrecarga sin comprometer las actividades críticas.',
        },
        {
          id: 7,
          question: 'Durante la integración de una plataforma, el equipo encuentra una solución para un error que había aparecido anteriormente y toma una decisión que modifica temporalmente las pruebas. ¿Cuál enfoque es más adecuado para gestionar el conocimiento generado durante la ejecución?',
          options: [
            { id: 'a', text: 'Registrar únicamente las decisiones formales, porque las soluciones y experiencias pertenecen principalmente a quienes ejecutaron las actividades.' },
            { id: 'b', text: 'Registrar toda la conversación del equipo sin realizar ninguna selección, porque cualquier comentario podría resultar útil posteriormente.' },
            { id: 'c', text: 'Capturar las decisiones, soluciones, aprendizajes y acciones relevantes que puedan contribuir a la continuidad y comprensión del proyecto.' },
            { id: 'd', text: 'Esperar hasta el cierre para recopilar los aprendizajes, cuando el equipo ya tenga una visión completa de todo lo ocurrido.' },
          ],
          correctOptionId: 'c',
          explanation: 'Gestionar el conocimiento no significa almacenar indiscriminadamente toda la conversación ni ignorar las soluciones técnicas. El gestor debe identificar y conservar aquello que tenga valor y utilidad real para la continuidad del proyecto.',
        },
        {
          id: 8,
          question: 'Una aplicación móvil depende de un servicio externo de autenticación. El proveedor informa que realizará una actualización durante el mismo periodo en que el equipo tiene programadas pruebas de integración. ¿Cuál es la respuesta más adecuada del gestor?',
          options: [
            { id: 'a', text: 'Detener todas las actividades del proyecto hasta que el proveedor garantice que la actualización no tendrá ningún efecto.' },
            { id: 'b', text: 'Ignorar el aviso porque la actualización pertenece a un proveedor externo y está fuera del control directo del equipo.' },
            { id: 'c', text: 'Identificar las actividades que dependen del servicio, analizar el posible impacto, coordinar con el proveedor y ajustar el trabajo si la situación lo requiere.' },
            { id: 'd', text: 'Solicitar inmediatamente al equipo de desarrollo que elimine la dependencia del proveedor para evitar cualquier riesgo futuro.' },
          ],
          correctOptionId: 'c',
          explanation: 'Las dependencias externas deben gestionarse a partir de su posible efecto sobre el trabajo del proyecto. El gestor debe obtener información, analizar las actividades afectadas y coordinar con el tercero antes de tomar decisiones apresuradas.',
        },
        {
          id: 9,
          question: 'En una plataforma digital de atención al usuario, durante una prueba se detecta que una solicitud registrada no aparece correctamente en el historial. El desarrollador corrige el código y afirma que el problema ya fue solucionado. Sin embargo, el criterio de aceptación exige mostrar el identificador, fecha y estado. ¿Cuál actuación es más adecuada?',
          options: [
            { id: 'a', text: 'Aceptar el resultado porque el desarrollador confirmó que realizó la corrección y el defecto ya no debería presentarse.' },
            { id: 'b', text: 'Considerar el entregable conforme porque la funcionalidad fue corregida y continuar con la siguiente actividad para evitar retrasos.' },
            { id: 'c', text: 'Solicitar una nueva prueba que permita comprobar el cumplimiento del criterio de aceptación antes de considerar conforme el resultado.' },
            { id: 'd', text: 'Rechazar definitivamente el entregable porque la aparición inicial del defecto demuestra que la funcionalidad no cumplía las condiciones del proyecto.' },
          ],
          correctOptionId: 'c',
          explanation: 'La calidad durante la ejecución requiere comprobar que el resultado cumple las condiciones establecidas mediante evidencias empíricas. La reverificación permite confirmar que el defecto realmente desapareció antes de aprobar el entregable.',
        },
        {
          id: 10,
          question: 'Al finalizar una reunión de seguimiento, el gestor utiliza una herramienta de IA generativa para organizar sus notas. La herramienta devuelve un resumen en el que califica como "decisión aprobada" una propuesta que en la reunión únicamente fue mencionada para ser analizada posteriormente. ¿Qué debería hacer el gestor?',
          options: [
            { id: 'a', text: 'Utilizar el resumen generado porque la IA puede identificar automáticamente las decisiones más importantes de una reunión.' },
            { id: 'b', text: 'Corregir manualmente la información y utilizar el resultado sin necesidad de revisar nuevamente las demás partes del resumen.' },
            { id: 'c', text: 'Verificar el contenido generado, diferenciar propuestas de decisiones aprobadas y corregir cualquier interpretación antes de incorporar la información al proyecto.' },
            { id: 'd', text: 'Dejar de utilizar IA para la gestión del proyecto porque un error en la interpretación demuestra que estas herramientas no son adecuadas para la ejecución.' },
          ],
          correctOptionId: 'c',
          explanation: 'La IA generativa apoya en la síntesis y organización, pero requiere validación humana obligatoria. El gestor debe verificar la información, diferenciar propuestas de acuerdos aprobados y asumir la responsabilidad de lo registrado.',
        },
      ],
    },
  },

  // Pantalla 22: ¡Felicitaciones! Has completado el Módulo 10
  {
    type: 'CHECKPOINT',
    order: 66,
    blockData: {
      title: '¡Felicitaciones! Has completado el Módulo 10 (Liderazgo, equipo y ejecución)',
      description: `Has completado el Módulo 10. Liderazgo, equipo y ejecución. Durante este módulo pasaste de la planificación a la ejecución y asumiste el papel de gestor de un proyecto TIC.\n\nAhora puedes:\n• Comprender cómo se desarrolla la ejecución de un proyecto TIC.\n• Coordinar equipos y responsabilidades durante el trabajo.\n• Aplicar diferentes formas de liderazgo según la situación.\n• Gestionar la comunicación, colaboración y motivación del equipo.\n• Intervenir ante conflictos que afectan la ejecución.\n• Gestionar problemas, impedimentos y bloqueos.\n• Analizar el avance y priorizar acciones durante la ejecución.\n• Coordinar el flujo de trabajo y la continuidad de los entregables.\n• Gestionar la capacidad y disponibilidad del equipo.\n• Capturar decisiones, experiencias y aprendizajes del proyecto.\n• Coordinar situaciones relacionadas con proveedores y dependencias externas.\n• Aplicar prácticas de calidad durante la ejecución.\n• Utilizar la IA generativa como apoyo para analizar y organizar situaciones del proyecto.\n• Verificar la información generada por IA antes de utilizarla.\n• Integrar lo aprendido en la Simulación de ejecución del proyecto TIC.\n\nRecompensas obtenidas: +100 XP | Insignia: Líder de la Ejecución`,
      criteria: [
        'Transición estructurada de la planificación a la ejecución de actividades TIC',
        'Liderazgo adaptativo según madurez, experiencia y contexto de trabajo',
        'Coordinación de roles, dependencias y flujo de entregables sin fricciones',
        'Mediación de conflictos y desbloqueo oportuno de incidentes y proveedores',
        'Control de calidad con reverificación y gestión del conocimiento del proyecto',
        'Uso responsable de IA generativa con validación humana en cada decisión',
        'Producto 1 (Simulación de ejecución) completado en los tres pasos de la bitácora',
        'Microevaluación de 10 preguntas aprobada satisfactoriamente',
      ],
      badgeKey: 'lider-ejecucion',
      pointsAwarded: 100,
    },
  },
]

async function main() {
  console.log('Reading current seed file to integrate Level 3 (Módulo 10)...')
  const fileContent = await readFile(SEED_FILE_PATH, 'utf-8')
  const currentSeed = JSON.parse(fileContent)

  // Keep all modules from Level 1 (modules 1-5) and Level 2 (modules 6-8)
  const existingModules = currentSeed.modules.filter((m: ModuleSeed) => (m.level ?? 1) < 3)

  const newModule10: ModuleSeed = {
    title: 'Módulo 10. Liderazgo, equipo y ejecución',
    order: 10,
    level: 3,
    levelTitle: 'Nivel 3: Ejecución, seguimiento y cierre',
    blocks: module10Blocks,
  }

  const allModules: ModuleSeed[] = [...existingModules, newModule10]

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
    modules: allModules,
  }

  await writeFile(SEED_FILE_PATH, JSON.stringify(updatedCourseSeed, null, 2), 'utf-8')
  console.log(`✓ Successfully updated ${SEED_FILE_PATH} with Nivel 3 (Módulo 10)!`)
}

main().catch((err) => {
  console.error('Error generating level 3 seed:', err)
  process.exit(1)
})
