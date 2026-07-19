import type { Vector3 } from 'three'

// ─── Experience phases ────────────────────────────────────────────────────────
export type Phase =
  | 'landing'       // Initial page: sky + constellation visible, intro text
  | 'entering'      // Camera zooms in after "Entrar" is pressed
  | 'exploring'     // Main interactive constellation state
  | 'traveling'     // Camera flying toward an active star
  | 'reading'       // Memory card / capsule visible
  | 'returning'     // Camera flying back to overview
  | 'finale-lines'  // All stars visited → constellation lines appear
  | 'finale-merge'  // Stars converge to center
  | 'finale-end'    // Final message

// ─── Star types ───────────────────────────────────────────────────────────────
export type StarType = 'memory' | 'capsule'

export interface CapsuleLetter {
  trigger: string   // "Cuando te sientas solo"
  text: string
}

export interface StarData {
  id: string
  letter: string    // Which letter of JUANPA this is the content star for
  type: StarType
  position: [number, number, number]
  title: string
  subtitle?: string
  text?: string
  photo?: string    // Path under /public/photos/
  photos?: string[] // For carousel (Estrella A1)
  capsules?: CapsuleLetter[]
  // Constellation structure
  nodes: [number, number, number][]   // All star nodes for this letter (incl. content star)
  edges: [number, number][]           // Pairs of node indices to connect with lines
  contentNodeIndex: number            // Which node index is the interactive star
}

// ─── Camera state ─────────────────────────────────────────────────────────────
export interface CameraTarget {
  position: [number, number, number]
  lookAt: [number, number, number]
}
