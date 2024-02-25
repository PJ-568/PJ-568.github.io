// Darkmode.js 初始化
// const options = {
//     bottom: '64px', // default: '32px'
//     right: 'unset', // default: '32px'
//     left: '32px', // default: 'unset'
//     buttonColorDark: 'rgb(0,0,0,0)',  // default: '#100f2c'
//     buttonColorLight: 'rgb(255,255,255,0)' // default: '#fff'
// }

const darkmode = new Darkmode();

// ===以下尝试接管失效===

// // 尝试读取用户历史
// var userPreference = localStorage.getItem("AdvanceIsDarkmode");

// // 尝试读取浏览器设置
// var systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false;

// AdvanceSwitch();

// var 监听浏览器模式 = window.matchMedia('(prefers-color-scheme: dark)');

// 监听浏览器模式.addEventListener('change', (event) => {
//     if (event.matches) {
//         systemPreference = true;
//     } else {
//         systemPreference = false;
//     }
//     AdvanceSwitch();
// });

// function AdvanceSwitch() {
//     // 若存在用户历史值，切换到历史设定；否则根据浏览器主题自动切换
//     if (userPreference === "true" && !(darkmode.isActivated() ? true : false)) {
//         AdvanceToggle();
//     } else if (userPreference === "false" && (darkmode.isActivated() ? true : false)) {
//         AdvanceToggle();
//     } else if ((systemPreference && !(darkmode.isActivated() ? true : false)) || (!systemPreference && (darkmode.isActivated() ? true : false))) {
//         AdvanceToggle();
//     }
// }

// function AdvanceToggle() {
//     darkmode.toggle();

//     // 存储用户设定值
//     localStorage.setItem("AdvanceIsDarkmode", darkmode.isActivated() ? "true" : "false");
// }