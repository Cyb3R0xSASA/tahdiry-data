/**
 * Utility functions to decode the obfuscated responses returned by the
 * Tahdiri timetable service.  The first layer of obfuscation is a
 * sequence of chunk‑level reversals followed by a global reversal.  The
 * output of those reversals is Base64 encoded JSON.  See the
 * accompanying report for a detailed breakdown of the algorithm.
 */

/**
 * Reverse characters inside fixed‑length chunks of a string.  Any
 * remaining characters shorter than the chunk size are also reversed.
 *
 * @param input The string to transform.
 * @param n     The chunk size.
 */
export function chunkReverse(input: string, n: number): string {
    if (!input) return '';
    const re = new RegExp(`.{1,${n}}`, 'g');
    return (input.match(re) || [])
        .map((chunk) => chunk.split('').reverse().join(''))
        .join('');
}

/**
 * Decode the payload returned from `/tt/get.php` endpoints.  The
 * algorithm applies a series of chunk reversals in a prescribed order,
 * performs a global reverse and finally decodes the result from
 * Base64 into a JavaScript object.
 *
 * @param cipherText  The obfuscated string returned by the API.
 * @returns Parsed JSON object representing the response.
 */
export function decodeTahdiriTT<T = any>(cipherText: string): T {
    let s = String(cipherText || '').trim();
    // The order of reversals was recovered from the front‑end script.
    s = chunkReverse(s, 7);
    s = chunkReverse(s, 2);
    s = chunkReverse(s, 5);
    s = chunkReverse(s, 4);
    s = s.split('').reverse().join('');
    s = chunkReverse(s, 9);
    s = chunkReverse(s, 8);
    s = chunkReverse(s, 7);
    s = chunkReverse(s, 6);
    s = chunkReverse(s, 5);
    // Decode Base64 to UTF‑8 string
    const bytes = Buffer.from(s, 'base64');
    const jsonText = new TextDecoder('utf-8').decode(bytes);
    return JSON.parse(jsonText) as T;
}

