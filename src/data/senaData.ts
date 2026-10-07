import { ModuleInfo, RegulationCase, QuizQuestion, GlossaryTerm } from '../types/induction';

export const SENA_MODULES: ModuleInfo[] = [
  {
    id: 'identidad',
    number: '01',
    title: 'Identidad, Historia y Símbolos',
    shortTitle: 'Identidad',
    description: 'Conoce los orígenes del SENA, su fundador Rodolfo Martínez Tono, la misión, visión, himno y los símbolos que nos representan con orgullo.',
    durationMinutes: 20,
    iconName: 'Award',
  },
  {
    id: 'pedagogico',
    number: '02',
    title: 'Modelo Pedagógico y FPI',
    shortTitle: 'Modelo FPI',
    description: 'Descubre cómo aprendes: formación por proyectos, competencias (Saber, Hacer, Ser) y las etapas Lectiva y Productiva.',
    durationMinutes: 25,
    iconName: 'BookOpen',
  },
  {
    id: 'reglamento',
    number: '03',
    title: 'Reglamento del Aprendiz (Acuerdo 009 de 2024)',
    shortTitle: 'Reglamento',
    description: 'Apropia la nueva normatividad institucional del Acuerdo 009 de 2024: derechos, deberes, prohibiciones, ingreso, permanencia, certificación y régimen sancionatorio.',
    durationMinutes: 30,
    iconName: 'Scale',
  },
  {
    id: 'bienestar',
    number: '04',
    title: 'Bienestar al Aprendiz',
    shortTitle: 'Bienestar',
    description: 'Aprovecha las 9 dimensiones de bienestar: apoyos de sostenimiento, salud, deporte, liderazgo, cultura y monitorías.',
    durationMinutes: 20,
    iconName: 'HeartHandshake',
  },
  {
    id: 'ecosistema',
    number: '05',
    title: 'Ecosistema Digital y Servicios',
    shortTitle: 'Ecosistema',
    description: 'Navega con solvencia por Zajuna LMS, Sofia Plus, la Agencia Pública de Empleo (APE), Sennova y Fondo Emprender.',
    durationMinutes: 15,
    iconName: 'Laptop',
  },
  {
    id: 'evaluacion',
    number: '06',
    title: 'Desafío del Reglamento y Evaluación',
    shortTitle: 'Evaluación',
    description: 'Valida tus saberes en el cuestionario interactivo gamificado de 25 preguntas clave con ranking en vivo para certificar tu inducción.',
    durationMinutes: 15,
    iconName: 'CheckCircle2',
  },
  {
    id: 'certificado',
    number: '07',
    title: 'Acta y Certificado de Inducción',
    shortTitle: 'Certificado',
    description: 'Genera tu Constancia y Acta Oficial de Inducción Institucional personalizada con código de verificación QR e impresión.',
    durationMinutes: 5,
    iconName: 'FileCheck',
  },
];

export const HIMNO_SENA_VERSOS = [
  {
    type: 'Coro',
    text: 'Estudiantes del SENA, ¡adelante!\nPor Colombia luchad con amor,\ncon el ánimo noble y radiante,\ntransformemos el mundo en mejor.',
  },
  {
    type: 'Estrofa I',
    text: 'De la patria el futuro destino,\nen las manos del joven está;\nel trabajo es el noble camino\nque la paz y el progreso nos da.',
  },
  {
    type: 'Estrofa II',
    text: 'En la fragua del sabio saber,\nconstruyamos la nueva nación;\ncon virtudes de honradez y deber,\ny en el alma profunda pasión.',
  },
  {
    type: 'Estrofa III',
    text: 'Hoy la ciencia nos abre sus puertas,\ny la técnica enciende su luz;\nnuestras mentes al cambio despiertas\nllevan siempre el honor por salud.',
  },
];

