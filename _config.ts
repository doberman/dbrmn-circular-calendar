import lume from 'lume/mod.ts';
import netlify_cms from 'lume/plugins/netlify_cms.ts';

const site = lume({
  src: './src',
  server: { directoryIndex: false, page404: './404.html' },
});

site.use(netlify_cms());

export default site;
