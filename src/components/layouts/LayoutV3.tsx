import type { Folder, NextraThemeLayoutProps } from "nextra";
import { default as NextraThemeDocsLayout } from "nextra-theme-docs";
import { Inter as Font } from "next/font/google";

export const font = Font({ subsets: ["latin"] });

/**
 * @param props
 * @returns The `nextra-theme-docs` layout, but wrapped with a `className` and `data-layout-id` that we can use for CSS specificity.
 */
export default function LayoutV3(props: NextraThemeLayoutProps) {
  // const { pageMap: originalPageMap = [] } = props.pageOpts

  // // const pageMap = (originalPageMap[0]  as Folder)?.children || [];

  // // console.log({ pageMap })
  // console.log({ originalPageMap, a: originalPageMap[0]?.data })

  // // props.pageOpts.pageMap = pageMap;

  return (
    <div
      className={font.className +
        " antialiased leading-relaxed layout-v3"}
      data-layout-id="nextra"
    >
      <NextraThemeDocsLayout {...props} />
    </div>
  );
}

// import Link from 'next/link'

// export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
//   const { pageMap } = pageOpts

//   return (
//     <div>
//       <h1>My Theme</h1>
//       {pageMap.map(item => {
//         console.log({ item })
//         if (item.kind === 'MdxPage') {
//           return (
//             <Link key={item.name} href={item.route}>
//               {item.route}
//             </Link>
//           )
//         }
//         return null
//       })}
//       <div style={{ border: '1px solid' }}>{children}</div>
//     </div>
//   )
// }
