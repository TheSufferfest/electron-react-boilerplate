export default class ChartRenderer {
  constructor(workoutData, canvasContainer) {
    this.rawData = workoutData
    this.dataEnd = this.rawData[this.rawData.length - 1]
    this.canvasContainer = canvasContainer
  }
  width(data, currentIndex) {
    return data[currentIndex + 1].start - data[currentIndex].start
  }
  yStart(ftp) {
    return this.fullHeight - ftp 
  }
  renderText(canvas) {
    let totalTime = this.dataEnd.start / 60
    let totalTimeText = Math.floor(totalTime).toString() + ' mins'
    canvas.font = '20px Arial' 
    canvas.fillStyle = 'rgba(55,9,32,0.8)'
    canvas.fillText(totalTimeText, 15, this.fullHeight - 10)
  }
  drawCanvas() {
    let rawCanvas = this.canvasContainer.getContext('2d')
    rawCanvas.fillStyle = 'rgba(255,99,132,0.8)'
    let workoutLength = this.dataEnd.start
    let sectionFactor = this.canvasContainer.clientWidth / workoutLength
    let workout = this.rawData.map((data) => { return { 'start': Math.floor(data.start * sectionFactor), 'ftp': (data.ftp * 100) } })
    this.fullHeight = this.canvasContainer.clientHeight
    for (let i = 0; i < workout.length - 1; i++) {
      rawCanvas.fillRect(workout[i].start, this.yStart(workout[i].ftp), this.width(workout, i), workout[i].ftp)
    }
    this.renderText(rawCanvas)
  }
}
