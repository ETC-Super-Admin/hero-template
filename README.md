# Next.js & HeroUI Template

This is a template for creating applications using Next.js 14 (app directory) and HeroUI (v2).

[Try it on CodeSandbox](https://githubbox.com/heroui-inc/heroui/next-app-template)

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [HeroUI v2](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/heroui-inc/next-app-template
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@heroui/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/heroui-inc/next-app-template/blob/main/LICENSE).

```markdown


# Hero Template Project Structure

```

hero-template/
├── messages/
│   ├── en.json
│   ├── th.json
│   └── cn.json
├── providers/
│   ├── HeroProviders.tsx
│   └── StoreProvider.tsx
├── public/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   └── button.tsx (shadcn generated)
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   ├── icons/
│   │   │   ├── index.ts
│   │   │   ├── SunFilled.tsx
│   │   │   └── MoonFilled.tsx
│   │   ├── examples/
│   │   │   └── counter.tsx
│   │   ├── primitives.ts
│   │   └── theme-switch.tsx
│   ├── config/
│   │   ├── fonts.ts
│   │   └── site.ts
│   ├── data/
│   ├── mock/
│   │   └── product.json
│   ├── hooks/
│   ├── i18n/
│   │   ├── navigation.ts
│   │   ├── request.ts
│   │   └── routing.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── redux/
│   │   ├── features/
│   │   │   └── counter/
│   │   │       └── counterSlice.ts
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── services/
│   │   └── productServices.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── productTypes.ts
│   ├── utils/
│   │   └── productUtils.ts
│   └── middleware.ts
├── styles/
│   └── global.css
├── hero.ts
├── tailwind.config.ts
└── tsconfig.json

```

**Notes:**
- Organized with clear hierarchy for **messages**, **providers**, **components**, **config**, **hooks**, **redux**, **services**, **types**, and **utils**.
- Ready for copy-paste into Markdown files for documentation.
- `shadcn generated` note kept for the `button.tsx` file.
```
