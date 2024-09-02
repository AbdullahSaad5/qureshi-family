

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <div id="portal-root"></div>
    </>
  );
}

export default MyApp;
