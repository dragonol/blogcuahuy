import Head from "next/head";

interface CustomHeadProps {
  title: string;
  description: string;
  image: string;
  type: string;
  date: string;
}
export function CustomHead(props: CustomHeadProps) {
  return (
    <Head>
      {/* METAS */}
      <title>{props.title} | blogcuahuy</title>
      <meta name="description" content={props.description}></meta>
      <link rel="icon" href="/images/Huy.png"></link>

      {/* FACEBOOK */}
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />
      <meta property="og:image:secure_url" content={props.image} />
      <meta property="og:type" content={props.type} />
      <meta property="og:locale" content="es_ES" />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@huyha" />
      <meta name="twitter:image:src" content={props.image} />

      {/* MANIFEST */}
      <link rel="manifest" href="/manifest.json"></link>

      {/* LD+JSON */}
      {props.date != null ? (
        <script type="application/ld+json">
          {`{
                      "@context":"http://schema.org",
                      "@type":"NewsArticle",
                      "headline":"${props.title}",
                      "image":["${props.image}"],
                      "datePublished":"${props.date}",
                  }`}
        </script>
      ) : (
        <></>
      )}
    </Head>
  );
}
