```markdown
# Estructura propuesta: Next.js 16 (App Router) + Clean Architecture

A continuación se presenta la estructura de carpetas pensada para un proyecto Next.js 16 usando App Router y aplicando principios de Clean Architecture (separación clara: Domain, Application, Infrastructure, Presentation). Incluyo además ejemplos mínimos y la explicación del propósito de cada carpeta/archivo.

Árbol sugerido (nivel alto)
```text
project-root/
├─ app/                           # Next.js App Router (rutas, layout, server/client components)
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ head.tsx
│  ├─ favicon.ico
│  ├─ users/
│  │  ├─ page.tsx                 # UI -> usa casos de Application
│  │  └─ [id]/
│  │     └─ page.tsx
│  └─ api/
│     └─ users/
│        └─ route.ts              # Route handlers (server) -> invocan Application
├─ src/
│  ├─ domain/                     # Reglas de negocio independientes
│  │  ├─ entities/
│  │  │  └─ User.ts
│  │  ├─ value-objects/
│  │  └─ repositories/            # Interfaces (puertos)
│  │     └─ IUserRepository.ts
│  ├─ application/                # Casos de uso, DTOs, servicios de aplicación
│  │  ├─ use-cases/
│  │  │  └─ GetUserUseCase.ts
│  │  └─ dto/
│  ├─ infrastructure/             # Implementaciones concretas (adaptadores)
│  │  ├─ supabase/                # Cliente y repositorios supabase
│  │  │  └─ supabaseClient.ts
│  │  ├─ repositories/
│  │  │  └─ SupabaseUserRepository.ts
│  │  └─ http/                    # Clientes http externos, providers, etc.
│  ├─ presentation/               # Componentes UI reutilizables, hooks, contexts
│  │  ├─ components/
│  │  │  └─ UserCard.tsx
│  │  ├─ hooks/
│  │  └─ contexts/
│  └─ shared/                     # Utilidades transversales, tipos comunes, constantes
│     ├─ lib/
│     └─ utils/
├─ styles/
│  └─ globals.css
├─ package.json
├─ next.config.js
├─ tsconfig.json
└─ README.md
```

Notas importantes
- app/ es la entrada de rutas (Next.js App Router). Dentro de app van los Server Components y Client Components de la UI, layouts y route handlers (API).
- src/domain contiene únicamente reglas de negocio (entidades, value objects, interfaces de repositorio). No debe importar infraestructura ni librerías externas.
- src/application contiene los casos de uso que orquestan entidades y llaman a interfaces del dominio (puertos). Aquí ocurre la mayor parte de la lógica de aplicación.
- src/infrastructure implementa las interfaces del dominio (adaptadores). En este proyecto usamos Supabase via @supabase/supabase-js: el cliente y los repositorios concretos van aquí.
- src/presentation agrupa componentes UI reutilizables, hooks y contextos. Deben depender de DTOs o entidades simples, no de detalles de infraestructura.
- src/shared o libs transversales contienen utilidades y tipos compartidos entre capas.
- Para inyección de dependencias: crea un punto de composición (por ejemplo, src/infrastructure/Container.ts) que arme implementaciones concretas y exponga fábricas (makeGetUserUseCase). En Next.js puedes invocarlo desde Server Components o route handlers.

Descripción de carpetas y archivos clave
- app/layout.tsx
  - RootLayout del App Router. Importa estilos globales y envuelve las páginas.
- app/page.tsx
  - Página de inicio (Server Component).
- app/head.tsx / favicon.ico
  - Metadatos y recursos estáticos.
- app/users/page.tsx y app/users/[id]/page.tsx
  - Páginas orientadas a features que consumen casos de uso (ejecutados en servidor cuando corresponde).
- app/api/users/route.ts
  - Route handler que expone endpoints REST (usa casos de uso de Application).
- src/domain/entities/User.ts
  - Definición de la entidad User (tipos puros).
- src/domain/repositories/IUserRepository.ts
  - Interfaz (puerto) que define las operaciones de persistencia para usuarios.
- src/application/use-cases/GetUserUseCase.ts
  - Caso de uso que implementa la lógica para obtener un usuario por id; depende de IUserRepository.
- src/infrastructure/supabase/supabaseClient.ts
  - Cliente central de Supabase (createClient) que lee SUPABASE_URL y SUPABASE_ANON_KEY desde variables de entorno.
- src/infrastructure/repositories/SupabaseUserRepository.ts
  - Implementación concreta de IUserRepository usando la tabla `users` en Supabase.
- src/infrastructure/Container.ts
  - Punto de composición: instancia adaptadores y construye casos de uso para inyectar en las capas superiores.
- src/presentation/components/UserCard.tsx
  - Componente presentacional que recibe una entidad User y renderiza la UI.
- styles/globals.css
  - Estilos globales (Tailwind base + utilidades).

Ejemplos mínimos (cómo se conectan las capas)
- Flujo típico para obtener y mostrar un usuario:
  1. app/users/page.tsx (Server Component) invoca makeGetUserUseCase() desde Container.
  2. GetUserUseCase (Application) llama a IUserRepository.findById(id).
  3. SupabaseUserRepository (Infrastructure) ejecuta la consulta a Supabase y devuelve la entidad User.
  4. La página usa src/presentation/components/UserCard.tsx para renderizar la entidad.

Buenas prácticas y recomendaciones
- Mantén las dependencias invertidas: las capas internas (domain/application) sólo conocen interfaces, no implementaciones concretas.
- Usa variables de entorno y .env.local para secretos. NO subir keys a GitHub.
- Para llamadas desde el cliente con Supabase usa la ANON key y habilita RLS; para operaciones privilegiadas usa service_role key en server-side exclusivamente.
- Añade tests unitarios para los casos de uso (mocks del IUserRepository).
- Centraliza la composición/inyección en Container y proporciona alternativas para testing (mocks/fakes).
```
