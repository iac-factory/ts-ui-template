/**
 * @typedef Key
 * @property key {Array<string>|string}
 * @property which {number}
 * @property keyCode {number}
 */

/**
 * Check to see if at least one key code matches the key code of the
 * given event.
 *
 * @example
 * import * as keys from '../keys';
 * import { matches } from '../match';
 *
 * function handleOnKeyDown(event) {
 *   if (matches(event, [keys.Enter, keys.Space]) {
 *     // ...
 *   }
 * }
 *
 * @param {Event} event
 * @param {Array<Key>} keysToMatch
 * @returns {boolean}
 */
export function matches(event: any, keysToMatch: any) {
    for ( let i = 0; i < keysToMatch.length; i++ ) {
        if ( match(event, keysToMatch[i]) ) {
            return true;
        }
    }
    return false;
}

interface Matcher {
    key: any, which: any, keyCode: any
}

/**
 * Check to see if the given key matches the corresponding keyboard event. Also
 * supports passing in the value directly if you can't used the given event.
 *
 * @example
 * import * as keys from '../keys';
 * import { matches } from '../match';
 *
 * function handleOnKeyDown(event) {
 *   if (match(event, keys.Enter) {
 *     // ...
 *   }
 * }
 *
 * @param {Event|number|string} eventOrCode
 * @param {Key} key
 * @param which
 * @param keyCode
 * @returns {boolean}
 */
export function match(eventOrCode: any, matcher: Matcher){
    if ( typeof eventOrCode === "string" ) {
        return eventOrCode === matcher.key;
    }

    if ( typeof eventOrCode === "number" ) {
        return eventOrCode === matcher.which || eventOrCode === matcher.keyCode;
    }

    if ( eventOrCode.key && Array.isArray(matcher.key) ) {
        return matcher.key.indexOf(eventOrCode.key) !== -1;
    }

    return (
        eventOrCode.key === matcher.key ||
        eventOrCode.which === matcher.which ||
        eventOrCode.keyCode === matcher.keyCode
    );
}

/**
 * Get a string character for a given event or event code (useful for synthetic
 * events)
 *
 * @param {Event|number} eventOrCode
 * @returns {string}
 */
export function getCharacterFor(eventOrCode) {
    eventOrCode.which = undefined;
    eventOrCode.key = undefined;
    eventOrCode.keyCode = undefined;

    if ( typeof eventOrCode === "number" ) {
        return String.fromCharCode(eventOrCode);
    }

    return String.fromCharCode(undefined);
}