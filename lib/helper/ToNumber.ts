export function toNumber(val) {
	const number = parseFloat(val);
	if (Number.isNaN(number)) {
		return null;
	}
	return number;
}
