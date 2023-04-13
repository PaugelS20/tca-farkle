//
// Interfaces and function types...
//
export interface GameResult {
	winner: string;
	players: GamePlayer[];
	start: string;
	end: string;

	reallyCoolThingHappened: boolean;
	turns: any[];
}
export interface GamePlayer {
	name: string;
}
export interface LeaderboardPlayer {
	name: string;
	wins: number;
	losses: number;
	avg: string;
}
export interface SetupInfo {
	start: string;
	chosenPlayers: string[];
}

export type GetPreviousPlayersFunc = (results: GameResult[]) => string[];

export type CalculateLeaderboardFunc = (
	results: GameResult[]
) => LeaderboardPlayer[];

//
// Default function implementations...
//
export const getPreviousPlayers: GetPreviousPlayersFunc = (grs) => {
	const allPreviousPlayers = grs.flatMap((x) => x.players.map((y) => y.name));

	return [...new Set(allPreviousPlayers)].sort();
};

export const calculateLeaderboard: CalculateLeaderboardFunc = (results) => {
	const gameResultsGroupedByPlayer = getPreviousPlayers(results).reduce(
		(acc, x) =>
			acc.set(
				x,
				results.filter((y) => y.players.map((z) => z.name).includes(x))
			),
		new Map<string, GameResult[]>()
	);

	return (
		[...gameResultsGroupedByPlayer]

			// First object with names game counts and wins...
			.map((x) => ({
				name: x[0],
				totalGames: x[1].length,
				wins: x[1].filter((y) => y.winner === x[0]).length,
			}))

			/// Now use wins and total games to get avg and losses
			.map((x) => ({
				name: x.name,
				wins: x.wins,
				losses: x.totalGames - x.wins,
				avg: x.wins / x.totalGames,
			}))

			// Sort order, with tie breaks that include number of games played
			.sort((a, b) =>
				a.avg * 1000 + a.wins + a.losses >
				b.avg * 1000 + b.wins + b.losses
					? -1
					: 1
			)

			// Turn the avg into a 3 digit string.
			.map((x) => ({
				...x,
				avg: x.avg.toFixed(3),
			}))
	);
};

// Getting game duration and avg game length
export const getShortestGameDuration = (results: GameResult[]) =>
	Math.min(
		...results.map(
			(x) => new Date(x.end).getTime() - new Date(x.start).getTime()
		)
	);

export const getLongestGameDuration = (results: GameResult[]) =>
	Math.max(
		...results.map(
			(x) => new Date(x.end).getTime() - new Date(x.start).getTime()
		)
	);

export const getAvgGameDuration = (results: GameResult[]) => {
	const durations = results.map(
		(x) => new Date(x.end).getTime() - new Date(x.start).getTime()
	);
	const sum = durations.reduce((acc, x) => acc + x, 0);
	return sum / durations.length;
};

export const getPercentGamesReallyCoolThingHappened = (results: GameResult[]) => {
	return results.length
		? results.filter(x => x.reallyCoolThingHappened).length / results.length
		: 0
	;
};

/*************************** End Game Functions *********************************/ 

export const getUniquePlayersFromTurns = (turns: any[]) => {
    
    const players = turns.map(x => x.name);
	console.log(players);

    return [
        ...new Set(players)
    ];	
};

export const sumScores = (turns: any[]) => {
    return turns.reduce(
        (acc, x) => acc + x.score
        , 0
    );
};
// !!! Important
export const getScoresByPlayer = (turns: any[]): {
    name: string;
    total: number; //points
}[] => {
    
    const uniquePlayers = getUniquePlayersFromTurns(turns);

    return uniquePlayers.map(x => ({
        name: x
        , total: sumScores(turns.filter(y => y.name == x))
    }));
};

// export const anyWinners = (turns: any[]):boolean => {
//     return getScoresByPlayer(turns).some(x => x.total >= 10_000);
// };

// export const countZeroTurns = (turns: any[]) => {
//     return turns.filter(x => x.score == 0).length
// };

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
