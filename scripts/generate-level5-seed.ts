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
// MÓDULO 15: Uso responsable, gobernanza y proyecto final (NIVEL 5)
// =========================================================================
export const module15Blocks: BlockSeed[] = [
  // Pantalla 0: Introducción al Módulo 15
  {
    type: 'TEXT',
    order: 1,
    blockData: {
      heading: '¡Bienvenido al Módulo 15: Uso responsable, gobernanza y proyecto final!',
      content: `### NIVEL 5. GOBERNANZA Y PROYECTO INTEGRADOR
**Módulo 15. Uso responsable, gobernanza y proyecto final**
*Duración estimada:* 120 – 150 minutos | *Nivel:* Avanzado
*Producto:* Proyecto completo, sustentación y reflexión crítica.

#### Proyecto TIC Integral con IA Responsable y Gobernanza
El estudiante desarrollará y sustentará un nuevo proyecto TIC, integrando los aprendizajes de los niveles anteriores: comprensión y caracterización del proyecto, formulación y planificación, ejecución, seguimiento y cierre. Sobre este nuevo proyecto deberá determinar cómo utilizar la IA de manera responsable, diseñar sus propias instrucciones para interactuar con herramientas de IA, identificar riesgos éticos y regulatorios y establecer mecanismos de gobernanza, supervisión, trazabilidad y control.

#### Objetivo general
Diseñar y sustentar un proyecto TIC integral que incorpore inteligencia artificial mediante criterios éticos, regulatorios y de gobernanza, estableciendo mecanismos de uso responsable, gestión de riesgos, protección de datos, supervisión humana, trazabilidad y rendición de cuentas.

#### Objetivos específicos
• Comprender los fundamentos éticos asociados al diseño y uso de sistemas de IA y su impacto en proyectos TIC.
• Identificar valores, principios y criterios para evaluar aplicaciones de IA y reconocer riesgos éticos, sociales y técnicos.
• Diferenciar ética, regulación, cumplimiento, estándares, políticas institucionales y gobernanza.
• Analizar marcos regulatorios y normativos contemporáneos (AI Act de la UE, Ley 1581 de 2012 y CONPES 4144 de Colombia).
• Comprender las obligaciones relacionadas con privacidad, minimización y protección de datos personales.
• Analizar el enfoque basado en riesgos, la norma ISO/IEC 42001 y el marco NIST AI RMF (Generative AI Profile).
• Comprender la función de la gobernanza durante todo el ciclo de vida de un sistema de IA (autoridad, controles, supervisión, trazabilidad y rendición de cuentas).
• Aplicar todos estos elementos al nuevo proyecto TIC integral y preparar la sustentación final.

#### Mapa del módulo
Uso responsable de IA → Ética y principios → Riesgos e impactos → Privacidad y protección de datos → Regulación de IA → Normativas y marcos regulatorios → Gobernanza de IA → Roles y responsabilidades → Gestión del riesgo y controles → Trazabilidad y auditoría → Capacidades organizacionales → Proyecto final → Microevaluación → ¡Felicidades!`,
    },
  },

  // Pantalla 1: Ética en inteligencia artificial
  {
    type: 'TEXT',
    order: 2,
    blockData: {
      heading: 'Pantalla 1: Ética en inteligencia artificial',
      content: `### Concepto
La ética en inteligencia artificial estudia los principios y criterios que permiten valorar si el diseño, desarrollo, implementación y uso de sistemas de IA respeta valores humanos y sociales. No se limita a determinar si una tecnología funciona, sino que analiza sus consecuencias sobre las personas, las organizaciones y la sociedad.

### Explicación
Una solución puede ser legal o técnicamente eficiente y, al mismo tiempo, generar problemas graves de discriminación, exclusión o daño. La ética plantea preguntas críticas: ¿quién puede verse afectado?, ¿qué derechos podrían estar comprometidos?, ¿quién debe supervisar la decisión y qué riesgos son inaceptables?

### Ejemplo
Una empresa desarrolla una herramienta para calificar automáticamente candidatos a programas de formación. El sistema asigna puntuaciones inferiores de forma sistemática a determinados perfiles demográficos. Aunque el algoritmo procesa miles de registros en segundos, el equipo debe intervenir para corregir el sesgo discriminatorio y exigir supervisión humana.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 3,
    blockData: {
      title: 'Actividad: Radar ético',
      instruction: 'Clasifica cada decisión organizacional según su compatibilidad con un uso ético y responsable:',
      categories: ['Compatible con un uso responsable', 'Requiere intervención o control'],
      items: [
        { id: 'rad_1', text: 'Utilizar información personal de usuarios sin verificar si existe autorización expresa de tratamiento.', category: 'Requiere intervención o control' },
        { id: 'rad_2', text: 'Permitir que una IA recomiende candidatos pero exigir revisión humana calificada antes de decidir.', category: 'Compatible con un uso responsable' },
        { id: 'rad_3', text: 'Ocultar al usuario que una respuesta o informe fue generado por IA cuando dicha información es relevante.', category: 'Requiere intervención o control' },
        { id: 'rad_4', text: 'Evaluar periódicamente los resultados del modelo para detectar sesgos o tratamientos diferenciados.', category: 'Compatible con un uso responsable' },
        { id: 'rad_5', text: 'Permitir que el sistema tome decisiones irreversibles que afecten derechos sin posibilidad de apelación o revisión.', category: 'Requiere intervención o control' },
      ],
      explanation: 'El uso responsable exige transparencia, consentimiento de datos, auditoría de sesgos y supervisión humana con potestad de veto.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 4,
    blockData: {
      title: 'IA Aplicada: Evaluación ética de casos de uso',
      role: 'Consultor de ética aplicada en sistemas de inteligencia artificial',
      prompt: `Actúa como asesor de ética en IA para proyectos TIC. Te presentaré una situación de mi nuevo proyecto donde planeo utilizar IA. Analiza conmigo la propuesta formulando preguntas sobre: personas potencialmente afectadas, principios éticos comprometidos, riesgos de discriminación o daño y controles preventivos indispensables. No apruebes el caso de uso sin verificar antes estos aspectos.`,
      reflectionQuestions: [
        '¿Qué personas o grupos indirectos identificaste que podrían verse afectados por el sistema de IA?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 2: Importancia del uso responsable de IA
  {
    type: 'TEXT',
    order: 5,
    blockData: {
      heading: 'Pantalla 2: Importancia del uso responsable de IA',
      content: `### Concepto
El **uso responsable de IA** implica utilizar estas tecnologías considerando sus beneficios, riesgos, límites y efectos durante todo su ciclo de vida: selección, propósito, configuración, supervisión, documentación y gestión de incidentes.

### Pasar de principios a prácticas
No basta con publicar un código de principios en la página web; la responsabilidad se traduce en procedimientos operativos: definir quién autoriza una herramienta, qué datos están prohibidos ingresar en plataformas públicas y cómo se verifican los resultados antes de tomar decisiones de proyecto.`,
    },
  },
  {
    type: 'QUIZ',
    order: 6,
    blockData: {
      question: 'Una empresa propone cinco medidas para implementar IA en la gestión de proyectos. ¿Cuáles tres son indispensables antes de poner el sistema en operación?',
      options: [
        { id: 'resp_a', text: 'Definir finalidad y alcance específico, identificar riesgos potenciales y definir responsables claros de supervisión.', isCorrect: true, feedback: '¡Correcto! Propósito delimitado, gestión de riesgos y asignación de responsabilidad humana son los pilares obligatorios.' },
        { id: 'resp_b', text: 'Eliminar la supervisión humana, usar la herramienta por ser popular y delegar las decisiones al proveedor.', isCorrect: false, feedback: 'Incorrecto. La popularidad no es criterio técnico y eliminar la supervisión crea riesgos críticos.' },
        { id: 'resp_c', text: 'Permitir el ingreso de cualquier dato confidencial sin restricciones.', isCorrect: false, feedback: 'Incorrecto.' },
        { id: 'resp_d', text: 'Acelerar el despliegue sin realizar pruebas previas de seguridad ni verificación.', isCorrect: false, feedback: 'Incorrecto.' },
      ],
      explanation: 'El uso responsable exige propósito definido, identificación rigurosa de riesgos y asignación formal de responsabilidades.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 7,
    blockData: {
      title: 'IA Aplicada: Verificación de condiciones mínimas de uso responsable',
      role: 'Auditor de políticas de uso responsable de IA',
      prompt: `Te presentaré un caso de uso de IA de mi proyecto tecnológico. Evalúa si cumple las condiciones mínimas de uso responsable: 1) finalidad justificada, 2) confinamiento de datos, 3) mecanismos de supervisión y 4) procedimiento de contingencia ante fallos. Guíame mediante preguntas para subsanar los vacíos.`,
      reflectionQuestions: [
        '¿Qué procedimiento de contingencia definiste para cuando el modelo produzca resultados erróneos?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 3: Valores y principios de IA responsable
  {
    type: 'TEXT',
    order: 8,
    blockData: {
      heading: 'Pantalla 3: Valores y principios de IA responsable',
      content: `### Concepto
