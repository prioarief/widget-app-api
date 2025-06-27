const fs = require('fs').promises;
const rootPath = require('app-root-path');

module.exports = async (communityId) => {
  const path = rootPath.resolve('configs/data.json');
  const data = await fs.readFile(path, 'utf8');

  return JSON.parse(data)
    .filter((e) => e.communityId === communityId && e.isPublic)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort
    .slice(0, 11); // get 10 latest
};
