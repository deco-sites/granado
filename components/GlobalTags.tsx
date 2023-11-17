import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
      <style
        id="font"
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `

          @font-face {  font-display: swap; font-family: 'Granado';   font-style: normal;   font-weight:500;   src: url(${
            asset("/fonts/Granado.woff2")
          })format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
            @font-face {  font-display: swap; font-family: 'Mr_Eaves';   font-style: normal;   font-weight: 400;   src: url(${
            asset("/fonts/mr-eaves-xl-sans-regular.woff2")
          })format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
            @font-face {  font-display: swap; font-family: 'Mr_Eaves';   font-style: normal;   font-weight: 500;   src: url(${
            asset("/fonts/mr-eaves-xl-sans-medium.woff2")
          })format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
            @font-face {  font-display: swap; font-family: 'Mr_Eaves';   font-style: normal;   font-weight: 600;   src: url(${
            asset("/fonts/mr-eaves-xl-sans-semiBold.woff2")
          })format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
            @font-face {  font-display: swap; font-family: 'Mr_Eaves';   font-style: normal;   font-weight: 700;   src: url(${
            asset("/fonts/mr-eaves-xl-sans-bold.woff2")
          })format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
            `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
