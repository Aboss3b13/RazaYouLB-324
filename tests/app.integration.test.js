import { describe, it, expect, beforeEach } from 'vitest';
import html from '../index.html?raw';

window.__TEST__ = true;
const { initApp } = await import('../src/main.js');

function setup() {
  document.documentElement.innerHTML = html;
  initApp(document);
}

function submitNote(title, text) {
  document.getElementById('note-title').value = title;
  document.getElementById('note-text').value = text;
  document.getElementById('note-form').dispatchEvent(new Event('submit'));
}

const titles = () => [...document.querySelectorAll('.note h2')].map((h) => h.textContent);

describe('Integration: Notizen-App', () => {
  beforeEach(() => {
    localStorage.clear();
    setup();
  });

  it('US-01: erstellt eine Notiz und zeigt sie an', () => {
    submitNote('Test', 'Hallo');
    expect(titles()).toEqual(['Test']);
    expect(document.getElementById('empty').hidden).toBe(true);
  });

  it('US-02: Notizen bleiben nach Neuladen erhalten', () => {
    submitNote('Bleibt', '');
    setup();
    expect(titles()).toEqual(['Bleibt']);
  });

  it('US-03: bearbeitet eine Notiz', () => {
    submitNote('Alt', '');
    document.querySelector('.edit').click();
    submitNote('Neu', '');
    expect(titles()).toEqual(['Neu']);
  });

  it('US-04: löscht eine Notiz', () => {
    submitNote('Weg', '');
    document.querySelector('.delete').click();
    expect(titles()).toEqual([]);
    expect(document.getElementById('empty').hidden).toBe(false);
  });

  it('US-05: filtert mit der Suche', () => {
    submitNote('Einkauf', 'Milch');
    submitNote('Schule', 'M324');
    const search = document.getElementById('search');
    search.value = 'milch';
    search.dispatchEvent(new Event('input'));
    expect(titles()).toEqual(['Einkauf']);
  });
});
