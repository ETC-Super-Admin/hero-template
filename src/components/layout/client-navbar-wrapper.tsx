'use client';

import { Navbar } from './navbar';

export const ClientNavbarWrapper = ({ locale }: { locale: string }) => {
  return <Navbar locale={locale} />;
};
