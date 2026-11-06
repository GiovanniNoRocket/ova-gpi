// Bloques de introducción (Presentación y Objetivos, Competencias/Producto y Mapa del Módulo)
// que encabezan cada módulo del seed. Indexados por el `order` del módulo.
// Los generadores de cada nivel los anteponen automáticamente mediante `buildModule`.
import type { IntroBlockSeed } from './seed-builder.ts'

export const MODULE_INTROS: Record<number, IntroBlockSeed[]> = {
  "1": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 20 - 30 minutos | **Nivel:** Básico\n\n**Objetivo general:**\nAl finalizar este módulo, el estudiante comprenderá la estructura del Objeto Virtual de Aprendizaje (OVA), la metodología de trabajo, la dinámica de gamificación y el papel de la inteligencia artificial como herramienta de apoyo en la gestión de proyectos. Además, realizará un diagnóstico inicial y seleccionará el proyecto tecnológico que desarrollará durante todo el curso.\n\n**Objetivos específicos:**\n• Comprender la finalidad y organización del curso.\n• Navegar correctamente por el OVA.\n• Identificar la ruta de aprendizaje y los productos que construirá.\n• Comprender el funcionamiento del sistema de gamificación.\n• Reconocer el uso responsable de la IA como apoyo en la gestión de proyectos.\n• Seleccionar el proyecto que desarrollará durante el curso.\n• Realizar una evaluación diagnóstica."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Competencias y Productos del Módulo",
        "content": "**Competencias a desarrollar:**\n• Navegar de forma autónoma por el OVA.\n• Comprender la metodología de aprendizaje basada en retos.\n• Reconocer el papel del PMBOK® y la IA en la gestión de proyectos.\n• Iniciar la construcción de su proyecto integrador.\n• Utilizar herramientas digitales para apoyar su aprendizaje.\n\n**Producto del módulo:**\nAl finalizar este módulo el estudiante habrá construido:\n• **Diagnóstico inicial:** Identificación del punto de partida y expectativas.\n• **Bitácora del proyecto:** Registro personal de avances, reflexiones y decisiones.\n• **Selección del proyecto TIC:** Elección del reto tecnológico que desarrollará durante los cinco niveles.\n• **Portafolio digital del curso:** Consolidación de evidencias de aprendizaje."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nBienvenida → ¿Qué aprenderás? → ¿Por qué estudiar Gestión de Proyectos? → ¿Por qué integrar Inteligencia Artificial? → ¿Cómo aprenderás en este OVA? → Ruta de aprendizaje → Sistema de gamificación → Proyecto integrador → Diagnóstico inicial → Caso introductorio → IA aplicada → Microevaluación → ¡Felicitaciones!"
      }
    }
  ],
  "2": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 35–45 minutos | **Nivel:** Básico\n\n**Objetivo general:**\nAl finalizar este módulo, el estudiante comprenderá qué es un proyecto, cómo genera valor para una organización y cómo se relaciona con su contexto operativo y estratégico, utilizando herramientas de IA para fortalecer la definición inicial.\n\n**Objetivos específicos:**\n• Diferenciar un proyecto de un producto, servicio y resultado.\n• Comprender las características que distinguen a un proyecto tecnológico.\n• Identificar el valor que un proyecto aporta a la organización y sus beneficiarios.\n• Reconocer el contexto organizacional donde se ejecutará el proyecto.\n• Formular los primeros elementos del proyecto integrador.\n• Utilizar IA para fortalecer la descripción y delimitación inicial del proyecto."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Competencias y Producto del Módulo",
        "content": "**Competencias a desarrollar:**\n• Identificar correctamente un proyecto y sus atributos distintivos.\n• Reconocer y articular el valor cualitativo y cuantitativo que genera el proyecto.\n• Analizar la alineación estratégica con el contexto organizacional.\n• Elaborar la caracterización inicial estructurada del proyecto.\n• Utilizar IA generativa como asistente para mejorar la redacción y precisión de la iniciativa.\n\n**Producto del módulo:**\n**Documento 1: Caracterización Inicial del Proyecto TIC**\nEste documento crecerá a lo largo del curso. Al finalizar este módulo incorporará:\n• Nombre del proyecto y descripción general.\n• Tipo de proyecto, producto, servicio y resultado esperado.\n• Valor esperado y contexto organizacional.\n• Objetivos preliminares y restricciones iniciales."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nProyecto → Producto → Servicio → Resultado → Valor → Contexto organizacional → Proyecto Integrador → IA aplicada → Caso práctico → Microevaluación → Documento generado"
      }
    }
  ],
  "3": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 35–45 minutos | **Nivel:** Básico\n\n**Objetivo general:**\nAl finalizar este módulo, el estudiante comprenderá cómo se organizan los proyectos dentro de una organización mediante programas, portafolios y oficinas de gestión de proyectos (PMO), identificando los principales tipos de proyectos TIC y clasificando formalmente su proyecto integrador.\n\n**Objetivos específicos:**\n• Comprender la relación y diferencias entre proyectos, programas, portafolios y operaciones.\n• Identificar el papel de una PMO en la gobernanza y soporte organizacional.\n• Diferenciar los principales tipos de proyectos TIC.\n• Clasificar correctamente su proyecto integrador dentro de la estructura empresarial.\n• Utilizar herramientas de IA para analizar y clasificar proyectos tecnológicos."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Competencias y Producto del Módulo",
        "content": "**Competencias a desarrollar:**\n• Analizar cómo una organización administra y prioriza múltiples proyectos concurrentes.\n• Relacionar proyectos con los objetivos estratégicos corporativos.\n• Identificar el tipo de proyecto TIC más apropiado según la necesidad de negocio.\n• Fortalecer la gobernanza y clasificación del proyecto mediante IA.\n\n**Producto del módulo:**\n**Documento 1: Caracterización Inicial del Proyecto TIC**\nAl finalizar este módulo el documento incorporará:\n• Clasificación formal del tipo de proyecto TIC.\n• Programa o portafolio organizacional al que pertenece.\n• Operaciones y soporte continuo que surgirán tras el cierre.\n• Justificación estratégica de la clasificación."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nProyectos → Programa → Portafolio → Operaciones → PMO → Comparaciones → Tipos de proyectos TIC → Proyecto Integrador → IA aplicada → Caso práctico → Microevaluación → Documento actualizado"
      }
    }
  ],
  "4": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 55 minutos | **Nivel:** Básico\n\n**Objetivo general:**\nAl finalizar este módulo, el estudiante comprenderá cómo evoluciona un proyecto durante su ciclo de vida, diferenciará los enfoques predictivo, ágil e híbrido y reconocerá cómo seleccionar y adaptar un enfoque de gestión según las características del proyecto TIC, identificando los dominios de desempeño del PMBOK®.\n\n**Objetivos específicos:**\n• Comprender qué es el ciclo de vida del proyecto y sus fases de inicio, planificación, ejecución, monitoreo y cierre.\n• Diferenciar ciclo de vida y enfoque de desarrollo.\n• Comparar enfoques predictivos, ágiles e híbridos.\n• Identificar cuándo resulta conveniente utilizar cada enfoque en proyectos de software e infraestructura.\n• Reconocer Scrum, Kanban, XP y DevOps como frameworks y métodos complementarios.\n• Seleccionar y justificar el enfoque de gestión para su proyecto integrador."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Competencias y Producto del Módulo",
        "content": "**Competencias a desarrollar:**\n• Analizar las etapas del ciclo de vida de un proyecto TIC y sus criterios de pase.\n• Comparar objetivamente enfoques de desarrollo según el nivel de incertidumbre y requisitos.\n• Adaptar frameworks ágiles o tradicionales al contexto real del proyecto.\n• Justificar decisiones metodológicas con base en restricciones y valor esperado.\n\n**Producto del módulo:**\n**Documento 1: Caracterización Inicial del Proyecto TIC**\nAl finalizar este módulo incorporará:\n• Ciclo de vida seleccionado y fases definidas.\n• Enfoque de gestión (Predictivo, Ágil o Híbrido) formalmente justificado.\n• Nivel de incertidumbre evaluado para el proyecto.\n• Frameworks de soporte y artefactos documentales previstos."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nCiclo de vida → Inicio → Planificación → Ejecución → Monitoreo y Control → Cierre → Enfoques de gestión → Predictivo → Ágil → Híbrido → Frameworks y métodos → Comparación → Dominios de desempeño → Adaptación al contexto → Selección del enfoque → Actividad → Proyecto Integrador → IA aplicada → Cierre"
      }
    }
  ],
  "5": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 45–55 minutos | **Nivel:** Básico\n\n**Objetivo general:**\nComprender los fundamentos de la Inteligencia Artificial Generativa y su aplicación como herramienta de apoyo a la gestión de proyectos TIC, reconociendo sus capacidades, limitaciones, riesgos y condiciones indispensables para un uso responsable y ético.\n\n**Objetivos específicos:**\n• Comprender qué es la IA Generativa y cómo operan los Modelos de Lenguaje (LLMs).\n• Identificar tareas de gestión de proyectos que pueden acelerarse o enriquecerse con IA.\n• Reconocer limitaciones críticas como alucinaciones, sesgos y falta de razonamiento causal.\n• Verificar y contrastar información generada por IA mediante supervisión humana rigurosa.\n• Identificar riesgos relacionados con privacidad de datos, seguridad y confidencialidad.\n• Definir protocolos de uso responsable de IA para su proyecto integrador."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Competencias y Producto del Módulo",
        "content": "**Competencias a desarrollar:**\n• Analizar críticamente resultados generados por herramientas de IA.\n• Seleccionar tareas de gestión susceptibles de recibir apoyo de IA.\n• Identificar riesgos de seguridad antes de introducir información en un modelo.\n• Aplicar supervisión humana activa sin delegar decisiones críticas del proyecto.\n\n**Producto del módulo:**\n**Documento 1: Caracterización Inicial del Proyecto TIC**\nIncorporación de la sección de Gobernanza y Uso Previsto de IA:\n• Actividades del proyecto donde se empleará IA como apoyo.\n• Directrices de confidencialidad y datos restringidos.\n• Protocolos de verificación humana de respuestas generadas."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nIA → IA Generativa → LLM → ¿Cómo funciona? → Capacidades → IA en el ciclo de vida → Limitaciones → Alucinaciones → Verificación → ¿Cuándo utilizar IA? → ¿Cuándo no? → Riesgos → Supervisión humana → Uso responsable → Actividad gamificada → Proyecto Integrador → Microevaluación → Cierre"
      }
    }
  ],
  "6": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 35–45 minutos | **Nivel:** Básico\n\n**Objetivo general:**\nAl finalizar este módulo el estudiante será capaz de formular el problema central y la oportunidad de un proyecto tecnológico, identificar causas y consecuencias mediante el árbol de problemas, formular el objetivo general y los objetivos específicos, y justificar la viabilidad inicial del proyecto incorporando herramientas de IA generativa de forma crítica y responsable.\n\n**Objetivos específicos:**\n• Identificar y caracterizar un problema o necesidad en un contexto organizacional.\n• Construir el árbol de problemas diferenciando causas raíces, problema central y consecuencias.\n• Identificar y justificar la oportunidad de intervención tecnológica.\n• Formular el objetivo general y los objetivos específicos aplicando criterios de calidad.\n• Evaluar la viabilidad inicial del proyecto en cinco dimensiones: técnica, económica, operativa, temporal y legal.\n• Utilizar IA generativa para enriquecer la formulación sin delegar el juicio crítico.\n• Integrar los elementos de formulación al Plan Inicial / Backlog Integral del Nivel 2."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Competencias y Producto del Módulo",
        "content": "**Competencias a desarrollar:**\n• Diagnosticar situaciones problemáticas organizacionales susceptibles de solución mediante TIC.\n• Estructurar relaciones de causa-efecto utilizando árboles de problemas.\n• Redactar objetivos de proyecto orientados a resultados medibles y entrega de valor.\n• Evaluar integralmente la viabilidad de una iniciativa tecnológica en 5 dimensiones.\n• Aplicar IA generativa como asistente para la ideación, síntesis y contraste de formulaciones.\n\n**Producto del módulo:**\n**Plan Inicial / Backlog Integral del Nivel 2 (Fase de Formulación):**\nEstructuración del problema central, árbol de causas y consecuencias, objetivo general y específicos, y justificación de viabilidad multidimensional de tu proyecto TIC seleccionado."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nProblema → Necesidades → Causas → Árbol de problemas → Oportunidad → Objetivos → Justificación → Valor → Viabilidad técnica, económica, operativa, temporal y legal → Proyecto integrador → IA aplicada → Microevaluación → ¡Felicitaciones!"
      }
    }
  ],
  "7": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 55–65 minutos | **Nivel:** Básico–Intermedio\n\n**Objetivo general:**\nAl finalizar el módulo, el estudiante analizará los interesados de un proyecto TIC, transformará sus necesidades en requisitos, delimitará el alcance y estructurará los principales entregables mediante la EDT/WBS, considerando la generación de valor y actualizando el Plan Inicial / Backlog Integral del Nivel 2 con apoyo de IA.\n\n**Objetivos específicos:**\n• Identificar stakeholders relevantes y analizar su poder, interés e influencia.\n• Formular requisitos funcionales y no funcionales de alta calidad y verificabilidad.\n• Priorizar requisitos según valor, urgencia y riesgo.\n• Definir el alcance con inclusiones, exclusiones y supuestos claros.\n• Construir la Estructura de Desglose del Trabajo (EDT/WBS) y el diccionario de entregables.\n• Establecer trazabilidad entre objetivos, requisitos y entregables."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Competencias y Producto del Módulo",
        "content": "**Competencias a desarrollar:**\n• Analizar stakeholders y diseñar estrategias de relacionamiento efectivas.\n• Formular requisitos no ambiguos y verificables para soluciones TIC.\n• Delimitar el alcance formal y mitigar el riesgo de corrupción del alcance (scope creep).\n• Estructurar entregables descompuestos jerárquicamente en la EDT/WBS.\n\n**Producto del módulo:**\n**Plan Inicial / Backlog Integral del Nivel 2**\nIncorporación de los siguientes artefactos clave:\n• Registro y matriz de poder-interés de stakeholders.\n• Matriz de requisitos priorizados con criterios de aceptación.\n• Declaración del alcance del proyecto (inclusiones y exclusiones).\n• EDT/WBS inicial y diccionario de entregables."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nStakeholders → Poder → Interés → Influencia → Comunicación → Necesidades → Requisitos → Calidad → Priorización → Trazabilidad → Alcance → Exclusiones → Cambios → Entregables → Aceptación → EDT/WBS → Configuración → Enfoque → IA → Plan Inicial / Backlog Integral"
      }
    }
  ],
  "8": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 50–60 minutos | **Nivel:** Básico–Intermedio\n\n**Objetivo general:**\nAl finalizar este módulo, el estudiante estará en capacidad de planificar el tiempo, los recursos y los costos de un proyecto TIC, descomponiendo entregables en actividades, estimando duraciones y costos, identificando la ruta crítica y elaborando el cronograma y presupuesto inicial con apoyo crítico de IA.\n\n**Objetivos específicos:**\n• Descomponer entregables en actividades secuenciales con dependencias e hitos.\n• Estimar duraciones utilizando técnicas paramétricas, análogas y de tres valores.\n• Identificar la ruta crítica y holguras del cronograma.\n• Determinar recursos humanos, tecnológicos y de infraestructura necesarios.\n• Estimar costos directos e indirectos y estructurar el presupuesto inicial.\n• Incorporar reservas de contingencia y gestión para mitigar la incertidumbre."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Competencias y Producto del Módulo",
        "content": "**Competencias a desarrollar:**\n• Construir cronogramas realistas para proyectos tecnológicos en formato Gantt.\n• Analizar la ruta crítica para proteger la fecha comprometida de entrega.\n• Dimensionar la capacidad y disponibilidad del equipo de trabajo.\n• Estructurar presupuestos detallados con trazabilidad de costos y reservas.\n• Utilizar IA como revisor crítico para detectar cuellos de botella y sobrecostos.\n\n**Producto del módulo:**\n**Plan Inicial / Backlog Integral del Nivel 2**\nIncorporación de la línea base de tiempo y costo:\n• Lista de actividades con duraciones, dependencias e hitos clave.\n• Cronograma del proyecto con ruta crítica identificada.\n• Matriz de asignación de recursos y estimación de esfuerzo.\n• Presupuesto integral con desglose de costos y reservas."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nAlcance → Actividades → Estimaciones → Dependencias e hitos → Cronograma → Ruta crítica → Recursos y capacidad → Costos y presupuesto → Complejidad e incertidumbre → Supuestos y restricciones → Herramientas de planificación → Adaptación → Revisión integral → IA como revisor crítico → Plan Inicial / Backlog Integral → Felicitaciones"
      }
    }
  ],
  "9": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 55–70 minutos | **Nivel:** Básico – Intermedio\n\n**Objetivo general:**\nAl finalizar este módulo, el estudiante estará en capacidad de planificar la gestión de riesgos, calidad, comunicaciones y adquisiciones de un proyecto TIC, identificando amenazas y oportunidades, definiendo respuestas, necesidades de información y estrategias de contratación, mediante el uso de herramientas de gestión e IA generativa como apoyo para el análisis y la revisión crítica de sus decisiones.\n\n**Objetivos específicos:**\n• Identificar riesgos y oportunidades que pueden afectar los objetivos de un proyecto TIC.\n• Analizar la probabilidad y el impacto de los riesgos identificados.\n• Elaborar y mantener un registro de riesgos del proyecto.\n• Definir respuestas apropiadas frente a amenazas y oportunidades.\n• Diferenciar estrategias de prevención, mitigación, transferencia, aceptación y escalamiento.\n• Reconocer la importancia de la calidad en los entregables y resultados del proyecto.\n• Definir criterios básicos de calidad que permitan verificar los entregables del proyecto.\n• Identificar las necesidades de comunicación de los diferentes interesados.\n• Determinar qué información debe comunicarse, a quién, cuándo y mediante qué canal.\n• Reconocer cuándo un proyecto requiere adquisiciones, proveedores o servicios externos.\n• Identificar criterios básicos para seleccionar y gestionar proveedores.\n• Analizar cómo los riesgos pueden afectar las comunicaciones, la calidad y las adquisiciones.\n• Utilizar IA generativa para identificar riesgos, proponer respuestas, revisar criterios de calidad y analizar alternativas.\n• Incorporar los resultados del análisis al **Plan Inicial / Backlog Integral del Nivel 2**."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Competencias y Producto del Módulo",
        "content": "**Competencias a desarrollar:**\n• Gestionar riesgos de proyectos TIC mediante su identificación, análisis, registro y definición de respuestas coherentes.\n• Establecer criterios de calidad para evaluar la conformidad de los entregables y resultados esperados.\n• Diseñar estrategias de comunicación considerando interesados, información requerida, frecuencia y canales.\n• Planificar adquisiciones y necesidades de proveedores de acuerdo con los recursos, restricciones y características del proyecto.\n• Analizar la relación entre riesgos, calidad, comunicaciones y adquisiciones para anticipar impactos.\n• Utilizar herramientas de gestión para documentar y organizar el plan integral.\n• Utilizar IA generativa como herramienta de contraste y revisión crítica, verificando sus resultados.\n\n**Producto del módulo:**\n**Plan Inicial / Backlog Integral del Nivel 2 (Componentes de Riesgo, Calidad, Comunicación y Adquisiciones):**\nEl estudiante completará la formulación integral de su proyecto integrador incorporando el Registro de Riesgos priorizado con respuestas, los Criterios de Calidad verificables por entregable, la Matriz de Comunicaciones con interesados y el Plan de Adquisiciones con proveedores."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nRiesgos → Registro → Probabilidad e impacto → Respuestas → Calidad → Criterios de aceptación → Comunicaciones → Plan de comunicación → Adquisiciones → Proveedores → Criterios de selección → IA → Revisión crítica → Plan Inicial / Backlog Integral"
      }
    }
  ],
  "10": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 120 – 150 minutos | **Nivel:** Intermedio\n\n**Objetivo general:**\nDesarrollar capacidades para liderar y coordinar la ejecución de un proyecto TIC, gestionando personas, actividades, recursos, entregables, situaciones problemáticas y relaciones con terceros, mediante una actuación organizada y el uso responsable de IA generativa.\n\n**Objetivos específicos:**\n• Comprender cómo se desarrolla la ejecución de un proyecto TIC a partir de la planificación realizada.\n• Reconocer las responsabilidades del gestor durante la ejecución.\n• Aplicar estrategias de liderazgo según las situaciones del proyecto.\n• Coordinar roles, responsabilidades, actividades y recursos.\n• Gestionar la comunicación y colaboración del equipo.\n• Identificar y gestionar conflictos, problemas e impedimentos.\n• Coordinar actividades y entregables durante la ejecución.\n• Gestionar situaciones relacionadas con recursos, proveedores y terceros.\n• Integrar la calidad en el desarrollo del trabajo.\n• Gestionar el conocimiento generado durante la ejecución.\n• Utilizar IA generativa como apoyo a diferentes actividades de gestión.\n• Verificar la información generada por IA antes de utilizarla.\n• Tomar decisiones considerando las consecuencias sobre el proyecto.\n• Aplicar lo aprendido mediante una simulación de ejecución."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Competencias y Producto del Módulo",
        "content": "**Competencias a desarrollar:**\n• Coordinar equipos de trabajo en proyectos TIC, considerando roles, responsabilidades y necesidades de colaboración.\n• Aplicar estrategias de liderazgo de acuerdo con las situaciones que se presentan durante la ejecución.\n• Gestionar la comunicación y colaboración entre los participantes del proyecto.\n• Identificar y gestionar conflictos, problemas e impedimentos que afecten la ejecución.\n• Coordinar actividades, recursos y entregables de acuerdo con las necesidades del proyecto.\n• Gestionar situaciones relacionadas con proveedores y terceros durante la ejecución.\n• Integrar prácticas de calidad en el desarrollo y seguimiento de las actividades.\n• Registrar decisiones, experiencias y aprendizajes generados durante la ejecución.\n• Tomar decisiones frente a situaciones y cambios que se presenten en el proyecto.\n• Utilizar IA generativa para apoyar el análisis y organización de situaciones del proyecto.\n• Verificar los resultados generados por IA antes de utilizarlos.\n• Integrar las competencias desarrolladas en la Simulación de ejecución del proyecto TIC.\n\n**Producto del módulo:**\n**Producto 1. Simulación de ejecución:**\nEl estudiante continuará trabajando sobre el proyecto TIC desarrollado durante los niveles anteriores. En la simulación asumirá el rol de gestor y deberá enfrentar situaciones relacionadas con el equipo, las actividades, los recursos, los entregables, los proveedores y la calidad."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nPlan → Liderazgo → Equipo → Organización → Desarrollo → Comunicación → Motivación → Conflictos → Trabajo y entregables → Recursos y conocimiento → Proveedores, calidad e IA → Simulación y decisiones → Felicidades"
      }
    }
  ],
  "11": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 150–180 minutos | **Nivel:** Intermedio\n\n**Objetivo general:**\nAnalizar el desempeño de un proyecto TIC mediante métricas e indicadores para identificar desviaciones, evaluar solicitudes de cambio y tomar decisiones fundamentadas durante la ejecución, integrando herramientas de IA para el análisis crítico.\n\n**Objetivos específicos:**\n• Interpretar información obtenida durante la ejecución del proyecto TIC.\n• Diferenciar datos, métricas e indicadores clave (KPI) en situaciones reales.\n• Analizar las siete categorías de métricas aplicadas al seguimiento y control.\n• Interpretar KPI relacionados con el desempeño del proyecto.\n• Identificar desviaciones, tendencias y patrones a partir de evidencias cuantitativas.\n• Relacionar múltiples indicadores para diagnosticar causas de raíz.\n• Evaluar el impacto integral de solicitudes de cambio en alcance, tiempo y costo.\n• Comparar alternativas viables antes de tomar decisiones de ajuste.\n• Registrar decisiones y acciones derivadas del seguimiento en la bitácora del proyecto.\n• Utilizar IA generativa como apoyo para el análisis de métricas y evaluación de alternativas.\n• Verificar críticamente la información y recomendaciones formuladas mediante IA."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Competencias y Producto del Módulo",
        "content": "**Competencias a desarrollar:**\n• Analizar sistemáticamente la información de desempeño de proyectos TIC.\n• Interpretar métricas e indicadores para detectar anomalías tempranas.\n• Seleccionar y calibrar KPI pertinentes según las metas del proyecto.\n• Evaluar impactos multidimensionales asociados a solicitudes de cambio.\n• Tomar decisiones respaldadas en evidencia y trazabilidad técnica.\n• Integrar IA como asistente de diagnóstico sin delegar el juicio profesional.\n\n**Producto del módulo:**\n**Producto 1: Simulación de Ejecución – Seguimiento, Cambios y Decisiones**\nInforme ejecutivo de seguimiento y bitácora de control que incorpora:\n• Tablero de métricas e indicadores de desempeño analizados.\n• Diagnóstico de desviaciones y análisis de causas raíz.\n• Evaluación de impacto de solicitudes de cambio y alternativas consideradas.\n• Registro formal de decisiones y plan de acción de ajuste."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nSeguimiento → Métricas e indicadores → KPI → 7 categorías de métricas → Interpretación → Desviaciones y tendencias → Análisis integrado → Cambios → Decisiones → IA aplicada → Producto 1. Simulación de ejecución → Felicidades"
      }
    }
  ],
  "12": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 120–150 minutos | **Nivel:** Intermedio\n\n**Objetivo general:**\nDesarrollar capacidades para verificar los resultados de un proyecto TIC, gestionar la calidad y aceptación de sus entregables, preparar su transición ordenada hacia la operación y formalizar su cierre técnico y administrativo mediante el análisis riguroso de evidencias, beneficios y aprendizajes, utilizando IA generativa como herramienta de apoyo y validación.\n\n**Objetivos específicos:**\n• Comprender las condiciones y evidencias necesarias para determinar cuándo un proyecto TIC está preparado para su cierre.\n• Verificar el cumplimiento y calidad de entregables comparando resultados obtenidos frente a criterios acordados.\n• Diferenciar conceptual y prácticamente verificación, validación y aceptación.\n• Gestionar pendientes que puedan condicionar la aceptación o la continuidad operativa.\n• Planificar y ejecutar la transición hacia los equipos de soporte y operación.\n• Organizar la transferencia de conocimiento técnico y documentación funcional.\n• Analizar la entrega de valor, beneficios logrados y sostenibilidad de la solución.\n• Documentar lecciones aprendidas transformando la experiencia en activos organizacionales.\n• Formalizar el cierre contractual de proveedores y liberación ordenada de recursos.\n• Utilizar IA generativa para estructurar y auditar la consistencia del cierre del proyecto.\n• Consolidar el **Producto 2: Reporte de cierre** del proyecto TIC."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Competencias y Producto del Módulo",
        "content": "**Competencias a desarrollar:**\n• Verificar rigurosamente resultados y entregables mediante evidencias trazables.\n• Gestionar procesos formales de aceptación con usuarios clave y patrocinadores.\n• Diseñar planes de transición y transferencia de conocimiento operativo.\n• Evaluar la relación entre entregables, beneficios reales y valor organizacional.\n• Extraer y documentar lecciones aprendidas accionables para futuras iniciativas.\n• Estructurar reportes de cierre transparentes y verificables con asistencia de IA.\n\n**Producto del módulo:**\n**Producto 2: Reporte de Cierre del Proyecto TIC**\nDocumento formal de cierre que integra:\n• Estado de cumplimiento de objetivos y entregables verificados.\n• Actas y criterios de aceptación formal de los interesados.\n• Plan de transición a operación y matriz de transferencia de conocimiento.\n• Balance de beneficios obtenidos y condiciones de sostenibilidad.\n• Registro consolidado de lecciones aprendidas y cierre administrativo."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nResultados → Calidad → Verificación → Aceptación → Pendientes → Transición → Conocimiento → Proveedores y recursos → Resultados y beneficios → Sostenibilidad → Lecciones aprendidas → Cierre → IA → Reporte de cierre → Simulación final → Entrega"
      }
    }
  ],
  "13": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 150–180 minutos | **Nivel:** Avanzado\n\n**Objetivo general:**\nDesarrollar capacidades para diseñar, estructurar, evaluar y mejorar instrucciones dirigidas a herramientas de inteligencia artificial generativa, utilizando principios de ingeniería de prompts para obtener resultados pertinentes, estructurados y útiles en situaciones relacionadas con proyectos tecnológicos.\n\n**Objetivos específicos:**\n• Comprender los fundamentos de la ingeniería de prompts y sus componentes esenciales.\n• Diferenciar instrucciones simples de instrucciones estructuradas y delimitar contexto y propósito.\n• Incorporar roles y perspectivas pertinentes; formular tareas y objetivos verificables.\n• Establecer restricciones y criterios de calidad objetivos; especificar formatos de salida estructurados.\n• Aplicar patrones de prompting (ej. few-shot) y descomponer problemas complejos en tareas manejables.\n• Diseñar prompts para operaciones cognitivas: análisis, generación, transformación, síntesis, comparación y evaluación.\n• Analizar la calidad de los resultados producidos por la IA y detectar deficiencias o alucinaciones causales.\n• Refinar prompts mediante ciclos sucesivos de mejora empírica y comparar versiones con criterios observables.\n• Diseñar prompts especializados para proyectos TIC y utilizar la IA como apoyo socrático.\n• Documentar evidencias de diseño, evaluación y refinamiento para el portafolio."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Producto del Módulo y Portafolio",
        "content": "**Producto del módulo:**\n**Producto 1: Instrucciones diseñadas y validadas**\n\nConstruirás y documentarás un conjunto de instrucciones aplicadas a proyectos TIC siguiendo el ciclo:\n• **Tarea inicial:** Definición del objetivo y alcance de la interacción con la IA.\n• **Prompt inicial:** Formulación estructurada con rol, contexto y restricciones.\n• **Resultado:** Registro de la respuesta obtenida del modelo.\n• **Evaluación:** Identificación de fortalezas, omisiones, vacíos o alucinaciones.\n• **Refinamiento:** Ajuste empírico de la instrucción incorporando restricciones observables.\n• **Nuevo resultado y Comparación:** Medición de la mejora lograda.\n• **Validación:** Confirmación de aplicabilidad para la toma de decisiones.\n\nEste producto alimentará tu **Portafolio de aplicaciones de IA validadas del Nivel 4**."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nIngeniería de prompts → Estructura y contexto → Diseño de instrucciones → Patrones y descomposición → Aplicación de prompts → Evaluación y refinamiento → Prompts para proyectos TIC → Laboratorio → Microevaluación → ¡Felicidades!"
      }
    }
  ],
  "14": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 180–240 minutos | **Nivel:** Avanzado\n\n**Objetivo general:**\nAplicar instrucciones de IA generativa en situaciones contextualizadas de proyectos tecnológicos, evaluando los resultados obtenidos, realizando refinamientos fundamentados y validando su utilidad como apoyo a diferentes actividades de gestión del proyecto.\n\n**Objetivos específicos:**\n• Aplicar instrucciones previamente diseñadas a situaciones concretas del proyecto tecnológico SIGA-TI (TecnoGestión S.A.S.).\n• Seleccionar y preparar información contextualizada diferenciando datos observados de interpretaciones.\n• Auditar resultados generados identificando vacíos, afirmaciones no sustentadas e inconsistencias.\n• Refinar instrucciones a partir de la evidencia observada y comparar resultados antes y después del refinamiento.\n• Validar la utilidad de aplicaciones de IA mediante evidencias contrastadas con el equipo.\n• Construir y documentar el Portafolio de aplicaciones de IA validadas."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Entregables del Laboratorio y Portafolio",
        "content": "**Mapa de entregables del laboratorio:**\n• **Laboratorio 1:** Ficha de aplicación de IA (Semana 8)\n• **Laboratorio 2:** Registro de aplicación de IA (Semana 9)\n• **Laboratorio 3:** Informe de evaluación y refinamiento (Semana 10)\n• **Laboratorio 4:** Caso de aplicación integral de IA (Semana 11 - Reto integrador)\n\n**Producto consolidado:**\n**Portafolio de aplicaciones de IA validadas:**\nConsolidación final de evidencias, fichas, registros y refinamientos empíricos aplicados al proyecto SIGA-TI para respaldar la toma de decisiones del equipo directivo."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nInicio del laboratorio → Preparación de entregables → Laboratorio 1: Ficha de aplicación → Laboratorio 2: Registro de aplicación → Laboratorio 3: Informe de evaluación → Laboratorio 4: Caso integral → Portafolio de aplicaciones validadas → ¡Felicidades!"
      }
    }
  ],
  "15": [
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Presentación y Objetivos del Módulo",
        "content": "**Duración estimada:** 120 – 150 minutos | **Nivel:** Avanzado\n\n**Proyecto TIC Integral con IA Responsable y Gobernanza:**\nEl estudiante desarrollará y sustentará un nuevo proyecto TIC, integrando los aprendizajes de los niveles anteriores: comprensión y caracterización del proyecto, formulación y planificación, ejecución, seguimiento y cierre. Sobre este nuevo proyecto deberá determinar cómo utilizar la IA de manera responsable, diseñar sus propias instrucciones para interactuar con herramientas de IA, identificar riesgos éticos y regulatorios y establecer mecanismos de gobernanza, supervisión, trazabilidad y control.\n\n**Objetivo general:**\nDiseñar y sustentar un proyecto TIC integral que incorpore inteligencia artificial mediante criterios éticos, regulatorios y de gobernanza, estableciendo mecanismos de uso responsable, gestión de riesgos, protección de datos, supervisión humana, trazabilidad y rendición de cuentas.\n\n**Objetivos específicos:**\n• Comprender los fundamentos éticos asociados al diseño y uso de sistemas de IA y su impacto en proyectos TIC.\n• Identificar valores, principios y criterios para evaluar aplicaciones de IA y reconocer riesgos éticos, sociales y técnicos.\n• Diferenciar ética, regulación, cumplimiento, estándares, políticas institucionales y gobernanza.\n• Analizar marcos regulatorios y normativos contemporáneos (AI Act de la UE, Ley 1581 de 2012 y CONPES 4144 de Colombia).\n• Comprender las obligaciones relacionadas con privacidad, minimización y protección de datos personales.\n• Analizar el enfoque basado en riesgos, la norma ISO/IEC 42001 y el marco NIST AI RMF (Generative AI Profile).\n• Comprender la función de la gobernanza durante todo el ciclo de vida de un sistema de IA (autoridad, controles, supervisión, trazabilidad y rendición de cuentas).\n• Aplicar todos estos elementos al nuevo proyecto TIC integral y preparar la sustentación final."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Producto Final y Sustentación",
        "content": "**Producto del módulo:**\n**Proyecto completo, sustentación y reflexión crítica.**\n\nTu recorrido formativo culmina con la integración de cuatro componentes clave:\n• **Proyecto completo:** Documento integral que reúne alcance, cronograma, costos, riesgos, calidad y gobernanza de IA.\n• **Evidencias de gestión:** Fichas de prompts, matrices de riesgos éticos y registros de trazabilidad.\n• **Sustentación:** Presentación estructurada defendiendo las decisiones estratégicas y técnicas del proyecto.\n• **Reflexión crítica:** Análisis autocrítico sobre el impacto social, ético y operativo de la solución implementada."
      }
    },
    {
      "type": "TEXT",
      "blockData": {
        "heading": "Mapa del Módulo",
        "content": "Estaciones de aprendizaje del módulo:\n\nUso responsable de IA → Ética y principios → Riesgos e impactos → Privacidad y protección de datos → Regulación de IA → Normativas y marcos regulatorios → Gobernanza de IA → Roles y responsabilidades → Gestión del riesgo y controles → Trazabilidad y auditoría → Capacidades organizacionales → Proyecto final → Microevaluación → ¡Felicidades!"
      }
    }
  ]
}
