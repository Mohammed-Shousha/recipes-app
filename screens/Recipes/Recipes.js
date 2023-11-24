import { useContext, useState } from 'react'
import { ScrollView } from 'react-native'

import { Container } from '@components/styles/Containers.styles.'

import emptyDish from '@assets/images/emptyDish.png'

import { RecipesContext } from '@root/Context'

import { RecipeTile, ErrorDisplay, Button } from '@components'

export const Recipes = () => {
  const { recipes } = useContext(RecipesContext)

  const [recipesNum, setRecipesNum] = useState(20) //initial recipes number

  const loadMoreRecipes = () => {
    setRecipesNum(recipesNum + 10)
  }

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
          <Button onPress={loadMoreRecipes}>Show More</Button>
        )}
      </ScrollView>
    </Container>
  )
}
