import type { StarData } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
//  CONSTELLATION: JUANPA
//
//  Each letter is a cluster of stars. At first they look like a natural
//  scatter. Only after all 6 content stars are visited do the connecting
//  lines reveal the name JUANPA.
//
//  Letter centers (x): J=-4.5  U=-2.7  A1=-0.9  N=0.9  P=2.7  A2=4.5
//  Height range: y = -1.6 to 1.6
//  Depth variation: z = -0.4 to 0.4  (subtle 3D feel)
// ─────────────────────────────────────────────────────────────────────────────

export const STARS: StarData[] = [

  // ── J ─────────────────────────────────────────────────────────────────────
  // Top horizontal bar + vertical shaft + left-curling hook at bottom
  {
    id: 'J',
    letter: 'J',
    type: 'memory',
    position: [-4.5, 0.2, 0.10],
    title: 'Donde todo comenzó',
    subtitle: 'El principio',
    text: `Hay amistades que llegan haciendo mucho ruido. Y hay otras que simplemente aparecen, casi sin pedir permiso, hasta que un día descubres que ya ocupan un lugar importante en tu historia. La nuestra fue así.

Nos conocimos en Revolución Juvenil, en la iglesia. Yo ya era servidor cuando llegaste, y aunque recuerdo perfectamente ese momento, nunca imaginé que años después estaría escribiendo estas palabras para ti.

Lo curioso es que no existe un instante exacto en el que pueda decir: "Aquí empezó nuestra amistad." No hubo una escena de película. No hubo una conversación que lo cambiara todo. Simplemente pasó. Y, si soy sincero, creo que esa es una de las cosas más bonitas de nuestra amistad.

Recuerdo que estabas hablando con Steph. Terminamos conversando de muchas cosas hasta que apareció un tema que siempre logra captar mi atención: el inglés. Tú empezaste a hablar y pensé: "Este man sabe bastante."

Pero, si hay algo que recuerdo con más claridad, es tu risa. Es imposible no reconocerla. Siempre ha tenido esa capacidad de contagiar alegría a quien está cerca. Y sí... también caminas muy chistoso. Creo que tenía que dejar eso escrito en algún lugar.

Con el tiempo empezamos a coincidir más. Las salidas con Don Ramón. Las conversaciones que terminaban siendo mucho más largas de lo que habíamos planeado. Las visitas a nuestras casas. Las canciones. Las risas. Las historias. Sin darnos cuenta, esos momentos sencillos empezaron a construir algo mucho más grande.

Pero si tuviera que señalar aquello que realmente fortaleció nuestra amistad, diría que fue nuestra forma de vivir la fe. Contigo encontré a alguien con quien podía hablar de Dios durante horas sin sentir que la conversación se agotaba. Alguien con quien podía filosofar, cuestionar, aprender y escuchar. Y eso, para mí, vale muchísimo. No todas las personas tienen la capacidad de hablar de lo profundo sin dejar de ser sencillas. Tú sí.

Con el tiempo también descubrí otra cosa. Eres una persona noble. Decidida. Segura de sí misma. Y, aunque probablemente no lo sabes, terminaste convirtiéndote en alguien en quien confío profundamente.

Normalmente soy muy reservado. No suelo contar todo lo que pienso ni escribir cuando siento que puedo molestar. Pero contigo siempre ha sido diferente. Eres de esas pocas personas a las que podría escribirles a las tres de la mañana... y sé que encontraría una respuesta. Eso dice mucho más de una amistad que cualquier otra cosa.

Y entre todos los recuerdos que compartimos, todavía me hace reír acordarme del día en que decidimos probar un panal de abejas. Definitivamente hay decisiones que solo parecen buenas ideas mientras las estás tomando.

Hoy miro hacia atrás y me doy cuenta de algo. La vida pone muchas personas en nuestro camino. Algunas nos acompañan durante un momento. Otras nos enseñan algo importante. Y unas pocas terminan convirtiéndose en parte de quienes somos. Creo que tú has sido una de esas personas para mí.

Y si esta constelación tiene un inicio, tenía que empezar aquí. Porque antes de todos los recuerdos... antes de las conversaciones interminables... antes de O.A.S.M.A... antes de todo... hubo una amistad que Dios fue construyendo poco a poco, casi sin que nos diéramos cuenta.

Y, sinceramente, no cambiaría esa historia por ninguna otra.`,
    photo: '/photos/juntos.jpg',
    nodes: [
      [-5.2, 1.6,  0.00],  // 0  bar-left
      [-4.5, 1.6,  0.05],  // 1  bar-center
      [-4.5, 0.2,  0.10],  // 2  ← CONTENT STAR
      [-3.8, 1.6,  0.00],  // 3  bar-right
      [-4.5, 0.9, -0.05],  // 4  shaft-upper
      [-4.5,-0.4,  0.15],  // 5  shaft-lower
      [-4.5,-0.9,  0.00],  // 6  shaft-bottom
      [-4.7,-1.3, -0.10],  // 7  hook-curve
      [-5.0,-1.6,  0.05],  // 8  hook-bottom
      [-5.3,-1.3,  0.10],  // 9  hook-end
    ],
    //  bar: 0─1─3   shaft: 1─4─2─5─6   hook: 6─7─8─9
    edges: [[0,1],[1,3],[1,4],[4,2],[2,5],[5,6],[6,7],[7,8],[8,9]],
    contentNodeIndex: 2,
  },

  // ── U ─────────────────────────────────────────────────────────────────────
  // Two vertical strokes with a smooth rounded bottom
  {
    id: 'U',
    letter: 'U',
    type: 'memory',
    position: [-2.7, -1.4, 0.15],
    title: 'Lo que siempre he admirado de ti',
    subtitle: 'Único',
    text: `Las personas solemos olvidar lo que nos hace diferentes, así que quiero dejar esto escrito.

Admiro tu forma de ser. Tu manera de enfrentar las cosas, tu personalidad, tus ocurrencias y hasta esos pequeños detalles que probablemente tú ni notas. No quiero idealizarte; simplemente quiero que sepas que, desde mi perspectiva, has dejado una huella positiva en quienes te rodean.

Nunca permitas que un cambio de ciudad te haga dudar del valor que tienes.`,
    nodes: [
      [-3.4, 1.6, -0.10],  // 0  left-top
      [-3.4, 0.8,  0.15],  // 1  left-upper
      [-3.4, 0.0, -0.10],  // 2  left-mid
      [-3.2,-0.8,  0.20],  // 3  left-curve
      [-2.7,-1.4,  0.15],  // 4  ← CONTENT STAR  bottom-center
      [-2.2,-0.8,  0.25],  // 5  right-curve
      [-2.0, 0.0, -0.05],  // 6  right-mid
      [-2.0, 0.8,  0.10],  // 7  right-upper
      [-2.0, 1.6, -0.20],  // 8  right-top
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8]],
    contentNodeIndex: 4,
  },

  // ── A (primera) ───────────────────────────────────────────────────────────
  // Apex → two angled legs with mid-points + center crossbar
  {
    id: 'A1',
    letter: 'A',
    type: 'memory',
    position: [-0.9, 0.2, -0.20],
    title: 'Las historias que ya son nuestras',
    subtitle: 'Aventuras',
    text: `Aquí no hace falta explicar mucho.

Cada risa, cada salida, cada conversación absurda, cada momento bueno o difícil terminó convirtiéndose en una historia que ahora forma parte de nuestra amistad.

Tal vez con el tiempo olvidemos algunos detalles.
Pero nunca olvidaremos cómo nos hicieron sentir.

Gracias por cada uno de esos momentos.`,
    photos: [
      '/photos/aventuras-1.jpg',
      '/photos/aventuras-2.jpg',
      '/photos/aventuras-3.jpg',
    ],
    nodes: [
      [-0.9, 1.6,  0.10],  // 0  apex
      [-1.2, 0.9,  0.05],  // 1  left-upper
      [-1.5, 0.2, -0.10],  // 2  left-crossbar-end
      [-1.7,-1.4,  0.15],  // 3  left-bottom
      [-0.9, 0.2, -0.20],  // 4  ← CONTENT STAR  crossbar-center
      [-0.3, 0.2,  0.10],  // 5  right-crossbar-end
      [-0.6, 0.9,  0.05],  // 6  right-upper
      [-0.1,-1.4, -0.10],  // 7  right-bottom
    ],
    //  left leg: 0─1─2─3   right leg: 0─6─5─7   crossbar: 2─4─5
    edges: [[0,1],[1,2],[2,3],[0,6],[6,5],[5,7],[2,4],[4,5]],
    contentNodeIndex: 4,
  },

  // ── N ─────────────────────────────────────────────────────────────────────
  // Left vertical + diagonal (with mid-points) + right vertical
  {
    id: 'N',
    letter: 'N',
    type: 'memory',
    position: [0.3, 0.3, 0.20],
    title: 'Este no es un final',
    subtitle: 'Nuevos comienzos',
    text: `Cambiar de ciudad no significa empezar desde cero.
Significa empezar un nuevo capítulo llevando contigo todo lo que has construido hasta hoy.

Estoy seguro de que vendrán retos, personas nuevas y momentos difíciles, pero también llegarán oportunidades que hoy ni imaginas.

Solo quiero que recuerdes algo:
No dejes que el miedo decida por ti.
Confía en la persona que eres.
Y construye una vida de la que te sientas orgulloso.`,
    photo: '/photos/nuevos-comienzos.jpg',
    nodes: [
      [0.2, 1.6, -0.10],  // 0  left-top
      [0.3, 0.3,  0.20],  // 1  ← CONTENT STAR  left-mid
      [0.2,-0.6, -0.15],  // 2  left-lower
      [0.2,-1.6,  0.10],  // 3  left-bottom
      [0.7, 0.9,  0.05],  // 4  diagonal-upper
      [1.2,-0.3, -0.05],  // 5  diagonal-lower
      [1.6, 1.6,  0.15],  // 6  right-top
      [1.6, 0.6, -0.10],  // 7  right-upper
      [1.6,-0.4,  0.20],  // 8  right-lower
      [1.6,-1.6, -0.05],  // 9  right-bottom
    ],
    //  left vert: 0─1─2─3   diagonal: 0─4─5─9   right vert: 6─7─8─9
    edges: [[0,1],[1,2],[2,3],[0,4],[4,5],[5,9],[6,7],[7,8],[8,9]],
    contentNodeIndex: 1,
  },

  // ── P ─────────────────────────────────────────────────────────────────────
  // Full vertical shaft + smooth closed bump at top-right
  {
    id: 'P',
    letter: 'P',
    type: 'memory',
    position: [2.7, 0.9, -0.10],
    title: 'Lo único que espero',
    subtitle: 'Promesa',
    text: `No espero que estemos hablando todos los días.
No espero que todo siga exactamente igual.
La vida cambia.
Las personas cambian.
Los caminos también.

Lo único que espero es que, sin importar cuánto tiempo pase, nunca sintamos que dejamos de ser amigos.

Porque algunas personas llegan a nuestra vida para un momento.
Y otras llegan para quedarse.

Espero ser de las segundas.`,
    nodes: [
      [2.0,-1.6,  0.00],  // 0  bottom
      [2.0,-0.8,  0.10],  // 1  lower-shaft
      [2.0, 0.1, -0.05],  // 2  mid-shaft  (bump closes here)
      [2.0, 0.8,  0.15],  // 3  upper-shaft
      [2.0, 1.6,  0.00],  // 4  top
      [2.6, 1.6, -0.15],  // 5  bump-top-left
      [2.7, 0.9, -0.10],  // 6  ← CONTENT STAR  bump area
      [3.2, 1.3,  0.10],  // 7  bump-top-right
      [3.4, 0.8,  0.00],  // 8  bump-rightmost
      [3.2, 0.3, -0.10],  // 9  bump-lower-right
      [2.6, 0.0,  0.10],  // 10 bump-bottom  (closes to shaft)
    ],
    //  shaft: 0─1─2─3─4   bump: 4─5─7─8─9─10─2
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,7],[7,8],[8,9],[9,10],[10,2]],
    contentNodeIndex: 6,
  },

  // ── A (segunda — CÁPSULA) ─────────────────────────────────────────────────
  // Mirror of first A: apex → legs with mid-points + crossbar
  {
    id: 'A2',
    letter: 'A',
    type: 'capsule',
    position: [4.5, 0.2, 0.30],
    title: 'Ábreme cuando...',
    subtitle: 'Cápsula del tiempo',
    capsules: [
      {
        trigger: 'Cuando te sientas solo',
        text: `Quiero que recuerdes que estar solo y sentirse solo no siempre son lo mismo.

Hay personas que piensan en ti aunque no te escriban todos los días.
Yo soy una de ellas.`,
      },
      {
        trigger: 'Cuando tengas miedo',
        text: `El miedo suele aparecer antes de los cambios importantes.

No significa que estés tomando un mal camino.
Solo significa que estás saliendo de lo conocido.

Sigue adelante.`,
      },
      {
        trigger: 'Cuando logres algo grande',
        text: `Antes que nada... ¡Felicidades!

Espero que sonrías mucho ese día. Y espero que, cuando tengas un momento, recuerdes todo el esfuerzo que hiciste para llegar hasta ahí.

Te lo mereces.`,
      },
      {
        trigger: 'Cuando extrañes tu hogar',
        text: `No hay lugar que pueda reemplazar aquello que sentimos como hogar.

Pero con el tiempo descubrirás algo bonito:
También se puede construir un nuevo hogar.
Con nuevas personas, nuevas costumbres y nuevos recuerdos.`,
      },
      {
        trigger: 'Cuando dudes de ti',
        text: `Si llegaste hasta esta carta, quiero pedirte algo.

Haz una pausa. Respira. Y recuerda todas las veces que pensaste que no podrías... y aun así lo lograste.

No eres la persona que empezó este camino.
Has crecido mucho más de lo que alcanzas a ver.`,
      },
      {
        trigger: 'Cuando simplemente quieras volver',
        text: `No importa cuándo abras esta página.
Puede ser dentro de un mes, dentro de un año, o dentro de diez.

Mientras este pequeño rincón siga existiendo, aquí siempre habrá alguien recordándote que tu historia también quedó escrita en la vida de quienes te quieren.`,
      },
    ],
    nodes: [
      [4.5, 1.6, -0.10],  // 0  apex
      [4.2, 0.9,  0.05],  // 1  left-upper
      [3.9, 0.2,  0.20],  // 2  left-crossbar-end
      [3.8,-1.4, -0.05],  // 3  left-bottom
      [4.5, 0.2,  0.30],  // 4  ← CONTENT STAR  crossbar-center
      [5.1, 0.2, -0.10],  // 5  right-crossbar-end
      [4.8, 0.9,  0.05],  // 6  right-upper
      [5.2,-1.4,  0.15],  // 7  right-bottom
    ],
    //  left leg: 0─1─2─3   right leg: 0─6─5─7   crossbar: 2─4─5
    edges: [[0,1],[1,2],[2,3],[0,6],[6,5],[5,7],[2,4],[4,5]],
    contentNodeIndex: 4,
  },
]

// ─── Helper: flat list of ALL star nodes (for rendering decorative stars) ────
export interface FlatNode {
  starId: string
  nodeIndex: number
  position: [number, number, number]
  isContent: boolean
}

export function getAllNodes(): FlatNode[] {
  const nodes: FlatNode[] = []
  for (const star of STARS) {
    star.nodes.forEach((pos, i) => {
      nodes.push({
        starId: star.id,
        nodeIndex: i,
        position: pos,
        isContent: i === star.contentNodeIndex,
      })
    })
  }
  return nodes
}

// ─── Camera presets ───────────────────────────────────────────────────────────
export const CAMERA_OVERVIEW = {
  position: [0, 0, 14] as [number, number, number],
  lookAt:   [0, 0,  0] as [number, number, number],
}

export const CAMERA_LANDING = {
  position: [0, 0, 22] as [number, number, number],
  lookAt:   [0, 0,  0] as [number, number, number],
}

export function getCameraTravelTarget(star: StarData) {
  const [sx, sy, sz] = star.position
  return {
    position: [sx, sy, sz + 3.0] as [number, number, number],
    lookAt:   [sx, sy, sz]       as [number, number, number],
  }
}
