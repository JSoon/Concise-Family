import './main.sass'

/**
 * @description Concise slider component
 * 
 * @param {object}  params            config object
 * @param {string}  params.selector   id or class selector
 * @param {number}  params.gridNum    number of visible grids
 * @param {number}  params.step       step number of items for each slide, default to gridNum
 */

let pageNum // Total indicator page number
let curPageIdx = 0 // Current indicator page number index
let curVisibleStart, curVisibleEnd // Current visible items index range

const slider = params => {

  const {
    selector,
    gridNum,
    step = params.gridNum
  } = params

  if (!selector) {
    throw 'Slider has no id or class selector!'
  }

  // Initial current visible items index range
  curVisibleStart = 0
  curVisibleEnd = gridNum - 1

  const sliderEle = document.querySelector(selector)
  const sliderWrapper = sliderEle.querySelector('.slider-wrapper') || sliderEle
  const sliderListWrapper = sliderWrapper.querySelector('.slider-list-wrapper')
  const sliderList = sliderWrapper.querySelector('.slider-list')
  const sliderItems = sliderWrapper.querySelectorAll('.slider-item')
  const sliderIndicator = sliderWrapper.querySelector('.slider-indicator')
  const sliderPrev = sliderWrapper.querySelector('.slider-prev')
  const sliderNext = sliderWrapper.querySelector('.slider-next')

  // Indicator page number
  pageNum = Math.ceil(sliderItems.length / gridNum)

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
      item.style.opacity = 1
    }
  })

  // Display slider list after width being initialized
  sliderList.style.display = 'block'

  // Generate indicator items based on gridNum
  for (let i = 0; i < pageNum; i++) {
    const indicatorItem = document.createElement('div')
    indicatorItem.classList.add('slider-indicator-item')
    sliderIndicator.appendChild(indicatorItem)
  }
  sliderIndicator.firstElementChild.classList.add('active')

  //#region Controllers

  sliderList.addEventListener('transitionstart', e => {
    updateItemsVisibility({
      sliderItems,
      gridNum,
      step
    })
  })

  sliderList.addEventListener('transitionend', e => {
    updateIndicator({
      sliderIndicator,
      step
    })
  })

  // Prev page
  sliderPrev.addEventListener('click', e => {
    updateListPosition({
      direction: 'prev',
      sliderList,
      sliderItems,
      step,
      gridNum,
      itemWidth,
    })
  }, false)

  // Next page
  sliderNext.addEventListener('click', e => {
    updateListPosition({
      direction: 'next',
      sliderList,
      sliderItems,
      step,
      gridNum,
      itemWidth,
    })
  }, false)

  //#endregion

}

function updateListPosition(params) {
  let {
    direction,
    sliderList,
    sliderItems,
    step,
    gridNum,
    itemWidth,
  } = params

  if (gridNum > sliderItems.length) {
    return
  }

  // Calculate visible items index range
  if (direction === 'prev') {
    curVisibleStart -= step
    if (curVisibleStart < 0) {
      curVisibleStart = 0
    }
  } else {
    curVisibleStart += step
  }
  curVisibleEnd = curVisibleStart + gridNum - 1

  // Deal with edge cases of visible range
  if (curVisibleEnd > sliderItems.length - 1) {
    curVisibleEnd = sliderItems.length - 1
    curVisibleStart = curVisibleEnd + 1 - gridNum
  }

  // Calculate current page number index
  if (direction === 'prev') {
    curPageIdx = Math.floor(curVisibleStart / gridNum)
  } else {
    // If the number of visible items is not equal to gridNum
    if ((curVisibleEnd + 1) % gridNum !== 0) {
      // Then it's the last page
      curPageIdx = pageNum - 1
    } else {
      curPageIdx = Math.floor(curVisibleStart / gridNum)
    }
  }

  console.log('curPageIdx', curPageIdx);
  console.log('curVisibleRange', `[${curVisibleStart}, ${curVisibleEnd}]`);

  sliderList.style.transform = `translate3d(-${curVisibleStart * itemWidth}px, 0, 0)`

}

function updateIndicator(params) {
  const {
    sliderIndicator
  } = params

  // Highlight current indicator based on step
  sliderIndicator.children.forEach(item => item.classList.remove('active'))
  sliderIndicator.children[curPageIdx].classList.add('active')

}

function updateItemsVisibility(params) {
  const {
    sliderItems
  } = params

  // Make items of current index visible
  sliderItems.forEach((item, idx) => {
    item.style.opacity = 0

    if (idx >= curVisibleStart && idx <= curVisibleEnd) {
      item.style.opacity = 1
    }
  })


}

export default slider