Los **valores** representan lo que una organización protege (dignidad, equidad, bienestar); los **principios** traducen esos valores en directrices operativas:
• **Justicia y no discriminación:** Trato equitativo e imparcial.
• **Transparencia y explicabilidad:** Claridad en el funcionamiento y justificación comprensible de salidas.
• **Privacidad y protección de datos:** Respeto a los derechos de los titulares y minimización.
• **Seguridad y robustez:** Resistencia frente a ataques, errores y uso no intencionado.
• **Responsabilidad y supervisión humana:** Obligación de responder y mantener el control humano.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 9,
    blockData: {
      title: 'Actividad: Empareja el principio de IA responsable',
      instruction: 'Relaciona cada situación u objetivo con el principio ético correspondiente:',
      categories: ['Privacidad', 'Justicia', 'Explicabilidad', 'Responsabilidad', 'Seguridad'],
      items: [
        { id: 'val_1', text: 'Proteger la confidencialidad de datos personales y limitar su uso a la finalidad autorizada.', category: 'Privacidad' },
        { id: 'val_2', text: 'Evitar tratamientos diferenciados perjudiciales o sesgos que excluyan a ciertos grupos.', category: 'Justicia' },
        { id: 'val_3', text: 'Permitir que una persona afectada comprenda los factores determinantes de una recomendación.', category: 'Explicabilidad' },
        { id: 'val_4', text: 'Designar a la persona o instancia formal encargada de aprobar y responder por las decisiones del sistema.', category: 'Responsabilidad' },
        { id: 'val_5', text: 'Garantizar que el sistema resista intentos de manipulación maliciosa, inyecciones o fugas de datos.', category: 'Seguridad' },
      ],
      explanation: 'Cada principio responde a una dimensión operativa que debe traducirse en controles verificables.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 10,
    blockData: {
      title: 'IA Aplicada: Matriz Caso de uso → Principio → Riesgo → Control',
      role: 'Especialista en gobernanza y matrices de control ético',
      prompt: `Ayúdame a construir una matriz de gobernanza ética para mi proyecto TIC. Para cada caso de uso que te proporcione, ayúdame a identificar: 1) Principio de IA responsable involucrado, 2) Riesgo ético u operativo asociado, 3) Control preventivo requerido y 4) Mecanismo de verificación humana. Formula preguntas para evaluar mi contexto.`,
      reflectionQuestions: [
        '¿Cómo tradujiste el principio de explicabilidad en un control técnico concreto en tu proyecto?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 4: Dilemas éticos en proyectos con IA
  {
    type: 'TEXT',
    order: 11,
    blockData: {
      heading: 'Pantalla 4: Dilemas éticos en proyectos tecnológicos',
      content: `### Concepto
Un **dilema ético** surge cuando objetivos legítimos entran en tensión: por ejemplo, aumentar la precisión del modelo o la velocidad del servicio a costa de recolectar masivamente datos personales o prescindir de la revisión humana.

### Toma de decisiones fundamentada
El gestor responsable no elige la opción que simplemente maximiza una métrica a corto plazo. Debe evaluar qué se gana, qué se arriesga, quién asume las consecuencias y cómo mitigar los impactos negativos.`,
    },
  },
  {
    type: 'QUIZ',
    order: 12,
    blockData: {
      question: 'Una plataforma educativa evalúa usar IA para predecir deserción estudiantil analizando datos personales y de comportamiento. ¿Cuál alternativa representa el enfoque responsable?',
      options: [
        { id: 'dil_a', text: 'Implementar de inmediato en toda la institución porque el beneficio potencial de retención es muy alto.', isCorrect: false, feedback: 'Incorrecto. Implementar sin evaluar riesgos expone a la institución y a los estudiantes a graves vulneraciones.' },
        { id: 'dil_b', text: 'Cancelar cualquier uso de IA porque siempre existe algún nivel de riesgo.', isCorrect: false, feedback: 'Incorrecto. El riesgo cero no existe; la gestión responsable busca mitigar y controlar los riesgos, no paralizar la innovación.' },
        { id: 'dil_c', text: 'Implementar un piloto controlado, evaluar riesgos de privacidad y sesgo, definir supervisión docente y establecer mecanismos de revisión y apelación para los estudiantes.', isCorrect: true, feedback: '¡Excelente! Equilibra el beneficio de intervención temprana con protección de datos, gobernanza y salvaguardas humanas.' },
        { id: 'dil_d', text: 'Delegar la decisión completamente al proveedor externo de la nube.', isCorrect: false, feedback: 'Incorrecto. La responsabilidad ética y de gobernanza no puede tercerizarse.' },
      ],
      explanation: 'Gestionar responsablemente implica balancear riesgos con salvaguardas, pilotos controlados y supervisión activa.',
      pointsAwarded: 10,
    },
  },

  // Pantalla 5: Transparencia y explicabilidad
  {
    type: 'TEXT',
    order: 13,
    blockData: {
      heading: 'Pantalla 5: Transparencia, explicabilidad y trazabilidad',
      content: `### Conceptos clave
• **Transparencia:** Comunicar claramente a los usuarios que están interactuando con un sistema de IA o que un contenido fue generado por ella.
• **Explicabilidad:** Capacidad de entender la lógica y los factores determinantes detrás de un resultado.
• **Trazabilidad:** Capacidad de registrar y reconstruir las versiones de modelos, datos e instrucciones que originaron una salida.
• **Supervisión humana:** Capacidad real de una persona autorizada de intervenir, modificar o revocar una decisión del sistema.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 14,
    blockData: {
      title: 'Actividad: Abre la caja negra de la gobernanza',
      instruction: 'Asigna a cada situación la dimensión de gobernanza correspondiente:',
      categories: ['Transparencia', 'Explicabilidad', 'Trazabilidad', 'Supervisión humana'],
      items: [
        { id: 'box_1', text: 'El sistema informa al ciudadano que su solicitud será preclasificada mediante un modelo de IA.', category: 'Transparencia' },
        { id: 'box_2', text: 'El sistema registra qué versión del modelo y qué parámetros generaron una recomendación específica.', category: 'Trazabilidad' },
        { id: 'box_3', text: 'Un analista puede consultar cuáles variables de la solicitud tuvieron mayor ponderación en la prioridad calculada.', category: 'Explicabilidad' },
        { id: 'box_4', text: 'Un funcionario calificado puede revocar o modificar la prioridad asignada por la IA cuando existan condiciones especiales.', category: 'Supervisión humana' },
      ],
      explanation: 'La transparencia informa; la explicabilidad justifica; la trazabilidad audita el histórico; y la supervisión humana mantiene el control.',
      pointsAwarded: 15,
    },
  },

  // Pantalla 6: Responsabilidad y rendición de cuentas
  {
    type: 'TEXT',
    order: 15,
    blockData: {
      heading: 'Pantalla 6: Responsabilidad y rendición de cuentas (Accountability)',
      content: `### Concepto
La **responsabilidad** asigna obligaciones; la **rendición de cuentas** exige demostrar con evidencias qué se decidió, quién intervino, con qué controles y qué ocurrió después.

### Evitar el vacío de responsabilidad
Nunca se debe aceptar la excusa de *"la IA fue quien decidió"*. Las herramientas de IA son instrumentos técnicos; la responsabilidad jurídica y organizativa es siempre de las personas y de la organización.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 16,
    blockData: {
      title: 'Actividad: ¿Quién responde en la gobernanza?',
      instruction: 'Asigna a cada responsabilidad el rol organizacional correspondiente:',
      categories: ['Dirección institucional', 'Responsable autorizado', 'Equipo técnico', 'Responsable de operación', 'Comité de gobernanza'],
      items: [
        { id: 'resp_rol_1', text: 'Define la política general institucional y aprueba los lineamientos para el uso de IA.', category: 'Dirección institucional' },
        { id: 'resp_rol_2', text: 'Aprueba formalmente un caso de uso específico tras validar su evaluación de impacto.', category: 'Responsable autorizado' },
        { id: 'resp_rol_3', text: 'Configura, entrena, integra y mantiene técnicamente la infraestructura de IA.', category: 'Equipo técnico' },
        { id: 'resp_rol_4', text: 'Supervisa las operaciones cotidianas y verifica las salidas del sistema antes de aplicarlas.', category: 'Responsable de operación' },
        { id: 'resp_rol_5', text: 'Investiga incidentes de seguridad, sesgos o fallos graves y define planes de acción correctiva.', category: 'Comité de gobernanza' },
      ],
      explanation: 'Asignar roles y límites de autoridad claros evita vacíos de responsabilidad ante auditorías e incidentes.',
      pointsAwarded: 15,
    },
  },

  // Pantalla 7: ¿Por qué regular la inteligencia artificial?
  {
    type: 'TEXT',
    order: 17,
    blockData: {
      heading: 'Pantalla 7: ¿Por qué regular la inteligencia artificial?',
      content: `### Concepto
La regulación establece obligaciones, prohibiciones y derechos exigibles jurídicamente. La ética orienta lo que debería hacerse; la regulación determina lo que es obligatorio cumplir bajo sanción legal.

### Convivencia armónica
Un proyecto debe cumplir la ley y, al mismo tiempo, aplicar principios éticos organizacionales que pueden ser más estrictos que el mínimo legal vigente.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 18,
    blockData: {
      title: 'Actividad: ¿Ética, regulación o ambas?',
      instruction: 'Determina el origen de cada obligación o decisión en el proyecto:',
      categories: ['Ética', 'Regulación jurídica', 'Ambas dimensiones', 'Política interna'],
      items: [
        { id: 'reg_1', text: 'El equipo decide no generar respuestas manipuladoras aunque aún no exista una ley expresa en su país.', category: 'Ética' },
        { id: 'reg_2', text: 'El proyecto debe notificar incidentes de seguridad de datos a la autoridad competente bajo sanción legal.', category: 'Regulación jurídica' },
        { id: 'reg_3', text: 'El proyecto protege datos personales porque la ley lo exige y porque la empresa lo reconoce como valor fundamental.', category: 'Ambas dimensiones' },
        { id: 'reg_4', text: 'La empresa prohíbe el uso de ciertas herramientas gratuitas de IA para proteger secretos comerciales propios.', category: 'Política interna' },
      ],
      explanation: 'Diferenciar entre exigencias legales, directrices éticas y políticas internas permite estructurar un cumplimiento ordenado.',
      pointsAwarded: 15,
    },
  },

  // Pantalla 8: Tipos de instrumentos
  {
    type: 'TEXT',
    order: 19,
    blockData: {
      heading: 'Pantalla 8: Tipos de instrumentos normativos y de gestión',
      content: `### Taxonomía de instrumentos
• **Ley:** Norma jurídica de obligatorio cumplimiento aprobada por el legislador.
• **Reglamento:** Disposición que desarrolla y detalla la aplicación de una ley.
• **Norma o estándar internacional (ej. ISO/IEC 42001):** Requisitos técnicos para sistemas de gestión certificables.
• **Marco de referencia voluntario (ej. NIST AI RMF):** Guía metodológica para estructurar la gestión de riesgos.
• **Política interna:** Reglas corporativas adoptadas por una organización.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 20,
    blockData: {
      title: 'Actividad: Clasificador normativo',
      instruction: 'Relaciona cada instrumento con su naturaleza jurídica u organizacional:',
      categories: ['Obligación jurídica vinculante', 'Norma internacional certificable', 'Marco voluntario de gestión', 'Regla organizacional interna'],
      items: [
        { id: 'inst_1', text: 'Ley 1581 de 2012 de Protección de Datos Personales en Colombia.', category: 'Obligación jurídica vinculante' },
        { id: 'inst_2', text: 'ISO/IEC 42001:2023 (Sistema de Gestión de Inteligencia Artificial).', category: 'Norma internacional certificable' },
        { id: 'inst_3', text: 'NIST AI Risk Management Framework (AI RMF 1.0).', category: 'Marco voluntario de gestión' },
        { id: 'inst_4', text: 'Política de Uso Aceptable de Herramientas de IA de la Empresa TecnoGestión S.A.S.', category: 'Regla organizacional interna' },
      ],
      explanation: 'Nunca confundas un marco voluntario o estándar técnico con una ley nacional vinculante.',
      pointsAwarded: 15,
    },
  },

  // Pantalla 9: Enfoque basado en riesgos
  {
    type: 'TEXT',
    order: 21,
    blockData: {
      heading: 'Pantalla 9: Enfoque basado en riesgos',
      content: `### Concepto
El **enfoque basado en riesgos** modula la intensidad de los controles y requisitos según la magnitud del impacto potencial sobre los derechos, la seguridad y los intereses de las personas.

### Proporcionalidad
No tiene sentido aplicar controles de auditoría forense a un generador de títulos para diapositivas, ni dejar sin supervisión humana a un modelo que evalúa el acceso a un subsidio o empleo.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 22,
    blockData: {
      title: 'Actividad: Semáforo de riesgo para casos de IA',
      instruction: 'Clasifica cada caso de uso según su nivel de impacto y exigencia de control:',
      categories: ['Bajo impacto', 'Requiere evaluación adicional', 'Alto impacto potencial'],
      items: [
        { id: 'sem_1', text: 'Generar ideas de nombres para una campaña interna donde el equipo elige manualmente.', category: 'Bajo impacto' },
        { id: 'sem_2', text: 'Resumir actas de reuniones internas con revisión obligatoria del secretario antes de emitir.', category: 'Bajo impacto' },
        { id: 'sem_3', text: 'Filtrar y clasificar hojas de vida de candidatos recomendando quiénes pasan de ronda.', category: 'Requiere evaluación adicional' },
        { id: 'sem_4', text: 'Recomendar la denegación de un servicio de salud esencial o crédito financiero.', category: 'Alto impacto potencial' },
        { id: 'sem_5', text: 'Chatbot de atención ciudadana que deriva casos con datos sensibles a funcionarios humanos.', category: 'Requiere evaluación adicional' },
      ],
      explanation: 'A mayor probabilidad y severidad de impacto en derechos, mayor rigurosidad en gobernanza y supervisión.',
      pointsAwarded: 15,
    },
  },

  // Pantalla 10: Ley de IA de la Unión Europea (AI Act)
  {
    type: 'TEXT',
    order: 23,
    blockData: {
      heading: 'Pantalla 10: Ley de IA de la Unión Europea (AI Act)',
      content: `### Marco pionero mundial
El Reglamento de IA de la UE (AI Act) clasifica los sistemas en cuatro niveles:
1. **Riesgo inaceptable (Prohibidos):** Manipulación subliminal, puntuación social ciudadana, biometría en tiempo real en espacios públicos sin orden judicial.
2. **Alto riesgo:** Empleo, educación, infraestructuras críticas, justicia, acceso a servicios esenciales (sujetos a rigurosas auditorías, gestión de riesgos y supervisión humana).
3. **Riesgo específico de transparencia:** Chatbots, deepfakes, sistemas generativos (deben informar al usuario que interactúa con IA).
4. **Riesgo mínimo:** Filtros de spam, videojuegos con IA (sin obligaciones adicionales).

### Aplicación progresiva
Las prohibiciones entraron en vigor a inicios de 2025; las reglas de gobernanza y modelos de uso general en agosto de 2025; y las obligaciones de alto riesgo en 2026-2027.`,
    },
  },
  {
    type: 'QUIZ',
    order: 24,
    blockData: {
      question: 'Respecto a la Ley de IA de la Unión Europea (AI Act), ¿cuál combinación de afirmaciones es correcta?',
      options: [
        { id: 'act_a', text: 'Establece un enfoque basado en riesgos, exige obligaciones de transparencia para sistemas generativos y contempla prohibiciones para ciertas prácticas inaceptables.', isCorrect: true, feedback: '¡Correcto! El AI Act prohíbe ciertas prácticas, regula alto riesgo y exige transparencia.' },
        { id: 'act_b', text: 'Prohíbe todos los sistemas de IA en territorio europeo sin excepción.', isCorrect: false, feedback: 'Falso.' },
        { id: 'act_c', text: 'Aplica exactamente los mismos controles a un videojuego que a un sistema de diagnóstico médico.', isCorrect: false, feedback: 'Falso. Sigue un enfoque escalonado por riesgo.' },
        { id: 'act_d', text: 'Entró en vigor íntegramente en un solo día sin calendario de transición.', isCorrect: false, feedback: 'Falso. Su aplicación es por fases plurianuales.' },
      ],
      explanation: 'El AI Act es un marco por niveles de riesgo con aplicación gradual y exigencias proporcionales.',
      pointsAwarded: 10,
    },
  },

  // Pantalla 11: IA y protección de datos personales en Colombia
  {
    type: 'TEXT',
    order: 25,
    blockData: {
      heading: 'Pantalla 11: Protección de datos en Colombia (Ley 1581 de 2012)',
      content: `### Marco normativo colombiano
La **Ley 1581 de 2012** regula el tratamiento de datos personales en Colombia, supervisada por la Superintendencia de Industria y Comercio (SIC).

### Principio de Minimización y Datos Sensibles
Tener datos disponibles no autoriza su uso para entrenar o alimentar modelos de IA. Solo deben recolectarse los datos estrictamente necesarios y proporcionales a la finalidad informada y autorizada por el titular. Los datos sensibles (salud, biometría, convicciones) requieren protección reforzada y consentimiento explícito.`,
    },
  },
  {
    type: 'QUIZ',
    order: 26,
    blockData: {
      question: 'Una app turística con IA quiere recolectar para su perfil: Nombre, Correo, Ubicación exacta en tiempo real, Cédula, Historial completo de navegación e Idioma. ¿Cuáles datos requieren justificación estricta de necesidad y proporcionalidad según la Ley 1581?',
      options: [
        { id: 'dat_a', text: 'Ubicación exacta en tiempo real, Número de identificación (cédula) e Historial completo de navegación.', isCorrect: true, feedback: '¡Correcto! Son datos altamente sensibles o intrusivos que requieren justificar por qué una alternativa menos invasiva no es suficiente.' },
        { id: 'dat_b', text: 'Únicamente el nombre de pila y la preferencia de idioma.', isCorrect: false, feedback: 'Incorrecto. Esos son datos pertinentes y básicos para personalizar el servicio.' },
        { id: 'dat_c', text: 'Ninguno, porque el usuario aceptó términos genéricos al instalar la app.', isCorrect: false, feedback: 'Incorrecto. El consentimiento genérico no exime del principio de proporcionalidad y necesidad.' },
        { id: 'dat_d', text: 'Solo el correo electrónico.', isCorrect: false, feedback: 'Incorrecto.' },
      ],
      explanation: 'Minimización de datos exige demostrar por qué cada dato invasivo es estrictamente indispensable para el servicio.',
      pointsAwarded: 10,
    },
  },

  // Pantalla 12: Política Nacional de IA en Colombia (CONPES 4144)
  {
    type: 'TEXT',
    order: 27,
    blockData: {
      heading: 'Pantalla 12: Política Nacional de IA: CONPES 4144 de 2025',
      content: `### Hoja de ruta de política pública
El documento **CONPES 4144 de 2025** define la Política Nacional de Inteligencia Artificial de Colombia.

### Diferencia crucial
Un documento CONPES es un instrumento de **política pública y planeación estatal**, no una ley aprobada por el Congreso. Traza 6 ejes estratégicos: ética y gobernanza, infraestructura y datos, innovación, talento digital, mitigación de riesgos y adopción responsable. Sirve como brújula estratégica para proyectos del sector público y privado.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 28,
    blockData: {
      title: 'Actividad: ¿Ley, política o marco de referencia?',
      instruction: 'Relaciona cada instrumento normativo o de gestión con su categoría jurídica exacta:',
      categories: ['Norma jurídica vinculante', 'Documento de política pública', 'Estándar internacional certificable', 'Marco voluntario de riesgos', 'Regla organizacional interna'],
      items: [
        { id: 'conp_1', text: 'Ley 1581 de 2012 de Colombia.', category: 'Norma jurídica vinculante' },
        { id: 'conp_2', text: 'CONPES 4144 de 2025 (Política Nacional de IA de Colombia).', category: 'Documento de política pública' },
        { id: 'conp_3', text: 'ISO/IEC 42001:2023.', category: 'Estándar internacional certificable' },
        { id: 'conp_4', text: 'NIST AI Risk Management Framework (AI RMF).', category: 'Marco voluntario de riesgos' },
        { id: 'conp_5', text: 'Política interna de seguridad de datos de la empresa.', category: 'Regla organizacional interna' },
      ],
      explanation: 'Distinguir la fuerza vinculante y naturaleza de cada instrumento es indispensable para la gobernanza.',
      pointsAwarded: 15,
    },
  },

  // Pantalla 13: ¿Qué es la gobernanza de IA?
  {
    type: 'TEXT',
    order: 29,
    blockData: {
      heading: 'Pantalla 13: ¿Qué es la gobernanza de IA?',
      content: `### Concepto
La **gobernanza de IA** es el conjunto de estructuras, reglas, autoridades, procesos y controles mediante los cuales una organización dirige, supervisa, audita y responde por el desarrollo y uso de sistemas de IA.

### Preguntas operativas
¿Quién aprueba un nuevo caso de uso? ¿Quién tiene autoridad para detener un modelo en producción? ¿Qué registros se guardan? ¿Cómo se gestionan incidentes éticos o de seguridad?`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 30,
    blockData: {
      title: 'Actividad: Construye los pilares de la gobernanza',
      instruction: 'Asocia cada necesidad de gestión con el componente de gobernanza correspondiente:',
      categories: ['Autoridad de decisión', 'Responsabilidades', 'Políticas', 'Controles', 'Gestión de riesgos', 'Mecanismos de reporte', 'Seguimiento'],
      items: [
        { id: 'pil_1', text: 'Determinar quién tiene el poder formal de autorizar o suspender un sistema de IA.', category: 'Autoridad de decisión' },
        { id: 'pil_2', text: 'Establecer quién responde por las decisiones y tareas asignadas.', category: 'Responsabilidades' },
        { id: 'pil_3', text: 'Definir las reglas de obligatorio cumplimiento para el uso de herramientas.', category: 'Políticas' },
        { id: 'pil_4', text: 'Establecer medidas técnicas y humanas para prevenir y mitigar fallos.', category: 'Controles' },
        { id: 'pil_5', text: 'Identificar, clasificar y valorar posibles impactos negativos.', category: 'Gestión de riesgos' },
        { id: 'pil_6', text: 'Definir canales para comunicar incidentes, quejas o anomalías.', category: 'Mecanismos de reporte' },
        { id: 'pil_7', text: 'Auditar periódicamente si los controles continúan siendo efectivos.', category: 'Seguimiento' },
      ],
      explanation: 'Una gobernanza sólida articula políticas, autoridad, roles, controles, gestión de riesgos, reporte y auditoría continua.',
      pointsAwarded: 15,
    },
  },

  // Pantalla 14: Gobernanza, gestión y cumplimiento
  {
    type: 'TEXT',
    order: 31,
    blockData: {
      heading: 'Pantalla 14: Gobernanza, gestión y cumplimiento',
      content: `### Tres funciones indispensables
• **Gobernanza:** Define la dirección, asigna autoridad y establece mecanismos de supervisión (¿Quién decide y controla?).
• **Gestión:** Planifica, coordina y ejecuta las actividades para lograr los objetivos (¿Cómo se hace el trabajo?).
• **Cumplimiento (Compliance):** Verifica que las actuaciones respeten las leyes, normas y políticas vigentes (¿Se acatan las reglas?).`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 32,
    blockData: {
      title: 'Actividad: Detectives de las tres dimensiones',
      instruction: 'Clasifica cada situación de proyecto en Gobernanza, Gestión o Cumplimiento:',
      categories: ['Gobernanza', 'Gestión', 'Cumplimiento'],
      items: [
        { id: 'dim_1', text: 'El comité directivo establece quién tiene la autoridad para autorizar el despliegue a producción.', category: 'Gobernanza' },
        { id: 'dim_2', text: 'El equipo de desarrollo configura la API y programa las pruebas técnicas de rendimiento.', category: 'Gestión' },
        { id: 'dim_3', text: 'El oficial de privacidad audita si el tratamiento de datos respeta la Ley 1581.', category: 'Cumplimiento' },
        { id: 'dim_4', text: 'El gestor actualiza el cronograma y reasigna tareas de desarrollo.', category: 'Gestión' },
        { id: 'dim_5', text: 'Se define la política que faculta al líder de calidad a suspender el modelo ante fallos graves.', category: 'Gobernanza' },
      ],
      explanation: 'Gobernanza dirige y autoriza; Gestión ejecuta y coordina; Cumplimiento audita y verifica.',
      pointsAwarded: 15,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 33,
    blockData: {
      title: 'IA Aplicada: Revisor conceptual de decisiones de proyecto',
      role: 'Auditor de gobernanza, gestión y cumplimiento',
      prompt: `Actúa como revisor de gobernanza de proyectos TIC. Te describiré varias decisiones tomadas en mi proyecto. Clasifica cada una en Gobernanza, Gestión o Cumplimiento y señala si existe algún vacío de autoridad o de verificación legal que deba corregirse antes de continuar.`,
      reflectionQuestions: [
        '¿Identificaste alguna decisión técnica que se tomó sin contar con la autorización formal de gobernanza?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 15: Niveles de gobernanza
  {
    type: 'TEXT',
    order: 34,
    blockData: {
      heading: 'Pantalla 15: Niveles de gobernanza de la IA',
      content: `### Gobernanza multinivel
La gobernanza opera desde la base operativa hasta el marco global:
1. **Equipo de desarrollo/proyecto:** Acuerdos técnicos, revisiones de código, prompts y pruebas.
2. **Organización:** Políticas corporativas, comités de ética, seguridad de la información.
3. **Sectorial/Industria:** Estándares bancarios, sanitarios o de telecomunicaciones.
4. **Nacional:** Leyes de datos, ciberseguridad y políticas de Estado.
5. **Internacional:** Tratados, acuerdos multilaterales y estándares globales (ISO, OCDE, UNESCO).`,
    },
  },
  {
    type: 'QUIZ',
    order: 35,
    blockData: {
      question: '¿Cuál es el orden secuencial correcto de los niveles de gobernanza, desde el más cercano a la operación del proyecto hasta el más amplio?',
      options: [
        { id: 'niv_a', text: 'Equipo del proyecto → Organización → Sector o industria → Nacional → Internacional.', isCorrect: true, feedback: '¡Correcto! Representa la progresión de gobernanza multinivel desde la operación hasta los marcos globales.' },
        { id: 'niv_b', text: 'Internacional → Nacional → Sector → Organización → Equipo.', isCorrect: false, feedback: 'Ese es el orden inverso (desde el más amplio al más cercano).' },
        { id: 'niv_c', text: 'Organización → Equipo → Nacional → Sector → Internacional.', isCorrect: false, feedback: 'El equipo es más cercano a la operación que la organización general.' },
        { id: 'niv_d', text: 'Sector → Equipo → Organización → Internacional → Nacional.', isCorrect: false, feedback: 'Incorrecto.' },
      ],
      explanation: 'La gobernanza multinivel inicia en los controles del equipo y escala hasta los acuerdos internacionales.',
      pointsAwarded: 10,
    },
  },

  // Pantalla 16: Roles, autoridad y responsabilidad
  {
    type: 'TEXT',
    order: 36,
    blockData: {
      heading: 'Pantalla 16: Roles, autoridad y límites de decisión',
      content: `### Autoridad efectiva
Definir roles en una matriz RACI de IA garantiza que cada persona conozca sus facultades: quién puede ajustar un prompt, quién puede autorizar el uso de un nuevo dataset y quién tiene la potestad de ordenar el apagado de emergencia (kill switch) del sistema.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 37,
    blockData: {
      title: 'Actividad: ¿Quién tiene la autoridad formal?',
      instruction: 'Asigna cada decisión crítica al actor que posee la autoridad formal correspondiente:',
      categories: ['Responsable técnico', 'Responsable de datos / Privacidad', 'Autoridad de gobernanza de IA', 'Comité de aprobación / Patrocinador'],
      items: [
        { id: 'aut_1', text: 'Modificar la configuración de hiperparámetros o el pipeline de integración continua.', category: 'Responsable técnico' },
        { id: 'aut_2', text: 'Validar si un dataset cumple la finalidad autorizada antes de ingresarlo al modelo.', category: 'Responsable de datos / Privacidad' },
        { id: 'aut_3', text: 'Ordenar la suspensión inmediata de un sistema en producción ante un sesgo discriminatorio detectado.', category: 'Autoridad de gobernanza de IA' },
        { id: 'aut_4', text: 'Autorizar el presupuesto y el despliegue definitivo de un nuevo producto basado en IA.', category: 'Comité de aprobación / Patrocinador' },
      ],
      explanation: 'La claridad en los límites de autoridad previene parálisis en incidentes y garantiza decisiones oportunas.',
      pointsAwarded: 15,
    },
  },

  // Pantalla 17: Gobernanza durante el ciclo de vida
  {
    type: 'TEXT',
    order: 38,
    blockData: {
      heading: 'Pantalla 17: Gobernanza durante todo el ciclo de vida',
      content: `### Gobernanza de ciclo completo
La gobernanza no es un sello estático antes del lanzamiento. Debe acompañar cada etapa:
**Definir propósito → Identificar riesgos → Diseñar controles → Probar → Autorizar → Implementar → Monitorear → Revisar → Retirar o modificar.**`,
    },
  },
  {
    type: 'QUIZ',
    order: 39,
    blockData: {
      question: '¿Cuál es la secuencia lógica de gobernanza durante el ciclo de vida de una solución de IA?',
      options: [
        { id: 'ciclo_a', text: 'Definir propósito → Identificar riesgos → Diseñar controles → Probar → Autorizar → Implementar → Monitorear → Revisar → Retirar o modificar.', isCorrect: true, feedback: '¡Excelente! Muestra la progresión preventiva, de validación, de operación y de mejora continua.' },
        { id: 'ciclo_b', text: 'Implementar → Probar → Definir propósito → Monitorear → Retirar.', isCorrect: false, feedback: 'Peligroso: desplegar antes de probar o definir el propósito genera graves fallos éticos y de seguridad.' },
        { id: 'ciclo_c', text: 'Autorizar → Implementar → Identificar riesgos → Diseñar controles.', isCorrect: false, feedback: 'Incorrecto. Los riesgos y controles deben identificarse antes de autorizar el despliegue.' },
        { id: 'ciclo_d', text: 'Monitorear → Probar → Implementar → Definir propósito.', isCorrect: false, feedback: 'Incorrecto.' },
      ],
      explanation: 'El ciclo de vida de gobernanza exige validación previa y monitoreo continuo tras la puesta en producción.',
      pointsAwarded: 10,
    },
  },

  // Pantalla 18: ISO/IEC 42001
  {
    type: 'TEXT',
    order: 40,
    blockData: {
      heading: 'Pantalla 18: ISO/IEC 42001 — Sistema de Gestión de IA (AIMS)',
      content: `### La primera norma internacional certificable de IA
Publicada en 2023, la norma **ISO/IEC 42001** proporciona requisitos para establecer, implementar, mantener y mejorar continuamente un **Sistema de Gestión de Inteligencia Artificial (AIMS)** en organizaciones.

### Enfoque de gestión
Sigue la estructura de alto nivel de ISO (Plan-Do-Check-Act), integrando liderazgo, evaluación de impacto, controles operacionales y mejora continua. No sustituye la ley, pero otorga un marco estructurado y auditable.`,
    },
  },
  {
    type: 'QUIZ',
    order: 41,
    blockData: {
      question: 'Durante una reunión sobre ISO/IEC 42001, un directivo afirma: "Al certificarnos en ISO 42001 ya no necesitamos cumplir las leyes de datos ni supervisar a los usuarios". ¿Cuál afirmación corrige esta postura?',
      options: [
        { id: 'iso_a', text: 'ISO/IEC 42001 proporciona requisitos organizacionales para gestionar IA, pero no sustituye la legislación aplicable ni elimina la necesidad de supervisión y mejora continua.', isCorrect: true, feedback: '¡Correcto! Es una norma de gestión de calidad y riesgo, no una exención de la ley ni de la supervisión.' },
        { id: 'iso_b', text: 'El directivo tiene razón porque las normas ISO reemplazan automáticamente cualquier ley nacional.', isCorrect: false, feedback: 'Falso.' },
        { id: 'iso_c', text: 'ISO 42001 es únicamente una guía de programación para modelos de lenguaje de código abierto.', isCorrect: false, feedback: 'Falso.' },
        { id: 'iso_d', text: 'Las normas ISO prohíben la supervisión humana en proyectos tecnológicos.', isCorrect: false, feedback: 'Falso.' },
      ],
      explanation: 'ISO/IEC 42001 estructura procesos organizacionales de gestión responsable sin eximir de obligaciones legales.',
      pointsAwarded: 10,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 42,
    blockData: {
      title: 'IA Aplicada: Diagnóstico preliminar de procesos para ISO 42001',
      role: 'Consultor de sistemas de gestión según ISO/IEC 42001',
      prompt: `Analiza la estructura de mi proyecto tecnológico. Con base en ISO/IEC 42001, ayúdame a identificar qué procesos clave requieren: 1) política documentada, 2) roles y autoridades asignados, 3) evaluación periódica de riesgos de IA y 4) procedimiento de mejora continua. Formula preguntas para evaluar mi madurez.`,
      reflectionQuestions: [
        '¿Qué proceso de tu proyecto requería con mayor urgencia una política formal documentada?',
      ],
      pointsAwarded: 15,
    },
  },

  // Pantalla 19: NIST AI RMF
  {
    type: 'TEXT',
    order: 43,
    blockData: {
      heading: 'Pantalla 19: NIST AI Risk Management Framework y Generative Profile',
      content: `### El marco de referencia voluntario
El **NIST AI RMF 1.0** (junto con su perfil específico para IA Generativa, NIST AI 600-1) estructura la gestión de riesgos en cuatro funciones operativas:
• **GOVERN (Gobernar):** Cultura organizacional, políticas y responsabilidades.
• **MAP (Mapear):** Contexto, capacidades de la IA y mapeo de riesgos e impactos.
• **MEASURE (Medir):** Métricas, evaluaciones cuantitativas/cualitativas y pruebas de confiabilidad.
• **MANAGE (Gestionar):** Controles, tratamiento de riesgos, mitigación y monitoreo continuo.`,
    },
  },
  {
    type: 'QUIZ',
    order: 44,
    blockData: {
      question: 'El responsable del proyecto plantea: "Necesitamos una referencia voluntaria internacional para reconocer, medir y mitigar los riesgos específicos de la IA generativa en nuestro software". ¿Cuál instrumento responde a esta necesidad?',
      options: [
        { id: 'nist_a', text: 'NIST AI Risk Management Framework (AI RMF) y su Generative AI Profile (NIST AI 600-1).', isCorrect: true, feedback: '¡Exacto! El marco NIST es la referencia voluntaria de gestión de riesgos por excelencia.' },
        { id: 'nist_b', text: 'Ley 1581 de 2012 de Colombia.', isCorrect: false, feedback: 'Es una ley obligatoria de protección de datos personales, no un marco voluntario general de riesgos de IA.' },
        { id: 'nist_c', text: 'Un contrato mercantil con el proveedor de hosting.', isCorrect: false, feedback: 'Es un acuerdo comercial bilateral.' },
        { id: 'nist_d', text: 'Un manual de usuario del software.', isCorrect: false, feedback: 'Incorrecto.' },
      ],
      explanation: 'NIST AI RMF proporciona metodologías operativas para clasificar y tratar riesgos de sistemas de IA.',
      pointsAwarded: 10,
    },
  },

  // Pantalla 20: Capacidades organizacionales para IA responsable
  {
    type: 'TEXT',
    order: 20,
    blockData: {
      heading: 'Pantalla 20: Capacidades organizacionales para la IA responsable',
      content: `### Personas, Procesos y Controles
Para gobernar la IA se requieren tres pilares articulados:
1. **Personas capacitadas:** Alfabetización crítica en IA, ética y habilidades de supervisión.
2. **Procesos estandarizados:** Flujos de aprobación, auditorías periódicas y protocolos de respuesta a incidentes.
3. **Controles técnicos y humanos:** Registros de auditoría, filtros de datos y validaciones manuales.`,
    },
  },
  {
    type: 'QUIZ',
    order: 46,
    blockData: {
      question: 'Una empresa busca consolidar una cultura de IA responsable en sus proyectos. ¿Cuál opción representa la mejor capacidad a fortalecer?',
      options: [
        { id: 'cap_a', text: 'Gestión sistemática de riesgos, acompañada de mecanismos de supervisión humana, documentación de evidencias, gestión de incidentes y mejora continua.', isCorrect: true, feedback: '¡Correcto! Integra personas, procesos y controles para una gobernanza viva y efectiva.' },
        { id: 'cap_b', text: 'Uso ilimitado y desregulado de cualquier herramienta para maximizar la velocidad a toda costa.', isCorrect: false, feedback: 'Genera riesgos críticos legales y operativos.' },
        { id: 'cap_c', text: 'Eliminar todas las aprobaciones humanas para que la IA actúe de manera totalmente autónoma.', isCorrect: false, feedback: 'Peligroso e incompatible con la gobernanza responsable.' },
        { id: 'cap_d', text: 'Comprar más licencias de software sin modificar los procesos ni capacitar al personal.', isCorrect: false, feedback: 'La tecnología sin capacidades de gestión agrava los problemas.' },
      ],
      explanation: 'La capacidad organizacional exige procesos de gestión de riesgos, supervisión, trazabilidad y mejora continua.',
      pointsAwarded: 10,
    },
  },

  // Pantalla 21: Controles para el uso responsable
  {
    type: 'TEXT',
    order: 47,
    blockData: {
      heading: 'Pantalla 21: Controles para el uso responsable de IA',
      content: `### Tipos de controles
• **Preventivos:** Control de acceso, minimización de datos en el prompt, políticas de uso aceptable.
• **Detectivos:** Monitoreo de salidas, auditoría de logs, detección de alucinaciones y sesgos.
• **Correctivos:** Revocación de decisiones erróneas, ajuste de prompts, bloqueo de endpoints comprometidos.`,
    },
  },
  {
    type: 'CLASSIFICATION',
    order: 48,
    blockData: {
      title: 'Actividad: Completa la frase de controles',
      instruction: 'Asigna a cada enunciado el concepto de control que lo completa correctamente:',
      categories: ['Control de acceso', 'Minimización de datos', 'Supervisión humana', 'Trazabilidad'],
      items: [
        { id: 'cntr_1', text: 'Para evitar que personas no autorizadas consulten o modifiquen información confidencial del sistema, se debe implementar un...', category: 'Control de acceso' },
        { id: 'cntr_2', text: 'Para evitar la recopilación y utilización de información personal innecesaria para la tarea, se debe aplicar la...', category: 'Minimización de datos' },
        { id: 'cntr_3', text: 'Cuando una decisión generada por IA puede producir consecuencias relevantes sobre derechos, debe existir...', category: 'Supervisión humana' },
        { id: 'cntr_4', text: 'Para poder reconstruir qué ocurrió, qué versión del modelo intervino y cómo se generó un resultado, se necesita...', category: 'Trazabilidad' },
      ],
      explanation: 'Control de acceso protege; minimización restringe; supervisión humana decide; trazabilidad audita.',
      pointsAwarded: 15,
    },
  },

  // Pantalla 22: Trazabilidad y documentación
  {
    type: 'TEXT',
    order: 49,
    blockData: {
      heading: 'Pantalla 22: Trazabilidad y documentación de evidencias',
      content: `### Evidencia auditable
Para investigar un incidente o demostrar cumplimiento ante un regulador se requiere conservar:
• Versión exacta del modelo y fecha/hora de la interacción.
• Texto completo del prompt (instrucción y datos de entrada).
• Resultado emitido por la IA y auditoría humana realizada.
• Identidad del funcionario que validó o modificó la salida.
• Registro de incidentes o desviaciones detectadas.`,
    },
  },
  {
    type: 'QUIZ',
    order: 50,
    blockData: {
      question: 'Durante una auditoría de decisiones asistidas por IA, ¿cuál grupo de elementos constituye la evidencia técnica y documental legítima que debe conservarse?',
      options: [
        { id: 'caja_a', text: 'Versión del modelo, identidad del responsable que aprobó el resultado, registro de incidentes, fecha/hora exacta, pruebas previas realizadas e información sobre controles aplicados.', isCorrect: true, feedback: '¡Correcto! Es la información necesaria y suficiente para reconstruir el proceso de decisión sin vulnerar la privacidad.' },
        { id: 'caja_b', text: 'Contraseñas personales de los empleados, chats privados de WhatsApp y el color preferido de la interfaz.', isCorrect: false, feedback: 'Incorrecto. No aportan valor de auditoría y violan la privacidad.' },
        { id: 'caja_c', text: 'Únicamente el recibo de pago de la licencia del software.', isCorrect: false, feedback: 'Insuficiente para auditoría técnica de decisiones.' },
        { id: 'caja_d', text: 'Ninguna evidencia si el proyecto terminó dentro del plazo.', isCorrect: false, feedback: 'Incorrecto. La rendición de cuentas exige conservación de evidencia.' },
      ],
      explanation: 'La trazabilidad conserva metadatos técnicos, decisiones de supervisión y registros de incidentes sin recopilar datos irrelevantes.',
      pointsAwarded: 10,
    },
  },

  // Pantalla 23: Auditoría y supervisión humana
  {
    type: 'TEXT',
    order: 51,
    blockData: {
      heading: 'Pantalla 23: Auditoría y supervisión humana reforzada',
      content: `### Supervisión proporcional al impacto
No todas las salidas demandan el mismo nivel de revisión:
• **Bajo impacto (supervisión ligera):** Generación de borradores, corrección estilística, lluvia de ideas.
• **Alto impacto (supervisión reforzada obligatoria):** Exclusión de beneficiarios, denegación de servicios, sanciones, decisiones laborales o de seguridad crítica. La persona revisora debe tener competencia técnica y autoridad real para vetar la recomendación.`,
    },
  },
  {
    type: 'QUIZ',
    order: 52,
    blockData: {
      question: 'Una institución utiliza IA en cuatro tareas. ¿En cuál situación debe establecerse una supervisión humana reforzada y obligatoria antes de ejecutar cualquier acción?',
      options: [
        { id: 'sup_a', text: 'Generar títulos creativos para una presentación interna de diapositivas.', isCorrect: false, feedback: 'Incorrecto. Tarea de bajo impacto sin riesgo significativo sobre personas.' },
        { id: 'sup_b', text: 'Recomendar excluir a una persona de un servicio o beneficio institucional, lo cual afecta directamente sus derechos u oportunidades.', isCorrect: true, feedback: '¡Correcto! Cuando una decisión puede afectar derechos o provocar perjuicios directos a una persona, la supervisión humana reforzada es inexcusable.' },
        { id: 'sup_c', text: 'Proponer combinaciones de colores para el logotipo de una aplicación web.', isCorrect: false, feedback: 'Incorrecto. Tarea de diseño estético con impacto limitado.' },
        { id: 'sup_d', text: 'Detectar faltas ortográficas en circulares informativas internas.', isCorrect: false, feedback: 'Incorrecto. Tarea de corrección de estilo de bajo impacto.' },
      ],
      explanation: 'Las decisiones con consecuencias directas sobre las personas exigen validación humana exhaustiva con autoridad de revocación.',
      pointsAwarded: 10,
    },
  },

  // Pantalla 24: Proyecto integrador TIC
  {
    type: 'TEXT',
    order: 53,
    blockData: {
      heading: 'Pantalla 24: Proyecto Integrador Final — Guía de Desarrollo',
      content: `### Reto Cúspide del OVA
Desarrollarás de inicio a fin un **nuevo proyecto tecnológico integral**, aplicando y demostrando las competencias de los 5 niveles:
1. **Inicio y Caracterización:** Problema, objetivos, justificación, valor esperado, viabilidad 5D, interesados y ciclo de vida (predictivo, ágil o híbrido).
2. **Planificación Integral:** Requisitos MoSCoW, EDT/WBS, cronograma, ruta crítica, recursos, costos, calidad y matriz de riesgos.
3. **Ejecución y Seguimiento:** Registro de avance, gestión de incidentes, control de cambios y toma de decisiones.
4. **Uso Responsable e Ingeniería de Prompts:** Prompts diseñados con el ciclo completo, auditoría de resultados, refinamiento y mitigación de alucinaciones.
5. **Gobernanza, Ética y Regulación:** Cumplimiento de la Ley 1581 / AI Act, matriz RACI de gobernanza, controles, trazabilidad y supervisión humana.
6. **Cierre y Lecciones Aprendidas:** Cumplimiento de objetivos, balance final y lecciones aprendidas de gestión e IA.`,
    },
  },
  {
    type: 'PROJECT_STEP',
    order: 54,
    blockData: {
      stepNumber: 26,
      title: 'Proyecto TIC Integral con IA Responsable y Gobernanza',
      instruction: 'Completa la ficha maestra de tu proyecto integrador final integrando todas las dimensiones de gestión y gobernanza:',
      fields: [
        { key: 'p5_caracterizacion', label: '1. Caracterización del Proyecto (Nombre, problema, objetivos, valor esperado y ciclo de vida seleccionado):', fieldType: 'textarea', maxWords: 150 },
        { key: 'p5_planificacion', label: '2. Planificación Integral (Alcance clave, entregables, cronograma estimado, presupuesto y principales riesgos):', fieldType: 'textarea', maxWords: 150 },
        { key: 'p5_ejecucion_seguimiento', label: '3. Ejecución, Seguimiento y Cambios (Incidentes gestionados, decisiones tomadas y control del avance):', fieldType: 'textarea', maxWords: 150 },
        { key: 'p5_ia_responsable_prompts', label: '4. Aplicación de IA e Ingeniería de Prompts (Casos de uso, prompt inicial, auditoría, refinamiento y validación):', fieldType: 'textarea', maxWords: 150 },
        { key: 'p5_gobernanza_etica_legal', label: '5. Gobernanza, Ética y Regulación (RACI de gobernanza, protección de datos, controles y supervisión humana):', fieldType: 'textarea', maxWords: 150 },
        { key: 'p5_cierre_lecciones', label: '6. Cierre, Sustentación y Reflexión Crítica (Resultados obtenidos, balance de valor y lecciones aprendidas):', fieldType: 'textarea', maxWords: 150 },
      ],
      advice: 'Este documento constituye el corazón de tu sustentación final y evidencia tu capacidad integral como gestor de proyectos con IA.',
      pointsAwarded: 100,
    },
  },
  {
    type: 'AI_PROMPT_LAB',
    order: 55,
    blockData: {
      title: 'IA Aplicada: Simulador de sustentación y defensa crítica del proyecto',
      role: 'Tribunal evaluador de proyectos TIC con IA',
      prompt: `Actúa como jurado evaluador de mi proyecto integrador final. Te presentaré el resumen ejecutivo de mi proyecto, incluyendo planificación, uso de IA y esquema de gobernanza. Formula 3 preguntas desafiantes sobre: 1) justificación de riesgos no contemplados, 2) cumplimiento de protección de datos personales y 3) mecanismos de supervisión humana ante un fallo del modelo. Evalúa críticamente mis respuestas.`,
      reflectionQuestions: [
        '¿Cómo defendiste la idoneidad de tu esquema de supervisión humana frente a las preguntas del jurado?',
      ],
      pointsAwarded: 25,
    },
  },

  // Pantalla 25: Microevaluación Módulo 15 (5 preguntas)
  {
    type: 'EXAM',
    order: 56,
    blockData: {
      title: 'Pantalla 25: Microevaluación — Uso responsable, gobernanza y proyecto final',
      description: '5 preguntas de evaluación sobre ética, regulación, marcos de gobernanza y supervisión humana en proyectos TIC. Mínimo aprobatorio: 70%.',
      questionsCount: 5,
      pointsPerQuestion: 20,
      passingScore: 70,
      pointsAwarded: 100,
      questions: [
        {
          id: 1,
          question: 'Una empresa incorpora IA para apoyar la elaboración de informes y la dirección exige que ningún resultado sea aceptado automáticamente sin revisión y validación previa de los profesionales. ¿Cuál principio refleja mejor esta decisión?',
          options: [
            { id: 'a', text: 'Automatización completa de las actividades para eliminar la intervención humana.' },
            { id: 'b', text: 'Uso responsable de IA mediante revisión, validación y participación humana activa.' },
            { id: 'c', text: 'Eliminación de la responsabilidad del usuario porque la información fue generada por una máquina.' },
            { id: 'd', text: 'Uso indiscriminado de herramientas disponibles siempre que aumenten la velocidad.' },
          ],
          correctOptionId: 'b',
          explanation: 'El uso responsable reconoce que los resultados de la IA son insumos de apoyo que deben ser validados por personas antes de tomar decisiones.',
        },
        {
          id: 2,
          question: 'Un equipo busca una referencia voluntaria internacional para estructurar la gestión de riesgos asociados con sistemas de IA, sin confundirla con una ley obligatoria ni con un contrato. ¿Cuál opción corresponde a esta necesidad?',
          options: [
            { id: 'a', text: 'NIST AI Risk Management Framework (AI RMF).' },
            { id: 'b', text: 'Ley 1581 de 2012 de Protección de Datos Personales.' },
            { id: 'c', text: 'Política interna de la empresa.' },
            { id: 'd', text: 'Contrato comercial con el proveedor de la nube.' },
          ],
          correctOptionId: 'a',
          explanation: 'El NIST AI RMF es un marco de adopción voluntaria diseñado para gestionar riesgos de IA en organizaciones.',
        },
        {
          id: 3,
          question: 'Una organización busca implementar una estructura formal certificable para gestionar el desarrollo y uso de IA, definiendo políticas, responsabilidades y ciclos de mejora continua. ¿Cuál estándar internacional responde a esta necesidad?',
          options: [
            { id: 'a', text: 'ISO/IEC 42001 (Sistema de Gestión de Inteligencia Artificial).' },
            { id: 'b', text: 'Una contraseña institucional de acceso seguro.' },
            { id: 'c', text: 'Un contrato de licencia con un proveedor comercial.' },
            { id: 'd', text: 'Una herramienta de IA generativa instalada en local.' },
          ],
          correctOptionId: 'a',
          explanation: 'ISO/IEC 42001 especifica los requisitos para establecer y mejorar un sistema de gestión de IA organizacional.',
        },
        {
          id: 4,
          question: 'Una institución informa que la IA participa en la preclasificación de solicitudes y habilita mecanismos para que los ciudadanos conozcan cómo opera y soliciten revisión humana de cualquier resultado adverso. ¿Qué principios se reflejan principalmente?',
          options: [
            { id: 'a', text: 'Transparencia, explicabilidad y responsabilidad.' },
            { id: 'b', text: 'Automatización total, autonomía de máquinas y supresión de supervisión.' },
            { id: 'c', text: 'Confidencialidad absoluta y ausencia deliberada de registros.' },
            { id: 'd', text: 'Uso ilimitado de IA y aceptación obligatoria de sus respuestas.' },
          ],
          correctOptionId: 'a',
          explanation: 'Informar la participación de la IA (transparencia), permitir entender los criterios (explicabilidad) y responder por los resultados (responsabilidad).',
        },
        {
          id: 5,
          question: 'Un integrante del equipo afirma: "Leyes, políticas públicas (CONPES), normas técnicas (ISO), marcos voluntarios (NIST) y políticas internas tienen exactamente la misma naturaleza y fuerza jurídica". ¿Cuál respuesta corrige mejor esta afirmación?',
          options: [
            { id: 'a', text: 'Es correcta porque cualquier documento que mencione IA tiene fuerza de ley vinculante.' },
            { id: 'b', text: 'Es incorrecta porque cada instrumento tiene una naturaleza y función diferente dentro de la gobernanza (ley vinculante, política pública estatal, norma técnica certificable, marco voluntario y regla corporativa).' },
            { id: 'c', text: 'Es correcta porque una política interna corporativa está por encima de las leyes de la República.' },
            { id: 'd', text: 'Es incorrecta únicamente porque los marcos voluntarios están prohibidos por el Estado.' },
          ],
          correctOptionId: 'b',
          explanation: 'Cada instrumento cumple un rol diferenciado en la gobernanza multinivel: desde leyes vinculantes hasta políticas internas y marcos voluntarios.',
        },
      ],
    },
  },

  // Pantalla 26: Checkpoint Final del OVA ¡Felicidades!
  {
    type: 'CHECKPOINT',
    order: 57,
    blockData: {
      title: '¡Felicitaciones! Has completado el OVA en su totalidad',
      description: 'Has culminado el recorrido formativo de los 5 niveles del Objeto Virtual de Aprendizaje "Integración de la Inteligencia Artificial Generativa en la Gestión de Proyectos Informáticos".',
      criteria: [
        'Nivel 1: Comprensión del Proyecto Tecnológico, PMBOK®, enfoques de ciclo de vida y fundamentos de IA.',
        'Nivel 2: Formulación y Planeación (Árbol de problemas, viabilidad 5D, interesados, requisitos MoSCoW, EDT, cronograma y presupuesto).',
        'Nivel 3: Ejecución, Seguimiento y Cierre (Liderazgo de equipos, simulación de ejecución, calidad y resolución de conflictos).',
        'Nivel 4: IA Generativa Aplicada (Ingeniería de prompts, laboratorio SIGA-TI en 4 fases y portafolio de aplicaciones validadas).',
        'Nivel 5: Gobernanza y Proyecto Integrador (Ética, Ley 1581, AI Act, ISO 42001, NIST AI RMF y Proyecto TIC Integral con sustentación).',
      ],
      badgeKey: 'graduado-ova-master',
      pointsAwarded: 200,
    },
  },
]

async function main() {
  console.log(`Reading course seed from ${SEED_FILE_PATH}...`)
  const fileRaw = await readFile(SEED_FILE_PATH, 'utf-8')
  const currentSeed = JSON.parse(fileRaw)

  // Filter out any existing module 15 to allow idempotent updates
  const existingModules: ModuleSeed[] = currentSeed.modules.filter(
    (m: ModuleSeed) => m.order !== 15,
  )

  const newModule15: ModuleSeed = {
    title: 'Módulo 15. Uso responsable, gobernanza y proyecto final',
    order: 15,
    level: 5,
    levelTitle: 'Nivel 5: Gobernanza y Proyecto Integrador',
    blocks: module15Blocks,
  }

  const allModules: ModuleSeed[] = [...existingModules, newModule15]

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
      description: 'Curso Completo (Niveles 1 a 5) · Integración de la Inteligencia Artificial Generativa en la Gestión de Proyectos Informáticos (PMBOK® 8va Edición, Formulación, Ejecución, Laboratorio de Prompts y Gobernanza de IA).'
    },
    modules: allModules,
  }

  await writeFile(SEED_FILE_PATH, JSON.stringify(updatedCourseSeed, null, 2), 'utf-8')
  console.log(`✓ Successfully updated ${SEED_FILE_PATH} with Nivel 5 (Módulo 15)!`)
}

main().catch((err) => {
  console.error('Error generating level 5 seed:', err)
  process.exit(1)
})
