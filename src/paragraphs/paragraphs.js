import * as d3 from 'd3'
import paragraphData, {spoilerData} from './paragraphs-data.js'
import styles from './paragraphs.styles.css'

const canvas = d3.select('.d3Paragraphs')
const delayTime = 2000
const animationDuration = 750
let intervalId

const spoilerButton = document.querySelector('.spoilers-button')
spoilerButton.addEventListener('click', showSpoilers)

// render once no updates
// render(paragraphData)

// render with add
let numberShown = 1
intervalId = setInterval(() => {
	render(paragraphData.slice(0, numberShown))
	numberShown = numberShown + 1
	if (numberShown > 9) {
		window.clearInterval(intervalId)
	}
}, delayTime)

function render (data) {
	// binding data
	const paragraphs = canvas.selectAll('.conversation').data(data)

	// D3 lifecycles

	// Update
	paragraphs
		.html(updateInnerHTML)
		.transition()
		.duration(animationDuration)
		// .style('background-color', 'blanchedalmond')
		// .style('background-color', updateColorByAllegience)

	// Enter
	paragraphs.enter()
		.append('div')
		.attr('class', function (d, i) {
			return `conversation ${styles.message} ${styles.flex} ${styles[d.alignment]} ${styles.bigText} ${i % 2 === 0 ? '' : styles.incoming}`
		})
		.style('background-color', updateColorByAllegience)
		.html(updateInnerHTML)

	// Exit
	paragraphs.exit()
		// .transition()
		// .duration(animationDuration)
		// .style('background-color', 'grey')
		// .delay(animationDuration)
		.remove()
}

function showSpoilers() {
	console.log('intervalId', intervalId)
	if (intervalId) {
		window.clearInterval(intervalId)
	}
	render(spoilerData)
}

function updateInnerHTML(message) {
	return `
			<div class='${styles[message.speaker]} ${styles.speaker}'></div>
			<div class='${styles.messageText}'>${message.text}</div>
		`
}

function updateColorByAllegience(message) {
	if (message.alignment === 'Sith') {
		return 'red'
	} else if (message.alignment === 'Jedi') {
		return 'skyblue'
	} else {
		return 'grey'
	}
}
