# nextjs-clean-architecture-example

Scaffold: Next.js 16 (App Router) + Clean Architecture (Domain / Application / Infrastructure / Presentation)
Includes: TypeScript, TailwindCSS, ESLint, Prettier, Supabase (@supabase/supabase-js)

Cómo usar
1. Copia los archivos a una carpeta local.
2. Crea un repo en GitHub con el nombre `nextjs-clean-architecture-example` (visibilidad: public) y añade el remote `origin`.
3. Añade variables de entorno en `.env.local` (mira `.env.example`).
4. Instala dependencias:
   npm install
5. Levanta en desarrollo:
   npm run dev
6. Push a GitHub en rama main:
   git add .
   git commit -m "chore: scaffold initial"
   git branch -M main
   git remote add origin git@github.com:yhau1989/nextjs-clean-architecture-example.git
   git push -u origin main

Variables necesarias (.env.local)
- SUPABASE_URL
- SUPABASE_ANON_KEY

Estructura
- app/: rutas (server components + route handlers)
- src/domain: entidades e interfaces
- src/application: casos de uso
- src/infrastructure: adaptadores (Supabase)
- src/presentation: componentes UI

Notas
- No subas keys a GitHub: agrega .env.local a .gitignore (incluido).
- Para llamadas que requieran permisos elevados usa una service-role key SOLO en server-side y nunca en clientes.
- Considera usar Row Level Security (RLS) en Supabase para seguridad.

-- .env.example --
# Copia a .env.local y rellena
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
