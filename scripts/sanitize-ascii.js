/**
 * Sanitize "risky" unicode to plain ASCII.
 * IMPORTANT: keep ONLY \uXXXX escapes here (no literal unicode).
 * NOTE: comments MUST be ASCII-only too. Use \uXXXX in comments.
 */
const MAP = {
  "\u2013": "-", // en dash (\u2013)
  "\u2014": "-", // em dash (\u2014)
  "\u201C": "\"", // left double quote (\u201C)
  "\u201D": "\"", // right double quote (\u201D)
  "\u2018": "'",  // left single quote (\u2018)
  "\u2019": "'",  // right single quote (\u2019)
  "\u20AC": "EUR", // euro sign (\u20AC)
  "\u00A5": "",    // yen sign (\u00A5)
  "\u00B1": "+",   // plus-minus (\u00B1)
  "\u00AC": "-",   // not sign (\u00AC)
  "\u00AE": "R",   // registered (\u00AE)
  "\u00A7": "S",   // section (\u00A7)
  "\u0160": "S",   // S caron (\u0160)
  "\u00A1": "!",   // inverted exclamation (\u00A1)
  "\u2039": "<",   // single left angle (\u2039)
  "\u203A": ">",   // single right angle (\u203A)
  "\u201A": ",",   // single low-9 quote (\u201A)
};

const RE_CLASS = /[\u2013\u2014\u201C\u201D\u2018\u2019\u20AC\u00A5\u00B1\u00AC\u00AE\u00A7\u0160\u00A1\u2039\u203A\u201A]/g;

/** @param {string} input */
export function sanitizeAscii(input) {
  if (typeof input !== "string") return input;
  return input
    .replace(/\u00A0/g, " ")        // NBSP -> space
    .replace(/[\u0080-\u009F]/g, "")// C1 controls -> remove
    .replace(RE_CLASS, (c) => MAP[c] || "")
    .replace(/\u0000/g, "");        // NUL -> remove
}

export default sanitizeAscii;
