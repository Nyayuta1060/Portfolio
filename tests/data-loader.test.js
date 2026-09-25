import test from 'node:test';
import assert from 'node:assert/strict';
import { createLocalizedLoader } from '../src/scripts/dataLoader.js';

test('deduplicates concurrent requests and keeps languages separate', async () => {
  const calls = [];
  const loader = createLocalizedLoader('projects', async path => { calls.push(path); return { path }; });
  const [first, second] = await Promise.all([loader.load('ja'), loader.load('ja')]);
  assert.equal(first, second);
  assert.equal(calls.length, 1);
  assert.notEqual(await loader.load('en'), first);
  assert.deepEqual(calls, ['./src/data/locales/ja/projects.json', './src/data/locales/en/projects.json']);
  loader.clear();
  assert.notEqual(await loader.load('ja'), first);
});

test('retries after failure and rejects unsupported languages', async () => {
  let attempts = 0;
  const loader = createLocalizedLoader('skills', async () => {
    if (++attempts === 1) throw new Error('offline');
    return { recovered: true };
  });
  await assert.rejects(loader.load('ja'), /offline/);
  assert.deepEqual(await loader.load('ja'), { recovered: true });
  await assert.rejects(loader.load('../en'), /Unsupported language/);
  assert.equal(attempts, 2);
});

test('failure from a cleared request does not evict its replacement', async () => {
  let rejectFirst;
  let calls = 0;
  const loader = createLocalizedLoader('career', () => ++calls === 1
    ? new Promise((_, reject) => { rejectFirst = reject; }) : { timeline: [] });
  const first = loader.load('ja');
  await Promise.resolve();
  loader.clear();
  const replacement = loader.load('ja');
  rejectFirst(new Error('old request'));
  await assert.rejects(first);
  assert.equal(await loader.load('ja'), await replacement);
  assert.equal(calls, 2);
});