export const REGLAMENTO_ACUERDO_009_2024 = {
  documento: {
    entidad: "Servicio Nacional de Aprendizaje - SENA",
    numero_acuerdo: "Acuerdo 009 de 2024",
    fecha: "5 de noviembre de 2024",
    diario_oficial: "No. 52.947 de 21 de noviembre de 2024",
    objeto: "Por medio del cual se adopta el Reglamento del Aprendiz SENA y se derogan los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024",
    fuente_url: "https://normograma.sena.edu.co/compilacion/docs/acuerdo_sena_0009_2024.htm",
  },
  considerandos: [
    "Que la Constitución Política señala en el artículo 54 que es obligación del Estado y de los empleadores ofrecer formación y habilitación profesional y técnica a quienes lo requieran...",
    "Que la Constitución Política establece en el artículo 67 que la educación es un derecho de la persona y un servicio público que tiene una función social...",
    "Que la Ley 119 de 1994 reestructura el Servicio Nacional de Aprendizaje - SENA, estableciendo su misión de ofrecer y ejecutar la formación profesional integral...",
    "Que el Decreto 249 de 2004 faculta al Consejo Directivo Nacional del SENA para regular las normas de selección, orientación, promoción y formación profesional integral de los trabajadores alumnos y expedir su reglamento...",
    "Que durante los doce (12) años de vigencia del Reglamento anterior se han desarrollado políticas públicas que hacen necesario armonizar y actualizar la normatividad institucional..."
  ],
  articulos_iniciales: {
    articulo_1: {
      titulo: "ADOPCIÓN DEL REGLAMENTO",
      descripcion: "Adoptar el Reglamento del Aprendiz SENA.",
    },
    articulo_2: {
      titulo: "ÁMBITO DE APLICACIÓN Y TRANSICIÓN",
      descripcion: "Aplica a todas las personas matriculadas en los programas de formación profesional integral del SENA.",
    },
    articulo_3: {
      titulo: "VIGENCIA Y DEROGATORIAS",
      descripcion: "Rige a partir de su publicación y deroga los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.",
    },
    articulo_4: {
      titulo: "DIVULGACIÓN",
      descripcion: "Establece la responsabilidad de los centros de formación en la divulgación del reglamento a la comunidad educativa.",
    },
  },
  capitulos: [
    {
      capitulo: "CAPÍTULO I",
      nombre: "DEFINICIONES Y GENERALIDADES",
      articulos: [
        "Artículo 1. Definiciones",
        "Artículo 2. Alcance del reglamento",
        "Artículo 3. Principios orientadores",
        "Artículo 4. Centro de convivencia",
      ],
      resumen: "Define el marco conceptual del aprendiz, el alcance vinculante del reglamento, los principios de dignidad, equidad y respeto, y las normas de convivencia armónica en la comunidad SENA.",
    },
    {
      capitulo: "CAPÍTULO II",
      nombre: "DERECHOS DEL APRENDIZ SENA",
      articulos: [
        "Artículo 5. Derechos del aprendiz SENA",
        "Artículo 6. Reconocimientos formativos",
        "Artículo 7. Representatividad de los aprendices",
      ],
      resumen: "Garantiza el derecho a recibir FPI de calidad, acceder a bienestar, orientación pedagógica, estímulos por excelencia, y participar democráticamente en la vocería y representación estudiantil.",
    },
    {
      capitulo: "CAPÍTULO III",
      nombre: "DEBERES DEL APRENDIZ SENA",
      articulos: [
        "Artículo 8. Deberes del aprendiz SENA",
        "Artículo 9. Prohibiciones",
      ],
      resumen: "Establece la responsabilidad con el proceso de aprendizaje, porte visible del carné, uso de EPP/SST, puntualidad, honestidad académica y el catálogo explícito de prohibiciones y conductas vedadas.",
    },
    {
      capitulo: "CAPÍTULO IV",
      nombre: "INGRESO, PERMANENCIA Y CERTIFICACIÓN",
      articulos: [
        "Artículo 10 al 38: Reglas generales de ingreso, etapa de registro, inscripción, selección, matrícula, trámites académicos, novedades, certificación, validación, reingreso, proceso de formación, cumplimiento, deserción y evaluación del proceso de aprendizaje.",
      ],
      resumen: "Regula exhaustivamente la vida académica: registro, selección, matrícula, novedades (traslado, aplazamiento, reingreso, retiro voluntario), causales de deserción y justificación de inasistencias en 3 días hábiles.",
    },
    {
      capitulo: "CAPÍTULO V",
      nombre: "RÉGIMEN DE FALTAS, MEDIDAS FORMATIVAS, DISCIPLINARIAS Y SANCIONATORIAS",
      articulos: [
        "Artículo 39 al 53: Principios orientadores, calificación de faltas (leves, graves, gravísimas), medidas formativas, medidas sancionatorias (llamado de atención escrito, suspensión, cancelación de matrícula), equipos encargados, instancias decisorias y debido proceso.",
      ],
      resumen: "Tipifica las faltas académicas y disciplinarias, las medidas formativas (planes de mejoramiento), sanciones oficiales (llamado escrito, suspensión, cancelación), el Comité de Evaluación y el debido proceso garantista.",
    },
  ],
  nota: "Estructura general convertida en formato JSON a partir de la compilación oficial del Acuerdo 009 de 2024 del SENA."
};

