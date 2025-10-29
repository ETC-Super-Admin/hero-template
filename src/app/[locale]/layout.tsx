import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import StoreProvider from "@/providers/StoreProvider";
import { Providers } from "@/providers/HeroProviders";
import { Navbar } from "@/components/layout/navbar";
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
            <div className="relative flex flex-col min-h-screen">
              <Navbar />
              <div className="relative flex flex-row flex-1">
                <LeftSidebar />
                <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
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
