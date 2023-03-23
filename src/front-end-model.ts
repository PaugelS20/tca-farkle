//
// Interfaces and function types...
//
    // add later
export interface GameResult {
    winner: string;
    // players: GamePlayer[];
    players: string[];
    
    start: string;
    end: string;
};
export interface GamePlayer {
    name: string;
    turns: number[];
}  
export interface LeaderboardPlayer {
    name: string;
    wins: number;
    losses: number;
    avg: string;
};

export interface SetupInfo {
    start: string;
    chosenPlayers: string[];
}

export type GetPreviousPlayersFunc = (results: GameResult[]) => string[];
export type CalculateLeaderboardFunc = (results: GameResult[]) => LeaderboardPlayer[];

//
// Default function implementations...
//
export const getPreviousPlayers: GetPreviousPlayersFunc = (grs) => {
    
    const allPreviousPlayers = grs.flatMap(x => x.players);
    
    return [
        ...new Set(allPreviousPlayers)
    ].sort();
};

export const calculateLeaderboard: CalculateLeaderboardFunc = (results) => {

    const gameResultsGroupedByPlayer = getPreviousPlayers(results).reduce(
        (acc, x) => acc.set(
            x
            , results.filter(y => y.players.includes(x))
        )
        , new Map<string, GameResult[]>() 
    );

    return [...gameResultsGroupedByPlayer]

        // First object with names game counts and wins...
        .map(x => ({
            name: x[0]
            , totalGames: x[1].length
            , wins: x[1].filter(y => y.winner === x[0]).length
        }))

        /// Now use wins and total games to get avg and losses
        .map(x => ({
            name: x.name
            , wins: x.wins 
            , losses: x.totalGames - x.wins
            , avg: x.wins / x.totalGames
        }))

        // Sort order, with tie breaks that include number of games played
        .sort(
            (a, b) => (a.avg * 1000 + a.wins + a.losses) > (b.avg * 1000 + b.wins + b.losses) ? -1 : 1
        )

        // Turn the avg into a 3 digit string.
        .map(x => ({
            ...x
            , avg: x.avg.toFixed(3)
        }));
};
export const getShortestGameDuration = (results: GameResult[]) => Math.min(
    ...results.map(x => new Date(x.end).getTime() - new Date(x.start).getTime())
);

export const getLongestGameDuration = (results: GameResult[]) => Math.max(
    ...results.map(x => new Date(x.end).getTime() - new Date(x.start).getTime())
);
export const getAvgGameDuration = (results: GameResult[]) => Math.avg(
    ...results.map(x => new Date(x.end).getTime() - new Date(x.start).getTime())
);
const calculateAverage = (array: number[]): number => {
    let sum = 0;
    for (let i = 0; i < array.length; ++i) {
        sum += array[i];
    }
    return sum / array.length;
};


// Usage example:

const numbers: number[] = [10, 20, 30];
const average: number = calculateAverage(numbers);

console.log(average);
// npm.runkit.com/human-readable REPL code

// let humanReadable = require("human-readable")

// const start = new Date("2023-03-23T17:39:03.023Z");
// const duration = Date.now() - start.getTime();

// const format = humanReadable.durationFormatter();

// console.log(
//     duration
//     , duration / 1000/ 60
//     , format(duration)
// );