export const REGULATION_CASES: RegulationCase[] = [
  {
    id: 'caso-inasistencia',
    title: 'Inasistencia imprevista por quebranto de salud',
    context: 'Camilo, aprendiz del programa Tecnólogo en Análisis y Desarrollo de Software, sufrió un fuerte cuadro gripal el día martes y no pudo asistir a su ambiente de formación durante 2 días.',
    question: '¿Cuál es el procedimiento normativo correcto que debe seguir Camilo según el Acuerdo 009 de 2024?',
    options: [
      {
        id: 'opt-1',
        text: 'Regresar la semana siguiente sin decir nada y pedir los apuntes a sus compañeros.',
        isCorrect: false,
        feedback: 'Incorrecto. La falta de justificación genera reportes por inasistencia injustificada que pueden derivar en deserción.',
      },
      {
        id: 'opt-2',
        text: 'Presentar la incapacidad médica formal ante su instructor en un plazo máximo de 3 días hábiles siguientes al hecho.',
        isCorrect: true,
        feedback: '¡Excelente! Según el Capítulo IV del Acuerdo 009 de 2024, el aprendiz debe radicar la justificación médica o de fuerza mayor dentro de los tres (3) días hábiles siguientes.',
      },
      {
        id: 'opt-3',
        text: 'Enviar un mensaje informal por WhatsApp el fin de semana a cualquier compañero para que le avise al instructor.',
        isCorrect: false,
        feedback: 'Incorrecto. Las justificaciones deben ser formales con soporte médico de la EPS o constancia válida y radicadas por los canales oficiales.',
      },
    ],
    normativeArticle: 'Acuerdo 009 de 2024 · Capítulo IV (Artículos 10 al 38: Novedades, Inasistencias y Justificación en 3 días hábiles)',
    reflection: 'La puntualidad y la responsabilidad en el reporte oportuno de novedades reflejan la madurez laboral que el SENA promueve en todos sus aprendices.',
  },
  {
    id: 'caso-plagio',
    title: 'Copia y atribución de autoría en una evidencia',
    context: 'En la entrega del informe final de proyecto, una aprendiz copió textualmente fragmentos extensos de una tesis universitaria de internet sin citar la fuente ni hacer las referencias bibliográficas correspondientes.',
    question: '¿Cómo califica esta conducta el Acuerdo 009 de 2024 y qué repercusión tiene?',
    options: [
      {
        id: 'opt-1',
        text: 'Es una falta académica leve que se soluciona borrando los nombres de los autores.',
        isCorrect: false,
        feedback: 'Incorrecto. El plagio y la vulneración de los derechos de autor no es una falta leve.',
      },
      {
        id: 'opt-2',
        text: 'Es considerada una falta grave o gravísima contra el régimen académico y la propiedad intelectual.',
        isCorrect: true,
        feedback: '¡Correcto! El plagio atenta contra la honestidad académica y la ética profesional, pudiendo acarrear sanción de cancelación de matrícula previo Comité de Evaluación según el Capítulo V.',
      },
      {
        id: 'opt-3',
        text: 'Está totalmente permitido mientras el archivo tenga una portada con los logos del SENA.',
        isCorrect: false,
        feedback: 'Incorrecto. Los estándares de calidad del SENA exigen honestidad intelectual y aplicación de normas APA para citación.',
      },
    ],
    normativeArticle: 'Acuerdo 009 de 2024 · Capítulo III (Artículo 9: Prohibiciones) y Capítulo V (Artículos 39 al 53: Faltas graves/gravísimas)',
    reflection: 'La integridad académica es un pilar no negociable. Construir conocimiento propio y reconocer las fuentes de otros dignifica al futuro profesional.',
  },
  {
    id: 'caso-carne-uniforme',
    title: 'Porte del carné institucional y prendas de protección',
    context: 'Mateo ingresa al Centro de Formación y se dirige al taller de Mecánica Industrial sin portar su carné visible y calzando zapatillas de lona en lugar de las botas de seguridad reglamentarias.',
    question: '¿Por qué el instructor le solicita suspender su ingreso al ambiente práctico?',
    options: [
      {
        id: 'opt-1',
        text: 'Porque el instructor tiene preferencias personales de vestuario con los aprendices.',
        isCorrect: false,
        feedback: 'Incorrecto. No se trata de preferencias personales, sino de protocolos de Seguridad y Salud en el Trabajo (SST).',
      },
      {
        id: 'opt-2',
        text: 'Por incumplimiento de normas de Seguridad y Salud en el Trabajo (SST) y el deber de portar permanentemente el carné en lugar visible.',
        isCorrect: true,
        feedback: '¡Exacto! El carné identifica al aprendiz y su seguro estudiantil. Los Elementos de Protección Personal (EPP) son de obligatorio uso para prevenir accidentes de trabajo.',
      },
      {
        id: 'opt-3',
        text: 'Porque las zapatillas solo se permiten los días viernes según el coordinador.',
        isCorrect: false,
        feedback: 'Incorrecto. En los ambientes con riesgo de impacto o caída de materiales pesados nunca está permitido el calzado informal.',
      },
    ],
    normativeArticle: 'Acuerdo 009 de 2024 · Capítulo III (Artículo 8: Deberes del Aprendiz SENA - Portar carné y dotación EPP/SST)',
    reflection: 'La seguridad no es un requisito burocrático: salva vidas y previene lesiones irreversibles en el entorno laboral real.',
  },
  {
    id: 'caso-debido-proceso',
    title: 'Convocatoria al Comité de Evaluación y Seguimiento',
    context: 'Una aprendiz acumuló 3 resultados de aprendizaje no evaluados y faltas de asistencia reiteradas. La coordinación la cita a una sesión del Comité de Evaluación y Seguimiento.',
    question: '¿Cuáles son las garantías que asisten a la aprendiz durante esta sesión según el Acuerdo 009 de 2024?',
    options: [
      {
        id: 'opt-1',
        text: 'Garantía del debido proceso: derecho a ser escuchada, presentar descargos, pruebas y estar acompañada por el representante de aprendices.',
        isCorrect: true,
        feedback: '¡Muy bien! El Capítulo V del Acuerdo 009 de 2024 garantiza plenamente el derecho a la defensa y el debido proceso en todas las instancias formativas.',
      },
      {
        id: 'opt-2',
        text: 'Ninguna garantía; el comité expulsa inmediatamente a cualquier persona citada sin escucharla.',
        isCorrect: false,
        feedback: 'Incorrecto. El comité es un órgano formativo y colegiado que analiza causas, aplica planes de mejoramiento y respeta el debido proceso constitucional.',
      },
      {
        id: 'opt-3',
        text: 'Solamente puede hablar si paga una multa económica previa en tesorería.',
        isCorrect: false,
        feedback: 'Incorrecto. El SENA es una entidad pública y gratuita, y los trámites disciplinarios no conllevan ningún cobro económico.',
      },
    ],
    normativeArticle: 'Acuerdo 009 de 2024 · Capítulo V (Artículos 39 al 53: Principios orientadores, instancias decisorias y debido proceso)',
    reflection: 'El Comité de Evaluación y Seguimiento busca prioritariamente rescatar el proceso formativo del aprendiz antes de considerar una sanción sancionatoria.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Historia',
    question: '¿En qué año fue fundado el SENA y gracias a la iniciativa de qué líder visionario colombiano?',
    options: [
      'En 1957, por iniciativa del economista y abogado Rodolfo Martínez Tono.',
      'En 1975, por iniciativa del expresidente Alberto Lleras Camargo.',
      'En 1991, como mandato de la nueva Constitución Política de Colombia.',
      'En 1948, tras la creación de las Naciones Unidas en Bogotá.',
    ],
    correctIndex: 0,
    explanation: 'El SENA nació el 21 de junio de 1957 mediante el Decreto 118, concebido por el doctor Rodolfo Martínez Tono como una institución tripartita (Gobierno, Empresarios y Trabajadores).',
  },
  {
    id: 2,
    category: 'Símbolos',
    question: '¿Qué representa el piñón dentado en el escudo institucional del SENA?',
    options: [
      'El sector terciario de comercio y mercadeo digital.',
      'El sector secundario de la economía: la industria y la construcción.',
      'El movimiento perpetuo del reloj de entrada a los talleres.',
      'Las cadenas productivas de alimentos agrícolas.',
    ],
    correctIndex: 1,
    explanation: 'El piñón dentado simboliza la industria y la construcción (sector secundario). El caduceo representa el comercio y servicios, y la hoja de café al sector agropecuario.',
  },
  {
    id: 3,
    category: 'Símbolos',
    question: 'En el logotipo moderno del SENA, ¿cuál es el significado de la silueta humana sobre el camino circular?',
    options: [
      'Un atleta cruzando una meta olímpica nacional.',
      'El aprendiz que avanza labrando su propio sendero y futuro, sustentado en la formación integral.',
      'Un instructor vigilando las aulas desde un observatorio.',
      'Una brújula orientada exclusivamente al norte del país.',
    ],
    correctIndex: 1,
    explanation: 'El logotipo sintetiza al ser humano (el aprendiz) caminando hacia adelante sobre su camino de superación con autonomía y responsabilidad social.',
  },
  {
    id: 4,
    category: 'Modelo FPI',
    question: '¿Cuáles son las tres dimensiones de la formación por competencias en el SENA?',
    options: [
      'Saber (Conocimiento), Saber Hacer (Habilidades/Práctica) y Saber Ser (Actitudes y Valores).',
      'Aprobar, Asistir y Memorizar.',
      'Teoría básica, Examen final y Tesis de grado.',
      'Escuchar, Repetir y Calificar.',
    ],
    correctIndex: 0,
    explanation: 'El SENA fundamenta su Formación Profesional Integral (FPI) en el desarrollo holístico del individuo: Saber cognitivo, Saber Hacer técnico y Saber Ser ético.',
  },
  {
    id: 5,
    category: 'Etapas de Formación',
    question: '¿Cuáles son las dos etapas estructurales en las que se divide un programa de formación titulada del SENA?',
    options: [
      'Etapa Inicial y Etapa Final.',
      'Etapa Lectiva y Etapa Productiva.',
      'Etapa Presencial y Etapa Teórica.',
      'Etapa Escrita y Etapa Oral.',
    ],
    correctIndex: 1,
    explanation: 'La Etapa Lectiva se realiza en ambientes de formación para adquirir competencias; la Etapa Productiva aplica esas competencias en el mundo real laboral.',
  },
  {
    id: 6,
    category: 'Reglamento',
    question: 'Si un aprendiz presenta un quebranto de salud o calamidad, ¿cuánto tiempo tiene para radicar la justificación formal con soporte?',
    options: [
      'Hasta el último día del semestre académico.',
      'Máximo dentro de los tres (3) días hábiles siguientes a la ocurrencia del hecho.',
      'No tiene límite de tiempo si avisa por redes sociales.',
      'Diez (10) días calendario contados desde el mes siguiente.',
    ],
    correctIndex: 1,
    explanation: 'El Capítulo IV del Acuerdo 009 de 2024 establece perentoriamente un plazo máximo de tres (3) días hábiles siguientes a la fecha del hecho para radicar la justificación con soporte válido.',
  },
  {
    id: 7,
    category: 'Reglamento',
    question: '¿Qué es el Comité de Evaluación y Seguimiento en el SENA según el Acuerdo 009 de 2024?',
    options: [
      'Una empresa privada contratada para despedir instructores.',
      'El órgano colegiado consultor del Subdirector de Centro que investiga, evalúa y recomienda medidas formativas o disciplinarias.',
      'Un examen escrito semestral de matemáticas y español.',
      'La oficina que entrega las cartas de pasantía laboral exclusivamente.',
    ],
    correctIndex: 1,
    explanation: 'Bajo el Capítulo V del Acuerdo 009 de 2024, el Comité está integrado por instructores, coordinadores, bienestar y el representante de aprendices, garantizando el debido proceso para analizar casos formativos.',
  },
  {
    id: 8,
    category: 'Bienestar',
    question: '¿Cuál de los siguientes es un beneficio o programa del área de Bienestar al Aprendiz?',
    options: [
      'Cobro de matrículas mensuales con descuento bancario.',
      'Apoyos de sostenimiento (FIC, Regular), fomento al deporte, cultura, salud y monitorías.',
      'Venta obligatoria de libros impresos en la biblioteca.',
      'Préstamos hipotecarios para compra de vivienda familiar.',
    ],
    correctIndex: 1,
    explanation: 'El plan de Bienestar incluye estímulos socioeconómicos (apoyos de sostenimiento, monitorías), torneos deportivos, grupos culturales y atención psicosocial.',
  },
  {
    id: 9,
    category: 'Ecosistema Digital',
    question: '¿Qué plataforma tecnológica del SENA es el entorno virtual oficial de aprendizaje (LMS) donde se alojan cursos y evidencias?',
    options: [
      'Zajuna (Ambiente Virtual de Aprendizaje del SENA).',
      'Wikipedia Colombia.',
      'Google Classroom gratuito.',
      'Facebook Groups SENA.',
    ],
    correctIndex: 0,
    explanation: 'Zajuna es la plataforma oficial de aprendizaje virtual del SENA, donde los aprendices interactúan con materiales, foros, guías y entregan sus evidencias.',
  },
  {
    id: 10,
    category: 'Valores Institucionales',
    question: '¿Cuál es el lema y sentido fundamental de la promesa de valor del SENA a la sociedad colombiana?',
    options: [
      'Formación técnica elitista exclusiva para grandes capitalistas.',
      'Formación profesional integral, gratuita y con pertinencia para el desarrollo social y productivo de Colombia.',
      'Educación únicamente a distancia sin instructores.',
      'Una agencia bancaria de microcréditos.',
    ],
    correctIndex: 1,
    explanation: 'El SENA es patrimonio de todos los colombianos, ofreciendo educación gratuita de alta calidad que transforma vidas y potencia el aparato productivo del país.',
  },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Aprendiz',
    category: 'Institucional',
    definition: 'Es toda persona matriculada en los programas de formación profesional del SENA, en quien recae el protagonismo activo de su propio aprendizaje.',
    example: 'Como aprendiz del SENA, desarrollo mis competencias con disciplina, ética y vocación de servicio.',
  },
  {
    term: 'Ficha de Caracterización',
    category: 'Administrativo',
    definition: 'Código numérico único e intransferible asignado por el sistema SOFIA Plus a cada grupo y cohorte de formación para identificar su programa.',
    example: 'Mi número de ficha es 2894102 y me identifica en todas las plataformas y actas oficiales.',
  },
  {
    term: 'FPI (Formación Profesional Integral)',
    category: 'Académico',
    definition: 'Proceso educativo teórico-práctico de carácter integral, orientado al desarrollo de conocimientos técnicos, tecnológicos y de actitudes y valores para la convivencia social.',
    example: 'La FPI me enseña tanto la programación avanzada como el trabajo en equipo y la comunicación asertiva.',
  },
  {
    term: 'RAP (Resultado de Aprendizaje)',
    category: 'Académico',
    definition: 'Indicadores observables que evidencian lo que el aprendiz sabe, comprende y es capaz de hacer al culminar un módulo o competencia.',
    example: 'Para aprobar la competencia de Bases de Datos debo alcanzar todos sus RAPs asociados.',
  },
  {
    term: 'Guía de Aprendizaje',
    category: 'Académico',
    definition: 'Documento orientador diseñado por el instructor para guiar al aprendiz paso a paso en las actividades de contextualización, apropiación y transferencia del conocimiento.',
    example: 'La Guía 01 contiene las instrucciones para desarrollar la evidencia de inducción institucional.',
  },
  {
    term: 'Etapa Lectiva',
    category: 'Académico',
    definition: 'Periodo durante el cual el aprendiz adquiere y fortalece competencias en ambientes de formación físicos o virtuales bajo la orientación directa de instructores.',
    example: 'Durante los 18 meses de etapa lectiva construiré los módulos del proyecto de software.',
  },
  {
    term: 'Etapa Productiva',
    category: 'Académico',
    definition: 'Periodo de aplicación y consolidación de competencias en situaciones reales del mundo del trabajo a través de contrato de aprendizaje, vínculo laboral o proyecto.',
    example: 'Durante los 6 meses de etapa productiva laboraré en una empresa de tecnología con contrato de aprendizaje.',
  },
  {
    term: 'Contrato de Aprendizaje',
    category: 'Administrativo',
    definition: 'Forma especial de vinculación regulada por la Ley 789 de 2002, en la cual una empresa patrocina a un aprendiz otorgándole un apoyo de sostenimiento mensual y afiliaciones a salud y ARL.',
    example: 'La empresa patrocinadora me otorgará el 100% del SMMLV durante mi etapa productiva.',
  },
  {
    term: 'Sofia Plus',
    category: 'Tecnológico',
    definition: 'Sistema Optimizado para la Formación Integral y el Aprendizaje Activo; plataforma informática que administra el registro, selección, matrícula y notas del SENA.',
    example: 'En Sofia Plus descargo mis certificados de matrícula y consulto mis evaluaciones de juicio evaluativo.',
  },
  {
    term: 'Zajuna',
    category: 'Tecnológico',
    definition: 'Ecosistema y plataforma oficial de gestión de aprendizaje virtual (LMS) del SENA, donde los aprendices acceden a contenidos interactivos y entregan evidencias.',
    example: 'En Zajuna participo en los foros temáticos y envío mis evidencias de conocimiento y producto.',
  },
  {
    term: 'APE (Agencia Pública de Empleo)',
    category: 'Institucional',
    definition: 'Servicio público del SENA, gratuito e indiscriminado, que gestiona oportunidades laborales, intermediación de empleo y orientación ocupacional en todo el país.',
    example: 'Al graduarme registraré mi hoja de vida en la APE para acceder a vacantes de empresas aliadas.',
  },
  {
    term: 'Comité de Evaluación y Seguimiento',
    category: 'Institucional',
    definition: 'Instancia colegiada del Centro de Formación encargada de estudiar el rendimiento académico y disciplinario de los aprendices y proponer medidas formativas.',
    example: 'El comité sesiona semanalmente para revisar planes de mejoramiento y casos especiales.',
  },
  {
    term: 'Sennova',
    category: 'Tecnológico',
    definition: 'Sistema de Investigación, Desarrollo Tecnológico e Innovación del SENA que impulsa semilleros de investigación, tecnoparques y transferencia tecnológica.',
    example: 'Me inscribí al semillero de Sennova para desarrollar un proyecto de inteligencia artificial aplicada.',
  },
  {
    term: 'Fondo Emprender',
    category: 'Institucional',
    definition: 'Fondo de capital semilla creado por el Gobierno Nacional y administrado por el SENA para financiar iniciativas empresariales de aprendices y egresados.',
    example: 'Al finalizar mi formación puedo postular mi plan de negocios para obtener capital semilla no reembolsable.',
  },
];

