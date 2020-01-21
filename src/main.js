import './index.scss'
/*
const transition = ({ el, properties = {}, duration = 1000, f = () => { } } = {}) => {
  el.style.transition = Object.keys(properties).join(','); // ['background', 'opacity'].join(',') = 'background,opacity' // `background ${duration1},opacity`
  el.style['transition-duration'] = duration + 'ms';
  el.offsetHeight;
  for (const key in properties) el.style[key] = properties[key];
  setTimeout(() => (el.style.transition = el.style['transition-duration'] = '') || typeof f === 'function' && f(), duration); // 만약 속성별로 duration, delay를 따로 적고 싶으면 가장 늦게 끝나는 시간을 계산해서 넣어야함
};
transition({ el: document.querySelector('body'), properties: { background: 'red', opacity: 0 }, duration: 3000 })
*/

// transition({
//   el: document.querySelector('body'),
//   properties: {
//     background: {
//       value: 'red',
//       delay: 0,
//       duration: 3000,
//     },
//     opacity: {
//       value: 0,
//       delay: 100,
//       duration: 3000,
//     }
//   }
// })
// setTimeout 1000-> transition({el: document.querySelector('body'), properties: {background: 'red', opacity: 0}, duration: 3000})

const setTransition = (el, prefix, prefixType, duration, f) => {
  const enterClass = `${prefix}-${prefixType}`
  const enterActiveClass = `${prefix}-active-${prefixType}`

  el.classList.add(enterClass)
  el.style['transition-duration'] = duration + 'ms'
  el.offsetHeight;
  el.classList.add(enterActiveClass)

  setTimeout(() => {
    el.classList.remove(enterClass)
    el.style['transition-duration'] = ''
    if (typeof f === 'function') f()
  }, duration);
}
// setTransition(document.querySelector('.post-container:nth-child(1)'), 'fade', 'in', 3000)
// setTransition(document.querySelector('.post-container:nth-child(2)'), 'fade', 'in', 2000)
// setTransition(document.querySelector('.post-container:nth-child(3)'), 'fade', 'in', 1000)
/**
 * 
 * @param {Array<[HTMLElement, Number]>} elsMap 
 * @param {'fade'} prefix 
 * @param {'in'} prefixType 
 * @param {() => void} callback 
 */
const groupTransition = (elsMap, prefix, prefixType, callback) => {
  let count = 0

  elsMap.map(els => {
    const el = els[0]
    const duration = els[1]
    count++
    setTransition(el, prefix, prefixType, duration, () => {
      if (elsMap.length === count) callback()
    })
  })
}

// counter class function
const counter = (max, f) => {
  const c = new class Counter {
    constructor() {
      this.f = f
      this.max = max
      this.count = 0
    }
    plus() {(++this.count === this.max) && this.f()}
  }
  return c.plus.bind(c)
}

const main = async () => {
  try {
    const column = document.getElementsByClassName('post-column')
    const column1 = column[0].children
    const column2 = column[1].children
    const column3 = column[2].children

    const row1 = [...column1]
    const row2 = [...column2]
    const row3 = [...column3]

    groupTransition([3000, 2000, 1000].map((duration, index) => [row1[index], duration]), 'fade', 'in', () => {
      console.log('end transition')
      groupTransition([2000, 1000].map((duration, index) => [row2[index], duration]), 'fade', 'in', () => {
        console.log('end transition')
        groupTransition([1000].map((duration, index) => [row3[index], duration]), 'fade', 'in', () => {
          console.log('end transition')
        });
      });
    });
  } catch (error) {
    throw Error(error);
  }
};
main();
