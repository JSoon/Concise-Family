import './main.sass'
import 'classlist-polyfill'

/**
 * @description Concise slider component
 * Note: This is not a gallery plugin, so far there is no autoplay function, which is not one of the intended features.
 * 
 * @param {object}  params                config object
 * @param {string}  params.selector       id or class selector
 * @param {number}  params.gridNum        number of visible grids
 * @param {number}  params.step           step number of items for each slide, default to gridNum
 * @param {boolean} params.indicator      whether to generate indicator, default to true
 * @param {boolean} params.indicatorCtrl  whether the indicator could control slide, default to false
 * @param {string}  params.indicatorType  indicator type, page: one item represent gridNum slider items, single: one item maps a single slider item, default to page
 * @param {boolean} params.prevNext       whether to generate prev & next slide controllers, default to true
 */

let indicatorItemNum // Total indicator item number
let curIndicatorItemIdx = 0 // Current indicator item number index
let curVisibleStart, curVisibleEnd // Current visible items index range
let reachStart, reachEnd // If reach the start or end after slide

const slider = params => {

  const {
    selector,
    gridNum,
    step = params.gridNum,
    indicator = true,
    indicatorCtrl = false,
    indicatorType = 'page',
    prevNext = true
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
  const sliderIndicator = document.createElement('div')
  sliderIndicator.classList.add('slider-indicator')
  indicator && sliderWrapper.appendChild(sliderIndicator)
  const sliderPrev = document.createElement('div')
  sliderPrev.innerHTML = 'Prev'
  sliderPrev.classList.add('slider-prev')
  const sliderNext = document.createElement('div')
  sliderNext.innerHTML = 'Next'
  sliderNext.classList.add('slider-next')
  prevNext & sliderWrapper.appendChild(sliderPrev)
  prevNext & sliderWrapper.appendChild(sliderNext)

  // Indicator item number
  if (indicatorType === 'page') {
    indicatorItemNum = Math.ceil(sliderItems.length / gridNum)
  } else {
    indicatorItemNum = sliderItems.length
  }

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
  for (let i = 0; i < indicatorItemNum; i++) {
    const indicatorItem = document.createElement('div')
    indicatorItem.classList.add('slider-indicator-item')
    indicatorItem.setAttribute('data-idx', i)
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
    reachStart = curVisibleStart === 0 ? true : false
    reachEnd = curVisibleEnd === sliderItems.length - 1 ? true : false

    // Prevent transition of children element from fired
    if (e.target !== sliderList) {
      return
    }

    updateIndicator({
      sliderIndicator,
      indicatorType,
      gridNum,
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

  // Indicator
  if (indicatorCtrl) {
    sliderIndicator.children.forEach(item => item.style.cursor = 'pointer')
    sliderIndicator.addEventListener('click', e => {
      if (!e.target.hasAttribute('data-idx')) {
        return
      }

      const newIndicatorItemIdx = Number(e.target.getAttribute('data-idx'))
      console.log('newIndicatorItemIdx', newIndicatorItemIdx);

      updateListPosition({
        direction: 'locating',
        sliderList,
        sliderItems,
        step,
        gridNum,
        itemWidth,
        indicatorType,
        newIndicatorItemIdx
      })
    }, false)
  }

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
    indicatorType,
    newIndicatorItemIdx
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
  } else if (direction === 'next') {
    curVisibleStart += step
  } else if (direction === 'locating') {
    if (indicatorType === 'page') {
      curVisibleStart = newIndicatorItemIdx * gridNum
    } else {
      curVisibleStart = newIndicatorItemIdx
    }
  }
  curVisibleEnd = curVisibleStart + gridNum - 1

  // Deal with edge cases of visible range
  if (curVisibleEnd > sliderItems.length - 1) {
    curVisibleEnd = sliderItems.length - 1
    curVisibleStart = curVisibleEnd + 1 - gridNum
  }
  if (reachStart && direction === 'prev') {
    curVisibleEnd = sliderItems.length - 1
    curVisibleStart = curVisibleEnd + 1 - gridNum
  }
  if (reachEnd && direction === 'next') {
    curVisibleStart = 0
    curVisibleEnd = curVisibleStart + gridNum - 1
  }

  console.log('curVisibleRange', [curVisibleStart, curVisibleEnd]);

  sliderList.style.transform = `translate3d(-${curVisibleStart * itemWidth}px, 0, 0)`

}

function updateIndicator(params) {
  const {
    sliderIndicator,
    indicatorType,
    gridNum
  } = params

  // Calculate current page number index
  if (indicatorType === 'page') {
    if (reachEnd) {
      curIndicatorItemIdx = indicatorItemNum - 1
    } else {
      if (curVisibleStart % gridNum === 0) {
        curIndicatorItemIdx = curVisibleStart % gridNum
      }
    }
  } else {
    curIndicatorItemIdx = curVisibleStart
  }

  console.log('curIndicatorItemIdx', curIndicatorItemIdx);

  // Highlight current indicator based on step
  sliderIndicator.children.forEach(item => item.classList.remove('active'))
  sliderIndicator.children[curIndicatorItemIdx].classList.add('active')

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