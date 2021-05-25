import FP from "./functional.js";

const Deck = Object.create(null);

/**
 * List of possible ranks of cards.
 */
Deck.ranks = Object.freeze(
    ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
);

/**
 * List of possible suits of cards.
 */
Deck.suits = Object.freeze(
    ["♤", "♡", "♧", "♢"]
);

/**
 * Returns a new card object of specified rank and suit.
 */
Deck.new_card = (rank, suit) => ({
    "rank": rank,
    "suit": suit,
    toString: () => rank + suit
});

/**
 * Returns an unshuffled 52-card deck
 */
Deck.new_deck = () => Deck.suits.flatMap(
    (suit) => Deck.ranks.map(
        (rank) => Deck.new_card(rank, suit)
    )
);

/**
 * For a given card returns a unique number for that card for sorting purposes.
 */
Deck.card_number = (card) => (
    Deck.suits.indexOf(card.suit) * Deck.ranks.length +
    Deck.ranks.indexOf(card.rank)
);

/**
 * A representation of an empty pile of cards.
 */
Deck.new_pile = () => [];

/**
 * Pick the n_th card out of a deck and place it at the top of a pile.
 * Return the resulting deck and pile.
 */
Deck.pick = (n) => (deck, pile) => [
    deck.filter((ignore, i) => i !== n),
    [deck[n], ...pile]
];

/**
 * Return if two cards are equal, if and only if they match in rank and suit.
 */
Deck.cards_equal = (card_1, card_2) => (
    card_1.rank === card_2.rank && card_1.suit === card_2.suit
);

/**
 * Return if two decks are equal,
 * if and only if all their cards are equal and in the same order.
 */
Deck.decks_equal = (deck_1, deck_2) => (
    deck_1.length === deck_2.length &&
    deck_1.every((card, i) => Deck.cards_equal(card, deck_2[i]))
);

/**
 * Return a mathematically 'perfect' shuffle of a deck.
 * Cut the deck in two and interleave the cards from the two piles
 * into a new deck, with the top card staying on top.
 * 1 2 3 4 5 6 7 8
 * 0 1 2 3 4 5 6 7
 * https://en.wikipedia.org/wiki/Faro_shuffle
 */
Deck.faro_out_shuffle = function (deck) {
    let half_1 = Deck.obtain_first_half(deck);
    let half_2 = Deck.obtain_second_half(deck);
    let i = 0;
    let new_deck = [];
    while (half_2[i] !== undefined) {
        new_deck = new_deck.concat(half_1[i], half_2[i]);
        i += 1;
    }
    return new_deck; // Placeholder implementation.
};

Deck.obtain_first_half = (deck) => (deck.slice(0, deck.length / 2));
Deck.obtain_second_half = (deck) => (deck.slice(deck.length / 2));
/**
 * Return a mathematically 'perfect' shuffle of a deck.
 * Cut the deck in two and interleave the cards from the two piles
 * into a new deck, with the top ending up one-in.
 * https://en.wikipedia.org/wiki/Faro_shuffle
 */
Deck.faro_in_shuffle = function (deck) {
    let half_1 = Deck.obtain_first_half(deck);
    let half_2 = Deck.obtain_second_half(deck);
    let i = 0;
    let new_deck = [];
    while (half_1[i] !== undefined) {
        new_deck = new_deck.concat(half_2[i], half_1[i]);
        i += 1;
    }
    return new_deck; // Placeholder implementation.
};
debugger;
export default Object.freeze(Deck);
