// eslint-disable-next-line @typescript-eslint/no-var-requires
const buildInfo = require('../index.js');
const htmlPlugin = (options) => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      const { commit, commitEmail, commitAuthor, commitDate, buildDate, branch } = buildInfo;
      if (!commit) {
        return html;
      }
      const metaMap = {
        author: `<meta name="author" content="${commitAuthor}"></meta>`,
        email: `<meta name="email" content="${commitEmail}"></meta>`,
        commitDate: `<meta name="commitDate" content="${commitDate}"></meta>`,
        buildDate: `<meta name="buildDate" content="${buildDate}"></meta>`,
        version: `<meta name="version" content="${branch}/${commit}"></meta>`,
      };
      const metaList = [];
      if (options && Object.prototype.toString.call(options) === '[object Array]') {
        options.forEach((item) => {
          if (metaMap[item]) {
            metaList.push(metaMap[item]);
          }
        });
      } else {
        Object.keys(metaMap).forEach((item) => {
          metaList.push(metaMap[item]);
        });
      }

      const headerInfo = metaList.join('');
      return html.replace(/(<title>(.*?)<\/title>)/, `${headerInfo}$1`);
    },
  };
};
export default htmlPlugin;
