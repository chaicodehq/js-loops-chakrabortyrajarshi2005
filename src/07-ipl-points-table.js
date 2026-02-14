/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
	if (!Array.isArray(matches) || matches.length === 0) return [];

	const table = {};

	const ensure = (team) => {
		if (!table[team]) {
			table[team] = {
				team,
				played: 0,
				won: 0,
				lost: 0,
				tied: 0,
				noResult: 0,
				points: 0,
			};
		}
	};

	for (let i = 0; i < matches.length; i++) {
		const m = matches[i];
		if (!m || typeof m.team1 !== 'string' || typeof m.team2 !== 'string')
			continue;

		const t1 = m.team1;
		const t2 = m.team2;

		ensure(t1);
		ensure(t2);

		table[t1].played++;
		table[t2].played++;

		if (m.result === 'win' && typeof m.winner === 'string') {
			const w = m.winner;
			const l = w === t1 ? t2 : t1;

			ensure(w);
			ensure(l);

			table[w].won++;
			table[w].points += 2;

			table[l].lost++;
		} else if (m.result === 'tie') {
			table[t1].tied++;
			table[t2].tied++;
			table[t1].points += 1;
			table[t2].points += 1;
		} else if (m.result === 'no_result') {
			table[t1].noResult++;
			table[t2].noResult++;
			table[t1].points += 1;
			table[t2].points += 1;
		}
	}

	return Object.values(table).sort((a, b) => {
		if (b.points !== a.points) return b.points - a.points;
		return a.team.localeCompare(b.team);
	});
}
