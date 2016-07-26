export default class ChartRenderer {
  constructor(workoutData, canvasContainer) {
    this.rawData = workoutData
    this.dataEnd = this.rawData[this.rawData.length - 1]
    this.canvasContainer = canvasContainer
  }
  // builds a colourful gradient to show intensity of workouts
  buildGradient(canvas) {
    var gradient = canvas.createLinearGradient(0,0,0,300)
    gradient.addColorStop(1, "white")
    gradient.addColorStop(0.8, "yellow")
    gradient.addColorStop(0.75, "orange")
    gradient.addColorStop(0.65, "red")
    gradient.addColorStop(0.25, "black")
    return gradient
  }
  // normalises a data item in the workout for appropriate values for rendering on screen
  normaliseDataItem(dataItem) {
    return { 'start': Math.floor(dataItem.start * this.sectionFactor), 'ftp': (dataItem.ftp * 100) }
  }
  // convenience method for getting the width of a particular bar
  width(data, currentIndex) {
    return data[currentIndex + 1].start - data[currentIndex].start
  }
  // convenience method for getting y start position for a particular bar
  yStart(ftp) {
    return this.fullHeight - ftp 
  }
  // Renders the length of the workout in minutes based on last value being length of workout
  renderText(canvas) {
    let totalTime = this.dataEnd.start / 60
    let totalTimeText = Math.floor(totalTime).toString() + ' mins'
    canvas.font = '20px Arial' 
    canvas.fillStyle = 'rgba(55,9,32,0.8)'
    canvas.fillText(totalTimeText, 15, this.fullHeight - 10)
  }
  // draws the entire workout chart
  drawCanvas() {
    // set up the canvas and related variables
    let rawCanvas = this.canvasContainer.getContext('2d')

    rawCanvas.fillStyle = buildGradient(rawCanvas)
    this.sectionFactor = this.canvasContainer.clientWidth / this.dataEnd.start
    this.fullHeight = this.canvasContainer.clientHeight

    // map the data to good values for rendering and then render!
    let workout = this.rawData.map(this.normaliseDataItem, this)
    for (let i = 0; i < workout.length - 1; i++) {
      rawCanvas.fillRect(workout[i].start, this.yStart(workout[i].ftp), this.width(workout, i), workout[i].ftp)
    }
    this.renderText(rawCanvas)
  }
}
