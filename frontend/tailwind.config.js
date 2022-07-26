/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans'],
        'blackSans': ['Black Han Sans'],
      },
      colors: {
        // main colors
        'main-100':'#C9DFEF',
        'main-200':'#94B3CC',
        'main-300':'#415671',
        'main-400':'#202B3C',
        'main-500':'#141F31', // html&&body 배경색 

        // point colors
        'moa-pink':'#FA448C',
        'moa-yellow':'#FEC859',
        'moa-green':'#43B5A0',
        'moa-purple':'#8D38D0',

        // component colors : 미묘한 차이...
        'centerDiv-blue':'#374050', // 가운데 80% 색상 들어가는 경우
        'sidebar-dark':'#1A2535', // 마이페이지 사이드바 상단 프로필 배경
        'sidebar-light':'#213047', // 마이페이지 사이드바 상단 프로필 배경
        'miniMoa-dark':'#1B2637', // 메인페이지 미니모아 배경
        'searchbar-gray':'#A1A7B4', // 각종 서치바, 정렬바
        'mainBtn-blue':'#5A6D8E', // 일반적인 버튼 색
        'createInput-gray':'#E7E7E7',
        'card-lightgray':'#D9D9D9', // 모아카드 배경색
        'detailContent-light':'#EFEDED' // 상세페이지 디테일 컨텐츠 등...
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
