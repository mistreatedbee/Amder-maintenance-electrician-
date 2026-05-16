let serverPromise;

async function getServer() {
  if (!serverPromise) {
    serverPromise = import("../dist/server/server.js").then((mod) => mod.default ?? mod);
  }

  return serverPromise;
}

export default {
  async fetch(request) {
    const server = await getServer();
    return server.fetch(request, process.env, {});
  },
};
