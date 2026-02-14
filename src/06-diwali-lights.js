/**
 * 🪔 Sharma ji ki Diwali Decoration
 *
 * Sharma ji apne ghar ko Diwali pe sajana chahte hain light strings se.
 * Unke paas ek budget hai aur market mein alag alag colors ki light strings
 * hain different lengths mein. Sharma ji sab kuch lena chahte hain, lekin
 * budget se zyada nahi!
 *
 * Color rates (per meter):
 *   - "golden" = Rs 50/meter
 *   - "multicolor" = Rs 40/meter
 *   - "white" = Rs 30/meter
 *   - Any other color = Rs 35/meter
 *
 * Rules:
 *   Step 1 - Use for...of to loop through lightStrings and add ALL of them
 *     to selected list with their cost calculated
 *   Step 2 - Use a while loop to check: agar totalCost > budget, toh remove
 *     the LAST item from selected, subtract its cost, and keep removing until
 *     totalCost <= budget
 *
 * @param {Array<{color: string, length: number}>} lightStrings - Available light strings
 * @param {number} budget - Sharma ji ka budget in rupees
 * @returns {{ selected: Array<{color: string, length: number, cost: number}>, totalLength: number, totalCost: number }}
 *
 * Validation:
 *   - Agar lightStrings array nahi hai ya budget positive number nahi hai,
 *     return: { selected: [], totalLength: 0, totalCost: 0 }
 *
 * @example
 *   diwaliLightsPlan(
 *     [{ color: "golden", length: 5 }, { color: "white", length: 10 }, { color: "multicolor", length: 3 }],
 *     400
 *   )
 *   // golden: 5*50=250, white: 10*30=300, multicolor: 3*40=120
 *   // Total = 670 > 400, remove multicolor (670-120=550), still > 400,
 *   // remove white (550-300=250), 250 <= 400
 *   // => { selected: [{ color: "golden", length: 5, cost: 250 }], totalLength: 5, totalCost: 250 }
 */
export function diwaliLightsPlan(lightStrings, budget) {
	if (!Array.isArray(lightStrings) || !Number.isFinite(budget) || budget <= 0) {
		return { selected: [], totalLength: 0, totalCost: 0 };
	}

	const rate = (color) => {
		if (color === 'golden') return 50;
		if (color === 'multicolor') return 40;
		if (color === 'white') return 30;
		return 35;
	};

	const selected = [];
	let totalCost = 0;
	let totalLength = 0;

	for (const ls of lightStrings) {
		if (!ls || !Number.isFinite(ls.length) || ls.length <= 0) continue;
		const cost = rate(ls.color) * ls.length;
		selected.push({ color: ls.color, length: ls.length, cost });
		totalCost += cost;
		totalLength += ls.length;
	}

	while (totalCost > budget && selected.length > 0) {
		const last = selected.pop();
		totalCost -= last.cost;
		totalLength -= last.length;
	}

	return { selected, totalLength, totalCost };
}