export const BIENESTAR_DIMENSIONES = [
  {
    id: 'salud',
    title: 'Salud Integral',
    description: 'Campañas de prevención de enfermedades, salud oral, sexual y reproductiva, vacunación y primeros auxilios en sede.',
    action: 'Jornadas de tamizaje y prevención en cada Centro.',
  },
  {
    id: 'deporte',
    title: 'Deporte y Recreación',
    description: 'Torneos intercentros de microfútbol, baloncesto, voleibol, tenis de mesa, ajedrez y pausas activas para el bienestar físico.',
    action: 'Juegos Nacionales de Aprendices SENA.',
  },
  {
    id: 'cultura',
    title: 'Arte y Cultura',
    description: 'Grupos de danzas folclóricas colombianas, teatro, música, cuentería y festivales de talento artístico regional.',
    action: 'Encuentros culturales y muestras artísticas.',
  },
  {
    id: 'liderazgo',
    title: 'Liderazgo y Habilidades Blandas',
    description: 'Elección de voceros y representantes de aprendices, escuelas de líderes y talleres de comunicación asertiva.',
    action: 'Red Nacional de Líderes Aprendices.',
  },
  {
    id: 'psicosocial',
    title: 'Acompañamiento Psicosocial',
    description: 'Orientación individual y grupal con profesionales de psicología para manejo del estrés, resolución de conflictos y proyecto de vida.',
    action: 'Consejería estudiantil confidencial y gratuita.',
  },
  {
    id: 'sostenimiento',
    title: 'Apoyos Socioeconómicos',
    description: 'Apoyos de sostenimiento FIC para aprendices de construcción, apoyo regular de sostenimiento y apoyos de alimentación / transporte según disponibilidad.',
    action: 'Convocatorias semestrales por mérito y vulnerabilidad.',
  },
];
