export const getAvailabilityR: (str: string) => string = s =>
	//@ts-ignore
	s.match(/INSTOCKVALUE>(\w*?)<\/INSTOCKVALUE/)[1] || 'not found'
