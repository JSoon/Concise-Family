import './main.sass'

/**
 * @description Concise slider component
 * 
 * @param {object}  params            config object
 * @param {string}  params.selector   id or class selector
 * @param {number}  params.gridNum    number of visible grids
 * @param {number}  params.slideNum   number of items for each slide, default to 1
 */

const slider = params => {

  const {
    selector,
    gridNum,
    slideNum = 1
  } = params

  if (!selector) {
    throw 'Slider has no id or class selector!'
  }

  const sliderEle = document.querySelector(selector)
  const sliderWrapper = sliderEle.querySelector('.slider-wrapper') || sliderEle
  const sliderListWrapper = sliderWrapper.querySelector('.slider-list-wrapper')
  const sliderList = sliderWrapper.querySelector('.slider-list')
  const sliderIndicator = sliderWrapper.querySelector('.slider-indicator')
  const sliderItems = sliderWrapper.querySelectorAll('.slider-item')

  // Calculate all the widths dynamically
  const wrapperWidth = sliderListWrapper.clientWidth
  const itemWidth = wrapperWidth / gridNum
  const listWidth = itemWidth * sliderItems.length

  // Set slider list width
  sliderList.style.width = `${listWidth}px`

  // Set slider item width
  sliderItems.forEach((item, idx) => {
    item.style.width = `${itemWidth}px`

    // Display current slide items
    if (idx < gridNum) {
      item.style.display = 'block'
    }
  })

  // Display slider list after width being initialized
  sliderList.style.display = 'block'

  // Generate indicator items
  for (let i = 0; i < Math.ceil(sliderItems.length / slideNum); i++) {
    const indicatorItem = document.createElement('div')
    indicatorItem.classList.add('slider-indicator-item')
    sliderIndicator.appendChild(indicatorItem)
  }
  sliderIndicator.firstElementChild.classList.add('active')




}

export default slider