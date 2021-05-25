import fc from "fast-check";
import property from "./property.js";
import FP from "../functional.js";
import Deck from "../deck.js";

/** Arbitrary for a 52-card deck
 * shuffled using the Fisher-Yates algorithm */
const arbitrary_shuffled_deck = fc.tuple(
    ...FP.sequence(52).map((n) => fc.nat(51 - n))
).map(function (positions) {
    return positions.reduce(function (accumulator, position) {
        const [old_deck, new_deck] = accumulator;
        return Deck.pick(position)(old_deck, new_deck);
    }, [Deck.new_deck(), Deck.new_pile()])[1].reverse();
});

describe("Faro Out-shuffle", function () {
    property(
        "Given a deck; " +
        "When a Faro out-shuffle is performed; " +
        "Then the shuffled deck contains the same cards as the original deck.",
        [arbitrary_shuffled_deck],
        function (deck) {
            const faro_shuffled = Deck.faro_out_shuffle(deck);

            const deck_numbers = deck.map(Deck.card_number).sort();
            const shuffled_numbers = faro_shuffled.map(Deck.card_number).sort();

            return deck_numbers.every(
                (card_number, i) => card_number === shuffled_numbers[i]
            ) && (deck_numbers.length === shuffled_numbers.length);
        }
    );

    property(
        "Given a deck; " +
        "When a Faro out-shuffle is performed; " +
        "Then the top card of the original deck is the same " +
        "as the top card of the shuffled deck.",
        [arbitrary_shuffled_deck],
        function (deck) {
            const faro_shuffled = Deck.faro_out_shuffle(deck)
            return Deck.cards_equal(deck[0], faro_shuffled[0]);
        }
    );

    property(
        "Given a deck of 52 cards; " +
        "When sequential Faro out-shuffles are performed; " +
        "Then the original deck is returned after exactly 8 shuffles",
        [arbitrary_shuffled_deck],
        function (deck) {
            let times_shuffled = 0;
            let shuffle_deck = deck;
            while (times_shuffled < 8) {
                shuffle_deck = Deck.faro_out_shuffle(shuffle_deck);
                times_shuffled += 1;

                const matches = Deck.decks_equal(deck, shuffle_deck);

                if (matches && times_shuffled !== 8) {
                    return false;
                }

                if (matches && times_shuffled === 8) {
                    return true;
                }
            }
            return false;
        }
    );
    property(
        "The new index of odd elements of the shuffled array"+
        "is twice the index they had on the original array",
        [arbitrary_shuffled_deck],
        function (deck) {
            let shuffled_deck = Deck.faro_out_shuffle(deck);
            let array_of_odd = Deck.obtain_first_half(deck);
            let i = 0;
            let indexes_or = [];
            while(array_of_odd[i] !== undefined){
                indexes_or = indexes_or.concat(deck.indexOf(array_of_odd[i]));
                i += 1;
            }
            i = 0;
            let indexes_shuf = [];
            while(array_of_odd[i] !== undefined){
                indexes_shuf = indexes_shuf.concat(shuffled_deck.indexOf(array_of_odd[i]));
                i += 1;
            }
            let array_2 = indexes_or.map((el) => el*2);
            return array_2.join() === indexes_shuf.join();
        }
    );

});

describe("Faro In-Shuffle", function (){

    property(
        "The indexes of the second half of the unshuffled deck"+
        " are -(half.length-(index of even)) index on the shuffled deck",
        [arbitrary_shuffled_deck],
        function (deck){
            let iterator = deck.length/2;
            const s_half = Deck.obtain_second_half(deck);
            const shuffled_deck = Deck.faro_in_shuffle(deck);
            let indexes_or = [];
            let i = 0;
            while(s_half[i] !== undefined){
                indexes_or = indexes_or.concat(deck.indexOf(s_half[i]));
                i += 1;
            }
            i = 0;
            let indexes_shuf = [];
            while(s_half[i] !== undefined){
                indexes_shuf = indexes_shuf.concat(shuffled_deck.indexOf(s_half[i]));
                i += 1;
            }
            let final_arr = [];
            i = 0;
            while(indexes_or[i] !== undefined){
                final_arr = final_arr.concat(indexes_or[i] - iterator);
                iterator -=1;
                i += 1;
            }
            return final_arr.join() === indexes_shuf.join();
        }

    );

}


);