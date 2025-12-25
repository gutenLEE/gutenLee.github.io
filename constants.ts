
export const COLORS = {
  BASE: '#F5F2EE', // Warm Parchment / Eggshell
  SURFACE: '#FFFFFF', // Pure White for cards
  POINT: '#3C3833', // Deep Taupe for text
  ACCENT: '#D4C4B5', // Sand Beige for lines/accents
};

export const HOTSPOTS = [
  { id: '1', x: 35, y: 55, label: 'Natural Oak', description: 'Hand-selected European white oak with matte finish' },
  { id: '2', x: 65, y: 45, label: 'Italian Linen', description: 'Breathable, sustainable high-grade fabric' },
  { id: '3', x: 50, y: 30, label: 'Mood Lighting', description: 'Warm 2700K integrated architectural light' }
];

export const IMAGES = {
  MASTERPIECE: '/images/1/2.jpeg',
  TEXTURE: '/images/2/2.jpeg',
  MOOD: '/images/3/2.jpeg'
};

export const CONTACT_INFO = {
  address: "서울특별시 송파구 석촌호수로12길 60, 잠실동 197-3번지 202호(홍성빌딩)",
  phone: "010-7324-5657",
  email: "tonywa91@naver.com",
  instagram: "https://www.instagram.com/studio_zvan/",
  mapUrl: "https://www.google.com/maps?q=서울특별시%20송파구%20석촌호수로12길%2060&output=embed",
  directions: [
    {
      type: "Location",
      label: "오시는 길",
      content: "잠실새내역 인근, 석촌호수 서호 맞은편에 위치하고 있습니다."
    },
    {
      type: "Parking",
      label: "주차 안내",
      content: "건물 내 주차 가능합니다. 방문 전 연락 부탁드립니다."
    }
  ]
};

export const PROJECTS = [
  {
    id: 'p1',
    title: 'The Silent Oak House',
    subTitle: '한남동 주거 프로젝트',
    description: '공간의 기초가 되는 바닥과 벽면에 집중하여, 거주자의 호흡이 공간의 일부가 되는 미니멀리즘을 구현했습니다. 천연 오크 소재의 텍스처가 햇살과 만나 매시간 다른 그림자를 그려냅니다.',
    image: '/images/1/1.jpeg',
    details: ['Location: Hannam-dong, Seoul', 'Area: 156m²', 'Year: 2023']
  },
  {
    id: 'p2',
    title: 'Flowing Light Loft',
    subTitle: '성수동 아틀리에 프로젝트',
    description: '산업적인 차가움과 주거의 안락함이 공존하는 공간입니다. 높은 층고를 활용한 레이어링 디자인으로 빛이 공간 구석구석 부드럽게 스며들도록 설계되었습니다.',
    image: '/images/2/1.jpeg',
    details: ['Location: Seongsu-dong, Seoul', 'Area: 89m²', 'Year: 2024']
  },
  {
    id: 'p3',
    title: 'Raemian One Bailey',
    subTitle: '서초구 반포동 주거 프로젝트',
    description: '따스한 광폭 원목 마루와 은은한 석재 아트월이 조화를 이루는 미니멀 럭셔리 공간입니다. 우물 천장의 간접 조명과 거실의 감각적인 실링팬이 더해져, 시각적인 편안함과 기능적인 쾌적함을 동시에 선사하는 도심 속 휴식처를 완성했습니다.',
    image: '/images/3/1.jpeg',
    details: ['Location: Banpo-dong, Seoul', 'Area: 112m²', 'Year: 2024']
  }
];
