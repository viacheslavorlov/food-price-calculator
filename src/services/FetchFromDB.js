export const fetchFromDB = async (url) => {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Could not fetch ${url}, status: ${response.status}`)
			}

			return await response.json();
}