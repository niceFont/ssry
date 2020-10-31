import React from 'react';

import express from 'express';
import { renderToString } from 'react-dom/server';

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use('/static', express.static(`${__dirname}/static`));
app.disable('x-powered-by');

app.get('*', async (req, res) => {
  try {
    const { url } = req;
    const File = (await import(`${__dirname}/views/pages${url}`)).default;
    const App = (await import(`${__dirname}/views/pages/_app`)).default;
    let html;
    if (File.getInitialProps) {
      const props = await File.getInitialProps({ req, res });
      /**
       * There are probably other/better ways to do this :D
       */
      html = `${renderToString(<App {...{ Component: File, pageProps: props }} />)}<script>
      window.__INITIAL_PROPS__ = ${JSON.stringify(props)}
      </script>`;
    } else {
      html = renderToString(<App Component={File} />);
    }
    res.render('index', { html });
    res.end();
  } catch (error) {
    res.send(error);
  }
});

app.listen(3000);
