import { useContext, useState } from 'react'
import { ScrollView } from 'react-native'
import { Container } from '@components/styles/Containers.styles.'
import { StyledButton, ButtonText } from '@components/styles/Buttons.styles'
import { RecipesContext } from '@root/Context'
import emptyDish from '@assets/images/emptyDish.png'

import { RecipeTile, ErrorDisplay } from '@components'

const Recipes = () => {
  const { recipes } = useContext(RecipesContext)

  const [recipesNum, setRecipesNum] = useState(20) //initial recipes number

  return recipes[0] === null ? ( //TODO: fix this hack
    <ErrorDisplay
      message="Sorry We Couldn't Find Any Recipe"
      icon={emptyDish}
    />
  ) : (
    <Container>
      <ScrollView>
        {recipes.slice(0, recipesNum).map((recipe) => (
          <RecipeTile key={recipe.id} recipe={recipe} />
        ))}
        {recipesNum < recipes.length && (
          <StyledButton
            width="80%"
            onPress={() => setRecipesNum(recipesNum + 10)} //view more recipes
          >
            <ButtonText>Show More</ButtonText>
          </StyledButton>
        )}
      </ScrollView>
    </Container>
  )
}

export default Recipes
