const form = document.querySelector('#form')
const packagingDuration = form.querySelector('#packaging-duration')
const packagingWattage = form.querySelector('#packaging-wattage')
const microwaveWattage = form.querySelector('#microwave-wattage')
const result = form.querySelector('#result')

const parseTimeColon = (time) => {
	let segments = time.trim().split(/\D+/)
	if (segments.length > 2) return 0

	return Number(segments[0]) * 60 + Number(segments[1] || 0)
}

const parseTimeLong = (time) => {
	const minutesSegments = time.match(/[0-9\.]+(?=\s*m)/)
	const minutes = minutesSegments && minutesSegments.length > 0 ? Number(minutesSegments[0]) : 0

	const secondsSegments = time.match(/[0-9\.]+(?=\s*s)/) || time.match(/(?<=m.*)[0-9\.]+/)
	const seconds = secondsSegments && secondsSegments.length > 0 ? Number(secondsSegments[0]) : 0

	return minutes * 60 + seconds
}

const parseTime = (time) => {
	if (time.match(/^[\d\s.:+]+$/)) return parseTimeColon(time)
	if (time.includes('m') || time.includes('s')) return parseTimeLong(time)

	return time
}

const formatSeconds = (time) => {
	if (isNaN(time) || time === Infinity || time === -Infinity) time = 0

	const minutes = (Math.floor(time / 60) + '').padStart(2, '0')
	const seconds = (Math.floor(time % 60) + '').padStart(2, '0')

	return `${minutes}:${seconds}`
}

const recalculate = () => {
	const time = parseTime((packagingDuration.value || '').trim())
	const packW = (packagingWattage.value || '').trim()
	const microwaveW = (microwaveWattage.value || '').trim()

	result.innerText = formatSeconds((packW || 0) / (microwaveW || 0) * time)
}

microwaveWattage.value = localStorage.getItem('my-microwave-wattage') || ''

packagingDuration.addEventListener('input', recalculate)
packagingWattage.addEventListener('input', recalculate)
microwaveWattage.addEventListener('input', recalculate)

form.addEventListener('submit', (e) => e.preventDefault())

packagingDuration.addEventListener('blur', () => {
	packagingDuration.value = formatSeconds(
		parseTime(packagingDuration.value.trim())
	)
})

microwaveWattage.addEventListener('input', () => {
	localStorage.setItem('my-microwave-wattage', microwaveWattage.value)
})
