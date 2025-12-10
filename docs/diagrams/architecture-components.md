# Diagrama de Componentes (Frontend Rinpa)

```mermaid
%%{init: {'theme': 'neutral'}}%%
flowchart TD
    %% Nivel raíz
    A[App\nBrowserRouter] --> B[ToasterProvider]
    B --> C[UserProvider]
    C --> D[Routes]
    C --> H[BotonDescarga]
    C --> I[ScrollToTop]

    D -->|/login| E[LoginPage]
    D -->|/unauthorized| F[Unauthorized]
    D -->|/*| G[AppShell]

    %% Shell por rol
    G --> J{useAuth.role}
    J -->|admin| K[AdminApp]
    J -->|repartidor| L[RepartidorApp]
    J -->|otro| F

    %% Admin Shell
    subgraph Admin
        K --> M[ProtectedRoute(admin)]
        M --> N[Providers de dominio\nMedida·TipoProducto·Cliente·Producto·PrecioNafta·Entrega·DetalleEntrega·Estadisticas]
        N --> O[Home (layout + animaciones)]
        O --> P[Router Dashboard]
        O --> Q[Header + MobileNavbar]

        P --> P1[Dashboard (QuickActions, StatsCard)]
        P --> P2[RealizarEntregaView · EditarEntregaView · VerEntregasView]
        P --> P3[ClienteView]
        P --> P4[ProductoView]
        P --> P5[TipoProductoView]
        P --> P6[MedidasView]
        P --> P7[PrecioNaftaView]
        P --> P8[EstadisticasView + Reportes (Cliente/Entrega/General)]
    end

    %% Repartidor Shell
    subgraph Repartidor
        L --> R[ProtectedRoute(repartidor)]
        R --> S[HomePageRepartidor]
    end

    %% Servicios y estado
    subgraph Infra
        T[AuthService\nmanejo tokens/refresh + callbacks] -.-> C
        T -.-> M
        T -.-> R
        U[api.ts\naxios + interceptor JWT] --> V[Servicios de dominio\nadmin/services/*]
        V --> W[(Backend API)]
        T -.-> U

        X[roleLandingRoutes] -.-> C
        Y[ProtectedRoute] -.-> M
        Y -.-> R
    end

    %% Shared
    subgraph Shared
        B --> Z[ToasterContext/useToaster\nToaster component]
        AA[useHandleApiError · usePaginateParams] -.-> P2
        AA -.-> P3
        AA -.-> P4
        AA -.-> P5
        AA -.-> P6
        AA -.-> P7
        AA -.-> P8
    end
```

## Estructura y responsabilidades
- Enrutado raíz (`App.tsx`): orquesta `Router`, `ToasterProvider`, `UserProvider` y rutas públicas (`/login`, `/unauthorized`) delegando el resto a `AppShell`.
- Shell por rol (`AppShell.tsx`): evalúa autenticación/rol y enruta a `AdminApp` o `RepartidorApp`; casos no permitidos se redirigen a `Unauthorized`.
- Seguridad (`ProtectedRoute.tsx`): valida sesión y rol antes de montar las rutas internas.
- Estado transversal:
  - `UserProvider` (auth, rol, landing por rol, logout, callbacks de sesión expirada).
  - `ToasterProvider` (gestión centralizada de toasts y concurrencia por posición).
- Dominio Admin:
  - Providers por módulo (`medida`, `tipoProducto`, `cliente`, `producto`, `precioNafta`, `entrega`, `detalleEntrega`, `estadisticas`) encapsulan estado/API por dominio.
  - `Home` compone layout responsive (Header, MobileNavbar) y router interno del dashboard.
  - Vistas especializadas (entregas, clientes, productos, reportes, estadísticas) consumen sus contextos y servicios.
- Dominio Repartidor: `HomePageRepartidor` protegido por rol, listo para vistas específicas del repartidor.
- Servicios y utilidades:
  - `api.ts` define axios con interceptor que inyecta tokens válidos desde `AuthService`.
  - `AuthService` centraliza login/refresh/logout y callbacks de expiración.
  - `roleLandingRoutes` define la ruta de aterrizaje por rol.
  - Hooks utilitarios (`useHandleApiError`, `usePaginateParams`) estandarizan manejo de errores y paginación.
- Shared UI: componentes comunes (modales, tablas, botones, scroll, confirmaciones) reutilizados en las vistas.

## Ventajas de la estructura
- **Aislamiento por rol:** `AdminApp` y `RepartidorApp` separan rutas, estado y vistas, reduciendo riesgos de fuga de permisos.
- **Capas de estado por dominio:** cada provider encapsula datos y mutaciones de su módulo, evitando prop drilling y facilitando pruebas/refactor.
- **Seguridad centralizada:** `ProtectedRoute` y `AppShell` concentran las verificaciones de autenticación/roles y redirecciones coherentes.
- **Cliente HTTP único:** `api.ts` + interceptor JWT minimizan duplicación de configuración y simplifican futuros cross-cutting (logging, retry).
- **Layout desacoplado:** `Home` maneja layout/responsividad y routing interno; las vistas pueden evolucionar sin romper el armazón.
- **UX consistente:** `ToasterProvider` ofrece notificaciones uniformes con control de concurrencia; hooks compartidos normalizan manejo de errores y paginación.
- **Escalabilidad modular:** la estructura por carpetas (admin/repartidor/shared/utils) permite añadir módulos o roles sin reestructurar la base.

