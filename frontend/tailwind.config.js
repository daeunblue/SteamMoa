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
        //font-sans 
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
        'moa-pink-light':'#F372A5',
        'moa-pink-dark':'#C22A66',
        'moa-yellow':'#FEC859',
        'moa-yellow-light':'#FFD784',
        'moa-yellow-dark':'#ECAE2F',
        'moa-green':'#43B5A0',
        'moa-green-light':'#73BDAF',
        'moa-green-dark':'#399685',
        'moa-purple':'#8D38D0',
        'moa-purple-light':'#A366D2',
        'moa-purple-dark':'#68279B',

        // component colors : 미묘한 차이...
        'centerDiv-blue':'#374050', // 가운데 80% 색상 들어가는 경우
        'sidebar-dark':'#1A2535', // 마이페이지 사이드바 상단 프로필 배경
        'sidebar-light':'#213047', // 마이페이지 사이드바
        'miniMoa-dark':'#1B2637', // 메인페이지 미니모아 배경
        'searchbar-gray':'#A1A7B4', // 각종 서치바, 정렬바
        'mainBtn-blue':'#788DB1', // 일반적인 버튼 색
        'mainBtn-blue-hover':'#5C6D8A',
        'mainBtn-disabled':'#A9ACB1',
        'createInput-gray':'#E7E7E7', // 글쓰기 input
        'card-lightgray':'#D9D9D9', // 모아카드 배경색
        'detailContent-light':'#EFEDED', // 상세페이지 디테일 컨텐츠 등...

        // gradient
        'bg-search-gradient-from':'#415570',
        'bg-search-gradient-via':'#263850',
        'bg-search-gradient-to':'#263850'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
