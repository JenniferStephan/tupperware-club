/**
 * Tupperware Club — stockage des likes et commentaires dans une Google Sheet.
 * À coller dans Extensions > Apps Script de la Sheet, puis déployer en application web.
 */
const LIKES = 'likes';
const COMMENTS = 'commentaires';

function sheet_(name, headers) {
  const ss = SpreadsheetApp.getActive();
  let s = ss.getSheetByName(name);
  if (!s) { s = ss.insertSheet(name); s.appendRow(headers); }
  return s;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// Empêche qu'un prénom commençant par "=" soit interprété comme une formule
function clean_(v, max) {
  let s = String(v || '').trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function readAll_() {
  const likes = sheet_(LIKES, ['date', 'article', 'prenom']).getDataRange().getValues().slice(1)
    .map(r => ({ item: String(r[1]), name: String(r[2]) }));
  const comments = sheet_(COMMENTS, ['date', 'article', 'prenom', 'message']).getDataRange().getValues().slice(1)
    .map(r => ({ date: r[0] instanceof Date ? r[0].toISOString() : String(r[0]), item: String(r[1]), name: String(r[2]), text: String(r[3]) }));
  return { likes, comments };
}

function doGet() {
  return json_(readAll_());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const name = clean_(d.name, 30);
    const item = clean_(d.item, 20);
    if (!name || !item) return json_({ error: 'prénom ou article manquant' });

    if (d.action === 'like' || d.action === 'unlike') {
      const s = sheet_(LIKES, ['date', 'article', 'prenom']);
      const rows = s.getDataRange().getValues();
      const idx = rows.findIndex((r, i) => i > 0 && String(r[1]) === item && String(r[2]).toLowerCase() === name.toLowerCase());
      if (d.action === 'like' && idx === -1) s.appendRow([new Date(), item, name]);
      if (d.action === 'unlike' && idx > 0) s.deleteRow(idx + 1);
    } else if (d.action === 'comment') {
      const text = clean_(d.text, 400);
      if (text) sheet_(COMMENTS, ['date', 'article', 'prenom', 'message']).appendRow([new Date(), item, name, text]);
    } else {
      return json_({ error: 'action inconnue' });
    }
    return json_(readAll_());
  } catch (err) {
    return json_({ error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
