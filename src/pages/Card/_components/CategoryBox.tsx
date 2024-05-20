import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { CARD_DATA } from '@/pages/Card/_constants/cardData';
import { CATEGORY_BOX_DATA } from '@/pages/Card/_constants/cardData';

import CardBox from './CardBox';

interface CategoryBoxProps {
  categoryBoxTitle: string;
}

function CategoryBox({ categoryBoxTitle }: CategoryBoxProps) {
  const [groupedCards, setGroupedCards] = useState<{
    [key: string]: (typeof CARD_DATA)[0]['card'];
  }>({});

  useEffect(() => {
    const categoryData = CARD_DATA.find((category) => category.category === categoryBoxTitle);
    if (categoryData) {
      const grouped = categoryData.card.reduce(
        (acc, card) => {
          const tag = card.tags[1]; // 태그의 두 번째 요소 사용
          if (!acc[tag]) {
            acc[tag] = [];
          }
          acc[tag].push(card);
          return acc;
        },
        {} as { [key: string]: (typeof CARD_DATA)[0]['card'] },
      );

      setGroupedCards(grouped);
    }
  }, [categoryBoxTitle]);

  const tags = Object.keys(groupedCards);
  const isLastCategory = CARD_DATA[CARD_DATA.length - 1].category === categoryBoxTitle;

  const categoryInfoMap = {
    'hyundai-originals': CATEGORY_BOX_DATA.HYUNDAI,
    'Champion-Brands': CATEGORY_BOX_DATA.CHAMPION,
    'My Business': CATEGORY_BOX_DATA.BUSINESS,
  };

  const categoryInfoText = categoryInfoMap[categoryBoxTitle as keyof typeof categoryInfoMap];
  return (
    <CategoryBoxLayout>
      <CategoryBoxTitle>{categoryBoxTitle}</CategoryBoxTitle>
      {categoryInfoText && <CategoryInfo>{categoryInfoText}</CategoryInfo>}
      {tags.map((tag, index) => (
        <CardBox
          key={tag}
          tag={tag}
          cards={groupedCards[tag]}
          isLast={isLastCategory && index === tags.length - 1}
        />
      ))}
    </CategoryBoxLayout>
  );
}

export default CategoryBox;

const CategoryBoxLayout = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 6rem;
`;

const CategoryBoxTitle = styled.h1`
  font-family: ${({ theme }) => theme.FONTS.BOLD};
  color: ${({ theme }) => theme.COLORS.HD_BLK};
  font-size: ${({ theme }) => theme.FONT_SIZE.HEAD_01};
`;

const CategoryInfo = styled.p`
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
  color: ${({ theme }) => theme.COLORS.HD_BLK};
  font-size: ${({ theme }) => theme.FONT_SIZE.BODY_01_MED};
  margin-top: 1rem;
`;