// JSON loading shared by projects, skills and career.
export async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
  return response.json();
}

// Cache in-flight requests as well as completed ones, separately for each language.
// A failed request is evicted so the next attempt can recover.
export function createLocalizedLoader(dataset, fetchJSON = loadJSON) {
  const requests = new Map();
  return {
    load(language) {
      if (!['ja', 'en'].includes(language)) return Promise.reject(new Error(`Unsupported language: ${language}`));
      if (!requests.has(language)) {
        const request = Promise.resolve()
          .then(() => fetchJSON(`./src/data/locales/${language}/${dataset}.json`))
          .catch(error => {
            if (requests.get(language) === request) requests.delete(language);
            throw error;
          });
        requests.set(language, request);
      }
      return requests.get(language);
    },
    clear() { requests.clear(); }
  };
}
