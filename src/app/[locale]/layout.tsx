import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import StoreProvider from "@/providers/StoreProvider";
import { Providers } from "@/providers/HeroProviders";
import { ClientNavbarWrapper } from "@/components/layout/client-navbar-wrapper";
import { Footer } from "@/components/layout/footer";
import { LeftSidebar } from "@/components/layout/left-sidebar";
import { SidebarProvider } from "@/contexts/sidebar-context";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <StoreProvider>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <SidebarProvider>
            <div className="relative flex flex-col min-h-screen z-10">
              {/* Animated background */}
              <div className="fixed inset-0 opacity-20">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
              </div>
              <ClientNavbarWrapper locale={locale} />
              <div className="relative flex flex-row flex-1">
                <LeftSidebar />
                <main className="container mx-auto max-w-full pt-4 px-6 flex-grow">
                  {children}
                </main>
              </div>
              <Footer />
            </div>
          </SidebarProvider>
        </Providers>
      </StoreProvider>
    </NextIntlClientProvider>
  );
}
