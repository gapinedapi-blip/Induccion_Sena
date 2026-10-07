import { QuizQuestion } from '../types/induction';

export interface ReglamentoSectionConfig {
  id: string;
  chapterNumber: string;
  shortTitle: string;
  title: string;
  badge: string;
  articleRange: string;
  description: string;
  questions: QuizQuestion[];
}

export const REGLAMENTO_QUIZ_SECTIONS: ReglamentoSectionConfig[] = [
  {
    id: 'cap-1',
    chapterNumber: 'Capítulo I',
    shortTitle: 'Generalidades',
    title: 'Definiciones y Generalidades',
    badge: 'Artículos 1 al 4',
    articleRange: 'Acuerdo 009 de 2024 · Artículos 1 al 4',
    description: 'Marco conceptual, principios orientadores de dignidad y equidad, y normas de convivencia institucional en el SENA.',
    questions: [
      {
        id: 101,
        sectionId: 'cap-1',
        sectionName: 'Capítulo I: Definiciones y Generalidades',
        category: 'Marco Conceptual',
        question: 'De acuerdo con el Acuerdo 009 de 2024, ¿cuál es la definición formal de Aprendiz SENA?',
        options: [
          'Toda persona matriculada en los programas de Formación Profesional Integral del SENA en cualquier modalidad (presencial, virtual o a distancia).',
          'Únicamente los estudiantes presenciales que han firmado un contrato de aprendizaje remunerado con una empresa patrocinadora.',
          'Cualquier ciudadano que asista a charlas abiertas y talleres informativos sin registro formal en Sofia Plus o Zajuna.',
          'Exclusivamente los trabajadores del SENA que asisten a cursos de capacitación interna de la entidad.'
        ],
        correctIndex: 0,
        explanation: '¡Excelente! El Artículo 2 y el marco conceptual general establecen que la calidad de aprendiz cobija a toda persona matriculada formalmente en cualquier programa y modalidad de Formación Profesional Integral del SENA.',
        remedialFeedback: 'Identificación del error: Recuerda que la calidad de aprendiz no depende de tener un contrato de aprendizaje remunerado ni de estar en modalidad presencial; ampara universalmente a toda persona debidamente matriculada en la entidad.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 1 y 2 (Ámbito de Aplicación y Definiciones)'
      },
      {
        id: 102,
        sectionId: 'cap-1',
        sectionName: 'Capítulo I: Definiciones y Generalidades',
        category: 'Ámbito de Aplicación',
        question: '¿Cuál es el alcance y ámbito de aplicación del Acuerdo 009 de 2024 en el territorio colombiano?',
        options: [
          'Aplica con carácter obligatorio y vinculante a todos los aprendices del SENA en todas las sedes, centros de formación y modalidades del país.',
          'Es una recomendación pedagógica opcional que cada instructor o coordinador decide libremente si implementa.',
          'Rige únicamente para las sedes principales de Bogotá, Medellín y Cali, excluyendo las regionales periféricas.',
          'Aplica únicamente cuando el aprendiz comete una falta disciplinaria sancionable ante un juez.'
        ],
        correctIndex: 0,
        explanation: '¡Muy bien! El reglamento tiene fuerza vinculante general para toda la comunidad de aprendices en todas las sedes, subsedes, centros y entornos virtuales a nivel nacional.',
        remedialFeedback: 'Identificación del error: El reglamento no es una guía optativa ni se limita a ciudades principales; es la norma institucional de obligatorio cumplimiento en todo el país.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 2 (Ámbito de Aplicación y Transición)'
      },
      {
        id: 103,
        sectionId: 'cap-1',
        sectionName: 'Capítulo I: Definiciones y Generalidades',
        category: 'Principios Orientadores',
        question: '¿Cuáles son los principios orientadores esenciales que guían la convivencia y el desarrollo formativo en el SENA?',
        options: [
          'La dignidad humana, el debido proceso, la equidad, la corresponsabilidad y el respeto irrestricto a la diversidad.',
          'La sanción punitiva inmediata, el castigo ejemplar y la expulsión sumaria sin escuchar descargos.',
          'La competencia individual despiadada y el beneficio personal sobre el bienestar de la comunidad educativa.',
          'El favoritismo según la afinidad personal con el equipo directivo del centro.'
        ],
        correctIndex: 0,
        explanation: '¡Brillante! El Acuerdo 009 consagra la dignidad humana, la justicia formativa, la equidad y el debido proceso garantista como pilares fundamentales de la formación integral.',
        remedialFeedback: 'Identificación del error: El SENA no es un régimen punitivo ni autoritario. Todo el modelo pedagógico y normativo está fundamentado en derechos humanos, equidad, corresponsabilidad y respeto mutuo.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 3 (Principios Orientadores)'
      },
      {
        id: 104,
        sectionId: 'cap-1',
        sectionName: 'Capítulo I: Definiciones y Generalidades',
        category: 'Convivencia Institucional',
        question: '¿Cómo define el reglamento el ambiente y centro de convivencia institucional en el SENA?',
        options: [
          'Un espacio pedagógico de convivencia pacífica, libre de violencia, discriminación, acoso y consumo de sustancias psicoactivas.',
          'Un área exclusiva para instructores donde los aprendices solo pueden transitar bajo supervisión militar.',
          'Una zona libre de normas donde cada aprendiz puede actuar a discreción sin cumplir normas de SST o bioseguridad.',
          'Un establecimiento comercial abierto para el lucro privado de empresas externas sin vinculación académica.'
        ],
        correctIndex: 0,
        explanation: '¡Exacto! Los centros de formación física y los entornos virtuales del SENA son espacios de convivencia pacífica, inclusión, bioseguridad y formación ciudadana responsable.',
        remedialFeedback: 'Identificación del error: Los centros de formación son escenarios protegidos para el aprendizaje colaborativo seguro, libres de discriminación, violencia o consumo de drogas y alcohol.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 4 (Centro de Convivencia)'
      },
      {
        id: 105,
        sectionId: 'cap-1',
        sectionName: 'Capítulo I: Definiciones y Generalidades',
        category: 'Cultura Normativa',
        question: 'Frente a las normas institucionales, ¿cuál es el principio respecto al conocimiento del Reglamento del Aprendiz?',
        options: [
          'El desconocimiento o ignorancia del reglamento no exime al aprendiz de su cumplimiento ni de las responsabilidades que de él se deriven.',
          'Si el aprendiz manifiesta que no asistió a la semana de inducción, queda exonerado de cualquier deber u obligación.',
          'El reglamento solo es obligatorio para los aprendices mayores de edad con cédula de ciudadanía.',
          'El vocero de ficha es la única persona obligada a conocer y responder por las normas del grupo.'
        ],
        correctIndex: 0,
        explanation: '¡Respuesta correcta! El principio jurídico universal y de convivencia institucional establece que nadie puede alegar ignorancia de la norma para evadir sus responsabilidades.',
        remedialFeedback: 'Identificación del error: La inducción tiene precisamente el objetivo de darte a conocer tus derechos y deberes. Afirmar no conocer la norma nunca te exime de cumplirla.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 2 y Principios de Legalidad'
      }
    ]
  },
  {
    id: 'cap-2',
    chapterNumber: 'Capítulo II',
    shortTitle: 'Derechos',
    title: 'Derechos del Aprendiz SENA',
    badge: 'Artículos 5 al 7',
    articleRange: 'Acuerdo 009 de 2024 · Artículos 5 al 7',
    description: 'Garantías formativas de calidad, acceso a bienestar, orientación pedagógica, estímulos por excelencia y representatividad estudiantil.',
    questions: [
      {
        id: 201,
        sectionId: 'cap-2',
        sectionName: 'Capítulo II: Derechos del Aprendiz SENA',
        category: 'Derecho a la Formación',
        question: '¿Qué comprende el derecho fundamental a recibir Formación Profesional Integral (FPI) de calidad en el SENA?',
        options: [
          'Recibir formación con acompañamiento de instructores competentes, ambientes dignos, recursos técnicos actualizados y programas vigentes.',
          'Tener garantizada la aprobación automática de todas las evidencias sin necesidad de demostrar competencias.',
          'Exigir que las evaluaciones se ajusten únicamente a lo que el aprendiz desee responder sin rigor técnico.',
          'Poder faltar a clases cuando lo considere conveniente sin presentar justificación alguna.'
        ],
        correctIndex: 0,
        explanation: '¡Totalmente acertado! El derecho a la FPI implica contar con instructores idóneos, infraestructura adecuada, tecnologías de punta y un modelo pedagógico de alto estándar.',
        remedialFeedback: 'Identificación del error: El derecho a la educación de calidad no equivale a aprobación automática sin mérito. Exige acompañamiento pedagógico riguroso y evaluación objetiva de competencias.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 5 (Derechos del Aprendiz)'
      },
      {
        id: 202,
        sectionId: 'cap-2',
        sectionName: 'Capítulo II: Derechos del Aprendiz SENA',
        category: 'Bienestar al Aprendiz',
        question: '¿Qué servicios y beneficios puede disfrutar el aprendiz a través de la política de Bienestar al Aprendiz?',
        options: [
          'Orientación psicosocial, actividades deportivas, artísticas, culturales, de liderazgo y acceso a convocatorias de apoyos de sostenimiento.',
          'Sueldos empresariales fijos garantizados desde el primer día sin cumplir requisitos de selección.',
          'Exoneración definitiva de presentar evaluaciones técnicas para dedicarse de tiempo completo al ocio.',
          'Viajes turísticos internacionales financiados de manera ilimitada sin proyectos académicos.'
        ],
        correctIndex: 0,
        explanation: '¡Excelente! Bienestar al Aprendiz apoya la salud física y mental, el arte, los apoyos de sostenimiento según normatividad y el desarrollo biopsicosocial integral.',
        remedialFeedback: 'Identificación del error: Bienestar al Aprendiz ofrece acompañamiento socioemocional, deporte, cultura y apoyos reglamentados por convocatoria para favorecer la permanencia, no prebendas sin control.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 5 Numeral Bienestar'
      },
      {
        id: 203,
        sectionId: 'cap-2',
        sectionName: 'Capítulo II: Derechos del Aprendiz SENA',
        category: 'Evaluación y Retroalimentación',
        question: 'En el proceso evaluativo, ¿cuál es el derecho del aprendiz respecto a los resultados de sus evidencias de aprendizaje?',
        options: [
          'Conocer oportunamente las evaluaciones, retroalimentación formativa y solicitar revisiones respetuosas y fundamentadas en caso de desacuerdo.',
          'Exigir que nunca se publiquen notas en Sofia Plus o Zajuna para evitar comparaciones con otros aprendices.',
          'Modificar personalmente las calificaciones registradas en el sistema informático institucional.',
          'Obligar al instructor a cambiar una calificación reprobatoria mediante amenazas o agresiones verbales.'
        ],
        correctIndex: 0,
        explanation: '¡Muy bien! Todo aprendiz tiene derecho a saber qué competencias logró, qué debe fortalecer y a solicitar una revisión respetuosa y motivada ante su instructor.',
        remedialFeedback: 'Identificación del error: El derecho es a la retroalimentación oportuna y a la revisión formal fundamentada, siempre dentro del marco del respeto y los conductos regulares institucionales.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 5 (Derecho a la Evaluación y Retroalimentación)'
      },
      {
        id: 204,
        sectionId: 'cap-2',
        sectionName: 'Capítulo II: Derechos del Aprendiz SENA',
        category: 'Representación Democrática',
        question: '¿Cómo se ejerce el derecho a la representatividad estudiantil según el Acuerdo 009 de 2024?',
        options: [
          'Eligiendo y siendo elegido democráticamente como Vocero de Ficha o Representante de Aprendices del Centro de Formación.',
          'Asumiendo la vocería por decisión unilateral impuesta por el aprendiz más antiguo del grupo.',
          'Contratando a un abogado particular externo para que asista a las reuniones de ficha en su lugar.',
          'Exigiendo a la administración del SENA la potestad de nombrar y destituir instructores a discreción.'
        ],
        correctIndex: 0,
        explanation: '¡Correcto! La representación democrática es un espacio formativo de liderazgo, participación ciudadana y diálogo constructivo entre aprendices y directivos.',
        remedialFeedback: 'Identificación del error: Los voceros y representantes son elegidos democráticamente por sus pares para canalizar propuestas y mejoras formativas, no para imponer decisiones unilaterales ni administrar personal.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 7 (Representatividad de los Aprendices)'
      },
      {
        id: 205,
        sectionId: 'cap-2',
        sectionName: 'Capítulo II: Derechos del Aprendiz SENA',
        category: 'Estímulos y Reconocimientos',
        question: '¿Cuáles son los estímulos a los que puede acceder un aprendiz destacado por su rendimiento integral?',
        options: [
          'Menciones de honor, distinciones académicas, monitorías formativas remuneradas y priorización en proyectos de innovación y pasantías.',
          'Poder graduarse sin necesidad de culminar ni presentar evidencias de su etapa productiva.',
          'Cobrar dinero a sus compañeros a cambio de prestarles sus resúmenes de clase.',
          'Quedar exonerado de por vida de cumplir normas de seguridad y convivencia en el centro.'
        ],
        correctIndex: 0,
        explanation: '¡Felicitaciones! El SENA exalta el mérito mediante reconocimientos públicos, monitorías formativas y oportunidades de representación que potencian el perfil laboral.',
        remedialFeedback: 'Identificación del error: Los estímulos exaltan la excelencia y otorgan beneficios como monitorías, pero nunca eximen del cumplimiento de los requisitos de certificación de la etapa productiva.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 6 (Reconocimientos Formativos y Estímulos)'
      }
    ]
  },
  {
    id: 'cap-3',
    chapterNumber: 'Capítulo III',
    shortTitle: 'Deberes y Prohibiciones',
    title: 'Deberes y Prohibiciones del Aprendiz',
    badge: 'Artículos 8 y 9',
    articleRange: 'Acuerdo 009 de 2024 · Artículos 8 y 9',
    description: 'Responsabilidades con el aprendizaje, uso obligatorio de carné y EPP, honestidad intelectual, bioseguridad y catálogo de conductas prohibidas.',
    questions: [
      {
        id: 301,
        sectionId: 'cap-3',
        sectionName: 'Capítulo III: Deberes y Prohibiciones',
        category: 'Identificación Institucional',
        question: 'Respecto al carné institucional, ¿cuál es el deber fundamental que exige el reglamento?',
        options: [
          'Portarlo en lugar visible durante la permanencia en las instalaciones del SENA y presentarlo cuando sea requerido por la seguridad o funcionarios.',
          'Prestarlo a amigos o familiares externos para facilitarles el ingreso sin registro en la portería.',
          'Guardarlo en la maleta y negarse a exhibirlo alegando derecho a la intimidad personal.',
          'Adulterar la foto o el número de documento para no ser identificado en el centro.'
        ],
        correctIndex: 0,
        explanation: '¡Exacto! El carné institucional es personal, intransferible y de porte visible obligatorio como garantía de seguridad y control para toda la comunidad SENA.',
        remedialFeedback: 'Identificación del error: El carné es un documento público institucional intransferible. Prestarlo o negarse a exhibirlo vulnera la seguridad del centro y constituye una falta al reglamento.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 8 (Deberes del Aprendiz · Identificación)'
      },
      {
        id: 302,
        sectionId: 'cap-3',
        sectionName: 'Capítulo III: Deberes y Prohibiciones',
        category: 'Honestidad Intelectual',
        question: '¿Cómo califica el reglamento el plagio, la compra de evidencias o la suplantación de identidad en las actividades formativas?',
        options: [
          'Como conductas vedadas y prohibiciones expresas que constituyen faltas graves o gravísimas contra el régimen académico.',
          'Como faltas leves sin importancia que se perdonan simplemente borrando los nombres de los autores citados.',
          'Como una práctica válida si la entrega se hace dentro de los tiempos estipulados en la plataforma.',
          'Como una muestra de agilidad digital que amerita una bonificación de calificación.'
        ],
        correctIndex: 0,
        explanation: '¡Totalmente de acuerdo! La ética y el rigor profesional son innegociables. El plagio y la suplantación vulneran los derechos de autor y acarrean procesos disciplinarios severos.',
        remedialFeedback: 'Identificación del error: El plagio vulnera la propiedad intelectual y la honestidad formativa. En el SENA está tipificado como falta grave o gravísima sujeta a Comité de Evaluación.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 9 (Prohibiciones · Propiedad Intelectual)'
      },
      {
        id: 303,
        sectionId: 'cap-3',
        sectionName: 'Capítulo III: Deberes y Prohibiciones',
        category: 'Espacios Libres de Sustancias',
        question: '¿Qué dispone el Acuerdo 009 de 2024 respecto al ingreso, tenencia o consumo de alcohol y sustancias psicoactivas?',
        options: [
          'Está terminantemente prohibido ingresar, comercializar, portar o consumir bebidas alcohólicas o sustancias psicoactivas en cualquier ambiente SENA.',
          'Está permitido únicamente durante los descansos en las áreas verdes alejadas de las aulas.',
          'Se autoriza el consumo moderado si la jornada académica ya finalizó y el aprendiz se queda estudiando.',
          'Solo aplica para sustancias ilícitas; el licor artesanal está totalmente autorizado en ferias y eventos.'
        ],
        correctIndex: 0,
        explanation: '¡Excelente! Los centros SENA son espacios 100% protegidos libres de humo, licor y drogas para preservar la vida, la integridad y la seguridad laboral.',
        remedialFeedback: 'Identificación del error: No existe excepción alguna ni por horario ni por ubicación en el centro. El porte o consumo de alcohol o estupefacientes es una prohibición categórica y falta gravísima.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 9 (Prohibiciones · Sustancias Psicoactivas)'
      },
      {
        id: 304,
        sectionId: 'cap-3',
        sectionName: 'Capítulo III: Deberes y Prohibiciones',
        category: 'Cuidado de Bienes Públicos',
        question: '¿Cuál es el deber del aprendiz frente a la infraestructura, herramientas y recursos informáticos del centro?',
        options: [
          'Usarlos responsablemente para fines formativos, cuidar su conservación y reportar de inmediato cualquier daño o anomalía.',
          'Aprovechar las computadoras institucionales para descargar videojuegos piratas o software malicioso.',
          'Llevarse cables, herramientas o accesorios a casa para proyectos personales sin autorización escrita.',
          'Rayar pupitres y paredes para dejar la huella conmemorativa de la ficha al graduarse.'
        ],
        correctIndex: 0,
        explanation: '¡Acertaste! Los recursos del SENA son bienes públicos destinados al aprendizaje colectivo. Cuidarlos garantiza oportunidades a las futuras generaciones de colombianos.',
        remedialFeedback: 'Identificación del error: El deterioro, sustracción o uso no autorizado de bienes del Estado acarrea responsabilidades disciplinarias y la obligación de restituir el daño patrimonial.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 8 (Deberes · Cuidado del Patrimonio Institucional)'
      },
      {
        id: 305,
        sectionId: 'cap-3',
        sectionName: 'Capítulo III: Deberes y Prohibiciones',
        category: 'Convivencia Digital',
        question: '¿Qué deber rige para el aprendiz en los foros de Zajuna, correos institucionales y grupos oficiales de mensajería?',
        options: [
          'Mantener un trato respetuoso, empático, sin acoso ni discriminación, respetando las normas de netiqueta institucional.',
          'Publicar mensajes difamatorios o memes ofensivos contra instructores o compañeros bajo anonimato.',
          'Compartir sus contraseñas personales del LMS y Sofia Plus con personas ajenas al proceso.',
          'Usar los canales académicos para promover ventas comerciales personales y propaganda no autorizada.'
        ],
        correctIndex: 0,
        explanation: '¡Muy bien! Los canales digitales institucionales son extensiones del ambiente de clase y se rigen por los mismos principios de respeto, ética y tolerancia.',
        remedialFeedback: 'Identificación del error: La convivencia virtual no es ajena al reglamento; el ciberacoso, la difamación y el uso indebido de canales institucionales son conductas sancionables.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 8 y 9 (Convivencia y Entornos Digitales)'
      }
    ]
  },
  {
    id: 'cap-4',
    chapterNumber: 'Capítulo IV',
    shortTitle: 'Ingreso y Permanencia',
    title: 'Ingreso, Permanencia y Certificación',
    badge: 'Artículos 10 al 38',
    articleRange: 'Acuerdo 009 de 2024 · Artículos 10 al 38',
    description: 'Gestión de novedades académicas, traslados, aplazamientos, justificación de inasistencias en 3 días hábiles, causales de deserción y etapa productiva.',
    questions: [
      {
        id: 401,
        sectionId: 'cap-4',
        sectionName: 'Capítulo IV: Ingreso, Permanencia y Certificación',
        category: 'Justificación de Inasistencias',
        question: 'Si un aprendiz presenta un quebranto de salud o calamidad doméstica, ¿cuál es el plazo reglamentario para radicar la justificación?',
        options: [
          'Dentro de los tres (3) días hábiles siguientes a la ocurrencia del hecho, anexando los soportes formales correspondientes.',
          'Al finalizar el trimestre académico cuando el instructor esté consolidando los juicios de evaluación.',
          'Hasta un mes después enviando un mensaje informal por chat a un compañero de la ficha.',
          'No se requiere radicar soporte si el aprendiz se compromete verbalmente a no volver a faltar.'
        ],
        correctIndex: 0,
        explanation: '¡Respuesta exacta! El Capítulo IV estipula con precisión que el aprendiz tiene máximo tres (3) días hábiles para radicar formalmente su soporte médico de EPS o constancia válida.',
        remedialFeedback: 'Identificación del error: El plazo reglamentario no es de semanas ni al cierre del trimestre. Debes radicar la constancia formal dentro de los 3 días hábiles para evitar reportes por inasistencia injustificada.',
        articleRef: 'Acuerdo 009 de 2024 · Artículos 22 al 24 (Inasistencias y Justificaciones)'
      },
      {
        id: 402,
        sectionId: 'cap-4',
        sectionName: 'Capítulo IV: Ingreso, Permanencia y Certificación',
        category: 'Novedades Académicas',
        question: '¿Qué es el trámite formal de Aplazamiento de matrícula y cuál es su finalidad?',
        options: [
          'La solicitud justificada por fuerza mayor para desvincularse temporalmente de la formación preservando el cupo hasta por el término normativo establecido.',
          'Dejar de asistir sin avisar y reintegrarse meses después exigiendo que la ficha lo espere.',
          'Un castigo impuesto automáticamente por la plataforma cuando una evidencia se entrega tarde.',
          'Una solicitud para cambiarse de sede sin cumplir con la etapa lectiva en curso.'
        ],
        correctIndex: 0,
        explanation: '¡Excelente! El aplazamiento formal protege el cupo del aprendiz ante calamidades, servicio militar o condiciones de salud certificadas, garantizando el reingreso ordenado.',
        remedialFeedback: 'Identificación del error: El aplazamiento requiere solicitud formal y resolución del Centro; abandonar el ambiente sin trámite se clasifica como deserción y acarrea sanciones de tiempo para nueva matrícula.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 21 (Novedades: Aplazamiento, Traslado y Reingreso)'
      },
      {
        id: 403,
        sectionId: 'cap-4',
        sectionName: 'Capítulo IV: Ingreso, Permanencia y Certificación',
        category: 'Causales de Deserción',
        question: '¿En cuál de los siguientes escenarios se configura legalmente la causal de Deserción en el SENA?',
        options: [
          'Inasistencia injustificada durante tres (3) días hábiles consecutivos en presencial o no ingresar ni presentar evidencias en plataforma en el plazo previsto.',
          'Tener una llegada tarde imprevista por congestión vehicular habiendo avisado al vocero.',
          'Reprobar una evidencia técnica y concertar un plan de mejoramiento con el instructor.',
          'Solicitar permiso anticipado para asistir a una cita médica programada por la EPS.'
        ],
        correctIndex: 0,
        explanation: '¡Correcto! La deserción se formaliza cuando se comprueban tres días consecutivos de inasistencia injustificada o el abandono sin aviso de la plataforma virtual o la etapa productiva.',
        remedialFeedback: 'Identificación del error: Una llegada tarde o una evidencia en plan de mejoramiento no configuran deserción. La deserción es el abandono injustificado reiterado del proceso formativo.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 25 (Causales y Trámite de Deserción)'
      },
      {
        id: 404,
        sectionId: 'cap-4',
        sectionName: 'Capítulo IV: Ingreso, Permanencia y Certificación',
        category: 'Modalidades de Etapa Productiva',
        question: '¿Cuáles son alternativas válidas y avaladas por el SENA para desarrollar la Etapa Productiva?',
        options: [
          'Contrato de aprendizaje, vínculo laboral o contractual, proyecto productivo institucional, pasantías y monitorías formativas.',
          'Exclusivamente realizar labores de aseo comunitario no remunerado en barrios cercanos.',
          'Permanecer en el hogar esperando que la empresa envíe el certificado de cumplimiento por correo.',
          'Hacer cursos libres virtuales sin relación alguna con el perfil ocupacional del programa técnico.'
        ],
        correctIndex: 0,
        explanation: '¡Brillante! El SENA ofrece un abanico de modalidades productivas (contrato, vínculo, proyecto productivo, pasantía, monitoría) para afianzar competencias en el sector real.',
        remedialFeedback: 'Identificación del error: La etapa productiva debe relacionarse directamente con las competencias técnicas del programa matriculado y estar avalada por la coordinación académica.',
        articleRef: 'Acuerdo 009 de 2024 · Artículos 28 al 32 (Etapa Productiva y Modalidades)'
      },
      {
        id: 405,
        sectionId: 'cap-4',
        sectionName: 'Capítulo IV: Ingreso, Permanencia y Certificación',
        category: 'Requisitos de Certificación',
        question: 'Para obtener el título o certificado de formación profesional integral, ¿qué requisito es obligatorio?',
        options: [
          'Aprobar el 100% de los resultados de aprendizaje (etapa lectiva y productiva) y encontrarse a paz y salvo institucional.',
          'Cursar únicamente la etapa lectiva teórica y pagar los derechos de grado con un banco.',
          'Tener un 70% de asistencia global sin importar si quedaron competencias pendientes por evaluar.',
          'Contar con recomendación verbal de un compañero de ficha sin actas de cierre en Zajuna.'
        ],
        correctIndex: 0,
        explanation: '¡Exacto! La certificación institucional requiere la totalidad de los juicios en estado "Aprobado/Competente" tanto en etapa lectiva como productiva, junto al paz y salvo integral.',
        remedialFeedback: 'Identificación del error: El SENA es gratuito y no cobra derechos de grado; para certificarse es indispensable aprobar la totalidad de las competencias del diseño curricular.',
        articleRef: 'Acuerdo 009 de 2024 · Artículos 35 al 38 (Certificación y Paz y Salvo)'
      }
    ]
  },
  {
    id: 'cap-5',
    chapterNumber: 'Capítulo V',
    shortTitle: 'Faltas y Sanciones',
    title: 'Régimen de Faltas, Medidas y Debido Proceso',
    badge: 'Artículos 39 al 53',
    articleRange: 'Acuerdo 009 de 2024 · Artículos 39 al 53',
    description: 'Calificación de faltas leves, graves y gravísimas, medidas formativas (planes de mejoramiento), sanciones, Comité de Evaluación y debido proceso.',
    questions: [
      {
        id: 501,
        sectionId: 'cap-5',
        sectionName: 'Capítulo V: Régimen de Faltas y Sanciones',
        category: 'Tipificación de Faltas',
        question: '¿Cómo clasifica el Acuerdo 009 de 2024 las faltas en las que puede incurrir un aprendiz?',
        options: [
          'Faltas Leves, Faltas Graves y Faltas Gravísimas, evaluando el grado de culpa, daño causado, reiteración y circunstancias.',
          'Faltas Blandas y Faltas Duras, a criterio subjetivo de cada instructor de turno.',
          'Faltas de Mañana y Faltas de Tarde según el horario en que ocurrieron los hechos.',
          'Únicamente se contemplan faltas académicas; las faltas disciplinarias están prohibidas de investigar.'
        ],
        correctIndex: 0,
        explanation: '¡Muy bien! Las faltas se gradúan técnicamente en Leves, Graves y Gravísimas, garantizando el principio de proporcionalidad y justicia formativa.',
        remedialFeedback: 'Identificación del error: El reglamento establece tres categorías legales: Leves, Graves y Gravísimas, analizando antecedentes, impacto institucional y dolo o culpa.',
        articleRef: 'Acuerdo 009 de 2024 · Artículos 40 y 41 (Clasificación de Faltas)'
      },
      {
        id: 502,
        sectionId: 'cap-5',
        sectionName: 'Capítulo V: Régimen de Faltas y Sanciones',
        category: 'Medidas Formativas',
        question: '¿Qué es una Medida Formativa preventiva en el marco del reglamento y cuál es su propósito?',
        options: [
          'Una acción pedagógica correctiva (como un Plan de Mejoramiento) para superar deficiencias de aprendizaje o convivencia antes de una sanción.',
          'Una sanción monetaria obligatoria que se cobra en la tesorería del centro de formación.',
          'Una orden de expulsión sumaria sin opción de presentar trabajos de recuperación.',
          'La prohibición de hablar en el aula de clases durante el resto del trimestre.'
        ],
        correctIndex: 0,
        explanation: '¡Brillante! El enfoque del SENA es ante todo formativo. La medida formativa busca encauzar el proceso pedagógico mediante compromisos y planes de superación concertados.',
        remedialFeedback: 'Identificación del error: Las medidas formativas no son castigos punitivos ni multas en dinero; son oportunidades de mejora pedagógica estructuradas con plazos y evidencias concretas.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 44 (Medidas Formativas y Plan de Mejoramiento)'
      },
      {
        id: 503,
        sectionId: 'cap-5',
        sectionName: 'Capítulo V: Régimen de Faltas y Sanciones',
        category: 'Comité de Evaluación y Seguimiento',
        question: '¿Cuál es la función principal del Comité de Evaluación y Seguimiento del Centro de Formación?',
        options: [
          'Analizar objetivamente casos de bajo rendimiento o presuntas faltas disciplinarias, garantizar el debido proceso y emitir recomendaciones motivadas al Subdirector.',
          'Imponer sentencias de prisión y actuar como un juzgado penal de la República.',
          'Reunirse únicamente para organizar los eventos deportivos y fiestas del centro.',
          'Suspender de manera inmediata a los aprendices sin escuchar sus argumentos ni pruebas.'
        ],
        correctIndex: 0,
        explanation: '¡Excelente! El Comité es un cuerpo colegiado y asesor que evalúa los hechos, escucha los descargos del aprendiz y propone medidas justas respetando la dignidad.',
        remedialFeedback: 'Identificación del error: El Comité de Evaluación no es un tribunal penal ni actúa sin pruebas; es el órgano asesor encargado de asegurar el debido proceso garantista y formativo.',
        articleRef: 'Acuerdo 009 de 2024 · Artículos 47 al 49 (Comité de Evaluación y Seguimiento)'
      },
      {
        id: 504,
        sectionId: 'cap-5',
        sectionName: 'Capítulo V: Régimen de Faltas y Sanciones',
        category: 'Garantía del Debido Proceso',
        question: '¿Cuáles son garantías ineludibles que componen el Debido Proceso en favor del aprendiz investigado?',
        options: [
          'Derecho a ser notificado formalmente, conocer las pruebas, ser escuchado en descargos, aportar pruebas y presentar recurso de reposición.',
          'Ser juzgado en secreto sin derecho a conocer los cargos que se le imputan.',
          'Aceptar obligatoriamente la culpabilidad sin posibilidad de controvertir testimonios.',
          'Pagar una tarifa monetaria para poder hablar durante la sesión del comité.'
        ],
        correctIndex: 0,
        explanation: '¡Exacto! El debido proceso constitucional es un pilar innegociable: presunción de inocencia, contradicción de pruebas, derecho de defensa y doble instancia mediante recursos.',
        remedialFeedback: 'Identificación del error: En el SENA está expresamente prohibido sancionar sin notificación formal o sin otorgar el derecho a rendir descargos y controvertir las pruebas.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 46 (Principios del Debido Proceso y Derecho de Defensa)'
      },
      {
        id: 505,
        sectionId: 'cap-5',
        sectionName: 'Capítulo V: Régimen de Faltas y Sanciones',
        category: 'Catálogo de Sanciones',
        question: '¿Cuáles son las Medidas Sancionatorias contempladas en el reglamento institucional una vez agotado el debido proceso?',
        options: [
          'Llamado de atención escrito con copia a la hoja de vida, Condicionamiento de matrícula, Suspensión temporal de matrícula o Cancelación definitiva de matrícula.',
          'Trabajos forzados de construcción en horas nocturnas sin dotación ni supervisión.',
          'Multas económicas que se descuentan de las cuentas bancarias de la familia.',
          'Imposibilidad de volver a estudiar en cualquier colegio o universidad de Colombia.'
        ],
        correctIndex: 0,
        explanation: '¡Extraordinario! Las sanciones reglamentarias oficiales son: llamado de atención escrito, condicionamiento de matrícula, suspensión y cancelación de matrícula, emanadas por acto administrativo motivado.',
        remedialFeedback: 'Identificación del error: Las sanciones están taxativamente definidas por la norma: llamado escrito, condicionamiento, suspensión o cancelación. No existen multas ni castigos degradantes.',
        articleRef: 'Acuerdo 009 de 2024 · Art. 45 (Medidas Sancionatorias Institucionales)'
      }
    ]
  }
];

// Helper to get all 25 questions in flat array
export const ALL_REGLAMENTO_QUESTIONS: QuizQuestion[] = REGLAMENTO_QUIZ_SECTIONS.flatMap(
  (sec) => sec.questions
);
