# La Constelación de Juanpa

Experiencia web inmersiva construida con Next.js 14, React Three Fiber y GSAP.

---

## Cómo correr el proyecto

### 1. Instalar Node.js
Si no lo tienes, descárgalo en: https://nodejs.org  
Versión recomendada: 18 o superior.

### 2. Instalar dependencias

Abre una terminal dentro de la carpeta `juanpa-constellation` y ejecuta:

```bash
npm install
```

### 3. Correr en desarrollo

```bash
npm run dev
```

Luego abre tu navegador en: **http://localhost:3000**

### 4. Compilar para producción

```bash
npm run build
npm run start
```

---

## Personalización de contenido

### Fotos

Agrega tus fotos en la carpeta `public/photos/` con estos nombres exactos:

| Estrella | Archivo esperado |
|---|---|
| J — Juntos | `public/photos/juntos.jpg` |
| A — Aventuras (foto 1) | `public/photos/aventuras-1.jpg` |
| A — Aventuras (foto 2) | `public/photos/aventuras-2.jpg` |
| A — Aventuras (foto 3) | `public/photos/aventuras-3.jpg` |
| N — Nuevos comienzos | `public/photos/nuevos-comienzos.jpg` |

Las estrellas U y P no tienen foto (solo texto, por diseño).

### Audio

Agrega un archivo de piano/ambiente en:

```
public/audio/ambient.mp3
```

Opciones gratuitas:
- https://pixabay.com/music/solo-piano/
- https://freesound.org  (buscar "ambient piano")

El audio solo se activa cuando el usuario presiona "Activar ambiente".

---

## Estructura del proyecto

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Fuentes (Cinzel + Inter)
│   ├── page.tsx          # Orquestador principal
│   └── globals.css       # Variables CSS y reset
├── types/index.ts        # Tipos TypeScript
├── data/stars.ts         # Posiciones y contenido de las 6 estrellas
├── stores/               # Estado global (Zustand)
└── components/
    ├── scene/            # Componentes Three.js / React Three Fiber
    │   ├── ConstellationScene.tsx   # Canvas principal
    │   ├── BackgroundStars.tsx      # 800 estrellas de fondo
    │   ├── ConstellationStar.tsx    # Estrella interactiva + decorativas
    │   ├── ConstellationLines.tsx   # Líneas de las letras (finale)
    │   ├── CameraController.tsx     # Animaciones de cámara (GSAP)
    │   └── FinaleStars.tsx          # Convergencia final de estrellas
    └── ui/               # Componentes HTML (Framer Motion)
        ├── Landing.tsx              # Pantalla inicial
        ├── MemoryCard.tsx           # Carta de recuerdo
        ├── TimeCapsule.tsx          # Cápsula del tiempo (última A)
        ├── AudioButton.tsx          # Botón de ambiente
        ├── ExploreHint.tsx          # Hint inicial de exploración
        └── FinalMessage.tsx         # Mensaje final
```

---

## Flujo de la experiencia

```
Landing → [Entrar] → Exploring
  → [clic en estrella] → Traveling (2.6s) → Reading
  → [Volver] → Returning → Exploring
    (repetir 6 veces)
  → finale-lines (líneas aparecen revelando JUANPA)
  → finale-merge (estrellas convergen)
  → finale-end (mensaje final)
```

---

## Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| `cosmos-bg` | `#04060A` | Fondo |
| `cosmos-text` | `#F5F0E8` | Texto |
| `cosmos-gold` | `#B8960C` | Estrellas visitadas, cápsula |
| `cosmos-glow` | `#7EB8D4` | Halos, líneas |

---

## Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Three.js** via **React Three Fiber** + **Drei**
- **GSAP** — animaciones de cámara
- **Framer Motion** — transiciones de UI
- **Zustand** — estado global
