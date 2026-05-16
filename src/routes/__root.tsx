import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { LoadingScreen } from "@/components/site/LoadingScreen";
import { Toaster } from "sonner";
import { SITE } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="grid min-h-screen place-items-center px-4 bg-[#F7F3EC]">
      <div className="max-w-md text-center">
        <p className="font-serif text-[7rem] leading-none text-[#C09A52] font-light italic">404</p>
        <h1 className="mt-2 font-serif text-2xl text-[#1A1916]">Page not found</h1>
        <p className="mt-3 text-sm text-[#7A7068] font-light">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex border border-[#1A1916] px-8 py-3 text-xs uppercase tracking-[0.2em] text-[#1A1916] hover:bg-[#1A1916] hover:text-white transition-colors duration-300"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="grid min-h-screen place-items-center px-4 bg-[#F7F3EC]">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-[#1A1916]">Something went wrong</h1>
        <p className="mt-2 text-sm text-[#7A7068] font-light">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-8 inline-flex border border-[#1A1916] px-8 py-3 text-xs uppercase tracking-[0.2em] text-[#1A1916] hover:bg-[#1A1916] hover:text-white transition-colors duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE.name} | Johannesburg's Premium Contractors` },
      { name: "description", content: SITE.description },
      { name: "author", content: SITE.name },
      { name: "theme-color", content: "#F7F3EC" },
      { property: "og:title", content: SITE.name },
      { property: "og:description", content: SITE.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-[#F7F3EC] text-[#1A1916] antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingScreen />
      <Nav />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
      <Toaster theme="light" position="top-right" richColors closeButton />
    </QueryClientProvider>
  );
}
